import { Hero } from '@/components/Hero';
import { AITools } from '@/components/AITools';
import { IndustryCharts } from '@/components/IndustryCharts';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
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
