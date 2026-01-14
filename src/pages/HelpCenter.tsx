import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Mail, MessageCircle, FileText, HelpCircle, ChevronRight, Clock, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: FileText,
      title: "Primeiros Passos",
      description: "Aprenda como usar a Safe You e fazer sua primeira consulta.",
      links: ["Como criar uma conta", "Fazendo sua primeira consulta", "Entendendo o resultado"],
    },
    {
      icon: Users,
      title: "Conta e Planos",
      description: "Gerencie sua conta, assinatura e formas de pagamento.",
      links: ["Alterar dados da conta", "Upgrade de plano", "Formas de pagamento"],
    },
    {
      icon: HelpCircle,
      title: "Dúvidas Frequentes",
      description: "Respostas para as perguntas mais comuns sobre nossos serviços.",
      links: ["O que significa cada cor?", "Quanto tempo leva a consulta?", "A consulta é confidencial?"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-rose-soft to-lavender p-2 rounded-xl">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">Safe You</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-lavender-light/30 to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-rose-soft/10 to-lavender/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
              Suporte Safe You
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Central de{" "}
              <span className="text-gradient">Ajuda</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Estamos aqui para ajudar você. Encontre respostas para suas dúvidas ou entre em contato com nossa equipe de suporte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-rose-soft to-lavender rounded-2xl p-8 md:p-12 text-white text-center shadow-medium"
          >
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Precisa de ajuda personalizada?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
              Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida ou problema. Envie um e-mail e responderemos o mais rápido possível.
            </p>
            <a href="mailto:contato@safeyou.com.br">
              <Button size="lg" className="bg-white text-lavender hover:bg-white/90 font-semibold px-8">
                <Mail className="w-5 h-5 mr-2" />
                contato@safeyou.com.br
              </Button>
            </a>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Suporte em português</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
          >
            Como podemos ajudar?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-lavender-light flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-lavender" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-lavender hover:underline flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Help */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Não encontrou o que procurava?
              </h2>
              <p className="text-muted-foreground mb-8">
                Nossa equipe está sempre disponível para ajudar. Entre em contato pelo e-mail abaixo e teremos prazer em esclarecer suas dúvidas.
              </p>
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">E-mail de suporte</p>
                      <a href="mailto:contato@safeyou.com.br" className="text-lg font-semibold text-lavender hover:underline">
                        contato@safeyou.com.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-6 text-center">Links Úteis</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#faq" className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors">
                FAQ
              </Link>
              <Link to="/termos-de-uso" className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors">
                Termos de Uso
              </Link>
              <Link to="/politica-de-privacidade" className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/" className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors">
                Voltar ao Início
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-br from-rose-soft to-lavender p-2 rounded-xl">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Safe You</span>
          </Link>
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
