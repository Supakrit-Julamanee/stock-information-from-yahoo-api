"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { YahooFinanceMeta } from "../../types/yahoo-chart";

const metaTranslations: Record<string, { th: string; en: string }> = {
  longName: { th: "ชื่อบริษัท", en: "Company Name" },
  symbol: { th: "สัญลักษณ์หุ้น", en: "Ticker Symbol" },
  exchangeName: { th: "ตลาดหลักทรัพย์", en: "Stock Exchange" },
  currency: { th: "สกุลเงินที่ใช้ซื้อขาย", en: "Trading Currency" },
  regularMarketPrice: { th: "ราคาซื้อขายล่าสุด", en: "Last Traded Price" },
  previousClose: { th: "ราคาปิดวันก่อนหน้า", en: "Previous Closing Price" },
  regularMarketDayHigh: { th: "ราคาสูงสุดวันนี้", en: "Intraday High" },
  regularMarketDayLow: { th: "ราคาต่ำสุดวันนี้", en: "Intraday Low" },
  fiftyTwoWeekHigh: { th: "ราคาสูงสุดในรอบ 52 สัปดาห์", en: "52-Week High" },
  fiftyTwoWeekLow: { th: "ราคาต่ำสุดในรอบ 52 สัปดาห์", en: "52-Week Low" },
  regularMarketVolume: { th: "ปริมาณการซื้อขาย (หุ้น)", en: "Trading Volume (Shares)" },
};

type StockMetaCardProps = {
  meta: YahooFinanceMeta;
};

export function StockMetaTable({ meta }: StockMetaCardProps) {
  // Define the essential fields we want to display in order
  const essentialFields = [
    "longName",
    "symbol",
    "exchangeName",
    "currency",
    "regularMarketPrice",
    "previousClose",
    "regularMarketDayHigh",
    "regularMarketDayLow",
    "fiftyTwoWeekHigh",
    "fiftyTwoWeekLow",
    "regularMarketVolume",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatValue = (value: any): string => {
    if (typeof value === "number") {
      // Format large numbers with commas
      return value.toLocaleString();
    }
    if (typeof value === "string" || typeof value === "boolean") {
      return value.toString();
    }
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    if (value !== undefined && value !== null) {
      return JSON.stringify(value);
    }
    return "N/A";
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>Basic Information</span>
            <span className="text-xs sm:text-sm font-normal text-gray-500">
              {new Date(meta.regularMarketTime * 1000).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="max-h-80 overflow-y-auto">
          <Table>
            <TableBody>
              {essentialFields.map((key) => {
                const value = meta[key as keyof YahooFinanceMeta];
                const translation = metaTranslations[key] || { th: key, en: key };

                return (
                  <TableRow key={key} className="border-b border-gray-100">
                    <TableCell className="py-3 px-2 sm:px-4 align-top">
                      <div className="font-medium text-sm text-gray-900">
                        {translation.en}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                        {translation.th}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-2 sm:px-4 text-right align-top">
                      <div className="text-sm font-semibold text-gray-900 break-words">
                        {formatValue(value)}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
