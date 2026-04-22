interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: "primary" | "success" | "warning" | "destructive";
}

export function CircularProgress({
  value,
  max = 100,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  color = "primary",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference - percentage * circumference;

  const colorClasses = {
    primary: "stroke-primary",
    success: "stroke-success",
    warning: "stroke-warning",
    destructive: "stroke-destructive",
  };

  const glowColors = {
    primary: "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]",
    success: "drop-shadow-[0_0_8px_hsl(var(--success)/0.5)]",
    warning: "drop-shadow-[0_0_8px_hsl(var(--warning)/0.5)]",
    destructive: "drop-shadow-[0_0_8px_hsl(var(--destructive)/0.5)]",
  };

  return (
    <div className="metric-ring">
      <svg
        width={size}
        height={size}
        className={glowColors[color]}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={colorClasses[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-2xl font-bold">{label}</span>}
        {sublabel && (
          <span className="text-sm text-muted-foreground">{sublabel}</span>
        )}
      </div>
    </div>
  );
}
