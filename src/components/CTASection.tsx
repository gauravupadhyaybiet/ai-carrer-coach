import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';

export const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();

  const scrollToAITools = () => {
    const aiToolsSection = document.getElementById('ai-tools');
    aiToolsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-small-white/[0.1]" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Launch Your
            <br />
            Dream Career?
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who've transformed their careers with our AI-powered tools. 
            Your next opportunity is just one click away.
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/90">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>AI-Powered Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Professional Quality</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {user ? (
              <Button 
                size="xl" 
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-105 px-10"
                onClick={scrollToAITools}
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button 
                  size="xl" 
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-105 px-10"
                  onClick={() => navigate('/auth')}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="xl" 
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:scale-105 px-8"
                  onClick={scrollToAITools}
                >
                  See How It Works
                </Button>
              </>
            )}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-12 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-white/70 mb-6">Trusted by professionals at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <span className="text-lg font-semibold">Google</span>
              <span className="text-lg font-semibold">Microsoft</span>
              <span className="text-lg font-semibold">Apple</span>
              <span className="text-lg font-semibold">Amazon</span>
              <span className="text-lg font-semibold">Meta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};