import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Wallet, Users, TrendingUp, DollarSign, Crown, UserCircle, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

interface ChartData {
  name: string;
  value: number;
}

export default function EmbaixadoraDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState("MES");
  const [userAvatar, setUserAvatar] = useState(""); 

  const [data, setData] = useState({
      nivel: "Iniciante",
      vendasRealizadas: 0,
      metaProximoNivel: 50,
      comissaoPendente: 0,
      disponivelSaque: 0,
      totalGanho: 0,
      chavePix: "",
      linkIndicacao: "",
      grafico: [] as ChartData[]
  });

  // Função para mascarar o PIX visualmente
  const maskPix = (pix: string) => {
    if (!pix || pix === "Não cadastrada") return "Não cadastrada";
    // Email
    if (pix.includes("@")) { 
        const [user, domain] = pix.split("@");
        return user.substring(0, 2) + "****@" + domain;
    }
    // CPF ou Telefone (numéricos)
    const nums = pix.replace(/\D/g, "");
    if (nums.length === 11) { // CPF ou Celular sem DDD
         return "***." + nums.substring(3, 6) + "." + nums.substring(6, 9) + "-**";
    }
    return pix.substring(0, 3) + "****" + pix.substring(pix.length - 2);
  };

  // Garante que o gráfico de ano mostre TODOS os meses (Jan a Dez)
  const getEmptyChartData = (p: string) => {
    if (p === "ANO" || p === "ANO_PASSADO") {
         return [
            { name: 'Jan', value: 0 }, { name: 'Fev', value: 0 }, { name: 'Mar', value: 0 },
            { name: 'Abr', value: 0 }, { name: 'Mai', value: 0 }, { name: 'Jun', value: 0 },
            { name: 'Jul', value: 0 }, { name: 'Ago', value: 0 }, { name: 'Set', value: 0 },
            { name: 'Out', value: 0 }, { name: 'Nov', value: 0 }, { name: 'Dez', value: 0 }
        ];
    }
    if (p === "SEMANA") {
        return [
            { name: 'Seg', value: 0 }, { name: 'Ter', value: 0 }, { name: 'Qua', value: 0 },
            { name: 'Qui', value: 0 }, { name: 'Sex', value: 0 }, { name: 'Sab', value: 0 }, { name: 'Dom', value: 0 }
        ];
    }
    if (p === "DIA") {
        return [
            { name: '00h', value: 0 }, { name: '06h', value: 0 }, { name: '12h', value: 0 }, { name: '18h', value: 0 }, { name: '23h', value: 0 }
        ];
    }
    // Default MES
    return [ { name: 'Sem 1', value: 0 }, { name: 'Sem 2', value: 0 }, { name: 'Sem 3', value: 0 }, { name: 'Sem 4', value: 0 } ];
  };

  const fetchData = async (periodoSelecionado = "MES") => {
      try {
          const response = await api.get(`/embaixador/dashboard?periodo=${periodoSelecionado}`);
          setData(response.data);

          // Pega a foto para o header
          const userRes = await api.get("/users/me");
          if (userRes.data) {
             setUserAvatar(userRes.data.fotoBase64 || "");
          }

      } catch (error: any) {
          console.error("Erro dashboard:", error);
          if (error.response?.status === 403) {
             toast.error("Acesso restrito.");
             navigate("/dashboard/configuracoes?tab=perfil"); 
          }
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchData(periodo);
  }, []);

  const handlePeriodoChange = (value: string) => {
      setPeriodo(value);
      fetchData(value);
  };

  const progressPercentage = (data.vendasRealizadas / data.metaProximoNivel) * 100;

  const copyLink = () => {
    if(!data.linkIndicacao) return toast.error("Link indisponível");
    navigator.clipboard.writeText(data.linkIndicacao);
    toast.success("Link copiado!");
  };

  const shareWhatsApp = () => {
    if(!data.linkIndicacao) return toast.error("Link indisponível");
    const text = `Oi! Conheça o Safe You: ${data.linkIndicacao}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const chartData = (data.grafico && data.grafico.length > 0) ? data.grafico : getEmptyChartData(periodo);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando painel...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg"><Crown className="text-white h-5 w-5" /></div>
          <span className="font-bold text-lg text-purple-900">Painel Embaixadora</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 pl-2">
              <Avatar className="h-8 w-8 border border-purple-100">
                 {/* FOTO DE PERFIL NO HEADER */}
                 {userAvatar ? <AvatarImage src={userAvatar} className="object-cover" /> : null}
                 <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700">Minha Conta</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Alternar Perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer bg-purple-50 text-purple-700 font-medium"><Crown className="mr-2 h-4 w-4" /> Painel Embaixadora</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}><UserCircle className="mr-2 h-4 w-4" /> Painel Usuário</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/embaixadora/configuracoes')}><Settings className="mr-2 h-4 w-4" /> Configurações</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => navigate('/login')}><LogOut className="mr-2 h-4 w-4" /> Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

       <main className="container mx-auto px-4 pt-8 space-y-8">
        
        {/* Card de Nível */}
        <Card className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white border-none shadow-xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Olá, Embaixadora! 🚀</h2>
                <p className="text-purple-200">Você está a <span className="font-bold text-white">{data.metaProximoNivel - data.vendasRealizadas} vendas</span> de subir de nível.</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 text-md px-4 py-1">
                Nível Atual: {data.nivel}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-purple-200">
                <span>Iniciante</span>
                <span>Gold</span>
                <span>Premium</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-purple-950/50" />
              <p className="text-right text-xs text-purple-300 mt-1">{data.vendasRealizadas} / {data.metaProximoNivel} vendas</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 text-gray-700"><Share2 className="w-5 h-5 text-purple-600" /><span className="font-semibold whitespace-nowrap">Seu Link de Indicação:</span></div>
          <div className="flex w-full gap-3">
            <Input value={data.linkIndicacao} readOnly className="bg-gray-50 text-sm font-mono border-gray-200 text-gray-600" />
            <Button onClick={copyLink} className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap shadow-md"><Copy className="h-4 w-4 mr-2" /> Copiar</Button>
            <Button onClick={shareWhatsApp} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 whitespace-nowrap shadow-sm"><Share2 className="h-4 w-4 mr-2" /> WhatsApp</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Vendas no Mês" value={data.vendasRealizadas.toString()} icon={Users} color="text-blue-500" />
          <KpiCard title="Comissão Pendente" value={`R$ ${data.comissaoPendente}`} icon={TrendingUp} color="text-orange-500" sub="Libera em 15 dias" />
          <KpiCard title="Disponível para Saque" value={`R$ ${data.disponivelSaque}`} icon={Wallet} color="text-green-500" highlight />
          <KpiCard title="Total Ganho" value={`R$ ${data.totalGanho}`} icon={DollarSign} color="text-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <Card className="lg:col-span-2 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <TrendingUp className="w-5 h-5 text-gray-500" /> Evolução de Comissões
              </CardTitle>
              {/* SELETOR DE TEMPO */}
              <Select value={periodo} onValueChange={handlePeriodoChange}>
                  <SelectTrigger className="w-[150px] h-8 text-xs">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DIA">Hoje</SelectItem>
                    <SelectItem value="SEMANA">Esta Semana</SelectItem>
                    <SelectItem value="MES">Este Mês</SelectItem>
                    <SelectItem value="ANO">Este Ano</SelectItem>
                    <SelectItem value="ANO_PASSADO">Ano Passado</SelectItem>
                  </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6b7280', fontSize: 11}} 
                    interval={periodo.includes("ANO") ? 0 : 'preserveEnd'} // Lógica para não pular meses
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(value) => `R$${value}`}/>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} itemStyle={{ color: '#9333ea', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="value" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
              {data.grafico.length === 0 && (
                  <p className="text-center text-xs text-gray-400 mt-[-20px] relative z-10">Nenhuma venda registrada neste período.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-gray-500" /> Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-2">
                    <div className="mt-0.5">ℹ️</div>
                    <p>O pagamento automático ocorre todo dia 10 para contas com saldo superior a R$ 50,00.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Chave Pix Cadastrada</label>
                    <div className="flex gap-2">
                      <Input 
                        value={maskPix(data.chavePix)} // APLICA A MÁSCARA AQUI
                        readOnly 
                        className={!data.chavePix ? "text-gray-400 italic bg-gray-50" : "bg-white"} 
                      />
                      <Button variant="outline" size="sm" onClick={() => navigate("/embaixadora/configuracoes?tab=financeiro")}>
                          <Settings className="w-4 h-4 mr-2" /> Editar
                      </Button>
                    </div>
                  </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-semibold shadow-lg shadow-green-200 transition-all hover:scale-[1.02]">
                <Wallet className="w-5 h-5 mr-2" /> Solicitar Antecipação
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, color, sub, highlight }: any) {
  return (
    <Card className={`transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${highlight ? "border-green-200 bg-green-50/50" : "bg-white"}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-3">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          <div className={`p-2 rounded-lg ${highlight ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {sub && <p className="text-xs text-gray-500 mt-2 font-medium">{sub}</p>}
      </CardContent>
    </Card>
  );
}