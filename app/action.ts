  'use server';

  import { resourceLimits } from "worker_threads";
  import { YahooFinanceChartResponse } from "./types/yahoo-chart";
  import yahooFinance from 'yahoo-finance2';
  import { StockSummary } from "./types/yahoo-finance";

  export async function fetchChart(symbol: string): Promise<YahooFinanceChartResponse>{
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=max&interval=1mo`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const data: YahooFinanceChartResponse = await response.json();
    
    if (!data.chart.result) {
      throw new Error('No result found for the given symbol');
    }

    return data;
  };

  export async function fetchDetail(symbol: string): Promise<StockSummary> {
    const result = await yahooFinance.quoteSummary(symbol, {
      modules: [
        'incomeStatementHistory',
        'balanceSheetHistory',
        'cashflowStatementHistory',
        'financialData',
        'defaultKeyStatistics',
      ],
    });

    console.log('case')
    console.log(result.cashflowStatementHistory?.cashflowStatements[0])


    return result as unknown as StockSummary;
  }