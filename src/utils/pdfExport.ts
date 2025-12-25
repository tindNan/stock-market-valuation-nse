import { jsPDF } from "jspdf";
import type { AnalysisResult } from "@/types";

/**
 * Generate a PDF report from an analysis result
 */
export async function exportToPDF(analysis: AnalysisResult): Promise<void> {
  const { inputs, metrics, scoring } = analysis;
  const doc = new jsPDF();

  // Colors
  const primaryBlue = "#1E3A5F";
  const verdictColor = scoring.verdictColor;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(primaryBlue);
  doc.text("NSE Stock Valuation Report", 105, 20, { align: "center" });

  // Company Info
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(inputs.company.name, 105, 35, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Financial Year: ${inputs.company.financialYear} | Sector: ${inputs.company.sector === "BANK" ? "Banking" : "Non-Banking"}`,
    105,
    42,
    { align: "center" },
  );
  doc.text(`Generated: ${new Date().toLocaleString("en-KE")}`, 105, 48, { align: "center" });

  // Verdict Box
  const verdictY = 55;
  doc.setFillColor(verdictColor);
  doc.roundedRect(20, verdictY, 170, 25, 3, 3, "F");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(scoring.verdict.replace("_", " "), 105, verdictY + 12, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Score: ${scoring.totalWeightedScore.toFixed(2)}`, 105, verdictY + 20, {
    align: "center",
  });

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Valuation Metrics Section
  let y = 90;
  doc.setFontSize(14);
  doc.setTextColor(primaryBlue);
  doc.text("Valuation Metrics", 20, y);
  doc.setDrawColor(primaryBlue);
  doc.line(20, y + 2, 190, y + 2);

  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  const formatValue = (value: number | null, unit: string): string => {
    if (value === null) return "N/A";
    if (unit === "%") return `${value.toFixed(2)}%`;
    if (unit === "x") return `${value.toFixed(2)}x`;
    if (unit === "KES") return `KES ${value.toFixed(2)}`;
    return value.toFixed(2);
  };

  const metricsData = [
    { name: "Book Value Per Share (BVPS)", value: metrics.bvps, unit: "KES" },
    { name: "Price-to-Book Ratio (P/B)", value: metrics.pbRatio, unit: "x" },
    { name: "Earnings Per Share (EPS)", value: metrics.eps, unit: "KES" },
    { name: "Price-to-Earnings Ratio (P/E)", value: metrics.peRatio, unit: "x" },
    { name: "Dividend Yield", value: metrics.dividendYield, unit: "%" },
    { name: "Payout Ratio", value: metrics.payoutRatio, unit: "%" },
    { name: "Return on Equity (ROE)", value: metrics.roe, unit: "%" },
    { name: "Return on Assets (ROA)", value: metrics.roa, unit: "%" },
    { name: "Debt-to-Equity Ratio", value: metrics.debtToEquity, unit: "x" },
    { name: "Earnings Yield", value: metrics.earningsYield, unit: "%" },
    { name: "Intrinsic Value", value: metrics.intrinsicValue, unit: "KES" },
    { name: "Margin of Safety", value: metrics.marginOfSafety, unit: "%" },
    { name: "Dividend Growth Rate", value: metrics.dividendGrowthRate, unit: "%" },
    { name: "PEG Ratio", value: metrics.pegRatio, unit: "" },
  ];

  // Two columns
  const leftX = 20;
  const rightX = 110;
  let leftY = y;
  let rightY = y;

  metricsData.forEach((metric, index) => {
    const isLeft = index < 7;
    const x = isLeft ? leftX : rightX;
    const currentY = isLeft ? leftY : rightY;

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(metric.name, x, currentY);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(formatValue(metric.value, metric.unit), x, currentY + 5);

    if (isLeft) {
      leftY += 12;
    } else {
      rightY += 12;
    }
  });

  // Input Data Section
  y = Math.max(leftY, rightY) + 10;
  doc.setFontSize(14);
  doc.setTextColor(primaryBlue);
  doc.text("Input Data Summary", 20, y);
  doc.line(20, y + 2, 190, y + 2);

  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);

  const inputsLeft = [
    `Current Stock Price: KES ${inputs.market.currentStockPrice.toLocaleString()}`,
    `52-Week High: KES ${inputs.market.week52High.toLocaleString()}`,
    `52-Week Low: KES ${inputs.market.week52Low.toLocaleString()}`,
    `Total Shareholders' Equity: KES ${inputs.financials.totalShareholdersEquity.toLocaleString()}`,
    `Shares Outstanding: ${inputs.financials.sharesOutstanding.toLocaleString()}`,
    `Profit After Tax: KES ${inputs.financials.profitAfterTax.toLocaleString()}`,
  ];

  const inputsRight = [
    `Total Revenue: KES ${inputs.financials.totalRevenue.toLocaleString()}`,
    `Total Assets: KES ${inputs.financials.totalAssets.toLocaleString()}`,
    `Total Liabilities: KES ${inputs.financials.totalLiabilities.toLocaleString()}`,
    `Dividend Per Share: KES ${inputs.financials.dividendPerShare}`,
    `Required Return: ${inputs.assumptions.requiredRateOfReturn}%`,
    `Expected Growth: ${inputs.assumptions.expectedDividendGrowthRate}%`,
  ];

  inputsLeft.forEach((text, index) => {
    doc.text(text, leftX, y + index * 6);
  });

  inputsRight.forEach((text, index) => {
    doc.text(text, rightX, y + index * 6);
  });

  // Scoring Breakdown Section
  y += inputsLeft.length * 6 + 10;
  doc.setFontSize(14);
  doc.setTextColor(primaryBlue);
  doc.text("Scoring Breakdown", 20, y);
  doc.line(20, y + 2, 190, y + 2);

  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);

  Object.entries(scoring.scores).forEach(([key, score], index) => {
    const displayName = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
    const scoreText = `${displayName}: ${score.score > 0 ? "+" : ""}${score.score} (Weight: ${score.weight}%)`;
    doc.text(scoreText, leftX, y + index * 5);
  });

  // Disclaimer
  y += Object.keys(scoring.scores).length * 5 + 15;

  // Check if we need a new page
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("DISCLAIMER", 20, y);
  y += 5;
  const disclaimer =
    "This report is for educational and informational purposes only and should not be considered as financial advice. " +
    "Always consult with a qualified financial advisor before making investment decisions. Past performance does not guarantee future results.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, 170);
  doc.text(disclaimerLines, 20, y);

  // Save the PDF
  const filename = `${inputs.company.name.replace(/\s+/g, "_")}_Valuation_${inputs.company.financialYear}.pdf`;
  doc.save(filename);
}
