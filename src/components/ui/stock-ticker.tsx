
import React from "react";
import { cn } from "@/lib/utils";

interface StockTickerProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  className?: string;
}

export const StockTicker: React.FC<StockTickerProps> = ({
  symbol,
  price,
  change,
  changePercent,
  className,
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className={cn("flex items-center space-x-4 p-2 border rounded-md", className)}>
      <div className="font-semibold">{symbol}</div>
      <div className="text-sm">${price.toFixed(2)}</div>
      <div className={cn(
        "text-xs",
        isPositive ? "text-success" : "text-destructive"
      )}>
        {isPositive ? "+" : ""}{change.toFixed(2)} ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
      </div>
    </div>
  );
};
