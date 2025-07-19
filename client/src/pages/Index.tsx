import { Hero } from "@/components/Hero";
import { IntegrationSteps } from "@/components/IntegrationSteps";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <IntegrationSteps />
      <Dashboard />
    </div>
  );
};

export default Index;
