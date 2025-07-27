"use server";

import yahooFinance from "yahoo-finance2";
import { SP500Stock } from "./sp500-table";

// Function to fetch S&P 500 stock symbols dynamically
async function fetchSP500StockSymbols(): Promise<string[]> {
  try {
    // Try to fetch from index-constituents API for S&P 500
    const response = await fetch(
      "https://yfiua.github.io/index-constituents/constituents-sp500.json"
    );

    if (response.ok) {
      const data = await response.json();

      // Extract symbols from the response
      if (Array.isArray(data) && data.length > 0) {
        const symbols = data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => {
            // Handle different possible data structures
            return item.symbol || item.Symbol || item.ticker || item;
          })
          .filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (symbol: any) => typeof symbol === "string" && symbol.length > 0
          );

        if (symbols.length > 0) {
          return symbols;
        }
      }
    }
  } catch (error) {
    console.warn("Failed to fetch from index-constituents:", error);
  }

  throw new Error("ไม่สามารถดึงรายชื่อหุ้น S&P 500 ได้ กรุณาลองใหม่อีกครั้ง");
}

export async function fetchSP500Data(): Promise<SP500Stock[]> {
  try {
    // Get the dynamic list of symbols
    const symbols = await fetchSP500StockSymbols();

    // Fetch data for all symbols
    const promises = symbols.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);

        if (!quote) {
          return null;
        }

        const currentPrice = quote.regularMarketPrice ?? 0;
        const previousClose = quote.regularMarketPreviousClose ?? 0;
        const fiftyTwoWeekHigh = quote.fiftyTwoWeekHigh ?? 0;
        const marketCap = quote.marketCap ?? 0;

        // Calculate change percentage from 52-week high
        const changePercent =
          fiftyTwoWeekHigh > 0
            ? ((currentPrice - fiftyTwoWeekHigh) / fiftyTwoWeekHigh) * 100
            : 0;

        return {
          symbol: symbol,
          name: quote.longName || quote.shortName || symbol,
          currentPrice,
          fiftyTwoWeekHigh,
          changePercent,
          previousClose,
          marketCap: marketCap > 0 ? marketCap : undefined,
        } as SP500Stock;
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        return null;
      }
    });

    const results: (SP500Stock | null)[] = await Promise.all(promises);

    // Filter out null results and return valid data
    const validStocks = results.filter(
      (stock): stock is SP500Stock => stock !== null && stock.currentPrice > 0
    );

    return validStocks;
  } catch (error) {
    console.error("Error in fetchSP500Data:", error);
    throw new Error("ไม่สามารถดึงข้อมูลหุ้น S&P 500 ได้ กรุณาลองใหม่อีกครั้ง");
  }
}
