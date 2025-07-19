export interface SoftSkills {
  clarity: number;
  empathy: number;
  confidence: number;
  adaptability: number;
  collaboration: number;
}

export interface TechSkills {
  totalSolved: number;
  easyProblems: number;
  mediumProblems: number;
  hardProblems: number;
  topics: string[];
  ranking: string;
  contestRating?: number;
}

export interface WorkHistory {
  title: string;
  company: string;
  years: number;
  current: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  photoUrl?: string;
  email?: string;
  currentRole: string;
  currentCompany: string;
  location: string;
  compositeScore: number;
  softSkills: SoftSkills;
  techSkills: TechSkills;
  workHistory: WorkHistory[];
  endorsements: string[];
  skills: string[];
  linkedinUrl?: string;
  leetcodeUsername?: string;
  transcript?: string;
  lastUpdated: string;
  percentileRank: number;
}

export interface CandidateFilters {
  search: string;
  minScore: number;
  maxScore: number;
  skills: string[];
  sortBy: 'name' | 'compositeScore' | 'lastUpdated';
  sortOrder: 'asc' | 'desc';
}