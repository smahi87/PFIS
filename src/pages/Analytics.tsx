import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Aug", income: 7200, expense: 4500 },
  { month: "Sep", income: 7500, expense: 4800 },
  { month: "Oct", income: 7800, expense: 5100 },
  { month: "Nov", income: 7800, expense: 4900 },
  { month: "Dec", income: 8200, expense: 5500 },
  { month: "Jan", income: 8500, expense: 5200 },
];

const expensesByCategory = [
  { name: "Housing", value: 1800, color: "hsl(175, 80%, 45%)" },
  { name: "Food", value: 850, color: "hsl(150, 70%, 45%)" },
  { name: "Transport", value: 420, color: "hsl(38, 92%, 50%)" },
  { name: "Utilities", value: 280, color: "hsl(280, 60%, 55%)" },
  { name: "Entertainment", value: 350, color: "hsl(0, 72%, 55%)" },
  { name: "Shopping", value: 500, color: "hsl(200, 70%, 50%)" },
];

const paymentModeData = [
  { name: "Card", value: 2800, percentage: 54 },
  { name: "Bank", value: 1600, percentage: 31 },
  { name: "UPI", value: 500, percentage: 10 },
  { name: "Cash", value: 300, percentage: 5 },
];

const savingsData = [
  { month: "Aug", savings: 2700, target: 2500 },
  { month: "Sep", savings: 2700, target: 2500 },
  { month: "Oct", savings: 2700, target: 2500 },
  { month: "Nov", savings: 2900, target: 2500 },
  { month: "Dec", savings: 2700, target: 2500 },
  { month: "Jan", savings: 3300, target: 2500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your financial patterns</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expense */}
          <TrendChart data={monthlyData} />

          {/* Expense Breakdown */}
          <ExpenseChart data={expensesByCategory} />

          {/* Payment Mode Distribution */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Cash vs Digital</h3>
            <p className="text-sm text-muted-foreground mb-6">Payment method breakdown</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentModeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" horizontal={false} />
                  <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                  <YAxis type="category" dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} width={60} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(175, 80%, 45%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Digital Payments</p>
                <p className="text-2xl font-bold text-primary">95%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cash Payments</p>
                <p className="text-2xl font-bold">5%</p>
              </div>
            </div>
          </div>

          {/* Savings Trend */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Savings Consistency</h3>
            <p className="text-sm text-muted-foreground mb-6">Actual vs Target savings</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="hsl(150, 70%, 45%)" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(150, 70%, 45%)", strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(215, 20%, 55%)" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Actual Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-muted-foreground" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--muted-foreground)) 0, hsl(var(--muted-foreground)) 5px, transparent 5px, transparent 10px)" }} />
                <span className="text-sm text-muted-foreground">Target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Behavioral Metrics */}
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-6">Behavioral Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-2">Expense Volatility</p>
              <p className="text-2xl font-bold">12.3%</p>
              <p className="text-sm text-success mt-1">Low variance</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-2">Savings Consistency</p>
              <p className="text-2xl font-bold">94%</p>
              <p className="text-sm text-success mt-1">Very consistent</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-2">Rule Violations</p>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-warning mt-1">This month</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-2">Budget Adherence</p>
              <p className="text-2xl font-bold">87%</p>
              <p className="text-sm text-success mt-1">Above average</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
