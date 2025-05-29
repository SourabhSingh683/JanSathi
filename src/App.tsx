
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RTI from "./pages/RTI";
import Grievance from "./pages/Grievance";
import Schemes from "./pages/Schemes";
import HowItWorks from "./pages/HowItWorks";
import WhyWeNeed from "./pages/WhyWeNeed";
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
          <Route path="/rti" element={<RTI />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/why-we-need" element={<WhyWeNeed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
