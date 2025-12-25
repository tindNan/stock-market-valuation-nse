import { createFileRoute } from "@tanstack/react-router";
import InputForm from "@/components/InputForm/InputForm";
import ResultsDashboard from "@/components/Results/ResultsDashboard";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
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
  );
}
