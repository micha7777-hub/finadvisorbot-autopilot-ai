
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  trend,
  trendValue,
  icon,
  className,
  action,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && trendValue && (
              <p
                className={cn("text-xs font-medium mt-1", {
                  "text-success": trend === "up",
                  "text-destructive": trend === "down",
                  "text-muted-foreground": trend === "neutral",
                })}
              >
                {trend === "up" && "▲"}
                {trend === "down" && "▼"}
                {trendValue}
              </p>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        
        {action && (
          <div className="mt-4 flex justify-end">
            {action}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
