import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const DISCLAIMER_KEY = "nse-valuation-disclaimer-accepted";

export default function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const accepted = localStorage.getItem(DISCLAIMER_KEY);
    if (!accepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Important Disclaimer
          </DialogTitle>
          <DialogDescription className="text-left">
            Please read and acknowledge before using this tool
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground py-4">
          <p>
            <strong className="text-foreground">
              This tool is for educational and informational purposes only.
            </strong>
          </p>

          <p>
            The NSE Stock Valuation Calculator provides analysis based on publicly available
            financial data and standard valuation methodologies. The results are estimates and
            should not be considered as financial advice.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
            <p className="font-semibold text-amber-800">Key Limitations:</p>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              <li>Past performance does not guarantee future results</li>
              <li>Valuation models have inherent limitations</li>
              <li>Market conditions can change rapidly</li>
              <li>This tool does not consider all risk factors</li>
              <li>The scoring system has not been backtested against NSE stock returns</li>
            </ul>
          </div>

          <p>
            <strong className="text-foreground">
              Always consult with a qualified financial advisor
            </strong>{" "}
            before making investment decisions. The creators of this tool are not responsible for
            any financial losses incurred based on the information provided.
          </p>

          <p>By clicking &quot;I Understand&quot; below, you acknowledge that:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>You have read and understood this disclaimer</li>
            <li>You will not rely solely on this tool for investment decisions</li>
            <li>You accept full responsibility for your investment choices</li>
          </ul>
        </div>

        <DialogFooter>
          <Button onClick={handleAccept} className="w-full">
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
