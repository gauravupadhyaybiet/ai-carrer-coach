import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const industryGrowthData = [
  { industry: 'AI/ML', growth: 45, jobs: 2500000 },
  { industry: 'Healthcare', growth: 32, jobs: 4500000 },
  { industry: 'Fintech', growth: 28, jobs: 1800000 },
  { industry: 'Cybersecurity', growth: 38, jobs: 1200000 },
  { industry: 'Cloud Computing', growth: 42, jobs: 3200000 },
  { industry: 'E-commerce', growth: 25, jobs: 2800000 },
];

const skillsInDemand = [
  { name: 'AI/Machine Learning', value: 35, color: 'hsl(258, 89%, 66%)' },
  { name: 'Cloud Platforms', value: 28, color: 'hsl(233, 89%, 70%)' },
  { name: 'Data Analysis', value: 22, color: 'hsl(210, 89%, 75%)' },
  { name: 'Cybersecurity', value: 15, color: 'hsl(190, 89%, 80%)' },
];

const salaryTrends = [
  { year: '2020', avgSalary: 75000 },
  { year: '2021', avgSalary: 82000 },
  { year: '2022', avgSalary: 89000 },
  { year: '2023', avgSalary: 95000 },
  { year: '2024', avgSalary: 103000 },
  { year: '2025', avgSalary: 112000 },
];

export const IndustryCharts = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Insights & Trends</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest career market data and industry growth patterns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Industry Growth Rate (%)</CardTitle>
              <CardDescription>
                Year-over-year job growth by industry sector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={industryGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="industry" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Growth Rate']}
                    labelFormatter={(label) => `Industry: ${label}`}
                  />
                  <Bar 
                    dataKey="growth" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills in High Demand</CardTitle>
              <CardDescription>
                Most sought-after skills in 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillsInDemand}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {skillsInDemand.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Average Salary Trends</CardTitle>
            <CardDescription>
              Tech industry salary progression over the years (USD)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgSalary" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">15M+</div>
              <p className="text-muted-foreground">Available Jobs</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">35%</div>
              <p className="text-muted-foreground">Growth in AI Jobs</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">$112k</div>
              <p className="text-muted-foreground">Average Tech Salary</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};