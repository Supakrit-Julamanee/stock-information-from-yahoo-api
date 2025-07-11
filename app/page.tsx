"use client";

import { useState } from "react";
import { YahooFinanceChartResponse } from "@/app/types/yahoo-chart";
import { StockSummary } from "@/app/types/yahoo-finance";
import IncomeStatementChart from "./components/charts/income-statement-chart";
import Navbar from "./components/navbar";
import PriceChart from "./components/charts/price-chart";
import { StockMetaTable } from "./components/tables/meta";
import { StockFinancialDataTable } from "./components/tables/finance";
import { StockKeyStatisticsTable } from "./components/tables/keyStatistics";

export default function Home() {
  const [chart, setChart] = useState<YahooFinanceChartResponse | null>(null);
  const [detail, setDetail] = useState<StockSummary | null>(null);

  return (
    <>
      <Navbar setChart={setChart} setDetail={setDetail} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {chart && detail && (
          <div className="space-y-4 mt-4">

            {/* Chart row - stacks on mobile, flex on larger screens */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2">
                <PriceChart chart={chart} />
              </div>
              <div className="w-full lg:w-1/2">
                <IncomeStatementChart data={detail} />
              </div>
            </div>

            {/* Tables - 1 column on mobile, 2 on medium, 3 on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <StockMetaTable meta={chart.chart.result[0].meta} />
              </div>
              <div>
                <StockFinancialDataTable financialData={detail.financialData} />
              </div>
              <div>
                <StockKeyStatisticsTable
                  keyStatistics={detail.defaultKeyStatistics}
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}