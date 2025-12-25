import type { AnalysisResult, SavedAnalysis } from "@/types";

const STORAGE_KEY = "nse-stock-valuations";
const DISCLAIMER_KEY = "nse-stock-valuations-disclaimer-accepted";

/**
 * Generate a unique ID for saved analyses
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all saved analyses from localStorage
 */
export function listSavedAnalyses(): SavedAnalysis[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as SavedAnalysis[];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
}

/**
 * Save an analysis to localStorage
 */
export function saveAnalysis(name: string, analysis: AnalysisResult): SavedAnalysis {
  const saved: SavedAnalysis = {
    id: generateId(),
    name,
    analysis,
    createdAt: new Date().toISOString(),
  };

  const existing = listSavedAnalyses();
  existing.unshift(saved); // Add to beginning

  // Keep only the last 20 analyses
  const toSave = existing.slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }

  return saved;
}

/**
 * Load a saved analysis by ID
 */
export function loadAnalysis(id: string): SavedAnalysis | null {
  const analyses = listSavedAnalyses();
  return analyses.find((a) => a.id === id) || null;
}

/**
 * Delete a saved analysis by ID
 */
export function deleteAnalysis(id: string): boolean {
  const analyses = listSavedAnalyses();
  const filtered = analyses.filter((a) => a.id !== id);

  if (filtered.length === analyses.length) {
    return false; // Nothing was deleted
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
    return false;
  }
}

/**
 * Clear all saved analyses
 */
export function clearAllAnalyses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Check if user has accepted disclaimer
 */
export function hasAcceptedDisclaimer(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return localStorage.getItem(DISCLAIMER_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Set disclaimer acceptance
 */
export function setDisclaimerAccepted(accepted: boolean): void {
  try {
    if (accepted) {
      localStorage.setItem(DISCLAIMER_KEY, "true");
    } else {
      localStorage.removeItem(DISCLAIMER_KEY);
    }
  } catch (error) {
    console.error("Error setting disclaimer acceptance:", error);
  }
}
