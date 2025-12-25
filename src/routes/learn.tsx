import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  TrendingUp,
  Calculator,
  PiggyBank,
  Scale,
  AlertTriangle,
  ArrowLeft,
  Lightbulb,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/learn")({ component: LearnPage });

function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to Calculator */}
      <Link to="/">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Calculator
        </Button>
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E3A5F] text-white">
            <BookOpen className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#1E3A5F] mb-2">
          Understanding Stock Valuation Metrics
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A beginner-friendly guide to the financial metrics used in this calculator.
          Learn what each number means and how to interpret it for smarter investment decisions.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="mb-8 border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Before You Start
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-foreground">Stock valuation</strong> is the process of determining
            whether a stock is worth buying at its current price. Think of it like checking if a house
            is priced fairly before you buy it.
          </p>
          <p>
            This calculator uses <strong className="text-foreground">14 different metrics</strong> to
            analyze a stock from multiple angles: its value, profitability, income potential, and risk level.
            No single metric tells the whole story — they work together to give you a complete picture.
          </p>
        </CardContent>
      </Card>

      {/* Metrics Sections */}
      <div className="space-y-8">
        {/* Valuation Metrics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold text-[#1E3A5F]">Valuation Metrics</h2>
            <Badge variant="secondary">Core Metrics</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            These metrics help you understand if a stock is cheap, fairly priced, or expensive.
          </p>

          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="bvps" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Book Value Per Share (BVPS)</span>
                  <Badge variant="outline" className="text-xs">Foundation</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    Book Value Per Share tells you how much each share would be worth if the company
                    sold all its assets and paid off all its debts today. It's like the "floor price"
                    of a share.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    BVPS = Total Shareholders' Equity ÷ Number of Shares
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Compare BVPS to the current stock price</li>
                    <li>If stock price is below BVPS, the stock might be undervalued</li>
                    <li>Higher BVPS generally indicates a stronger financial foundation</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Example</p>
                  <p className="text-muted-foreground">
                    If a company has KES 10 billion in equity and 1 billion shares, the BVPS is KES 10.
                    If the stock trades at KES 8, you're buying KES 10 worth of assets for KES 8.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pb" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Price-to-Book Ratio (P/B)</span>
                  <Badge variant="outline" className="text-xs">Key Indicator</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The P/B ratio compares what you're paying for a stock to what the company's assets
                    are actually worth. It answers: "Am I paying a premium or getting a discount?"
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    P/B Ratio = Current Stock Price ÷ Book Value Per Share
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>P/B &lt; 1.0:</strong> Stock may be undervalued (trading below asset value)</li>
                    <li><strong>P/B = 1.0-1.5:</strong> Fairly valued</li>
                    <li><strong>P/B &gt; 2.0:</strong> May be expensive, but could be justified by growth</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Important Note</p>
                  <p className="text-muted-foreground">
                    Banks typically have P/B ratios close to 1.0. Tech companies often have higher P/B
                    ratios because their value comes from intangible assets like software and brands.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eps" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Earnings Per Share (EPS)</span>
                  <Badge variant="outline" className="text-xs">Foundation</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    EPS tells you how much profit the company made for each share you own. It's one of
                    the most important numbers in investing because it shows how profitable the company
                    is on a per-share basis.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    EPS = Profit After Tax ÷ Number of Shares
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Higher EPS = More profitable company</li>
                    <li>Compare EPS year-over-year to see if profits are growing</li>
                    <li>Compare EPS to dividend per share to see how much is being paid out</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Example</p>
                  <p className="text-muted-foreground">
                    If a company made KES 5 billion profit with 1 billion shares, EPS = KES 5.
                    This means each share you own "earned" KES 5 last year.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pe" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Price-to-Earnings Ratio (P/E)</span>
                  <Badge variant="outline" className="text-xs">Most Popular</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The P/E ratio tells you how many years of earnings you're paying for when you buy
                    a stock. It's the most commonly used valuation metric in the world.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    P/E Ratio = Current Stock Price ÷ Earnings Per Share
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>Low P/E (5-10):</strong> Stock may be undervalued or company has problems</li>
                    <li><strong>Medium P/E (10-20):</strong> Fairly valued for most companies</li>
                    <li><strong>High P/E (20+):</strong> Investors expect high growth, or stock is overvalued</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Sector Benchmarks for NSE</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>Banks:</strong> 4-8x is typical</li>
                    <li><strong>Telecoms:</strong> 8-15x is typical</li>
                    <li><strong>Manufacturing:</strong> 6-12x is typical</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Income Metrics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <PiggyBank className="h-5 w-5 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold text-[#1E3A5F]">Income Metrics</h2>
            <Badge variant="secondary">Dividend Focus</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            These metrics help you understand how much cash income you can expect from owning the stock.
          </p>

          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="divyield" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Dividend Yield</span>
                  <Badge variant="outline" className="text-xs">Income Key</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    Dividend yield shows the annual cash return you get from dividends as a percentage
                    of your investment. It's like the "interest rate" on your stock investment.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    Dividend Yield = (Annual Dividend Per Share ÷ Stock Price) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>&lt; 2%:</strong> Low yield (growth-focused companies)</li>
                    <li><strong>2-5%:</strong> Moderate yield (balanced companies)</li>
                    <li><strong>5-10%:</strong> High yield (income-focused investments)</li>
                    <li><strong>&gt; 10%:</strong> Very high — check if it's sustainable!</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Compare To</p>
                  <p className="text-muted-foreground">
                    In Kenya, compare dividend yields to: Bank savings (4-6%), Treasury bills (10-12%).
                    A stock's yield should compensate for the extra risk of owning equities.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payout" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Dividend Payout Ratio</span>
                  <Badge variant="outline" className="text-xs">Sustainability Check</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The payout ratio shows what percentage of profits the company pays out as dividends.
                    It helps you understand if dividends are sustainable or at risk of being cut.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    Payout Ratio = (Dividend Per Share ÷ Earnings Per Share) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>&lt; 30%:</strong> Conservative — company is reinvesting most profits</li>
                    <li><strong>30-50%:</strong> Balanced — healthy mix of dividends and reinvestment</li>
                    <li><strong>50-70%:</strong> High payout — good for income investors</li>
                    <li><strong>&gt; 70%:</strong> Very high — may not be sustainable long-term</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="font-medium text-red-800 mb-1">Warning</p>
                  <p className="text-muted-foreground">
                    A payout ratio over 100% means the company is paying more in dividends than it earns.
                    This is unsustainable and dividends will likely be cut in the future.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="earningsyield" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Earnings Yield</span>
                  <Badge variant="outline" className="text-xs">Value Comparison</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    Earnings yield is the inverse of the P/E ratio, expressed as a percentage. It shows
                    the return on your investment if all earnings were paid out.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    Earnings Yield = (EPS ÷ Stock Price) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <p className="text-muted-foreground">
                    Compare earnings yield to the Treasury bill rate (risk-free rate). If the earnings
                    yield is significantly higher than T-bills, the stock may be attractively valued.
                  </p>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Example</p>
                  <p className="text-muted-foreground">
                    If a stock has an earnings yield of 15% and T-bills pay 10%, you're getting an
                    extra 5% return for taking on stock market risk. Is that enough compensation for you?
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="divgrowth" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Dividend Growth Rate</span>
                  <Badge variant="outline" className="text-xs">Trend Indicator</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    This shows how much the dividend has grown compared to last year. Growing dividends
                    are a sign of a healthy, profitable company.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    Growth Rate = ((Current Dividend ÷ Previous Dividend) - 1) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>Positive growth:</strong> Good sign — company is increasing shareholder returns</li>
                    <li><strong>0% growth:</strong> Stable but not growing</li>
                    <li><strong>Negative growth:</strong> Warning sign — company may be struggling</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Profitability Metrics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold text-[#1E3A5F]">Profitability Metrics</h2>
            <Badge variant="secondary">Efficiency</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            These metrics show how efficiently the company turns money into profit.
          </p>

          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="roe" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Return on Equity (ROE)</span>
                  <Badge variant="outline" className="text-xs">Key Metric</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    ROE measures how much profit a company generates with the money shareholders have
                    invested. It's one of the most important metrics for judging management effectiveness.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    ROE = (Profit After Tax ÷ Total Shareholders' Equity) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>&lt; 10%:</strong> Below average — company isn't using capital efficiently</li>
                    <li><strong>10-15%:</strong> Average performance</li>
                    <li><strong>15-20%:</strong> Good — company is generating solid returns</li>
                    <li><strong>&gt; 20%:</strong> Excellent — company is highly profitable</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Why It Matters</p>
                  <p className="text-muted-foreground">
                    A company with 20% ROE is making KES 20 in profit for every KES 100 of shareholder
                    investment. Over time, high ROE companies tend to grow faster and create more value.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="roa" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Return on Assets (ROA)</span>
                  <Badge variant="outline" className="text-xs">Asset Efficiency</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    ROA measures how efficiently a company uses ALL its assets (not just shareholder
                    money) to generate profit. It includes assets funded by both equity and debt.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    ROA = (Profit After Tax ÷ Total Assets) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <div className="space-y-2">
                    <p className="text-muted-foreground"><strong>For Banks:</strong></p>
                    <ul className="text-muted-foreground list-disc list-inside ml-4">
                      <li>&gt; 3%: Excellent</li>
                      <li>2-3%: Good</li>
                      <li>&lt; 1%: Poor</li>
                    </ul>
                    <p className="text-muted-foreground"><strong>For Non-Banks:</strong></p>
                    <ul className="text-muted-foreground list-disc list-inside ml-4">
                      <li>&gt; 10%: Excellent</li>
                      <li>5-10%: Good</li>
                      <li>&lt; 5%: Below average</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Why Banks Have Lower ROA</p>
                  <p className="text-muted-foreground">
                    Banks have massive assets (customer deposits are liabilities that fund assets).
                    A bank with 2% ROA is actually performing well because their asset base is huge.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Risk Metrics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold text-[#1E3A5F]">Risk Metrics</h2>
            <Badge variant="secondary">Safety Check</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            These metrics help you understand the financial risk of investing in the company.
          </p>

          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="de" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Debt-to-Equity Ratio (D/E)</span>
                  <Badge variant="outline" className="text-xs">Leverage</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The D/E ratio shows how much the company has borrowed compared to what shareholders
                    have invested. High debt means higher risk but potentially higher returns.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    D/E Ratio = Total Liabilities ÷ Total Shareholders' Equity
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it (Non-Banks)</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>&lt; 0.5:</strong> Conservative — low risk, but may be under-leveraged</li>
                    <li><strong>0.5-1.0:</strong> Moderate — balanced approach to financing</li>
                    <li><strong>1.0-2.0:</strong> Leveraged — higher risk, could amplify returns or losses</li>
                    <li><strong>&gt; 2.0:</strong> Highly leveraged — significant financial risk</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Banks Are Different</p>
                  <p className="text-muted-foreground">
                    Banks naturally have high D/E ratios (often 5-10x) because customer deposits are
                    liabilities. This is normal for their business model. Don't compare bank D/E to
                    non-bank companies.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Value Metrics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold text-[#1E3A5F]">Intrinsic Value Metrics</h2>
            <Badge variant="secondary">Fair Value</Badge>
          </div>
          <p className="text-muted-foreground mb-4">
            These metrics estimate what the stock should actually be worth, regardless of its current price.
          </p>

          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="intrinsic" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Intrinsic Value (Gordon Growth Model)</span>
                  <Badge variant="outline" className="text-xs">Core Valuation</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The intrinsic value is an estimate of what a stock is "really worth" based on its
                    future dividend payments. It uses the Dividend Discount Model (DDM), also called
                    the Gordon Growth Model.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    Intrinsic Value = D₁ ÷ (r - g)
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Where: D₁ = Next year's expected dividend, r = Required return, g = Expected growth rate
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>Stock price &lt; Intrinsic value:</strong> Stock may be undervalued (potential buy)</li>
                    <li><strong>Stock price &gt; Intrinsic value:</strong> Stock may be overvalued (potential sell)</li>
                    <li><strong>N/A:</strong> Company doesn't pay dividends, so this model doesn't apply</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Important Limitations</p>
                  <p className="text-muted-foreground">
                    This model only works for dividend-paying stocks and assumes dividends grow at a
                    constant rate forever. It's a useful guide, but not a perfect predictor.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mos" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Margin of Safety</span>
                  <Badge variant="outline" className="text-xs">Risk Buffer</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The margin of safety is the difference between the intrinsic value and the current
                    stock price. It acts as a buffer against errors in your analysis. This concept was
                    popularized by legendary investor Benjamin Graham.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    Margin of Safety = ((Intrinsic Value - Stock Price) ÷ Intrinsic Value) × 100%
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>&gt; 30%:</strong> Excellent value — significant buffer against errors</li>
                    <li><strong>15-30%:</strong> Good value — reasonable safety cushion</li>
                    <li><strong>0-15%:</strong> Fairly valued — limited upside protection</li>
                    <li><strong>&lt; 0% (negative):</strong> Overvalued — stock is priced above fair value</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Benjamin Graham's Rule</p>
                  <p className="text-muted-foreground">
                    Graham recommended only buying stocks with at least a 30% margin of safety. This
                    protects you if your analysis is wrong or if market conditions change unexpectedly.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="peg" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-medium">PEG Ratio</span>
                  <Badge variant="outline" className="text-xs">Growth-Adjusted</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm space-y-3 pb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-foreground mb-1">What is it?</p>
                  <p className="text-muted-foreground">
                    The PEG ratio adjusts the P/E ratio for growth. It's useful for comparing companies
                    with different growth rates. A high P/E might be justified if the company is
                    growing fast.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-800 mb-1">Formula</p>
                  <p className="font-mono text-sm text-blue-600">
                    PEG Ratio = P/E Ratio ÷ Earnings Growth Rate
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-800 mb-1">How to interpret it</p>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>&lt; 1.0:</strong> Potentially undervalued relative to growth</li>
                    <li><strong>= 1.0:</strong> Fairly valued (price matches growth expectations)</li>
                    <li><strong>&gt; 1.0:</strong> May be overvalued relative to growth</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-medium text-amber-800 mb-1">Example</p>
                  <p className="text-muted-foreground">
                    Stock A: P/E = 20, Growth = 20% → PEG = 1.0 (fairly valued)<br />
                    Stock B: P/E = 20, Growth = 10% → PEG = 2.0 (potentially overvalued)<br />
                    Stock C: P/E = 20, Growth = 40% → PEG = 0.5 (potentially undervalued)
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Scoring System */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-5 w-5 text-[#1E3A5F]" />
            <h2 className="text-xl font-semibold text-[#1E3A5F]">The Scoring System</h2>
            <Badge variant="secondary">How We Calculate the Verdict</Badge>
          </div>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground">
                Our calculator combines multiple metrics into a single score to give you an overall
                recommendation. Here's how it works:
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-sm mb-2">Metrics Used in Scoring</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• P/B Ratio (15% weight)</li>
                    <li>• P/E Ratio (20% weight)</li>
                    <li>• Dividend Yield (15% weight)</li>
                    <li>• ROE (15% weight)</li>
                    <li>• Margin of Safety (15% weight)</li>
                    <li>• Payout Ratio (10% weight)</li>
                    <li>• Earnings Yield vs T-Bill (10% weight)</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-sm mb-2">Verdict Scale</p>
                  <ul className="text-xs space-y-1">
                    <li className="text-green-600">• STRONG BUY: Score ≥ 1.0</li>
                    <li className="text-green-500">• BUY: Score 0.5 to 1.0</li>
                    <li className="text-amber-500">• HOLD: Score -0.5 to 0.5</li>
                    <li className="text-orange-500">• SELL: Score -1.0 to -0.5</li>
                    <li className="text-red-500">• STRONG SELL: Score &lt; -1.0</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Each metric is scored from -2 (very negative) to +2 (very positive), then weighted
                and combined. The final score guides the recommendation, but always use your own
                judgment and consider factors the model doesn't capture.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <Card className="bg-[#1E3A5F] text-white">
          <CardContent className="py-8">
            <h3 className="text-xl font-semibold mb-2">Ready to Analyze a Stock?</h3>
            <p className="text-blue-100 mb-4 max-w-md mx-auto">
              Now that you understand the metrics, try running an analysis on a stock you're interested in.
            </p>
            <Link to="/">
              <Button variant="secondary" size="lg" className="gap-2">
                <Calculator className="h-5 w-5" />
                Go to Calculator
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
