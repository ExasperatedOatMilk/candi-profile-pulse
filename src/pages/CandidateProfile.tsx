import { useParams, useNavigate } from "react-router-dom";
import { useCandidates } from "@/hooks/useCandidates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Calendar,
  Linkedin,
  Trophy,
  MessageCircle,
  Download,
  Share,
  ExternalLink,
  Code,
  Building
} from "lucide-react";

export default function CandidateProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCandidate } = useCandidates();
  
  const candidate = id ? getCandidate(id) : null;

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Candidate Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const softSkillsAverage = Object.values(candidate.softSkills).reduce((a, b) => a + b, 0) / 5;
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Candidate Profile</h1>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={candidate.photoUrl} />
                  <AvatarFallback className="text-lg">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">{candidate.name}</h2>
                  <p className="text-lg text-muted-foreground">
                    {candidate.currentRole} at {candidate.currentCompany}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {candidate.location}
                    </div>
                    {candidate.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {candidate.email}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Updated {new Date(candidate.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    {candidate.linkedinUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    )}
                    {candidate.leetcodeUsername && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://leetcode.com/${candidate.leetcodeUsername}`} target="_blank" rel="noopener noreferrer">
                          <Code className="h-4 w-4 mr-2" />
                          LeetCode
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="md:ml-auto text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-accent">{candidate.compositeScore}/100</div>
                  <div className="text-sm text-muted-foreground">Composite Score</div>
                </div>
                
                <Badge variant="secondary" className="mb-2">
                  {candidate.percentileRank}th Percentile
                </Badge>
                
                <div className="text-xs text-muted-foreground">
                  Top {100 - candidate.percentileRank}% of candidates
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-linkedin">
                    <Building className="h-5 w-5" />
                    Professional Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Years of Experience</span>
                      <span className="font-semibold">
                        {candidate.workHistory.reduce((sum, w) => sum + w.years, 0).toFixed(1)} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Companies</span>
                      <span className="font-semibold">{candidate.workHistory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Skills</span>
                      <span className="font-semibold">{candidate.skills.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-leetcode">
                    <Trophy className="h-5 w-5" />
                    Technical Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Problems Solved</span>
                      <span className="font-semibold">{candidate.techSkills.totalSolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ranking</span>
                      <span className="font-semibold">{candidate.techSkills.ranking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Contest Rating</span>
                      <span className="font-semibold">{candidate.techSkills.contestRating || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-ribbon">
                    <MessageCircle className="h-5 w-5" />
                    Soft Skills Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ribbon">{Math.round(softSkillsAverage)}/100</div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(candidate.softSkills)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([skill, score]) => (
                        <div key={skill} className="flex justify-between text-sm">
                          <span className="capitalize text-muted-foreground">{skill}</span>
                          <span className="font-semibold">{score}/100</span>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Problem Solving Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Easy Problems</span>
                      <span className="font-semibold">{candidate.techSkills.easyProblems}</span>
                    </div>
                    <Progress value={(candidate.techSkills.easyProblems / candidate.techSkills.totalSolved) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Medium Problems</span>
                      <span className="font-semibold">{candidate.techSkills.mediumProblems}</span>
                    </div>
                    <Progress value={(candidate.techSkills.mediumProblems / candidate.techSkills.totalSolved) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Hard Problems</span>
                      <span className="font-semibold">{candidate.techSkills.hardProblems}</span>
                    </div>
                    <Progress value={(candidate.techSkills.hardProblems / candidate.techSkills.totalSolved) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Technical Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {candidate.techSkills.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <Badge variant="outline">{topic}</Badge>
                      </div>
                    ))}
                    {candidate.techSkills.topics.length === 0 && (
                      <p className="text-muted-foreground">No specific topics recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="soft-skills" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Soft Skills Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(candidate.softSkills).map(([skill, score]) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium capitalize">{skill}</span>
                      <span className="text-sm text-muted-foreground">{score}/100</span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {candidate.transcript && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Interview Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">{candidate.transcript}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Work History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.workHistory.map((work, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 pb-4 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{work.title}</h3>
                          <p className="text-muted-foreground">{work.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {work.years} years {work.current && '(Current)'}
                          </p>
                        </div>
                        {work.current && (
                          <Badge variant="secondary">Current</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Endorsements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.endorsements.map((endorsement) => (
                    <Badge key={endorsement} variant="outline">
                      {endorsement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}