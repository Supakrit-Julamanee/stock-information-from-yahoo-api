"use client";

import { useState } from "react";


import { YahooFinanceChartResponse } from "@/app/types/yahoo-chart";
import { StockSummary } from "@/app/types/yahoo-finance";
import BalanceSheetChart from "./components/balance-sheet-chart";
import CashFlowChart from "./components/cash-flow-chart";
import IncomeStatementChart from "./components/income-statement-chart";
import Navbar from "./components/navbar";
import PriceChart from "./components/price-chart";
import StockDetail from "./components/stock-detail";

export default function Home() {
  const [chart, setChart] = useState<YahooFinanceChartResponse | null>(null);
  const [detail, setDetail] = useState<StockSummary | null>(null);

  return (
    <>
      <Navbar setChart={setChart} setDetail={setDetail} />

      <div className="container mx-auto gap-4 mt-4">
        {chart && (
          <div className="flex flex-col md:flex-row gap-4">
            <PriceChart chart={chart} />
            <StockDetail chart={chart} />
          </div>
        )}

        {detail && (
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <IncomeStatementChart data={detail} />
            <BalanceSheetChart data={detail} />
            <CashFlowChart data={detail} />
          </div>
        )}
      </div>
    </>
  );
}
