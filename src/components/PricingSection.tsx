import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    icon: Star,
    features: [
      '3 Resume generations per month',
      '3 Cover letter generations per month',
      'Basic AI quiz assessments',
      'Standard templates',
      'Email support'
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'Most popular for job seekers',
    icon: Zap,
    features: [
      'Unlimited resume generations',
      'Unlimited cover letter generations',
      'Advanced AI quiz assessments',
      'Premium templates & designs',
      'Industry-specific insights',
      'Priority email support',
      'Export to multiple formats',
      'Career coaching tips'
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    description: 'For teams and organizations',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Team collaboration tools',
      'Custom branding',
      'Advanced analytics',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'Bulk user management'
    ],
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="gradient-text"> Career Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start for free and upgrade as you grow. All plans include our core AI-powered features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative hover-lift animate-fade-in-up ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline justify-center mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                >
                  {plan.name === 'Free' ? 'Get Started' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Cancel anytime</span>
            <span>✓ Secure payments</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
};