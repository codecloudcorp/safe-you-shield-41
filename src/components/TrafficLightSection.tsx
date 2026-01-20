import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";

const TrafficLightSection = () => {
  const signals = [
    {
      color: "green",
      icon: CheckCircle,
      title: "Verde - Seguro",
      description: "Nenhum antecedente criminal encontrado. Perfil considerado seguro para interação.",
      bgLight: "bg-safe-green-light",
      bgDark: "bg-safe-green",
      textColor: "text-safe-green",
      borderColor: "border-safe-green/30",
    },
    {
      color: "yellow",
      icon: AlertTriangle,
      title: "Amarelo - Atenção",
      description: "Existem registros que exigem análise e cautela. Recomendamos aprofundar a verificação.",
      bgLight: "bg-caution-yellow-light",
      bgDark: "bg-caution-yellow",
      textColor: "text-caution-yellow",
      borderColor: "border-caution-yellow/30",
    },
    {
      color: "red",
      icon: XCircle,
      title: "Vermelho - Alerta",
      description: "Há antecedentes criminais relevantes que indicam risco. Cuidado redobrado é necessário.",
      bgLight: "bg-alert-red-light",
      bgDark: "bg-alert-red",
      textColor: "text-alert-red",
      borderColor: "border-alert-red/30",
    },
  ];

  return (
    <section className="py-16 md:py-24 gradient-soft relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-rose-soft/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-turquoise/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise-light text-turquoise text-sm font-medium mb-4">
            Resultados Claros
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Semáforo de{" "}
            <span className="text-gradient">Segurança</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Entenda rapidamente o nível de risco com nosso sistema visual 
            intuitivo e fácil de interpretar.
          </p>
        </motion.div>

        {/* Traffic Light Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.color}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative bg-card rounded-xl md:rounded-2xl p-6 md:p-8 shadow-medium border ${signal.borderColor} hover:shadow-strong transition-all group`}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 ${signal.bgLight} rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity blur-xl`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 md:w-20 md:h-20 ${signal.bgLight} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <signal.icon className={`w-8 h-8 md:w-10 md:h-10 ${signal.textColor}`} />
                </div>

                {/* Content */}
                <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 text-center ${signal.textColor}`}>
                  {signal.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm md:text-base leading-relaxed">
                  {signal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 md:mt-12 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <Shield className="w-4 h-4 md:w-5 md:h-5 text-turquoise" />
          <span className="text-xs md:text-sm text-center">
            Todos os dados são consultados em fontes públicas e legais
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default TrafficLightSection;
