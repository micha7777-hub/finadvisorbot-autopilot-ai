
import React from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";

interface SentimentHeatmapProps {
  data: Array<{
    symbol: string;
    sentimentScore: number;
  }>;
}

export const SentimentHeatmap: React.FC<SentimentHeatmapProps> = ({ data }) => {
  // Function to get color based on sentiment score
  const getSentimentColor = (score: number) => {
    if (score >= 0.75) return "bg-green-500";
    if (score >= 0.6) return "bg-green-400";
    if (score >= 0.5) return "bg-green-300";
    if (score >= 0.4) return "bg-yellow-300";
    if (score >= 0.3) return "bg-yellow-500";
    if (score >= 0.2) return "bg-orange-400";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
      {data.map((item) => (
        <div
          key={item.symbol}
          className={`${getSentimentColor(
            item.sentimentScore
          )} rounded-md p-3 text-white flex flex-col items-center justify-center aspect-square`}
        >
          <div className="font-bold text-lg">{item.symbol}</div>
          <div className="text-sm opacity-90">{item.sentimentScore.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};
