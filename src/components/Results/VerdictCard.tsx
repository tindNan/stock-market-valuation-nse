import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ScoringResult } from "@/types";
import { getVerdictText } from "@/utils/scoring";

interface VerdictCardProps {
  scoring: ScoringResult;
  companyName?: string;
}

export default function VerdictCard({ scoring, companyName }: VerdictCardProps) {
  const { verdict, verdictColor, totalWeightedScore } = scoring;

  return (
    <Card
      className="overflow-hidden"
      style={{ borderTopColor: verdictColor, borderTopWidth: "4px" }}
    >
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          {companyName && <p className="text-sm text-muted-foreground">{companyName}</p>}

          <div
            className="inline-block px-6 py-3 rounded-lg"
            style={{ backgroundColor: `${verdictColor}20` }}
          >
            <p className="text-3xl font-bold" style={{ color: verdictColor }}>
              {getVerdictText(verdict)}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground">Score:</span>
            <Badge
              variant="secondary"
              className="text-lg px-3 py-1"
              style={{
                backgroundColor: `${verdictColor}20`,
                color: verdictColor,
              }}
            >
              {totalWeightedScore.toFixed(2)}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            {verdict === "STRONG_BUY" &&
              "Excellent value based on multiple metrics. Consider buying."}
            {verdict === "BUY" && "Good value overall. Worth considering for your portfolio."}
            {verdict === "HOLD" && "Fairly valued. Hold if you own, wait for better entry if not."}
            {verdict === "SELL" &&
              "Appears overvalued or has concerns. Consider reducing position."}
            {verdict === "STRONG_SELL" &&
              "Significantly overvalued or multiple red flags. Avoid or exit."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
