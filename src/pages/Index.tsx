import { Hero } from '@/components/Hero';
import { AITools } from '@/components/AITools';
import { IndustryCharts } from '@/components/IndustryCharts';
import { DataDashboard } from '@/components/DataDashboard';
import { AuthForm } from '@/components/AuthForm';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sign in to save your progress and access personalized features
            </p>
          </div>
          <AuthForm />
        </div>
      </section>
      <DataDashboard />
      <div id="ai-tools">
        <AITools />
      </div>
      <div id="industry-charts">
        <IndustryCharts />
      </div>
    </div>
  );
};

export default Index;
