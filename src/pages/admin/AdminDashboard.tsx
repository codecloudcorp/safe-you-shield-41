import { useState, useEffect } from "react";
import { 
  Users, Activity, DollarSign, ShieldAlert, Search, 
  MoreHorizontal, Edit, Trash2, Plus, LogOut, Save, CreditCard, Clock, Tag, Ticket, UserCircle, Key, QrCode, CheckCircle2, Copy
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Switch } from "@/components/ui/switch"; 
import { useNavigate } from "react-router-dom";
import api from "@/services/api"; 
// import { toast } from "sonner"; // Descomente se estiver usando sonner

// --- INTERFACES ---
interface UserData {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  whatsapp: string;
  password?: string;
  confirmPassword?: string;
  roles: ("ADMIN" | "EMBAIXADOR" | "USER")[]; 
  pix?: string;
  referralCode?: string;
  planType: "AVULSO" | "ANUAL";
  creditsToAdd: number;
  durationValue: number;
  durationUnit: "DAYS" | "MONTHS" | "YEARS" | "LIFETIME";
  status: "ACTIVE" | "EXPIRED" | "BANNED";
  // Campos de visualização vindos do backend
  planExpiresAt?: string; 
  expires?: string; 
  credits?: number;
}

interface CouponData {
    id: number;
    code: string;
    discount: number;
    validUntil: string;
    maxUses: number | null;
    usedCount: number;
    status: "ACTIVE" | "EXPIRED";
}

interface AuditLogData {
    id: number;
    admin: string;
    action: string;
    target: string;
    details: string;
    time: string;
}

interface DashboardMetrics {
    onlineUsers: number;
    monthlyRevenue: number;
    latency: string;
}

