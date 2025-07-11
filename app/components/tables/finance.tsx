"use client";

import { StockSummary } from "@/app/types/yahoo-finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const financialDataTranslations: Record<
  keyof StockSummary["financialData"],
  { th: string; en: string }
> = {
  maxAge: { th: "อายุข้อมูลสูงสุด (วัน)", en: "Maximum Data Age (Days)" },
  currentPrice: { th: "ราคาปัจจุบัน", en: "Current Price" },
  targetHighPrice: { th: "ราคาเป้าหมายสูงสุด", en: "Target Price (High)" },
  targetLowPrice: { th: "ราคาเป้าหมายต่ำสุด", en: "Target Price (Low)" },
  targetMeanPrice: { th: "ราคาเป้าหมายเฉลี่ย", en: "Target Price (Average)" },
  targetMedianPrice: { th: "ราคาเป้าหมายค่ากลาง", en: "Target Price (Median)" },
  recommendationMean: {
    th: "ค่าเฉลี่ยคะแนนคำแนะนำ",
    en: "Recommendation Mean Score",
  },
  recommendationKey: { th: "สถานะคำแนะนำ", en: "Recommendation Status" },
  numberOfAnalystOpinions: {
    th: "จำนวนบทวิเคราะห์",
    en: "Number of Analyst Opinions",
  },
  totalCash: {
    th: "เงินสดและรายการเทียบเท่าเงินสด",
    en: "Total Cash & Equivalents",
  },
  totalCashPerShare: { th: "เงินสดต่อหุ้น", en: "Cash per Share" },
  ebitda: {
    th: "EBITDA (กำไรก่อนหักดอกเบี้ย ภาษี ค่าเสื่อมและค่าตัดจำหน่าย)",
    en: "EBITDA",
  },
  totalDebt: { th: "หนี้สินรวม", en: "Total Debt" },
  quickRatio: { th: "อัตราส่วนสภาพคล่องเร็ว", en: "Quick Ratio" },
  currentRatio: { th: "อัตราส่วนสภาพคล่องรวม", en: "Current Ratio" },
  totalRevenue: { th: "รายได้รวม", en: "Total Revenue" },
  debtToEquity: {
    th: "อัตราส่วนหนี้สินต่อส่วนผู้ถือหุ้น (D/E)",
    en: "Debt to Equity Ratio (D/E)",
  },
  revenuePerShare: { th: "รายได้ต่อหุ้น", en: "Revenue per Share" },
  returnOnAssets: {
    th: "ผลตอบแทนจากสินทรัพย์ (ROA)",
    en: "Return on Assets (ROA)",
  },
  returnOnEquity: {
    th: "ผลตอบแทนจากส่วนของผู้ถือหุ้น (ROE)",
    en: "Return on Equity (ROE)",
  },
  grossProfits: { th: "กำไรขั้นต้น", en: "Gross Profit" },
  freeCashflow: { th: "กระแสเงินสดอิสระ", en: "Free Cash Flow (FCF)" },
  operatingCashflow: {
    th: "กระแสเงินสดจากการดำเนินงาน",
    en: "Operating Cash Flow",
  },
  earningsGrowth: { th: "การเติบโตของกำไร", en: "Earnings Growth" },
  revenueGrowth: { th: "การเติบโตของรายได้", en: "Revenue Growth" },
  grossMargins: { th: "อัตรากำไรขั้นต้น", en: "Gross Margin" },
  ebitdaMargins: { th: "อัตรากำไรจาก EBITDA", en: "EBITDA Margin" },
  operatingMargins: { th: "อัตรากำไรจากการดำเนินงาน", en: "Operating Margin" },
  profitMargins: { th: "อัตรากำไรสุทธิ", en: "Net Profit Margin" },
  financialCurrency: { th: "สกุลเงินทางการเงิน", en: "Reporting Currency" },
};

type StockFinancialDataCardProps = {
  financialData: StockSummary["financialData"];
};

const formatDate = (date: Date | number | undefined): string => {
  if (!date) return "N/A";
  if (typeof date === "number")
    return new Date(date * 1000).toLocaleDateString();
  return new Date(date).toLocaleDateString();
};

export function StockFinancialDataTable({
  financialData,
}: StockFinancialDataCardProps) {
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
