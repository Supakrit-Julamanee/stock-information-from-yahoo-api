"use client";

import { StockSummary } from "@/app/types/yahoo-finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// Bilingual translations for DefaultKeyStatistics keys
const keyStatisticsTranslations: Record<
  keyof StockSummary["defaultKeyStatistics"],
  { th: string; en: string }
> = {
  maxAge: { th: "อายุสูงสุด (วัน)", en: "Max Age (days)" },
  priceHint: { th: "คำแนะนำราคา", en: "Price Hint" },
  enterpriseValue: { th: "มูลค่าองค์กร", en: "Enterprise Value" },
  forwardPE: { th: "P/E ไปข้างหน้า", en: "Forward P/E" },
  profitMargins: { th: "อัตรากำไรสุทธิ", en: "Profit Margins" },
  floatShares: { th: "หุ้นที่ซื้อขายได้", en: "Float Shares" },
  sharesOutstanding: { th: "หุ้นที่ออกจำหน่าย", en: "Shares Outstanding" },
  sharesShort: { th: "หุ้นที่ขายชอร์ต", en: "Shares Short" },
  sharesShortPriorMonth: {
    th: "หุ้นที่ขายชอร์ตเดือนก่อน",
    en: "Shares Short Prior Month",
  },
  sharesShortPreviousMonthDate: {
    th: "วันที่ขายชอร์ตเดือนก่อน",
    en: "Shares Short Previous Month Date",
  },
  dateShortInterest: { th: "วันที่สนใจขายชอร์ต", en: "Short Interest Date" },
  sharesPercentSharesOut: {
    th: "เปอร์เซ็นต์หุ้นที่ขายชอร์ต",
    en: "Short % of Shares Out",
  },
  heldPercentInsiders: {
    th: "เปอร์เซ็นต์ที่ถือโดยคนภายใน",
    en: "% Held by Insiders",
  },
  heldPercentInstitutions: {
    th: "เปอร์เซ็นต์ที่ถือโดยสถาบัน",
    en: "% Held by Institutions",
  },
  shortRatio: { th: "อัตราส่วนขายชอร์ต", en: "Short Ratio" },
  shortPercentOfFloat: {
    th: "เปอร์เซ็นต์ขายชอร์ตของหุ้นลอยตัว",
    en: "Short % of Float",
  },
  beta: { th: "เบต้า", en: "Beta" },
  impliedSharesOutstanding: {
    th: "หุ้นที่ออกจำหน่ายโดยนัย",
    en: "Implied Shares Outstanding",
  },
  category: { th: "หมวดหมู่", en: "Category" },
  bookValue: { th: "มูลค่าตามบัญชี", en: "Book Value" },
  priceToBook: { th: "ราคาต่อมูลค่าตามบัญชี", en: "Price to Book" },
  fundFamily: { th: "ครอบครัวกองทุน", en: "Fund Family" },
  legalType: { th: "ประเภททางกฎหมาย", en: "Legal Type" },
  lastFiscalYearEnd: { th: "สิ้นปีบัญชีล่าสุด", en: "Last Fiscal Year End" },
  nextFiscalYearEnd: { th: "สิ้นปีบัญชีถัดไป", en: "Next Fiscal Year End" },
  mostRecentQuarter: { th: "ไตรมาสล่าสุด", en: "Most Recent Quarter" },
  earningsQuarterlyGrowth: {
    th: "การเติบโตของรายได้รายไตรมาส",
    en: "Quarterly Earnings Growth",
  },
  netIncomeToCommon: {
    th: "รายได้สุทธิต่อหุ้นสามัญ",
    en: "Net Income to Common",
  },
  trailingEps: { th: "EPS ย้อนหลัง", en: "Trailing EPS" },
  forwardEps: { th: "EPS ไปข้างหน้า", en: "Forward EPS" },
  lastSplitFactor: { th: "ปัจจัยการแตกหุ้นล่าสุด", en: "Last Split Factor" },
  lastSplitDate: { th: "วันที่แตกหุ้นล่าสุด", en: "Last Split Date" },
  enterpriseToRevenue: {
    th: "มูลค่าองค์กรต่อรายได้",
    en: "Enterprise to Revenue",
  },
  enterpriseToEbitda: {
    th: "มูลค่าองค์กรต่อ EBITDA",
    en: "Enterprise to EBITDA",
  },
  a_52WeekChange: { th: "การเปลี่ยนแปลง 52 สัปดาห์", en: "52-Week Change" },
  SandP52WeekChange: {
    th: "การเปลี่ยนแปลง S&P 52 สัปดาห์",
    en: "S&P 52-Week Change",
  },
  latestShareClass: { th: "คลาสหุ้นล่าสุด", en: "Latest Share Class" },
  leadInvestor: { th: "นักลงทุนนำ", en: "Lead Investor" },
};

type StockKeyStatisticsCardProps = {
  keyStatistics: StockSummary["defaultKeyStatistics"];
};

const formatDate = (date: Date | number | undefined): string => {
  if (!date) return "N/A";
  if (typeof date === "number")
    return new Date(date * 1000).toLocaleDateString();
  return new Date(date).toLocaleDateString();
};

export function StockKeyStatisticsTable({
  keyStatistics,
}: StockKeyStatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>สถิติสำคัญ / Key Statistics</CardTitle>
      </CardHeader>
      <CardContent className="h-80 overflow-y-auto">
        <Table>
          <TableBody>
            {Object.entries(keyStatistics).map(([key, value]) => {
              if (key === "maxAge") return null;
              const translation = keyStatisticsTranslations[
                key as keyof typeof keyStatisticsTranslations
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
                      : value === null
                      ? "N/A"
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
