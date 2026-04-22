import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Bell, Shield, Sliders, CreditCard, LogOut } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    weeklyReport: true,
    ruleViolations: true,
    savingsGoals: false,
  });

  const [rules, setRules] = useState({
    maxFood: 15,
    maxEntertainment: 5,
    maxTransport: 10,
    minSavings: 20,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { icon: User, label: "Profile", active: false },
              { icon: Sliders, label: "Financial Rules", active: true },
              { icon: Bell, label: "Notifications", active: false },
              { icon: CreditCard, label: "Payment Methods", active: false },
              { icon: Shield, label: "Security", active: false },
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Rules */}
            <div className="glass-card p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-6">Financial Rules</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Configure spending limits and savings targets. Alerts will trigger when rules are violated.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Food Spending: {rules.maxFood}% of income
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={rules.maxFood}
                    onChange={(e) => setRules({ ...rules, maxFood: Number(e.target.value) })}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Entertainment: {rules.maxEntertainment}% of income
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={rules.maxEntertainment}
                    onChange={(e) => setRules({ ...rules, maxEntertainment: Number(e.target.value) })}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Transport: {rules.maxTransport}% of income
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={rules.maxTransport}
                    onChange={(e) => setRules({ ...rules, maxTransport: Number(e.target.value) })}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Min Savings Target: {rules.minSavings}% of income
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={rules.minSavings}
                    onChange={(e) => setRules({ ...rules, minSavings: Number(e.target.value) })}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-success"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>

                <button className="btn-primary w-full mt-4">Save Rules</button>
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-card p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>

              <div className="space-y-4">
                {[
                  { key: "budgetAlerts", label: "Budget Alerts", description: "Get notified when approaching category limits" },
                  { key: "weeklyReport", label: "Weekly Report", description: "Receive weekly spending summary" },
                  { key: "ruleViolations", label: "Rule Violations", description: "Immediate alerts when rules are violated" },
                  { key: "savingsGoals", label: "Savings Goals", description: "Progress updates on savings targets" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card p-6 border-destructive/20 animate-fade-in">
              <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
              <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
