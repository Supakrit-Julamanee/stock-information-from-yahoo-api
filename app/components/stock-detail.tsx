// components/stock-detail.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { YahooFinanceChartResponse } from "../types/yahoo-chart";

type Props = {
  chart: YahooFinanceChartResponse;
};

export default function StockDetail({ chart }: Props) {
  const meta = chart.chart.result[0].meta;

  const calculatePercentageChange = () => {
    const currentPrice = meta.regularMarketPrice;
    const high52Week = meta.fiftyTwoWeekHigh;
    if (!currentPrice || !high52Week) return null;

    const percentageChange = ((currentPrice - high52Week) / high52Week) * 100;
    return percentageChange.toFixed(2);
  };

  const percentageChange = calculatePercentageChange();

  return (
    <Card className="md:w-1/2 w-full">
      <CardHeader>
        <CardTitle>
          Stock Information
          <span className="ml-4 text-xs">
            {new Date(meta.regularMarketTime * 1000).toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Symbol</TableCell>
              <TableCell>
                {meta.shortName} ({meta.symbol})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Currency</TableCell>
              <TableCell>{meta.currency}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Market Price</TableCell>
              <TableCell>{meta.regularMarketPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">52-Week High</TableCell>
              <TableCell>{meta.fiftyTwoWeekHigh || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Percentage Change</TableCell>
              <TableCell className="text-red-500 font-bold">
                {percentageChange ?? "N/A"}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">52-Week Low</TableCell>
              <TableCell>{meta.fiftyTwoWeekLow || "N/A"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
