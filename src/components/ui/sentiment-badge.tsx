
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SentimentType = "positive" | "negative" | "neutral" | "very-positive" | "very-negative";

interface SentimentBadgeProps {
  sentiment: SentimentType;
  score?: number;
  showScore?: boolean;
  className?: string;
}

export const SentimentBadge: React.FC<SentimentBadgeProps> = ({
  sentiment,
  score,
  showScore = false,
  className,
}) => {
  const getVariant = () => {
    switch (sentiment) {
      case "positive":
      case "very-positive":
        return "bg-success text-success-foreground hover:bg-success/80";
      case "negative":
      case "very-negative":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/80";
      case "neutral":
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const getLabel = () => {
    switch (sentiment) {
      case "very-positive":
        return "Very Positive";
      case "positive":
        return "Positive";
      case "neutral":
        return "Neutral";
      case "negative":
        return "Negative";
      case "very-negative":
        return "Very Negative";
      default:
        return "Unknown";
    }
  };

  return (
    <Badge 
      variant="outline"
      className={cn(getVariant(), className)}
    >
      {getLabel()}{showScore && score !== undefined ? ` (${score.toFixed(2)})` : ""}
    </Badge>
  );
};
