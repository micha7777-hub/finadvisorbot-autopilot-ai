
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PortfolioAllocationChartProps {
  data: Array<{
    symbol: string;
    name: string;
    value: number;
    color?: string;
  }>;
}

const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];

export const PortfolioAllocationChart: React.FC<PortfolioAllocationChartProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="symbol"
            label={({ symbol, percent }) => `${symbol} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, props: any) => {
              const item = data.find(d => d.symbol === props.payload.symbol);
              return [`${value.toFixed(2)} (${(props.payload.percent * 100).toFixed(2)}%)`, item?.name || name];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
