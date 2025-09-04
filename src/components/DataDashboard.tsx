import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProfiles, useQuizResults, useSupabaseAuth } from '@/hooks/useSupabaseData';
import { RefreshCw, User, Brain, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const DataDashboard = () => {
  const { profiles, loading: profilesLoading, error: profilesError, refetch: refetchProfiles } = useProfiles();
  const { quizResults, loading: quizLoading, error: quizError, refetch: refetchQuizResults } = useQuizResults();
  const { user } = useSupabaseAuth();

  const handleRefreshData = () => {
    refetchProfiles();
    refetchQuizResults();
  };

  const getScoreBadgeVariant = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'default';
    if (percentage >= 60) return 'secondary';
    return 'destructive';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Dashboard</h2>
            <p className="text-xl text-muted-foreground">
              Real-time data from your Supabase database
            </p>
          </div>
          <Button onClick={handleRefreshData} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {profilesLoading ? <Skeleton className="h-8 w-16" /> : profiles.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Results</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quizLoading ? <Skeleton className="h-8 w-16" /> : quizResults.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Completed assessments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {quizLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : quizResults.length > 0 ? (
                  `${Math.round(
                    quizResults.reduce((acc, result) => acc + (result.score / result.total_questions) * 100, 0) / quizResults.length
                  )}%`
                ) : (
                  'N/A'
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all quizzes
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profiles Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Profiles
              </CardTitle>
              <CardDescription>
                {profilesError ? (
                  <span className="text-destructive">Error: {profilesError}</span>
                ) : (
                  `${profiles.length} registered users`
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profilesLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[160px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : profiles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.slice(0, 5).map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">
                          {profile.full_name || 'Anonymous'}
                        </TableCell>
                        <TableCell>{profile.email || 'No email'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(profile.created_at), 'MMM dd, yyyy')}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No profiles found. Users will appear here after registration.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiz Results Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Recent Quiz Results
              </CardTitle>
              <CardDescription>
                {quizError ? (
                  <span className="text-destructive">Error: {quizError}</span>
                ) : (
                  `${quizResults.length} completed assessments`
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {quizLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[80px]" />
                      </div>
                      <Skeleton className="h-6 w-12" />
                    </div>
                  ))}
                </div>
              ) : quizResults.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {quizResults.slice(0, 10).map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 transition-colors">
                      <div className="space-y-1">
                        <div className="font-medium">{result.topic}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className={getDifficultyColor(result.difficulty)}>
                            {result.difficulty}
                          </span>
                          <span>•</span>
                          <span>{format(new Date(result.created_at), 'MMM dd')}</span>
                          {result.email_sent && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">Email sent</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge variant={getScoreBadgeVariant(result.score, result.total_questions)}>
                        {result.score}/{result.total_questions}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No quiz results found. Take a quiz to see results here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Real-time Connection Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Database Connection Status</CardTitle>
            <CardDescription>
              Real-time connection to Supabase database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Connected to Supabase</span>
              {user && (
                <Badge variant="outline" className="ml-auto">
                  Authenticated as {user.email}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};