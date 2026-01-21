import { motion } from "framer-motion";
import { Shield, Heart, Users, TrendingUp, Gift, Star, CheckCircle2, ArrowRight, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom"; // Import adicionado

const Embaixadoras = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Comissões Atrativas",
      description: "Ganhe até 30% de comissão recorrente sobre cada indicação que se tornar cliente.",
    },
    {
      icon: Heart,
      title: "Impacto Real",
      description: "Ajude pessoas a se protegerem e viverem com mais segurança e tranquilidade.",
    },
    {
      icon: Gift,
      title: "Bônus Exclusivos",
      description: "Acesse bonificações especiais por metas alcançadas e performance.",
    },
    {
      icon: Users,
      title: "Comunidade Poderosa",
      description: "Faça parte de uma rede de mulheres empoderadas que fazem a diferença.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Cadastre-se",
      description: "Preencha o formulário e aguarde a aprovação da sua candidatura.",
    },
    {
      number: "02",
      title: "Receba seu Link",
      description: "Acesse seu painel exclusivo com link personalizado e materiais de divulgação.",
    },
    {
      number: "03",
      title: "Compartilhe",
      description: "Divulgue para sua rede e ajude pessoas a descobrirem o Safe You.",
    },
    {
      number: "04",
      title: "Ganhe",
      description: "Receba comissões sobre todas as vendas realizadas através do seu link.",
    },
  ];

  const faqs = [
    {
      question: "Preciso pagar algo para participar?",
      answer: "Não! O Programa Embaixadoras é 100% gratuito. Você não paga nada para participar.",
    },
    {
      question: "Como e quando recebo minhas comissões?",
      answer: "As comissões são pagas mensalmente via PIX ou transferência bancária, sempre no dia 10 de cada mês.",
    },
    {
      question: "Preciso ter experiência com vendas?",
      answer: "Não é necessário! Fornecemos todo o treinamento e materiais para você ter sucesso.",
    },
    {
      question: "Qual o valor da comissão?",
      answer: "Você ganha até 30% de comissão recorrente sobre cada plano vendido através do seu link.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 gradient-soft opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            >
              <Crown className="w-4 h-4" />
              <span className="font-semibold text-sm">Programa Exclusivo</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Seja uma{" "}
              <span className="text-gradient">Embaixadora</span>
              <br />
              Safe You
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              <strong>Ajude pessoas a se protegerem</strong> e ganhe comissões recorrentes 
              sobre cada indicação. Transforme sua influência em{" "}
              <span className="text-primary font-semibold">impacto e renda</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {/* Botão com Link para Cadastro */}
              <Link to="/register">
                <Button size="xl" className="gap-2 shadow-glow w-full sm:w-auto">
                  <Sparkles className="w-5 h-5" />
                  Quero Ser Embaixadora
                </Button>
              </Link>
              
              <Button size="xl" variant="outline" className="gap-2">
                Saiba Mais
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { value: "100%", label: "Gratuito para Participar" },
                { value: "24h", label: "Suporte Dedicado" },
                { value: "PIX", label: "Pagamento Rápido" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que ser uma <span className="text-gradient">Embaixadora?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mais do que ganhar dinheiro, você faz parte de um movimento que protege mulheres, famílias e empresas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border"
              >
                <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como <span className="text-gradient">Funciona?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Começar é simples e rápido. Siga os passos abaixo e comece a ganhar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-lavender/50" />
                )}
                <div className="relative z-10 w-16 h-16 mx-auto rounded-full gradient-hero flex items-center justify-center text-white font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Níveis de <span className="text-gradient">Comissão</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quanto mais você indica, mais você ganha. Suba de nível e aumente seus ganhos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { tier: "Iniciante", commission: "20%", sales: "1-10 vendas", color: "from-slate-400 to-slate-500" },
              { tier: "Gold", commission: "25%", sales: "11-50 vendas", color: "from-amber-400 to-amber-600", popular: true },
              { tier: "Premium", commission: "30%", sales: "51+ vendas", color: "from-primary to-lavender" },
            ].map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-background rounded-2xl p-6 shadow-md border ${
                  tier.popular ? "border-primary shadow-glow" : "border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Mais Popular
                  </div>
                )}
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{tier.tier}</h3>
                <div className="text-4xl font-bold text-center text-gradient mb-2">{tier.commission}</div>
                <p className="text-center text-muted-foreground text-sm">{tier.sales}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas <span className="text-gradient">Frequentes</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 border border-border"
              >
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-7">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 mx-auto rounded-full gradient-hero flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Comece Agora Mesmo
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Faça parte do movimento que protege mulheres, famílias e empresas enquanto 
              constrói sua independência financeira. O cadastro é <strong>100% gratuito</strong>.
            </p>
            
            {/* Botão Final com Link */}
            <Link to="/register">
              <Button size="xl" className="gap-2 shadow-glow w-full sm:w-auto">
                <Crown className="w-5 h-5" />
                Quero Ser Embaixadora
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground mt-4">
              Cadastro gratuito • Sem mensalidades • Comece a ganhar hoje
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Embaixadoras;