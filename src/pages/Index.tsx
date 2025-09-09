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
import { LogIn, LogOut, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const { user, signOut } = useSupabaseAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button onClick={() => navigate('/insights')} variant="ghost" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Insights
                </Button>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email?.split('@')[0]}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground pb-2 border-b border-border">
                    Welcome, {user.email?.split('@')[0]}
                  </div>
                  <Button 
                    onClick={() => {
                      navigate('/insights');
                      setIsMobileMenuOpen(false);
                    }} 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Industry Insights
                  </Button>
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="w-full justify-start"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <Features />
        <DataDashboard />
        <section id="ai-tools">
          <AITools />
        </section>
        <section id="industry-charts">
          <IndustryCharts />
        </section>
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <NewsletterSection />
        <CTASection />
        
        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Career AI
                </div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  AI-powered career tools to help you build professional resumes, cover letters, and advance your career.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#ai-tools" className="hover:text-primary transition-colors">AI Tools</a></li>
                  <li><a href="#industry-charts" className="hover:text-primary transition-colors">Industry Insights</a></li>
                  <li><a href="/insights" className="hover:text-primary transition-colors">Analytics</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Career AI. All rights reserved. Built with AI-powered technology.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
