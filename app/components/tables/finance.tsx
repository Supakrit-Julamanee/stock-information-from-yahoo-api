"use client";

import { StockSummary } from "@/app/types/yahoo-finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const financialDataTranslations: Record<
  keyof StockSummary["financialData"],
  { th: string; en: string }
> = {
  maxAge: { th: "อายุสูงสุด (วัน)", en: "Max Age (days)" },
  currentPrice: { th: "ราคาปัจจุบัน", en: "Current Price" },
  targetHighPrice: { th: "ราคาเป้าหมายสูงสุด", en: "Target High Price" },
  targetLowPrice: { th: "ราคาเป้าหมายต่ำสุด", en: "Target Low Price" },
  targetMeanPrice: { th: "ราคาเป้าหมายเฉลี่ย", en: "Target Mean Price" },
  targetMedianPrice: { th: "ราคาเป้าหมายมัธยฐาน", en: "Target Median Price" },
  recommendationMean: { th: "คะแนนแนะนำเฉลี่ย", en: "Recommendation Mean" },
  recommendationKey: { th: "คำแนะนำหลัก", en: "Recommendation Key" },
  numberOfAnalystOpinions: {
    th: "จำนวนความเห็นนักวิเคราะห์",
    en: "Analyst Opinions",
  },
  totalCash: { th: "เงินสดรวม", en: "Total Cash" },
  totalCashPerShare: { th: "เงินสดต่อหุ้น", en: "Cash Per Share" },
  ebitda: { th: "EBITDA", en: "EBITDA" },
  totalDebt: { th: "หนี้สินรวม", en: "Total Debt" },
  quickRatio: { th: "อัตราส่วนเร็ว", en: "Quick Ratio" },
  currentRatio: { th: "อัตราส่วนสภาพคล่อง", en: "Current Ratio" },
  totalRevenue: { th: "รายได้รวม", en: "Total Revenue" },
  debtToEquity: {
    th: "อัตราส่วนหนี้ต่อส่วนของผู้ถือหุ้น",
    en: "Debt to Equity",
  },
  revenuePerShare: { th: "รายได้ต่อหุ้น", en: "Revenue Per Share" },
  returnOnAssets: { th: "ผลตอบแทนจากสินทรัพย์", en: "Return on Assets" },
  returnOnEquity: {
    th: "ผลตอบแทนจากส่วนของผู้ถือหุ้น",
    en: "Return on Equity",
  },
  grossProfits: { th: "กำไรขั้นต้น", en: "Gross Profits" },
  freeCashflow: { th: "กระแสเงินสดอิสระ", en: "Free Cashflow" },
  operatingCashflow: {
    th: "กระแสเงินสดจากการดำเนินงาน",
    en: "Operating Cashflow",
  },
  earningsGrowth: { th: "การเติบโตของรายได้", en: "Earnings Growth" },
  revenueGrowth: { th: "การเติบโตของรายได้", en: "Revenue Growth" },
  grossMargins: { th: "อัตรากำไรขั้นต้น", en: "Gross Margins" },
  ebitdaMargins: { th: "อัตรากำไร EBITDA", en: "EBITDA Margins" },
  operatingMargins: { th: "อัตรากำไรจากการดำเนินงาน", en: "Operating Margins" },
  profitMargins: { th: "อัตรากำไรสุทธิ", en: "Profit Margins" },
  financialCurrency: { th: "สกุลเงินทางการเงิน", en: "Financial Currency" },
};

type StockFinancialDataCardProps = {
  financialData: StockSummary["financialData"];
};

const formatDate = (date: Date | number | undefined): string => {
  if (!date) return "N/A";
  if (typeof date === "number") return new Date(date * 1000).toLocaleDateString();
  return new Date(date).toLocaleDateString();
};

export function StockFinancialDataTable({ financialData }: StockFinancialDataCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ข้อมูลทางการเงิน / Financial Data</CardTitle>
      </CardHeader>
      <CardContent className="h-80 overflow-y-auto">
        <Table>
          <TableBody>
            {Object.entries(financialData).map(([key, value]) => {
              if (key === "maxAge") return null;
              const translation = financialDataTranslations[
                key as keyof typeof financialDataTranslations
              ] || { th: key, en: key };
              return (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {translation.en} <br />
                    <span className="text-xs text-gray-500">
                      {translation.th}
                    </span>
                  </TableCell>
                  <TableCell>
                    {value instanceof Date
                      ? formatDate(value)
                      : typeof value === "number"
                      ? value.toLocaleString()
                      : value || "N/A"}
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