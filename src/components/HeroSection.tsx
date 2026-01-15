import { motion } from "framer-motion";
import { Shield, Search, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");

  const floatingIcons = [
    { Icon: CheckCircle, delay: 0, x: -120, y: -80 },
    { Icon: Lock, delay: 0.2, x: 130, y: -60 },
    { Icon: Shield, delay: 0.4, x: -100, y: 80 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-[0.08]" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-rose-soft/20 to-lavender/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-turquoise/20 to-lavender/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-light border border-rose-soft/20 mb-8"
          >
            <Shield className="w-4 h-4 text-rose-soft" />
            <span className="text-sm font-medium text-rose-soft">
              100% em conformidade com a LGPD
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Informação que{" "}
            <span className="text-gradient">protege</span>.
            <br />
            Segurança que{" "}
            <span className="text-gradient">empodera</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 text-center leading-relaxed"
          >
            Verifique antecedentes de pessoas de forma rápida, segura e ética.
            <br />
            Proteção para mulheres, famílias e empresas que não querem correr riscos.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative glass rounded-2xl p-2 shadow-strong">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Digite CPF, nome ou telefone..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-12 h-14 bg-background border-0 text-base placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-rose-soft/50"
                  />
                </div>
                <Button variant="hero" size="lg" className="sm:w-auto w-full">
                  Verificar Agora
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { value: "500K+", label: "Verificações" },
                { value: "Todos os", label: "Tribunais" },
                { value: "99.9%", label: "Precisão" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Icons - Hidden for cleaner look */}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
