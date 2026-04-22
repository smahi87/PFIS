import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

// Mock data - will be replaced with real data from backend
const mockData = {
  totalIncome: 75000,
  totalExpense: 42000,
  savingsPercentage: 44.0,
  previousIncome: 72000,
  previousExpense: 45000,
  healthScore: 78,
  previousHealthScore: 72,
  healthFactors: [
    { label: "Savings above 20% target", status: "good" as const },
    { label: "Rent payment within budget", status: "good" as const },
    { label: "UPI spending slightly high", status: "warning" as const },
  ],
  expensesByCategory: [
    { name: "Rent", value: 15000, color: "hsl(175, 80%, 45%)" },
    { name: "Food & Groceries", value: 12000, color: "hsl(150, 70%, 45%)" },
    { name: "Transport", value: 4500, color: "hsl(38, 92%, 50%)" },
    { name: "Utilities", value: 3200, color: "hsl(280, 60%, 55%)" },
    { name: "Subscriptions", value: 1500, color: "hsl(0, 72%, 55%)" },
    { name: "Shopping", value: 5000, color: "hsl(200, 70%, 50%)" },
    { name: "Other", value: 800, color: "hsl(220, 20%, 50%)" },
  ],
  monthlyTrend: [
    { month: "Aug", income: 65000, expense: 42000 },
    { month: "Sep", income: 65000, expense: 43000 },
    { month: "Oct", income: 70000, expense: 48000 },
    { month: "Nov", income: 70000, expense: 45000 },
    { month: "Dec", income: 72000, expense: 45000 },
    { month: "Jan", income: 75000, expense: 42000 },
  ],
  alerts: [
    {
      id: "1",
      type: "warning" as const,
      title: "Grocery spending near limit",
      description: "You've used 90% of your grocery budget for this month.",
      category: "Food",
    },
    {
      id: "2",
      type: "suggestion" as const,
      title: "Increase ELSS investments",
      description: "Consider allocating ₹5,000 more to ELSS for tax savings.",
    },
    {
      id: "3",
      type: "danger" as const,
      title: "Shopping overspend",
      description: "Exceeded shopping budget by 20% (₹1,000).",
      category: "Shopping",
    },
  ],
  recentTransactions: [
    {
      id: "1",
      type: "expense" as const,
      category: "Food",
      amount: 450,
      date: "Today",
      description: "Zomato Order",
      paymentMode: "upi" as const,
    },
    {
      id: "2",
      type: "income" as const,
      category: "Salary",
      amount: 75000,
      date: "Jan 1",
      description: "Monthly Salary",
      paymentMode: "bank" as const,
    },
    {
      id: "3",
      type: "expense" as const,
      category: "Transport",
      amount: 850,
      date: "Yesterday",
      description: "Uber Ride",
      paymentMode: "upi" as const,
    },
    {
      id: "4",
      type: "expense" as const,
      category: "Utilities",
      amount: 2100,
      date: "Jan 5",
      description: "Electricity Bill",
      paymentMode: "bank" as const,
    },
    {
      id: "5",
      type: "expense" as const,
      category: "Food",
      amount: 1200,
      date: "Jan 4",
      description: "Blinkit Groceries",
      paymentMode: "upi" as const,
    },
  ],
};

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="pt-12 lg:pt-0">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome back, <span className="gradient-text">Alex</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your financial overview for January 2026
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats
          totalIncome={mockData.totalIncome}
          totalExpense={mockData.totalExpense}
          savingsPercentage={mockData.savingsPercentage}
          previousIncome={mockData.previousIncome}
          previousExpense={mockData.previousExpense}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health Score */}
          <HealthScoreCard
            score={mockData.healthScore}
            previousScore={mockData.previousHealthScore}
            factors={mockData.healthFactors}
          />

          {/* Expense Breakdown */}
          <ExpenseChart data={mockData.expensesByCategory} />

          {/* Alerts */}
          <AlertsList alerts={mockData.alerts} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <TrendChart data={mockData.monthlyTrend} />

          {/* Recent Transactions */}
          <RecentTransactions transactions={mockData.recentTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
