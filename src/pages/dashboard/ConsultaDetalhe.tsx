import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Clock, 
  FileText,
  User,
  Phone,
  MapPin,
  Scale,
  Download,
  CreditCard,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

// Dados simulados das consultas com informações pessoais
const consultasData: Record<string, {
  id: string;
  cpf: string;
  date: string;
  time: string;
  status: "seguro" | "alerta" | "perigo";
  pessoa: {
    nomeCompleto: string;
    idade: number;
    dataNascimento: string;
    telefone: string;
    cidade: string;
    estado: string;
  };
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
}> = {
  "1": {
    id: "1",
    cpf: "123.456.789-00",
    date: "19/01/2026",
    time: "14:30",
    status: "seguro",
    pessoa: {
      nomeCompleto: "João Carlos da Silva Santos",
      idade: 34,
      dataNascimento: "15/03/1991",
      telefone: "(11) 98765-4321",
      cidade: "São Paulo",
      estado: "SP"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "limpo", descricao: "Nenhum antecedente criminal encontrado" },
      { tipo: "Cível", status: "limpo", descricao: "Nenhum processo cível ativo" },
      { tipo: "Trabalhista", status: "limpo", descricao: "Nenhum processo trabalhista" },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências na justiça federal" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "ok", descricao: "Regular na Receita Federal" },
      { categoria: "Restrições Financeiras", status: "ok", descricao: "Sem restrições no SPC/Serasa" },
    ],
  },
  "2": {
    id: "2",
    cpf: "987.654.321-00",
    date: "18/01/2026",
    time: "10:15",
    status: "alerta",
    pessoa: {
      nomeCompleto: "Ricardo Almeida Ferreira",
      idade: 42,
      dataNascimento: "22/07/1983",
      telefone: "(21) 97654-3210",
      cidade: "Rio de Janeiro",
      estado: "RJ"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "limpo", descricao: "Nenhum antecedente criminal encontrado" },
      { tipo: "Cível", status: "pendente", descricao: "1 processo cível em andamento", quantidade: 1 },
      { tipo: "Trabalhista", status: "limpo", descricao: "Nenhum processo trabalhista" },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências na justiça federal" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "ok", descricao: "Regular na Receita Federal" },
      { categoria: "Restrições Financeiras", status: "warning", descricao: "Restrição menor identificada" },
    ],
  },
  "3": {
    id: "3",
    cpf: "456.789.123-00",
    date: "17/01/2026",
    time: "16:45",
    status: "perigo",
    pessoa: {
      nomeCompleto: "Carlos Eduardo Pereira Lima",
      idade: 38,
      dataNascimento: "10/11/1987",
      telefone: "(31) 96543-2109",
      cidade: "Belo Horizonte",
      estado: "MG"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "condenado", descricao: "Antecedente criminal registrado", quantidade: 2 },
      { tipo: "Cível", status: "pendente", descricao: "Múltiplos processos cíveis", quantidade: 4 },
      { tipo: "Trabalhista", status: "pendente", descricao: "Processos trabalhistas ativos", quantidade: 2 },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências na justiça federal" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "warning", descricao: "CPF com pendências" },
      { categoria: "Restrições Financeiras", status: "danger", descricao: "Múltiplas restrições graves" },
    ],
  },
  "4": {
    id: "4",
    cpf: "321.654.987-00",
    date: "16/01/2026",
    time: "09:20",
    status: "seguro",
    pessoa: {
      nomeCompleto: "Fernando Henrique Costa",
      idade: 29,
      dataNascimento: "05/06/1996",
      telefone: "(41) 95432-1098",
      cidade: "Curitiba",
      estado: "PR"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "limpo", descricao: "Nenhum antecedente criminal" },
      { tipo: "Cível", status: "limpo", descricao: "Nenhum processo cível" },
      { tipo: "Trabalhista", status: "limpo", descricao: "Nenhum processo trabalhista" },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências federais" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "ok", descricao: "Regular na Receita Federal" },
      { categoria: "Restrições Financeiras", status: "ok", descricao: "Sem restrições" },
    ],
  },
  "5": {
    id: "5",
    cpf: "789.123.456-00",
    date: "15/01/2026",
    time: "11:00",
    status: "perigo",
    pessoa: {
      nomeCompleto: "Marcos Vinícius de Souza",
      idade: 45,
      dataNascimento: "18/02/1980",
      telefone: "(51) 94321-0987",
      cidade: "Porto Alegre",
      estado: "RS"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "condenado", descricao: "Múltiplos antecedentes", quantidade: 3 },
      { tipo: "Cível", status: "pendente", descricao: "Processos em andamento", quantidade: 5 },
      { tipo: "Trabalhista", status: "pendente", descricao: "Processos trabalhistas", quantidade: 3 },
      { tipo: "Federal", status: "pendente", descricao: "Pendências federais", quantidade: 1 },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "danger", descricao: "CPF irregular" },
      { categoria: "Restrições Financeiras", status: "danger", descricao: "Múltiplas restrições" },
    ],
  },
  "6": {
    id: "6",
    cpf: "654.987.321-00",
    date: "14/01/2026",
    time: "15:30",
    status: "seguro",
    pessoa: {
      nomeCompleto: "André Luiz Barbosa",
      idade: 31,
      dataNascimento: "25/09/1994",
      telefone: "(61) 93210-9876",
      cidade: "Brasília",
      estado: "DF"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "limpo", descricao: "Sem antecedentes" },
      { tipo: "Cível", status: "limpo", descricao: "Sem processos" },
      { tipo: "Trabalhista", status: "limpo", descricao: "Sem processos" },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "ok", descricao: "Regular" },
      { categoria: "Restrições Financeiras", status: "ok", descricao: "Sem restrições" },
    ],
  },
  "7": {
    id: "7",
    cpf: "147.258.369-00",
    date: "13/01/2026",
    time: "08:45",
    status: "alerta",
    pessoa: {
      nomeCompleto: "Paulo Roberto Martins",
      idade: 36,
      dataNascimento: "12/04/1989",
      telefone: "(71) 92109-8765",
      cidade: "Salvador",
      estado: "BA"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "limpo", descricao: "Sem antecedentes" },
      { tipo: "Cível", status: "pendente", descricao: "Processo em andamento", quantidade: 1 },
      { tipo: "Trabalhista", status: "limpo", descricao: "Sem processos" },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "ok", descricao: "Regular" },
      { categoria: "Restrições Financeiras", status: "warning", descricao: "Pendência menor" },
    ],
  },
  "8": {
    id: "8",
    cpf: "369.258.147-00",
    date: "12/01/2026",
    time: "17:10",
    status: "seguro",
    pessoa: {
      nomeCompleto: "Gustavo Henrique Oliveira",
      idade: 27,
      dataNascimento: "30/12/1998",
      telefone: "(81) 91098-7654",
      cidade: "Recife",
      estado: "PE"
    },
    resultadosJudiciais: [
      { tipo: "Criminal", status: "limpo", descricao: "Sem antecedentes" },
      { tipo: "Cível", status: "limpo", descricao: "Sem processos" },
      { tipo: "Trabalhista", status: "limpo", descricao: "Sem processos" },
      { tipo: "Federal", status: "limpo", descricao: "Sem pendências" },
    ],
    outrasVerificacoes: [
      { categoria: "Situação CPF", status: "ok", descricao: "Regular" },
      { categoria: "Restrições Financeiras", status: "ok", descricao: "Sem restrições" },
    ],
  },
};

const ConsultaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const consulta = id ? consultasData[id] : null;

  if (!consulta) {
    return (
      <div className="min-h-screen bg-background p-6">
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
      label: "Perfil Seguro",
      color: "bg-safe-green/20 text-safe-green border-safe-green/30",
      icon: CheckCircle,
      bgColor: "bg-safe-green",
      textColor: "text-safe-green",
    },
    alerta: {
      label: "Atenção Recomendada",
      color: "bg-caution-yellow/20 text-caution-yellow border-caution-yellow/30",
      icon: AlertTriangle,
      bgColor: "bg-caution-yellow",
      textColor: "text-caution-yellow",
    },
    perigo: {
      label: "Alto Risco",
      color: "bg-alert-red/20 text-alert-red border-alert-red/30",
      icon: XCircle,
      bgColor: "bg-alert-red",
      textColor: "text-alert-red",
    },
  };

  const judicialStatusConfig = {
    limpo: {
      icon: CheckCircle,
      color: "text-safe-green",
      bg: "bg-safe-green/10",
      label: "Limpo"
    },
    pendente: {
      icon: AlertTriangle,
      color: "text-caution-yellow",
      bg: "bg-caution-yellow/10",
      label: "Pendente"
    },
    condenado: {
      icon: XCircle,
      color: "text-alert-red",
      bg: "bg-alert-red/10",
      label: "Registrado"
    },
  };

  const verificationStatusConfig = {
    ok: {
      icon: CheckCircle,
      color: "text-safe-green",
      bg: "bg-safe-green/10",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-caution-yellow",
      bg: "bg-caution-yellow/10",
    },
    danger: {
      icon: XCircle,
      color: "text-alert-red",
      bg: "bg-alert-red/10",
    },
  };

  const config = statusConfig[consulta.status];
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/historico")}
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Histórico
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <FileText className="w-7 h-7 text-primary" />
                Resultado da Consulta
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Consultado em {consulta.date} às {consulta.time}
              </p>
            </div>
            <Button className="bg-gradient-to-r from-rose-soft to-lavender text-white gap-2">
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
          <Card className={`border-2 ${config.color.split(' ')[2]}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className={`p-4 rounded-2xl ${config.color}`}
                >
                  <StatusIcon className="w-10 h-10" />
                </motion.div>
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className={`${config.color} text-base px-4 py-1.5 animate-pulse`}>
                      {config.label}
                    </Badge>
                  </motion.div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {consulta.status === "seguro" && "Não foram encontradas pendências ou alertas significativos."}
                    {consulta.status === "alerta" && "Foram encontrados alguns pontos que merecem atenção."}
                    {consulta.status === "perigo" && "Foram encontradas pendências importantes. Tenha cautela."}
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
                {/* Nível Seguro */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-safe-green/5 border border-safe-green/20">
                  <div className="p-2 rounded-full bg-safe-green/20">
                    <CheckCircle className="w-4 h-4 text-safe-green" />
                  </div>
                  <div>
                    <p className="font-medium text-safe-green text-sm">Perfil Seguro</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Nenhuma pendência encontrada. Histórico limpo e sem alertas.
                    </p>
                  </div>
                </div>

                {/* Nível Alerta */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-caution-yellow/5 border border-caution-yellow/20">
                  <div className="p-2 rounded-full bg-caution-yellow/20">
                    <AlertTriangle className="w-4 h-4 text-caution-yellow" />
                  </div>
                  <div>
                    <p className="font-medium text-caution-yellow text-sm">Atenção Recomendada</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Alguns pontos de atenção. Avalie com cuidado antes de prosseguir.
                    </p>
                  </div>
                </div>

                {/* Nível Perigo */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-alert-red/5 border border-alert-red/20">
                  <div className="p-2 rounded-full bg-alert-red/20">
                    <XCircle className="w-4 h-4 text-alert-red" />
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
              {/* Nome Completo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-sm text-muted-foreground mb-1">Nome Completo</p>
                <p className="text-xl font-semibold text-foreground">
                  {consulta.pessoa.nomeCompleto}
                </p>
              </motion.div>

              <Separator />

              {/* Info Grid */}
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
                  <p className="font-mono font-medium text-foreground">{consulta.cpf}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Idade</span>
                  </div>
                  <p className="font-medium text-foreground">{consulta.pessoa.idade} anos</p>
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
                  <p className="font-medium text-foreground">{consulta.pessoa.telefone}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="bg-muted/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Localização</span>
                  </div>
                  <p className="font-medium text-foreground">
                    {consulta.pessoa.cidade}/{consulta.pessoa.estado}
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
              <div className="grid gap-3">
                {consulta.resultadosJudiciais.map((resultado, index) => {
                  const resultConfig = judicialStatusConfig[resultado.status];
                  const ResultIcon = resultConfig.icon;

                  return (
                    <motion.div
                      key={resultado.tipo}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-xl ${resultConfig.bg} border border-border/30`}
                    >
                      <div className="flex items-center gap-4">
                        <ResultIcon className={`w-5 h-5 ${resultConfig.color}`} />
                        <div>
                          <p className="font-medium text-foreground">{resultado.tipo}</p>
                          <p className="text-sm text-muted-foreground">{resultado.descricao}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {resultado.quantidade && resultado.quantidade > 0 && (
                          <Badge variant="outline" className={`${resultConfig.color} border-current`}>
                            {resultado.quantidade} {resultado.quantidade === 1 ? 'registro' : 'registros'}
                          </Badge>
                        )}
                        <Badge className={`${resultConfig.bg} ${resultConfig.color} border-0`}>
                          {resultConfig.label}
                        </Badge>
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
                <Shield className="w-5 h-5 text-primary" />
                Outras Verificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {consulta.outrasVerificacoes.map((verificacao, index) => {
                  const verConfig = verificationStatusConfig[verificacao.status];
                  const VerIcon = verConfig.icon;

                  return (
                    <motion.div
                      key={verificacao.categoria}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl ${verConfig.bg} border border-border/30`}
                    >
                      <VerIcon className={`w-5 h-5 ${verConfig.color}`} />
                      <div>
                        <p className="font-medium text-foreground">{verificacao.categoria}</p>
                        <p className="text-sm text-muted-foreground">{verificacao.descricao}</p>
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
          transition={{ delay: 0.5 }}
          className="flex gap-4 pb-6"
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/dashboard/consulta")}
          >
            Nova Consulta
          </Button>
          <Button
            variant="outline"
            className="flex-1"
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
