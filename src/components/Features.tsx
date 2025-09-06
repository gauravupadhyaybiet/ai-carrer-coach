import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Target, TrendingUp, Users, Award, Clock } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "AI Resume Builder",
      description: "Create professional, ATS-friendly resumes tailored to your experience and skills."
    },
    {
      icon: Target,
      title: "Cover Letter Generator", 
      description: "Generate personalized cover letters that make you stand out to employers."
    },
    {
      icon: Award,
      title: "Skills Assessment",
      description: "Test your knowledge with AI-generated quizzes and receive detailed performance feedback."
    },
    {
      icon: TrendingUp,
      title: "Industry Analytics",
      description: "Explore career trends and salary insights across different industries and roles."
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Save your progress and access personalized recommendations based on your career goals."
    },
    {
      icon: Clock,
      title: "24/7 AI Assistant",
      description: "Get instant help and career guidance whenever you need it with our AI-powered tools."
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered tools designed to accelerate your career growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};