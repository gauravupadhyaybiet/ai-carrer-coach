import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, TrendingUp, Users, Star } from 'lucide-react';
import { toast } from 'sonner';

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Career Success Stories"
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Interview Success Rate"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "User Rating"
  }
];

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Successfully subscribed! Check your email for confirmation.');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-card hover-lift animate-scale-in">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay Ahead in Your 
                  <span className="gradient-text"> Career Journey</span>
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Get weekly tips, industry insights, and exclusive resources delivered to your inbox. 
                  Join thousands of professionals who've accelerated their careers with our guidance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="hero"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  No spam ever. Unsubscribe anytime with one click.
                </p>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-full mb-3">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};