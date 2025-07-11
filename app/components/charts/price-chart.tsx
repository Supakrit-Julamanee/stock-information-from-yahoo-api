"use client";

import {
  ChartDataPoint,
  YahooFinanceChartResponse,
} from "@/app/types/yahoo-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";

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

  // Get current price and 52-week high from meta data
  const meta = chart.chart.result[0].meta;
  const currentPrice = meta.regularMarketPrice;
  const fiftyTwoWeekHigh = meta.fiftyTwoWeekHigh;

  // Calculate percentage change
  const percentageChange =
    ((currentPrice - fiftyTwoWeekHigh) / fiftyTwoWeekHigh) * 100;
  const isPositive = percentageChange >= 0;
  const formattedPercentage = Math.abs(percentageChange).toFixed(2) + "%";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Price Chart
          <span
            className={`inline-flex items-center text-sm font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {formattedPercentage} from 52W High
          </span>
        </CardTitle>
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
