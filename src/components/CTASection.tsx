import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background Card */}
          <div className="absolute inset-0 gradient-hero rounded-3xl opacity-95" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 text-center px-8 py-16 md:py-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Comece a se proteger hoje
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Sua segurança não pode esperar. Faça sua primeira verificação 
              agora e descubra o poder da informação que protege.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="heroOutline" size="xl" className="group">
                Fazer Consulta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="ghost" 
                size="xl" 
                className="text-white hover:bg-white/10"
              >
                Ver Planos
              </Button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
