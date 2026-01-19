import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpCenter from "./pages/HelpCenter";
import LGPD from "./pages/LGPD";
import CookiesPolicy from "./pages/CookiesPolicy";
import ProtectionTips from "./pages/ProtectionTips";
import Embaixadoras from "./pages/Embaixadoras";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/central-de-ajuda" element={<HelpCenter />} />
          <Route path="/lgpd" element={<LGPD />} />
          <Route path="/politica-de-cookies" element={<CookiesPolicy />} />
          <Route path="/dicas-de-protecao" element={<ProtectionTips />} />
          <Route path="/embaixadoras" element={<Embaixadoras />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
