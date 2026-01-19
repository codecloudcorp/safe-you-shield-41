import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  User, 
  Phone, 
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";

const Consulta = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | {
    status: "safe" | "caution" | "alert";
    name: string;
    details: string[];
  }>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    setSearchResult(null);

    // Simula uma busca
    setTimeout(() => {
      const statuses: Array<"safe" | "caution" | "alert"> = ["safe", "caution", "alert"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setSearchResult({
        status: randomStatus,
        name: "Resultado da Consulta",
        details: [
          "Nenhum registro criminal encontrado",
          "CPF regular na Receita Federal",
          "Sem restrições financeiras graves",
          randomStatus === "caution" ? "Possui processos em andamento" : "Histórico limpo",
        ]
      });
      setIsSearching(false);
    }, 2000);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "safe":
        return { 
          color: "bg-safe-green", 
          bgLight: "bg-safe-green/10",
          text: "Situação Regular", 
          textColor: "text-safe-green",
          icon: CheckCircle,
          description: "Não foram encontradas pendências ou alertas significativos."
        };
      case "caution":
        return { 
          color: "bg-caution-yellow", 
          bgLight: "bg-caution-yellow/10",
          text: "Atenção Recomendada", 
          textColor: "text-caution-yellow",
          icon: AlertTriangle,
          description: "Foram encontrados alguns pontos que merecem atenção."
        };
      case "alert":
        return { 
          color: "bg-alert-red", 
          bgLight: "bg-alert-red/10",
          text: "Alerta de Segurança", 
          textColor: "text-alert-red",
          icon: AlertTriangle,
          description: "Foram encontradas pendências importantes. Tenha cautela."
        };
      default:
        return { 
          color: "bg-muted", 
          bgLight: "bg-muted/50",
          text: "Pendente", 
          textColor: "text-muted-foreground",
          icon: Clock,
          description: ""
        };
    }
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
            <h1 className="text-2xl font-bold text-foreground">Nova Consulta</h1>
            <p className="text-muted-foreground text-sm">
              Verifique informações de segurança sobre uma pessoa
            </p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Realizar Consulta
                </CardTitle>
                <CardDescription>
                  Escolha o tipo de consulta e insira os dados para verificar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cpf" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="cpf" className="gap-2">
                      <FileText className="w-4 h-4" />
                      CPF
                    </TabsTrigger>
                    <TabsTrigger value="telefone" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone
                    </TabsTrigger>
                    <TabsTrigger value="nome" className="gap-2">
                      <User className="w-4 h-4" />
                      Nome
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="cpf">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cpf">Número do CPF</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-rose-soft to-lavender text-white"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Consultar CPF
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="telefone">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Número de Telefone</Label>
                        <Input
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-rose-soft to-lavender text-white"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Consultar Telefone
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="nome">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          placeholder="Digite o nome completo"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-rose-soft to-lavender text-white"
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Consultar Nome
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search Result */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={cn("border-2", getStatusConfig(searchResult.status).textColor.replace("text-", "border-"))}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      getStatusConfig(searchResult.status).bgLight
                    )}>
                      {(() => {
                        const StatusIcon = getStatusConfig(searchResult.status).icon;
                        return <StatusIcon className={cn("w-7 h-7", getStatusConfig(searchResult.status).textColor)} />;
                      })()}
                    </div>
                    <div>
                      <CardTitle className={getStatusConfig(searchResult.status).textColor}>
                        {getStatusConfig(searchResult.status).text}
                      </CardTitle>
                      <CardDescription>
                        {getStatusConfig(searchResult.status).description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Detalhes da consulta:</p>
                    {searchResult.details.map((detail, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-safe-green flex-shrink-0" />
                        <span className="text-sm text-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-lavender/10 to-turquoise/10 border-lavender/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-lavender to-turquoise rounded-xl flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Sobre nossas consultas
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Nossas consultas são realizadas em bases de dados públicas e oficiais, 
                      garantindo informações precisas e atualizadas. Todos os dados são 
                      tratados de acordo com a LGPD.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Consulta;
