import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, Lock, Mail, Sparkles, ArrowLeft, CheckCircle, UserCircle, Crown, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { signInWithGoogle } from "@/services/authSocial";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- Estados do 2FA ---
  const [requires2FA, setRequires2FA] = useState(false);
  const [code2FA, setCode2FA] = useState("");
  const [trustDevice, setTrustDevice] = useState(false);

  // --- Estados do Leque de Perfis ---
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoadingSocial, setIsLoadingSocial] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        // Verifica se há um token de dispositivo confiável salvo
        const storedDeviceToken = localStorage.getItem("trustedDeviceToken");

        const payload = {
            login: email,
            password: password,
            code2FA: requires2FA ? code2FA : null, // Só envia o código na segunda etapa
            trustDevice: trustDevice,
            trustedDeviceToken: storedDeviceToken // Envia o token de dispositivo para tentar pular o 2FA
        };

        const response = await api.post("/auth/login", payload);

        // Se chegou aqui, login ok (200)
        
        const { token, roles, newTrustedDeviceToken } = response.data;

        // Se o usuário pediu para confiar e o backend gerou um novo token de dispositivo
        if (newTrustedDeviceToken) {
            localStorage.setItem("trustedDeviceToken", newTrustedDeviceToken);
        }

        localStorage.setItem("userToken", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRoles", JSON.stringify(roles));

        toast.success("Login realizado com sucesso!");

        // LÓGICA DO LEQUE (SELEÇÃO DE PERFIL)
        if (roles && roles.length > 1) {
            // Se tiver mais de um perfil, mostra a tela de seleção
            setUserRoles(roles);
            setShowRoleSelection(true);
            setIsLoading(false);
        } else if (roles && roles.length === 1) {
            // Se tiver apenas um, redireciona direto
            redirectToRole(roles[0]);
        } else {
            // Fallback para USER se não vier roles
            redirectToRole("USER");
        }

    } catch (error: any) {
        // Intercepta a exigência de 2FA (403 Forbidden com flag específica)
        // O backend deve retornar um JSON com { is2faRequired: true } no corpo do erro 403
        if (error.response && error.response.status === 403 && error.response.data?.is2faRequired) {
            setRequires2FA(true);
            toast.info("Autenticação em duas etapas necessária.");
            setIsLoading(false);
            return;
        }

        console.error("Erro no login:", error);
        
        if (requires2FA) {
             toast.error("Código de verificação incorreto.");
        } else if (error.response?.status === 403) {
             // Se for 403 mas não for 2FA, é credencial inválida ou bloqueio
             toast.error("Acesso negado. Verifique suas credenciais.");
        } else {
             toast.error("Erro ao fazer login. Verifique seus dados.");
        }
        setIsLoading(false);
    }
  };

  const redirectToRole = (role: string) => {
      switch(role) {
          case "ADMIN":
              navigate("/admin");
              break;
          case "EMBAIXADOR":
              navigate("/embaixadora");
              break;
          default:
              navigate("/dashboard"); // USER
      }
  };

  const handleGoogleLogin = async () => {
    setIsLoadingSocial(true);
    try {
      const result = await signInWithGoogle();

      toast.success("Login realizado com sucesso!");

      if (result.roles.length > 1) {
        setUserRoles(result.roles);
        setShowRoleSelection(true);
        setIsLoadingSocial(false);
      } else {
        redirectToRole(result.roles[0]);
      }
    } catch (error: any) {
      console.error('Erro no login com Google:', error);
      toast.error(error.message || 'Erro ao fazer login com Google');
      setIsLoadingSocial(false);
    }
  };

  // --- TELA DE SELEÇÃO DE PERFIL (LEQUE) ---
  if (showRoleSelection) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl flex flex-col items-center justify-center"
            >
                <div className="text-center mb-10 w-full">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Bem-vinda de volta!</h1>
                    <p className="text-lg text-gray-500">Selecione qual perfil você deseja acessar agora.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-items-center">
                    {/* Painel Cliente */}
                    {userRoles.includes("USER") && (
                        <Card 
                            className="w-full max-w-xs h-72 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all group border-2 border-transparent hover:scale-105 duration-300"
                            onClick={() => redirectToRole("USER")}
                        >
                            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                                    <UserCircle className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-2">Painel Cliente</h3>
                                <p className="text-sm text-gray-500">Acesse suas consultas, segurança e configurações pessoais.</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Painel Embaixadora */}
                    {userRoles.includes("EMBAIXADOR") && (
                        <Card 
                            className="w-full max-w-xs h-72 cursor-pointer hover:shadow-xl hover:border-purple-300 transition-all group border-2 border-transparent hover:scale-105 duration-300"
                            onClick={() => redirectToRole("EMBAIXADOR")}
                        >
                            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                                    <Crown className="w-10 h-10 text-purple-600" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-2">Painel Embaixadora</h3>
                                <p className="text-sm text-gray-500">Gerencie suas indicações, link de afiliado e saque suas comissões.</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Painel Admin */}
                    {userRoles.includes("ADMIN") && (
                        <Card 
                            className="w-full max-w-xs h-72 cursor-pointer hover:shadow-xl hover:border-slate-300 transition-all group border-2 border-transparent hover:scale-105 duration-300"
                            onClick={() => redirectToRole("ADMIN")}
                        >
                            <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-slate-200 transition-colors">
                                    <ShieldAlert className="w-10 h-10 text-slate-800" />
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-2">Admin Safe You</h3>
                                <p className="text-sm text-gray-500">Gestão de usuários, sistema financeiro e configurações globais.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="mt-12 text-center w-full">
                    <Button 
                        variant="ghost" 
                        onClick={() => setShowRoleSelection(false)} 
                        className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-8"
                    >
                        Voltar para Login
                    </Button>
                </div>
            </motion.div>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-rose-soft via-lavender to-primary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">Safe You</h1>
              <p className="text-xl text-white/80 max-w-sm">
                Sua proteção, nossa prioridade.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Mais de 10.000 mulheres protegidas</span>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-16 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-24 w-10 h-10 bg-white/15 rounded-xl backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-soft to-lavender rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">Safe You</span>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {requires2FA ? "Verificação de Segurança" : "Bem-vinda de volta! 👋"}
            </h2>
            <p className="text-muted-foreground">
              {requires2FA 
                ? "Digite o código de 6 dígitos do seu aplicativo autenticador."
                : "Entre na sua conta para continuar protegida"
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
                {!requires2FA ? (
                    // --- STEP 1: USUARIO E SENHA ---
                    <motion.div 
                        key="login-step"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-medium">
                            E-mail ou CPF
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                            id="email"
                            type="text"
                            placeholder="seu@email.com ou 000.000.000-00"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-11 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            />
                        </div>
                        </div>
                        
                        <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground font-medium">
                            Senha
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-11 pr-11 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        </div>

                        <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" 
                            />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            Lembrar de mim
                            </span>
                        </label>
                        <a 
                            href="#" 
                            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            Esqueceu a senha?
                        </a>
                        </div>
                    </motion.div>
                ) : (
                    // --- STEP 2: CÓDIGO 2FA ---
                    <motion.div 
                        key="2fa-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="code2fa" className="text-center block text-foreground font-medium">
                                Código de Autenticação
                            </Label>
                            <Input 
                                id="code2fa" 
                                className="text-center text-2xl tracking-[0.5em] h-14 font-mono uppercase bg-muted/50 focus:bg-background" 
                                maxLength={6} 
                                placeholder="000 000"
                                autoFocus
                                value={code2FA} 
                                onChange={(e) => setCode2FA(e.target.value.replace(/\D/g, ''))} 
                                required 
                            />
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-lg border border-border/50">
                            <input 
                                type="checkbox"
                                id="trustDevice" 
                                checked={trustDevice}
                                onChange={(e) => setTrustDevice(e.target.checked)}
                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                            />
                            <label htmlFor="trustDevice" className="text-sm font-medium leading-tight cursor-pointer text-foreground/90">
                                Não pedir código neste dispositivo por 30 dias
                            </label>
                            <CheckCircle className="w-4 h-4 text-green-600 opacity-0 data-[checked=true]:opacity-100 transition-opacity" data-checked={trustDevice} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-rose-soft to-lavender hover:opacity-90 text-white font-semibold text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                requires2FA ? "Verificar Código" : "Entrar"
              )}
            </Button>

            {requires2FA && (
                <Button 
                    variant="ghost" 
                    type="button" 
                    className="w-full gap-2 text-muted-foreground hover:text-foreground" 
                    onClick={() => {
                        setRequires2FA(false);
                        setCode2FA("");
                    }}
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para login
                </Button>
            )}
          </form>

          {/* Divider & Social (Esconder no 2FA para limpar a tela) */}
          {!requires2FA && (
            <>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">ou</span>
                    </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-12 gap-2"
                  onClick={handleGoogleLogin}
                  disabled={isLoadingSocial || isLoading}
                >
                  {isLoadingSocial ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continuar com Google
                </Button>

                <p className="text-center text-muted-foreground">
                    Não tem uma conta?{" "}
                    <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                    Conheça o Safe You
                    </Link>
                </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;