import { useState } from "react";
import { 
  Users, Activity, DollarSign, ShieldAlert, Search, 
  MoreHorizontal, Edit, Trash2, Plus, Calendar, LogOut 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const usersData = [
  { id: 1, name: "Ana Clara", email: "ana@gmail.com", role: "Embaixadora", plan: "Active", expires: "2026-12-01" },
  { id: 2, name: "Beatriz Silva", email: "bia@hotmail.com", role: "User", plan: "Expired", expires: "2025-11-10" },
  { id: 3, name: "Carlos Souza", email: "carlos@uol.com.br", role: "User", plan: "Active", expires: "2026-05-20" },
];

const auditLog = [
  { id: 1, admin: "Jorlan (Dev)", action: "UPDATE", target: "Ana Clara", details: "Adicionou 30 dias de plano", time: "10:30" },
  { id: 2, admin: "Admin 2", action: "DELETE", target: "Spam Bot", details: "Removeu usuário", time: "09:15" },
  { id: 3, admin: "Jorlan (Dev)", action: "CREATE", target: "Cupom MULHER10", details: "Criou novo cupom", time: "Yesterday" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
                <p className="font-medium">Jorlan</p>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => navigate('/login')}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-slate-800">Painel de Controle</h2>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <MetricCard title="Usuários Online" value="124" icon={Activity} sub="+12% desde ontem" />
          <MetricCard title="Faturamento Mensal" value="R$ 14.230" icon={DollarSign} sub="+4% mês anterior" />
          <MetricCard title="Latência API" value="45ms" icon={ShieldAlert} sub="Saudável" color="text-green-500" />
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white border">
            <TabsTrigger value="users">Gestão de Usuários</TabsTrigger>
            <TabsTrigger value="coupons">Cupons</TabsTrigger>
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
                  <Button className="bg-purple-600"><Plus className="h-4 w-4 mr-2"/> Novo</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status Plano</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}<br/><span className="text-xs text-gray-500">{user.email}</span></TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Embaixadora' ? "secondary" : "outline"} className={user.role === 'Embaixadora' ? "bg-purple-100 text-purple-700 hover:bg-purple-200" : ""}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.plan === 'Active' ? "default" : "destructive"} className={user.plan === 'Active' ? "bg-green-500" : ""}>
                            {user.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.expires}</TableCell>
                        <TableCell className="text-right">
                          <Sheet>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <SheetTrigger asChild onClick={() => setSelectedUser(user)}>
                                  <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Editar Plano</DropdownMenuItem>
                                </SheetTrigger>
                                <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Banir</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Editar Usuário</SheetTitle>
                                <SheetDescription>Alterações feitas aqui são registradas na auditoria.</SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Nome</Label>
                                  <Input value={selectedUser?.name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Plano</Label>
                                  <div className="col-span-3 flex gap-2">
                                    <Button size="sm" variant="outline">+ 7 Dias</Button>
                                    <Button size="sm" variant="outline">+ 30 Dias</Button>
                                  </div>
                                </div>
                              </div>
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button type="submit" className="bg-purple-600">Salvar Alterações</Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

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
                    {auditLog.map((log) => (
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coupons">
            <Card>
              <CardHeader><CardTitle>Criar Novo Cupom</CardTitle></CardHeader>
              <CardContent className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Código (Ex: MULHER10)</Label>
                    <Input placeholder="PROMO2026" />
                  </div>
                  <div className="space-y-2">
                    <Label>Desconto (%)</Label>
                    <Input type="number" placeholder="10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Validade</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input className="pl-9" type="date" />
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Criar Cupom</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
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