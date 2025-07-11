export interface ChartDataPoint {
  date: string;
  close: number;
}

export interface PercentageChange {
  value: string;
  isPositive: boolean;
}

export interface YahooFinanceChartResponse {
  chart: {
    result: YahooFinanceResult[];
    error: null | {
      code: string;
      description: string;
    };
  };
}

export interface YahooFinanceResult {
  meta: YahooFinanceMeta;
  timestamp: number[];
  indicators: {
    quote: QuoteIndicator[];
  };
}

export interface YahooFinanceMeta {
  currency: string;
  symbol: string;
  exchangeName: string;
  fullExchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  hasPrePostMarketData: boolean;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  longName: string;
  shortName: string;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  currentTradingPeriod: {
    pre: TradingPeriod;
    regular: TradingPeriod;
    post: TradingPeriod;
  };
  tradingPeriods: TradingPeriod[][];
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface TradingPeriod {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface QuoteIndicator {
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}
