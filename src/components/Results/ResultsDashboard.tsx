import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Percent,
  PiggyBank,
  Scale,
  Calculator,
  FileDown,
} from "lucide-react";

import { useValuation } from "@/context/ValuationContext";
import VerdictCard from "./VerdictCard";
import MetricCard from "./MetricCard";
import ValuationChart from "./ValuationChart";
import { exportToPDF } from "@/utils/pdfExport";

// Format currency in KES
function formatKES(value: number): string {
  if (Math.abs(value) >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toFixed(2);
}

export default function ResultsDashboard() {
  const { metrics, scoring, inputs, analysisResult } = useValuation();

  const handleExportPDF = async () => {
    if (analysisResult) {
      await exportToPDF(analysisResult);
    }
  };

  if (!metrics || !scoring || !inputs) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[400px]">
        <CardContent className="text-center">
          <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
          <p className="text-muted-foreground max-w-xs">
            Enter the financial data and click &quot;Calculate Valuation&quot; to see your stock
            analysis results here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getInterpretation = (score: number): "positive" | "neutral" | "negative" => {
    if (score > 0) return "positive";
    if (score < 0) return "negative";
    return "neutral";
  };

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1E3A5F]">Analysis Results</h2>
        <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
          <FileDown className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Verdict Card */}
      <VerdictCard scoring={scoring} companyName={inputs.company.name} />

      {/* Valuation Chart */}
      <ValuationChart
        currentPrice={inputs.market.currentStockPrice}
        bookValue={metrics.bvps}
        intrinsicValue={metrics.intrinsicValue}
        companyName={inputs.company.name}
      />

      {/* Metrics Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Valuation Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="valuation" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="valuation">Valuation</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="profitability">Profit</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="value">Value</TabsTrigger>
            </TabsList>

            <TabsContent value="valuation" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  title="Book Value Per Share"
                  value={metrics.bvps}
                  unit="KES"
                  interpretation="neutral"
                  description="Net asset value backing each share. If the company liquidated, this is theoretically what shareholders would get per share."
                  benchmark="Compare to current stock price"
                />
                <MetricCard
                  title="P/B Ratio"
                  value={metrics.pbRatio}
                  unit="x"
                  interpretation={getInterpretation(scoring.scores.pbRatio.score)}
                  description={scoring.scores.pbRatio.description}
                  benchmark="< 1.0 undervalued, 1.0-1.5 fair, > 2.0 expensive"
                />
                <MetricCard
                  title="Earnings Per Share"
                  value={metrics.eps}
                  unit="KES"
                  interpretation="neutral"
                  description="Profit generated per share. Higher is better."
                />
                <MetricCard
                  title="P/E Ratio"
                  value={metrics.peRatio}
                  unit="x"
                  interpretation={getInterpretation(scoring.scores.peRatio.score)}
                  description={scoring.scores.peRatio.description}
                  benchmark="Banks: 4-8x, Telecoms: 8-15x, Manufacturing: 6-12x"
                />
              </div>
            </TabsContent>

            <TabsContent value="income" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  title="Dividend Yield"
                  value={metrics.dividendYield}
                  unit="%"
                  interpretation={getInterpretation(scoring.scores.dividendYield.score)}
                  description={scoring.scores.dividendYield.description}
                  benchmark="Compare to: Bank savings 4-6%, T-bills 10-12%"
                />
                <MetricCard
                  title="Payout Ratio"
                  value={metrics.payoutRatio}
                  unit="%"
                  interpretation={getInterpretation(scoring.scores.payoutRatio.score)}
                  description={scoring.scores.payoutRatio.description}
                  benchmark="30-50% balanced, >70% may be unsustainable"
                />
                <MetricCard
                  title="Earnings Yield"
                  value={metrics.earningsYield}
                  unit="%"
                  interpretation={getInterpretation(scoring.scores.earningsYieldVsTBill.score)}
                  description={scoring.scores.earningsYieldVsTBill.description}
                  benchmark="Should exceed T-bill rate for attractive valuation"
                />
                <MetricCard
                  title="Dividend Growth"
                  value={metrics.dividendGrowthRate !== null ? metrics.dividendGrowthRate : "N/A"}
                  unit={metrics.dividendGrowthRate !== null ? "%" : ""}
                  interpretation={
                    metrics.dividendGrowthRate !== null && metrics.dividendGrowthRate > 0
                      ? "positive"
                      : "neutral"
                  }
                  description="Year-over-year dividend growth rate"
                />
              </div>
            </TabsContent>

            <TabsContent value="profitability" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  title="Return on Equity"
                  value={metrics.roe}
                  unit="%"
                  interpretation={getInterpretation(scoring.scores.roe.score)}
                  description={scoring.scores.roe.description}
                  benchmark=">20% excellent, 15-20% good, <10% poor"
                />
                <MetricCard
                  title="Return on Assets"
                  value={metrics.roa}
                  unit="%"
                  interpretation={metrics.roa > 3 ? "positive" : "neutral"}
                  description="How efficiently the company uses its assets to generate profit"
                  benchmark={
                    inputs.company.sector === "BANK"
                      ? "Banks: >3% excellent, 2-3% good, <1% poor"
                      : "Non-banks: >10% excellent, 5-10% good"
                  }
                />
              </div>
            </TabsContent>

            <TabsContent value="risk" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  title="Debt-to-Equity"
                  value={metrics.debtToEquity}
                  unit="x"
                  interpretation={
                    inputs.company.sector === "BANK"
                      ? "neutral"
                      : metrics.debtToEquity > 2
                        ? "negative"
                        : "neutral"
                  }
                  description="Financial leverage ratio. Higher means more debt relative to equity."
                  benchmark={
                    inputs.company.sector === "BANK"
                      ? "Banks naturally have high D/E (deposits are liabilities)"
                      : "<0.5 conservative, 0.5-1.0 moderate, >2.0 risky"
                  }
                />
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      52-Week Range
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Low: KES {inputs.market.week52Low}</span>
                        <span>High: KES {inputs.market.week52High}</span>
                      </div>
                      <div className="relative pt-2">
                        <Progress
                          value={
                            ((inputs.market.currentStockPrice - inputs.market.week52Low) /
                              (inputs.market.week52High - inputs.market.week52Low)) *
                            100
                          }
                        />
                        <div className="text-center mt-2 text-sm text-muted-foreground">
                          Current: KES {inputs.market.currentStockPrice}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="value" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  title="Intrinsic Value"
                  value={metrics.intrinsicValue !== null ? metrics.intrinsicValue : "N/A"}
                  unit={metrics.intrinsicValue !== null ? "KES" : ""}
                  interpretation={
                    metrics.intrinsicValue !== null &&
                    metrics.intrinsicValue > inputs.market.currentStockPrice
                      ? "positive"
                      : "neutral"
                  }
                  description="Estimated fair value based on Gordon Growth Model (Dividend Discount Model)"
                />
                <MetricCard
                  title="Margin of Safety"
                  value={metrics.marginOfSafety !== null ? metrics.marginOfSafety : "N/A"}
                  unit={metrics.marginOfSafety !== null ? "%" : ""}
                  interpretation={getInterpretation(scoring.scores.marginOfSafety.score)}
                  description={scoring.scores.marginOfSafety.description}
                  benchmark=">30% excellent value, 15-30% good, <0% overvalued"
                />
                <MetricCard
                  title="PEG Ratio"
                  value={metrics.pegRatio !== null ? metrics.pegRatio : "N/A"}
                  unit={metrics.pegRatio !== null ? "" : ""}
                  interpretation={
                    metrics.pegRatio !== null && metrics.pegRatio < 1 ? "positive" : "neutral"
                  }
                  description="P/E adjusted for growth. Better for comparing companies with different growth rates."
                  benchmark="<1.0 undervalued, 1.0 fair, >1.0 overvalued relative to growth"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Scoring Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Scoring Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(scoring.scores).map(([key, score]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </span>
                <span className="text-muted-foreground">
                  Weight: {score.weight}% | Score: {score.score > 0 ? "+" : ""}
                  {score.score}
                </span>
              </div>
              <Progress
                value={((score.score + 2) / 4) * 100}
                className={`h-2 ${
                  score.interpretation === "positive"
                    ? "[&>div]:bg-green-500"
                    : score.interpretation === "negative"
                      ? "[&>div]:bg-red-500"
                      : "[&>div]:bg-amber-500"
                }`}
              />
            </div>
          ))}

          <Separator />

          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold">Total Weighted Score</span>
            <span className="text-xl font-bold" style={{ color: scoring.verdictColor }}>
              {scoring.totalWeightedScore.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
