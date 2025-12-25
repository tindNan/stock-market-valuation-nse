import type { ValuationMetrics, Sector, MetricScore, ScoringResult, VerdictType } from "@/types";
import { VERDICT_COLORS } from "@/types";

/**
 * Equal weight for all metrics (~14.29% each)
 *
 * We use equal weighting because:
 * 1. Academic research shows equal weights often perform as well as optimized weights
 * 2. It's more defensible than arbitrary weights without backtesting
 * 3. No single metric should dominate the overall score
 *
 * Reference: DeMiguel, V., Garlappi, L., & Uppal, R. (2009). "Optimal Versus Naive
 * Diversification: How Inefficient is the 1/N Portfolio Strategy?"
 */
const EQUAL_WEIGHT = 14.29;

/**
 * Score P/B Ratio
 * Weight: Equal (~14.29%)
 * < 1.0: +2 (undervalued)
 * 1.0 - 1.5: +1 (fairly valued)
 * 1.5 - 2.0: 0 (slight premium)
 * > 2.0: -1 (expensive)
 */
export function scorePBRatio(pbRatio: number): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (pbRatio <= 0) {
    score = 0;
    interpretation = "neutral";
    description = "Cannot calculate (negative or zero book value)";
  } else if (pbRatio < 1.0) {
    score = 2;
    interpretation = "positive";
    description = "Trading below book value - potentially undervalued";
  } else if (pbRatio < 1.5) {
    score = 1;
    interpretation = "positive";
    description = "Fairly valued relative to book value";
  } else if (pbRatio < 2.0) {
    score = 0;
    interpretation = "neutral";
    description = "Slight premium to book value";
  } else {
    score = -1;
    interpretation = "negative";
    description = "Expensive relative to book value";
  }

  return { value: pbRatio, score, weight: EQUAL_WEIGHT, interpretation, description };
}

/**
 * Score P/E Ratio
 * Weight: Equal (~14.29%)
 * < 8: +2 (cheap)
 * 8 - 12: +1 (reasonable)
 * 12 - 18: 0 (fairly valued)
 * > 18: -1 (expensive)
 */
export function scorePERatio(peRatio: number): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (peRatio <= 0) {
    score = 0;
    interpretation = "neutral";
    description = "Cannot calculate (negative or zero earnings)";
  } else if (peRatio < 8) {
    score = 2;
    interpretation = "positive";
    description = "Very cheap - paying less than 8 years of earnings";
  } else if (peRatio < 12) {
    score = 1;
    interpretation = "positive";
    description = "Reasonably valued";
  } else if (peRatio < 18) {
    score = 0;
    interpretation = "neutral";
    description = "Fairly valued - moderate growth expected";
  } else {
    score = -1;
    interpretation = "negative";
    description = "Expensive - high growth expectations priced in";
  }

  return { value: peRatio, score, weight: EQUAL_WEIGHT, interpretation, description };
}

/**
 * Score Dividend Yield
 * Weight: Equal (~14.29%)
 * > 7%: +2 (high yield)
 * 5% - 7%: +1 (good yield)
 * 2% - 5%: 0 (moderate)
 * < 2%: -1 (low yield)
 */
export function scoreDividendYield(dividendYield: number): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (dividendYield > 7) {
    score = 2;
    interpretation = "positive";
    description = "High yield - strong income potential";
  } else if (dividendYield >= 5) {
    score = 1;
    interpretation = "positive";
    description = "Good yield - solid income stock";
  } else if (dividendYield >= 2) {
    score = 0;
    interpretation = "neutral";
    description = "Moderate yield";
  } else {
    score = -1;
    interpretation = "negative";
    description = "Low yield - growth stock characteristics";
  }

  return {
    value: dividendYield,
    score,
    weight: EQUAL_WEIGHT,
    interpretation,
    description,
  };
}

/**
 * Score ROE (Return on Equity)
 * Weight: Equal (~14.29%)
 * > 20%: +2 (excellent)
 * 15% - 20%: +1 (good)
 * 10% - 15%: 0 (acceptable)
 * < 10%: -1 (poor)
 */
export function scoreROE(roe: number): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (roe > 20) {
    score = 2;
    interpretation = "positive";
    description = "Excellent profitability - efficient use of equity";
  } else if (roe >= 15) {
    score = 1;
    interpretation = "positive";
    description = "Good profitability";
  } else if (roe >= 10) {
    score = 0;
    interpretation = "neutral";
    description = "Acceptable profitability";
  } else {
    score = -1;
    interpretation = "negative";
    description = "Poor profitability";
  }

  return { value: roe, score, weight: EQUAL_WEIGHT, interpretation, description };
}

/**
 * Score Margin of Safety
 * Weight: Equal (~14.29%)
 * > 30%: +2 (excellent value)
 * 15% - 30%: +1 (good buying opportunity)
 * 0% - 15%: 0 (fairly valued)
 * < 0%: -1 (overvalued)
 */
