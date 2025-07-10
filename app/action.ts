'use server';

import { YahooFinanceResponse } from "./type";

export const fetchStock = async (symbol: string): Promise<YahooFinanceResponse> => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=max&interval=1mo`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }

  const data: YahooFinanceResponse = await response.json();
  
  if (!data.chart.result) {
    throw new Error('No result found for the given symbol');
  }

  return data;
};