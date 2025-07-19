import { useState } from "react";
import { CandidateTable } from "@/components/CandidateTable";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { AddCandidateDialog } from "@/components/AddCandidateDialog";
import { useCandidates } from "@/hooks/useCandidates";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Settings } from "lucide-react";

export default function Dashboard() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const {
    candidates,
    allCandidates,
    filters,
    setFilters,
    addCandidate,
    analytics
  } = useCandidates();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">
                Unified candidate intelligence platform
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="candidates" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="candidates" className="gap-2">
              <Users className="h-4 w-4" />
              Candidates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            <CandidateTable
              candidates={candidates}
              filters={filters}
              onFiltersChange={setFilters}
              onAddCandidate={() => setShowAddDialog(true)}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsPanel candidates={allCandidates} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Candidate Dialog */}
      <AddCandidateDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddCandidate={addCandidate}
      />
    </div>
  );
}