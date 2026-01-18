import { motion } from "framer-motion";
import { 
  Shield, 
  ArrowLeft, 
  Eye, 
  Users, 
  MapPin, 
  Phone, 
  Lock, 
  AlertTriangle,
  Heart,
  Briefcase,
  Home,
  MessageCircle,
  Camera,
  FileText,
  CheckCircle,
  Building2,
  UserCheck,
  Scale,
  Baby,
  Car,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProtectionTips = () => {
  const womenTips = [
    {
      title: "Encontros Online",
      icon: Heart,
      color: "from-rose-soft to-rose-soft/50",
      iconColor: "text-rose-500",
      tips: [
        "Sempre faça uma verificação de antecedentes antes de encontros",
        "Marque o primeiro encontro em local público e movimentado",
        "Compartilhe sua localização com uma pessoa de confiança",
        "Não aceite caronas no primeiro encontro",
        "Confie nos seus instintos - se algo parecer errado, saia"
      ]
    },
    {
      title: "Redes Sociais",
      icon: Camera,
      color: "from-lavender-light to-lavender-light/50",
      iconColor: "text-lavender",
      tips: [
        "Configure perfis como privados",
        "Não compartilhe localização em tempo real",
        "Cuidado com fotos que revelam onde você mora",
        "Desconfie de perfis novos ou sem fotos reais",
        "Não aceite solicitações de desconhecidos"
      ]
    },
    {
      title: "Transporte e Mobilidade",
      icon: Car,
      color: "from-trust-blue/20 to-trust-blue/10",
      iconColor: "text-trust-blue",
      tips: [
        "Compartilhe a corrida com pessoas de confiança",
        "Verifique placa e foto do motorista antes de entrar",
        "Sente-se sempre no banco de trás",
        "Evite trajetos por locais isolados à noite",
        "Tenha app de emergência configurado no celular"
      ]
    },
    {
      title: "Segurança Digital",
      icon: Smartphone,
      color: "from-safe-green/20 to-safe-green/10",
      iconColor: "text-safe-green",
      tips: [
        "Use senhas fortes e diferentes para cada conta",
        "Ative autenticação em duas etapas",
        "Cuidado com links suspeitos em mensagens",
        "Não compartilhe dados bancários por mensagem",
        "Revise permissões de apps regularmente"
      ]
    }
  ];

  const familyTips = [
    {
      title: "Proteção das Crianças",
      icon: Baby,
      color: "from-rose-soft to-rose-soft/50",
      iconColor: "text-rose-500",
      tips: [
        "Verifique antecedentes de babás e cuidadores",
        "Ensine crianças sobre limites e segurança",
        "Conheça os amigos e contatos dos seus filhos",
        "Mantenha comunicação aberta sobre situações de risco",
        "Crie palavras-código para emergências familiares"
      ]
    },
    {
      title: "Segurança em Casa",
      icon: Home,
      color: "from-safe-green/20 to-safe-green/10",
      iconColor: "text-safe-green",
      tips: [
        "Verifique entregadores antes de abrir a porta",
        "Instale câmeras e interfone com vídeo",
        "Não divulgue sua rotina nas redes sociais",
        "Mantenha contatos de emergência acessíveis",
        "Conheça seus vizinhos para rede de apoio"
      ]
    },
    {
      title: "Contratação de Serviços",
      icon: UserCheck,
      color: "from-lavender-light to-lavender-light/50",
      iconColor: "text-lavender",
      tips: [
        "Verifique referências e histórico do prestador",
        "Peça documentos e comprove a identidade",
        "Nunca deixe estranhos sozinhos em sua casa",
        "Fotografe documentos de identificação",
        "Prefira profissionais indicados por conhecidos"
      ]
    },
    {
      title: "Idosos da Família",
      icon: Users,
      color: "from-amber-100 to-amber-50",
      iconColor: "text-amber-600",
      tips: [
        "Oriente sobre golpes telefônicos e virtuais",
        "Verifique cuidadores e acompanhantes",
        "Mantenha contato regular para identificar problemas",
        "Configure bloqueios em apps bancários se necessário",
        "Crie rede de vizinhos para emergências"
      ]
    }
  ];

  const businessTips = [
    {
      title: "Contratação de Funcionários",
      icon: Briefcase,
      color: "from-lavender-light to-lavender-light/50",
      iconColor: "text-lavender",
      tips: [
        "Realize verificação de antecedentes completa",
        "Confirme referências profissionais anteriores",
        "Valide documentos e certificações",
        "Faça entrevistas presenciais quando possível",
        "Implemente período de experiência estruturado"
      ]
    },
    {
      title: "Parceiros Comerciais",
      icon: Building2,
      color: "from-trust-blue/20 to-trust-blue/10",
      iconColor: "text-trust-blue",
      tips: [
        "Verifique CNPJ e situação cadastral da empresa",
        "Consulte processos judiciais e protestos",
        "Pesquise reputação em sites especializados",
        "Solicite referências de outros clientes",
        "Formalize contratos com cláusulas de proteção"
      ]
    },
    {
      title: "Transações Financeiras",
      icon: FileText,
      color: "from-safe-green/20 to-safe-green/10",
      iconColor: "text-safe-green",
      tips: [
        "Verifique CPF/CNPJ antes de negociações",
        "Nunca faça pagamentos antecipados sem garantias",
        "Pesquise a reputação em sites de reclamação",
        "Desconfie de ofertas muito vantajosas",
        "Mantenha registros de todas as transações"
      ]
    },
    {
      title: "Compliance e LGPD",
      icon: Scale,
      color: "from-purple-100 to-purple-50",
      iconColor: "text-purple-600",
      tips: [
        "Implemente políticas de proteção de dados",
        "Treine equipe sobre segurança da informação",
        "Documente processos de tratamento de dados",
        "Realize auditorias periódicas de segurança",
        "Mantenha canal de denúncias anônimas"
      ]
    }
  ];

  const quickTips = [
    { icon: Eye, text: "Sempre pesquise antes de confiar" },
    { icon: MapPin, text: "Compartilhe sua localização" },
    { icon: Phone, text: "Tenha contatos de emergência" },
    { icon: Lock, text: "Proteja suas informações" },
    { icon: AlertTriangle, text: "Confie nos seus instintos" },
    { icon: MessageCircle, text: "Mantenha comunicação com próximos" }
  ];

  const renderTipCards = (tips: typeof womenTips) => (
    <div className="grid md:grid-cols-2 gap-6">
      {tips.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-border/50">
            <CardHeader>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3`}>
                <category.icon className={`w-6 h-6 ${category.iconColor}`} />
              </div>
              <CardTitle className="text-xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {category.tips.map((tip, tipIndex) => (
                  <motion.li
                    key={tipIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + tipIndex * 0.05 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-safe-green flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-lavender" />
              <span className="font-bold text-xl text-foreground">Safe You</span>
            </Link>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lavender-light via-background to-rose-soft/20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-lavender/20 mb-6">
              <Shield className="w-5 h-5 text-lavender" />
              <span className="text-sm font-medium text-lavender">Guia de Proteção</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Dicas de Proteção
            </h1>
            <p className="text-lg text-muted-foreground">
              Orientações práticas para você se proteger em diversas situações do dia a dia. 
              Conhecimento é a sua primeira linha de defesa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips Bar */}
      <section className="bg-white border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-8 h-8 rounded-full bg-lavender-light flex items-center justify-center flex-shrink-0">
                  <tip.icon className="w-4 h-4 text-lavender" />
                </div>
                <span>{tip.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mulheres" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-10">
              <TabsTrigger value="mulheres" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Mulheres</span>
              </TabsTrigger>
              <TabsTrigger value="familia" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Família</span>
              </TabsTrigger>
              <TabsTrigger value="empresas" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Empresas</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mulheres">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Dicas para Mulheres</h2>
                  <p className="text-muted-foreground">Proteção e segurança no dia a dia</p>
                </div>
                {renderTipCards(womenTips)}
              </motion.div>
            </TabsContent>

            <TabsContent value="familia">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Dicas para Família</h2>
                  <p className="text-muted-foreground">Proteja quem você ama</p>
                </div>
                {renderTipCards(familyTips)}
              </motion.div>
            </TabsContent>

            <TabsContent value="empresas">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Dicas para Empresas</h2>
                  <p className="text-muted-foreground">Segurança corporativa e compliance</p>
                </div>
                {renderTipCards(businessTips)}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              A melhor proteção é a informação
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Use o Safe You para verificar pessoas antes de se relacionar, contratar ou fazer negócios.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-lavender text-white px-6 py-3 rounded-full font-medium hover:bg-lavender/90 transition-colors"
            >
              <Shield className="w-5 h-5" />
              Fazer uma Verificação
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6" />
            <span className="font-bold">Safe You</span>
          </div>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProtectionTips;
