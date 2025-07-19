import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  Award, 
  Brain,
  BarChart3
} from "lucide-react";
import { Candidate } from "@/types/candidate";

interface AnalyticsPanelProps {
  candidates: Candidate[];
}

export function AnalyticsPanel({ candidates }: AnalyticsPanelProps) {
  const totalCandidates = candidates.length;
  const averageScore = candidates.length > 0 
    ? Math.round(candidates.reduce((sum, c) => sum + c.compositeScore, 0) / candidates.length)
    : 0;
  
  const strongSoftSkills = candidates.filter(c => {
    const avgSoftSkills = Object.values(c.softSkills).reduce((sum, score) => sum + score, 0) / 5;
    return avgSoftSkills > 80;
  }).length;
  
  const topPerformers = candidates.filter(c => c.compositeScore >= 85).length;
  const strongSoftSkillsPercentage = totalCandidates > 0 ? (strongSoftSkills / totalCandidates) * 100 : 0;
  const topPerformersPercentage = totalCandidates > 0 ? (topPerformers / totalCandidates) * 100 : 0;

  // Score distribution
  const scoreRanges = {
    excellent: candidates.filter(c => c.compositeScore >= 90).length,
    good: candidates.filter(c => c.compositeScore >= 80 && c.compositeScore < 90).length,
    average: candidates.filter(c => c.compositeScore >= 70 && c.compositeScore < 80).length,
    below: candidates.filter(c => c.compositeScore < 70).length
  };

  const analyticsData = [
    {
      title: "Total Candidates",
      value: totalCandidates.toString(),
      icon: Users,
      description: "Active candidates in pipeline",
      color: "text-primary"
    },
    {
      title: "Average Score",
      value: `${averageScore}/100`,
      icon: BarChart3,
      description: "Composite score average",
      color: "text-accent"
    },
    {
      title: "Strong Soft Skills",
      value: `${strongSoftSkillsPercentage.toFixed(0)}%`,
      icon: Brain,
      description: `${strongSoftSkills} candidates with 80+ soft skills`,
      color: "text-ribbon"
    },
    {
      title: "Top Performers",
      value: `${topPerformersPercentage.toFixed(0)}%`,
      icon: Award,
      description: `${topPerformers} candidates scoring 85+`,
      color: "text-linkedin"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((metric) => (
          <Card key={metric.title} className="shadow-card hover:shadow-elegant transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
                <div className={`p-2 rounded-lg bg-muted/50 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Score Distribution */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Excellent (90-100)</span>
              </div>
              <span className="text-sm text-muted-foreground">{scoreRanges.excellent} candidates</span>
            </div>
            <Progress value={totalCandidates > 0 ? (scoreRanges.excellent / totalCandidates) * 100 : 0} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">Good (80-89)</span>
              </div>
              <span className="text-sm text-muted-foreground">{scoreRanges.good} candidates</span>
            </div>
            <Progress value={totalCandidates > 0 ? (scoreRanges.good / totalCandidates) * 100 : 0} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">Average (70-79)</span>
              </div>
              <span className="text-sm text-muted-foreground">{scoreRanges.average} candidates</span>
            </div>
            <Progress value={totalCandidates > 0 ? (scoreRanges.average / totalCandidates) * 100 : 0} className="h-2" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Below Average (&lt;70)</span>
              </div>
              <span className="text-sm text-muted-foreground">{scoreRanges.below} candidates</span>
            </div>
            <Progress value={totalCandidates > 0 ? (scoreRanges.below / totalCandidates) * 100 : 0} className="h-2" />
          </div>

          {totalCandidates === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Add candidates to see distribution analytics
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}