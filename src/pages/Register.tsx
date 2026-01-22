import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Shield, HeartHandshake, UserPlus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import api from "@/services/api"; // Importe a API criada

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    chavePix: "",
    codigoIndicacao: "" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "cpf") {
      value = value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").slice(0, 14);
    }
    if (name === "telefone") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").slice(0, 15);
    }
    if (name === "codigoIndicacao") {
        value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (role: "USER" | "EMBAIXADORA" | "JOINT") => {
    if (!formData.nome || !formData.email || !formData.senha) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if ((role === "EMBAIXADORA" || role === "JOINT") && (!formData.chavePix || !formData.codigoIndicacao)) {
        toast.error("Embaixadoras precisam definir Chave Pix e Código de Indicação.");
        return;
    }

    setLoading(true);

    try {
        // Mapeamento para o DTO do Java (Backend)
        const payload = {
            nome: formData.nome,
            cpf: formData.cpf.replace(/\D/g, ""), // Remove formatação
            email: formData.email,
            telefone: formData.telefone.replace(/\D/g, ""),
            password: formData.senha,
            confirmPassword: formData.confirmarSenha,
            // Mapeia os roles do Front para o Enum do Back (USUARIO, EMBAIXADORA, AMBAS)
            tipoConta: role === "USER" ? "USUARIO" : role === "JOINT" ? "AMBAS" : "EMBAIXADORA",
            termosAceitos: true,
            chavePix: formData.chavePix,
            codigoIndicacao: formData.codigoIndicacao
        };

        await api.post("/auth/register", payload);
        
        toast.success("Conta criada com sucesso! Faça login.");
        navigate("/login");

    } catch (error: any) {
        console.error(error);
        const errorMsg = error.response?.data || "Erro ao criar conta. Verifique os dados.";
        toast.error(errorMsg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-rose-soft to-lavender p-3 rounded-2xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Crie sua conta</h1>
            <p className="text-muted-foreground">Junte-se à comunidade Safe You</p>
          </div>

          <Tabs defaultValue="cliente" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="cliente">Cliente</TabsTrigger>
              <TabsTrigger value="embaixadora">Embaixadora</TabsTrigger>
              <TabsTrigger value="conjunta" className="text-xs sm:text-sm">Conta Conjunta</TabsTrigger>
            </TabsList>

            <TabsContent value="cliente">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Perfil de Proteção
                  </CardTitle>
                  <CardDescription>
                    Para quem deseja contratar consultas e proteger a família.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RegistrationForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    loading={loading}
                    onSubmit={() => handleRegister("USER")}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="embaixadora">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5 rounded-t-lg border-b border-primary/10">
                  <CardTitle className="text-primary flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5" />
                    Parceira Safe You
                  </CardTitle>
                  <CardDescription>
                    Foco total em divulgar e ganhar comissões.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-4">
                    <h4 className="text-sm font-semibold text-primary mb-2">Benefícios:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Comissões recorrentes</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500"/> Material de apoio</li>
                    </ul>
                  </div>

                  <RegistrationForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    loading={loading}
                    isAmbassador={true}
                    onSubmit={() => handleRegister("EMBAIXADORA")}
                    buttonText="Cadastrar como Embaixadora"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conjunta">
              <Card className="border-purple-300 shadow-glow">
                <CardHeader className="bg-gradient-to-r from-rose-soft/10 to-lavender/10 rounded-t-lg border-b border-border">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-purple-600" />
                    Conta Completa
                  </CardTitle>
                  <CardDescription>
                    Tenha acesso aos planos de proteção E ao painel de vendas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 p-3 rounded-md border border-purple-100 mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>Melhor opção: Proteja-se e lucre indicando.</span>
                  </div>

                  <RegistrationForm 
                    formData={formData} 
                    handleChange={handleChange} 
                    loading={loading}
                    isAmbassador={true}
                    onSubmit={() => handleRegister("JOINT")}
                    buttonText="Criar Conta Completa"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Faça Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationForm({ formData, handleChange, loading, onSubmit, buttonText = "Criar Conta", isAmbassador = false }: any) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input id="nome" name="nome" placeholder="Maria da Silva" value={formData.nome} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="maria@exemplo.com" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" name="telefone" placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleChange} required />
        </div>
      </div>

      {isAmbassador && (
        <div className="space-y-4 pt-2 border-t border-border mt-2">
            <div className="space-y-2">
                <Label htmlFor="chavePix" className="text-purple-700 font-medium">Sua Chave Pix (Para receber comissões)</Label>
                <Input id="chavePix" name="chavePix" placeholder="CPF, Email ou Aleatória" value={formData.chavePix} onChange={handleChange} className="border-purple-200 focus-visible:ring-purple-400" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="codigoIndicacao" className="text-purple-700 font-medium">Crie seu Código de Indicação</Label>
                <Input id="codigoIndicacao" name="codigoIndicacao" placeholder="Ex: MARIA10 (Sem espaços)" value={formData.codigoIndicacao} onChange={handleChange} className="border-purple-200 focus-visible:ring-purple-400 uppercase" />
                <p className="text-xs text-muted-foreground">Este código será usado no seu link personalizado.</p>
            </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" name="senha" type="password" value={formData.senha} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmarSenha">Confirmar</Label>
          <Input id="confirmarSenha" name="confirmarSenha" type="password" value={formData.confirmarSenha} onChange={handleChange} required />
        </div>
      </div>
      <Button className="w-full bg-gradient-to-r from-rose-soft to-lavender hover:opacity-90 text-white mt-4 shadow-lg" onClick={onSubmit} disabled={loading}>
        {loading ? "Criando conta..." : buttonText}
      </Button>
    </div>
  );
}