const initialFormState: UserData = {
  name: "",
  email: "",
  cpf: "",
  whatsapp: "",
  password: "",
  confirmPassword: "",
  roles: ["USER"], 
  pix: "",
  referralCode: "",
  planType: "AVULSO",
  creditsToAdd: 2, // Padrão: 2 créditos (Avulso)
  durationValue: 1,
  durationUnit: "MONTHS",
  status: "ACTIVE"
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [users, setUsers] = useState<UserData[]>([]);
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogData[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({ onlineUsers: 0, monthlyRevenue: 0, latency: "..." });
  
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: 0, validUntil: "", maxUses: "" });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"CREATE" | "EDIT">("CREATE");
  const [formData, setFormData] = useState<UserData>(initialFormState);

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
      name: "",
      email: "",
      cpf: "", 
      whatsapp: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      is2FAEnabled: false
  });

  // 2FA Setup State
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [secret, setSecret] = useState("");

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
        const profileRes = await api.get('/users/profile');
        setAdminProfile(prev => ({
            ...prev,
            name: profileRes.data.name,
            email: profileRes.data.email,
            cpf: profileRes.data.cpf || "",         
            whatsapp: profileRes.data.whatsapp || "", 
            // Garante booleano e verifica diferentes formatos vindos do Java
            is2FAEnabled: !!(profileRes.data.is2faEnabled || profileRes.data.is2FAEnabled)
        }));

        const usersRes = await api.get('/admin/users');
        setUsers(usersRes.data);

        const couponsRes = await api.get('/admin/coupons');
        setCoupons(couponsRes.data);

        const auditRes = await api.get('/admin/audit');
        setAuditLogs(auditRes.data);

        const metricsRes = await api.get('/admin/metrics');
        setMetrics(metricsRes.data);

    } catch (error: any) {
        console.error("Erro ao carregar dados:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            alert("Sessão expirada ou sem permissão. Faça login novamente.");
            localStorage.clear(); 
            navigate('/login');
        }
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  // --- HANDLERS ---
  const handleOpenCreate = () => {
    setSheetMode("CREATE");
    setFormData(initialFormState);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (user: UserData) => {
    setSheetMode("EDIT");
    setFormData({
      ...initialFormState,
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      cpf: user.cpf || "",
      whatsapp: user.whatsapp || "",
      password: "", 
      confirmPassword: "",
      planType: user.planType || "AVULSO",
      creditsToAdd: 0, // Resetamos para 0 ao abrir
      durationValue: 1, 
      durationUnit: "MONTHS",
      pix: user.pix || "",
      referralCode: user.referralCode || ""
    });
    setIsSheetOpen(true);
  };

  const toggleRole = (role: "ADMIN" | "EMBAIXADOR" | "USER") => {
    setFormData(prev => {
        const roles = prev.roles.includes(role)
            ? prev.roles.filter(r => r !== role) 
            : [...prev.roles, role];
        return { ...prev, roles: roles.length > 0 ? roles : ["USER"] };
    });
  };

  // --- AÇÃO DE SALVAR ---
  const handleSave = async () => {
    try {
      if (sheetMode === "CREATE") {
        await api.post("/admin/users", formData);
        alert("Usuário criado com sucesso!");
      } else {
        const payload = {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
            whatsapp: formData.whatsapp,
            roles: formData.roles,
            planType: formData.planType,
            creditsToAdd: formData.creditsToAdd,
            durationValue: formData.durationValue,
            durationUnit: formData.durationUnit,
            ...(formData.password ? { password: formData.password } : {})
        };

        await api.put(`/admin/users/${formData.id}`, payload);
        alert("Usuário atualizado com sucesso!");
      }
      setIsSheetOpen(false);
      fetchData(); 
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
      alert("Erro ao salvar usuário. Verifique os dados.");
    }
  };

  const handleDelete = async (userId: string) => {
    if (confirm("Tem certeza que deseja banir/remover este usuário?")) {
        try {
            await api.delete(`/admin/users/${userId}`);
            fetchData();
            alert("Usuário removido.");
        } catch (error) {
            console.error("Erro ao deletar", error);
            alert("Erro ao remover usuário.");
        }
    }
  }

  // --- LÓGICA DE 2FA (CORRIGIDA) ---
  const handleToggle2FA = async (checked: boolean) => {
      if (checked) {
          // ATIVAR 2FA
          try {
              // Endpoint corrigido: /api/2fa/setup
              const res = await api.post("/api/2fa/setup"); 
              
              // Verificação robusta para evitar erro de undefined
              const data = res.data;
              const rawImage = data?.qrCode || data?.qrCodeImage; 
              
              if (rawImage && typeof rawImage === 'string') {
                  const imageUrl = rawImage.startsWith('data:') ? rawImage : `data:image/png;base64,${rawImage}`;
                  setQrCodeUrl(imageUrl); 
                  setSecret(data.secret); 
                  setIs2FADialogOpen(true);
              } else {
                  console.error("QR Code inválido:", data);
                  alert("Erro: O servidor não retornou um QR Code válido.");
              }
          } catch (error: any) {
              console.error("Erro ao iniciar setup 2FA", error);
              if (error.response?.status === 403) {
                  alert("Erro 403: Acesso negado. Verifique se o backend (SecurityConfig) permite acesso a /api/2fa/**.");
              } else {
                  alert("Erro ao gerar QR Code. Verifique o servidor.");
              }
          }
      } else {
          // DESATIVAR 2FA
          if(confirm("Tem certeza que deseja desativar a segurança em duas etapas?")) {
              try {
                  await api.put("/users/profile", { 
                      ...adminProfile, 
                      is2FAEnabled: false 
                  });
                  setAdminProfile(prev => ({ ...prev, is2FAEnabled: false }));
                  alert("2FA Desativado.");
              } catch (error) {
                  alert("Erro ao desativar 2FA");
              }
          }
      }
  };

  const handleVerify2FA = async () => {
      try {
          // Endpoint corrigido: /api/2fa/activate
          await api.post("/api/2fa/activate", {
              code: twoFactorCode
          });
          
          setAdminProfile(prev => ({ ...prev, is2FAEnabled: true }));
          setIs2FADialogOpen(false);
          setTwoFactorCode("");
          alert("Autenticação de Dois Fatores ativada com sucesso!");
      } catch (error: any) {
          console.error("Erro validação 2FA", error);
          if (error.response?.status === 403) {
             alert("Erro 403: Código inválido ou endpoint bloqueado no backend.");
          } else {
             alert("Erro ao ativar 2FA. Tente novamente.");
          }
      }
  };

  const copySecretToClipboard = () => {
      navigator.clipboard.writeText(secret);
      alert("Chave copiada para a área de transferência!");
  };

  const handleCreateCoupon = async () => {
      if (!newCoupon.code || newCoupon.discount <= 0 || !newCoupon.validUntil) {
          alert("Preencha os campos obrigatórios do cupom.");
          return;
      }
      
      const couponPayload = {
          code: newCoupon.code.toUpperCase(),
          discount: newCoupon.discount,
          validUntil: newCoupon.validUntil,
          maxUses: newCoupon.maxUses ? parseInt(newCoupon.maxUses.toString()) : null,
      };

      try {
          await api.post("/admin/coupons", couponPayload);
          fetchData();
          setNewCoupon({ code: "", discount: 0, validUntil: "", maxUses: "" });
          alert("Cupom criado com sucesso!");
      } catch (error) {
          console.error("Erro ao criar cupom", error);
          alert("Erro ao criar cupom.");
      }
  };

  const handleDeleteCoupon = async (id: number) => {
      if(confirm("Deseja remover este cupom?")) {
          try {
            await api.delete(`/admin/coupons/${id}`);
            fetchData();
          } catch (error) {
            console.error("Erro ao deletar cupom", error);
          }
      }
  };

  const handleSaveProfile = async () => {
      try {
          await api.put("/users/profile", {
              name: adminProfile.name,
              email: adminProfile.email,
              cpf: adminProfile.cpf,
              whatsapp: adminProfile.whatsapp
          });
          
          if (adminProfile.newPassword && adminProfile.newPassword === adminProfile.confirmNewPassword) {
              await api.post("/users/me/password", {
                  currentPassword: adminProfile.currentPassword,
                  newPassword: adminProfile.newPassword
              });
          }
          
          alert("Perfil atualizado com sucesso!");
          setAdminProfile({...adminProfile, currentPassword: "", newPassword: "", confirmNewPassword: ""});
      } catch (error) {
          console.error("Erro ao atualizar perfil", error);
          alert("Erro ao atualizar perfil.");
      }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="text-purple-500" />
            Admin Safe
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <Activity className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <Users className="mr-2 h-4 w-4" /> Usuários
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <DollarSign className="mr-2 h-4 w-4" /> Financeiro
          </Button>
        </nav>
        <div className="p-4 bg-slate-950">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-purple-600 border border-purple-400">
                <AvatarFallback>JO</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{adminProfile.name || "Admin"}</p>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-slate-800">Painel de Controle</h2>

        {/* MÉTRICAS */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <MetricCard 
            title="Usuários Online" 
            value={metrics.onlineUsers.toString()} 
            icon={Activity} 
            sub="Ativos recentemente" 
          />
          <MetricCard 
            title="Faturamento Mensal" 
            value={metrics.monthlyRevenue 
                ? metrics.monthlyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                : 'R$ 0,00'} 
            icon={DollarSign} 
            sub="Total confirmado este mês" 
          />
          <MetricCard 
            title="Latência API" 
            value={metrics.latency || "..."} 
            icon={ShieldAlert} 
            sub="Saudável" 
            color="text-green-500" 
          />
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white border">
            <TabsTrigger value="users">Gestão de Usuários</TabsTrigger>
            <TabsTrigger value="coupons">Cupons</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
            <TabsTrigger value="audit">Auditoria</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Base de Usuários</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar usuário..." className="pl-8 w-[250px]" />
                  </div>
                  <Button className="bg-purple-600" onClick={handleOpenCreate}>
                    <Plus className="h-4 w-4 mr-2"/> Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Funções</TableHead>
                      <TableHead>Status Plano</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            {user.name}<br/>
                            <span className="text-xs text-gray-500">{user.email}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {user.roles && user.roles.map((role: string) => (
                                <Badge key={role} variant={role === 'EMBAIXADOR' ? "secondary" : role === 'ADMIN' ? "destructive" : "outline"} 
                                    className={role === 'EMBAIXADOR' ? "bg-purple-100 text-purple-700" : role === 'ADMIN' ? "bg-red-100 text-red-700" : ""}>
                                    {role}
                                </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant={user.status === 'ACTIVE' ? "default" : "destructive"} 
                                   className={user.status === 'ACTIVE' ? "bg-green-500 w-fit" : "w-fit"}>
                                {user.planType || "SEM PLANO"}
                            </Badge>
                            {user.credits !== undefined && user.credits !== null && (
                                <span className="text-xs text-muted-foreground font-semibold">
                                    {user.credits} créditos
                                </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                            {user.planExpiresAt || user.expires
                                ? new Date(user.planExpiresAt || user.expires!).toLocaleDateString('pt-BR') 
                                : <span className="text-muted-foreground">-</span>
                            }
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleOpenEdit(user)}>
                                <Edit className="mr-2 h-4 w-4" /> Editar & Plano
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => user.id && handleDelete(user.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Banir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABA CUPONS */}
          <TabsContent value="coupons">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Criar Novo Cupom</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Código</Label>
                                <Input 
                                    placeholder="PROMO2026" 
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Desconto (%)</Label>
                                <Input 
                                    type="number" 
                                    placeholder="10" 
                                    value={newCoupon.discount || ''}
                                    onChange={(e) => setNewCoupon({...newCoupon, discount: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Validade</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <Input 
                                        className="pl-9" 
                                        type="date" 
                                        value={newCoupon.validUntil}
                                        onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Qtd. Disponível</Label>
                                <div className="relative">
                                    <Ticket className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <Input 
                                        className="pl-9"
                                        type="number" 
                                        placeholder="Ex: 100" 
                                        value={newCoupon.maxUses}
                                        onChange={(e) => setNewCoupon({...newCoupon, maxUses: e.target.value})}
                                    />
                                </div>
                                <p className="text-[10px] text-muted-foreground">Deixe vazio para ilimitado</p>
                            </div>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleCreateCoupon}>
                            <Plus className="w-4 h-4 mr-2"/> Criar Cupom
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Cupons Ativos</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Desc.</TableHead>
                                    <TableHead>Usos</TableHead>
                                    <TableHead>Validade</TableHead>
                                    <TableHead className="text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {coupons.map((coupon) => (
                                    <TableRow key={coupon.id}>
                                        <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                                                {coupon.discount}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-medium">{coupon.usedCount}</span>
                                            <span className="text-xs text-muted-foreground"> / {coupon.maxUses || '∞'}</span>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">{coupon.validUntil}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteCoupon(coupon.id)}>
                                                <Trash2 className="w-4 h-4"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {coupons.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                            Nenhum cupom ativo.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>

          {/* ABA PERFIL */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserCircle className="w-5 h-5 text-purple-600"/> Meus Dados</CardTitle>
                        <CardDescription>Atualize suas informações pessoais de administrador.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nome Completo</Label>
                            <Input 
                                value={adminProfile.name} 
                                onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email de Login</Label>
                            <Input 
                                value={adminProfile.email} 
                                onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})} 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>CPF</Label>
                                <Input 
                                    value={adminProfile.cpf} 
                                    onChange={(e) => setAdminProfile({...adminProfile, cpf: e.target.value})} 
                                    placeholder="000.000.000-00"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>WhatsApp</Label>
                                <Input 
                                    value={adminProfile.whatsapp} 
                                    onChange={(e) => setAdminProfile({...adminProfile, whatsapp: e.target.value})} 
                                    placeholder="(00) 00000-0000"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-purple-600" onClick={handleSaveProfile}>Salvar Alterações</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Key className="w-5 h-5 text-purple-600"/> Alterar Senha</CardTitle>
                        <CardDescription>Mantenha sua conta segura alterando a senha periodicamente.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Senha Atual</Label>
                            <Input type="password" 
                                value={adminProfile.currentPassword}
                                onChange={(e) => setAdminProfile({...adminProfile, currentPassword: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Nova Senha</Label>
                            <Input type="password" 
                                value={adminProfile.newPassword}
                                onChange={(e) => setAdminProfile({...adminProfile, newPassword: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Confirmar Nova Senha</Label>
                            <Input type="password" 
                                value={adminProfile.confirmNewPassword}
                                onChange={(e) => setAdminProfile({...adminProfile, confirmNewPassword: e.target.value})}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-purple-600" onClick={handleSaveProfile}>Salvar Alterações</Button>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-2 border-purple-200 bg-purple-50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-purple-900">
                                    <QrCode className="w-5 h-5"/> Verificação em Duas Etapas (2FA)
                                </CardTitle>
                                <CardDescription className="text-purple-700">
                                    Adicione uma camada extra de segurança usando o Google Authenticator.
                                </CardDescription>
                            </div>
                            <Switch 
                                checked={adminProfile.is2FAEnabled}
                                onCheckedChange={handleToggle2FA}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {adminProfile.is2FAEnabled ? (
                            <div className="flex items-center gap-3 text-green-700 bg-green-100 p-3 rounded-md border border-green-200">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Sua conta está protegida com 2FA.</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-amber-700 bg-amber-100 p-3 rounded-md border border-amber-200">
                                <ShieldAlert className="w-5 h-5" />
                                <span>Recomendamos ativar o 2FA para proteger o painel administrativo.</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
          </TabsContent>

          {/* ABA AUDITORIA */}
          <TabsContent value="audit">
            <Card>
                <CardHeader>
                <CardTitle>Log de Auditoria</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Admin</TableHead>
                                <TableHead>Ação</TableHead>
                                <TableHead>Alvo</TableHead>
                                <TableHead>Detalhes</TableHead>
                                <TableHead className="text-right">Horário</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.admin}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            log.action === 'CREATE' ? 'border-green-500 text-green-600' :
                                            log.action === 'DELETE' ? 'border-red-500 text-red-600' :
                                            'border-blue-500 text-blue-600'
                                        }>
                                            {log.action}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{log.target}</TableCell>
                                    <TableCell className="text-gray-500">{log.details}</TableCell>
                                    <TableCell className="text-right">{log.time}</TableCell>
                                </TableRow>
                            ))}
                            {auditLogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        Nenhum registro encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>

      {/* SHEET DE CRIAÇÃO/EDIÇÃO */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{sheetMode === 'CREATE' ? 'Criar Novo Usuário' : 'Editar Usuário & Plano'}</SheetTitle>
            <SheetDescription>
              {sheetMode === 'CREATE' 
                ? 'Preencha os dados para cadastrar um novo acesso no sistema.' 
                : 'Atualize dados cadastrais ou insira créditos e tempo de uso.'}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-6 py-6">
            
            <div className="space-y-2">
              <Label>Funções do Usuário (Selecione uma ou mais)</Label>
              <div className="flex gap-4 flex-wrap">
                {["USER", "EMBAIXADOR", "ADMIN"].map((role) => {
                  const isSelected = formData.roles.includes(role as any);
                  return (
                    <div key={role} 
                         className={`flex items-center gap-2 border p-3 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                         onClick={() => toggleRole(role as any)}>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}`}>
                        {isSelected && <div className="text-white text-[10px]">✓</div>}
                      </div>
                      <span className="text-sm font-medium">{role === 'USER' ? 'Cliente' : role === 'EMBAIXADOR' ? 'Embaixadora' : 'Admin Safe'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Tabs defaultValue="cadastro" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cadastro">Dados Cadastrais</TabsTrigger>
                <TabsTrigger value="plano" disabled={!formData.roles.includes("USER")}>
                    Gestão do Plano
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cadastro" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nome do usuário" />
                  </div>
                  <div className="space-y-2">
                    <Label>CPF</Label>
                    <Input value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} placeholder="000.000.000-00" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@exemplo.com" />
                    </div>
                    <div className="space-y-2">
                        <Label>WhatsApp</Label>
                        <Input value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} placeholder="(00) 00000-0000" />
                    </div>
                </div>

                {formData.roles.includes('EMBAIXADOR') && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="space-y-2">
                            <Label className="text-purple-700 font-semibold flex items-center gap-2">
                                <DollarSign className="w-4 h-4"/> Chave Pix
                            </Label>
                            <Input 
                                value={formData.pix} 
                                onChange={(e) => setFormData({...formData, pix: e.target.value})} 
                                placeholder="CPF, Email ou Aleatória" 
                                className="border-purple-200 focus-visible:ring-purple-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-purple-700 font-semibold flex items-center gap-2">
                                <Activity className="w-4 h-4"/> Código Indicação
                            </Label>
                            <Input 
                                value={formData.referralCode} 
                                onChange={(e) => setFormData({...formData, referralCode: e.target.value})} 
                                placeholder="Ex: ANACLARA2026" 
                                className="border-purple-200 focus-visible:ring-purple-400" 
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Senha {sheetMode === 'EDIT' && '(Deixe em branco para manter)'}</Label>
                    <Input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="******" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmar Senha</Label>
                    <Input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} placeholder="******" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="plano" className="space-y-6 pt-4">
                <div className="space-y-3 pb-4 border-b">
                    <Label className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> Selecione o Plano</Label>
                    <div className="flex gap-4">
                        <div className={`flex-1 border p-4 rounded-lg cursor-pointer text-center transition-colors ${formData.planType === 'AVULSO' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
                             onClick={() => setFormData({...formData, planType: "AVULSO", creditsToAdd: 2})}>
                            <p className="font-bold text-gray-800">Avulso</p>
                            <p className="text-xs text-gray-500">R$ 25,00 - 2 consultas/mês</p>
                        </div>
                        <div className={`flex-1 border p-4 rounded-lg cursor-pointer text-center transition-colors ${formData.planType === 'ANUAL' ? 'bg-green-50 border-green-500' : 'hover:bg-gray-50'}`}
                             onClick={() => setFormData({...formData, planType: "ANUAL", creditsToAdd: 12})}>
                            <p className="font-bold text-gray-800">Anual</p>
                            <p className="text-xs text-gray-500">R$ 92,00 - 12 consultas/mês</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pb-4 border-b">
                    <Label className="flex items-center gap-2"><DollarSign className="w-4 h-4"/> Adicionar Créditos de Consulta</Label>
                    <div className="flex gap-2">
                        <Input type="number" value={formData.creditsToAdd} onChange={(e) => setFormData({...formData, creditsToAdd: parseInt(e.target.value)})} className="flex-1" />
                        <Button variant="outline" onClick={() => setFormData({...formData, creditsToAdd: formData.creditsToAdd + 5})}>+5</Button>
                        <Button variant="outline" onClick={() => setFormData({...formData, creditsToAdd: formData.creditsToAdd + 10})}>+10</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Estes créditos serão somados ao saldo atual do usuário.</p>
                </div>

                <div className="space-y-3">
                    <Label className="flex items-center gap-2"><Clock className="w-4 h-4"/> Adicionar Tempo de Vigência</Label>
                    <div className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1">
                            <span className="text-xs text-gray-500">Quantidade</span>
                            <Input type="number" disabled={formData.durationUnit === 'LIFETIME'} value={formData.durationValue} onChange={(e) => setFormData({...formData, durationValue: parseInt(e.target.value)})} />
                        </div>
                        <div className="flex-[2] space-y-1">
                            <span className="text-xs text-gray-500">Unidade</span>
                            <select 
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.durationUnit}
                                onChange={(e) => setFormData({...formData, durationUnit: e.target.value as any})}
                            >
                                <option value="DAYS">Dias</option>
                                <option value="MONTHS">Meses</option>
                                <option value="YEARS">Anos</option>
                                <option value="LIFETIME">Vitalício (Eterno)</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">O tempo será adicionado à data de expiração atual.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                <Save className="w-4 h-4 mr-2"/>
                {sheetMode === 'CREATE' ? 'Criar Conta' : 'Salvar Alterações'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* MODAL DE 2FA (QR CODE CORRIGIDO) */}
      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Configurar Google Authenticator</DialogTitle>
                <DialogDescription>
                    Escaneie o QR Code abaixo com o app Google Authenticator no seu celular e digite o código gerado.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4 gap-4">
                {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Code 2FA" className="w-48 h-48 border rounded-lg shadow-sm" />
                ) : (
                    <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-xs text-gray-500">
                        Carregando...
                    </div>
                )}
                
                <div className="w-full max-w-[250px] space-y-2">
                    <Label className="text-center block">Código de 6 dígitos</Label>
                    <Input 
                        className="text-center text-lg tracking-widest"
                        placeholder="000000"
                        maxLength={6}
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    />
                </div>

                {secret && (
                    <div className="flex flex-col items-center gap-2 mt-2 w-full">
                        <span className="text-xs text-gray-500">Não consegue escanear? Use a chave:</span>
                        <div className="flex gap-2 w-full">
                            <Input value={secret} readOnly className="text-xs bg-gray-50 text-center font-mono" />
                            <Button size="icon" variant="outline" onClick={copySecretToClipboard}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleVerify2FA} disabled={twoFactorCode.length !== 6}>
                    Verificar e Ativar
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

function MetricCard({ title, value, icon: Icon, sub, color }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}