"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { YahooFinanceMeta } from "../../types/yahoo-chart";

// Bilingual translations for essential YahooFinanceMeta keys
const metaTranslations: Record<string, { th: string; en: string }> = {
  currency: { th: "สกุลเงิน", en: "Currency" },
  symbol: { th: "สัญลักษณ์", en: "Symbol" },
  exchangeName: { th: "ชื่อตลาด", en: "Exchange" },
  regularMarketPrice: { th: "ราคาปัจจุบัน", en: "Current Price" },
  previousClose: { th: "ราคาปิดก่อนหน้า", en: "Previous Close" },
  regularMarketDayHigh: { th: "สูงสุดประจำวัน", en: "Day High" },
  regularMarketDayLow: { th: "ต่ำสุดประจำวัน", en: "Day Low" },
  regularMarketVolume: { th: "ปริมาณซื้อขาย", en: "Volume" },
  fiftyTwoWeekHigh: { th: "สูงสุด 52 สัปดาห์", en: "52-Week High" },
  fiftyTwoWeekLow: { th: "ต่ำสุด 52 สัปดาห์", en: "52-Week Low" },
  longName: { th: "ชื่อเต็ม", en: "Full Name" },
};

type StockMetaCardProps = {
  meta: YahooFinanceMeta;
};

const formatNumber = (value: number | undefined): string => {
  if (value === undefined) return "N/A";
  return value.toLocaleString();
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          ข้อมูลพื้นฐาน / Basic Information
          <span className="ml-4 text-xs">
            {new Date(meta.regularMarketTime * 1000).toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80 overflow-y-auto">
        <Table>
          <TableBody>
            {essentialFields.map((key) => {
              const value = meta[key as keyof YahooFinanceMeta];
              const translation = metaTranslations[key] || { th: key, en: key };

              return (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {translation.th} <br />
                    <span className="text-xs text-gray-500">
                      {translation.en}
                    </span>
                  </TableCell>
                  <TableCell>
                    {typeof value === "string" || typeof value === "number"
                      ? value
                      : Array.isArray(value)
                        ? JSON.stringify(value)
                        : typeof value === "boolean"
                          ? value.toString()
                          : value !== undefined && value !== null
                            ? JSON.stringify(value)
                            : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
