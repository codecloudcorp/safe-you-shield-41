import { motion } from "framer-motion";
import { Search, Database, FileCheck, Shield, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Digite os dados",
      description: "Insira CPF, nome ou telefone da pessoa que deseja verificar.",
      color: "from-rose-soft to-rose-soft",
    },
    {
      icon: Database,
      title: "Consulta automática",
      description: "Nossa IA consulta todos os 27 Tribunais de Justiça do Brasil.",
      color: "from-lavender to-lavender",
    },
    {
      icon: FileCheck,
      title: "Análise inteligente",
      description: "Os dados são cruzados e analisados para identificar antecedentes.",
      color: "from-turquoise to-turquoise",
    },
    {
      icon: Shield,
      title: "Resultado claro",
      description: "Receba um relatório visual com o nível de segurança da pessoa.",
      color: "from-mint to-mint",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
            Simples e Rápido
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Como funciona a{" "}
            <span className="text-gradient">Safe You</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Em apenas 4 passos, você tem acesso a informações que podem mudar 
            suas decisões e proteger quem você ama.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector Line - Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-14 left-full w-full items-center justify-center z-0 px-2">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent" />
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 mx-1" />
                </div>
              )}

              <div className="relative bg-card rounded-xl md:rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-medium transition-shadow border border-border/50 group-hover:border-rose-soft/30 h-full">
                {/* Step Number */}
                <div className="absolute -top-2.5 -right-2.5 md:-top-3 md:-right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-medium">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${step.color} p-2.5 md:p-3 mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-base md:text-lg font-semibold mb-1.5 md:mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
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
