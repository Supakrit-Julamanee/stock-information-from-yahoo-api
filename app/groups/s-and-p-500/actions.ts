"use server";

import yahooFinance from "yahoo-finance2";
import { SP500Stock } from "./sp500-table";
import { getSP500SymbolsSubset } from "./sp500-symbols";

// Function to fetch S&P 500 stock symbols dynamically
async function fetchSP500StockSymbols(): Promise<string[]> {
  try {
    // Try multiple reliable sources for S&P 500 symbols
    const sources = [
      "https://raw.githubusercontent.com/datasets/s-and-p-500-companies/master/data/constituents.csv",
      "https://www.slickcharts.com/sp500",
      "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    ];

    for (const source of sources) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(source, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const text = await response.text();
          
          // Parse CSV format
          if (source.includes('.csv')) {
            const lines = text.split('\n').slice(1); // Skip header
            const symbols = lines
              .map(line => line.split(',')[0]?.trim())
              .filter(symbol => symbol && symbol.length > 0 && symbol.length <= 5);
            
            if (symbols.length > 400) { // S&P 500 should have around 500 stocks
              return symbols;
            }
          }
          
          // Parse HTML format (basic extraction)
          if (source.includes('slickcharts.com') || source.includes('wikipedia.org')) {
            const symbolMatches = text.match(/[A-Z]{1,5}/g);
            if (symbolMatches) {
              const symbols = symbolMatches
                .filter(symbol => symbol.length >= 1 && symbol.length <= 5)
                .slice(0, 500);
              
              if (symbols.length > 400) {
                return symbols;
              }
            }
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${source}:`, error);
        continue;
      }
    }

    // If all external sources fail, use comprehensive fallback symbols
    console.warn("Using comprehensive fallback S&P 500 symbols");
    return getSP500SymbolsSubset(100); // Use top 100 for better performance
    
  } catch (error) {
    console.error("Error fetching S&P 500 symbols:", error);
    // Return fallback symbols as last resort
    return getSP500SymbolsSubset(100);
  }
}

// Test function to verify Yahoo Finance API connectivity
export async function testYahooFinanceAPI(): Promise<boolean> {
  try {
    console.log("Testing Yahoo Finance API connectivity...");
    const testQuote = await yahooFinance.quote("AAPL");
    console.log("Yahoo Finance API test successful:", testQuote?.longName);
    return true;
  } catch (error) {
    console.error("Yahoo Finance API test failed:", error);
    return false;
  }
}

export async function fetchSP500Data(): Promise<SP500Stock[]> {
  try {
    console.log("Starting S&P 500 data fetch...");
    
    // Test Yahoo Finance API connectivity first
    const apiTest = await testYahooFinanceAPI();
    if (!apiTest) {
      console.warn("Yahoo Finance API test failed, using fallback data");
      // Return some sample data if API is not available
      return [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          currentPrice: 150.00,
          fiftyTwoWeekHigh: 200.00,
          changePercent: -25.00,
          previousClose: 148.00,
          marketCap: 2500000000000,
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          currentPrice: 300.00,
          fiftyTwoWeekHigh: 350.00,
          changePercent: -14.29,
          previousClose: 298.00,
          marketCap: 2200000000000,
        }
      ];
    }
    
    // Get the dynamic list of symbols
    const symbols = await fetchSP500StockSymbols();
    
    if (!symbols || symbols.length === 0) {
      throw new Error("ไม่สามารถดึงรายชื่อหุ้น S&P 500 ได้");
    }

    console.log(`Successfully obtained ${symbols.length} S&P 500 symbols`);
    console.log(`First 10 symbols: ${symbols.slice(0, 10).join(', ')}`);

    // Fetch data for all symbols with rate limiting
    const batchSize = 10; // Process in batches to avoid rate limiting
    const results: (SP500Stock | null)[] = [];
    
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (symbol) => {
        try {
          // Add timeout to Yahoo Finance API calls
          const quotePromise = yahooFinance.quote(symbol);
          const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 15000)
          );
          
          const quote = await Promise.race([quotePromise, timeoutPromise]);

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

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add a small delay between batches to avoid rate limiting
      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Filter out null results and return valid data
    const validStocks = results.filter(
      (stock): stock is SP500Stock => stock !== null && stock.currentPrice > 0
    );

    console.log(`Successfully fetched data for ${validStocks.length} stocks`);

    if (validStocks.length === 0) {
      throw new Error("ไม่สามารถดึงข้อมูลหุ้น S&P 500 ได้ กรุณาลองใหม่อีกครั้ง");
    }

    return validStocks;
  } catch (error) {
    console.error("Error in fetchSP500Data:", error);
    throw new Error("ไม่สามารถดึงข้อมูลหุ้น S&P 500 ได้ กรุณาลองใหม่อีกครั้ง");
  }
}
