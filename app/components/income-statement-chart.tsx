"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { StockSummary } from "@/app/types/yahoo-finance";

type Props = {
  data: StockSummary;
};

export default function IncomeStatementChart({ data }: Props) {
  const history = data.incomeStatementHistory?.incomeStatementHistory;

  if (!history) return null;

  const chartData = history.map((item) => ({
    date: item.endDate.getFullYear(),
    revenue: item.totalRevenue,
    netIncome: item.netIncome,
  })).reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Statement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
            <Bar dataKey="netIncome" fill="#10b981" name="Net Income" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
