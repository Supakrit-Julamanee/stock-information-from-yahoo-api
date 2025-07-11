// components/price-chart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { YahooFinanceChartResponse, ChartDataPoint } from "../types/yahoo-chart";

type Props = {
  chart: YahooFinanceChartResponse;
};

export default function PriceChart({ chart }: Props) {
  const formatChartData = (): ChartDataPoint[] => {
    const timestamps = chart.chart.result[0].timestamp;
    const closes = chart.chart.result[0].indicators?.quote?.[0]?.close;

    if (!timestamps || !closes) return [];

    return timestamps
      .map((ts, index) => ({
        date: new Date(ts * 1000).toLocaleDateString(),
        close: closes[index] as number,
      }))
      .filter((d): d is ChartDataPoint => d.close !== null);
  };

  const chartData = formatChartData();

  return (
    <Card className="md:w-1/2 w-full">
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
