"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./components/navbar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Home() {
  const [stockData, setStockData] = useState<any>(null);

  const formatChartData = () => {
    if (!stockData?.timestamp || !stockData?.indicators?.quote?.[0]?.close)
      return [];

    return stockData.timestamp
      .map((ts: number, index: number) => ({
        date: new Date(ts * 1000).toLocaleDateString(),
        close: stockData.indicators.quote[0].close[index],
      }))
      .filter((item: any) => item.close !== null);
  };

  // Calculate percentage change between current price and 52-week high
  const calculatePercentageChange = () => {
    if (
      !stockData?.meta?.regularMarketPrice ||
      !stockData?.meta?.fiftyTwoWeekHigh
    )
      return null;

    const currentPrice = stockData.meta.regularMarketPrice;
    const high52Week = stockData.meta.fiftyTwoWeekHigh;
    const percentageChange = ((currentPrice - high52Week) / high52Week) * 100;

    return {
      value: percentageChange.toFixed(2),
      isPositive: percentageChange >= 0,
    };
  };

  const percentageChange = calculatePercentageChange();

  return (
    <>
      <Navbar setStockData={setStockData} />

      <div className="container mx-auto gap-4 mt-4">
        {stockData && (
          <>
            {/* Percentage Change Banner */}
            {percentageChange && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-center">
                    Current price is{" "}
                    <span
                      className={
                        percentageChange.isPositive
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {percentageChange.value}%
                    </span>{" "}
                    {percentageChange.isPositive ? "above" : "below"} the
                    52-week high
                  </CardTitle>
                </CardHeader>
              </Card>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              {/* Chart */}
              <Card className="md:w-1/2 w-full">
                <CardHeader>
                  <CardTitle>Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formatChartData()}>
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

              {/* Stock Info Table */}
              <Card className="md:w-1/2 w-full">
                <CardHeader>
                  <CardTitle>Stock Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Symbol</TableCell>
                        <TableCell>{stockData.meta.symbol}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Currency</TableCell>
                        <TableCell>{stockData.meta.currency}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Market Price
                        </TableCell>
                        <TableCell>
                          {stockData.meta.regularMarketPrice}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          52-Week High
                        </TableCell>
                        <TableCell>
                          {stockData.meta.fiftyTwoWeekHigh || "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          52-Week Low
                        </TableCell>
                        <TableCell>
                          {stockData.meta.fiftyTwoWeekLow || "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Last Market Time
                        </TableCell>
                        <TableCell>
                          {new Date(
                            stockData.meta.regularMarketTime * 1000
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
}
