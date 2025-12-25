import { TrendingUp } from "lucide-react";
import SavedAnalyses from "@/components/SavedAnalyses";
import { useValuation } from "@/context/ValuationContext";

export default function Header() {
  const { analysisResult, loadAnalysisResult } = useValuation();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E3A5F] text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">NSE Stock Valuation Calculator</h1>
              <p className="text-sm text-muted-foreground">Is this stock worth buying?</p>
            </div>
          </div>
          <SavedAnalyses currentAnalysis={analysisResult} onLoad={loadAnalysisResult} />
        </div>
      </div>
    </header>
  );
}
