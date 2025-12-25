import type { FinancialInputs, MarketInputs, AssumptionInputs, ValuationMetrics } from "@/types";

/**
 * 1. Book Value Per Share (BVPS)
 * Shows the net asset value backing each share
 * Formula: BVPS = Total Shareholders' Equity / Shares Outstanding
 */
export function calculateBVPS(equity: number, shares: number): number {
  if (shares <= 0) return 0;
  return equity / shares;
}

/**
 * 2. Price-to-Book Ratio (P/B)
 * Compares market price to book value
 * Formula: P/B = Current Stock Price / Book Value Per Share
 */
export function calculatePBRatio(price: number, bvps: number): number {
  if (bvps <= 0) return 0;
  return price / bvps;
}

/**
 * 3. Earnings Per Share (EPS)
 * Shows profit generated per share
 * Formula: EPS = Profit After Tax / Shares Outstanding
 */
export function calculateEPS(profit: number, shares: number): number {
  if (shares <= 0) return 0;
  return profit / shares;
}

/**
 * 4. Price-to-Earnings Ratio (P/E)
 * Shows how many years of earnings you're paying for
 * Formula: P/E = Current Stock Price / Earnings Per Share
 */
export function calculatePERatio(price: number, eps: number): number {
  if (eps <= 0) return 0; // Can't calculate meaningful P/E for negative or zero earnings
  return price / eps;
}

/**
 * 5. Dividend Yield
 * Shows cash return on investment as percentage
 * Formula: Dividend Yield = (Annual Dividend Per Share / Current Stock Price) × 100
 */
export function calculateDividendYield(dps: number, price: number): number {
  if (price <= 0) return 0;
  return (dps / price) * 100;
}

/**
 * 6. Dividend Payout Ratio
 * Shows what portion of profits are paid as dividends (percentage)
 * Formula: Payout Ratio = (Dividend Per Share / Earnings Per Share) × 100
 */
export function calculatePayoutRatio(dps: number, eps: number): number {
  if (eps <= 0) return 0; // Can't calculate for negative or zero earnings
  return (dps / eps) * 100;
}

/**
 * 7. Return on Equity (ROE)
 * Shows how efficiently company uses shareholder capital (percentage)
 * Formula: ROE = (Profit After Tax / Total Shareholders' Equity) × 100
 */
export function calculateROE(profit: number, equity: number): number {
  if (equity <= 0) return 0; // Can't calculate for negative or zero equity
  return (profit / equity) * 100;
}

/**
 * 8. Return on Assets (ROA)
 * Shows how efficiently company uses all assets (percentage)
 * Formula: ROA = (Profit After Tax / Total Assets) × 100
 */
export function calculateROA(profit: number, assets: number): number {
  if (assets <= 0) return 0;
  return (profit / assets) * 100;
}

/**
 * 9. Debt-to-Equity Ratio
 * Shows financial leverage/risk
 * Formula: D/E = Total Liabilities / Total Shareholders' Equity
 */
export function calculateDebtToEquity(liabilities: number, equity: number): number {
  if (equity <= 0) return 0; // Can't calculate for negative or zero equity
  return liabilities / equity;
}

/**
 * 10. Intrinsic Value (Gordon Growth Model / Dividend Discount Model)
 * Estimates what the stock should be worth based on future dividends
 * Formula: Intrinsic Value = D₁ / (r - g)
 * Where: D₁ = Next year's expected dividend = Current Dividend × (1 + g)
 *        r = Required rate of return (as decimal)
 *        g = Expected dividend growth rate (as decimal)
 *
 * Returns null if dividend is 0 or growth rate >= required rate
 */
export function calculateIntrinsicValue(
  currentDividend: number,
  requiredReturn: number, // as percentage (e.g., 15 for 15%)
  growthRate: number, // as percentage (e.g., 5 for 5%)
): number | null {
  // Can't calculate if no dividend
  if (currentDividend <= 0) return null;

  // Convert percentages to decimals
  const r = requiredReturn / 100;
  const g = growthRate / 100;

  // Gordon model requires r > g
  if (g >= r) return null;

  // Next year's expected dividend
  const d1 = currentDividend * (1 + g);

  return d1 / (r - g);
}

