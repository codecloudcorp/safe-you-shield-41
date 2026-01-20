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
  Clock
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
  
  const stateData = location.state as {
    cpf?: string;
    phone?: string;
    name?: string;
  } | null;

  const hasSearchData = stateData?.cpf || stateData?.phone || stateData?.name;

  const currentDate = new Date().toLocaleDateString('pt-BR');
  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const exportToPDF = () => {
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

    // Status
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(15, yPos - 5, 180, 15, 3, 3, 'F');
    addText("CONSULTA REALIZADA", 20, yPos + 5, { fontSize: 12, fontStyle: "bold", color: [255, 255, 255] });
    yPos += 25;

    // Date/Time
    addText(`Data da Consulta: ${currentDate} às ${currentTime}`, 15, yPos, { fontSize: 10, color: [100, 100, 100] });
    yPos += 15;

    // Search Data
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(15, yPos - 5, 180, 40, 3, 3, 'F');
    addText("DADOS CONSULTADOS", 20, yPos + 5, { fontSize: 11, fontStyle: "bold" });
    yPos += 15;

    if (stateData?.cpf) {
      addText("CPF:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(stateData.cpf, 60, yPos, { fontSize: 10 });
      yPos += 8;
    }
    if (stateData?.phone) {
      addText("Telefone:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(stateData.phone, 60, yPos, { fontSize: 10 });
      yPos += 8;
    }
    if (stateData?.name) {
      addText("Nome:", 20, yPos, { fontSize: 10, fontStyle: "bold" });
      addText(stateData.name, 60, yPos, { fontSize: 10 });
      yPos += 8;
    }

    yPos += 20;

    // Note
    addText("Nota: Esta consulta foi registrada em nosso sistema.", 15, yPos, { fontSize: 9, color: [100, 100, 100] });
    yPos += 10;
    addText("Para mais informações, acesse o dashboard.", 15, yPos, { fontSize: 9, color: [100, 100, 100] });

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

  if (!hasSearchData) {
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
        {/* Dados Consultados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="w-5 h-5 text-primary" />
                Dados Utilizados na Consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stateData?.cpf && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-background rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-xs font-medium">CPF</span>
                    </div>
                    <p className="font-mono font-semibold text-foreground">{stateData.cpf}</p>
                  </motion.div>
                )}
                {stateData?.phone && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-background rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-medium">Telefone</span>
                    </div>
                    <p className="font-mono font-semibold text-foreground">{stateData.phone}</p>
                  </motion.div>
                )}
                {stateData?.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-background rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-medium">Nome</span>
                    </div>
                    <p className="font-semibold text-foreground">{stateData.name}</p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status da Consulta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="p-4 rounded-2xl bg-blue-500 text-white"
                >
                  <Clock className="w-10 h-10" />
                </motion.div>
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className="bg-blue-500 text-white text-base px-4 py-1.5">
                      Consulta Registrada
                    </Badge>
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sua consulta foi registrada com sucesso. Os dados serão processados em breve.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Informações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Info className="w-4 h-4" />
                Informações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                  <CheckCircle className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Consulta registrada</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Sua solicitação foi recebida e está sendo processada.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                  <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Tempo de processamento</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Os resultados completos estarão disponíveis em breve.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Histórico</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Esta consulta ficará salva no seu histórico para futuras referências.
                    </p>
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
          transition={{ delay: 0.3 }}
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
