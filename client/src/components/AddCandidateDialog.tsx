import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  User, 
  Linkedin, 
  Code, 
  Mic, 
  Upload,
  Plus,
  X
} from "lucide-react";
import { Candidate, SoftSkills, TechSkills, WorkHistory } from "@/types/candidate";
import { useToast } from "@/hooks/use-toast";

interface AddCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCandidate: (candidate: Omit<Candidate, 'id' | 'lastUpdated'>) => void;
}

export function AddCandidateDialog({ open, onOpenChange, onAddCandidate }: AddCandidateDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([]);
  
  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    photoUrl: '',
    currentRole: '',
    currentCompany: '',
    location: '',
    linkedinUrl: '',
    
    // Technical
    leetcodeUsername: '',
    totalSolved: 0,
    easyProblems: 0,
    mediumProblems: 0,
    hardProblems: 0,
    contestRating: 0,
    
    // Soft Skills
    clarity: 75,
    empathy: 75,
    confidence: 75,
    adaptability: 75,
    collaboration: 75,
    
    // Other
    transcript: ''
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addWorkHistoryItem = () => {
    setWorkHistory([...workHistory, {
      title: '',
      company: '',
      years: 0,
      current: false
    }]);
  };

  const updateWorkHistory = (index: number, field: keyof WorkHistory, value: any) => {
    const updated = [...workHistory];
    updated[index] = { ...updated[index], [field]: value };
    setWorkHistory(updated);
  };

  const removeWorkHistory = (index: number) => {
    setWorkHistory(workHistory.filter((_, i) => i !== index));
  };

  const calculateCompositeScore = () => {
    // Simple scoring algorithm
    const softSkillsAvg = (formData.clarity + formData.empathy + formData.confidence + formData.adaptability + formData.collaboration) / 5;
    const techScore = Math.min(100, (formData.totalSolved / 500) * 100); // Normalize to 100
    const experienceScore = Math.min(100, workHistory.reduce((sum, w) => sum + w.years, 0) * 10);
    
    return Math.round((softSkillsAvg * 0.4 + techScore * 0.4 + experienceScore * 0.2));
  };

  const calculatePercentileRank = (score: number) => {
    // Simple percentile calculation
    if (score >= 90) return 95;
    if (score >= 85) return 85;
    if (score >= 80) return 75;
    if (score >= 75) return 65;
    if (score >= 70) return 55;
    return 40;
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    const compositeScore = calculateCompositeScore();
    const percentileRank = calculatePercentileRank(compositeScore);

    const candidate: Omit<Candidate, 'id' | 'lastUpdated'> = {
      name: formData.name,
      email: formData.email,
      photoUrl: formData.photoUrl,
      currentRole: formData.currentRole,
      currentCompany: formData.currentCompany,
      location: formData.location,
      compositeScore,
      percentileRank,
      softSkills: {
        clarity: formData.clarity,
        empathy: formData.empathy,
        confidence: formData.confidence,
        adaptability: formData.adaptability,
        collaboration: formData.collaboration
      },
      techSkills: {
        totalSolved: formData.totalSolved,
        easyProblems: formData.easyProblems,
        mediumProblems: formData.mediumProblems,
        hardProblems: formData.hardProblems,
        topics: skills.filter(skill => 
          ['Dynamic Programming', 'Graphs', 'Trees', 'Arrays', 'Algorithms', 'Data Structures'].includes(skill)
        ),
        ranking: percentileRank >= 90 ? 'Top 10%' : percentileRank >= 80 ? 'Top 20%' : 'Top 30%',
        contestRating: formData.contestRating
      },
      workHistory,
      endorsements: skills.slice(0, 5),
      skills,
      linkedinUrl: formData.linkedinUrl,
      leetcodeUsername: formData.leetcodeUsername,
      transcript: formData.transcript
    };

    onAddCandidate(candidate);
    
    // Reset form
    setFormData({
      name: '', email: '', photoUrl: '', currentRole: '', currentCompany: '', location: '', linkedinUrl: '',
      leetcodeUsername: '', totalSolved: 0, easyProblems: 0, mediumProblems: 0, hardProblems: 0, contestRating: 0,
      clarity: 75, empathy: 75, confidence: 75, adaptability: 75, collaboration: 75, transcript: ''
    });
    setSkills([]);
    setWorkHistory([]);
    setStep(1);
    onOpenChange(false);

    toast({
      title: "Success",
      description: "Candidate added successfully"
    });
  };

  const nextStep = () => setStep(Math.min(4, step + 1));
  const prevStep = () => setStep(Math.max(1, step - 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentRole">Current Role</Label>
                <Input
                  id="currentRole"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input
                  id="currentCompany"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  placeholder="Google"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-leetcode" />
              <h3 className="text-lg font-semibold">Technical Skills</h3>
            </div>
            
            <div>
              <Label htmlFor="leetcodeUsername">LeetCode Username</Label>
              <Input
                id="leetcodeUsername"
                value={formData.leetcodeUsername}
                onChange={(e) => setFormData({ ...formData, leetcodeUsername: e.target.value })}
                placeholder="johndoe_dev"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalSolved">Total Problems Solved</Label>
                <Input
                  id="totalSolved"
                  type="number"
                  value={formData.totalSolved}
                  onChange={(e) => setFormData({ ...formData, totalSolved: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="contestRating">Contest Rating</Label>
                <Input
                  id="contestRating"
                  type="number"
                  value={formData.contestRating}
                  onChange={(e) => setFormData({ ...formData, contestRating: Number(e.target.value) })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="easyProblems">Easy Problems</Label>
                <Input
                  id="easyProblems"
                  type="number"
                  value={formData.easyProblems}
                  onChange={(e) => setFormData({ ...formData, easyProblems: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="mediumProblems">Medium Problems</Label>
                <Input
                  id="mediumProblems"
                  type="number"
                  value={formData.mediumProblems}
                  onChange={(e) => setFormData({ ...formData, mediumProblems: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="hardProblems">Hard Problems</Label>
                <Input
                  id="hardProblems"
                  type="number"
                  value={formData.hardProblems}
                  onChange={(e) => setFormData({ ...formData, hardProblems: Number(e.target.value) })}
                />
              </div>
            </div>
            
            <div>
              <Label>Skills & Technologies</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Mic className="h-5 w-5 text-ribbon" />
              <h3 className="text-lg font-semibold">Soft Skills Assessment</h3>
            </div>
            
            {[
              { key: 'clarity', label: 'Communication Clarity' },
              { key: 'empathy', label: 'Empathy & Understanding' },
              { key: 'confidence', label: 'Confidence & Presence' },
              { key: 'adaptability', label: 'Adaptability' },
              { key: 'collaboration', label: 'Collaboration' }
            ].map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label>{label}</Label>
                  <span className="text-sm text-muted-foreground">{formData[key as keyof typeof formData]}/100</span>
                </div>
                <Slider
                  value={[formData[key as keyof typeof formData] as number]}
                  onValueChange={([value]) => setFormData({ ...formData, [key]: value })}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
            
            <div>
              <Label htmlFor="transcript">Interview Transcript (optional)</Label>
              <Textarea
                id="transcript"
                value={formData.transcript}
                onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                placeholder="Paste interview transcript for AI analysis..."
                rows={4}
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
            
            {workHistory.map((work, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <Input
                    placeholder="Job Title"
                    value={work.title}
                    onChange={(e) => updateWorkHistory(index, 'title', e.target.value)}
                  />
                  <Input
                    placeholder="Company"
                    value={work.company}
                    onChange={(e) => updateWorkHistory(index, 'company', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="Years"
                    value={work.years}
                    onChange={(e) => updateWorkHistory(index, 'years', Number(e.target.value))}
                    className="w-24"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={work.current}
                      onChange={(e) => updateWorkHistory(index, 'current', e.target.checked)}
                    />
                    Current Role
                  </label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeWorkHistory(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
            
            <Button onClick={addWorkHistoryItem} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Work Experience
            </Button>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Preview Score</h4>
              <div className="text-2xl font-bold text-accent">
                {calculateCompositeScore()}/100
              </div>
              <div className="text-sm text-muted-foreground">
                {calculatePercentileRank(calculateCompositeScore())}th percentile
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogDescription>
            Step {step} of 4: Add candidate information to generate comprehensive assessment
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${i <= step ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
        
        {renderStepContent()}
        
        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Add Candidate
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