/**
 * 11. Margin of Safety
 * Shows how much buffer you have if analysis is wrong (percentage)
 * Formula: Margin of Safety = ((Intrinsic Value - Current Price) / Intrinsic Value) × 100
 *
 * Positive = undervalued, Negative = overvalued
 */
export function calculateMarginOfSafety(
  intrinsicValue: number | null,
  currentPrice: number,
): number | null {
  if (intrinsicValue === null || intrinsicValue <= 0) return null;
  return ((intrinsicValue - currentPrice) / intrinsicValue) * 100;
}

/**
 * 12. Earnings Yield
 * Inverse of P/E - shows return on price paid (percentage)
 * Formula: Earnings Yield = (EPS / Current Price) × 100
 */
export function calculateEarningsYield(eps: number, price: number): number {
  if (price <= 0) return 0;
  return (eps / price) * 100;
}

/**
 * 13. Dividend Growth Rate (Historical)
 * Shows how fast dividends have been growing (percentage)
 * Formula: Growth = ((Current Dividend / Previous Dividend) - 1) × 100
 */
export function calculateDividendGrowthRate(
  currentDividend: number,
  previousDividend: number,
): number | null {
  if (previousDividend <= 0) return null; // Can't calculate without previous dividend
  return (currentDividend / previousDividend - 1) * 100;
}

/**
 * 14. PEG Ratio (Price/Earnings to Growth)
 * P/E adjusted for growth - better for comparing companies
 * Formula: PEG = P/E Ratio / Earnings Growth Rate
 *
 * Note: We use dividend growth as a proxy for earnings growth
 */
export function calculatePEGRatio(
  peRatio: number,
  growthRate: number | null, // as percentage
): number | null {
  if (growthRate === null || growthRate <= 0) return null;
  if (peRatio <= 0) return null;
  return peRatio / growthRate;
}

/**
 * Calculate all 14 valuation metrics from inputs
 */
export function calculateAllMetrics(
  financials: FinancialInputs,
  market: MarketInputs,
  assumptions: AssumptionInputs,
): ValuationMetrics {
  // 1. Book Value Per Share
  const bvps = calculateBVPS(financials.totalShareholdersEquity, financials.sharesOutstanding);

  // 2. Price-to-Book Ratio
  const pbRatio = calculatePBRatio(market.currentStockPrice, bvps);

  // 3. Earnings Per Share
  const eps = calculateEPS(financials.profitAfterTax, financials.sharesOutstanding);

  // 4. Price-to-Earnings Ratio
  const peRatio = calculatePERatio(market.currentStockPrice, eps);

  // 5. Dividend Yield
  const dividendYield = calculateDividendYield(
    financials.dividendPerShare,
    market.currentStockPrice,
  );

  // 6. Payout Ratio
  const payoutRatio = calculatePayoutRatio(financials.dividendPerShare, eps);

  // 7. Return on Equity
  const roe = calculateROE(financials.profitAfterTax, financials.totalShareholdersEquity);

  // 8. Return on Assets
  const roa = calculateROA(financials.profitAfterTax, financials.totalAssets);

  // 9. Debt-to-Equity
  const debtToEquity = calculateDebtToEquity(
    financials.totalLiabilities,
    financials.totalShareholdersEquity,
  );

  // 10. Intrinsic Value
  const intrinsicValue = calculateIntrinsicValue(
    financials.dividendPerShare,
    assumptions.requiredRateOfReturn,
    assumptions.expectedDividendGrowthRate,
  );

  // 11. Margin of Safety
  const marginOfSafety = calculateMarginOfSafety(intrinsicValue, market.currentStockPrice);

  // 12. Earnings Yield
  const earningsYield = calculateEarningsYield(eps, market.currentStockPrice);

  // 13. Dividend Growth Rate
  const dividendGrowthRate = calculateDividendGrowthRate(
    financials.dividendPerShare,
    financials.previousYearDividend,
  );

  // 14. PEG Ratio (using dividend growth as proxy for earnings growth)
  const pegRatio = calculatePEGRatio(peRatio, dividendGrowthRate);

  return {
    bvps,
    pbRatio,
    eps,
    peRatio,
    dividendYield,
    payoutRatio,
    roe,
    roa,
    debtToEquity,
    intrinsicValue,
    marginOfSafety,
    earningsYield,
    dividendGrowthRate,
    pegRatio,
  };
}
