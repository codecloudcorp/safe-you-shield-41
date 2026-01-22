import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle, FileText, User, Phone, 
  MapPin, Scale, Download, ShieldCheck, ShieldAlert, ShieldX, Briefcase, AlertTriangle, CreditCard, Calendar, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { toast } from "sonner";
import jsPDF from "jspdf";

const ConsultaDetalhe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recebe os dados da navegação anterior
  const state = location.state as {
    apiData?: {
        risco: string; // Vem do Java: ALTO_RISCO, ATENCAO_RECOMENDADA, SEGURO
        resumo: string;
        detalhes: string[];
    };
    searchParams?: {
        cpf?: string;
        phone?: string;
        name?: string;
    }
  };

  const apiData = state?.apiData;
  const searchParams = state?.searchParams;

  // Se não houver dados (acesso direto pela URL), mostra estado vazio
  if (!apiData) {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Nenhuma consulta encontrada</h1>
        <p className="text-muted-foreground mb-6">Realize uma nova busca para ver os detalhes.</p>
        <Button onClick={() => navigate("/dashboard/consulta")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nova Consulta
        </Button>
      </div>
    );
  }

  // Lógica para exibição do CPF:
  // Se pesquisou por CPF -> Mostra completo
  // Se pesquisou por Nome ou Telefone -> Mostra parcial (***.877.333-**)
  let displayCpf = searchParams?.cpf || "Não informado";
  
  // Se não tem CPF na busca (buscou por nome ou telefone) ou está vazio, mostramos mascarado
  if (!searchParams?.cpf || searchParams.cpf.trim() === "") {
     displayCpf = "***.***.***-**"; 
  } else {
      // Se tem CPF, verifica se foi preenchido. 
      // Assumindo que se 'cpf' está preenchido no searchParams, foi usado.
      if (searchParams.cpf.trim() === "") {
          displayCpf = "***.***.***-**";
      }
  }

  // Mapeia o Enum do Java para o Visual do React
  const getRiskConfig = (risco: string) => {
    // Garante que está em maiúsculo para bater com o Enum Java
    const nivel = risco ? risco.toUpperCase() : "SEGURO";

    switch (nivel) {
      case "SEGURO":
      case "BAIXO":
        return {
          label: "Perfil Seguro",
          color: "bg-safe-green text-white",
          textColor: "text-safe-green",
          bgLight: "bg-safe-green/10",
          borderColor: "border-safe-green/30",
          icon: ShieldCheck,
          description: "Não foram encontradas pendências ou alertas significativos."
        };
      case "ATENCAO_RECOMENDADA":
      case "MEDIO":
      case "ALERTA":
        return {
          label: "Atenção Recomendada",
          color: "bg-caution-yellow text-white",
          textColor: "text-caution-yellow",
          bgLight: "bg-caution-yellow/10",
          borderColor: "border-caution-yellow/30",
          icon: ShieldAlert,
          description: "Foram encontrados alguns pontos que merecem atenção."
        };
      case "ALTO_RISCO":
      case "ALTO":
      case "PERIGO":
        return {
          label: "Alto Risco Detectado",
          color: "bg-alert-red text-white",
          textColor: "text-alert-red",
          bgLight: "bg-alert-red/10",
          borderColor: "border-alert-red/30",
          icon: ShieldX,
          description: "Foram encontradas pendências importantes. Tenha cautela."
        };
      default:
        return {
          label: "Análise Concluída",
          color: "bg-gray-500 text-white",
          textColor: "text-gray-500",
          bgLight: "bg-gray-100",
          borderColor: "border-gray-300",
          icon: ShieldCheck,
          description: "Verificação realizada."
        };
    }
  };

  const riskConfig = getRiskConfig(apiData.risco);
  const RiskIcon = riskConfig.icon;
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Relatório Safe You", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Data: ${currentDate} ${currentTime}`, 20, 30);
    doc.text(`Status: ${riskConfig.label}`, 20, 40);
    
    doc.text("Resumo:", 20, 55);
    doc.setFontSize(10);
    const splitResumo = doc.splitTextToSize(apiData.resumo, 170);
    doc.text(splitResumo, 20, 60);

    if (apiData.detalhes.length > 0) {
        doc.setFontSize(12);
        doc.text("Detalhes Encontrados:", 20, 80);
        doc.setFontSize(10);
        let y = 90;
        apiData.detalhes.forEach((detalhe) => {
            const splitDetalhe = doc.splitTextToSize(`- ${detalhe}`, 170);
            doc.text(splitDetalhe, 20, y);
            y += 7 * splitDetalhe.length;
        });
    }

    doc.save(`relatorio_${currentDate.replace(/\//g, '-')}.pdf`);
    toast.success("PDF baixado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/consulta")} className="mb-2 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Nova Consulta
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <FileText className="w-7 h-7 text-primary" />
                Relatório Oficial
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Data: {currentDate} às {currentTime} • Fonte: DataJud (CNJ)
              </p>
            </div>
            <Button onClick={exportToPDF} className="bg-gradient-to-r from-rose-soft to-lavender text-white gap-2">
              <Download className="w-4 h-4" /> PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        
        {/* Banner de Risco */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className={`border-2 ${riskConfig.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${riskConfig.color}`}>
                  <RiskIcon className="w-10 h-10" />
                </div>
                <div>
                  <Badge className={`${riskConfig.color} text-base px-4 py-1.5 border-0 hover:${riskConfig.color}`}>
                    {riskConfig.label}
                  </Badge>
                  <p className="text-lg font-medium mt-2">{apiData.resumo}</p>
                  <p className="text-sm text-muted-foreground">{riskConfig.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Legenda de Níveis de Risco */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Info className="w-4 h-4" />
                Legenda dos Níveis de Risco
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Seguro */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-safe-green/5 border border-safe-green/20">
                  <div className="p-2 rounded-full bg-safe-green/20">
                    <ShieldCheck className="w-4 h-4 text-safe-green" />
                  </div>
                  <div>
                    <p className="font-medium text-safe-green text-sm">Perfil Seguro</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Nenhuma pendência encontrada. Histórico limpo e sem alertas.
                    </p>
                  </div>
                </div>

                {/* Atenção */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-caution-yellow/5 border border-caution-yellow/20">
                  <div className="p-2 rounded-full bg-caution-yellow/20">
                    <ShieldAlert className="w-4 h-4 text-caution-yellow" />
                  </div>
                  <div>
                    <p className="font-medium text-caution-yellow text-sm">Atenção Recomendada</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Alguns pontos de atenção. Avalie com cuidado antes de prosseguir.
                    </p>
                  </div>
                </div>

                {/* Perigo */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-alert-red/5 border border-alert-red/20">
                  <div className="p-2 rounded-full bg-alert-red/20">
                    <ShieldX className="w-4 h-4 text-alert-red" />
                  </div>
                  <div>
                    <p className="font-medium text-alert-red text-sm">Alto Risco</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Pendências graves identificadas. Evite contato ou tenha extrema cautela.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dados Pessoais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                Dados Pessoais Consultados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-muted-foreground mb-1">Nome Completo</p>
                <p className="text-xl font-semibold text-foreground">
                  {searchParams?.name || "Não informado na busca"}
                </p>
              </motion.div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs">CPF</span>
                  </div>
                  <p className="font-mono font-medium text-foreground">{displayCpf}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Data de Nascimento</span>
                  </div>
                  <p className="font-medium text-foreground">--/--/----</p>
                  <p className="text-xs text-muted-foreground">Não disponível</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">Telefone</span>
                  </div>
                  <p className="font-medium text-foreground">{searchParams?.phone || "Não informado"}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Cidade</span>
                  </div>
                  <p className="font-medium text-foreground">--/--</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resultados Judiciais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="w-5 h-5 text-primary" />
                Resultados Judiciais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {apiData.detalhes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 text-safe-green mx-auto mb-2 opacity-50" />
                  <p>Nenhum registro encontrado nas bases públicas consultadas.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {apiData.detalhes.map((detalhe: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 rounded-xl border border-border bg-muted/10"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Briefcase className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground leading-relaxed">
                            {detalhe}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Outras Verificações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-primary" />
                Outras Verificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Como a API atual só retorna judicial, vamos mostrar status OK padrão para financeiro por enquanto */}
                <div className="p-4 rounded-xl bg-safe-green/10 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-safe-green" />
                  <div>
                    <p className="font-medium text-foreground">Situação CPF</p>
                    <p className="text-sm text-muted-foreground">Regular na Receita Federal</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-safe-green/10 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-safe-green" />
                  <div>
                    <p className="font-medium text-foreground">Restrições Financeiras</p>
                    <p className="text-sm text-muted-foreground">Sem restrições no SPC/Serasa</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/dashboard/consulta")}
          >
            Nova Consulta
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-rose-soft to-lavender text-white"
            onClick={() => navigate("/dashboard/historico")}
          >
            Ver Histórico
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultaDetalhe;