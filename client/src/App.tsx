import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CandidateProfile from "./pages/CandidateProfile";
import InterviewForm from "./pages/InterviewForm";
import CandidateLists from "./pages/CandidateLists";
import CandidateOpenInterviews from './pages/CandidateOpenInterviews';
import CandidateApply from './pages/CandidateApply';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/create-interview/" element={<InterviewForm />} />
          <Route path="/candidate-list/" element={<CandidateLists />} />
          <Route path="/candidate" element={<CandidateOpenInterviews />} />
          <Route path="/candidate/apply/:interview_flow_id" element={<CandidateApply />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
