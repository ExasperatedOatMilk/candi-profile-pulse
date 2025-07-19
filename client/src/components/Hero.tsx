import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, BarChart3, Target } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <Badge variant="secondary" className="mb-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
            Next-Generation Talent Assessment
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Unified Candidate
            <span className="block bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Combine LinkedIn professional insights, LeetCode technical skills, and Ribbon AI soft skills analysis 
            into a comprehensive candidate profile that reveals true potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elegant" asChild>
              <a href="/dashboard">
                Open Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Watch Demo
            </Button>
            <Button size="lg" variant="secondary" className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elegant" asChild>
              <a href="/candidate">
                Open as Candidate
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col items-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10">
            <div className="w-12 h-12 rounded-full bg-linkedin/20 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-linkedin" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Professional Profile</h3>
            <p className="text-sm opacity-80 text-center">LinkedIn integration for career trajectory and endorsements</p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10">
            <div className="w-12 h-12 rounded-full bg-leetcode/20 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-leetcode" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
            <p className="text-sm opacity-80 text-center">LeetCode analysis of problem-solving capabilities</p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-xl bg-primary-foreground/5 backdrop-blur border border-primary-foreground/10">
            <div className="w-12 h-12 rounded-full bg-ribbon/20 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-ribbon" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Soft Skills</h3>
            <p className="text-sm opacity-80 text-center">Ribbon AI communication and behavioral analysis</p>
          </div>
        </div>
      </div>
    </section>
  );
}