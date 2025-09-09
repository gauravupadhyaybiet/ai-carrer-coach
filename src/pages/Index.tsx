import { Hero } from '@/components/Hero';
import { AITools } from '@/components/AITools';
import { IndustryCharts } from '@/components/IndustryCharts';
import { DataDashboard } from '@/components/DataDashboard';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { CTASection } from '@/components/CTASection';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, BarChart3, User } from 'lucide-react';

const Index = () => {
  const { user, signOut } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Career AI
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button onClick={() => navigate('/insights')} variant="ghost" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Insights
                </Button>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate('/auth')} size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <Hero />
        <Features />
        <DataDashboard />
        <div id="ai-tools">
          <AITools />
        </div>
        <div id="industry-charts">
          <IndustryCharts />
        </div>
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
