import { useState } from "react";
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
  Smartphone,
  HandMetal
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Import signal images
import signalHelpGesture from "@/assets/signal-help-gesture.png";
import angelShotSignal from "@/assets/angel-shot-signal.png";
import safetyWordSignal from "@/assets/safety-word-signal.png";

const ProtectionTips = () => {
  const [activeTab, setActiveTab] = useState("mulheres");

  const themeColors = {
    mulheres: {
      gradient: "from-rose-soft/20 via-lavender-light/30 to-background",
      badge: "border-rose-soft/30 bg-rose-soft/10",
      badgeText: "text-rose-soft",
      icon: "text-rose-soft"
    },
    familia: {
      gradient: "from-safe-green/20 via-safe-green/10 to-background",
      badge: "border-safe-green/30 bg-safe-green/10",
      badgeText: "text-safe-green",
      icon: "text-safe-green"
    },
    empresas: {
      gradient: "from-trust-blue/20 via-trust-blue/10 to-background",
      badge: "border-trust-blue/30 bg-trust-blue/10",
      badgeText: "text-trust-blue",
      icon: "text-trust-blue"
    }
  };

  const currentTheme = themeColors[activeTab as keyof typeof themeColors];

  const helpSignals = [
    {
      title: "Sinal de Socorro",
      description: "Palma aberta, polegar dobrado, fechar os dedos sobre o polegar",
      image: signalHelpGesture,
      steps: [
        "Mostre a palma da mão aberta",
        "Dobre o polegar para dentro",
        "Feche os outros dedos sobre o polegar"
      ]
    },
    {
      title: "Código no Bar",
      description: "Peça um 'Angel Shot' ou 'Drink Angela' para alertar o bartender",
      image: angelShotSignal,
      steps: [
        "Peça 'Angel Shot' = Preciso de ajuda",
        "Angel Shot 'Neat' = Preciso de escolta até o carro",
        "Angel Shot 'On the rocks' = Chame um táxi/Uber",
        "Angel Shot 'With lime' = Chame a polícia"
      ]
    },
    {
      title: "Palavra de Segurança",
      description: "Combine uma palavra-código com família/amigas para emergências",
      image: safetyWordSignal,
      steps: [
        "Escolha uma palavra discreta e fácil de usar",
        "Combine com pessoas de confiança o que significa",
        "Use em ligações ou mensagens quando precisar de ajuda",
        "Exemplo: 'Lembra de comprar maçãs' = 'Preciso de ajuda'"
      ]
    }
  ];

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
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                  <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription className="mt-1">{category.tips.length} dicas importantes</CardDescription>
                </div>
              </div>
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

  const renderHelpSignalsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-10"
    >
      <div className="bg-gradient-to-br from-rose-soft/30 via-lavender-light/20 to-background rounded-2xl p-6 md:p-8 border border-rose-soft/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-soft to-rose-400 flex items-center justify-center">
            <HandMetal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Sinais de Ajuda</h3>
            <p className="text-sm text-muted-foreground">Aprenda gestos e códigos para pedir socorro discretamente</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {helpSignals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-border/50 overflow-hidden">
                {/* Signal Image */}
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={signal.image} 
                    alt={signal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{signal.title}</CardTitle>
                  <CardDescription className="text-xs">{signal.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {signal.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-lavender-light flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-lavender">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/60 rounded-xl border border-lavender/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Importante</p>
              <p className="text-xs text-muted-foreground mt-1">
                Esses sinais são reconhecidos internacionalmente. Pratique-os e compartilhe com amigas e familiares. 
                Em situações de perigo, use-os discretamente para alertar pessoas ao seu redor ou estabelecimentos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar</span>
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
      <motion.section 
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`bg-gradient-to-br ${currentTheme.gradient} py-12 md:py-16 transition-colors duration-500`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border ${currentTheme.badge} mb-4 transition-colors duration-300`}>
              <Shield className={`w-5 h-5 ${currentTheme.icon} transition-colors duration-300`} />
              <span className={`text-sm font-medium ${currentTheme.badgeText} transition-colors duration-300`}>Guia de Proteção</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              Dicas de Proteção
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              Orientações práticas para você se proteger. Conhecimento é sua primeira linha de defesa.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mulheres" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 h-12">
              <TabsTrigger value="mulheres" className="flex items-center gap-2 data-[state=active]:bg-rose-soft/30">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Mulheres</span>
              </TabsTrigger>
              <TabsTrigger value="familia" className="flex items-center gap-2 data-[state=active]:bg-safe-green/20">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Família</span>
              </TabsTrigger>
              <TabsTrigger value="empresas" className="flex items-center gap-2 data-[state=active]:bg-trust-blue/20">
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
                  <h2 className="text-2xl font-bold text-foreground mb-2">Proteção e Segurança</h2>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                    Dicas essenciais para sua segurança no dia a dia, desde encontros até segurança digital
                  </p>
                </div>

                {/* Help Signals Section */}
                {renderHelpSignalsSection()}

                <Separator className="my-8" />

                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-lavender" />
                  Dicas de Prevenção
                </h3>

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
                  <h2 className="text-2xl font-bold text-foreground mb-2">Proteja Quem Você Ama</h2>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                    Orientações para manter toda a família segura em casa e fora dela
                  </p>
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
                  <h2 className="text-2xl font-bold text-foreground mb-2">Segurança Corporativa</h2>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                    Boas práticas para contratações, parcerias e compliance empresarial
                  </p>
                </div>
                {renderTipCards(businessTips)}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 bg-gradient-to-r ${
        activeTab === "mulheres" ? "from-rose-soft/10 to-lavender/10" :
        activeTab === "familia" ? "from-safe-green/10 to-safe-green/5" :
        "from-trust-blue/10 to-trust-blue/5"
      } transition-colors duration-500`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-foreground mb-3">
              A melhor proteção é a informação
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Use o Safe You para verificar pessoas antes de se relacionar, contratar ou fazer negócios.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-lavender text-white px-6 py-3 rounded-full font-medium hover:bg-lavender/90 transition-colors shadow-lg hover:shadow-xl"
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
