import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      email, 
      userName, 
      score, 
      totalQuestions, 
      topic, 
      difficulty, 
      questions, 
      userAnswers 
    } = await req.json();

    console.log('Quiz analysis request:', { email, score, totalQuestions, topic });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Generate AI analysis using Gemini
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const analysisPrompt = `Analyze this quiz performance:
    
Student: ${userName}
Topic: ${topic}
Difficulty: ${difficulty}
Score: ${score}/${totalQuestions}
Percentage: ${((score / totalQuestions) * 100).toFixed(0)}%

Quiz Questions and Answers:
${questions.map((q: any, index: number) => `
Q${index + 1}: ${q.question}
Correct Answer: ${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}
Student's Answer: ${String.fromCharCode(65 + userAnswers[index])}. ${q.options[userAnswers[index]]}
${userAnswers[index] === q.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
`).join('')}

Provide a detailed performance analysis including:
1. Overall performance summary
2. Strengths demonstrated
3. Areas for improvement
4. Specific recommendations for further study
5. ${score >= 6 ? 'A congratulatory message for excellent performance' : 'Encouragement and motivation to keep learning'}

Keep the tone professional yet encouraging.`;

    const analysisResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: analysisPrompt
          }]
        }]
      }),
    });

    if (!analysisResponse.ok) {
      const error = await analysisResponse.text();
      console.error('Gemini API error:', error);
      throw new Error(`Gemini API error: ${analysisResponse.statusText}`);
    }

    const analysisData = await analysisResponse.json();
    const analysis = analysisData.candidates?.[0]?.content?.parts?.[0]?.text;

    let emailWasSent = false;
    const isSuccess = score >= 5;
    const percentage = ((score / totalQuestions) * 100).toFixed(0);
    
    const plainText = `${isSuccess ? 'Congratulations' : 'Quiz Results'} - ${topic} Quiz
Score: ${score}/${totalQuestions} (${percentage}%)
Difficulty: ${difficulty}
Date: ${new Date().toLocaleDateString()}

AI Performance Analysis:
${analysis}
`;

    // Send email for all quiz attempts if email is provided
    if (email && email.includes("@")) {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.warn('Resend API key not configured, skipping email');
      } else {
        const resend = new Resend(resendApiKey);
        
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${isSuccess ? 'Congratulations on Your Quiz Performance!' : 'Your Quiz Results'}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, ${isSuccess ? '#6366f1, #8b5cf6' : '#ef4444, #dc2626'}); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 24px;">${isSuccess ? '🎉 Congratulations!' : '📚 Keep Learning!'}</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">${isSuccess ? `Excellent Performance on Your ${topic} Quiz` : `Your ${topic} Quiz Results`}</p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1e293b; margin-top: 0;">Quiz Results Summary</h2>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Score:</strong> ${score}/${totalQuestions} (${percentage}%)</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Topic:</strong> ${topic}</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Difficulty:</strong> ${difficulty}</li>
                    <li style="padding: 8px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
                </ul>
            </div>

            <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1e293b; margin-top: 0;">AI Performance Analysis</h2>
                <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${analysis}</div>
            </div>

            <div style="background: ${isSuccess ? '#dcfce7; border: 1px solid #bbf7d0' : '#fef2f2; border: 1px solid #fecaca'}; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: ${isSuccess ? '#166534' : '#dc2626'}; font-weight: 500;">
                    ${isSuccess 
                      ? `🏆 Great job! Your score of ${score}/${totalQuestions} demonstrates strong knowledge in ${topic}.`
                      : `💪 Don't give up! Your score of ${score}/${totalQuestions} shows you're learning. Keep practicing ${topic} to improve!`
                    }
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                    This email was generated by AI Career Coach - Powered by Gemini AI
                </p>
            </div>
        </body>
        </html>`;

        try {
          const emailResult = await resend.emails.send({
            from: 'AI Career Coach <onboarding@resend.dev>',
            to: [email],
            subject: isSuccess 
              ? `🎉 Congratulations! You scored ${score}/${totalQuestions} on your ${topic} quiz`
              : `📚 Your ${topic} quiz results - ${score}/${totalQuestions}`,
            html: emailHtml,
            text: plainText,
            reply_to: 'no-reply@resend.dev',
          });

          console.log('Email sent successfully:', emailResult);
          emailWasSent = true;
        } catch (emailError) {
          console.error('Failed to send email:', emailError);
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      analysis,
      emailSent: emailWasSent,
      score,
      totalQuestions
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-quiz-results function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});