"use client";

import { StockSummary } from "@/app/types/yahoo-finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// Bilingual translations for DefaultKeyStatistics keys
const keyStatisticsTranslations: Record<
  keyof StockSummary["defaultKeyStatistics"],
  { th: string; en: string }
> = {
  maxAge: { th: "อายุข้อมูลสูงสุด (วัน)", en: "Maximum Data Age (Days)" },
  priceHint: { th: "ค่าปัดราคาที่แนะนำ", en: "Suggested Price Increment" },
  enterpriseValue: { th: "มูลค่ากิจการรวม", en: "Enterprise Value" },
  forwardPE: { th: "อัตราส่วน P/E คาดการณ์", en: "Forward P/E Ratio" },
  profitMargins: { th: "อัตรากำไรสุทธิ", en: "Net Profit Margin" },
  floatShares: { th: "หุ้นหมุนเวียน", en: "Float Shares" },
  sharesOutstanding: { th: "จำนวนหุ้นจดทะเบียน", en: "Shares Outstanding" },
  sharesShort: { th: "จำนวนหุ้นขายชอร์ต", en: "Shares Sold Short" },
  sharesShortPriorMonth: {
    th: "จำนวนหุ้นขายชอร์ตเดือนก่อน",
    en: "Short Interest (Prior Month)",
  },
  sharesShortPreviousMonthDate: {
    th: "วันที่บันทึกหุ้นขายชอร์ต (เดือนก่อน)",
    en: "Short Interest Date (Prior Month)",
  },
  dateShortInterest: {
    th: "วันที่รายงานการขายชอร์ต",
    en: "Short Interest Reporting Date",
  },
  sharesPercentSharesOut: {
    th: "สัดส่วนหุ้นชอร์ตต่อหุ้นทั้งหมด",
    en: "% Shares Short of Total Shares",
  },
  heldPercentInsiders: {
    th: "สัดส่วนถือครองโดยผู้บริหาร",
    en: "% Held by Insiders",
  },
  heldPercentInstitutions: {
    th: "สัดส่วนถือครองโดยสถาบัน",
    en: "% Held by Institutions",
  },
  shortRatio: { th: "อัตราส่วนการขายชอร์ต", en: "Short Ratio" },
  shortPercentOfFloat: {
    th: "เปอร์เซ็นต์หุ้นชอร์ตต่อหุ้นหมุนเวียน",
    en: "Short % of Float",
  },
  beta: { th: "เบต้า (ความผันผวน)", en: "Beta (Volatility)" },
  impliedSharesOutstanding: {
    th: "หุ้นจดทะเบียนโดยประมาณ",
    en: "Implied Shares Outstanding",
  },
  category: { th: "หมวดหมู่ธุรกิจ", en: "Industry Category" },
  bookValue: { th: "มูลค่าทางบัญชีต่อหุ้น", en: "Book Value per Share" },
  priceToBook: {
    th: "อัตราส่วนราคาต่อมูลค่าทางบัญชี",
    en: "Price-to-Book Ratio",
  },
  fundFamily: { th: "กลุ่มกองทุน", en: "Fund Family" },
  legalType: { th: "สถานะทางกฎหมาย", en: "Legal Entity Type" },
  lastFiscalYearEnd: { th: "สิ้นปีงบประมาณล่าสุด", en: "Last Fiscal Year End" },
  nextFiscalYearEnd: { th: "สิ้นปีงบประมาณถัดไป", en: "Next Fiscal Year End" },
  mostRecentQuarter: { th: "ไตรมาสล่าสุด", en: "Most Recent Quarter" },
  earningsQuarterlyGrowth: {
    th: "การเติบโตของกำไรสุทธิรายไตรมาส",
    en: "Quarterly Earnings Growth",
  },
  netIncomeToCommon: {
    th: "กำไรสุทธิสำหรับผู้ถือหุ้นสามัญ",
    en: "Net Income to Common Shareholders",
  },
  trailingEps: { th: "กำไรต่อหุ้นย้อนหลัง", en: "Trailing EPS" },
  forwardEps: { th: "กำไรต่อหุ้นคาดการณ์", en: "Forward EPS" },
  lastSplitFactor: { th: "อัตราการแตกหุ้นล่าสุด", en: "Latest Split Ratio" },
  lastSplitDate: { th: "วันที่แตกหุ้นล่าสุด", en: "Latest Split Date" },
  enterpriseToRevenue: {
    th: "มูลค่ากิจการต่อรายได้",
    en: "Enterprise Value to Revenue",
  },
  enterpriseToEbitda: {
    th: "มูลค่ากิจการต่อ EBITDA",
    en: "Enterprise Value to EBITDA",
  },
  a_52WeekChange: {
    th: "การเปลี่ยนแปลงราคาย้อนหลัง 52 สัปดาห์",
    en: "52-Week Price Change",
  },
  SandP52WeekChange: {
    th: "การเปลี่ยนแปลงของ S&P 500 ใน 52 สัปดาห์",
    en: "S&P 500 52-Week Change",
  },
  latestShareClass: { th: "คลาสหุ้นล่าสุด", en: "Latest Share Class" },
  leadInvestor: { th: "นักลงทุนหลัก", en: "Lead Investor" },
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
