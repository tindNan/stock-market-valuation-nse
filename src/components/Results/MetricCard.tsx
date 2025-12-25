import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, AlertCircle, MinusCircle, Info } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  interpretation: "positive" | "neutral" | "negative";
  description: string;
  benchmark?: string;
}

export default function MetricCard({
  title,
  value,
  unit,
  interpretation,
  description,
  benchmark,
}: MetricCardProps) {
  const getIcon = () => {
    switch (interpretation) {
      case "positive":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "negative":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <MinusCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  const getBorderColor = () => {
    switch (interpretation) {
      case "positive":
        return "border-l-green-500";
      case "negative":
        return "border-l-red-500";
      default:
        return "border-l-amber-500";
    }
  };

  return (
    <Card className={`border-l-4 ${getBorderColor()}`}>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="text-muted-foreground">{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{description}</p>
                {benchmark && <p className="mt-1 text-xs text-muted-foreground">{benchmark}</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">
              {typeof value === "number" ? value.toFixed(2) : value}
            </span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {getIcon()}
        </div>
      </CardContent>
    </Card>
  );
}
