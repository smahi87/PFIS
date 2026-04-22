import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  description: string;
  paymentMode: "cash" | "card" | "upi" | "bank";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  maxItems?: number;
}

export function RecentTransactions({ transactions, maxItems = 5 }: RecentTransactionsProps) {
  const displayedTransactions = transactions.slice(0, maxItems);

  const paymentModeLabels = {
    cash: "Cash",
    card: "Card",
    upi: "UPI",
    bank: "Bank",
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Latest activity</p>
        </div>
        <Link
          to="/transactions"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {displayedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div
              className={`p-2 rounded-lg ${
                transaction.type === "income"
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {transaction.type === "income" ? (
                <ArrowDownRight className="w-5 h-5" />
              ) : (
                <ArrowUpRight className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{transaction.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{paymentModeLabels[transaction.paymentMode]}</span>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold ${
                  transaction.type === "income" ? "text-success" : "text-destructive"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}₹
                {transaction.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
