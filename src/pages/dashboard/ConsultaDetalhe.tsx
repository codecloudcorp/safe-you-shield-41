import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Calendar, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Dados simulados das consultas
const consultasData: Record<string, {
  id: string;
  cpf: string;
  date: string;
  time: string;
  status: "seguro" | "alerta" | "perigo";
  results: {
    category: string;
    status: "ok" | "warning" | "danger";
    description: string;
  }[];
}> = {
  "1": {
    id: "1",
    cpf: "123.456.789-00",
    date: "15/01/2024",
    time: "14:32",
    status: "seguro",
    results: [
      { category: "Antecedentes Criminais", status: "ok", description: "Nenhum registro encontrado" },
      { category: "Processos Judiciais", status: "ok", description: "Nenhum processo ativo" },
      { category: "Situação Financeira", status: "ok", description: "Score positivo" },
      { category: "Redes Sociais", status: "ok", description: "Perfil verificado" },
    ],
  },
  "2": {
    id: "2",
    cpf: "987.654.321-00",
    date: "14/01/2024",
    time: "10:15",
    status: "alerta",
    results: [
      { category: "Antecedentes Criminais", status: "ok", description: "Nenhum registro encontrado" },
      { category: "Processos Judiciais", status: "warning", description: "1 processo encontrado (cível)" },
      { category: "Situação Financeira", status: "warning", description: "Restrições menores" },
      { category: "Redes Sociais", status: "ok", description: "Perfil verificado" },
    ],
  },
  "3": {
    id: "3",
    cpf: "456.789.123-00",
    date: "13/01/2024",
    time: "16:45",
    status: "perigo",
    results: [
      { category: "Antecedentes Criminais", status: "danger", description: "Registros encontrados" },
      { category: "Processos Judiciais", status: "danger", description: "Múltiplos processos ativos" },
      { category: "Situação Financeira", status: "warning", description: "Restrições severas" },
      { category: "Redes Sociais", status: "warning", description: "Perfil não verificado" },
    ],
  },
};

const ConsultaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const consulta = id ? consultasData[id] : null;

  if (!consulta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Consulta não encontrada</h1>
          <p className="text-muted-foreground mb-6">A consulta que você está procurando não existe.</p>
          <Button onClick={() => navigate("/dashboard/historico")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Histórico
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = {
    seguro: {
      label: "Seguro",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: CheckCircle,
      bgGradient: "from-green-500/10 to-transparent",
    },
    alerta: {
      label: "Alerta",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: AlertTriangle,
      bgGradient: "from-yellow-500/10 to-transparent",
    },
    perigo: {
      label: "Perigo",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      icon: XCircle,
      bgGradient: "from-red-500/10 to-transparent",
    },
  };

  const resultStatusConfig = {
    ok: {
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    danger: {
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  };

  const config = statusConfig[consulta.status];
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/historico")}
            className="mb-4 hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Histórico
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                Detalhes da Consulta
              </h1>
              <p className="text-muted-foreground mt-1">
                Resultado completo da verificação de segurança
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`bg-gradient-to-r ${config.bgGradient} border-white/10 mb-6`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-full ${config.color}`}>
                    <StatusIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status da Consulta</p>
                    <Badge className={`${config.color} text-lg px-4 py-1 mt-1`}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{consulta.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{consulta.time}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CPF Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                CPF Consultado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono font-bold text-foreground">{consulta.cpf}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Resultados da Verificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {consulta.results.map((result, index) => {
                  const resultConfig = resultStatusConfig[result.status];
                  const ResultIcon = resultConfig.icon;

                  return (
                    <motion.div
                      key={result.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-lg ${resultConfig.bg} border border-white/5`}
                    >
                      <div className="flex items-center gap-4">
                        <ResultIcon className={`w-6 h-6 ${resultConfig.color}`} />
                        <div>
                          <p className="font-medium text-foreground">{result.category}</p>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex gap-4"
        >
          <Button
            variant="outline"
            className="flex-1 border-white/10 hover:bg-white/5"
            onClick={() => navigate("/dashboard/consulta")}
          >
            Nova Consulta
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => window.print()}
          >
            Exportar PDF
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultaDetalhe;
