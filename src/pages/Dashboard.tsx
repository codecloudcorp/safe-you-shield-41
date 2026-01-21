import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Bell, 
  Search,
  Users,
  CheckCircle,
  FileText,
  ArrowRight,
  Crown // Importei o ícone Crown
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    setUserEmail(email || "");
  }, [navigate]);

  const stats = [
    { label: "Consultas Realizadas", value: "0", icon: Search, color: "from-rose-soft to-lavender", route: "/dashboard/historico" },
    { label: "Alertas Ativos", value: "0", icon: Bell, color: "from-lavender to-turquoise", route: "/dashboard/alertas" },
    { label: "Contatos Protegidos", value: "0", icon: Users, color: "from-turquoise to-mint", route: "/dashboard/contatos" },
    { label: "Dias de Proteção", value: "0", icon: Shield, color: "from-mint to-trust-blue", route: "/dashboard/configuracoes" },
    // NOVO CARD ADICIONADO AQUI
    { label: "Seu Plano", value: "Gratuito", icon: Crown, color: "from-amber-400 to-orange-400", route: "/dashboard/configuracoes?tab=plano" },
  ];

  const recentConsultations: Array<{ cpf: string; status: string; date: string }> = [];

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarCollapsed ? "md:ml-20 ml-0" : "md:ml-64 ml-0"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Olá, {userEmail.split("@")[0] || "Usuária"}! 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                Bem-vinda ao seu painel de proteção
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate("/dashboard/alertas")}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white font-medium">
                {userEmail.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-6">
          {/* Status Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-rose-soft/10 via-lavender/10 to-turquoise/10 rounded-2xl p-6 border border-primary/10"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-soft to-lavender rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 flex-wrap">
                  Você está protegida
                  <span className="inline-flex items-center gap-1 text-sm font-normal text-safe-green bg-safe-green/10 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Ativo
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm">
                  Seu plano está ativo e todas as funcionalidades estão disponíveis.
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-rose-soft to-lavender text-white hover:opacity-90 w-full sm:w-auto"
                onClick={() => navigate("/dashboard/consulta")}
              >
                <Search className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card 
                  className="border-border/50 hover:shadow-md transition-shadow cursor-pointer h-full"
                  onClick={() => navigate(stat.route)}
                >
                  <CardContent className="p-4 md:p-5 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                        
                        {/* Texto extra apenas para o card de Plano */}
                        {stat.label === "Seu Plano" && (
                          <p className="text-xs text-primary mt-1 font-medium hover:underline">Fazer Upgrade →</p>
                        )}
                      </div>
                      <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", stat.color)}>
                        <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Consultations - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Consultas Recentes
                  </CardTitle>
                  <CardDescription>Suas últimas verificações realizadas</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => navigate("/dashboard/historico")}
                >
                  Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentConsultations.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">Nenhuma consulta realizada</p>
                    <Button 
                      variant="link" 
                      className="text-primary mt-2"
                      onClick={() => navigate("/dashboard/consulta")}
                    >
                      Fazer primeira consulta →
                    </Button>
                  </div>
                ) : (
                  recentConsultations.map((consultation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate("/dashboard/historico")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-soft/20 to-lavender/20 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground font-mono">{consultation.cpf}</p>
                          <p className="text-sm text-muted-foreground">
                            CPF • {consultation.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-lavender/10 to-turquoise/10 border-lavender/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-lavender to-turquoise rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground mb-1">
                      Dica de Segurança do Dia
                    </h4>
                    <p className="text-muted-foreground">
                      Sempre verifique o histórico de uma pessoa antes de encontros presenciais. 
                      Use nossa ferramenta de consulta para garantir sua segurança.
                    </p>
                    <Button 
                      variant="link" 
                      className="px-0 mt-2 text-primary"
                      onClick={() => navigate("/dicas-protecao")}
                    >
                      Ver mais dicas →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;