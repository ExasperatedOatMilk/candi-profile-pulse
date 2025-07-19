import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Linkedin, 
  Trophy, 
  MessageCircle, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Download,
  Share
} from "lucide-react";

export function Dashboard() {
  return (
    <section className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                <p className="text-muted-foreground">Senior Software Engineer</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                Top 15% Candidate
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          
          {/* Composite Score */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">Composite Score</h2>
                  <div className="text-3xl font-bold text-accent">87/100</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Percentile Rank</div>
                  <div className="text-2xl font-bold text-foreground">85th</div>
                </div>
              </div>
              <Progress value={87} className="mt-4" />
            </CardContent>
          </Card>
        </div>

        {/* Analysis Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LinkedIn Professional Profile */}
          <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300 animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-linkedin">
                <Linkedin className="h-5 w-5" />
                Professional Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Career Progression</span>
                  <span className="font-semibold text-foreground">92/100</span>
                </div>
                <Progress value={92} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Endorsements</span>
                  <span className="font-semibold text-foreground">156</span>
                </div>
                <Progress value={78} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network Quality</span>
                  <span className="font-semibold text-foreground">84/100</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2 text-foreground">Career Highlights</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-linkedin" />
                    <span className="text-muted-foreground">5 years at FAANG companies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-linkedin" />
                    <span className="text-muted-foreground">Led 3 major projects</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LeetCode Technical Skills */}
          <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-leetcode">
                <Trophy className="h-5 w-5" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Problem Solving</span>
                  <span className="font-semibold text-foreground">89/100</span>
                </div>
                <Progress value={89} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Contest Rating</span>
                  <span className="font-semibold text-foreground">1,847</span>
                </div>
                <Progress value={75} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Topics Mastered</span>
                  <span className="font-semibold text-foreground">8/12</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2 text-foreground">Recent Activity</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold text-foreground">342</div>
                    <div className="text-muted-foreground">Problems Solved</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold text-foreground">85%</div>
                    <div className="text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ribbon AI Soft Skills */}
          <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-ribbon">
                <MessageCircle className="h-5 w-5" />
                Soft Skills Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Communication</span>
                  <span className="font-semibold text-foreground">91/100</span>
                </div>
                <Progress value={91} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Empathy</span>
                  <span className="font-semibold text-foreground">87/100</span>
                </div>
                <Progress value={87} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Adaptability</span>
                  <span className="font-semibold text-foreground">79/100</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2 text-foreground">Key Insights</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Excellent active listening skills</div>
                  <div>• Strong collaborative mindset</div>
                  <div>• Clear and concise communication</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}