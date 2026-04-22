import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface QuickStatsProps {
  totalIncome: number;
  totalExpense: number;
  savingsPercentage: number;
  previousIncome?: number;
  previousExpense?: number;
}

export function QuickStats({
  totalIncome,
  totalExpense,
  savingsPercentage,
  previousIncome,
  previousExpense,
}: QuickStatsProps) {
  const balance = totalIncome - totalExpense;
  
  const incomeTrend = previousIncome
    ? ((totalIncome - previousIncome) / previousIncome) * 100
    : 0;
  const expenseTrend = previousExpense
    ? ((totalExpense - previousExpense) / previousExpense) * 100
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Income"
        value={`$${totalIncome.toLocaleString()}`}
        trend={incomeTrend > 0 ? "up" : incomeTrend < 0 ? "down" : "neutral"}
        trendValue={`${Math.abs(incomeTrend).toFixed(1)}%`}
        icon={<TrendingUp className="w-6 h-6" />}
        variant="success"
      />
      <MetricCard
        title="Total Expense"
        value={`$${totalExpense.toLocaleString()}`}
        trend={expenseTrend > 0 ? "up" : expenseTrend < 0 ? "down" : "neutral"}
        trendValue={`${Math.abs(expenseTrend).toFixed(1)}%`}
        icon={<TrendingDown className="w-6 h-6" />}
        variant="danger"
      />
      <MetricCard
        title="Net Balance"
        value={`$${Math.abs(balance).toLocaleString()}`}
        subtitle={balance >= 0 ? "Surplus" : "Deficit"}
        icon={<Wallet className="w-6 h-6" />}
        variant={balance >= 0 ? "success" : "danger"}
      />
      <MetricCard
        title="Savings Rate"
        value={`${savingsPercentage.toFixed(1)}%`}
        subtitle={savingsPercentage >= 20 ? "On track" : "Below target"}
        icon={<PiggyBank className="w-6 h-6" />}
        variant={savingsPercentage >= 20 ? "success" : savingsPercentage >= 10 ? "default" : "danger"}
      />
    </div>
  );
}
