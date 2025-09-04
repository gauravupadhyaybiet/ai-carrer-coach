import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, User, Brain, Key } from 'lucide-react';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { toast } from '@/hooks/use-toast';

export const AITools = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const { generateCoverLetter, generateResume, generateQuiz, isLoading } = useGeminiAI();
  
  // Cover Letter State
  const [coverLetterData, setCoverLetterData] = useState({
    jobTitle: '',
    company: '',
    experience: '',
    skills: ''
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');

  // Resume State
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    experience: '',
    skills: '',
    education: ''
  });
  const [generatedResume, setGeneratedResume] = useState('');

  // Quiz State
  const [quizData, setQuizData] = useState({
    topic: '',
    difficulty: 'intermediate'
  });
  const [generatedQuiz, setGeneratedQuiz] = useState('');

  const handleGenerateCoverLetter = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await generateCoverLetter(
        coverLetterData.jobTitle,
        coverLetterData.company,
        coverLetterData.experience,
        coverLetterData.skills,
        apiKey
      );
      setGeneratedCoverLetter(result);
      toast({
        title: "Success",
        description: "Cover letter generated successfully!",
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
    }
  };

  const handleGenerateResume = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required", 
        description: "Please enter your Gemini API key first",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await generateResume(
        resumeData.name,
        resumeData.email,
        resumeData.experience,
        resumeData.skills,
        resumeData.education,
        apiKey
      );
      setGeneratedResume(result);
      toast({
        title: "Success",
        description: "Resume generated successfully!",
      });
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first", 
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await generateQuiz(
        quizData.topic,
        quizData.difficulty,
        apiKey
      );
      setGeneratedQuiz(result);
      toast({
        title: "Success",
        description: "Quiz generated successfully!",
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  if (showApiKeyInput) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Gemini AI Configuration</CardTitle>
              <CardDescription>
                Enter your Gemini API key to unlock AI-powered career tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Gemini API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your Gemini API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => {
                  if (apiKey) {
                    setShowApiKeyInput(false);
                    toast({
                      title: "API Key Set",
                      description: "You can now use all AI features!",
                    });
                  }
                }}
                className="w-full"
                disabled={!apiKey}
              >
                Continue to AI Tools
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Get your free API key from{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google AI Studio
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Career Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage the power of Gemini AI to create professional documents and assess your skills
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowApiKeyInput(true)}
            className="mt-4"
          >
            <Key className="w-4 h-4 mr-2" />
            Change API Key
          </Button>
        </div>

        <Tabs defaultValue="cover-letter" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cover-letter" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Cover Letter
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Skills Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cover-letter" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Cover Letter Generator</CardTitle>
                <CardDescription>
                  Generate a personalized cover letter tailored to your target job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g., Senior Software Engineer"
                      value={coverLetterData.jobTitle}
                      onChange={(e) => setCoverLetterData({...coverLetterData, jobTitle: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="e.g., Google"
                      value={coverLetterData.company}
                      onChange={(e) => setCoverLetterData({...coverLetterData, company: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Your Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe your relevant work experience..."
                    value={coverLetterData.experience}
                    onChange={(e) => setCoverLetterData({...coverLetterData, experience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="List your relevant skills..."
                    value={coverLetterData.skills}
                    onChange={(e) => setCoverLetterData({...coverLetterData, skills: e.target.value})}
                  />
                </div>
                <Button onClick={handleGenerateCoverLetter} disabled={isLoading} className="w-full">
                  {isLoading ? 'Generating...' : 'Generate Cover Letter'}
                </Button>
                {generatedCoverLetter && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Generated Cover Letter:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{generatedCoverLetter}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Resume Generator</CardTitle>
                <CardDescription>
                  Create a professional, ATS-friendly resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={resumeData.name}
                      onChange={(e) => setResumeData({...resumeData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={resumeData.email}
                      onChange={(e) => setResumeData({...resumeData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resumeExperience">Work Experience</Label>
                  <Textarea
                    id="resumeExperience"
                    placeholder="Describe your work experience, including job titles, companies, and achievements..."
                    value={resumeData.experience}
                    onChange={(e) => setResumeData({...resumeData, experience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resumeSkills">Skills</Label>
                  <Textarea
                    id="resumeSkills"
                    placeholder="List your technical and soft skills..."
                    value={resumeData.skills}
                    onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Textarea
                    id="education"
                    placeholder="Your educational background, degrees, certifications..."
                    value={resumeData.education}
                    onChange={(e) => setResumeData({...resumeData, education: e.target.value})}
                  />
                </div>
                <Button onClick={handleGenerateResume} disabled={isLoading} className="w-full">
                  {isLoading ? 'Generating...' : 'Generate Resume'}
                </Button>
                {generatedResume && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Generated Resume:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{generatedResume}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Skills Quiz Generator</CardTitle>
                <CardDescription>
                  Generate a personalized quiz to test your knowledge. Score 7+ for a congratulations email!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Quiz Topic</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., JavaScript, Project Management, Data Science"
                      value={quizData.topic}
                      onChange={(e) => setQuizData({...quizData, topic: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <select
                      id="difficulty"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={quizData.difficulty}
                      onChange={(e) => setQuizData({...quizData, difficulty: e.target.value})}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleGenerateQuiz} disabled={isLoading} className="w-full">
                  {isLoading ? 'Generating...' : 'Generate Quiz'}
                </Button>
                {generatedQuiz && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Generated Quiz:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{generatedQuiz}</pre>
                    <div className="mt-4 p-3 bg-primary/10 rounded border-l-4 border-primary">
                      <p className="text-sm text-primary font-medium">
                        💡 Take this quiz and score 7 or higher to receive a congratulations email!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};