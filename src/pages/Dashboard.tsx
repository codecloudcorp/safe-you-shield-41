import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Bell, 
  Search,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  FileText,
  ArrowRight
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
    { label: "Consultas Realizadas", value: "12", icon: Search, color: "from-rose-soft to-lavender" },
    { label: "Alertas Ativos", value: "3", icon: Bell, color: "from-lavender to-turquoise" },
    { label: "Contatos Protegidos", value: "5", icon: Users, color: "from-turquoise to-mint" },
    { label: "Dias de Proteção", value: "45", icon: Shield, color: "from-mint to-trust-blue" },
  ];

  const recentConsultations = [
    { name: "João Silva", status: "safe", date: "Hoje, 14:30", type: "CPF" },
    { name: "Maria Santos", status: "caution", date: "Ontem, 10:15", type: "Telefone" },
    { name: "Pedro Oliveira", status: "safe", date: "20/01/2026", type: "CPF" },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "safe":
        return { color: "bg-safe-green", text: "Seguro", textColor: "text-safe-green" };
      case "caution":
        return { color: "bg-caution-yellow", text: "Atenção", textColor: "text-caution-yellow" };
      case "alert":
        return { color: "bg-alert-red", text: "Alerta", textColor: "text-alert-red" };
      default:
        return { color: "bg-muted", text: "Pendente", textColor: "text-muted-foreground" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Olá, {userEmail.split("@")[0] || "Usuária"}! 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                Bem-vinda ao seu painel de proteção
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white font-medium">
                {userEmail.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-rose-soft/10 via-lavender/10 to-turquoise/10 rounded-2xl p-6 border border-primary/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-soft to-lavender rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  Você está protegida
                  <span className="inline-flex items-center gap-1 text-sm font-normal text-safe-green bg-safe-green/10 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Ativo
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm">
                  Seu plano está ativo e todas as funcionalidades estão disponíveis.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-rose-soft to-lavender text-white hover:opacity-90">
                <Search className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", stat.color)}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Consultations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
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
                  <Button variant="ghost" size="sm" className="text-primary">
                    Ver todas <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentConsultations.map((consultation, index) => {
                    const statusConfig = getStatusConfig(consultation.status);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-soft/20 to-lavender/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium">
                              {consultation.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{consultation.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {consultation.type} • {consultation.date}
                            </p>
                          </div>
                        </div>
                        <div className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          statusConfig.color === "bg-safe-green" && "bg-safe-green/10 text-safe-green",
                          statusConfig.color === "bg-caution-yellow" && "bg-caution-yellow/10 text-caution-yellow",
                          statusConfig.color === "bg-alert-red" && "bg-alert-red/10 text-alert-red"
                        )}>
                          {statusConfig.text}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Ações Rápidas
                  </CardTitle>
                  <CardDescription>Acesse rapidamente as funcionalidades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-rose-soft to-lavender text-white hover:opacity-90">
                    <Search className="w-5 h-5" />
                    Consultar CPF
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Users className="w-5 h-5 text-primary" />
                    Adicionar Contato
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <Bell className="w-5 h-5 text-primary" />
                    Configurar Alertas
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12">
                    <AlertTriangle className="w-5 h-5 text-caution-yellow" />
                    Reportar Situação
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

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
                    <Button variant="link" className="px-0 mt-2 text-primary">
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
