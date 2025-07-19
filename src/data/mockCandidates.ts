import { Candidate } from "@/types/candidate";

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "john.doe@example.com",
    currentRole: "Senior Software Engineer",
    currentCompany: "Airbnb",
    location: "San Francisco, CA",
    compositeScore: 87,
    percentileRank: 85,
    softSkills: {
      clarity: 91,
      empathy: 87,
      confidence: 82,
      adaptability: 79,
      collaboration: 88
    },
    techSkills: {
      totalSolved: 342,
      easyProblems: 156,
      mediumProblems: 142,
      hardProblems: 44,
      topics: ["Dynamic Programming", "Graphs", "Trees", "System Design"],
      ranking: "Top 8%",
      contestRating: 1847
    },
    workHistory: [
      { title: "Senior Software Engineer", company: "Airbnb", years: 2.5, current: true },
      { title: "Software Engineer", company: "Uber", years: 3.2, current: false },
      { title: "Junior Developer", company: "Startup Inc", years: 1.8, current: false }
    ],
    endorsements: ["Python", "System Design", "Team Leadership", "React", "Node.js"],
    skills: ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker"],
    linkedinUrl: "https://linkedin.com/in/johndoe",
    leetcodeUsername: "johndoe_dev",
    transcript: "Shows excellent communication skills during technical discussions...",
    lastUpdated: "2024-01-15"
  },
  {
    id: "2",
    name: "Sarah Chen",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    email: "sarah.chen@example.com",
    currentRole: "Full Stack Developer",
    currentCompany: "Google",
    location: "Mountain View, CA",
    compositeScore: 92,
    percentileRank: 95,
    softSkills: {
      clarity: 95,
      empathy: 89,
      confidence: 91,
      adaptability: 88,
      collaboration: 93
    },
    techSkills: {
      totalSolved: 487,
      easyProblems: 198,
      mediumProblems: 201,
      hardProblems: 88,
      topics: ["Algorithms", "Data Structures", "System Design", "Databases"],
      ranking: "Top 3%",
      contestRating: 2156
    },
    workHistory: [
      { title: "Full Stack Developer", company: "Google", years: 1.8, current: true },
      { title: "Software Engineer", company: "Facebook", years: 2.1, current: false },
      { title: "Frontend Developer", company: "Microsoft", years: 2.5, current: false }
    ],
    endorsements: ["JavaScript", "React", "Python", "Machine Learning", "Leadership"],
    skills: ["TypeScript", "React", "Python", "Go", "GCP", "Kubernetes"],
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    leetcodeUsername: "sarah_codes",
    lastUpdated: "2024-01-18"
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "michael.rodriguez@example.com",
    currentRole: "Backend Engineer",
    currentCompany: "Stripe",
    location: "Austin, TX",
    compositeScore: 78,
    percentileRank: 72,
    softSkills: {
      clarity: 76,
      empathy: 71,
      confidence: 84,
      adaptability: 73,
      collaboration: 79
    },
    techSkills: {
      totalSolved: 198,
      easyProblems: 89,
      mediumProblems: 87,
      hardProblems: 22,
      topics: ["Backend Development", "APIs", "Databases"],
      ranking: "Top 25%",
      contestRating: 1456
    },
    workHistory: [
      { title: "Backend Engineer", company: "Stripe", years: 1.2, current: true },
      { title: "Software Developer", company: "Shopify", years: 2.8, current: false }
    ],
    endorsements: ["Java", "Spring Boot", "PostgreSQL", "Microservices"],
    skills: ["Java", "Spring", "PostgreSQL", "Redis", "Docker", "Kafka"],
    linkedinUrl: "https://linkedin.com/in/michaelrodriguez",
    leetcodeUsername: "mike_backend",
    lastUpdated: "2024-01-12"
  },
  {
    id: "4",
    name: "Emily Thompson",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    email: "emily.thompson@example.com",
    currentRole: "Data Scientist",
    currentCompany: "Netflix",
    location: "Los Gatos, CA",
    compositeScore: 89,
    percentileRank: 88,
    softSkills: {
      clarity: 88,
      empathy: 85,
      confidence: 87,
      adaptability: 91,
      collaboration: 86
    },
    techSkills: {
      totalSolved: 156,
      easyProblems: 67,
      mediumProblems: 71,
      hardProblems: 18,
      topics: ["Machine Learning", "Statistics", "Data Analysis"],
      ranking: "Top 15%",
      contestRating: 1623
    },
    workHistory: [
      { title: "Data Scientist", company: "Netflix", years: 2.1, current: true },
      { title: "ML Engineer", company: "Tesla", years: 1.9, current: false },
      { title: "Data Analyst", company: "LinkedIn", years: 2.3, current: false }
    ],
    endorsements: ["Python", "Machine Learning", "TensorFlow", "Data Visualization"],
    skills: ["Python", "R", "TensorFlow", "PyTorch", "SQL", "Tableau"],
    linkedinUrl: "https://linkedin.com/in/emilythompson",
    leetcodeUsername: "emily_ml",
    lastUpdated: "2024-01-20"
  },
  {
    id: "5",
    name: "David Kim",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    email: "david.kim@example.com",
    currentRole: "DevOps Engineer",
    currentCompany: "Amazon",
    location: "Seattle, WA",
    compositeScore: 81,
    percentileRank: 76,
    softSkills: {
      clarity: 79,
      empathy: 74,
      confidence: 86,
      adaptability: 83,
      collaboration: 82
    },
    techSkills: {
      totalSolved: 234,
      easyProblems: 102,
      mediumProblems: 98,
      hardProblems: 34,
      topics: ["System Design", "Infrastructure", "Automation"],
      ranking: "Top 18%",
      contestRating: 1567
    },
    workHistory: [
      { title: "DevOps Engineer", company: "Amazon", years: 1.5, current: true },
      { title: "Site Reliability Engineer", company: "Slack", years: 2.2, current: false },
      { title: "Systems Engineer", company: "Dropbox", years: 1.8, current: false }
    ],
    endorsements: ["AWS", "Kubernetes", "Terraform", "Monitoring"],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Python", "Bash"],
    linkedinUrl: "https://linkedin.com/in/davidkim",
    leetcodeUsername: "david_devops",
    lastUpdated: "2024-01-14"
  }
];