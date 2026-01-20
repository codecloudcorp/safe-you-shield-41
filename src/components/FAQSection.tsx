import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Shield, Clock, Lock, Eye, CreditCard, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQSection = () => {
  const faqs = [
    {
      question: "O que é a Safe You?",
      answer: "A Safe You é uma plataforma de verificação de antecedentes criminais que permite consultar informações públicas sobre pessoas de forma rápida, segura e em conformidade com a LGPD. Nosso objetivo é trazer mais segurança para suas decisões pessoais e familiares.",
      icon: Shield,
    },
    {
      question: "Como funciona a consulta de antecedentes?",
      answer: "É muito simples: você insere o CPF da pessoa que deseja verificar, nosso sistema cruza informações em bases de dados públicas oficiais e em segundos você recebe um relatório completo com o status da verificação através do nosso sistema de semáforo (verde, amarelo ou vermelho).",
      icon: Eye,
    },
    {
      question: "Quanto tempo leva para receber o resultado?",
      answer: "O resultado é praticamente instantâneo! Em poucos segundos após a consulta, você recebe o relatório completo com todas as informações disponíveis nas bases públicas consultadas.",
      icon: Clock,
    },
    {
      question: "A consulta é legal e está em conformidade com a LGPD?",
      answer: "Sim! A Safe You opera 100% dentro da legalidade. Consultamos apenas bases de dados públicas e oficiais, e seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD). Todos os dados são tratados com segurança e confidencialidade.",
      icon: Lock,
    },
    {
      question: "Quem pode usar a Safe You?",
      answer: "Qualquer pessoa pode usar nossa plataforma. É ideal para mães que vão contratar babás ou cuidadores, para verificar pessoas antes de encontros, para quem vai alugar um imóvel, e qualquer pessoa que precise de mais segurança no dia a dia.",
      icon: Users,
    },
    {
      question: "O que significa cada cor do semáforo?",
      answer: "Verde indica que não foram encontrados registros negativos. Amarelo significa que há informações que merecem atenção ou análise mais detalhada. Vermelho indica a presença de registros criminais ou pendências relevantes que requerem cautela.",
      icon: HelpCircle,
    },
    {
      question: "As informações consultadas são confidenciais?",
      answer: "Absolutamente. Todas as consultas são criptografadas e armazenadas de forma segura. Não compartilhamos informações com terceiros e seguimos os mais altos padrões de segurança da informação.",
      icon: Lock,
    },
    {
      question: "Quais são os planos disponíveis?",
      answer: "Oferecemos três opções: Consulta Avulsa (R$19 por verificação), Plano Mensal (R$29/mês com 5 consultas) e Plano Família (R$49/mês com 15 consultas para proteger toda a família). Todos os planos têm garantia de 7 dias.",
      icon: CreditCard,
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-br from-lavender/10 to-rose-soft/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gradient-to-tr from-rose-soft/10 to-lavender/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light border border-lavender/20 mb-6">
            <HelpCircle className="w-4 h-4 text-lavender" />
            <span className="text-sm font-medium text-lavender">Tire suas dúvidas</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Perguntas{" "}
            <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Tudo o que você precisa saber sobre a Safe You e nossos serviços de verificação.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-4 md:px-6 shadow-soft data-[state=open]:shadow-medium data-[state=open]:border-rose-soft/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-4 md:py-5 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-rose-soft/20 to-lavender/20 flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-4 h-4 md:w-5 md:h-5 text-rose-soft" />
                    </div>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 md:pb-5 leading-relaxed pl-11 md:pl-[52px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-rose-soft/10 to-lavender/10 rounded-2xl p-6 md:p-8 border border-rose-soft/20 text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground text-sm md:text-base mb-4">
              Nossa equipe está pronta para ajudar você. Entre em contato!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="default"
                className="bg-gradient-to-r from-rose-soft to-lavender hover:opacity-90"
                asChild
              >
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button 
                variant="outline"
                className="border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10"
                asChild
              >
                <a href="mailto:contato@safeyou.com.br">
                  Enviar e-mail
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
