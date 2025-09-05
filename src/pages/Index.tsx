import { Hero } from '@/components/Hero';
import { AITools } from '@/components/AITools';
import { IndustryCharts } from '@/components/IndustryCharts';
import { DataDashboard } from '@/components/DataDashboard';
import { AuthForm } from '@/components/AuthForm';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Index = () => {
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Hero />
      {!user && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                Sign in to save your progress and access personalized features
              </p>
              <Button onClick={() => navigate('/auth')} size="lg">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In / Sign Up
              </Button>
            </div>
          </div>
        </section>
      )}
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
