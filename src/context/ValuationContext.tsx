import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { AllInputs, ValuationMetrics, ScoringResult, AnalysisResult } from "@/types";
import { DEFAULT_ASSUMPTIONS } from "@/types";
import { calculateAllMetrics } from "@/utils/calculations";
import { calculateScoring } from "@/utils/scoring";

interface ValuationContextType {
  inputs: AllInputs | null;
  metrics: ValuationMetrics | null;
  scoring: ScoringResult | null;
  analysisResult: AnalysisResult | null;
  isCalculating: boolean;
  calculate: (inputs: AllInputs) => void;
  loadAnalysisResult: (result: AnalysisResult) => void;
  clear: () => void;
}

const ValuationContext = createContext<ValuationContextType | null>(null);

const initialInputs: AllInputs = {
  company: {
    name: "",
    financialYear: new Date().getFullYear().toString(),
    sector: "NON_BANK",
  },
  financials: {
    totalShareholdersEquity: 0,
    sharesOutstanding: 0,
    profitAfterTax: 0,
    totalRevenue: 0,
    totalAssets: 0,
    totalLiabilities: 0,
    dividendPerShare: 0,
    previousYearDividend: 0,
  },
  market: {
    currentStockPrice: 0,
    week52High: 0,
    week52Low: 0,
  },
  assumptions: DEFAULT_ASSUMPTIONS,
};

export function ValuationProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<AllInputs | null>(null);
  const [metrics, setMetrics] = useState<ValuationMetrics | null>(null);
  const [scoring, setScoring] = useState<ScoringResult | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback((newInputs: AllInputs) => {
    setIsCalculating(true);

    try {
      // Calculate all metrics
      const calculatedMetrics = calculateAllMetrics(
        newInputs.financials,
        newInputs.market,
        newInputs.assumptions,
      );

      // Calculate scoring
      const scoringResult = calculateScoring(
        calculatedMetrics,
        newInputs.assumptions.riskFreeRate,
        newInputs.company.sector,
      );

      // Create complete analysis result
      const result: AnalysisResult = {
        inputs: newInputs,
        metrics: calculatedMetrics,
        scoring: scoringResult,
        timestamp: new Date().toISOString(),
      };

      setInputs(newInputs);
      setMetrics(calculatedMetrics);
      setScoring(scoringResult);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const loadAnalysisResult = useCallback((result: AnalysisResult) => {
    setInputs(result.inputs);
    setMetrics(result.metrics);
    setScoring(result.scoring);
    setAnalysisResult(result);
  }, []);

  const clear = useCallback(() => {
    setInputs(null);
    setMetrics(null);
    setScoring(null);
    setAnalysisResult(null);
  }, []);

  return (
    <ValuationContext.Provider
      value={{
        inputs,
        metrics,
        scoring,
        analysisResult,
        isCalculating,
        calculate,
        loadAnalysisResult,
        clear,
      }}
    >
      {children}
    </ValuationContext.Provider>
  );
}

export function useValuation() {
  const context = useContext(ValuationContext);
  if (!context) {
    throw new Error("useValuation must be used within a ValuationProvider");
  }
  return context;
}

export { initialInputs };