export function scoreMarginOfSafety(marginOfSafety: number | null): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (marginOfSafety === null) {
    score = 0;
    interpretation = "neutral";
    description = "Cannot calculate (no dividend or invalid assumptions)";
  } else if (marginOfSafety > 30) {
    score = 2;
    interpretation = "positive";
    description = "Excellent value - significant discount to intrinsic value";
  } else if (marginOfSafety >= 15) {
    score = 1;
    interpretation = "positive";
    description = "Good buying opportunity";
  } else if (marginOfSafety >= 0) {
    score = 0;
    interpretation = "neutral";
    description = "Fairly valued";
  } else {
    score = -1;
    interpretation = "negative";
    description = "Overvalued - trading above intrinsic value";
  }

  return {
    value: marginOfSafety ?? 0,
    score,
    weight: EQUAL_WEIGHT,
    interpretation,
    description,
  };
}

/**
 * Score Payout Ratio
 * Weight: Equal (~14.29%)
 * 30% - 50%: +2 (balanced)
 * 50% - 70%: +1 (generous but sustainable)
 * < 30% or > 70%: 0 (either too conservative or potentially unsustainable)
 */
export function scorePayoutRatio(payoutRatio: number): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (payoutRatio <= 0) {
    score = 0;
    interpretation = "neutral";
    description = "No dividend or negative earnings";
  } else if (payoutRatio >= 30 && payoutRatio <= 50) {
    score = 2;
    interpretation = "positive";
    description = "Balanced approach - room for growth and dividends";
  } else if (payoutRatio > 50 && payoutRatio <= 70) {
    score = 1;
    interpretation = "positive";
    description = "Generous dividend policy";
  } else if (payoutRatio < 30) {
    score = 0;
    interpretation = "neutral";
    description = "Conservative - reinvesting in growth";
  } else {
    score = 0;
    interpretation = "neutral";
    description = "High payout - may not be sustainable long-term";
  }

  return { value: payoutRatio, score, weight: EQUAL_WEIGHT, interpretation, description };
}

/**
 * Score Earnings Yield vs T-Bill Rate
 * Weight: Equal (~14.29%)
 * > 1.5x T-bill: +2 (attractive)
 * 1.0x - 1.5x T-bill: +1 (reasonable)
 * < 1.0x T-bill: -1 (unattractive - bonds may be better)
 */
export function scoreEarningsYieldVsTBill(
  earningsYield: number,
  riskFreeRate: number,
): MetricScore {
  let score: number;
  let interpretation: MetricScore["interpretation"];
  let description: string;

  if (riskFreeRate <= 0) {
    score = 0;
    interpretation = "neutral";
    description = "Cannot compare (invalid risk-free rate)";
  } else {
    const ratio = earningsYield / riskFreeRate;

    if (ratio > 1.5) {
      score = 2;
      interpretation = "positive";
      description = "Earnings yield significantly exceeds T-bill rate";
    } else if (ratio >= 1.0) {
      score = 1;
      interpretation = "positive";
      description = "Earnings yield exceeds T-bill rate";
    } else {
      score = -1;
      interpretation = "negative";
      description = "T-bills may offer better risk-adjusted returns";
    }
  }

  return {
    value: earningsYield,
    score,
    weight: EQUAL_WEIGHT,
    interpretation,
    description,
  };
}

/**
 * Calculate the total weighted score from all metric scores
 * Returns a score roughly between -2 and +2
 */
export function calculateWeightedScore(scores: ScoringResult["scores"]): number {
  const totalWeight = Object.values(scores).reduce((sum, s) => sum + s.weight, 0);

  const weightedSum = Object.values(scores).reduce((sum, s) => sum + s.score * s.weight, 0);

  return weightedSum / totalWeight;
}

/**
 * Determine verdict based on weighted score
 * > 1.5: STRONG_BUY
 * 0.5 to 1.5: BUY
 * -0.5 to 0.5: HOLD
 * -1.5 to -0.5: SELL
 * < -1.5: STRONG_SELL
 */
export function getVerdict(weightedScore: number): VerdictType {
  if (weightedScore > 1.5) return "STRONG_BUY";
  if (weightedScore > 0.5) return "BUY";
  if (weightedScore >= -0.5) return "HOLD";
  if (weightedScore >= -1.5) return "SELL";
  return "STRONG_SELL";
}

/**
 * Get verdict display text
 */
export function getVerdictText(verdict: VerdictType): string {
  const texts: Record<VerdictType, string> = {
    STRONG_BUY: "STRONG BUY",
    BUY: "BUY",
    HOLD: "HOLD",
    SELL: "SELL",
    STRONG_SELL: "STRONG SELL",
  };
  return texts[verdict];
}

/**
 * Calculate complete scoring result from metrics
 */
export function calculateScoring(
  metrics: ValuationMetrics,
  riskFreeRate: number,
  _sector: Sector, // For future sector-specific adjustments
): ScoringResult {
  const scores = {
    pbRatio: scorePBRatio(metrics.pbRatio),
    peRatio: scorePERatio(metrics.peRatio),
    dividendYield: scoreDividendYield(metrics.dividendYield),
    roe: scoreROE(metrics.roe),
    marginOfSafety: scoreMarginOfSafety(metrics.marginOfSafety),
    payoutRatio: scorePayoutRatio(metrics.payoutRatio),
    earningsYieldVsTBill: scoreEarningsYieldVsTBill(metrics.earningsYield, riskFreeRate),
  };

  const totalWeightedScore = calculateWeightedScore(scores);
  const verdict = getVerdict(totalWeightedScore);
  const verdictColor = VERDICT_COLORS[verdict];

  return {
    scores,
    totalWeightedScore,
    verdict,
    verdictColor,
  };
}
