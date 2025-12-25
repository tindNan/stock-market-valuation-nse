import { createFileRoute } from "@tanstack/react-router";
import { ValuationProvider } from "@/context/ValuationContext";
import InputForm from "@/components/InputForm/InputForm";
import ResultsDashboard from "@/components/Results/ResultsDashboard";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <ValuationProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Form Section */}
          <div>
            <InputForm />
          </div>

          {/* Results Dashboard Section */}
          <div>
            <ResultsDashboard />
          </div>
        </div>
      </div>
    </ValuationProvider>
  );
}
