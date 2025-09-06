import { Hero } from '@/components/Hero';
import { AITools } from '@/components/AITools';
import { IndustryCharts } from '@/components/IndustryCharts';
import { DataDashboard } from '@/components/DataDashboard';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';

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
        {!user && (
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                  Sign in to save your progress, access personalized features, and take your career to the next level
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
        <Testimonials />
        <div id="industry-charts">
          <IndustryCharts />
        </div>
      </div>
    </div>
  );
};

export default Index;
