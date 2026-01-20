import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";

interface Consultation {
  id: number;
  cpf: string;
  status: "safe" | "caution" | "alert";
  date: string;
  time: string;
  details: string[];
}

const Historico = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Lista vazia - será preenchida com dados reais quando integrado ao backend
  const consultations: Consultation[] = [];

  const filteredConsultations = consultations.filter(c => 
    c.cpf.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "safe":
        return { 
          color: "bg-safe-green", 
          text: "Situação Regular", 
          shortText: "Seguro",
          textColor: "text-safe-green",
          bgLight: "bg-safe-green/10",
          borderColor: "border-safe-green",
          icon: CheckCircle,
          description: "Não foram encontradas pendências ou alertas significativos."
        };
      case "caution":
        return { 
          color: "bg-caution-yellow", 
          text: "Atenção Recomendada", 
          shortText: "Atenção",
          textColor: "text-caution-yellow",
          bgLight: "bg-caution-yellow/10",
          borderColor: "border-caution-yellow",
          icon: AlertTriangle,
          description: "Foram encontrados alguns pontos que merecem atenção."
        };
      case "alert":
        return { 
          color: "bg-alert-red", 
          text: "Alerta de Segurança", 
          shortText: "Alerta",
          textColor: "text-alert-red",
          bgLight: "bg-alert-red/10",
          borderColor: "border-alert-red",
          icon: AlertTriangle,
          description: "Foram encontradas pendências importantes. Tenha cautela."
        };
      default:
        return { 
          color: "bg-muted", 
          text: "Pendente", 
          shortText: "Pendente",
          textColor: "text-muted-foreground",
          bgLight: "bg-muted/50",
          borderColor: "border-muted",
          icon: Clock,
          description: ""
        };
    }
  };

  const handleViewConsultation = (consultation: Consultation) => {
    navigate(`/dashboard/consulta/${consultation.id}`);
  };

  const stats = {
    total: consultations.length,
    safe: consultations.filter(c => c.status === "safe").length,
    caution: consultations.filter(c => c.status === "caution").length,
    alert: consultations.filter(c => c.status === "alert").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Histórico de Consultas</h1>
              <p className="text-muted-foreground text-sm">
                Visualize todas as suas consultas realizadas
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-soft to-lavender rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Seguros</p>
                      <p className="text-2xl font-bold text-safe-green">{stats.safe}</p>
                    </div>
                    <div className="w-10 h-10 bg-safe-green/10 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-safe-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Atenção</p>
                      <p className="text-2xl font-bold text-caution-yellow">{stats.caution}</p>
                    </div>
                    <div className="w-10 h-10 bg-caution-yellow/10 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-caution-yellow" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Alertas</p>
                      <p className="text-2xl font-bold text-alert-red">{stats.alert}</p>
                    </div>
                    <div className="w-10 h-10 bg-alert-red/10 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-alert-red" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por CPF..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Período
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consultations List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Consultas Realizadas
                </CardTitle>
                <CardDescription>
                  {filteredConsultations.length} consulta(s) encontrada(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredConsultations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Nenhuma consulta encontrada
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {searchFilter 
                        ? "Nenhuma consulta corresponde à sua busca." 
                        : "Você ainda não realizou nenhuma consulta. Comece agora!"}
                    </p>
                    {!searchFilter && (
                      <Button 
                        onClick={() => navigate("/dashboard/consulta")}
                        className="bg-gradient-to-r from-rose-soft to-lavender hover:opacity-90"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Nova Consulta
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredConsultations.map((consultation, index) => {
                    const statusConfig = getStatusConfig(consultation.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                      <motion.div
                        key={consultation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleViewConsultation(consultation)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusConfig.bgLight)}>
                            <StatusIcon className={cn("w-5 h-5", statusConfig.textColor)} />
                          </div>
                          <div>
                            <p className="font-medium text-foreground font-mono">{consultation.cpf}</p>
                            <p className="text-sm text-muted-foreground">
                              CPF • {consultation.date} às {consultation.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            statusConfig.bgLight,
                            statusConfig.textColor
                          )}>
                            {statusConfig.shortText}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewConsultation(consultation);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Historico;
