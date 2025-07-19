import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Code, 
  Mic, 
  ArrowRight, 
  CheckCircle,
  Upload,
  Link as LinkIcon
} from "lucide-react";

export function IntegrationSteps() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Connect Your Professional Data
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seamlessly integrate with the platforms you already use to get a complete candidate assessment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* LinkedIn Integration */}
          <Card className="relative shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in border-0 bg-gradient-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-linkedin/10 flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-linkedin" />
                </div>
                <Badge variant="secondary" className="bg-linkedin/10 text-linkedin border-linkedin/20">
                  OAuth
                </Badge>
              </div>
              <CardTitle className="text-xl text-foreground">LinkedIn Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Automatically import work history, endorsements, skills, and professional network data.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-linkedin" />
                  <span className="text-muted-foreground">Work experience & timeline</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-linkedin" />
                  <span className="text-muted-foreground">Skills & endorsements</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-linkedin" />
                  <span className="text-muted-foreground">Professional recommendations</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-linkedin/30 text-linkedin hover:bg-linkedin/5">
                <LinkIcon className="h-4 w-4 mr-2" />
                Connect LinkedIn
              </Button>
            </CardContent>
          </Card>

          {/* LeetCode Integration */}
          <Card className="relative shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in border-0 bg-gradient-card" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-leetcode/10 flex items-center justify-center">
                  <Code className="h-6 w-6 text-leetcode" />
                </div>
                <Badge variant="secondary" className="bg-leetcode/10 text-leetcode border-leetcode/20">
                  Username
                </Badge>
              </div>
              <CardTitle className="text-xl text-foreground">LeetCode Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Analyze coding skills through problem-solving history and contest performance.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-leetcode" />
                  <span className="text-muted-foreground">Problems solved by difficulty</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-leetcode" />
                  <span className="text-muted-foreground">Contest rating & ranking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-leetcode" />
                  <span className="text-muted-foreground">Topic mastery analysis</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-leetcode/30 text-leetcode hover:bg-leetcode/5">
                <LinkIcon className="h-4 w-4 mr-2" />
                Connect LeetCode
              </Button>
            </CardContent>
          </Card>

          {/* Ribbon AI Integration */}
          <Card className="relative shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in border-0 bg-gradient-card" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-ribbon/10 flex items-center justify-center">
                  <Mic className="h-6 w-6 text-ribbon" />
                </div>
                <Badge variant="secondary" className="bg-ribbon/10 text-ribbon border-ribbon/20">
                  Upload
                </Badge>
              </div>
              <CardTitle className="text-xl text-foreground">Ribbon AI Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Upload interview transcripts for AI-powered soft skills and communication analysis.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-ribbon" />
                  <span className="text-muted-foreground">Communication clarity</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-ribbon" />
                  <span className="text-muted-foreground">Empathy & collaboration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-ribbon" />
                  <span className="text-muted-foreground">Adaptability assessment</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-ribbon/30 text-ribbon hover:bg-ribbon/5">
                <Upload className="h-4 w-4 mr-2" />
                Upload Transcript
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-card border shadow-card">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Transform Your Hiring Process?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get comprehensive candidate insights in minutes, not hours. Start your first assessment today.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant">
              Start Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}