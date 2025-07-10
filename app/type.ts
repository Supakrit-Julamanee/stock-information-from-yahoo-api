export interface YahooFinanceResponse {
  chart: {
    result: YahooFinanceResult[];
    error: null;
  };
}

export interface YahooFinanceResult {
  meta: {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    previousClose: number;
    scale: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: {
        timezone: string;
        start: number;
        end: number;
        gmtoffset: number;
      };
      regular: {
        timezone: string;
        start: number;
        end: number;
        gmtoffset: number;
      };
      post: {
        timezone: string;
        start: number;
        end: number;
        gmtoffset: number;
      };
    };
    tradingPeriods: [
      [
        {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        }
      ]
    ];
    dataGranularity: string;
    range: string;
    validRanges: string[];
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
  };
  timestamp: number[];
  indicators: {
    quote: [
      {
        open: (number | null)[];
        high: (number | null)[];
        low: (number | null)[];
        close: (number | null)[];
        volume: (number | null)[];
      }
    ];
    adjclose?: [
      {
        adjclose: number[];
      }
    ];
  };
}

export interface ChartDataPoint {
  date: string;
  close: number;
}

export interface PercentageChange {
  value: string;
  isPositive: boolean;
}