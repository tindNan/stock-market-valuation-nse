import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator, Building2, TrendingUp, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { useValuation } from "@/context/ValuationContext";
import type { AllInputs, Sector } from "@/types";
import { DEFAULT_ASSUMPTIONS } from "@/types";
import { HelpCircle } from "lucide-react";

// Validation schema
const formSchema = z
  .object({
    company: z.object({
      name: z.string().min(1, "Company name is required"),
      financialYear: z.string().min(4, "Financial year is required"),
      sector: z.enum(["BANK", "NON_BANK"] as const),
    }),
    financials: z.object({
      totalShareholdersEquity: z.coerce.number().min(0, "Must be positive"),
      sharesOutstanding: z.coerce.number().min(1, "Must have at least 1 share"),
      profitAfterTax: z.coerce.number(),
      totalRevenue: z.coerce.number().min(0, "Must be positive"),
      totalAssets: z.coerce.number().min(0, "Must be positive"),
      totalLiabilities: z.coerce.number().min(0, "Must be positive"),
      dividendPerShare: z.coerce.number().min(0, "Must be positive"),
      previousYearDividend: z.coerce.number().min(0, "Must be positive"),
    }),
    market: z.object({
      currentStockPrice: z.coerce.number().min(0.01, "Price must be positive"),
      week52High: z.coerce.number().min(0, "Must be positive"),
      week52Low: z.coerce.number().min(0, "Must be positive"),
    }),
    assumptions: z.object({
      requiredRateOfReturn: z.coerce
        .number()
        .min(1, "Must be at least 1%")
        .max(50, "Must be at most 50%"),
      expectedDividendGrowthRate: z.coerce
        .number()
        .min(0, "Must be positive")
        .max(30, "Must be at most 30%"),
      riskFreeRate: z.coerce.number().min(0, "Must be positive").max(30, "Must be at most 30%"),
    }),
  })
  .refine(
    (data) => data.assumptions.expectedDividendGrowthRate < data.assumptions.requiredRateOfReturn,
    {
      message: "Growth rate must be less than required return for Gordon model",
      path: ["assumptions", "expectedDividendGrowthRate"],
    },
  );

type FormData = z.infer<typeof formSchema>;

// Helper component for input with tooltip
function InputWithTooltip({
  label,
  tooltip,
  prefix,
  suffix,
  ...props
}: {
  label: string;
  tooltip: string;
  prefix?: string;
  suffix?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor={props.id}>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {prefix}
          </span>
        )}
        <Input {...props} className={`${prefix ? "pl-12" : ""} ${suffix ? "pr-8" : ""}`} />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function InputForm() {
  const { calculate, isCalculating, clear, metrics } = useValuation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: {
        name: "",
        financialYear: new Date().getFullYear().toString(),
        sector: "NON_BANK" as Sector,
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
    },
  });

  const onSubmit = (data: FormData) => {
    calculate(data as AllInputs);
  };

  const handleClear = () => {
    form.reset();
    clear();
  };

  // Load sample data for testing
  const loadSampleData = () => {
    form.reset({
      company: {
        name: "NCBA Group PLC",
        financialYear: "2024",
        sector: "BANK",
      },
      financials: {
        totalShareholdersEquity: 109714749000,
        sharesOutstanding: 1647519200,
        profitAfterTax: 21865767000,
        totalRevenue: 57220000000,
        totalAssets: 666000000000,
        totalLiabilities: 556285251000,
        dividendPerShare: 5.5,
        previousYearDividend: 4.75,
      },
      market: {
        currentStockPrice: 76.5,
        week52High: 100,
        week52Low: 40,
      },
      assumptions: {
        requiredRateOfReturn: 15,
        expectedDividendGrowthRate: 5,
        riskFreeRate: 10,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="company.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., NCBA Group PLC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company.financialYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company.sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BANK">Bank</SelectItem>
                        <SelectItem value="NON_BANK">Non-Bank</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Data */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5" />
              Financial Data (from Annual Report)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="financials.totalShareholdersEquity"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Shareholders&apos; Equity</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Statement of Financial Position (Balance Sheet)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          className="pl-12"
                          placeholder="109,714,749,000"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.sharesOutstanding"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Shares Outstanding</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Notes to accounts or Corporate info</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input type="number" placeholder="1,647,519,200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.profitAfterTax"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Profit After Tax</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Statement of Profit or Loss</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          className="pl-12"
                          placeholder="21,865,767,000"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.totalRevenue"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Total Revenue</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Statement of Profit or Loss</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          className="pl-12"
                          placeholder="57,220,000,000"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.totalAssets"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Total Assets</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Statement of Financial Position</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          className="pl-12"
                          placeholder="666,000,000,000"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.totalLiabilities"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Total Liabilities</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Statement of Financial Position</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          className="pl-12"
                          placeholder="556,285,251,000"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.dividendPerShare"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Dividend Per Share</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Directors&apos; Report or Dividend section</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          className="pl-12"
                          placeholder="5.50"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financials.previousYearDividend"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Previous Year Dividend</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find in: Prior year annual report</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          className="pl-12"
                          placeholder="4.75"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Market Data */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Market Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="market.currentStockPrice"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Current Stock Price</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>Find on: NSE, mystocks.co.ke, rich.co.ke</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          className="pl-12"
                          placeholder="76.50"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="market.week52High"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>52-Week High</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          className="pl-12"
                          placeholder="100.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="market.week52Low"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>52-Week Low</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          KES
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          className="pl-12"
                          placeholder="40.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Assumptions */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings2 className="h-5 w-5" />
              Valuation Assumptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="assumptions.requiredRateOfReturn"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Required Return</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Minimum return you expect from this investment. Typically 12-18% for
                              Kenya.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.5"
                          className="pr-8"
                          placeholder="15"
                          {...field}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assumptions.expectedDividendGrowthRate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Dividend Growth Rate</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Expected annual growth in dividends. Must be less than required
                              return.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.5"
                          className="pr-8"
                          placeholder="5"
                          {...field}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assumptions.riskFreeRate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <FormLabel>Risk-Free Rate</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Treasury bill rate. Used to compare earnings yield. Currently ~10% in
                              Kenya.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.5"
                          className="pr-8"
                          placeholder="10"
                          {...field}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          %
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90"
            disabled={isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Valuation"}
          </Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button type="button" variant="secondary" onClick={loadSampleData}>
            Load Sample
          </Button>
        </div>
      </form>
    </Form>
  );
}
