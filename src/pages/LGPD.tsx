import { Shield, Lock, Eye, FileText, Server, UserCheck, ArrowLeft, CheckCircle2, Database, Scale, Bell, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LGPD = () => {
  const principles = [
    {
      icon: Eye,
      title: "Dados Públicos",
      description: "Utilizamos exclusivamente informações de acesso público e legalmente acessíveis, como registros em órgãos oficiais, processos judiciais públicos e informações empresariais abertas.",
    },
    {
      icon: FileText,
      title: "Transparência Total",
      description: "Todas as fontes de informação são claras e rastreáveis. Você sabe exatamente de onde vêm os dados apresentados em nossos relatórios.",
    },
    {
      icon: UserCheck,
      title: "Consentimento",
      description: "Respeitamos integralmente o consentimento do usuário. Nenhuma informação é coletada ou processada sem sua autorização expressa.",
    },
    {
      icon: Lock,
      title: "Criptografia Avançada",
      description: "Todos os dados são protegidos com criptografia AES-256, o mesmo padrão utilizado por instituições financeiras e governamentais.",
    },
    {
      icon: Server,
      title: "Infraestrutura Segura",
      description: "Nossos servidores estão hospedados em data centers certificados ISO 27001, com redundância geográfica e monitoramento 24/7.",
    },
    {
      icon: Shield,
      title: "Política Clara",
      description: "Nossos termos de uso e política de privacidade são objetivos, sem juridiquês. Você entende exatamente como seus dados são tratados.",
    },
  ];

  const userRights = [
    {
      icon: Eye,
      title: "Direito de Acesso",
      description: "Você pode solicitar a qualquer momento uma cópia de todos os dados pessoais que possuímos sobre você.",
    },
    {
      icon: FileText,
      title: "Direito de Correção",
      description: "Caso algum dado esteja incorreto ou desatualizado, você pode solicitar a correção imediata.",
    },
    {
      icon: Trash2,
      title: "Direito de Exclusão",
      description: "Você pode solicitar a exclusão completa dos seus dados pessoais de nossos sistemas a qualquer momento.",
    },
    {
      icon: Database,
      title: "Direito de Portabilidade",
      description: "Seus dados podem ser transferidos para outro fornecedor de serviços, mediante solicitação.",
    },
    {
      icon: Bell,
      title: "Direito de Oposição",
      description: "Você pode se opor ao tratamento dos seus dados para determinadas finalidades.",
    },
    {
      icon: Scale,
      title: "Direito de Revisão",
      description: "Decisões automatizadas podem ser revisadas por um humano, garantindo justiça no processo.",
    },
  ];

  const commitments = [
    "Nunca vendemos ou compartilhamos seus dados pessoais com terceiros para fins comerciais",
    "Coletamos apenas os dados estritamente necessários para a prestação do serviço",
    "Mantemos seus dados apenas pelo tempo necessário, conforme exigido por lei",
    "Implementamos medidas técnicas e organizacionais para proteger seus dados",
    "Notificamos você e as autoridades competentes em caso de incidentes de segurança",
    "Treinamos constantemente nossa equipe sobre práticas de proteção de dados",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-turquoise" />
              <span className="font-bold text-xl">Safe You</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-turquoise/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise-light text-turquoise text-sm font-medium mb-6">
              Lei Geral de Proteção de Dados
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sua privacidade é nossa{" "}
              <span className="text-gradient">prioridade absoluta</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A Safe You foi construída desde o primeiro dia com a LGPD como pilar fundamental. 
              Não apenas cumprimos a lei — a respeitamos como valor essencial do nosso serviço.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-soft">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">O que é a LGPD?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A <strong className="text-foreground">Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> é a 
                  legislação brasileira que regulamenta o tratamento de dados pessoais. Inspirada na GDPR europeia, 
                  a LGPD estabelece direitos dos titulares de dados e deveres das empresas que os processam.
                </p>
                <p>
                  Na Safe You, entendemos que a verificação de pessoas envolve dados sensíveis. Por isso, 
                  implementamos um rigoroso programa de conformidade que vai além do mínimo exigido pela lei, 
                  garantindo que você possa se proteger sem abrir mão da sua privacidade.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Principles Grid */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nossos princípios de <span className="text-gradient">proteção de dados</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cada aspecto da Safe You foi projetado pensando na sua segurança e privacidade.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-turquoise/30 hover:shadow-medium transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-turquoise-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <principle.icon className="w-6 h-6 text-turquoise" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* User Rights */}
          <section className="mb-20 bg-secondary/30 py-16 -mx-4 px-4 md:-mx-8 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Seus <span className="text-gradient">direitos garantidos</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A LGPD garante diversos direitos aos titulares de dados. Na Safe You, facilitamos o exercício de todos eles.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {userRights.map((right, index) => (
                <motion.div
                  key={right.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-turquoise-light flex items-center justify-center flex-shrink-0">
                      <right.icon className="w-5 h-5 text-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{right.title}</h3>
                      <p className="text-sm text-muted-foreground">{right.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Our Commitments */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Nosso <span className="text-gradient">compromisso</span> com você
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-soft"
              >
                <ul className="space-y-4">
                  {commitments.map((commitment, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-turquoise flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{commitment}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Trust Badges */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border">
                <Shield className="w-5 h-5 text-turquoise" />
                <span className="font-medium">SSL Certificado</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border">
                <Lock className="w-5 h-5 text-turquoise" />
                <span className="font-medium">Criptografia AES-256</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border">
                <Server className="w-5 h-5 text-turquoise" />
                <span className="font-medium">ISO 27001</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border">
                <Scale className="w-5 h-5 text-turquoise" />
                <span className="font-medium">LGPD Compliant</span>
              </div>
            </motion.div>
          </section>

          {/* Contact DPO */}
          <section className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-turquoise/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center border border-turquoise/20"
            >
              <Shield className="w-16 h-16 text-turquoise mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Fale com nosso Encarregado de Dados (DPO)
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Para exercer seus direitos, esclarecer dúvidas sobre o tratamento dos seus dados 
                ou reportar qualquer preocupação, entre em contato com nosso Encarregado de Proteção de Dados.
              </p>
              <a
                href="mailto:contato@safeyou.com.br"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-turquoise text-turquoise-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <FileText className="w-5 h-5" />
                contato@safeyou.com.br
              </a>
              <p className="text-sm text-muted-foreground mt-6">
                Respondemos todas as solicitações em até 15 dias úteis, conforme previsto na LGPD.
              </p>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link to="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-turquoise transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="text-sm text-muted-foreground hover:text-turquoise transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LGPD;
