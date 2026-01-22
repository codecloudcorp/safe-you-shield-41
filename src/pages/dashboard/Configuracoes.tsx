import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Ticket,
  Copy,
  QrCode,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/services/api";

// Interface para Tipagem
interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  avatarBase64?: string; // Para envio/recebimento da imagem
}

const Configuracoes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("perfil");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- ESTADOS DO PERFIL ---
  const [loadingData, setLoadingData] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState<UserProfile>({
    nome: "",
    email: "",
    telefone: "",
    nascimento: ""
  });
  const [profileData, setProfileData] = useState<UserProfile>({
    nome: "",
    email: "",
    telefone: "",
    nascimento: ""
  });
  const [userRoles, setUserRoles] = useState<string[]>([]);

  // --- ESTADOS DE SENHA ---
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // --- ESTADOS DE 2FA ---
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // --- ESTADOS CHECKOUT/PLANO ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [couponCode, setCouponCode] = useState("");

  // --- ESTADOS ATIVAÇÃO EMBAIXADORA ---
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);
  const [ambassadorPix, setAmbassadorPix] = useState("");
  const [ambassadorReferral, setAmbassadorReferral] = useState("");

  // Settings states (Visuais)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      try {
        // Busca dados reais do backend
        // Nota: O endpoint /users/me deve retornar { nome, email, telefone, nascimento, roles: [], isTwoFactorEnabled, ... }
        const response = await api.get("/users/me");
        const userData = response.data;

        setUserEmail(userData.email || "");
        setUserRoles(userData.roles || []); // Ex: ["USER", "EMBAIXADOR"]
        setTwoFactorEnabled(userData.isTwoFactorEnabled);

        const loadedProfile = {
            nome: userData.nome || "",
            email: userData.email || "",
            telefone: userData.telefone || "",
            nascimento: userData.nascimento || "", // Formato YYYY-MM-DD
            avatarBase64: userData.fotoBase64 || "" // Se o backend mandar a foto
        };

        setOriginalProfileData(loadedProfile);
        setProfileData(loadedProfile);
        setLoadingData(false);

      } catch (error) {
        console.error("Erro ao carregar perfil", error);
        toast.error("Não foi possível carregar seus dados.");
        // Fallback local se a API falhar para não quebrar a tela
        const localEmail = localStorage.getItem("userEmail") || "";
        setUserEmail(localEmail);
        setProfileData(prev => ({ ...prev, email: localEmail }));
        setLoadingData(false);
      }
    };

    fetchData();

    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [navigate, searchParams]);

  const handleLogout = () => {
    localStorage.clear(); // Limpa tudo
    navigate("/login");
  };

  // --- LÓGICA DO PERFIL ---

  const handleCancelEdit = () => {
    // Reverte para os dados originais (Rollback)
    setProfileData(originalProfileData);
    setIsEditingProfile(false);
    toast.info("Edição cancelada. Nenhuma alteração foi salva.");
  };

  const handleSaveProfile = async () => {
    try {
      // Envia para o backend
      // O backend deve ter um endpoint PUT /users/me que aceita UpdateProfileDTO
      const response = await api.put("/users/me", profileData);
      
      // Atualiza o "original" com o que voltou do servidor (confirmado)
      const updatedData = {
          nome: response.data.nome,
          email: response.data.email,
          telefone: response.data.telefone,
          nascimento: response.data.nascimento,
          avatarBase64: response.data.fotoBase64
      };

      setOriginalProfileData(updatedData);
      setProfileData(updatedData);
      setIsEditingProfile(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar alterações.");
    }
  };

  // Processamento real de imagem para Base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileData(prev => ({ ...prev, avatarBase64: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LÓGICA DE SENHA ---
  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.warning("Preencha todos os campos de senha.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      await api.post("/users/me/password", passwordData);
      toast.success("Senha alterada com sucesso! Esta senha vale para todos os seus perfis.");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      const msg = error.response?.data || "Erro ao alterar senha. Verifique sua senha atual.";
      toast.error(msg);
    }
  };

  // --- LÓGICA DE 2FA ---
  const handleToggle2FA = async (checked: boolean) => {
    if (checked) {
      try {
        const response = await api.post("/auth/2fa/setup");
        setQrCodeImage(response.data.qrCode);
        setSecretCode(response.data.secret);
        setIs2FAModalOpen(true);
      } catch (error) {
        toast.error("Erro ao iniciar configuração do 2FA.");
      }
    } else {
      try {
        await api.post("/auth/2fa/disable");
        setTwoFactorEnabled(false);
        toast.success("Autenticação em duas etapas desativada.");
      } catch (error) {
        toast.error("Erro ao desativar 2FA.");
      }
    }
  };

  const activate2FA = async () => {
    try {
      await api.post("/auth/2fa/activate", { code: verificationCode });
      setTwoFactorEnabled(true);
      setIs2FAModalOpen(false);
      setVerificationCode("");
      toast.success("Segurança máxima ativada! 2FA configurado com sucesso.");
    } catch (error) {
      toast.error("Código incorreto. Tente novamente.");
    }
  };

  const copySecretToClipboard = () => {
    navigator.clipboard.writeText(secretCode);
    toast.success("Código secreto copiado!");
  };

  // --- LÓGICA ATIVAR EMBAIXADORA ---
  const handleActivateAmbassador = async () => {
    try {
        await api.post("/users/me/activate-ambassador", {
            pixKey: ambassadorPix,
            referralCode: ambassadorReferral.toUpperCase()
        });
        toast.success("Parabéns! Agora você é uma Embaixadora Safe You.");
        setIsAmbassadorModalOpen(false);
        // Atualiza roles localmente ou recarrega a página
        setUserRoles(prev => [...prev, "EMBAIXADOR"]);
        
        // Opcional: Redirecionar para o painel de embaixadora
        setTimeout(() => navigate("/embaixadora"), 1500);
    } catch (error: any) {
        toast.error(error.response?.data || "Erro ao ativar conta embaixadora.");
    }
  };

  // --- LÓGICA CHECKOUT ---
  const openCheckout = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setIsCheckoutOpen(true);
  };

  const handleAsaasRedirect = () => {
    setIsCheckoutOpen(false);
    toast.success(`Redirecionando para pagamento do plano ${selectedPlan?.name} no Asaas...`);
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1 w-full md:w-auto overflow-x-auto flex-nowrap">
              <TabsTrigger value="perfil" className="gap-2"><User className="w-4 h-4" /> Perfil</TabsTrigger>
              <TabsTrigger value="notificacoes" className="gap-2"><Bell className="w-4 h-4" /> Notificações</TabsTrigger>
              <TabsTrigger value="seguranca" className="gap-2"><Shield className="w-4 h-4" /> Segurança</TabsTrigger>
              <TabsTrigger value="plano" className="gap-2"><CreditCard className="w-4 h-4" /> Plano</TabsTrigger>
            </TabsList>

            {/* --- ABA PERFIL --- */}
            <TabsContent value="perfil">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                
                {/* Card de Dados Pessoais */}
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
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <div className="w-24 h-24 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-md">
                          {profileData.avatarBase64 ? (
                            <img src={profileData.avatarBase64} alt="Perfil" className="w-full h-full object-cover" />
                          ) : (
                            userEmail.charAt(0).toUpperCase() || "U"
                          )}
                        </div>
                        
                        {/* Input de arquivo escondido, acionado pelo botão */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        
                        {isEditingProfile && (
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors z-10"
                            title="Alterar foto"
                          >
                            <Camera className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Foto do perfil</p>
                        <p className="text-sm text-muted-foreground">
                          {isEditingProfile ? "Clique na câmera para alterar. JPG ou PNG." : "Sua foto visível para outros usuários."}
                        </p>
                      </div>
                    </div>

                    {/* Formulário de Dados */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome completo</Label>
                        <Input 
                          id="nome" 
                          value={profileData.nome}
                          onChange={(e) => setProfileData(prev => ({ ...prev, nome: e.target.value }))}
                          disabled={!isEditingProfile}
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed border-none shadow-none" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail (Login)</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditingProfile} // Email geralmente não se edita fácil, mas mantive a lógica
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed border-none shadow-none" : ""}
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
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed border-none shadow-none" : ""}
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
                          className={!isEditingProfile ? "bg-muted cursor-not-allowed border-none shadow-none" : ""}
                        />
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
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
                          className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                          Cancelar (Descartar)
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Card de Ativação de Embaixadora (Só aparece se NÃO for embaixadora) */}
                {!userRoles.includes("EMBAIXADOR") && (
                    <Card className="border-purple-200 bg-purple-50/50">
                        <CardHeader>
                            <CardTitle className="text-purple-800 flex items-center gap-2">
                                <Crown className="w-5 h-5" /> Torne-se uma Embaixadora
                            </CardTitle>
                            <CardDescription className="text-purple-600">
                                Ganhe comissões indicando o Safe You para outras mulheres.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-purple-700 mb-4">
                                Ative sua conta de embaixadora gratuitamente. Você terá acesso a um painel exclusivo para acompanhar suas vendas e comissões.
                            </p>
                            <Dialog open={isAmbassadorModalOpen} onOpenChange={setIsAmbassadorModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                                        Ativar Conta Embaixadora
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Ativar Conta Embaixadora</DialogTitle>
                                        <DialogDescription>Configure seus dados para recebimento.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Sua Chave Pix (Para receber)</Label>
                                            <Input 
                                                placeholder="CPF, Email ou Aleatória" 
                                                value={ambassadorPix}
                                                onChange={(e) => setAmbassadorPix(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Crie seu código de indicação (Opcional)</Label>
                                            <Input 
                                                placeholder="Ex: MARIA10" 
                                                value={ambassadorReferral}
                                                onChange={(e) => setAmbassadorReferral(e.target.value.toUpperCase())}
                                            />
                                            <p className="text-xs text-muted-foreground">Se deixar em branco, geraremos um automático.</p>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleActivateAmbassador} className="bg-purple-600 text-white">Confirmar Ativação</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                )}

                {/* Appearance Card */}
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

            {/* --- ABA NOTIFICAÇÕES --- */}
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
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5 text-primary" /></div>
                        <div><p className="font-medium">E-mail</p><p className="text-sm text-muted-foreground">Receber notificações por e-mail</p></div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Bell className="w-5 h-5 text-primary" /></div>
                        <div><p className="font-medium">Push</p><p className="text-sm text-muted-foreground">Notificações no navegador</p></div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Smartphone className="w-5 h-5 text-primary" /></div>
                        <div><p className="font-medium">SMS</p><p className="text-sm text-muted-foreground">Alertas urgentes por SMS</p></div>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* --- ABA SEGURANÇA (FUNCIONAL) --- */}
            <TabsContent value="seguranca">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                
                {/* Alterar Senha */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Esta senha será usada para todos os seus perfis (Cliente, Embaixadora, Admin).</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha atual</Label>
                      <Input 
                        id="senha-atual" 
                        type="password" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nova-senha">Nova senha</Label>
                      <Input 
                        id="nova-senha" 
                        type="password" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                      <Input 
                        id="confirmar-senha" 
                        type="password" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                      />
                    </div>
                    <Button className="gap-2" onClick={handleChangePassword}>
                      <Lock className="w-4 h-4" /> Alterar senha
                    </Button>
                  </CardContent>
                </Card>

                {/* 2FA */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Autenticação em Duas Etapas</CardTitle>
                    <CardDescription>Adicione uma camada extra de segurança à sua conta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${twoFactorEnabled ? 'bg-safe-green/10' : 'bg-muted'}`}>
                          <Shield className={`w-5 h-5 ${twoFactorEnabled ? 'text-safe-green' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Google Authenticator</p>
                          <p className="text-sm text-muted-foreground">
                            {twoFactorEnabled ? "Proteção Ativa" : "Desativado"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
                    </div>
                  </CardContent>
                </Card>

                {/* Zona de Perigo */}
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                    <CardDescription>Ações irreversíveis da conta.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="gap-2 text-destructive border-destructive/50 hover:bg-destructive/10" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" /> Sair da conta
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* --- ABA PLANO --- */}
            <TabsContent value="plano">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card className="border-primary/20 bg-gradient-to-r from-rose-soft/5 to-lavender/5">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Seu Plano Atual</CardTitle>
                        <CardDescription>Você está no plano gratuito</CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">Gratuito</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Faça upgrade para desbloquear mais consultas.</p>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Planos Disponíveis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Consulta Avulsa */}
                    <Card className="border-border/50 hover:border-lavender/30 transition-all hover:shadow-md relative">
                      <CardHeader className="text-center pb-2">
                        <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center bg-secondary"><Sparkles className="w-5 h-5 text-foreground" /></div>
                        <CardTitle className="text-base">Consulta Avulsa</CardTitle>
                        <CardDescription className="text-xs">Para checagens pontuais</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center">
                          <div className="flex items-baseline justify-center gap-1"><span className="text-xs text-muted-foreground">R$</span><span className="text-3xl font-bold">19</span></div>
                          <span className="text-xs text-muted-foreground">por verificação</span>
                        </div>
                        <ul className="space-y-1.5">
                          {["1 verificação completa", "Todos os tribunais", "Resultado em segundos"].map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs"><Check className="w-3 h-3 text-turquoise flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{f}</span></li>
                          ))}
                        </ul>
                        <Button variant="outline" className="w-full" size="sm" onClick={() => openCheckout("Consulta Avulsa", "19")}>Fazer Consulta</Button>
                      </CardContent>
                    </Card>

                    {/* Mensal */}
                    <Card className="border-rose-soft/50 shadow-lg relative md:scale-[1.02]">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-soft to-lavender text-white text-[10px] font-medium"><Star className="w-2.5 h-2.5" /> Mais Popular</div>
                      </div>
                      <CardHeader className="text-center pb-2 pt-5">
                        <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-rose-soft to-lavender"><Heart className="w-5 h-5 text-white" /></div>
                        <CardTitle className="text-base">Plano Mensal</CardTitle>
                        <CardDescription className="text-xs">Proteção contínua</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground line-through">R$ 39</div>
                          <div className="flex items-baseline justify-center gap-1"><span className="text-xs text-muted-foreground">R$</span><span className="text-3xl font-bold">29</span></div>
                          <span className="text-xs text-muted-foreground">por mês</span>
                        </div>
                        <ul className="space-y-1.5">
                          {["5 verificações/mês", "Alertas de segurança", "Histórico de consultas"].map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs"><Check className="w-3 h-3 text-rose-soft flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{f}</span></li>
                          ))}
                        </ul>
                        <Button className="w-full bg-gradient-to-r from-rose-soft to-lavender text-white hover:opacity-90" size="sm" onClick={() => openCheckout("Plano Mensal", "29")}>Assinar Agora</Button>
                      </CardContent>
                    </Card>

                    {/* Família */}
                    <Card className="border-border/50 hover:border-lavender/30 transition-all hover:shadow-md relative">
                      <CardHeader className="text-center pb-2">
                        <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center bg-secondary"><Crown className="w-5 h-5 text-foreground" /></div>
                        <CardTitle className="text-base">Plano Família</CardTitle>
                        <CardDescription className="text-xs">Para toda a família</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground line-through">R$ 69</div>
                          <div className="flex items-baseline justify-center gap-1"><span className="text-xs text-muted-foreground">R$</span><span className="text-3xl font-bold">49</span></div>
                          <span className="text-xs text-muted-foreground">por mês</span>
                        </div>
                        <ul className="space-y-1.5">
                          {["15 verificações/mês", "Múltiplos usuários", "Suporte prioritário"].map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs"><Check className="w-3 h-3 text-turquoise flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">{f}</span></li>
                          ))}
                        </ul>
                        <Button variant="default" className="w-full" size="sm" onClick={() => openCheckout("Plano Família", "49")}>Proteger Família</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* MODAL 2FA SETUP */}
      <Dialog open={is2FAModalOpen} onOpenChange={(open) => { if(!open) setIs2FAModalOpen(false); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configurar 2FA</DialogTitle>
            <DialogDescription>Escaneie o QR Code abaixo com seu app autenticador.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            {qrCodeImage && (
              <div className="p-4 bg-white rounded-xl shadow-sm border border-border/50">
                <img src={qrCodeImage} alt="QR Code 2FA" className="w-48 h-48 object-contain" />
              </div>
            )}
            <div className="w-full space-y-2">
              <Label className="text-xs text-center block text-muted-foreground">Não consegue escanear? Copie o código:</Label>
              <div className="flex items-center gap-2">
                <Input readOnly value={secretCode} className="font-mono text-center text-xs bg-muted/50" />
                <Button variant="outline" size="icon" onClick={copySecretToClipboard}><Copy className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="code" className="text-center block">Código de verificação</Label>
              <Input 
                id="code" placeholder="000 000" className="text-center text-xl tracking-[0.5em]" maxLength={6} 
                value={verificationCode} onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIs2FAModalOpen(false)}>Cancelar</Button>
            <Button onClick={activate2FA} className="bg-gradient-to-r from-rose-soft to-lavender text-white" disabled={verificationCode.length !== 6}>Ativar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL CHECKOUT */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
            <DialogDescription>Você está adquirindo: <strong>{selectedPlan?.name}</strong></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="referral">Código da Embaixadora (Opcional)</Label>
              <Input id="referral" placeholder="Ex: MARIA10" value={referralCode} onChange={(e) => setReferralCode(e.target.value.toUpperCase())} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon">Cupom de Desconto</Label>
              <Input id="coupon" placeholder="Ex: PROMO20" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
            </div>
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">Total a pagar:</span>
              <span className="text-xl font-bold text-primary">R$ {selectedPlan?.price}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Cancelar</Button>
            <Button onClick={handleAsaasRedirect} className="bg-gradient-to-r from-rose-soft to-lavender text-white">Ir para Pagamento (Asaas)</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configuracoes;