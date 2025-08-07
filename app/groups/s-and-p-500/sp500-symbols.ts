// Comprehensive list of S&P 500 symbols (as of recent data)
// This serves as a reliable fallback when external APIs are unavailable
export const SP500_SYMBOLS = [
  "A", "AAL", "AAP", "AAPL", "ABBV", "ABC", "ABMD", "ABT", "ACN", "ADBE",
  "ADI", "ADM", "ADP", "ADS", "ADSK", "AEE", "AEP", "AES", "AFL", "AIG",
  "AIZ", "AJG", "AKAM", "ALB", "ALGN", "ALK", "ALL", "ALLE", "AMAT", "AMCR",
  "AMD", "AME", "AMGN", "AMP", "AMT", "AMZN", "ANET", "ANSS", "ANTM", "AON",
  "AOS", "APA", "APD", "APH", "APTV", "ARE", "ATO", "ATVI", "AVB", "AVGO",
  "AVY", "AWK", "AXP", "AZO", "BA", "BAC", "BAX", "BBWI", "BBY", "BDX",
  "BEN", "BF.B", "BIIB", "BIO", "BK", "BKNG", "BKR", "BLK", "BLL", "BMY",
  "BR", "BRK.B", "BRO", "BSX", "BWA", "BXP", "C", "CAG", "CAH", "CARR",
  "CAT", "CB", "CBOE", "CBRE", "CCI", "CCL", "CDAY", "CDNS", "CDW", "CE",
  "CEG", "CF", "CFG", "CHD", "CHRW", "CHTR", "CI", "CINF", "CL", "CLX",
  "CMA", "CMCSA", "CME", "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COO",
  "COP", "COST", "CPB", "CPRT", "CRL", "CRM", "CSCO", "CSX", "CTAS", "CTLT",
  "CTSH", "CTVA", "CTXS", "CVS", "CVX", "CZR", "D", "DAL", "DD", "DE",
  "DFS", "DG", "DGX", "DHI", "DHR", "DIS", "DISH", "DLR", "DLTR", "DOV",
  "DOW", "DPZ", "DRE", "DRI", "DTE", "DUK", "DVA", "DVN", "DXC", "DXCM",
  "EA", "EBAY", "ECL", "ED", "EFX", "EIX", "EL", "EMN", "EMR", "ENPH",
  "EOG", "EPAM", "EQR", "ES", "ESS", "ETN", "ETR", "ETSY", "EVRG", "EW",
  "EXC", "EXPD", "EXPE", "EXR", "F", "FANG", "FAST", "FB", "FBHS", "FCX",
  "FDS", "FDX", "FE", "FFIV", "FIS", "FISV", "FITB", "FLT", "FMC", "FOX",
  "FOXA", "FRC", "FRT", "FTNT", "FTV", "GD", "GE", "GILD", "GIS", "GL",
  "GLW", "GM", "GNRC", "GOOG", "GOOGL", "GPC", "GPN", "GRMN", "GS", "GWW",
  "HAL", "HAS", "HBAN", "HCA", "HD", "HES", "HIG", "HII", "HLT", "HOLX",
  "HON", "HPE", "HPQ", "HRL", "HSIC", "HST", "HSY", "HUM", "HWM", "IBM",
  "ICE", "IDXX", "IEX", "IFF", "ILMN", "INCY", "INTC", "INTU", "IP", "IPG",
  "IQV", "IR", "IRM", "ISRG", "IT", "ITW", "IVZ", "J", "JBHT", "JCI",
  "JKHY", "JNJ", "JNPR", "JPM", "K", "KEY", "KEYS", "KHC", "KIM", "KLAC",
  "KMB", "KMI", "KMX", "KO", "KR", "L", "LDOS", "LEN", "LH", "LHX", "LIN",
  "LKQ", "LLY", "LMT", "LNC", "LNT", "LOW", "LRCX", "LUMN", "LUV", "LVS",
  "LW", "LYB", "LYV", "MA", "MAA", "MAR", "MAS", "MCD", "MCHP", "MCK",
  "MCO", "MDLZ", "MDT", "MET", "MGM", "MHK", "MKC", "MKTX", "MLM", "MMC",
  "MMM", "MNST", "MO", "MOS", "MPC", "MPWR", "MRK", "MRNA", "MRO", "MS",
  "MSCI", "MSFT", "MSI", "MTB", "MTCH", "MTD", "MU", "NCLH", "NDAQ", "NDSN",
  "NEE", "NEM", "NFLX", "NI", "NKE", "NOC", "NOW", "NRG", "NSC", "NTAP",
  "NTRS", "NUE", "NVDA", "NVR", "NWL", "NWS", "NWSA", "NXPI", "O", "ODFL",
  "OGN", "OKE", "OMC", "ON", "ORCL", "ORLY", "OTIS", "OXY", "PAYC", "PAYX",
  "PCAR", "PCG", "PEAK", "PEG", "PEP", "PFE", "PFG", "PG", "PGR", "PH",
  "PHM", "PKG", "PKI", "PLD", "PM", "PNC", "PNR", "PNW", "POOL", "PPG",
  "PPL", "PRU", "PSA", "PSX", "PTC", "PVH", "PWR", "PXD", "PYPL", "QCOM",
  "QRVO", "RCL", "RE", "REG", "REGN", "RF", "RHI", "RJF", "RL", "RMD",
  "ROK", "ROL", "ROP", "ROST", "RSG", "RTX", "SBAC", "SBNY", "SBNY", "SBUX",
  "SCHW", "SEDG", "SEE", "SHW", "SIVB", "SJM", "SLB", "SNA", "SNPS", "SO",
  "SPG", "SPGI", "SRE", "STE", "STT", "STX", "STZ", "SWK", "SWKS", "SYF",
  "SYK", "SYY", "T", "TAP", "TDG", "TDY", "TECH", "TEL", "TER", "TFC",
  "TFX", "TGT", "TJX", "TMO", "TMUS", "TPR", "TRMB", "TROW", "TRV", "TSCO",
  "TSLA", "TSN", "TT", "TTWO", "TXN", "TXT", "TYL", "UAL", "UDR", "UHS",
  "ULTA", "UNH", "UNP", "UPS", "URI", "USB", "V", "VFC", "VIAC", "VLO",
  "VMC", "VNO", "VNT", "VRSK", "VRSN", "VRTX", "VTR", "VTRS", "VZ", "WAB",
  "WAT", "WBA", "WDC", "WEC", "WELL", "WFC", "WHR", "WM", "WMB", "WMT",
  "WRB", "WRK", "WST", "WTW", "WY", "WYNN", "XEL", "XLNX", "XOM", "XRAY",
  "XYL", "YUM", "ZBRA", "ZBH", "ZION", "ZTS"
];

