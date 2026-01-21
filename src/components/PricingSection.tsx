import { motion } from "framer-motion";
import { Check, Star, Heart, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();

  const handlePlanClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Se logado, vai direto para a aba de planos nas configurações
      navigate("/dashboard/configuracoes?tab=plano");
    } else {
      // Se não logado, vai para registro
      navigate("/register");
    }
  };

  const plans = [
    {
      name: "Consulta Avulsa",
      icon: Sparkles,
      price: "19",
      originalPrice: null,
      period: "por verificação",
      description: "Para checagens pontuais e rápidas.",
      features: [
        "1 verificação completa",
        "Consulta em todos os tribunais",
        "Resultado em segundos",
        "Relatório básico em PDF",
      ],
      cta: "Fazer Consulta",
      variant: "outline" as const,
      popular: false,
      highlight: false,
    },
    {
      name: "Plano Mensal",
      icon: Heart,
      price: "29",
      originalPrice: "39",
      period: "por mês",
      description: "Proteção contínua para você.",
      features: [
        "5 verificações por mês",
        "Consulta em todos os tribunais",
        "Alertas de segurança",
        "Relatórios detalhados",
        "Histórico de consultas",
      ],
      cta: "Assinar Agora",
      variant: "default" as const, // Trocado para default para usar cores do tema
      popular: true,
      highlight: true,
    },
    {
      name: "Plano Família",
      icon: Crown,
      price: "49",
      originalPrice: "69",
      period: "por mês",
      description: "Proteção completa para toda família.",
      features: [
        "15 verificações por mês",
        "Consulta em todos os tribunais",
        "Alertas de segurança",
        "Relatórios detalhados",
        "Histórico ilimitado",
        "Suporte prioritário 24h",
        "Múltiplos usuários",
      ],
      cta: "Proteger Família",
      variant: "default" as const,
      popular: false,
      highlight: false,
    },
  ];

  return (
    <section id="planos" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-light/20 via-transparent to-rose-soft/10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-light text-rose-soft text-sm font-medium mb-4">
            Planos Flexíveis
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Escolha sua{" "}
            <span className="text-gradient">proteção</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Planos pensados para diferentes necessidades. 
            Do uso pessoal ao familiar.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className={`relative bg-card rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-strong transition-all duration-300 border cursor-pointer ${
                plan.highlight 
                  ? "border-rose-soft/50 md:scale-105 shadow-glow z-10" 
                  : "border-border/50 hover:border-lavender/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-soft to-lavender text-white text-xs md:text-sm font-medium shadow-medium whitespace-nowrap">
                    <Star className="w-3 h-3 md:w-4 md:h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-5 md:mb-6 pt-2">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl mx-auto mb-3 md:mb-4 flex items-center justify-center ${
                  plan.highlight 
                    ? "bg-gradient-to-br from-rose-soft to-lavender" 
                    : "bg-secondary"
                }`}>
                  <plan.icon className={`w-6 h-6 md:w-7 md:h-7 ${plan.highlight ? "text-white" : "text-foreground"}`} />
                </div>
                <h3 className="text-lg md:text-xl font-bold">{plan.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-5 md:mb-6">
                {plan.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through mb-1">
                    R$ {plan.originalPrice}
                  </div>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-base md:text-lg text-muted-foreground">R$</span>
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 md:gap-3">
                    <Check className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 ${
                      plan.highlight ? "text-rose-soft" : "text-turquoise"
                    }`} />
                    <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                variant={plan.variant} 
                className={`w-full ${plan.highlight ? "shadow-md bg-gradient-to-r from-rose-soft to-lavender border-0 text-white" : ""}`} 
                size="lg"
                onClick={handlePlanClick}
              >
                {plan.cta}
              </Button>

              {/* Money back guarantee */}
              {plan.highlight && (
                <p className="text-center text-xs text-muted-foreground mt-3">
                  ✓ Garantia de 7 dias
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10 md:mt-16 text-xs md:text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-safe-green" />
            <span>Pagamento seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-safe-green" />
            <span>Cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-safe-green" />
            <span>Dados protegidos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;