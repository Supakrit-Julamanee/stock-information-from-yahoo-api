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

      <div className="w-full">
        {!chart && !detail && (
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Stock Market Analysis
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Search for any stock symbol above to view detailed analysis including real-time charts, 
                financial data, and key statistics. Or explore market indices like NASDAQ 100 and S&P 500.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <h3 className="font-semibold text-blue-900 mb-2">Individual Analysis</h3>
                  <p className="text-sm text-blue-700">Search for specific stocks like AAPL, MSFT, GOOGL</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <h3 className="font-semibold text-green-900 mb-2">Market Indices</h3>
                  <p className="text-sm text-green-700">View NASDAQ 100 and S&P 500 heatmaps</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {chart && detail && (
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            <div className="space-y-4 sm:space-y-6">

              {/* Chart row - stacks on mobile, flex on larger screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="w-full">
                  <PriceChart chart={chart} />
                </div>
                <div className="w-full">
                  <IncomeStatementChart data={detail} />
                </div>
              </div>

              {/* Tables - 1 column on mobile, 2 on medium, 3 on large screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="w-full">
                  <StockMetaTable meta={chart.chart.result[0].meta} />
                </div>
                <div className="w-full">
                  <StockFinancialDataTable financialData={detail.financialData} />
                </div>
                <div className="w-full md:col-span-2 xl:col-span-1">
                  <StockKeyStatisticsTable
                    keyStatistics={detail.defaultKeyStatistics}
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}