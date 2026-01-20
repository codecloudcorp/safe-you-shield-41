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
  Mail,
  Check,
  Star,
  Sparkles,
  Heart,
  Building2
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

  // Profile edit mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nascimento: ""
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    if (!isLoggedIn) {
      navigate("/login");
    }
    setUserEmail(email || "");
    setProfileData(prev => ({
      ...prev,
      nome: email?.split("@")[0] || "",
      email: email || ""
    }));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Here you would save to backend
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    // Reset to original values
    const email = localStorage.getItem("userEmail") || "";
    setProfileData(prev => ({
      ...prev,
      nome: email.split("@")[0] || "",
      email: email
    }));
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
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle>Informações do Perfil</CardTitle>
                        <CardDescription>
                          {isEditingProfile ? "Edite suas informações pessoais" : "Visualize suas informações pessoais"}
                        </CardDescription>
                      </div>
                      {!isEditingProfile && (
                        <Button 
                          variant="outline" 
                          className="gap-2"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <Settings className="w-4 h-4" />
                          Editar Perfil
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white text-3xl font-bold">
                          {userEmail.charAt(0).toUpperCase() || "U"}
                        </div>
                        {isEditingProfile && (
                          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors">
                            <Camera className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Foto do perfil</p>
                        <p className="text-sm text-muted-foreground">
                          {isEditingProfile ? "Clique no ícone para alterar. JPG, PNG ou GIF. Máximo 2MB." : "JPG, PNG ou GIF. Máximo 2MB."}
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input 
                          id="nome" 
                          value={profileData.nome}
                          onChange={(e) => setProfileData(prev => ({ ...prev, nome: e.target.value }))}
                          disabled={!isEditingProfile}
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditingProfile}
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input 
                          id="telefone" 
                          placeholder="(00) 00000-0000"
                          value={profileData.telefone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, telefone: e.target.value }))}
                          disabled={!isEditingProfile}
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nascimento">Data de nascimento</Label>
                        <Input 
                          id="nascimento" 
                          type="date"
                          value={profileData.nascimento}
                          onChange={(e) => setProfileData(prev => ({ ...prev, nascimento: e.target.value }))}
                          disabled={!isEditingProfile}
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed" : ""}
                        />
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex gap-3">
                        <Button 
                          className="gap-2 bg-gradient-to-r from-rose-soft to-lavender text-white"
                          onClick={handleSaveProfile}
                        >
                          <Save className="w-4 h-4" />
                          Salvar alterações
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
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
                className="space-y-6"
              >
                {/* Current Plan Info */}
                <Card className="border-primary/20 bg-gradient-to-r from-rose-soft/5 to-lavender/5">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-primary" />
                          Seu Plano Atual
                        </CardTitle>
                        <CardDescription>
                          Você está no plano gratuito
                        </CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                        Gratuito
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Faça upgrade para desbloquear mais consultas e recursos avançados.
                    </p>
                  </CardContent>
                </Card>

                {/* Available Plans */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Planos Disponíveis</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Consulta Avulsa */}
                    <Card className="border-border/50 hover:border-lavender/30 transition-all hover:shadow-md relative">
                      <CardHeader className="text-center pb-2">
                        <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-secondary">
                          <Sparkles className="w-6 h-6 text-foreground" />
                        </div>
                        <CardTitle className="text-lg">Consulta Avulsa</CardTitle>
                        <CardDescription>
                          Ideal para checagens pontuais
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm text-muted-foreground">R$</span>
                            <span className="text-4xl font-bold">19</span>
                          </div>
                          <span className="text-sm text-muted-foreground">por verificação</span>
                        </div>
                        <ul className="space-y-2">
                          {["1 verificação completa", "Consulta em todos os tribunais", "Resultado em segundos", "Relatório básico em PDF"].map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" className="w-full">
                          Fazer Consulta
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Plano Família - Popular */}
                    <Card className="border-rose-soft/50 shadow-lg relative scale-[1.02]">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-rose-soft to-lavender text-white text-xs font-medium">
                          <Star className="w-3 h-3" />
                          Mais Popular
                        </div>
                      </div>
                      <CardHeader className="text-center pb-2 pt-6">
                        <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-rose-soft to-lavender">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">Plano Família</CardTitle>
                        <CardDescription>
                          Proteção contínua para você e sua família
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm text-muted-foreground">R$</span>
                            <span className="text-4xl font-bold">49</span>
                          </div>
                          <span className="text-sm text-muted-foreground">por mês</span>
                        </div>
                        <ul className="space-y-2">
                          {["10 verificações por mês", "Consulta em todos os tribunais", "Alertas de segurança", "Relatórios detalhados", "Histórico de consultas", "Suporte prioritário"].map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-rose-soft flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-gradient-to-r from-rose-soft to-lavender text-white hover:opacity-90">
                          Assinar Agora
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Plano Empresarial */}
                    <Card className="border-border/50 hover:border-lavender/30 transition-all hover:shadow-md relative">
                      <CardHeader className="text-center pb-2">
                        <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-secondary">
                          <Building2 className="w-6 h-6 text-foreground" />
                        </div>
                        <CardTitle className="text-lg">Plano Empresarial</CardTitle>
                        <CardDescription>
                          Para RH, imobiliárias e empresas
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm text-muted-foreground">R$</span>
                            <span className="text-4xl font-bold">199</span>
                          </div>
                          <span className="text-sm text-muted-foreground">por mês</span>
                        </div>
                        <ul className="space-y-2">
                          {["Consultas ilimitadas", "Verificação de PF e PJ", "Score de crédito", "Análise financeira", "API de integração", "Múltiplos usuários", "Gerente de conta"].map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button variant="default" className="w-full">
                          Falar com Vendas
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Configuracoes;
