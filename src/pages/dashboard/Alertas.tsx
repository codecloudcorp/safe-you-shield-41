import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Shield,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Alert {
  id: number;
  type: "success" | "caution" | "alert" | "info";
  title: string;
  message: string;
  date: string;
  read: boolean;
  details?: string;
}

// Lista vazia - será preenchida com dados reais quando integrado ao backend
const initialAlerts: Alert[] = [];

const Alertas = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    consultaAlerts: true,
    safetyReminders: true,
    weeklyDigest: false
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

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

  const handleMarkAsRead = (alertId: number) => {
    setAlerts(prev => prev.map(a => 
      a.id === alertId ? { ...a, read: true } : a
    ));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    toast.success("Todas as notificações marcadas como lidas");
  };

  const handleDeleteAlert = () => {
    if (!selectedAlert) return;
    setAlerts(prev => prev.filter(a => a.id !== selectedAlert.id));
    toast.success("Notificação removida");
    setSelectedAlert(null);
    setIsDeleteDialogOpen(false);
  };

  const handleClearAll = () => {
    setAlerts([]);
    toast.success("Todas as notificações foram removidas");
  };

  const openDetailDialog = (alert: Alert) => {
    setSelectedAlert(alert);
    handleMarkAsRead(alert.id);
    setIsDetailDialogOpen(true);
  };

  const openDeleteDialog = (alert: Alert, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAlert(alert);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast.success(checked ? "Notificações ativadas" : "Notificações desativadas");
  };

  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso!");
    setIsSettingsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarCollapsed ? "md:ml-20 ml-0" : "md:ml-64 ml-0"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
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
            <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => setIsSettingsDialogOpen(true)}>
              <Settings className="w-4 h-4" />
              Configurar
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
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
                    onCheckedChange={handleToggleNotifications}
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
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Bell className="w-5 h-5 text-primary" />
                      Suas Notificações
                    </CardTitle>
                    <CardDescription>
                      {alerts.length} notificação(ões) no total
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm" onClick={handleMarkAllAsRead}>
                        Marcar como lidas
                      </Button>
                    )}
                    {alerts.length > 0 && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive text-xs sm:text-sm" onClick={handleClearAll}>
                        Limpar todas
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <AnimatePresence>
                  {alerts.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhuma notificação</p>
                      <p className="text-sm">Você está em dia!</p>
                    </motion.div>
                  ) : (
                    alerts.map((alert, index) => {
                      const alertConfig = getAlertConfig(alert.type);
                      const AlertIcon = alertConfig.icon;
                      return (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => openDetailDialog(alert)}
                          className={cn(
                            "flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-colors cursor-pointer hover:shadow-md",
                            alert.read ? "bg-muted/30 hover:bg-muted/50" : "bg-primary/5 border border-primary/10 hover:bg-primary/10"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0",
                            alertConfig.bgLight
                          )}>
                            <AlertIcon className={cn("w-4 h-4 md:w-5 md:h-5", alertConfig.textColor)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className={cn(
                                  "font-medium text-foreground text-sm md:text-base truncate",
                                  !alert.read && "font-semibold"
                                )}>
                                  {alert.title}
                                </p>
                                <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {alert.message}
                                </p>
                              </div>
                              {!alert.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-3 flex-wrap">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {alert.date}
                              </span>
                              <Button variant="ghost" size="sm" className="h-6 md:h-7 text-xs px-2" onClick={(e) => { e.stopPropagation(); openDetailDialog(alert); }}>
                                <Eye className="w-3 h-3 mr-1" />
                                <span className="hidden sm:inline">Ver detalhes</span>
                                <span className="sm:hidden">Ver</span>
                              </Button>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-muted-foreground hover:text-destructive flex-shrink-0 w-8 h-8 md:w-9 md:h-9"
                            onClick={(e) => openDeleteDialog(alert, e)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
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

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] flex flex-col overflow-hidden">
          {selectedAlert && (
            <>
              <DialogHeader className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getAlertConfig(selectedAlert.type);
                    const Icon = config.icon;
                    return (
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", config.bgLight)}>
                        <Icon className={cn("w-5 h-5", config.textColor)} />
                      </div>
                    );
                  })()}
                  <div className="min-w-0">
                    <DialogTitle className="text-base md:text-lg truncate">{selectedAlert.title}</DialogTitle>
                    <p className="text-xs text-muted-foreground mt-1">{selectedAlert.date}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto mt-4 space-y-4">
                <p className="text-sm md:text-base text-muted-foreground">{selectedAlert.details || selectedAlert.message}</p>
              </div>
              <div className="flex gap-3 pt-4 flex-shrink-0 border-t border-border mt-2">
                <Button variant="outline" className="flex-1" onClick={() => setIsDetailDialogOpen(false)}>
                  Fechar
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1" 
                  onClick={() => {
                    setIsDetailDialogOpen(false);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => {
        setIsDeleteDialogOpen(open);
        if (!open) setSelectedAlert(null);
      }}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir Notificação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta notificação? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleDeleteAlert}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Configurações de Notificações</DialogTitle>
            <DialogDescription>
              Personalize como você recebe alertas e notificações
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-1">
            <div className="flex items-center justify-between py-2 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm">Notificações por e-mail</p>
                <p className="text-xs text-muted-foreground">Receba alertas no seu e-mail</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm">Notificações push</p>
                <p className="text-xs text-muted-foreground">Receba alertas no navegador</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm">Alertas de consultas</p>
                <p className="text-xs text-muted-foreground">Notificações sobre resultados</p>
              </div>
              <Switch
                checked={settings.consultaAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, consultaAlerts: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm">Lembretes de segurança</p>
                <p className="text-xs text-muted-foreground">Dicas e lembretes periódicos</p>
              </div>
              <Switch
                checked={settings.safetyReminders}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, safetyReminders: checked }))}
              />
            </div>
            <div className="flex items-center justify-between py-2 gap-4">
              <div className="min-w-0">
                <p className="font-medium text-sm">Resumo semanal</p>
                <p className="text-xs text-muted-foreground">Relatório semanal por e-mail</p>
              </div>
              <Switch
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, weeklyDigest: checked }))}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4 flex-shrink-0 border-t border-border mt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsSettingsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-rose-soft to-lavender text-white" onClick={handleSaveSettings}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alertas;
