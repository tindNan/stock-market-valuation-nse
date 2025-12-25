// Sector types for different benchmark thresholds
export type Sector = "BANK" | "NON_BANK";

// Company information inputs
export interface CompanyInfo {
  name: string;
  financialYear: string;
  sector: Sector;
}

// Financial data from annual reports
export interface FinancialInputs {
  totalShareholdersEquity: number; // Total Shareholders' Equity
  sharesOutstanding: number; // Number of shares
  profitAfterTax: number; // Profit After Tax (PAT)
  totalRevenue: number; // Total Revenue
  totalAssets: number; // Total Assets
  totalLiabilities: number; // Total Liabilities
  dividendPerShare: number; // Current year DPS
  previousYearDividend: number; // Previous year DPS
}

// Market data inputs
export interface MarketInputs {
  currentStockPrice: number;
  week52High: number;
  week52Low: number;
}

// User assumptions for DCF/Gordon model
export interface AssumptionInputs {
  requiredRateOfReturn: number; // As percentage (e.g., 15 for 15%)
  expectedDividendGrowthRate: number; // As percentage (e.g., 5 for 5%)
  riskFreeRate: number; // Treasury bill rate as percentage
}

// All inputs combined
export interface AllInputs {
  company: CompanyInfo;
  financials: FinancialInputs;
  market: MarketInputs;
  assumptions: AssumptionInputs;
}

// All 14 calculated valuation metrics
export interface ValuationMetrics {
  // 1. Book Value Per Share
  bvps: number;
  // 2. Price-to-Book Ratio
  pbRatio: number;
  // 3. Earnings Per Share
  eps: number;
  // 4. Price-to-Earnings Ratio
  peRatio: number;
  // 5. Dividend Yield (percentage)
  dividendYield: number;
  // 6. Dividend Payout Ratio (percentage)
  payoutRatio: number;
  // 7. Return on Equity (percentage)
  roe: number;
  // 8. Return on Assets (percentage)
  roa: number;
  // 9. Debt-to-Equity Ratio
  debtToEquity: number;
  // 10. Intrinsic Value (Gordon Growth Model)
  intrinsicValue: number | null; // null if dividend is 0 or growth >= required return
  // 11. Margin of Safety (percentage)
  marginOfSafety: number | null; // null if intrinsic value cannot be calculated
  // 12. Earnings Yield (percentage)
  earningsYield: number;
  // 13. Dividend Growth Rate (percentage)
  dividendGrowthRate: number | null; // null if previous dividend is 0
  // 14. PEG Ratio
  pegRatio: number | null; // null if no earnings growth data
}

// Individual metric score
export interface MetricScore {
  value: number;
  score: number; // -1 to +2
  weight: number; // Percentage weight
  interpretation: "positive" | "neutral" | "negative";
  description: string;
}

// Verdict types
export type VerdictType = "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL";

// Scoring result
export interface ScoringResult {
  scores: {
    pbRatio: MetricScore;
    peRatio: MetricScore;
    dividendYield: MetricScore;
    roe: MetricScore;
    marginOfSafety: MetricScore;
    payoutRatio: MetricScore;
    earningsYieldVsTBill: MetricScore;
    debtToEquity: MetricScore;
  };
  totalWeightedScore: number;
  verdict: VerdictType;
  verdictColor: string;
}

// Complete analysis result
export interface AnalysisResult {
  inputs: AllInputs;
  metrics: ValuationMetrics;
  scoring: ScoringResult;
  timestamp: string;
}

// Saved analysis for LocalStorage
export interface SavedAnalysis {
  id: string;
  name: string;
  analysis: AnalysisResult;
  createdAt: string;
}

// Sector-specific thresholds for scoring
export interface SectorThresholds {
  debtToEquity: {
    conservative: number;
    moderate: number;
    leveraged: number;
  };
  roa: {
    poor: number;
    acceptable: number;
    good: number;
  };
}

// Default thresholds by sector
export const SECTOR_THRESHOLDS: Record<Sector, SectorThresholds> = {
  BANK: {
    debtToEquity: {
      conservative: 5,
      moderate: 8,
      leveraged: 12,
    },
    roa: {
      poor: 1,
      acceptable: 2,
      good: 3,
    },
  },
  NON_BANK: {
    debtToEquity: {
      conservative: 0.5,
      moderate: 1,
      leveraged: 2,
    },
    roa: {
      poor: 5,
      acceptable: 8,
      good: 12,
    },
  },
};

// Verdict colors based on the style guide
export const VERDICT_COLORS: Record<VerdictType, string> = {
  STRONG_BUY: "#28A745", // Green
  BUY: "#5cb85c", // Light Green
  HOLD: "#FFC107", // Amber
  SELL: "#fd7e14", // Orange
  STRONG_SELL: "#DC3545", // Red
};

// Default assumption values
export const DEFAULT_ASSUMPTIONS: AssumptionInputs = {
  requiredRateOfReturn: 15,
  expectedDividendGrowthRate: 5,
  riskFreeRate: 10,
};
