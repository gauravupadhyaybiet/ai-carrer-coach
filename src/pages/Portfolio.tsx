import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Zap,
  Users,
  Trophy,
  Calendar,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'React', level: 95, color: 'hsl(var(--primary))' },
    { name: 'TypeScript', level: 90, color: 'hsl(var(--accent))' },
    { name: 'Node.js', level: 85, color: 'hsl(var(--secondary))' },
    { name: 'Python', level: 80, color: 'hsl(var(--primary))' },
    { name: 'UI/UX Design', level: 88, color: 'hsl(var(--accent))' },
    { name: 'Database Design', level: 82, color: 'hsl(var(--secondary))' },
  ];

  const projects = [
    {
      title: 'AI-Powered Dashboard',
      description: 'A comprehensive analytics dashboard with real-time data visualization and AI-driven insights.',
      tech: ['React', 'TypeScript', 'D3.js', 'Node.js', 'AI/ML'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and inventory management.',
      tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Mobile Fitness App',
      description: 'Cross-platform mobile app for fitness tracking with social features.',
      tech: ['React Native', 'Firebase', 'Redux', 'Expo'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Task Management Tool',
      description: 'Collaborative project management platform with real-time updates.',
      tech: ['Vue.js', 'Express.js', 'Socket.io', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Leading development of enterprise web applications and mentoring junior developers.',
      achievements: [
        'Improved application performance by 40%',
        'Led a team of 5 developers',
        'Implemented CI/CD pipelines'
      ]
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      location: 'Remote',
      description: 'Developed responsive web applications and collaborated with design teams.',
      achievements: [
        'Built 15+ responsive web applications',
        'Reduced load times by 60%',
        'Collaborated with 10+ clients'
      ]
    },
    {
      company: 'Digital Agency Pro',
      position: 'Junior Developer',
      period: '2019 - 2020',
      location: 'New York, NY', 
      description: 'Assisted in developing client websites and learned modern development practices.',
      achievements: [
        'Completed 25+ client projects',
        'Learned 5+ new technologies',
        'Maintained 99% client satisfaction'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-small-black/[0.02] bg-grid-small" />
          <div 
            className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-transform duration-1000"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` }}
          />
          <div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl transition-transform duration-1000"
            style={{ transform: `translate(${-scrollY * 0.1}px, ${-scrollY * 0.05}px)` }}
          />

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Profile Image */}
              <div className="relative inline-block">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent p-1 animate-fade-in">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <Users className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background animate-pulse" />
              </div>

              {/* Name and Title */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text">Alex Johnson</span>
                </h1>
                <p className="text-xl md:text-3xl text-muted-foreground">
                  Full Stack Developer & UI/UX Designer
                </p>
              </div>

              {/* Bio */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Passionate about creating digital experiences that make a difference. 
                I combine technical expertise with creative vision to build applications 
                that are both powerful and beautiful.
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button variant="outline" size="lg" className="hover-lift">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="lg" className="hover-lift">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="lg" className="hover-lift">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50">
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Availability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Technologies and tools I work with to bring ideas to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {skills.map((skill, index) => (
                <Card key={skill.name} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          animationDelay: `${index * 0.1}s`
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tech Stack Icons */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {[
                { icon: Code, label: 'Frontend' },
                { icon: Database, label: 'Backend' },
                { icon: Smartphone, label: 'Mobile' },
                { icon: Palette, label: 'Design' },
                { icon: Globe, label: 'Web' },
                { icon: Zap, label: 'Performance' }
              ].map((item, index) => (
                <Card key={item.label} className="hover-lift text-center">
                  <CardContent className="p-6">
                    <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p className="font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A showcase of my recent work and personal projects
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={project.title} className={`hover-lift overflow-hidden ${project.featured ? 'lg:col-span-2' : ''}`}>
                  <div className={`${project.featured ? 'md:flex' : ''}`}>
                    <div className={`${project.featured ? 'md:w-1/2' : ''}`}>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 md:h-56 object-cover"
                      />
                    </div>
                    <div className={`p-6 ${project.featured ? 'md:w-1/2' : ''}`}>
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        {project.featured && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                My professional journey and career highlights
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {experiences.map((exp, index) => (
                <Card key={exp.company} className="hover-lift">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{exp.position}</h3>
                        <p className="text-lg font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex flex-col md:items-end mt-4 md:mt-0">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{exp.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto hover-lift">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Get In Touch</h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to start your next project? Send me a message and let's discuss your ideas.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;