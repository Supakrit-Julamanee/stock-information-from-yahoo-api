'use server';

import yahooFinance from 'yahoo-finance2';
import { Nasdaq100Stock } from './nasdaq100-table';

// Fallback list of popular stocks in case API fails
const FALLBACK_POPULAR_STOCKS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'AVGO', 'ORCL', 'COST',
  'NFLX', 'ADBE', 'PEP', 'AMD', 'QCOM', 'INTC', 'CMCSA', 'TXN', 'AMGN', 'HON',
  'GILD', 'INTU', 'BKNG', 'ISRG', 'VRTX', 'REGN', 'MDLZ', 'ADP', 'MELI', 'KLAC',
  'LRCX', 'CSX', 'SBUX', 'MRVL', 'CRWD', 'FTNT', 'ADSK', 'ASML', 'NXPI', 'ABNB',
  'WDAY', 'MAR', 'CHTR', 'CPRT', 'FANG', 'PAYX', 'MNST', 'AEP', 'FAST', 'ROST'
];

// Function to fetch popular/trending stock symbols dynamically
async function fetchPopularStockSymbols(): Promise<string[]> {
  try {
    // Try to fetch from index-constituents API
    const response = await fetch('https://yfiua.github.io/index-constituents/constituents-nasdaq100.json');
    
    if (response.ok) {
      const data = await response.json();
      
      // Extract symbols from the response
      if (Array.isArray(data) && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const symbols = data.map((item: any) => {
          // Handle different possible data structures
          return item.symbol || item.Symbol || item.ticker || item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).filter((symbol: any) => typeof symbol === 'string' && symbol.length > 0);
        
        if (symbols.length > 50) {
          return symbols;
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch from index-constituents:', error);
  }

  return FALLBACK_POPULAR_STOCKS;
}

export async function fetchNasdaq100Data(): Promise<Nasdaq100Stock[]> {
  try {
    // Get the dynamic list of symbols
    const symbols = await fetchPopularStockSymbols();
    
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
        const changePercent = fiftyTwoWeekHigh > 0 
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
        } as Nasdaq100Stock;
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        return null;
      }
    });

    const results: (Nasdaq100Stock | null)[] = await Promise.all(promises);
    
    // Filter out null results and return valid data
    const validStocks = results.filter((stock): stock is Nasdaq100Stock => 
      stock !== null && stock.currentPrice > 0
    );

    return validStocks;
  } catch (error) {
    console.error('Error in fetchNasdaq100Data:', error);
    throw new Error('ไม่สามารถดึงข้อมูลหุ้นได้ กรุณาลองใหม่อีกครั้ง');
  }
} 