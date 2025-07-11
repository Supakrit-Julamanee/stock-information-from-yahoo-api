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

      <div className="container mx-auto">
        {chart && detail && (
          <div className="space-y-4 mt-4">

            <div className="flex space-x-4">
              <PriceChart chart={chart} />
              <IncomeStatementChart data={detail} />
            </div>

            <div className="grid grid-cols-3 gap-4 ">
              <StockMetaTable meta={chart.chart.result[0].meta} />
              <StockFinancialDataTable financialData={detail.financialData} />
              <StockKeyStatisticsTable
                keyStatistics={detail.defaultKeyStatistics}
              />
            </div>

            
          </div>
        )}
      </div>
    </>
  );
}
