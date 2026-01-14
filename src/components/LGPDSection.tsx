import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, UserCheck } from "lucide-react";

const LGPDSection = () => {
  const features = [
    {
      icon: Eye,
      title: "Dados Públicos",
      description: "Utilizamos apenas informações de acesso público e legal.",
    },
    {
      icon: FileText,
      title: "Transparência",
      description: "Fontes de informação claras e rastreáveis.",
    },
    {
      icon: UserCheck,
      title: "Consentimento",
      description: "Respeito total ao consentimento do usuário.",
    },
    {
      icon: Lock,
      title: "Criptografia",
      description: "Dados protegidos com criptografia de ponta.",
    },
    {
      icon: Server,
      title: "Servidores Seguros",
      description: "Infraestrutura em nuvem com certificação.",
    },
    {
      icon: Shield,
      title: "Política Clara",
      description: "Termos de uso e privacidade objetivos.",
    },
  ];

  return (
    <section id="seguranca" className="py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise-light text-turquoise text-sm font-medium mb-4">
                Conformidade Legal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                100% em conformidade com a{" "}
                <span className="text-gradient">LGPD</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                A Safe You foi construída desde o início com a Lei Geral de Proteção 
                de Dados em mente. Não apenas cumprimos a lei — a respeitamos como 
                pilar fundamental do nosso serviço.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sua segurança e privacidade são nossa prioridade absoluta. 
                Trabalhamos apenas com dados públicos, garantindo que todas as 
                consultas sejam éticas, legais e transparentes.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <Shield className="w-4 h-4 text-turquoise" />
                  <span className="text-sm font-medium">SSL Certificado</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <Lock className="w-4 h-4 text-turquoise" />
                  <span className="text-sm font-medium">AES-256</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-5 shadow-soft border border-border/50 hover:shadow-medium hover:border-turquoise/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-turquoise-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-turquoise" />
                  </div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LGPDSection;
