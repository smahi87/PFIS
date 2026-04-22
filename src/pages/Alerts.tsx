import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertTriangle, TrendingDown, Lightbulb, Bell, Check, X } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: string;
  type: "warning" | "danger" | "suggestion";
  title: string;
  description: string;
  category?: string;
  date: string;
  rule?: string;
  dismissed?: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Food spending near limit",
    description: "You've used 85% of your food budget with 10 days left in the month. Consider reducing dining out.",
    category: "Food",
    date: "2026-01-20",
    rule: "Max category spending: Food ≤ 15% of income",
  },
  {
    id: "2",
    type: "danger",
    title: "Entertainment overspend",
    description: "Exceeded entertainment budget by 15% ($52). This affects your overall savings rate.",
    category: "Entertainment",
    date: "2026-01-18",
    rule: "Max category spending: Entertainment ≤ 5% of income",
  },
  {
    id: "3",
    type: "suggestion",
    title: "Increase emergency savings",
    description: "Your savings rate is above target. Consider allocating $200 more to emergency fund this month.",
    date: "2026-01-15",
  },
  {
    id: "4",
    type: "warning",
    title: "Unusual spending pattern",
    description: "Shopping expenses are 40% higher than your 3-month average. Review recent purchases.",
    category: "Shopping",
    date: "2026-01-12",
    rule: "Expense volatility threshold: ±25%",
  },
  {
    id: "5",
    type: "suggestion",
    title: "Good savings consistency",
    description: "You've maintained above-target savings for 3 consecutive months. Keep it up!",
    date: "2026-01-10",
  },
  {
    id: "6",
    type: "danger",
    title: "Minimum savings not met",
    description: "Last month's savings fell below 20% target (18.5%). Review discretionary spending.",
    date: "2025-12-31",
    rule: "Min savings target: ≥ 20% of income",
  },
];

export default function Alerts() {
  const [filter, setFilter] = useState<"all" | "warning" | "danger" | "suggestion">("all");
  const [alerts, setAlerts] = useState(mockAlerts);

  const filteredAlerts = alerts.filter((a) => !a.dismissed && (filter === "all" || a.type === filter));

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)));
  };

  const alertStyles = {
    warning: {
      container: "border-l-warning bg-warning/5",
      icon: <AlertTriangle className="w-5 h-5 text-warning" />,
      badge: "bg-warning/20 text-warning",
    },
    danger: {
      container: "border-l-destructive bg-destructive/5",
      icon: <TrendingDown className="w-5 h-5 text-destructive" />,
      badge: "bg-destructive/20 text-destructive",
    },
    suggestion: {
      container: "border-l-success bg-success/5",
      icon: <Lightbulb className="w-5 h-5 text-success" />,
      badge: "bg-success/20 text-success",
    },
  };

  const counts = {
    all: alerts.filter((a) => !a.dismissed).length,
    warning: alerts.filter((a) => !a.dismissed && a.type === "warning").length,
    danger: alerts.filter((a) => !a.dismissed && a.type === "danger").length,
    suggestion: alerts.filter((a) => !a.dismissed && a.type === "suggestion").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Alerts & Suggestions</h1>
            <p className="text-muted-foreground mt-1">Rule-based financial insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {counts.all} active alerts
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "danger", "warning", "suggestion"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === type ? "bg-primary-foreground/20" : "bg-muted"
              }`}>
                {counts[type]}
              </span>
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Check className="w-16 h-16 mx-auto text-success/50 mb-4" />
              <p className="text-lg font-medium">All clear!</p>
              <p className="text-muted-foreground mt-1">No alerts in this category</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`glass-card p-5 border-l-4 animate-fade-in ${alertStyles[alert.type].container}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {alertStyles[alert.type].icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${alertStyles[alert.type].badge}`}>
                        {alert.type}
                      </span>
                      {alert.category && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-muted-foreground">
                          {alert.category}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground">{alert.description}</p>
                    
                    {alert.rule && (
                      <div className="mt-3 p-3 rounded-lg bg-secondary/30">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Triggered Rule</p>
                        <p className="text-sm font-mono">{alert.rule}</p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      {new Date(alert.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
                    title="Dismiss"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rules Explainer */}
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Active Financial Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="font-medium mb-2">Category Spending Limits</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Housing: ≤ 30% of income</li>
                <li>• Food: ≤ 15% of income</li>
                <li>• Entertainment: ≤ 5% of income</li>
                <li>• Transport: ≤ 10% of income</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="font-medium mb-2">Savings & Behavior</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Minimum savings: ≥ 20% of income</li>
                <li>• Expense volatility: ≤ 25% variance</li>
                <li>• Emergency fund: 3 months expenses</li>
                <li>• Digital payment ratio: tracked</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
