
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import MarketFeed from "./pages/MarketFeed";
import SentimentSearch from "./pages/SentimentSearch";
import StrategyLab from "./pages/StrategyLab";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Portfolio />} />
            <Route path="/market-feed" element={<MarketFeed />} />
            <Route path="/sentiment-search" element={<SentimentSearch />} />
            <Route path="/strategy-lab" element={<StrategyLab />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
