import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Consulta from "./pages/dashboard/Consulta";
import ConsultaDetalhe from "./pages/dashboard/ConsultaDetalhe";
import Historico from "./pages/dashboard/Historico";
import Contatos from "./pages/dashboard/Contatos";
import Alertas from "./pages/dashboard/Alertas";
import Configuracoes from "./pages/dashboard/Configuracoes";
import EmbaixadoraDashboard from "./pages/dashboard/EmbaixadoraDashboard";
import EmbaixadoraConfiguracoes from "./pages/dashboard/EmbaixadoraConfiguracoes"; 
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpCenter from "./pages/HelpCenter";
import LGPD from "./pages/LGPD";
import CookiesPolicy from "./pages/CookiesPolicy";
import ProtectionTips from "./pages/ProtectionTips";
import Embaixadoras from "./pages/Embaixadoras";
import { setupForegroundNotifications } from "./lib/notifications";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    setupForegroundNotifications();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/consulta" element={<Consulta />} />
            <Route path="/dashboard/consulta/detalhe" element={<ConsultaDetalhe />} />
            <Route path="/dashboard/consulta/:id" element={<ConsultaDetalhe />} />
            <Route path="/dashboard/historico" element={<Historico />} />
            <Route path="/dashboard/contatos" element={<Contatos />} />
            <Route path="/dashboard/alertas" element={<Alertas />} />
            <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
            
            <Route path="/embaixadora" element={<EmbaixadoraDashboard />} />
            <Route path="/embaixadora/configuracoes" element={<EmbaixadoraConfiguracoes />} />
            
            <Route path="/admin" element={<AdminDashboard />} />
            
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/central-de-ajuda" element={<HelpCenter />} />
            <Route path="/lgpd" element={<LGPD />} />
            <Route path="/politica-de-cookies" element={<CookiesPolicy />} />
            <Route path="/dicas-de-protecao" element={<ProtectionTips />} />
            <Route path="/embaixadoras" element={<Embaixadoras />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