// Function to get a subset of symbols for testing or when rate limiting is needed
export function getSP500SymbolsSubset(count: number = 100): string[] {
  return SP500_SYMBOLS.slice(0, count);
}

// Function to get symbols by sector (basic categorization)
export const SP500_SYMBOLS_BY_SECTOR = {
  technology: ["AAPL", "MSFT", "GOOGL", "GOOG", "AMZN", "NVDA", "META", "TSLA", "NFLX", "ADBE", "CRM", "ORCL", "CSCO", "INTC", "AMD", "QCOM", "AVGO", "TXN", "MU", "ADI"],
  healthcare: ["JNJ", "PFE", "UNH", "ABBV", "TMO", "DHR", "ABT", "LLY", "BMY", "AMGN", "GILD", "CVS", "ANTM", "CI", "HUM", "ISRG", "REGN", "VRTX", "BIIB", "ILMN"],
  financial: ["BRK.B", "JPM", "BAC", "WFC", "GS", "MS", "C", "USB", "PNC", "TFC", "COF", "AXP", "BLK", "SCHW", "CB", "SPGI", "ICE", "CME", "MCO", "AON"],
  consumer: ["PG", "KO", "PEP", "WMT", "COST", "HD", "MCD", "SBUX", "NKE", "TJX", "TGT", "LOW", "BKNG", "AMZN", "TSLA", "GM", "F", "MAR", "HLT", "CCL"],
  energy: ["XOM", "CVX", "COP", "EOG", "SLB", "PSX", "VLO", "MPC", "HAL", "BKR", "KMI", "OKE", "WMB", "PXD", "DVN", "HES", "APA", "FANG", "NOV", "FTI"],
  industrial: ["BA", "CAT", "MMM", "GE", "HON", "UPS", "RTX", "LMT", "NOC", "DE", "EMR", "ITW", "ETN", "ROK", "PH", "DOV", "XYL", "AME", "FTV", "IEX"],
  materials: ["LIN", "APD", "FCX", "NEM", "NUE", "ALB", "ECL", "SHW", "BLL", "VMC", "MOS", "IP", "WRK", "PKG", "SEE", "AVY", "EMN", "DOW", "DD", "CTVA"],
  utilities: ["NEE", "DUK", "SO", "D", "AEP", "SRE", "XEL", "WEC", "DTE", "EIX", "AEE", "PEG", "ED", "EVRG", "NI", "CMS", "CNP", "ATO", "LNT", "AES"],
  real_estate: ["AMT", "PLD", "CCI", "EQIX", "DLR", "PSA", "O", "SPG", "WELL", "VTR", "EQR", "AVB", "ARE", "MAA", "BXP", "FRT", "VNO", "UDR", "PEAK", "REG"],
  communication: ["GOOGL", "GOOG", "META", "NFLX", "CMCSA", "VZ", "T", "TMUS", "CHTR", "DIS", "FOX", "FOXA", "VIAC", "NWSA", "NWS", "LYV", "IPG", "OMC", "WPP", "PUB"]
};
