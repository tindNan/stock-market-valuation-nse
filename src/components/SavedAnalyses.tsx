import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, FolderOpen, Trash2, ChevronDown, Clock } from "lucide-react";
import type { SavedAnalysis, AnalysisResult } from "@/types";
import { saveAnalysis, listSavedAnalyses, deleteAnalysis } from "@/utils/storage";

interface SavedAnalysesProps {
  currentAnalysis: AnalysisResult | null;
  onLoad: (analysis: AnalysisResult) => void;
}

export default function SavedAnalyses({ currentAnalysis, onLoad }: SavedAnalysesProps) {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");

  useEffect(() => {
    setSavedAnalyses(listSavedAnalyses());
  }, []);

  const handleSave = () => {
    if (!currentAnalysis || !saveName.trim()) return;

    saveAnalysis(saveName.trim(), currentAnalysis);
    setSavedAnalyses(listSavedAnalyses());
    setSaveName("");
    setSaveDialogOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this saved analysis?")) {
      deleteAnalysis(id);
      setSavedAnalyses(listSavedAnalyses());
    }
  };

  const handleLoad = (analysis: SavedAnalysis) => {
    onLoad(analysis.analysis);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={!currentAnalysis} className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Analysis</DialogTitle>
            <DialogDescription>
              Give your analysis a name so you can find it later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Analysis Name</Label>
              <Input
                id="name"
                placeholder={currentAnalysis?.inputs.company.name || "My Analysis"}
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
            {currentAnalysis && (
              <div className="text-sm text-muted-foreground">
                <p>Company: {currentAnalysis.inputs.company.name}</p>
                <p>Year: {currentAnalysis.inputs.company.financialYear}</p>
                <p>Verdict: {currentAnalysis.scoring.verdict.replace("_", " ")}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!saveName.trim()}>
              Save Analysis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Load
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel>Saved Analyses</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {savedAnalyses.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              No saved analyses yet
            </div>
          ) : (
            savedAnalyses.map((analysis) => (
              <DropdownMenuItem
                key={analysis.id}
                className="flex items-start justify-between gap-2 cursor-pointer"
                onClick={() => handleLoad(analysis)}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{analysis.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(analysis.createdAt)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {analysis.analysis.inputs.company.name} (
                    {analysis.analysis.inputs.company.financialYear})
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 text-destructive hover:text-destructive"
                  onClick={(e) => handleDelete(analysis.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
