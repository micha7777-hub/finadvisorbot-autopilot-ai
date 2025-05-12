
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
};
