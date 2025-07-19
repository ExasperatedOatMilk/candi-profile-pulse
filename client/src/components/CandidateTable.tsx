import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Plus,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { Candidate, CandidateFilters } from "@/types/candidate";
import { useNavigate } from "react-router-dom";

interface CandidateTableProps {
  candidates: Candidate[];
  filters: CandidateFilters;
  onFiltersChange: (filters: CandidateFilters) => void;
  onAddCandidate: () => void;
}

export function CandidateTable({ 
  candidates, 
  filters, 
  onFiltersChange, 
  onAddCandidate 
}: CandidateTableProps) {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (field: CandidateFilters['sortBy']) => {
    const newOrder = filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc';
    onFiltersChange({
      ...filters,
      sortBy: field,
      sortOrder: newOrder
    });
  };

  const getSortIcon = (field: CandidateFilters['sortBy']) => {
    if (filters.sortBy !== field) return <ArrowUpDown className="h-4 w-4" />;
    return filters.sortOrder === 'asc' 
      ? <ArrowUp className="h-4 w-4" /> 
      : <ArrowDown className="h-4 w-4" />;
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
  };

  const getPercentileBadge = (percentile: number) => {
    if (percentile >= 90) return "Top 10%";
    if (percentile >= 80) return "Top 20%";
    if (percentile >= 70) return "Top 30%";
    return `${percentile}th percentile`;
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Candidates</h2>
          <p className="text-muted-foreground">{candidates.length} candidates found</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={onAddCandidate} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className={`transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={filters.search}
                  onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Score</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={filters.minScore}
                onChange={(e) => onFiltersChange({ ...filters, minScore: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value: CandidateFilters['sortBy']) => 
                  onFiltersChange({ ...filters, sortBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="compositeScore">Composite Score</SelectItem>
                  <SelectItem value="lastUpdated">Last Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('compositeScore')}
              >
                <div className="flex items-center gap-2">
                  Composite Score
                  {getSortIcon('compositeScore')}
                </div>
              </TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Technical</TableHead>
              <TableHead>Soft Skills</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="flex items-center gap-2">
                  Last Updated
                  {getSortIcon('lastUpdated')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow 
                key={candidate.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/candidate/${candidate.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={candidate.photoUrl} />
                      <AvatarFallback>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {candidate.currentRole} at {candidate.currentCompany}
                      </div>
                      <div className="text-xs text-muted-foreground">{candidate.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={getScoreBadgeVariant(candidate.compositeScore)}>
                      {candidate.compositeScore}/100
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getPercentileBadge(candidate.percentileRank)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-48">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {candidate.techSkills.totalSolved} solved
                    </div>
                    <div className="text-muted-foreground">
                      {candidate.techSkills.ranking}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {Math.round(Object.values(candidate.softSkills).reduce((a, b) => a + b, 0) / 5)}/100
                    </div>
                    <div className="text-muted-foreground">
                      Avg. soft skills
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {new Date(candidate.lastUpdated).toLocaleDateString()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {candidates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No candidates found matching your criteria</div>
            <Button onClick={onAddCandidate} variant="outline">
              Add your first candidate
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}