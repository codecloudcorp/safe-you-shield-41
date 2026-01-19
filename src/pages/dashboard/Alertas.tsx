import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Trash2,
  Eye,
  BellRing,
  BellOff,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";

const Alertas = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const alerts = [
    { 
      id: 1, 
      type: "caution",
      title: "Consulta com atenção", 
      message: "A consulta sobre Maria Santos apresentou pontos de atenção.",
      date: "Hoje, 10:15",
      read: false
    },
    { 
      id: 2, 
      type: "info",
      title: "Lembrete de segurança", 
      message: "Lembre-se de verificar seus contatos de emergência periodicamente.",
      date: "Ontem, 14:30",
      read: false
    },
    { 
      id: 3, 
      type: "success",
      title: "Consulta segura", 
      message: "A consulta sobre João Silva foi concluída sem pendências.",
      date: "18/01/2026",
      read: true
    },
    { 
      id: 4, 
      type: "alert",
      title: "Alerta de segurança", 
      message: "Identificamos uma situação que requer sua atenção imediata.",
      date: "17/01/2026",
      read: true
    },
    { 
      id: 5, 
      type: "info",
      title: "Dica de proteção", 
      message: "Confira as novas dicas de segurança disponíveis no seu painel.",
      date: "16/01/2026",
      read: true
    },
  ];

  const unreadCount = alerts.filter(a => !a.read).length;

  const getAlertConfig = (type: string) => {
    switch (type) {
      case "success":
        return { 
          color: "bg-safe-green", 
          bgLight: "bg-safe-green/10",
          textColor: "text-safe-green",
          icon: CheckCircle 
        };
      case "caution":
        return { 
          color: "bg-caution-yellow", 
          bgLight: "bg-caution-yellow/10",
          textColor: "text-caution-yellow",
          icon: AlertTriangle 
        };
      case "alert":
        return { 
          color: "bg-alert-red", 
          bgLight: "bg-alert-red/10",
          textColor: "text-alert-red",
          icon: AlertTriangle 
        };
      default:
        return { 
          color: "bg-primary", 
          bgLight: "bg-primary/10",
          textColor: "text-primary",
          icon: Bell 
        };
    }
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
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Alertas
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                    {unreadCount} novo(s)
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground text-sm">
                Gerencie suas notificações e alertas de segurança
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Configurar
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      notificationsEnabled ? "bg-primary/10" : "bg-muted"
                    )}>
                      {notificationsEnabled ? (
                        <BellRing className="w-5 h-5 text-primary" />
                      ) : (
                        <BellOff className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Notificações</p>
                      <p className="text-sm text-muted-foreground">
                        {notificationsEnabled ? "Ativadas" : "Desativadas"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alerts List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      Suas Notificações
                    </CardTitle>
                    <CardDescription>
                      {alerts.length} notificação(ões) no total
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Marcar todas como lidas
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, index) => {
                  const alertConfig = getAlertConfig(alert.type);
                  const AlertIcon = alertConfig.icon;
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl transition-colors cursor-pointer",
                        alert.read ? "bg-muted/30" : "bg-primary/5 border border-primary/10"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        alertConfig.bgLight
                      )}>
                        <AlertIcon className={cn("w-5 h-5", alertConfig.textColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={cn(
                              "font-medium text-foreground",
                              !alert.read && "font-semibold"
                            )}>
                              {alert.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.message}
                            </p>
                          </div>
                          {!alert.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.date}
                          </span>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Safety Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-lavender/10 to-turquoise/10 border-lavender/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-lavender to-turquoise rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Configure seus alertas
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Mantenha suas notificações ativadas para receber alertas importantes 
                      sobre suas consultas e dicas de segurança personalizadas.
                    </p>
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

export default Alertas;
