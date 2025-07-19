import { useState, useEffect } from 'react';
import { Candidate, CandidateFilters } from '@/types/candidate';
import { mockCandidates } from '@/data/mockCandidates';

const STORAGE_KEY = 'recruiter_candidates';

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filters, setFilters] = useState<CandidateFilters>({
    search: '',
    minScore: 0,
    maxScore: 100,
    skills: [],
    sortBy: 'compositeScore',
    sortOrder: 'desc'
  });

  // Load candidates from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCandidates(JSON.parse(stored));
      } catch {
        setCandidates(mockCandidates);
      }
    } else {
      setCandidates(mockCandidates);
    }
  }, []);

  // Save to localStorage whenever candidates change
  useEffect(() => {
    if (candidates.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
    }
  }, [candidates]);

  const addCandidate = (candidate: Omit<Candidate, 'id' | 'lastUpdated'>) => {
    const newCandidate: Candidate = {
      ...candidate,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setCandidates(prev => [newCandidate, ...prev]);
  };

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id 
          ? { ...candidate, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
          : candidate
      )
    );
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
  };

  const getCandidate = (id: string) => {
    return candidates.find(candidate => candidate.id === id);
  };

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.currentRole.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.currentCompany.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesScore = 
        candidate.compositeScore >= filters.minScore && 
        candidate.compositeScore <= filters.maxScore;

      const matchesSkills = 
        filters.skills.length === 0 || 
        filters.skills.some(skill => 
          candidate.skills.some(candidateSkill => 
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        );

      return matchesSearch && matchesScore && matchesSkills;
    })
    .sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sortOrder === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

  // Analytics
  const analytics = {
    totalCandidates: candidates.length,
    averageScore: candidates.length > 0 
      ? Math.round(candidates.reduce((sum, c) => sum + c.compositeScore, 0) / candidates.length)
      : 0,
    strongSoftSkills: candidates.filter(c => 
      Object.values(c.softSkills).reduce((sum, score) => sum + score, 0) / 5 > 80
    ).length,
    topPerformers: candidates.filter(c => c.compositeScore >= 85).length
  };

  return {
    candidates: filteredCandidates,
    allCandidates: candidates,
    filters,
    setFilters,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidate,
    analytics
  };
}