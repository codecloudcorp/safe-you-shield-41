import { motion } from "framer-motion";
import { AlertTriangle, Shield, X, Check, Heart, Users, Home } from "lucide-react";

const BeforeAfterSection = () => {
  const scenarios = [
    {
      icon: Heart,
      title: "Relacionamentos",
      before: {
        title: "Sem Safe You",
        items: [
          "Conhecer pessoas online sem referências",
          "Confiar apenas na palavra",
          "Descobrir problemas tarde demais",
        ],
      },
      after: {
        title: "Com Safe You",
        items: [
          "Verificar antecedentes antes de se envolver",
          "Dados oficiais de 27 estados",
          "Decisões informadas e seguras",
        ],
      },
    },
    {
      icon: Users,
      title: "Família",
      before: {
        title: "Sem Safe You",
        items: [
          "Contratar babás sem histórico",
          "Cuidadores sem referências verificadas",
          "Risco para quem você ama",
        ],
      },
      after: {
        title: "Com Safe You",
        items: [
          "Verificação completa de antecedentes",
          "Relatórios detalhados em segundos",
          "Proteção para toda a família",
        ],
      },
    },
    {
      icon: Home,
      title: "Segurança em Casa",
      before: {
        title: "Sem Safe You",
        items: [
          "Prestadores de serviço desconhecidos",
          "Entregadores sem verificação",
          "Exposição a riscos evitáveis",
        ],
      },
      after: {
        title: "Com Safe You",
        items: [
          "Verificar antes de abrir a porta",
          "Histórico completo do prestador",
          "Tranquilidade para você e sua família",
        ],
      },
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-light text-rose-soft text-sm font-medium mb-4">
            Antes vs Depois
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Veja a diferença que a{" "}
            <span className="text-gradient">informação</span> faz
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Compare cenários de risco com a segurança que a Safe You oferece.
          </p>
        </motion.div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Icon Header */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-lavender-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <scenario.icon className="w-5 h-5 md:w-6 md:h-6 text-lavender" />
                </div>
                <h3 className="text-lg md:text-xl font-bold">{scenario.title}</h3>
              </div>

              {/* Before Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-red-50 dark:bg-red-950/20 rounded-lg md:rounded-xl p-4 md:p-5 mb-3 md:mb-4 border border-red-200/50 dark:border-red-800/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                  <span className="font-semibold text-sm md:text-base text-red-600 dark:text-red-400">
                    {scenario.before.title}
                  </span>
                </div>
                <ul className="space-y-1.5 md:space-y-2">
                  {scenario.before.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-red-700/80 dark:text-red-300/80">
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 mt-0.5 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Arrow */}
              <div className="flex justify-center my-1.5 md:my-2">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-b from-red-200 to-green-200 flex items-center justify-center"
                >
                  <span className="text-base md:text-lg">↓</span>
                </motion.div>
              </div>

              {/* After Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-green-50 dark:bg-green-950/20 rounded-lg md:rounded-xl p-4 md:p-5 border border-green-200/50 dark:border-green-800/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  <span className="font-semibold text-sm md:text-base text-green-600 dark:text-green-400">
                    {scenario.after.title}
                  </span>
                </div>
                <ul className="space-y-1.5 md:space-y-2">
                  {scenario.after.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-green-700/80 dark:text-green-300/80">
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 mt-0.5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
