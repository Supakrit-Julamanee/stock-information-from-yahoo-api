export interface IncomeStatement {
  endDate: Date;
  totalRevenue: { raw: number };
  grossProfit?: { raw: number };
  netIncome?: { raw: number };
  [key: string]: any;
}

export interface BalanceSheet {
  endDate: Date;
  totalAssets?: { raw: number };
  totalLiab?: { raw: number };
  totalStockholderEquity?: { raw: number };
  [key: string]: any;
}

export interface CashflowStatement {
  endDate: Date;
  totalCashFromOperatingActivities?: { raw: number };
  capitalExpenditures?: { raw: number };
  freeCashFlow?: { raw: number };
  [key: string]: any;
}

export interface FinancialData {
  currentPrice: number;
  ebitda?: number;
  totalRevenue?: number;
  returnOnAssets?: number;
  returnOnEquity?: number;
  freeCashflow?: number;
  debtToEquity?: number;
  grossProfits?: number;
  operatingCashflow?: number;
  earningsGrowth?: number;
  revenueGrowth?: number;
  grossMargins?: number;
  ebitdaMargins?: number;
  operatingMargins?: number;
  profitMargins?: number;
  financialCurrency: string;
  [key: string]: any;
}

export interface DefaultKeyStatistics {
  marketCap?: number;
  forwardPE?: number;
  trailingEps?: number;
  priceToBook?: number;
  beta?: number;
  lastDividendValue?: number;
  sharesOutstanding?: number;
  enterpriseValue?: number;
  [key: string]: any;
}

export interface StockSummary {
  incomeStatementHistory: {
    incomeStatementHistory: IncomeStatement[];
  };
  balanceSheetHistory: {
    balanceSheetStatements: BalanceSheet[];
  };
  cashflowStatementHistory: {
    cashflowStatements: CashflowStatement[];
  };
  financialData: FinancialData;
  defaultKeyStatistics: DefaultKeyStatistics;
}
