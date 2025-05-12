
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PortfolioHistoryChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export const PortfolioHistoryChart: React.FC<PortfolioHistoryChartProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={[(dataMin: number) => Math.floor(dataMin * 0.95), (dataMax: number) => Math.ceil(dataMax * 1.05)]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tick={{ fontSize: 12 }}
          />
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString();
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
