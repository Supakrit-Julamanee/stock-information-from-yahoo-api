// components/financials/balance-sheet-chart.tsx
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

export default function BalanceSheetChart({ data }: Props) {
  const history = data.balanceSheetHistory?.balanceSheetStatements;


  if (!history) return null;

  const chartData = history.map((item) => ({
    date: item.endDate.getFullYear(),
    totalAssets: item.totalAssets,
    totalLiabilities: item.totalLiab,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Sheet</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalAssets" fill="#6366f1" name="Assets" />
            <Bar dataKey="totalLiabilities" fill="#f97316" name="Liabilities" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
