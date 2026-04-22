import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: ReactNode;
  variant?: "default" | "success" | "danger";
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  variant = "default",
}: MetricCardProps) {
  const cardClass = {
    default: "glass-card",
    success: "glass-card-success",
    danger: "glass-card-danger",
  }[variant];

  const trendIcon = {
    up: <TrendingUp className="w-4 h-4 text-success" />,
    down: <TrendingDown className="w-4 h-4 text-destructive" />,
    neutral: <Minus className="w-4 h-4 text-muted-foreground" />,
  };

  const trendColor = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={`${cardClass} p-6 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          {trendIcon[trend]}
          <span className={`text-sm font-medium ${trendColor[trend]}`}>
            {trendValue}
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
