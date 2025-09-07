import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: "How does the AI resume builder work?",
    answer: "Our AI-powered resume builder uses advanced natural language processing to analyze your input and create professional, ATS-friendly resumes. Simply provide your work experience, skills, and career goals, and our AI will format and optimize your resume for maximum impact."
  },
  {
    question: "Can I customize the generated resumes and cover letters?",
    answer: "Absolutely! While our AI creates a strong foundation, you have complete control to edit, customize, and personalize every aspect of your resume and cover letters. Choose from multiple templates, adjust formatting, and add your personal touch."
  },
  {
    question: "What makes your cover letter generator unique?",
    answer: "Our AI analyzes job descriptions and matches them with your experience to create highly targeted cover letters. It understands industry-specific language and requirements, ensuring your cover letter speaks directly to what employers are looking for."
  },
  {
    question: "How accurate are the skills assessments?",
    answer: "Our AI-generated quizzes are designed by industry experts and continuously updated based on current market demands. They provide valuable insights into your skill level and suggest areas for improvement to make you more competitive."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data security seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can delete your account and data at any time."
  },
  {
    question: "Can I use this for different industries?",
    answer: "Definitely! Our AI is trained on data from various industries including tech, healthcare, finance, marketing, education, and many more. The system adapts to industry-specific requirements and terminology."
  },
  {
    question: "What file formats can I export my documents in?",
    answer: "You can export your resumes and cover letters in multiple formats including PDF, Word (.docx), and plain text. PDF is recommended for applications as it maintains formatting across all devices and platforms."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! We provide email support for all users, with priority support for Pro and Enterprise customers. Our team is available to help with any questions about using the platform or optimizing your career documents."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked
            <span className="gradient-text"> Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our AI-powered career tools.
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card hover-lift"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};