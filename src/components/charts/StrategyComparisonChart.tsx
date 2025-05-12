
import React from "react";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

interface StrategyComparisonChartProps {
  data: Array<{
    date: string;
    rlAgent: number;
    benchmark: number;
  }>;
}

export const StrategyComparisonChart: React.FC<StrategyComparisonChartProps> = ({ data }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            tick={{ fontSize: 12 }}
          />
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <Tooltip
            formatter={(value: number, name: string) => [value.toFixed(2), name === 'rlAgent' ? 'RL Strategy' : 'Benchmark']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString();
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value) => value === 'rlAgent' ? 'RL Strategy' : 'Benchmark'} />
          <Line type="monotone" dataKey="rlAgent" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} name="RL Strategy" />
          <Line type="monotone" dataKey="benchmark" stroke="#9CA3AF" strokeWidth={2} dot={false} name="Benchmark" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
