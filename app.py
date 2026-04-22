from flask import Flask, request, jsonify, send_from_directory, session
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash
from sklearn.linear_model import LinearRegression
import numpy as np
from flask_cors import CORS

app = Flask(__name__, static_folder='dist', static_url_path='/')
app.secret_key = os.environ.get('SECRET_KEY', 'pfis_super_secret_key_dev')
CORS(app)

# Use persistent disk on Render if available
if os.path.exists('/data'):
    DB_PATH = '/data/finance.db'
else:
    DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'finance.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            type TEXT,
            category TEXT,
            amount REAL,
            date TEXT,
            mode TEXT DEFAULT 'cash',
            description TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS rules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE,
            max_category_percent REAL DEFAULT 35,
            min_savings_percent REAL DEFAULT 20,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)

    conn.commit()
    conn.close()

def ensure_user_rules(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM rules WHERE user_id = ?", (user_id,))
    if cursor.fetchone() is None:
        cursor.execute("INSERT INTO rules (user_id) VALUES (?)", (user_id,))
        conn.commit()
    conn.close()

# --- Analysis Logic ---

def build_monthly_features(transactions):
    monthly_income = {}
    monthly_expense = {}
    for t in transactions:
        t_type, amount, date = t['type'], t['amount'], t['date']
        month = date[:7]
        if t_type == 'income':
            monthly_income[month] = monthly_income.get(month, 0) + amount
        elif t_type == 'expense':
            monthly_expense[month] = monthly_expense.get(month, 0) + amount

    months = sorted(monthly_expense.keys())
    X, y = [], []
    for i in range(len(months) - 1):
        month, next_month = months[i], months[i+1]
        expense, income = monthly_expense.get(month, 0), monthly_income.get(month, 0)
        if income == 0: continue
        avg_expense = sum(monthly_expense[m] for m in months[:i+1]) / (i+1)
        expense_trend = expense - (monthly_expense[months[i-1]] if i >= 1 else 0)
        values = [monthly_expense[m] for m in months[:i+1]]
        mean = sum(values) / len(values)
        volatility = (sum((x - mean) ** 2 for x in values) / len(values)) ** 0.5
        savings_rate = (income - expense) / income
        X.append([avg_expense, expense_trend, volatility, savings_rate])
        y.append(monthly_expense[next_month])
    return X, y

def predict_next_month_expense(transactions):
    X, y = build_monthly_features(transactions)
    if len(X) < 2: return None
    model = LinearRegression().fit(X, y)
    last_features = np.array(X[-1]).reshape(1, -1)
    prediction = model.predict(last_features)[0]
    return {"prediction": round(prediction, 2)}

# --- API Routes ---

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    username, password = data.get('username'), data.get('password')
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    hashed_password = generate_password_hash(password)
    conn = get_db_connection()
    try:
        conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 400
    finally:
        conn.close()

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username, password = data.get('username'), data.get('password')
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    conn.close()
    if user and check_password_hash(user['password'], password):
        session['user_id'] = user['id']
        session['username'] = username
        return jsonify({"message": "Login successful", "user": {"id": user['id'], "username": username}}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"}), 200

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    user_id = session.get('user_id')
    if not user_id: return jsonify({"error": "Unauthorized"}), 401

    conn = get_db_connection()
    transactions = [dict(row) for row in conn.execute("SELECT * FROM transactions WHERE user_id = ?", (user_id,)).fetchall()]
    rules = dict(conn.execute("SELECT * FROM rules WHERE user_id = ?", (user_id,)).fetchone() or {"max_category_percent": 35, "min_savings_percent": 20})
    conn.close()

    total_income = sum(t['amount'] for t in transactions if t['type'] == 'income')
    total_expense = sum(t['amount'] for t in transactions if t['type'] == 'expense')
    savings = total_income - total_expense
    savings_percent = round((savings / total_income * 100), 2) if total_income > 0 else 0

    # Simplified health score logic for API
    health_score = 100
    if savings_percent < rules['min_savings_percent']: health_score -= 20
    if total_expense > total_income: health_score -= 40
    
    return jsonify({
        "totalIncome": total_income,
        "totalExpense": total_expense,
        "savingsPercentage": savings_percent,
        "healthScore": max(0, health_score),
        "recentTransactions": transactions[-5:][::-1],
        "rules": rules
    })

@app.route('/api/transactions', methods=['GET', 'POST'])
def transactions_api():
    user_id = session.get('user_id')
    if not user_id: return jsonify({"error": "Unauthorized"}), 401

    conn = get_db_connection()
    if request.method == 'POST':
        try:
            data = request.json
            print(f"Adding transaction for user {user_id}: {data}")
            conn.execute(
                "INSERT INTO transactions (user_id, type, category, amount, date, mode, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (user_id, data['type'], data['category'], data['amount'], data['date'], data.get('mode', 'cash'), data.get('description', ''))
            )
            conn.commit()
            return jsonify({"message": "Transaction added"}), 201
        except Exception as e:
            print(f"Error adding transaction: {e}")
            return jsonify({"error": str(e)}), 500
        finally:
            conn.close()
    
    transactions = [dict(row) for row in conn.execute("SELECT * FROM transactions WHERE user_id = ?", (user_id,)).fetchall()]
    conn.close()
    return jsonify(transactions)

# --- Static File Serving ---

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
