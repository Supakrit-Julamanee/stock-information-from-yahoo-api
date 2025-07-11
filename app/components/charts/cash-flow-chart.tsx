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

export default function CashFlowChart({ data }: Props) {
  const history = data.cashflowStatementHistory?.cashflowStatements;

  if (!history) return null;

  const chartData = history.map((item) => ({
    date: item.endDate.getFullYear(),
    // operating: item.totalCashFromOperatingActivities,
    // investing: item.totalCashflowsFromInvestingActivities,
    // financing: item.totalCashFromFinancingActivities,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="operating" fill="#22c55e" name="Operating" />
            <Bar dataKey="investing" fill="#0ea5e9" name="Investing" />
            <Bar dataKey="financing" fill="#ef4444" name="Financing" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
