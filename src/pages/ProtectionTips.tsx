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
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProtectionTips = () => {
  const tipCategories = [
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
      title: "Contratação de Serviços",
      icon: Briefcase,
      color: "from-lavender-light to-lavender-light/50",
      iconColor: "text-lavender",
      tips: [
        "Verifique referências e histórico do prestador de serviço",
        "Peça documentos e comprove a identidade antes de contratar",
        "Nunca deixe estranhos sozinhos em sua casa",
        "Fotografe documentos de identificação",
        "Prefira profissionais indicados por conhecidos"
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
      title: "Redes Sociais",
      icon: Camera,
      color: "from-trust-blue/20 to-trust-blue/10",
      iconColor: "text-trust-blue",
      tips: [
        "Configure perfis como privados",
        "Não compartilhe localização em tempo real",
        "Cuidado com fotos que revelam onde você mora",
        "Desconfie de perfis novos ou sem fotos reais",
        "Não aceite solicitações de desconhecidos"
      ]
    },
    {
      title: "Transações Financeiras",
      icon: FileText,
      color: "from-amber-100 to-amber-50",
      iconColor: "text-amber-600",
      tips: [
        "Verifique CPF/CNPJ antes de negociações",
        "Nunca faça PIX antecipado para desconhecidos",
        "Pesquise a reputação em sites de reclamação",
        "Desconfie de ofertas muito vantajosas",
        "Mantenha registros de todas as conversas"
      ]
    },
    {
      title: "Proteção Familiar",
      icon: Users,
      color: "from-purple-100 to-purple-50",
      iconColor: "text-purple-600",
      tips: [
        "Verifique antecedentes de babás e cuidadores",
        "Ensine crianças sobre limites e segurança",
        "Conheça os amigos e contatos dos seus filhos",
        "Mantenha comunicação aberta sobre situações de risco",
        "Crie palavras-código para emergências familiares"
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

      {/* Tips Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipCategories.map((category, index) => (
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
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-gradient-to-r from-lavender/10 to-rose-soft/20 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-soft max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Em Caso de Emergência</h2>
            <p className="text-muted-foreground mb-6">
              Se você está em uma situação de perigo imediato, ligue para os serviços de emergência.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-600">190</p>
                <p className="text-sm text-muted-foreground">Polícia Militar</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-orange-600">192</p>
                <p className="text-sm text-muted-foreground">SAMU</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-purple-600">180</p>
                <p className="text-sm text-muted-foreground">Central da Mulher</p>
              </div>
            </div>
          </motion.div>
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
