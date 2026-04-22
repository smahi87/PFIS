import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calculator, TrendingUp, PiggyBank, AlertTriangle } from "lucide-react";

interface SimulationResult {
  newSavings: number;
  newSavingsRate: number;
  healthScoreChange: number;
  alerts: string[];
}

export default function Simulation() {
  const [scenarioType, setScenarioType] = useState<"reduce" | "increase">("reduce");
  const [category, setCategory] = useState("Rent");
  const [percentage, setPercentage] = useState(10);
  const [incomeIncrease, setIncomeIncrease] = useState(5000);
  const [result, setResult] = useState<SimulationResult | null>(null);

  // Current baseline (mock data)
  const currentIncome = 75000;
  const currentExpense = 42000;
  const currentSavings = currentIncome - currentExpense;
  const currentSavingsRate = (currentSavings / currentIncome) * 100;
  const currentHealthScore = 78;

  const categoryExpenses: Record<string, number> = {
    Rent: 15000,
    Food: 12000,
    Transport: 4500,
    Utilities: 3200,
    Entertainment: 1500,
    Shopping: 5000,
  };

  const runSimulation = () => {
    let newExpense = currentExpense;
    let newIncome = currentIncome;
    const alerts: string[] = [];

    if (scenarioType === "reduce") {
      const reduction = categoryExpenses[category] * (percentage / 100);
      newExpense = currentExpense - reduction;
      
      if (percentage > 30) {
        alerts.push(`Reducing ${category} by ${percentage}% may significantly impact quality of life.`);
      }
    } else {
      newIncome = currentIncome + incomeIncrease;
    }

    const newSavings = newIncome - newExpense;
    const newSavingsRate = (newSavings / newIncome) * 100;
    const healthScoreChange = Math.round((newSavingsRate - currentSavingsRate) * 0.5);

    if (newSavingsRate > 50) {
      alerts.push("Excellent! This scenario achieves over 50% savings rate.");
    }

    setResult({
      newSavings,
      newSavingsRate,
      healthScoreChange,
      alerts,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">What-If Simulation</h1>
          <p className="text-muted-foreground mt-1">Explore financial scenarios and their impact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Simulation Controls */}
          <div className="glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Scenario Builder</h3>
                <p className="text-sm text-muted-foreground">Configure your what-if scenario</p>
              </div>
            </div>

            {/* Scenario Type */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Scenario Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setScenarioType("reduce")}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      scenarioType === "reduce"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Reduce Expense
                  </button>
                  <button
                    onClick={() => setScenarioType("increase")}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      scenarioType === "increase"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Increase Income
                  </button>
                </div>
              </div>

              {scenarioType === "reduce" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input-field w-full"
                    >
                      {Object.keys(categoryExpenses).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat} (₹{categoryExpenses[cat].toLocaleString('en-IN')}/month)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Reduction: {percentage}%
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/30">
                    <p className="text-sm text-muted-foreground">Estimated Reduction</p>
                    <p className="text-xl font-bold text-success">
                      ₹{(categoryExpenses[category] * (percentage / 100)).toLocaleString('en-IN')}/month
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Income</label>
                    <input
                      type="number"
                      value={incomeIncrease}
                      onChange={(e) => setIncomeIncrease(Number(e.target.value))}
                      className="input-field w-full"
                      placeholder="Enter amount"
                      min={0}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/30">
                    <p className="text-sm text-muted-foreground">New Total Income</p>
                    <p className="text-xl font-bold text-success">
                      ₹{(currentIncome + incomeIncrease).toLocaleString('en-IN')}/month
                    </p>
                  </div>
                </>
              )}

              <button onClick={runSimulation} className="btn-primary w-full mt-4">
                Run Simulation
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Simulation Results</h3>
                <p className="text-sm text-muted-foreground">Impact analysis</p>
              </div>
            </div>

            {result ? (
              <div className="space-y-6">
                {/* Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Current</p>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Savings</p>
                      <p className="text-xl font-bold">₹{currentSavings.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="text-lg font-semibold">{currentSavingsRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                    <p className="text-xs text-success uppercase tracking-wide">Projected</p>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Savings</p>
                      <p className="text-xl font-bold text-success">₹{result.newSavings.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="text-lg font-semibold text-success">{result.newSavingsRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Health Score Impact */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <PiggyBank className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Health Score Impact</p>
                      <p className="text-2xl font-bold">
                        {result.healthScoreChange >= 0 ? "+" : ""}
                        {result.healthScoreChange} points
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {currentHealthScore} → {currentHealthScore + result.healthScoreChange}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {result.alerts.length > 0 && (
                  <div className="space-y-2">
                    {result.alerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{alert}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Annual Projection */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Annual Projection</p>
                  <p className="text-2xl font-bold gradient-text">
                    +₹{((result.newSavings - currentSavings) * 12).toLocaleString('en-IN')}/year
                  </p>
                  <p className="text-sm text-muted-foreground">Additional savings potential</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Calculator className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Configure a scenario and click "Run Simulation"</p>
                <p className="text-sm text-muted-foreground mt-1">to see the projected impact</p>
              </div>
            )}
          </div>
        </div>

        {/* Explainability Note */}
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-3">How This Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Rule-Based Engine</p>
              <p>Calculations use transparent formulas based on your actual spending patterns and defined financial rules.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">No Black Box</p>
              <p>Every projection is explainable—no hidden ML models. You can trace exactly how each number is derived.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Personalized</p>
              <p>Results are based on your specific financial profile, not generic averages or assumptions.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
