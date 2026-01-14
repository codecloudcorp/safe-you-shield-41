import { motion } from "framer-motion";
import { Search, Database, FileCheck, Shield } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Digite os dados",
      description: "Insira CPF, nome completo ou número de telefone da pessoa que deseja verificar.",
      color: "from-rose-soft to-rose-soft",
    },
    {
      icon: Database,
      title: "Consulta automática",
      description: "Nossa IA consulta todos os 27 Tribunais de Justiça do Brasil em segundos.",
      color: "from-lavender to-lavender",
    },
    {
      icon: FileCheck,
      title: "Análise inteligente",
      description: "Os dados são cruzados e analisados para identificar antecedentes relevantes.",
      color: "from-turquoise to-turquoise",
    },
    {
      icon: Shield,
      title: "Resultado claro",
      description: "Receba um relatório visual com o nível de segurança da pessoa verificada.",
      color: "from-mint to-mint",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
            Simples e Rápido
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como funciona a{" "}
            <span className="text-gradient">Safe You</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Em apenas 4 passos, você tem acesso a informações que podem mudar 
            suas decisões e proteger quem você ama.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow border border-border/50 group-hover:border-rose-soft/30">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center text-white text-sm font-bold shadow-medium">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
