import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Brain, Send, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';
import { toast } from '@/hooks/use-toast';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface InteractiveQuizProps {
  quizText: string;
  topic: string;
  difficulty: string;
}

export const InteractiveQuiz = ({ quizText, topic, difficulty }: InteractiveQuizProps) => {
  const { user } = useSupabaseAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  const parseQuiz = () => {
    const lines = quizText.split('\n').filter(line => line.trim());
    const parsedQuestions: Question[] = [];
    let currentQuestion: Partial<Question> = {};
    let options: string[] = [];

    for (const line of lines) {
      if (line.startsWith('Question:')) {
        if (currentQuestion.question) {
          parsedQuestions.push({
            question: currentQuestion.question,
            options,
            correctAnswer: currentQuestion.correctAnswer || 0
          });
        }
        currentQuestion = { question: line.replace('Question:', '').trim() };
        options = [];
      } else if (line.match(/^[A-D]\)/)) {
        options.push(line.substring(2).trim());
      } else if (line.startsWith('Correct Answer:')) {
        const answer = line.replace('Correct Answer:', '').trim();
        currentQuestion.correctAnswer = answer.charCodeAt(0) - 65; // Convert A,B,C,D to 0,1,2,3
      }
    }

    // Add the last question
    if (currentQuestion.question) {
      parsedQuestions.push({
        question: currentQuestion.question,
        options,
        correctAnswer: currentQuestion.correctAnswer || 0
      });
    }

    setQuestions(parsedQuestions);
    setUserAnswers(new Array(parsedQuestions.length).fill(-1));
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const submitQuiz = async () => {
    if (userAnswers.includes(-1)) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!user && !userEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive results.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const finalScore = calculateScore();
      setScore(finalScore);
      
      // Save quiz results to database if user is logged in
      if (user) {
        const { error } = await supabase
          .from('quiz_results')
          .insert({
            user_id: user.id,
            topic,
            difficulty,
            score: finalScore,
            total_questions: questions.length,
            questions: JSON.parse(JSON.stringify(questions)) as any,
            answers: JSON.parse(JSON.stringify(userAnswers.map((answer, index) => ({
              questionIndex: index,
              selectedAnswer: answer,
              correctAnswer: questions[index].correctAnswer,
              isCorrect: answer === questions[index].correctAnswer
            })))) as any
          });

        if (error) {
          console.error('Error saving quiz results:', error);
        }
      }

      // Send results via edge function (includes email if score >= 6)
      const response = await supabase.functions.invoke('analyze-quiz-results', {
        body: {
          email: user?.email || userEmail,
          userName: user?.email?.split('@')[0] || 'Student',
          score: finalScore,
          totalQuestions: questions.length,
          topic,
          difficulty,
          questions,
          userAnswers
        }
      });

      if (response.error) {
        throw response.error;
      }

      setShowResults(true);
      
      if (finalScore >= 6) {
        toast({
          title: "Congratulations! 🎉",
          description: `You scored ${finalScore}/${questions.length}! Check your email for a congratulations message.`,
        });
      } else {
        toast({
          title: "Quiz Completed",
          description: `You scored ${finalScore}/${questions.length}. Keep practicing!`,
        });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Interactive Quiz
          </CardTitle>
          <CardDescription>
            Start the interactive quiz by parsing the generated questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={parseQuiz} className="w-full">
            Start Interactive Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            {score >= 6 ? (
              <Trophy className="w-8 h-8 text-primary" />
            ) : (
              <Brain className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>
            You scored {score} out of {questions.length} questions ({percentage.toFixed(0)}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {score >= 6 && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-center">
              <h3 className="font-semibold text-success mb-2">Excellent Work! 🎉</h3>
              <p className="text-sm text-success/80">
                You've demonstrated strong knowledge in {topic}. Check your email for a congratulations message!
              </p>
            </div>
          )}
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={index} className="p-3 rounded border">
                <p className="font-medium text-sm mb-2">Q{index + 1}: {question.question}</p>
                <div className="text-xs space-y-1">
                  <p className={`${userAnswers[index] === question.correctAnswer ? 'text-success' : 'text-destructive'}`}>
                    Your answer: {question.options[userAnswers[index]]}
                  </p>
                  {userAnswers[index] !== question.correctAnswer && (
                    <p className="text-success">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button 
            onClick={() => {
              setShowResults(false);
              setUserAnswers(new Array(questions.length).fill(-1));
              setScore(0);
            }}
            variant="outline"
            className="w-full"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Interactive Quiz: {topic}
        </CardTitle>
        <CardDescription>
          Answer all questions and score 6+ to get a congratulations email!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!user && (
          <div className="p-3 bg-muted rounded border">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address (for results)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-4">
              Question {questionIndex + 1}: {question.question}
            </h3>
            <RadioGroup
              value={userAnswers[questionIndex]?.toString()}
              onValueChange={(value) => handleAnswerChange(questionIndex, parseInt(value))}
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`q${questionIndex}_option${optionIndex}`}
                  />
                  <Label
                    htmlFor={`q${questionIndex}_option${optionIndex}`}
                    className="cursor-pointer"
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}

        <Button 
          onClick={submitQuiz}
          disabled={isLoading || userAnswers.includes(-1)}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? 'Submitting...' : 'Submit Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
};