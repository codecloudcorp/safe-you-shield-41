import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Crown,
  Ticket // Ícone do Cupom
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Configuracoes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("perfil");
  
  // --- Estados do Modal de Checkout ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [referralCode, setReferralCode] = useState("");
  const [couponCode, setCouponCode] = useState("");

  // --- Estados das Configurações ---
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  // --- Estados do Perfil ---
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

    // Verifica se veio redirecionado com ?tab=plano
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [navigate, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    const email = localStorage.getItem("userEmail") || "";
    setProfileData(prev => ({
      ...prev,
      nome: email.split("@")[0] || "",
      email: email
    }));
  };

  // Abre o modal com o plano selecionado
  const openCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  // Simula o redirecionamento para o Gateway (Asaas)
  const handleAsaasRedirect = () => {
    setIsCheckoutOpen(false);
    toast.success(`Redirecionando para pagamento do plano ${selectedPlan.name} no Asaas...`);
    // Lógica futura: Integrar com API do Asaas enviando o split para a embaixadora do referralCode
    // window.location.href = `API_URL/checkout?plan=${selectedPlan.id}&ref=${referralCode}&coupon=${couponCode}`;
  };

  // Dados dos Planos (Usados no .map para evitar repetição de código)
  const plans = [
    {
      name: "Consulta Avulsa",
      icon: Sparkles,
      price: "19",
      originalPrice: null,
      period: "por verificação",
      description: "Para checagens pontuais e rápidas.",
      features: ["1 verificação completa", "Resultado em segundos", "Relatório em PDF"],
      cta: "Fazer Consulta",
      highlight: false,
    },
    {
      name: "Plano Mensal",
      icon: Heart,
      price: "29",
      originalPrice: "39",
      period: "por mês",
      description: "Proteção contínua para você.",
      features: ["5 verificações/mês", "Alertas de segurança", "Histórico de consultas"],
      cta: "Assinar Agora",
      highlight: true,
    },
    {
      name: "Plano Família",
      icon: Crown,
      price: "49",
      originalPrice: "69",
      period: "por mês",
      description: "Proteção completa para toda família.",
      features: ["15 verificações/mês", "Múltiplos usuários", "Suporte 24h"],
      cta: "Proteger Família",
      highlight: false,
    },
  ];

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
              Gerencie suas preferências e planos
            </p>
          </div>
        </header>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1 w-full md:w-auto flex flex-wrap h-auto">
              <TabsTrigger value="perfil" className="gap-2 flex-1 md:flex-none">
                <User className="w-4 h-4" /> Perfil
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="gap-2 flex-1 md:flex-none">
                <Bell className="w-4 h-4" /> Notificações
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="gap-2 flex-1 md:flex-none">
                <Shield className="w-4 h-4" /> Segurança
              </TabsTrigger>
              <TabsTrigger value="plano" className="gap-2 flex-1 md:flex-none">
                <CreditCard className="w-4 h-4" /> Planos
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="perfil">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
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
                        <Button variant="outline" className="gap-2" onClick={() => setIsEditingProfile(true)}>
                          <Settings className="w-4 h-4" /> Editar Perfil
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                        <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
                      </div>
                    </div>

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
                        <Button className="gap-2 bg-gradient-to-r from-rose-soft to-lavender text-white" onClick={handleSaveProfile}>
                          <Save className="w-4 h-4" /> Salvar alterações
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>Personalize a aparência do aplicativo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                          {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Modo escuro</p>
                          <p className="text-sm text-muted-foreground">Alterar para tema escuro</p>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>Escolha como deseja receber suas notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">E-mail</p>
                          <p className="text-sm text-muted-foreground">Receber notificações por e-mail</p>
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
                          <p className="text-sm text-muted-foreground">Notificações push no navegador</p>
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
                          <p className="text-sm text-muted-foreground">Receber alertas por SMS</p>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Autenticação em Duas Etapas</CardTitle>
                    <CardDescription>Adicione uma camada extra de segurança</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-safe-green/10 rounded-xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-safe-green" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">2FA</p>
                          <p className="text-sm text-muted-foreground">{twoFactor ? "Ativado" : "Desativado"}</p>
                        </div>
                      </div>
                      <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
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
                      <Lock className="w-4 h-4" /> Alterar senha
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                    <CardDescription>Ações irreversíveis da conta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="gap-2 text-destructive border-destructive/50 hover:bg-destructive/10" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" /> Sair da conta
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Plan Tab (Atualizado com Lógica de Checkout) */}
            <TabsContent value="plano">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                
                {/* Info do Plano Atual */}
                <Card className="border-primary/20 bg-gradient-to-r from-rose-soft/5 to-lavender/5">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-primary" /> Seu Plano Atual
                        </CardTitle>
                        <CardDescription>Você está no plano gratuito</CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">Gratuito</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Faça upgrade para desbloquear mais consultas.</p>
                  </CardContent>
                </Card>

                {/* Lista de Planos Disponíveis (Gerado com Map para otimização) */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Escolha um Plano</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <Card key={plan.name} className={`border-border/50 hover:border-lavender/30 transition-all hover:shadow-md relative cursor-pointer ${plan.highlight ? "border-rose-soft/50 shadow-lg" : ""}`}>
                        {plan.highlight && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-soft to-lavender text-white text-[10px] font-medium">
                              <Star className="w-2.5 h-2.5" /> Popular
                            </div>
                          </div>
                        )}
                        <CardHeader className="text-center pb-2 pt-5">
                          <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${plan.highlight ? "bg-gradient-to-br from-rose-soft to-lavender text-white" : "bg-secondary text-foreground"}`}>
                            <plan.icon className="w-5 h-5" />
                          </div>
                          <CardTitle className="text-base">{plan.name}</CardTitle>
                          <CardDescription className="text-xs">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="text-center">
                            {plan.originalPrice && <div className="text-xs text-muted-foreground line-through">R$ {plan.originalPrice}</div>}
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-xs text-muted-foreground">R$</span>
                              <span className="text-3xl font-bold">{plan.price}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{plan.period}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {plan.features.map((feature: string) => (
                              <li key={feature} className="flex items-start gap-2 text-xs">
                                <Check className="w-3 h-3 text-turquoise flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button 
                            className={`w-full ${plan.highlight ? "bg-gradient-to-r from-rose-soft to-lavender text-white hover:opacity-90" : "bg-secondary text-foreground hover:bg-secondary/80"}`} 
                            size="sm"
                            onClick={() => openCheckout(plan)}
                          >
                            {plan.cta}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Checkout Dialog (AQUI ESTÁ A LÓGICA PEDIDA) */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
            <DialogDescription>
              Você está adquirindo: <strong>{selectedPlan?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="referral" className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-soft" />
                Código da Embaixadora (Opcional)
              </Label>
              <Input 
                id="referral" 
                placeholder="Ex: MARIA10" 
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              />
              <p className="text-xs text-muted-foreground">Insira o código de quem te indicou para apoiar uma embaixadora.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon" className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-turquoise" />
                Cupom de Desconto
              </Label>
              <Input 
                id="coupon" 
                placeholder="Ex: PROMO20" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
            </div>
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">Total a pagar:</span>
              <span className="text-xl font-bold text-primary">R$ {selectedPlan?.price}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Cancelar</Button>
            <Button onClick={handleAsaasRedirect} className="bg-gradient-to-r from-rose-soft to-lavender text-white">
              Ir para Pagamento (Asaas)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configuracoes;