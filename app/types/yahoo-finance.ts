export interface IncomeStatement {
  maxAge: number;
  endDate: Date;
  totalRevenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchDevelopment: string;
  sellingGeneralAdministrative: string;
  nonRecurring: string;
  otherOperatingExpenses: string;
  totalOperatingExpenses: number;
  operatingIncome: string;
  totalOtherIncomeExpenseNet: string;
  ebit: number;
  interestExpense: string;
  incomeBeforeTax: string;
  incomeTaxExpense: number;
  minorityInterest: string;
  netIncomeFromContinuingOps: string;
  discontinuedOperations: string;
  extraordinaryItems: string;
  effectOfAccountingCharges: string;
  otherItems: string;
  netIncome: number;
  netIncomeApplicableToCommonShares: string;
}

export interface BalanceSheet {
  maxAge: number;
  endDate: Date;
}

export interface CashflowStatement {
  maxAge: number;
  endDate: Date;
  netIncome: number;
}

export interface FinancialData {
  maxAge: number;
  currentPrice: number;
  targetHighPrice: number;
  targetLowPrice: number;
  targetMeanPrice: number;
  targetMedianPrice: number;
  recommendationMean: number;
  recommendationKey: string;
  numberOfAnalystOpinions: number;
  totalCash: number;
  totalCashPerShare: number;
  ebitda: number;
  totalDebt: number;
  quickRatio: number;
  currentRatio: number;
  totalRevenue: number;
  debtToEquity: number;
  revenuePerShare: number;
  returnOnAssets: number;
  returnOnEquity: number;
  grossProfits: number;
  freeCashflow: number;
  operatingCashflow: number;
  earningsGrowth: number;
  revenueGrowth: number;
  grossMargins: number;
  ebitdaMargins: number;
  operatingMargins: number;
  profitMargins: number;
  financialCurrency: string;
}

export interface DefaultKeyStatistics {
  maxAge: number;
  priceHint: number;
  enterpriseValue: number;
  forwardPE: number;
  profitMargins: number;
  floatShares: number;
  sharesOutstanding: number;
  sharesShort: number;
  sharesShortPriorMonth: Date;
  sharesShortPreviousMonthDate: Date;
  dateShortInterest: number;
  sharesPercentSharesOut: number;
  heldPercentInsiders: number;
  heldPercentInstitutions: number;
  shortRatio: number;
  shortPercentOfFloat: number;
  beta: number;
  impliedSharesOutstanding: number;
  category: string;
  bookValue: number;
  priceToBook: number;
  fundFamily: string;
  legalType: string;
  lastFiscalYearEnd: Date;
  nextFiscalYearEnd: Date;
  mostRecentQuarter: Date;
  earningsQuarterlyGrowth: number;
  netIncomeToCommon: number;
  trailingEps: number;
  forwardEps: number;
  lastSplitFactor: string;
  lastSplitDate: number;
  enterpriseToRevenue: number;
  enterpriseToEbitda: number;
  a_52WeekChange: number;
  SandP52WeekChange: number;
  latestShareClass: Date;
  leadInvestor: string;
}

export interface StockSummary {
  incomeStatementHistory: {
    incomeStatementHistory: IncomeStatement[];
    maxAge: string;
  };
  balanceSheetHistory: {
    balanceSheetStatements: BalanceSheet[];
    maxAge: string;
  };
  cashflowStatementHistory: {
    cashflowStatements: CashflowStatement[];
    maxAge: string;
  };
  financialData: FinancialData;
  defaultKeyStatistics: DefaultKeyStatistics;
}
