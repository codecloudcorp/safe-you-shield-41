import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Settings, User, Bell, Shield, Lock, Wallet, Camera, Moon, Sun, Smartphone, Mail, Copy, ArrowLeft, Crown
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/services/api";
import { useNotifications } from "@/hooks/useNotifications";

// Interface para Tipagem
interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  avatarBase64?: string;
}

const EmbaixadoraConfiguracoes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- Estados do Perfil ---
  const [loadingData, setLoadingData] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({ 
    nome: "", email: "", telefone: "", nascimento: "", avatarBase64: "" 
  });
  
  // --- Estados Financeiros ---
  const [financialData, setFinancialData] = useState({ chavePix: "", codigoAfiliado: "" });
  const [isEditingFinance, setIsEditingFinance] = useState(false);

  // --- Estados Senha ---
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  // --- 2FA States ---
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  
  const { isSupported, permission, requestPermission, fcmToken } = useNotifications();

  const [activeTab, setActiveTab] = useState("financeiro");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  useEffect(() => {
    if (permission === 'granted' && fcmToken) {
      setPushNotifications(true);
    } else if (permission === 'denied') {
      setPushNotifications(false);
    }
  }, [permission, fcmToken]);

  const handlePushNotificationToggle = async (checked: boolean) => {
    if (checked) {
      const granted = await requestPermission();
      if (granted) {
        setPushNotifications(true);
      } else {
        setPushNotifications(false);
      }
    } else {
      setPushNotifications(false);
      toast.info("Notificações push desativadas");
    }
  };

  // Efeito para aplicar o Modo Escuro Real
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Carrega os dados ao entrar na tela
  useEffect(() => {
    const fetchData = async () => {
        try {
            // 1. Pega dados do usuário
            const userRes = await api.get("/users/me");
            const userData = userRes.data || {};
            const email = userData.email || "";
            const roles = Array.isArray(userData.roles) ? userData.roles : [];
            
            setTwoFactorEnabled(userData.isTwoFactorEnabled || false);
            
            setProfileData({
                nome: userData.nome || "",
                email: email,
                telefone: userData.telefone || "",
                nascimento: userData.nascimento || "",
                avatarBase64: userData.fotoBase64 || "" 
            });

            // 2. Busca dados financeiros (tenta buscar mesmo se não tiver a role no front, para garantir)
            try {
                const embRes = await api.get("/embaixador/dashboard"); 
                const embData = embRes.data || {};
                
                setFinancialData({
                    chavePix: embData.chavePix || "",
                    codigoAfiliado: embData.codigoAfiliado || ""
                });
            } catch (err) {
                console.log("Dados de embaixadora não encontrados ou acesso restrito.");
            }
            
            setLoadingData(false);

        } catch (e: any) {
            console.error(e);
            if (e.response?.status === 403) {
                toast.error("Sessão expirada.");
                navigate("/login");
            } else {
                toast.error("Erro ao carregar dados.");
            }
            setLoadingData(false);
        }
    };
    fetchData();

    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [navigate, searchParams]);

  // --- ATUALIZAR DADOS FINANCEIROS ---
  const handleSaveFinance = async () => {
      if (!financialData.chavePix.trim() || !financialData.codigoAfiliado.trim()) {
          toast.warning("A Chave Pix e o Código de Indicação são obrigatórios.");
          return;
      }

      try {
          await api.put("/embaixador/config", {
              chavePix: financialData.chavePix,
              codigoAfiliado: financialData.codigoAfiliado.toUpperCase()
          });
          
          setIsEditingFinance(false);
          toast.success("Dados financeiros atualizados com sucesso!");
      } catch (e: any) { 
          console.error(e);
          const msg = e.response?.data?.message || "Erro ao atualizar dados. O código pode já estar em uso.";
          toast.error(msg);
      }
  };

  const handleSaveProfile = async () => {
      try {
          const payload: any = {
              nome: profileData.nome,
              telefone: profileData.telefone
          };
          if (profileData.nascimento) payload.nascimento = profileData.nascimento;
          if (profileData.avatarBase64) payload.fotoBase64 = profileData.avatarBase64;

          await api.put("/users/me", payload);
          setIsEditingProfile(false);
          toast.success("Perfil atualizado com sucesso!");
      } catch (e: any) { 
          const msg = e.response?.data?.message || "Erro ao salvar perfil.";
          toast.error(msg); 
      }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setProfileData(prev => ({ ...prev, avatarBase64: reader.result as string }));
          reader.readAsDataURL(file);
      }
  };

  const handleChangePassword = async () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
          toast.error("Senhas não conferem.");
          return;
      }
      try {
          await api.post("/users/me/password", passwordData);
          toast.success("Senha alterada.");
          setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } catch (e: any) { 
          const msg = e.response?.data?.message || "Erro ao alterar senha.";
          toast.error(msg); 
      }
  };

  // Funções 2FA
  const handleToggle2FA = async (checked: boolean) => {
    if (checked) {
      try {
        const response = await api.post("/auth/2fa/setup");
        setQrCodeImage(response.data.qrCode);
        setSecretCode(response.data.secret);
        setIs2FAModalOpen(true);
      } catch (error) { toast.error("Erro ao configurar 2FA."); }
    } else {
      try {
        await api.post("/auth/2fa/disable");
        setTwoFactorEnabled(false);
        toast.success("2FA desativado.");
      } catch (error) { toast.error("Erro ao desativar."); }
    }
  };

  const activate2FA = async () => {
    try {
      await api.post("/auth/2fa/activate", { code: verificationCode });
      setTwoFactorEnabled(true);
      setIs2FAModalOpen(false);
      setVerificationCode("");
      toast.success("2FA ativado!");
    } catch (error) { toast.error("Código incorreto."); }
  };
  
  const copySecretToClipboard = () => {
    navigator.clipboard.writeText(secretCode);
    toast.success("Copiado!");
  };

  const getInitial = () => profileData.nome ? profileData.nome.charAt(0).toUpperCase() : "U";

  if (loadingData) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10 transition-colors duration-300 dark:bg-gray-900">
      
      <header className="bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/embaixadora")}>
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <ArrowLeft className="h-5 w-5 text-purple-700 dark:text-purple-300" />
            </div>
            <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">Configurações</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Voltar para o Painel da Embaixadora</p>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-8 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 border p-1 w-full md:w-auto flex flex-wrap justify-start h-auto gap-2">
              <TabsTrigger value="financeiro" className="gap-2 px-6 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-300">
                <Wallet className="w-4 h-4" /> Financeiro & Indicação
              </TabsTrigger>
              <TabsTrigger value="perfil" className="gap-2 px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-300">
                <User className="w-4 h-4" /> Perfil
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="gap-2 px-6 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/20 dark:data-[state=active]:text-green-300">
                <Shield className="w-4 h-4" /> Segurança
              </TabsTrigger>
               <TabsTrigger value="notificacoes" className="gap-2 px-6 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-200">
                <Bell className="w-4 h-4" /> Notificações
              </TabsTrigger>
            </TabsList>

            {/* === ABA FINANCEIRO (Agora mostra apenas a parte de editar) === */}
            <TabsContent value="financeiro">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="border-purple-100 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader className="border-b border-purple-50 bg-purple-50/30 dark:bg-purple-900/10 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-purple-900 dark:text-purple-300 flex items-center gap-2">
                                        <Crown className="w-5 h-5" /> Dados de Recebimento
                                    </CardTitle>
                                    <CardDescription className="dark:text-gray-400">Configure onde você recebe suas comissões.</CardDescription>
                                </div>
                                {!isEditingFinance && (
                                    <Button variant="outline" size="sm" onClick={() => setIsEditingFinance(true)} className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/30">
                                        <Settings className="w-4 h-4 mr-2"/> Editar
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">Chave Pix</Label>
                                    <Input 
                                        value={financialData.chavePix} 
                                        disabled={!isEditingFinance} 
                                        onChange={e => setFinancialData({...financialData, chavePix: e.target.value})} 
                                        placeholder="CPF, Email ou Aleatória"
                                        className="border-purple-200 focus:border-purple-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Para onde enviaremos seus pagamentos.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">Código de Indicação</Label>
                                    <Input 
                                        value={financialData.codigoAfiliado} 
                                        disabled={!isEditingFinance} 
                                        onChange={e => setFinancialData({...financialData, codigoAfiliado: e.target.value.toUpperCase()})} 
                                        placeholder="SEUNOME10"
                                        className="font-bold tracking-wide uppercase border-purple-200 focus:border-purple-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Usado no final do seu link de convite.</p>
                                </div>
                            </div>
                            {isEditingFinance && (
                                <div className="flex gap-3 justify-end pt-4 border-t border-dashed dark:border-gray-700">
                                    <Button variant="outline" onClick={() => setIsEditingFinance(false)} className="dark:bg-gray-700 dark:text-white">Cancelar</Button>
                                    <Button onClick={handleSaveFinance} className="bg-purple-600 hover:bg-purple-700 text-white">Salvar Alterações</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </TabsContent>

            {/* === ABA PERFIL === */}
            <TabsContent value="perfil">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <CardTitle className="dark:text-white">Informações Pessoais</CardTitle>
                                {!isEditingProfile && (
                                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)} className="dark:bg-gray-700 dark:text-white">
                                        <Settings className="w-4 h-4 mr-2"/> Editar
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative group">
                                    <div className="w-28 h-28 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center text-purple-700 text-4xl font-bold overflow-hidden border-4 border-white shadow-lg">
                                        {profileData.avatarBase64 ? (
                                            <img src={profileData.avatarBase64} className="w-full h-full object-cover" alt="Perfil" />
                                        ) : (
                                            getInitial()
                                        )}
                                    </div>
                                    {isEditingProfile && (
                                        <button 
                                            onClick={() => fileInputRef.current?.click()} 
                                            className="absolute bottom-0 right-0 bg-purple-600 text-white p-2.5 rounded-full hover:bg-purple-700 transition-all shadow-md hover:scale-105"
                                        >
                                            <Camera className="w-4 h-4"/>
                                        </button>
                                    )}
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Sua Foto de Perfil</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">Essa foto será visível no seu painel.</p>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">Nome Completo</Label>
                                    <Input value={profileData.nome} disabled={!isEditingProfile} onChange={e => setProfileData({...profileData, nome: e.target.value})} className="dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">E-mail</Label>
                                    <Input value={profileData.email} disabled className="bg-gray-100/50 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">Telefone</Label>
                                    <Input value={profileData.telefone} disabled={!isEditingProfile} onChange={e => setProfileData({...profileData, telefone: e.target.value})} className="dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">Data de Nascimento</Label>
                                    <Input type="date" value={profileData.nascimento} disabled={!isEditingProfile} onChange={e => setProfileData({...profileData, nascimento: e.target.value})} className="dark:bg-gray-700 dark:text-white" />
                                </div>
                            </div>

                            {isEditingProfile && (
                                <div className="flex gap-3 justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <Button variant="ghost" onClick={() => setIsEditingProfile(false)} className="dark:text-gray-300">Cancelar</Button>
                                    <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700 text-white">Salvar Alterações</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Appearance */}
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-base dark:text-white">Aparência do Sistema</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        {darkMode ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Modo Escuro</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Alternar entre tema claro e escuro</p>
                                    </div>
                                </div>
                                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </TabsContent>

            {/* === ABA SEGURANÇA === */}
            <TabsContent value="seguranca">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader className="border-b border-gray-100 bg-gray-50/30 dark:bg-gray-700/50 dark:border-gray-700">
                            <CardTitle className="dark:text-white">Credenciais de Acesso</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="grid gap-4 max-w-lg">
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">Senha Atual</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input type="password" className="pl-9 dark:bg-gray-700 dark:text-white" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">Nova Senha</Label>
                                    <Input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} className="dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-300">Confirmar Nova Senha</Label>
                                    <Input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="dark:bg-gray-700 dark:text-white" />
                                </div>
                                <Button onClick={handleChangePassword} className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
                                    Atualizar Senha
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Autenticação de Dois Fatores (2FA)</CardTitle>
                            <CardDescription className="dark:text-gray-400">Adicione uma camada extra de proteção via Google Authenticator.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${twoFactorEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Proteção {twoFactorEnabled ? "Ativa" : "Inativa"}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Recomendamos ativar para maior segurança.</p>
                                </div>
                            </div>
                            <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
                        </CardContent>
                    </Card>
                </motion.div>
            </TabsContent>

            {/* === ABA NOTIFICAÇÕES === */}
            <TabsContent value="notificacoes">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                        <CardHeader>
                            <CardTitle className="dark:text-white">Preferências de Notificação</CardTitle>
                            <CardDescription className="dark:text-gray-400">Escolha como deseja receber suas notificações</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5 text-primary" /></div>
                                    <div><p className="font-medium dark:text-white">E-mail</p><p className="text-sm text-muted-foreground dark:text-gray-400">Receber notificações por e-mail</p></div>
                                </div>
                                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Bell className="w-5 h-5 text-primary" /></div>
                                    <div>
                                        <p className="font-medium dark:text-white">Push</p>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                                            {!isSupported 
                                              ? "Navegador não suporta notificações push"
                                              : permission === 'granted' && fcmToken
                                              ? "Notificações ativas"
                                              : permission === 'denied'
                                              ? "Permissão negada - ative nas configurações do navegador"
                                              : "Notificações no navegador"}
                                        </p>
                                    </div>
                                </div>
                                <Switch 
                                    checked={pushNotifications && isSupported && permission === 'granted'} 
                                    onCheckedChange={handlePushNotificationToggle}
                                    disabled={!isSupported}
                                />
                            </div>
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Smartphone className="w-5 h-5 text-primary" /></div>
                                    <div><p className="font-medium dark:text-white">SMS</p><p className="text-sm text-muted-foreground dark:text-gray-400">Alertas urgentes por SMS</p></div>
                                </div>
                                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </TabsContent>

        </Tabs>
      </main>

      {/* Modal 2FA */}
      <Dialog open={is2FAModalOpen} onOpenChange={(open) => { if(!open) setIs2FAModalOpen(false); }}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Configurar Google Authenticator</DialogTitle>
            <DialogDescription className="dark:text-gray-400">Escaneie o QR Code abaixo com seu aplicativo.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-6 py-4">
            {qrCodeImage && (
                <div className="p-4 bg-white border rounded-lg shadow-sm">
                    <img src={qrCodeImage} alt="QR Code" className="w-40 h-40 object-contain" />
                </div>
            )}
            <div className="w-full space-y-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-center">
                <Label className="text-xs text-gray-500 dark:text-gray-300 block mb-1">Código Manual (se não conseguir escanear)</Label>
                <div className="flex items-center justify-center gap-2 font-mono font-bold text-sm dark:text-white">
                    {secretCode}
                    <Copy className="w-3 h-3 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400" onClick={copySecretToClipboard} />
                </div>
            </div>
            <div className="w-full space-y-2">
              <Label className="text-center block dark:text-gray-300">Digite o código de 6 dígitos gerado</Label>
              <Input 
                className="text-center text-2xl tracking-[0.5em] h-12 font-mono dark:bg-gray-700 dark:text-white" 
                maxLength={6} 
                placeholder="000000"
                value={verificationCode} 
                onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={activate2FA} className="bg-purple-600 hover:bg-purple-700 text-white w-full" disabled={verificationCode.length !== 6}>
                Verificar e Ativar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default EmbaixadoraConfiguracoes;