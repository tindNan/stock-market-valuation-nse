import { AlertTriangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">Important Disclaimer</p>
            <p>
              This tool provides educational analysis only and should not be considered as
              professional financial advice. Past performance does not guarantee future results.
              Always conduct your own research and consider consulting a licensed investment advisor
              before making investment decisions.
            </p>
          </div>
        </div>
        <div className="mt-4 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>
            NSE Stock Valuation Calculator &copy; {new Date().getFullYear()} | For educational
            purposes only
          </p>
        </div>
      </div>
    </footer>
  );
}
