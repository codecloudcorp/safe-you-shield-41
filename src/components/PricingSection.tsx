import { motion } from "framer-motion";
import { Check, Star, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      name: "Consulta Avulsa",
      icon: Sparkles,
      price: "19",
      period: "por verificação",
      description: "Ideal para checagens pontuais e rápidas.",
      features: [
        "1 verificação completa",
        "Consulta em todos os tribunais",
        "Resultado em segundos",
        "Relatório básico em PDF",
      ],
      cta: "Fazer Consulta",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Plano Família",
      icon: Heart,
      price: "49",
      period: "por mês",
      description: "Proteção contínua para você e sua família.",
      features: [
        "10 verificações por mês",
        "Consulta em todos os tribunais",
        "Alertas de segurança",
        "Relatórios detalhados",
        "Histórico de consultas",
        "Suporte prioritário",
      ],
      cta: "Começar Agora",
      variant: "hero" as const,
      popular: true,
    },
  ];

  return (
    <section id="planos" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-light text-rose-soft text-sm font-medium mb-4">
            Planos Flexíveis
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha sua{" "}
            <span className="text-gradient">proteção</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Planos pensados para diferentes necessidades. 
            Do uso pessoal ao corporativo.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              className={`relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 border cursor-pointer ${
                plan.popular 
                  ? "border-rose-soft/50 scale-105 shadow-glow" 
                  : "border-border/50 hover:border-lavender/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-soft to-lavender text-white text-sm font-medium shadow-medium">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                  plan.popular 
                    ? "bg-gradient-to-br from-rose-soft to-lavender" 
                    : "bg-secondary"
                }`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? "text-white" : "text-foreground"}`} />
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg text-muted-foreground">R$</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                </div>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.popular ? "text-rose-soft" : "text-turquoise"
                    }`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button variant={plan.variant} className="w-full" size="lg">
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
