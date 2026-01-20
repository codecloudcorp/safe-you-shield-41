import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  FileText,
  User,
  Phone,
  MapPin,
  Scale,
  Download,
  CreditCard,
  Info,
  Search,
  Clock,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Briefcase,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { toast } from "sonner";
import jsPDF from "jspdf";

type RiskLevel = "seguro" | "alerta" | "perigo";

interface ConsultaResult {
  pessoa: {
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    idade: number;
    telefone: string;
    cidade: string;
    estado: string;
  };
  nivelRisco: RiskLevel;
  resultadosJudiciais: {
    tipo: string;
    status: "limpo" | "pendente" | "condenado";
    descricao: string;
    quantidade?: number;
  }[];
  outrasVerificacoes: {
    categoria: string;
    status: "ok" | "warning" | "danger";
    descricao: string;
  }[];
}

const ConsultaDetalhe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const stateData = location.state as {
    cpf?: string;
    phone?: string;
    name?: string;
  } | null;

  const hasSearchData = stateData?.cpf || stateData?.phone || stateData?.name;

  const currentDate = new Date().toLocaleDateString('pt-BR');
  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // Generate result based on search data
  const generateResult = (): ConsultaResult => {
    const baseData: ConsultaResult = {
      pessoa: {
        nomeCompleto: stateData?.name || "Nome não informado na consulta",
        cpf: stateData?.cpf || "Não informado",
        dataNascimento: "15/03/1991",
        idade: 33,
        telefone: stateData?.phone || "Não informado",
        cidade: "São Paulo",
        estado: "SP"
      },
      nivelRisco: "seguro",
      resultadosJudiciais: [
        { tipo: "Criminal", status: "limpo", descricao: "Nenhum antecedente criminal encontrado" },
        { tipo: "Cível", status: "limpo", descricao: "Nenhum processo cível ativo" },
        { tipo: "Trabalhista", status: "limpo", descricao: "Nenhum processo trabalhista" },
        { tipo: "Federal", status: "limpo", descricao: "Sem pendências na justiça federal" },
      ],
      outrasVerificacoes: [
        { categoria: "Situação CPF", status: "ok", descricao: "Regular na Receita Federal" },
        { categoria: "Restrições Financeiras", status: "ok", descricao: "Sem restrições no SPC/Serasa" },
      ]
    };

    return baseData;
  };

  const result = hasSearchData ? generateResult() : null;

  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case "seguro":
        return {
          label: "Perfil Seguro",
          color: "bg-safe-green text-white",
          textColor: "text-safe-green",
          bgLight: "bg-safe-green/10",
          borderColor: "border-safe-green/30",
          icon: ShieldCheck,
          description: "Não foram encontradas pendências ou alertas significativos."
        };
      case "alerta":
        return {
          label: "Atenção Recomendada",
          color: "bg-caution-yellow text-white",
          textColor: "text-caution-yellow",
          bgLight: "bg-caution-yellow/10",
          borderColor: "border-caution-yellow/30",
          icon: ShieldAlert,
          description: "Foram encontrados alguns pontos que merecem atenção."
        };
      case "perigo":
        return {
          label: "Alto Risco",
          color: "bg-alert-red text-white",
          textColor: "text-alert-red",
          bgLight: "bg-alert-red/10",
          borderColor: "border-alert-red/30",
          icon: ShieldX,
          description: "Foram encontradas pendências importantes. Tenha cautela."
        };
    }
  };

  const getJudicialStatusConfig = (status: "limpo" | "pendente" | "condenado") => {
    switch (status) {
      case "limpo":
        return { color: "text-safe-green", bgColor: "bg-safe-green/10", icon: CheckCircle, label: "Limpo" };
      case "pendente":
        return { color: "text-caution-yellow", bgColor: "bg-caution-yellow/10", icon: AlertTriangle, label: "Pendente" };
      case "condenado":
        return { color: "text-alert-red", bgColor: "bg-alert-red/10", icon: XCircle, label: "Condenado" };
    }
  };

  const getVerificationStatusConfig = (status: "ok" | "warning" | "danger") => {
    switch (status) {
      case "ok":
        return { color: "text-safe-green", bgColor: "bg-safe-green/10", icon: CheckCircle };
      case "warning":
        return { color: "text-caution-yellow", bgColor: "bg-caution-yellow/10", icon: AlertTriangle };
      case "danger":
        return { color: "text-alert-red", bgColor: "bg-alert-red/10", icon: XCircle };
    }
  };

  const exportToPDF = () => {
    if (!result) return;
    
    const doc = new jsPDF();
    let yPos = 20;

    const addText = (text: string, x: number, y: number, options?: { fontSize?: number; fontStyle?: string; color?: number[] }) => {
      doc.setFontSize(options?.fontSize || 12);
      if (options?.color) {
        doc.setTextColor(options.color[0], options.color[1], options.color[2]);
      } else {
        doc.setTextColor(0, 0, 0);
      }
      doc.text(text, x, y);
    };

    // Header
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, 220, 35, 'F');
    addText("SAFE YOU", 15, 15, { fontSize: 20, fontStyle: "bold", color: [255, 255, 255] });
    addText("Relatório de Consulta de Segurança", 15, 25, { fontSize: 12, color: [255, 255, 255] });

    yPos = 50;

    // Risk Status
    const riskColors = {
      seguro: [34, 197, 94],
      alerta: [234, 179, 8],
      perigo: [239, 68, 68]
    };
    const riskLabels = {
      seguro: "PERFIL SEGURO",
      alerta: "ATENÇÃO RECOMENDADA",
      perigo: "ALTO RISCO"
    };
    
    doc.setFillColor(riskColors[result.nivelRisco][0], riskColors[result.nivelRisco][1], riskColors[result.nivelRisco][2]);
    doc.roundedRect(15, yPos - 5, 180, 15, 3, 3, 'F');
    addText(riskLabels[result.nivelRisco], 20, yPos + 5, { fontSize: 12, fontStyle: "bold", color: [255, 255, 255] });
    yPos += 25;

    // Date/Time
    addText(`Data da Consulta: ${currentDate} às ${currentTime}`, 15, yPos, { fontSize: 10, color: [100, 100, 100] });
    yPos += 15;

    // Personal Data
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(15, yPos - 5, 180, 55, 3, 3, 'F');
    addText("DADOS PESSOAIS", 20, yPos + 5, { fontSize: 11, fontStyle: "bold" });
    yPos += 15;

    addText("Nome:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
    addText(result.pessoa.nomeCompleto, 50, yPos, { fontSize: 10 });
    yPos += 8;

    addText("CPF:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
    addText(result.pessoa.cpf, 50, yPos, { fontSize: 10 });
    yPos += 8;

    addText("Nascimento:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
    addText(`${result.pessoa.dataNascimento} (${result.pessoa.idade} anos)`, 50, yPos, { fontSize: 10 });
    yPos += 8;

    addText("Telefone:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
    addText(result.pessoa.telefone, 50, yPos, { fontSize: 10 });
    yPos += 8;

    addText("Cidade:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
    addText(`${result.pessoa.cidade}/${result.pessoa.estado}`, 50, yPos, { fontSize: 10 });
    yPos += 20;

    // Judicial Results
    addText("RESULTADOS JUDICIAIS", 15, yPos, { fontSize: 11, fontStyle: "bold" });
    yPos += 10;

    result.resultadosJudiciais.forEach((item) => {
      const statusLabels = { limpo: "✓ Limpo", pendente: "! Pendente", condenado: "✗ Condenado" };
      addText(`${item.tipo}:`, 20, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(`${statusLabels[item.status]} - ${item.descricao}`, 55, yPos, { fontSize: 10 });
      yPos += 8;
    });

    yPos += 10;

    // Other Verifications
    addText("OUTRAS VERIFICAÇÕES", 15, yPos, { fontSize: 11, fontStyle: "bold" });
    yPos += 10;

    result.outrasVerificacoes.forEach((item) => {
      addText(`${item.categoria}:`, 20, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(item.descricao, 70, yPos, { fontSize: 10 });
      yPos += 8;
    });

    // Footer
    yPos = 280;
    doc.setDrawColor(200, 200, 200);
    doc.line(15, yPos - 10, 195, yPos - 10);
    addText("Safe You - Sua segurança em primeiro lugar", 15, yPos, { fontSize: 8, color: [150, 150, 150] });
    addText(`Gerado em ${currentDate} às ${currentTime}`, 140, yPos, { fontSize: 8, color: [150, 150, 150] });

    const fileName = `consulta-${currentDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
    
    toast.success("PDF exportado com sucesso!");
  };

  if (!hasSearchData || !result) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Consulta não encontrada</h1>
          <p className="text-muted-foreground mb-6">Nenhum dado de consulta foi informado.</p>
          <Button onClick={() => navigate("/dashboard/consulta")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
        </div>
      </div>
    );
  }

  const riskConfig = getRiskConfig(result.nivelRisco);
  const RiskIcon = riskConfig.icon;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/dashboard/consulta")}
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <FileText className="w-7 h-7 text-primary" />
                Resultado da Consulta
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Consultado em {currentDate} às {currentTime}
              </p>
            </div>
            <Button 
              onClick={exportToPDF}
              className="bg-gradient-to-r from-rose-soft to-lavender text-white gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`border-2 ${riskConfig.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className={`p-4 rounded-2xl ${riskConfig.color}`}
                >
                  <RiskIcon className="w-10 h-10" />
                </motion.div>
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className={`${riskConfig.color} text-base px-4 py-1.5`}>
                      {riskConfig.label}
                    </Badge>
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {riskConfig.description}
                  </p>
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
                Dados Pessoais
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
                  {result.pessoa.nomeCompleto}
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
                  <p className="font-mono font-medium text-foreground">{result.pessoa.cpf}</p>
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
                  <p className="font-medium text-foreground">{result.pessoa.dataNascimento}</p>
                  <p className="text-xs text-muted-foreground">{result.pessoa.idade} anos</p>
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
                  <p className="font-medium text-foreground">{result.pessoa.telefone}</p>
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
                  <p className="font-medium text-foreground">
                    {result.pessoa.cidade}/{result.pessoa.estado}
                  </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.resultadosJudiciais.map((item, index) => {
                  const statusConfig = getJudicialStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <motion.div
                      key={item.tipo}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-xl border ${statusConfig.bgColor} border-transparent`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                          <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-foreground">{item.tipo}</p>
                            <Badge variant="outline" className={statusConfig.color}>
                              {statusConfig.label}
                              {item.quantidade && ` (${item.quantidade})`}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.descricao}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
                {result.outrasVerificacoes.map((item, index) => {
                  const statusConfig = getVerificationStatusConfig(item.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <motion.div
                      key={item.categoria}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`p-4 rounded-xl ${statusConfig.bgColor}`}
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                        <div>
                          <p className="font-medium text-foreground">{item.categoria}</p>
                          <p className="text-sm text-muted-foreground">{item.descricao}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
