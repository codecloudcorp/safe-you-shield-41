import { motion } from "framer-motion";
import { Shield, Search, CheckCircle, ArrowRight, Scale, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background with subtle pink gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-soft/20 via-white to-white" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent" />

      {/* Floating shields */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-soft/40"
            style={{
              left: `${5 + Math.random() * 90}%`,
              bottom: -40,
            }}
            animate={{
              y: [0, -900 - Math.random() * 300],
              opacity: [0, 0.5, 0.35, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          >
            <Shield size={20 + Math.random() * 16} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light border border-lavender/20 mb-8"
            >
              <Shield className="w-4 h-4 text-lavender" />
              <span className="text-sm font-medium text-lavender">
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

            {/* Subtitle - Quote Style */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed italic border-l-4 border-rose-soft/50 pl-4"
            >
              "Verifique antecedentes de pessoas de forma rápida, segura e ética.
              Proteção para mulheres e famílias que não querem correr riscos."
            </motion.blockquote>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl"
            >
              <div className="relative bg-white rounded-2xl p-2 shadow-strong border border-border/30">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Digite CPF, nome ou telefone..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-12 h-14 bg-transparent border-0 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <Button className="sm:w-auto w-full h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold gap-2">
                    Verificar Agora
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mt-6">
                {[
                  "100% Confidencial",
                  "Dados Oficiais",
                  "Resultado Imediato",
                ].map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-safe-green" />
                    <span className="text-sm text-muted-foreground">{badge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Result Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-strong p-8 border border-border/30 max-w-md ml-auto">
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-lavender-light flex items-center justify-center">
                  <Shield className="w-5 h-5 text-lavender" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Resultado da Verificação</h3>
                  <p className="text-sm text-muted-foreground">Consulta realizada há 2 min</p>
                </div>
              </div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Verificação completa</span>
                  <span className="text-xs font-semibold text-safe-green">100%</span>
                </div>
                <Progress value={100} className="h-2 bg-muted" />
              </motion.div>

              {/* Status Badge with Pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="mb-6"
              >
                <span className="relative inline-flex px-4 py-2 rounded-full bg-safe-green/10 text-safe-green font-semibold text-sm border border-safe-green/30">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-safe-green/20"
                  />
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Perfil Seguro
                </span>
              </motion.div>

              {/* Results List with Stagger Animation */}
              <div className="space-y-1">
                {[
                  { label: "Antecedentes Criminais", value: "Nenhum", icon: Shield, isGreen: true },
                  { label: "Processos Judiciais", value: "Nenhum", icon: Scale, isGreen: true },
                  { label: "Tribunais Consultados", value: "27 Estados", icon: MapPin, isGreen: false },
                  { label: "Confiabilidade", value: "Alta", icon: TrendingUp, isGreen: false },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                    className="flex justify-between items-center py-3 px-3 rounded-lg border-b border-border/50 hover:bg-muted/50 transition-colors cursor-default group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-lavender transition-colors" />
                      <span className="text-muted-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.isGreen && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.15, type: "spring" }}
                        >
                          <CheckCircle className="w-4 h-4 text-safe-green" />
                        </motion.div>
                      )}
                      <span className={`font-semibold ${item.isGreen ? 'text-safe-green' : 'text-foreground'}`}>
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Button variant="outline" className="w-full mt-6 h-12 rounded-xl bg-muted/50 border-0 text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                  Ver Relatório Completo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
