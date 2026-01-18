import { motion } from "framer-motion";
import { Shield, Heart, Briefcase, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TipsPreviewSection = () => {
  const previewTips = [
    {
      icon: Heart,
      title: "Encontros Online",
      tip: "Sempre verifique a pessoa antes do primeiro encontro",
      color: "from-rose-soft to-rose-soft/50",
      iconColor: "text-rose-500"
    },
    {
      icon: Briefcase,
      title: "Contratação",
      tip: "Peça documentos e comprove a identidade antes de contratar",
      color: "from-lavender-light to-lavender-light/50",
      iconColor: "text-lavender"
    },
    {
      icon: Home,
      title: "Segurança em Casa",
      tip: "Verifique entregadores antes de abrir a porta",
      color: "from-safe-green/20 to-safe-green/10",
      iconColor: "text-safe-green"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-lavender-light/30 via-background to-rose-soft/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-lavender/20 mb-4">
            <Shield className="w-4 h-4 text-lavender" />
            <span className="text-sm font-medium text-lavender">Guia de Proteção</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dicas para sua Segurança
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Orientações práticas para você se proteger em diversas situações do dia a dia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {previewTips.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-soft border border-border/30 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.tip}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link to="/dicas-de-protecao">
            <Button variant="outline" size="lg" className="gap-2 group">
              Ver todas as dicas
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TipsPreviewSection;
