import { motion } from "framer-motion";
import { Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Background Card */}
          <div className="absolute inset-0 gradient-hero rounded-2xl md:rounded-3xl opacity-95" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-36 md:w-48 h-36 md:h-48 bg-white/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 md:px-8 py-12 md:py-16 lg:py-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 md:mb-6"
            >
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              Comece a se proteger hoje
            </h2>
            <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8">
              Sua segurança não pode esperar. Faça sua primeira verificação 
              agora e descubra o poder da informação que protege.
            </p>

            {/* Trust points */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8 md:mb-10">
              {["Resultado em segundos", "100% confidencial", "LGPD compliant"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-white/80">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs md:text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button variant="heroOutline" size="lg" className="group text-sm md:text-base">
                Fazer Consulta
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/#planos">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-white hover:bg-white/10 w-full sm:w-auto text-sm md:text-base"
                >
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
