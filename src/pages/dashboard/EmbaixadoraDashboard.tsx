import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Wallet, Users, TrendingUp, DollarSign, Crown, UserCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const commissionData = [
  { name: "01/Set", value: 120 }, { name: "05/Set", value: 300 }, { name: "10/Set", value: 250 },
  { name: "15/Set", value: 450 }, { name: "20/Set", value: 400 }, { name: "25/Set", value: 600 },
  { name: "30/Set", value: 850 },
];

export default function EmbaixadoraDashboard() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState("Gold");
  const salesCount = 35;
  const nextLevelGoal = 51;
  const progressPercentage = (salesCount / nextLevelGoal) * 100;

  const copyLink = () => {
    navigator.clipboard.writeText("https://safeyou.com.br/convite/MARIA123");
    toast.success("Link copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <Crown className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-lg text-purple-900">Painel Embaixadora</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Maria Embaixadora</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Alternar Perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer bg-purple-50 text-purple-700 font-medium">
              <Crown className="mr-2 h-4 w-4" /> Painel Embaixadora
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
              <UserCircle className="mr-2 h-4 w-4" /> Painel Usuário
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => navigate('/login')}>
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="container mx-auto px-4 pt-8 space-y-8">
        
        <Card className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white border-none shadow-xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Olá, Maria! 🚀</h2>
                <p className="text-purple-200">Você está a <span className="font-bold text-white">{nextLevelGoal - salesCount} vendas</span> de se tornar Premium.</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 text-md px-4 py-1">
                Nível Atual: {currentLevel} (25%)
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-purple-200">
                <span>Iniciante (20%)</span>
                <span>Gold (25%)</span>
                <span>Premium (30%)</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-purple-950/50" indicatorColor="bg-yellow-400" />
              <p className="text-right text-xs text-purple-300 mt-1">{salesCount} / {nextLevelGoal} vendas</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border shadow-sm">
          <span className="font-semibold text-gray-700 whitespace-nowrap">Seu Link de Indicação:</span>
          <div className="flex w-full gap-2">
            <Input value="https://safeyou.com.br/convite/MARIA123" readOnly className="bg-gray-50" />
            <Button onClick={copyLink} className="bg-purple-600 hover:bg-purple-700">
              <Copy className="h-4 w-4 mr-2" /> Copiar
            </Button>
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
              <Share2 className="h-4 w-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Vendas no Mês" value="12" icon={Users} color="text-blue-500" />
          <KpiCard title="Comissão Pendente" value="R$ 450,00" icon={TrendingUp} color="text-orange-500" sub="Libera em 15 dias" />
          <KpiCard title="Disponível para Saque" value="R$ 1.200,00" icon={Wallet} color="text-green-500" highlight />
          <KpiCard title="Total Ganho (Vitalício)" value="R$ 5.400,00" icon={DollarSign} color="text-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Evolução de Comissões (30 dias)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={commissionData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(value) => `R$${value}`}/>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                O pagamento automático ocorre todo dia 10.
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Chave Pix Cadastrada</label>
                <div className="flex gap-2">
                  <Input value="maria@email.com" readOnly />
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg mt-4">
                Solicitar Antecipação
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
    <Card className={highlight ? "border-green-200 bg-green-50/30" : ""}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}