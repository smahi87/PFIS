import { AlertTriangle, TrendingDown, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Alert {
  id: string;
  type: "warning" | "danger" | "suggestion";
  title: string;
  description: string;
  category?: string;
}

interface AlertsListProps {
  alerts: Alert[];
  maxItems?: number;
}

export function AlertsList({ alerts, maxItems = 3 }: AlertsListProps) {
  const displayedAlerts = alerts.slice(0, maxItems);

  const alertStyles = {
    warning: {
      container: "alert-warning",
      icon: <AlertTriangle className="w-5 h-5 text-warning" />,
    },
    danger: {
      container: "alert-danger",
      icon: <TrendingDown className="w-5 h-5 text-destructive" />,
    },
    suggestion: {
      container: "alert-success",
      icon: <Lightbulb className="w-5 h-5 text-success" />,
    },
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Alerts & Suggestions</h3>
          <p className="text-sm text-muted-foreground">Rule-based insights</p>
        </div>
        <Link
          to="/alerts"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {displayedAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No alerts at this time</p>
            <p className="text-sm">Your finances look healthy!</p>
          </div>
        ) : (
          displayedAlerts.map((alert) => (
            <div key={alert.id} className={alertStyles[alert.type].container}>
              <div className="flex items-start gap-3">
                {alertStyles[alert.type].icon}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{alert.title}</p>
                    {alert.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {alert.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
