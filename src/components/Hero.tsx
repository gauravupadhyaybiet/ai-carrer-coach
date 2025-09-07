import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  const scrollToAITools = () => {
    const aiToolsSection = document.getElementById('ai-tools');
    aiToolsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCharts = () => {
    const chartsSection = document.getElementById('industry-charts');
    chartsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-small-black/[0.02] bg-grid-small" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Gemini AI</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
            <span className="gradient-text">
              AI-Powered
            </span>
            <br />
            Career Launchpad
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Generate professional cover letters and resumes, explore industry insights, 
            and test your skills with AI-generated quizzes
          </p>

          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>AI Resume Builder</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Cover Letter Generator</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Skills Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Industry Analytics</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              variant="hero"
              size="xl" 
              className="px-12 py-6 text-lg font-semibold"
              onClick={scrollToAITools}
            >
              Start Building Your Career
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="px-12 py-6 text-lg hover-lift"
              onClick={scrollToCharts}
            >
              View Industry Insights
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Resumes Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">AI Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};