/**
 * Format number as KES currency
 */
export function formatKES(value: number): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format large number with abbreviation (K, M, B)
 */
export function formatLargeNumber(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absValue >= 1e12) {
    return `${sign}${(absValue / 1e12).toFixed(2)}T`;
  }
  if (absValue >= 1e9) {
    return `${sign}${(absValue / 1e9).toFixed(2)}B`;
  }
  if (absValue >= 1e6) {
    return `${sign}${(absValue / 1e6).toFixed(2)}M`;
  }
  if (absValue >= 1e3) {
    return `${sign}${(absValue / 1e3).toFixed(2)}K`;
  }
  return value.toFixed(2);
}

/**
 * Format as KES with abbreviation for large numbers
 */
export function formatKESShort(value: number): string {
  return `KES ${formatLargeNumber(value)}`;
}

/**
 * Format as percentage
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format as ratio (e.g., 1.15x)
 */
export function formatRatio(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}x`;
}

/**
 * Parse number string with commas
 */
export function parseNumber(value: string): number {
  // Remove commas, spaces, and currency symbols
  const cleaned = value.replace(/[,\s]/g, "").replace(/KES/gi, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format number with commas for display
 */
export function formatWithCommas(value: number): string {
  return new Intl.NumberFormat("en-KE").format(value);
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
