import { Link } from "@tanstack/react-router";
import { TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import SavedAnalyses from "@/components/SavedAnalyses";
import { useValuation } from "@/context/ValuationContext";

export default function Header() {
  const { analysisResult, loadAnalysisResult } = useValuation();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E3A5F] text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">NSE Stock Valuation Calculator</h1>
              <p className="text-sm text-muted-foreground">Is this stock worth buying?</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/learn">
              <Button variant="ghost" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Learn Metrics</span>
              </Button>
            </Link>
            <SavedAnalyses currentAnalysis={analysisResult} onLoad={loadAnalysisResult} />
          </div>
        </div>
      </div>
    </header>
  );
}
