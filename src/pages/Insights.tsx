import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrendingUp, TrendingDown, Activity, Target, Zap, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const monthlyExpenses = [
  { month: "Aug", amount: 4500 },
  { month: "Sep", amount: 4800 },
  { month: "Oct", amount: 5100 },
  { month: "Nov", amount: 4900 },
  { month: "Dec", amount: 5500 },
  { month: "Jan", amount: 5200 },
];

const behaviorData = [
  { metric: "Savings", value: 85, fullMark: 100 },
  { metric: "Consistency", value: 94, fullMark: 100 },
  { metric: "Budget", value: 87, fullMark: 100 },
  { metric: "Low Volatility", value: 78, fullMark: 100 },
  { metric: "Digital", value: 95, fullMark: 100 },
  { metric: "Planning", value: 70, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border border-border">
        <p className="font-medium">{payload[0].payload.month}</p>
        <p className="text-primary">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Insights() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Insights</h1>
          <p className="text-muted-foreground mt-1">AI-powered financial analysis</p>
        </div>

        {/* Key Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Month</p>
                <p className="font-semibold">November 2025</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Lowest expense-to-income ratio at 62.8%. Savings rate peaked at 37.2%.
            </p>
          </div>

          <div className="glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <TrendingDown className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest Spend</p>
                <p className="font-semibold">December 2025</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Holiday spending increased expenses by 12%. Entertainment category doubled.
            </p>
          </div>

          <div className="glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volatility Score</p>
                <p className="font-semibold">12.3% (Low)</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your spending is highly predictable. This indicates strong financial discipline.
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Monthly Expense Trend</h3>
            <p className="text-sm text-muted-foreground mb-6">6-month overview</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="hsl(175, 80%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Behavior Radar */}
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">Behavioral Profile</h3>
            <p className="text-sm text-muted-foreground mb-6">Your financial habits</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={behaviorData}>
                  <PolarGrid stroke="hsl(222, 20%, 25%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(175, 80%, 45%)"
                    fill="hsl(175, 80%, 45%)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
              <p className="text-sm text-muted-foreground">Explainable analysis based on your data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-success/5 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-success" />
                <p className="font-medium text-success">Strength</p>
              </div>
              <p className="text-sm">
                <strong>Consistent saver:</strong> You've maintained above-target savings for 5 of the last 6 months. 
                Your average savings rate of 35.2% exceeds the recommended 20% target by 76%.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-warning" />
                <p className="font-medium text-warning">Opportunity</p>
              </div>
              <p className="text-sm">
                <strong>Food spending pattern:</strong> Your food expenses have increased 15% over 3 months. 
                A 10% reduction would save $85/month or $1,020/year.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                <p className="font-medium text-primary">Pattern</p>
              </div>
              <p className="text-sm">
                <strong>Weekend spending:</strong> 62% of discretionary spending occurs Friday-Sunday. 
                Consider pre-planning weekend activities to optimize entertainment budget.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-secondary border border-border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-foreground" />
                <p className="font-medium">Forecast</p>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Projection:</strong> Based on current trends, your year-end savings could reach $42,000, 
                exceeding last year by 18%. Maintain current discipline for best results.
              </p>
            </div>
          </div>
        </div>

        {/* Explainability Note */}
        <div className="glass-card p-4 bg-secondary/30 animate-fade-in">
          <p className="text-sm text-muted-foreground text-center">
            <strong className="text-foreground">Explainable AI:</strong> All insights are derived from your transaction history 
            using statistical analysis and rule-based algorithms. No opaque machine learning models are used—every conclusion 
            can be traced back to specific data points in your financial records.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
