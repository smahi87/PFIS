import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

// Mock data - will be replaced with real data from backend
const mockData = {
  totalIncome: 8500,
  totalExpense: 5200,
  savingsPercentage: 38.8,
  previousIncome: 7800,
  previousExpense: 4900,
  healthScore: 72,
  previousHealthScore: 68,
  healthFactors: [
    { label: "Savings above 20% target", status: "good" as const },
    { label: "Food spending at limit", status: "warning" as const },
    { label: "Emergency fund growing", status: "good" as const },
  ],
  expensesByCategory: [
    { name: "Housing", value: 1800, color: "hsl(175, 80%, 45%)" },
    { name: "Food", value: 850, color: "hsl(150, 70%, 45%)" },
    { name: "Transport", value: 420, color: "hsl(38, 92%, 50%)" },
    { name: "Utilities", value: 280, color: "hsl(280, 60%, 55%)" },
    { name: "Entertainment", value: 350, color: "hsl(0, 72%, 55%)" },
    { name: "Shopping", value: 500, color: "hsl(200, 70%, 50%)" },
    { name: "Other", value: 1000, color: "hsl(220, 20%, 50%)" },
  ],
  monthlyTrend: [
    { month: "Aug", income: 7200, expense: 4500 },
    { month: "Sep", income: 7500, expense: 4800 },
    { month: "Oct", income: 7800, expense: 5100 },
    { month: "Nov", income: 7800, expense: 4900 },
    { month: "Dec", income: 8200, expense: 5500 },
    { month: "Jan", income: 8500, expense: 5200 },
  ],
  alerts: [
    {
      id: "1",
      type: "warning" as const,
      title: "Food spending near limit",
      description: "You've used 85% of your food budget with 10 days left.",
      category: "Food",
    },
    {
      id: "2",
      type: "suggestion" as const,
      title: "Increase emergency savings",
      description: "Consider allocating $200 more to emergency fund this month.",
    },
    {
      id: "3",
      type: "danger" as const,
      title: "Entertainment overspend",
      description: "Exceeded entertainment budget by 15% ($52).",
      category: "Entertainment",
    },
  ],
  recentTransactions: [
    {
      id: "1",
      type: "expense" as const,
      category: "Food",
      amount: 45.50,
      date: "Today",
      description: "Grocery Store",
      paymentMode: "card" as const,
    },
    {
      id: "2",
      type: "income" as const,
      category: "Salary",
      amount: 4250,
      date: "Jan 15",
      description: "Monthly Salary",
      paymentMode: "bank" as const,
    },
    {
      id: "3",
      type: "expense" as const,
      category: "Transport",
      amount: 55,
      date: "Jan 14",
      description: "Gas Station",
      paymentMode: "card" as const,
    },
    {
      id: "4",
      type: "expense" as const,
      category: "Utilities",
      amount: 120,
      date: "Jan 12",
      description: "Electric Bill",
      paymentMode: "bank" as const,
    },
    {
      id: "5",
      type: "expense" as const,
      category: "Entertainment",
      amount: 15.99,
      date: "Jan 10",
      description: "Streaming Service",
      paymentMode: "card" as const,
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
