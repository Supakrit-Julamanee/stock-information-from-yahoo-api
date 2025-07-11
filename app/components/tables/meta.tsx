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
