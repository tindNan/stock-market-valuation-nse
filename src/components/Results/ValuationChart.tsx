import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ValuationChartProps {
  currentPrice: number;
  bookValue: number;
  intrinsicValue: number | null;
  companyName: string;
}

export default function ValuationChart({
  currentPrice,
  bookValue,
  intrinsicValue,
  companyName,
}: ValuationChartProps) {
  // Determine color for intrinsic value bar
  const getIntrinsicColor = (): string => {
    if (intrinsicValue === null) return "#9CA3AF";
    return intrinsicValue > currentPrice ? "#28A745" : "#DC3545";
  };

  const data = [
    {
      name: "Current Price",
      value: currentPrice,
      color: "#1E3A5F",
    },
    {
      name: "Book Value",
      value: bookValue,
      color: "#6B7280",
    },
    {
      name: "Intrinsic Value",
      value: intrinsicValue ?? 0,
      color: getIntrinsicColor(),
    },
  ];

  // Calculate percentages for insights
  const priceToBook = bookValue > 0 ? ((currentPrice / bookValue - 1) * 100).toFixed(1) : null;
  const priceToIntrinsic =
    intrinsicValue !== null && intrinsicValue > 0
      ? ((currentPrice / intrinsicValue - 1) * 100).toFixed(1)
      : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Price vs Value Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis
                type="number"
                tickFormatter={(value) => `KES ${value}`}
                tick={{ fontSize: 12 }}
              />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
              <Tooltip
                formatter={(value: number, _name: string, props: { payload: { name: string } }) => {
                  if (
                    value === 0 &&
                    props.payload.name === "Intrinsic Value" &&
                    intrinsicValue === null
                  ) {
                    return ["N/A (no dividend)", companyName];
                  }
                  return [`KES ${value.toFixed(2)}`, companyName];
                }}
                labelFormatter={(label) => label}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-muted-foreground">vs Book Value</p>
            <p className="font-semibold">
              {priceToBook !== null ? (
                <>
                  {Number(priceToBook) > 0 ? "+" : ""}
                  {priceToBook}%
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({Number(priceToBook) > 0 ? "premium" : "discount"})
                  </span>
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-muted-foreground">vs Intrinsic Value</p>
            <p className="font-semibold">
              {priceToIntrinsic !== null ? (
                <>
                  {Number(priceToIntrinsic) > 0 ? "+" : ""}
                  {priceToIntrinsic}%
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({Number(priceToIntrinsic) > 0 ? "overvalued" : "undervalued"})
                  </span>
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
