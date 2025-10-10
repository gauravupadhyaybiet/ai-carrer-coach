import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface GenerateContentParams {
  prompt: string;
  apiKey: string;
}

export const useGeminiAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async ({ prompt, apiKey }: GenerateContentParams): Promise<string> => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please provide your Gemini API key",
        variant: "destructive",
      });
      throw new Error("API key required");
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error('No content generated');
      }

      return content;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please check your API key and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generateCoverLetter = async (jobTitle: string, company: string, experience: string, skills: string, apiKey: string) => {
    const prompt = `Write a professional cover letter for a ${jobTitle} position at ${company}. 
    
    Experience: ${experience}
    Skills: ${skills}
    
    Make it personalized, professional, and compelling. Include specific examples and show enthusiasm for the role.`;
    
    return generateContent({ prompt, apiKey });
  };

  const generateResume = async (name: string, email: string, experience: string, skills: string, education: string, apiKey: string) => {
    const prompt = `Create a professional resume in a clean format for:
    
    Name: ${name}
    Email: ${email}
    Experience: ${experience}
    Skills: ${skills}
    Education: ${education}
    
    Format it with clear sections, bullet points, and professional language. Make it ATS-friendly.`;
    
    return generateContent({ prompt, apiKey });
  };

  const generateQuiz = async (topic: string, difficulty: string, apiKey: string) => {
    const prompt = `Generate a 10-question multiple choice quiz about ${topic} at ${difficulty} level.
    
    Format each question as:
    Question: [question text]
    A) [option]
    B) [option]  
    C) [option]
    D) [option]
    Correct Answer: [letter]
    
    Make questions relevant for career development and professional growth.`;
    
    return generateContent({ prompt, apiKey });
  };

  return {
    generateContent,
    generateCoverLetter,
    generateResume,
    generateQuiz,
    isLoading
  };
};
