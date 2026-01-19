import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Lock,
  CreditCard,
  LogOut,
  Camera,
  Save,
  Moon,
  Sun,
  Smartphone,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";

const Configuracoes = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  // Settings states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    if (!isLoggedIn) {
      navigate("/login");
    }
    setUserEmail(email || "");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
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
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground text-sm">
              Gerencie suas preferências e informações da conta
            </p>
          </div>
        </header>

        <div className="p-6">
          <Tabs defaultValue="perfil" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="perfil" className="gap-2">
                <User className="w-4 h-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="gap-2">
                <Bell className="w-4 h-4" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="gap-2">
                <Shield className="w-4 h-4" />
                Segurança
              </TabsTrigger>
              <TabsTrigger value="plano" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Plano
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="perfil">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white text-3xl font-bold">
                          {userEmail.charAt(0).toUpperCase() || "U"}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Foto do perfil</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG ou GIF. Máximo 2MB.
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input id="nome" defaultValue={userEmail.split("@")[0] || ""} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" defaultValue={userEmail} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" placeholder="(00) 00000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nascimento">Data de nascimento</Label>
                        <Input id="nascimento" type="date" />
                      </div>
                    </div>

                    <Button className="gap-2 bg-gradient-to-r from-rose-soft to-lavender text-white">
                      <Save className="w-4 h-4" />
                      Salvar alterações
                    </Button>
                  </CardContent>
                </Card>

                {/* Appearance */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>
                      Personalize a aparência do aplicativo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                          {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Modo escuro</p>
                          <p className="text-sm text-muted-foreground">
                            Alterar para tema escuro
                          </p>
                        </div>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notificacoes">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Escolha como deseja receber suas notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">E-mail</p>
                          <p className="text-sm text-muted-foreground">
                            Receber notificações por e-mail
                          </p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Bell className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Push</p>
                          <p className="text-sm text-muted-foreground">
                            Notificações push no navegador
                          </p>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">SMS</p>
                          <p className="text-sm text-muted-foreground">
                            Receber alertas por SMS
                          </p>
                        </div>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="seguranca">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                      Mantenha sua conta segura com uma senha forte
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha atual</Label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nova-senha">Nova senha</Label>
                      <Input id="nova-senha" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                      <Input id="confirmar-senha" type="password" />
                    </div>
                    <Button className="gap-2">
                      <Lock className="w-4 h-4" />
                      Alterar senha
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Autenticação em Duas Etapas</CardTitle>
                    <CardDescription>
                      Adicione uma camada extra de segurança à sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-safe-green/10 rounded-xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-safe-green" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">2FA</p>
                          <p className="text-sm text-muted-foreground">
                            {twoFactor ? "Ativado" : "Desativado"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                    <CardDescription>
                      Ações irreversíveis da conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="gap-2 text-destructive border-destructive/50 hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      Sair da conta
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Plan Tab */}
            <TabsContent value="plano">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-primary/20 bg-gradient-to-r from-rose-soft/5 to-lavender/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-primary" />
                          Seu Plano Atual
                        </CardTitle>
                        <CardDescription>
                          Gerencie sua assinatura
                        </CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                        Premium
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-xl border border-border">
                        <p className="text-sm text-muted-foreground">Consultas restantes</p>
                        <p className="text-2xl font-bold text-foreground">45</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-border">
                        <p className="text-sm text-muted-foreground">Próxima renovação</p>
                        <p className="text-2xl font-bold text-foreground">15/02</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-border">
                        <p className="text-sm text-muted-foreground">Valor mensal</p>
                        <p className="text-2xl font-bold text-foreground">R$ 29,90</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="gap-2 bg-gradient-to-r from-rose-soft to-lavender text-white">
                        Fazer upgrade
                      </Button>
                      <Button variant="outline" className="gap-2">
                        Ver histórico de pagamentos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
