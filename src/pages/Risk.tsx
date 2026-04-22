import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { CircularProgress } from "@/components/dashboard/CircularProgress";

interface RiskFactor {
  name: string;
  score: number;
  weight: number;
  status: "good" | "warning" | "danger";
  description: string;
}

const riskFactors: RiskFactor[] = [
  {
    name: "Emergency Fund Coverage",
    score: 85,
    weight: 25,
    status: "good",
    description: "You have 4.2 months of expenses covered. Target: 3-6 months.",
  },
  {
    name: "Debt-to-Income Ratio",
    score: 92,
    weight: 20,
    status: "good",
    description: "Your DTI is 8%, well below the 36% threshold.",
  },
  {
    name: "Savings Consistency",
    score: 78,
    weight: 20,
    status: "good",
    description: "You've hit savings targets in 5 of 6 months.",
  },
  {
    name: "Expense Volatility",
    score: 65,
    weight: 15,
    status: "warning",
    description: "Monthly variance of 12.3%. Could be more stable.",
  },
  {
    name: "Budget Adherence",
    score: 70,
    weight: 10,
    status: "warning",
    description: "2 category overruns this month.",
  },
  {
    name: "Income Diversification",
    score: 45,
    weight: 10,
    status: "danger",
    description: "85% of income from single source.",
  },
];

const calculateOverallScore = (factors: RiskFactor[]) => {
  const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);
  const weightedSum = factors.reduce((sum, f) => sum + f.score * f.weight, 0);
  return Math.round(weightedSum / totalWeight);
};

export default function Risk() {
  const overallScore = calculateOverallScore(riskFactors);
  
  const getScoreColor = (score: number): "success" | "warning" | "destructive" => {
    if (score >= 70) return "success";
    if (score >= 50) return "warning";
    return "destructive";
  };

  const getRiskLevel = (score: number): string => {
    if (score >= 80) return "Low Risk";
    if (score >= 60) return "Moderate Risk";
    if (score >= 40) return "Elevated Risk";
    return "High Risk";
  };

  const statusIcons = {
    good: <CheckCircle className="w-5 h-5 text-success" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    danger: <AlertTriangle className="w-5 h-5 text-destructive" />,
  };

  const statusColors = {
    good: "border-success/20 bg-success/5",
    warning: "border-warning/20 bg-warning/5",
    danger: "border-destructive/20 bg-destructive/5",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Risk Assessment</h1>
          <p className="text-muted-foreground mt-1">Behavioral risk scoring using explainable analytics</p>
        </div>

        {/* Overall Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-8 flex flex-col items-center animate-fade-in">
            <h3 className="text-lg font-semibold mb-6">Overall Risk Score</h3>
            <CircularProgress
              value={overallScore}
              max={100}
              size={180}
              strokeWidth={14}
              label={`${overallScore}`}
              sublabel={getRiskLevel(overallScore)}
              color={getScoreColor(overallScore)}
            />
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Based on weighted analysis of 6 risk factors
            </p>
          </div>

          <div className="lg:col-span-2 glass-card p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Risk Summary</h3>
                <p className="text-sm text-muted-foreground">Key findings from your profile</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <p className="text-2xl font-bold text-success">4</p>
                <p className="text-sm text-muted-foreground">Healthy Factors</p>
              </div>
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                <p className="text-2xl font-bold text-warning">1</p>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
              </div>
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-2xl font-bold text-destructive">1</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Top Recommendation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider diversifying income sources. Having 85% of income from a single source 
                    increases financial vulnerability. Freelance work or passive income could reduce this risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-6">Risk Factor Breakdown</h3>
          
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${statusColors[factor.status]}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {statusIcons[factor.status]}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{factor.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          Weight: {factor.weight}%
                        </span>
                        <span className={`text-lg font-bold ${
                          factor.status === "good" ? "text-success" :
                          factor.status === "warning" ? "text-warning" : "text-destructive"
                        }`}>
                          {factor.score}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                    
                    {/* Progress bar */}
                    <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          factor.status === "good" ? "bg-success" :
                          factor.status === "warning" ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Scoring Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-medium mb-2">How the score is calculated:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Each factor is scored 0-100 based on your data</li>
                <li>• Factors have different weights based on importance</li>
                <li>• Overall score = weighted average of all factors</li>
                <li>• Scores update monthly with new transaction data</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Explainability commitment:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• No black-box ML models used</li>
                <li>• Every score traceable to specific data</li>
                <li>• Weights based on financial best practices</li>
                <li>• Methodology is transparent and auditable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
