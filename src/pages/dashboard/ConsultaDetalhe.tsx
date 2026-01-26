import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle, FileText, User, Phone, 
  MapPin, Scale, Download, ShieldCheck, ShieldAlert, ShieldX, Briefcase, AlertTriangle, CreditCard, Calendar, Info, Gavel
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
  
  // Recebe os dados da navegação anterior vindos do Backend Java
  const state = location.state as {
    apiData?: {
        risco: string; // Valores possíveis: ALTO_RISCO, ATENCAO_RECOMENDADA, SEGURO
        resumo: string;
        detalhes: string[]; // Strings formatadas: "[TJSP] Processo... | Classe... | Assuntos..."
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

  // Lógica de Mascaramento de CPF para exibição segura
  let displayCpf = searchParams?.cpf || "Não informado";
  if (!searchParams?.cpf || searchParams.cpf.trim() === "") {
     displayCpf = "***.***.***-**"; 
  }

  // --- LÓGICA DE CLASSIFICAÇÃO DE RISCO (Conforme sua regra) ---
  const getRiskConfig = (risco: string) => {
    const nivel = risco ? risco.toUpperCase() : "SEGURO";

    switch (nivel) {
      case "ALTO_RISCO": // Vermelho - Crime Pesado
        return {
          label: "ALERTA VERMELHO: Processos Criminais",
          color: "bg-red-600 text-white shadow-red-200 shadow-lg",
          textColor: "text-red-700",
          bgLight: "bg-red-50",
          borderColor: "border-red-500",
          icon: ShieldX,
          description: "Detectados processos graves (Crimes contra a vida, violência ou patrimônio).",
          badgeColor: "bg-red-100 text-red-700 border-red-200"
        };

      case "ATENCAO_RECOMENDADA": // Amarelo - Civil/Pensão
        return {
          label: "ATENÇÃO: Processos Cíveis/Financeiros",
          color: "bg-yellow-500 text-white shadow-yellow-200 shadow-lg",
          textColor: "text-yellow-700",
          bgLight: "bg-yellow-50",
          borderColor: "border-yellow-500",
          icon: ShieldAlert,
          description: "Detectados processos relacionados a pensão, dívidas ou disputas civis.",
          badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200"
        };

      case "SEGURO": // Verde - Limpo
      default:
        return {
          label: "PERFIL SEGURO: Nada Consta",
          color: "bg-emerald-600 text-white shadow-emerald-200 shadow-lg",
          textColor: "text-emerald-700",
          bgLight: "bg-emerald-50",
          borderColor: "border-emerald-500",
          icon: ShieldCheck,
          description: "Nenhum processo criminal ou civil relevante encontrado nas bases públicas.",
          badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200"
        };
    }
  };

  const riskConfig = getRiskConfig(apiData.risco);
  const RiskIcon = riskConfig.icon;
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // Função para exportar PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Dossiê Safe You", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Data: ${currentDate} ${currentTime}`, 20, 30);
    doc.text(`Classificação: ${riskConfig.label}`, 20, 40);
    
    doc.text("Resumo:", 20, 55);
    doc.setFontSize(10);
    const splitResumo = doc.splitTextToSize(apiData.resumo, 170);
    doc.text(splitResumo, 20, 60);

    if (apiData.detalhes.length > 0) {
        doc.setFontSize(12);
        doc.text("Processos Encontrados:", 20, 80);
        doc.setFontSize(10);
        let y = 90;
        apiData.detalhes.forEach((detalhe) => {
            // Remove caracteres especiais para o PDF não quebrar
            const cleanText = detalhe.replace(/[^\w\s\-\/\.\[\]\|:,]/g, "");
            const splitDetalhe = doc.splitTextToSize(`- ${cleanText}`, 170);
            doc.text(splitDetalhe, 20, y);
            y += 7 * splitDetalhe.length;
        });
    } else {
        doc.text("Nenhum registro encontrado.", 20, 80);
    }

    doc.save(`dossie_${searchParams?.cpf || 'consulta'}.pdf`);
    toast.success("PDF gerado com dados reais!");
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/consulta")} className="mb-2 -ml-2 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4 mr-2" /> Nova Consulta
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-7 h-7 text-primary" />
                Dossiê Oficial
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Data: {currentDate} às {currentTime} • Fonte: DataJud (CNJ - Tempo Real)
              </p>
            </div>
            <Button onClick={exportToPDF} className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-sm">
              <Download className="w-4 h-4" /> Baixar PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        
        {/* CARD PRINCIPAL DE RISCO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className={`border-l-4 ${riskConfig.borderColor} overflow-hidden shadow-md`}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className={`${riskConfig.color} p-8 flex items-center justify-center min-w-[140px]`}>
                  <RiskIcon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6 flex-1 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${riskConfig.badgeColor} text-sm font-bold px-3 py-1 border`}>
                            {riskConfig.label}
                        </Badge>
                    </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Antecedentes</h2>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">{apiData.resumo}</p>
                  <p className="text-sm text-gray-500 mt-2">{riskConfig.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* DADOS DO ALVO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <User className="w-5 h-5 text-primary" />
                Dados da Busca
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nome Pesquisado</p>
                   <p className="text-lg font-medium text-gray-900">{searchParams?.name || "---"}</p>
                </div>
                <div>
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">CPF</p>
                   <p className="text-lg font-mono font-medium text-gray-900 flex items-center gap-2">
                     <CreditCard className="w-4 h-4 text-gray-400" /> {displayCpf}
                   </p>
                </div>
                <div>
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Telefone Vinculado</p>
                   <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
                     <Phone className="w-4 h-4 text-gray-400" /> {searchParams?.phone || "---"}
                   </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* LISTA REAL DE PROCESSOS (PARSING DO RETORNO JAVA) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                    <Scale className="w-5 h-5 text-primary" />
                    Registros Encontrados ({apiData.detalhes.length})
                  </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {apiData.detalhes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Nada Consta</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Nenhum registro judicial público foi encontrado para os dados informados nos tribunais consultados.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {apiData.detalhes.map((detalheRaw: string, index: number) => {
                    // PARSER INTELIGENTE: Transforma a string do Java em UI
                    // Formato esperado: "[SIGLA] Processo: 123... | Classe: ... | Assuntos: ..."
                    
                    // 1. Extrai a sigla [TJSP]
                    const matchSigla = detalheRaw.match(/^\[(.*?)\]/);
                    const sigla = matchSigla ? matchSigla[1] : "TRIBUNAL";
                    
                    // 2. Remove a sigla do texto restante
                    let textoRestante = detalheRaw.replace(/^\[.*?\]\s*/, "");
                    
                    // 3. Tenta quebrar por pipes '|' se existirem, senão exibe tudo
                    const partes = textoRestante.split('|').map(p => p.trim());
                    const numeroProcesso = partes[0] || textoRestante;
                    const classeProcessual = partes[1] || "";
                    const assuntos = partes[2] || "";

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:border-primary/50 hover:shadow-md transition-all"
                      >
                        {/* Sigla do Tribunal */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-center">
                                <Gavel className="w-5 h-5 text-gray-500 mb-1" />
                                <span className="text-xs font-bold text-gray-700">{sigla}</span>
                            </div>
                        </div>

                        {/* Conteúdo do Processo */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-gray-900 truncate">
                                {numeroProcesso}
                            </h4>
                            
                            {classeProcessual && (
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs font-normal text-gray-600 bg-gray-50">
                                        {classeProcessual.replace("Classe:", "").trim()}
                                    </Badge>
                                </div>
                            )}

                            {assuntos && (
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                    <span className="font-medium text-gray-700">Assuntos:</span> {assuntos.replace("Assuntos:", "").trim()}
                                </p>
                            )}
                        </div>

                        {/* Botão de Ver Detalhes (Link Externo simulado ou real se tiver URL) */}
                        <div className="flex-shrink-0 self-center">
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                                <FileText className="w-4 h-4 mr-2" /> Ver Autos
                            </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultaDetalhe;