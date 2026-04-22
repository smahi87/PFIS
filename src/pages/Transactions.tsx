import * as React from "react";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, Filter, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { AddTransactionDialog } from "@/components/dashboard/AddTransactionDialog";

interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  description: string;
  payment_mode: "cash" | "card" | "upi" | "bank";
}

const categories = ["All", "Food", "Housing", "Transport", "Utilities", "Entertainment", "Shopping", "Salary", "Freelance", "Investment"];
const paymentModes = ["All", "Cash", "Card", "UPI", "Bank"];

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
  const [selectedPayment, setSelectedPayment] = useState("All");

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchesType = selectedType === "all" || t.type === selectedType;
    const matchesPayment = selectedPayment === "All" || t.payment_mode === selectedPayment.toLowerCase();
    return matchesSearch && matchesCategory && matchesType && matchesPayment;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground mt-1">Manage your income and expenses</p>
          </div>
          <AddTransactionDialog onSuccess={fetchTransactions} />
        </div>

        {/* Filters */}
        <div className="glass-card p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              {(["all", "income", "expense"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Payment Mode Filter */}
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="input-field"
            >
              {paymentModes.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="glass-card overflow-hidden min-h-[400px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="p-4 rounded-full bg-secondary/50">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold">No transactions found</p>
                <p className="text-muted-foreground">Try adjusting your filters or add a new transaction.</p>
              </div>
              <AddTransactionDialog onSuccess={fetchTransactions} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Payment</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
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
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{transaction.description}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground capitalize">
                        {transaction.payment_mode}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <span
                          className={`font-semibold ${
                            transaction.type === "income" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString('en-IN')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
