'use server';

import yahooFinance from 'yahoo-finance2';
import { Nasdaq100Stock } from './nasdaq50-table';

// NASDAQ 100 symbols (top 100 companies by market cap)
const NASDAQ_100_SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'AVGO', 'ORCL', 'COST',
  'NFLX', 'ADBE', 'PEP', 'AMD', 'QCOM', 'INTC', 'CMCSA', 'TXN', 'AMGN', 'HON',
  'GILD', 'INTU', 'BKNG', 'ISRG', 'VRTX', 'REGN', 'MDLZ', 'ADP', 'MELI', 'KLAC',
  'LRCX', 'CSX', 'SBUX', 'MRVL', 'CRWD', 'FTNT', 'ADSK', 'ASML', 'NXPI', 'ABNB',
  'WDAY', 'MAR', 'CHTR', 'CPRT', 'FANG', 'PAYX', 'MNST', 'AEP', 'FAST', 'ROST',
  'DDOG', 'ODFL', 'CTAS', 'KDP', 'EA', 'VRSK', 'LULU', 'GEHC', 'EXC', 'IDXX',
  'CTSH', 'TEAM', 'TTWO', 'ANSS', 'DXCM', 'ON', 'ZS', 'BIIB', 'ILMN', 'GFS',
  'MRNA', 'WBD', 'ALGN', 'ARM', 'SMCI', 'MDB', 'DLTR', 'CDW', 'ZM', 'SIRI',
  'EBAY', 'GOOG', 'KHC', 'WBA', 'JD', 'BIDU', 'LCID', 'RIVN', 'PDD', 'NTES',
  'TMUS', 'ISRG', 'GOOGL', 'ADBE', 'NFLX', 'PYPL', 'BABA', 'CRM', 'UBER', 'NOW'
];

export async function fetchNasdaq100Data(): Promise<Nasdaq100Stock[]> {
  try {
    console.log('Fetching NASDAQ 100 data...');
    
    // Fetch data for all symbols
    const promises = NASDAQ_100_SYMBOLS.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);
        
        if (!quote) {
          console.warn(`No data found for ${symbol}`);
          return null;
        }

        const currentPrice = quote.regularMarketPrice ?? 0;
        const previousClose = quote.regularMarketPreviousClose ?? 0;
        const fiftyTwoWeekHigh = quote.fiftyTwoWeekHigh ?? 0;
        
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

    console.log(`Successfully fetched data for ${validStocks.length}/${NASDAQ_100_SYMBOLS.length} stocks`);
    
    return validStocks;
  } catch (error) {
    console.error('Error in fetchNasdaq100Data:', error);
    throw new Error('ไม่สามารถดึงข้อมูลหุ้น NASDAQ 100 ได้ กรุณาลองใหม่อีกครั้ง');
  }
} 