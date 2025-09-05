import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/AuthForm';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useSupabaseAuth();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to AI Career Coach</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Sign in to access personalized AI-powered career tools, save your quiz results, and track your progress.
            </p>
          </div>
          
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;