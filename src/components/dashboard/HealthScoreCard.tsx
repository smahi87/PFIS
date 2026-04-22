import { CircularProgress } from "./CircularProgress";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";

interface HealthScoreCardProps {
  score: number;
  previousScore?: number;
  factors?: {
    label: string;
    status: "good" | "warning" | "bad";
  }[];
}

export function HealthScoreCard({ score, previousScore, factors }: HealthScoreCardProps) {
  const getScoreColor = (s: number): "success" | "warning" | "destructive" => {
    if (s >= 70) return "success";
    if (s >= 40) return "warning";
    return "destructive";
  };

  const getScoreLabel = (s: number): string => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    if (s >= 40) return "Fair";
    return "Needs Attention";
  };

  const scoreDiff = previousScore ? score - previousScore : 0;

  const statusIcons = {
    good: <Shield className="w-4 h-4 text-success" />,
    warning: <AlertTriangle className="w-4 h-4 text-warning" />,
    bad: <AlertTriangle className="w-4 h-4 text-destructive" />,
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Financial Health</h3>
          <p className="text-sm text-muted-foreground">Overall score</p>
        </div>
        <div className="flex items-center gap-2">
          {scoreDiff !== 0 && (
            <div className={`flex items-center gap-1 text-sm ${scoreDiff > 0 ? "text-success" : "text-destructive"}`}>
              <TrendingUp className={`w-4 h-4 ${scoreDiff < 0 ? "rotate-180" : ""}`} />
              {Math.abs(scoreDiff)} pts
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <CircularProgress
          value={score}
          max={100}
          size={160}
          strokeWidth={12}
          label={`${score}`}
          sublabel={getScoreLabel(score)}
          color={getScoreColor(score)}
        />
      </div>

      {factors && factors.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Contributing Factors</p>
          {factors.map((factor, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {statusIcons[factor.status]}
              <span className={factor.status === "good" ? "text-foreground" : factor.status === "warning" ? "text-warning" : "text-destructive"}>
                {factor.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
