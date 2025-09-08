import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseData';

const categories = [
  { 
    id: 'technology', 
    name: 'Technology',
    specializations: ['Software Development', 'Data Science', 'Cybersecurity', 'AI/ML', 'DevOps', 'Mobile Development']
  },
  { 
    id: 'business', 
    name: 'Business',
    specializations: ['Marketing', 'Sales', 'Project Management', 'Business Analysis', 'Consulting', 'Operations']
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare',
    specializations: ['Nursing', 'Medical Technology', 'Healthcare Administration', 'Physical Therapy', 'Pharmacy', 'Mental Health']
  },
  { 
    id: 'finance', 
    name: 'Finance',
    specializations: ['Investment Banking', 'Financial Analysis', 'Accounting', 'Risk Management', 'Insurance', 'Financial Planning']
  },
  { 
    id: 'education', 
    name: 'Education',
    specializations: ['K-12 Teaching', 'Higher Education', 'Educational Technology', 'Training & Development', 'Curriculum Design', 'Special Education']
  },
  { 
    id: 'creative', 
    name: 'Creative',
    specializations: ['Graphic Design', 'UX/UI Design', 'Content Creation', 'Video Production', 'Photography', 'Writing']
  }
];

const generateInsightData = (category: string, specialization: string) => {
  // Sample data generation based on category and specialization
  const baseGrowth = Math.random() * 20 + 5; // 5-25% growth
  const baseSalary = category === 'technology' ? 80000 : category === 'finance' ? 75000 : category === 'healthcare' ? 65000 : 55000;
  const salaryVariation = Math.random() * 20000 + baseSalary;

  const jobGrowthData = [
    { year: '2020', jobs: Math.floor(Math.random() * 50000 + 100000), growth: baseGrowth - 5 },
    { year: '2021', jobs: Math.floor(Math.random() * 60000 + 120000), growth: baseGrowth - 2 },
    { year: '2022', jobs: Math.floor(Math.random() * 70000 + 140000), growth: baseGrowth },
    { year: '2023', jobs: Math.floor(Math.random() * 80000 + 160000), growth: baseGrowth + 3 },
    { year: '2024', jobs: Math.floor(Math.random() * 90000 + 180000), growth: baseGrowth + 5 },
  ];

  const salaryTrendData = [
    { year: '2020', salary: Math.floor(salaryVariation * 0.85) },
    { year: '2021', salary: Math.floor(salaryVariation * 0.90) },
    { year: '2022', salary: Math.floor(salaryVariation * 0.95) },
    { year: '2023', salary: Math.floor(salaryVariation) },
    { year: '2024', salary: Math.floor(salaryVariation * 1.08) },
  ];

  const skillsData = [
    { skill: 'Core Skills', value: 35, color: 'hsl(var(--primary))' },
    { skill: 'Technical Skills', value: 30, color: 'hsl(var(--accent))' },
    { skill: 'Soft Skills', value: 20, color: 'hsl(var(--secondary))' },
    { skill: 'Certifications', value: 15, color: 'hsl(var(--muted))' },
  ];

  return { jobGrowthData, salaryTrendData, skillsData };
};

const Insights = () => {
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [insightData, setInsightData] = useState<any>(null);

  const handleAnalyze = () => {
    if (selectedCategory && selectedSpecialization) {
      const data = generateInsightData(selectedCategory, selectedSpecialization);
      setInsightData(data);
      setShowResults(true);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/10">
        <Card className="max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access industry insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Industry Insights
          </div>
          <div className="text-sm text-muted-foreground">
            {user.email}
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {!showResults ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="gradient-text">Industry Insights</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Select your industry category and specialization to get detailed market insights
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Choose Your Focus Area
                  </CardTitle>
                  <CardDescription>
                    Select a category and specialization to view tailored market data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Industry Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCategory && (
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCategoryData?.specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button 
                    onClick={handleAnalyze}
                    disabled={!selectedCategory || !selectedSpecialization}
                    className="w-full"
                    size="lg"
                  >
                    Analyze Market Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {selectedSpecialization} in {selectedCategoryData?.name}
                  </h1>
                  <p className="text-muted-foreground">Market insights and trends</p>
                </div>
                <Button onClick={() => setShowResults(false)} variant="outline">
                  Change Selection
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Average Salary</p>
                        <p className="text-2xl font-bold">${insightData?.salaryTrendData[4]?.salary?.toLocaleString()}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Job Growth</p>
                        <p className="text-2xl font-bold">+{insightData?.jobGrowthData[4]?.growth.toFixed(1)}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Open Positions</p>
                        <p className="text-2xl font-bold">{insightData?.jobGrowthData[4]?.jobs?.toLocaleString()}</p>
                      </div>
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Job Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Market Growth</CardTitle>
                    <CardDescription>Number of available positions over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={insightData?.jobGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="jobs" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Salary Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Salary Trends</CardTitle>
                    <CardDescription>Average salary progression</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={insightData?.salaryTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Salary']} />
                        <Line type="monotone" dataKey="salary" stroke="hsl(var(--accent))" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Skills Distribution */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Required Skills Distribution</CardTitle>
                    <CardDescription>Breakdown of skills employers are looking for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={insightData?.skillsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          dataKey="value"
                          label={({ skill, value }) => `${skill}: ${value}%`}
                        >
                          {insightData?.skillsData?.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;