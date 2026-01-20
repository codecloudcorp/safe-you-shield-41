import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O que é a Safe You?",
      answer: "A Safe You é uma plataforma de verificação de antecedentes criminais que permite consultar informações públicas sobre pessoas de forma rápida, segura e em conformidade com a LGPD. Nosso objetivo é trazer mais segurança para suas decisões pessoais e profissionais.",
    },
    {
      question: "Como funciona a consulta de antecedentes?",
      answer: "É muito simples: você insere o CPF da pessoa que deseja verificar, nosso sistema cruza informações em bases de dados públicas oficiais e em segundos você recebe um relatório completo com o status da verificação através do nosso sistema de semáforo (verde, amarelo ou vermelho).",
    },
    {
      question: "A consulta é legal e está em conformidade com a LGPD?",
      answer: "Sim! A Safe You opera 100% dentro da legalidade. Consultamos apenas bases de dados públicas e oficiais, e seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD). Todos os dados são tratados com segurança e confidencialidade.",
    },
    {
      question: "Quem pode usar a Safe You?",
      answer: "Qualquer pessoa pode usar nossa plataforma. É ideal para mães que vão contratar babás ou cuidadores, para verificar pessoas antes de encontros, síndicos de condomínios, e qualquer pessoa que precise verificar antecedentes.",
    },
    {
      question: "Quanto tempo leva para receber o resultado?",
      answer: "O resultado é praticamente instantâneo! Em poucos segundos após a consulta, você recebe o relatório completo com todas as informações disponíveis nas bases públicas consultadas.",
    },
    {
      question: "O que significa cada cor do semáforo?",
      answer: "Verde indica que não foram encontrados registros negativos. Amarelo significa que há informações que merecem atenção ou análise mais detalhada. Vermelho indica a presença de registros criminais ou pendências relevantes que requerem cautela.",
    },
    {
      question: "As informações consultadas são confidenciais?",
      answer: "Absolutamente. Todas as consultas são criptografadas e armazenadas de forma segura. Não compartilhamos informações com terceiros e seguimos os mais altos padrões de segurança da informação.",
    },
    {
      question: "A pessoa consultada é notificada sobre a verificação?",
      answer: "Não. A consulta é feita de forma discreta em bases públicas de dados. No entanto, recomendamos sempre informar a pessoa consultada como boa prática e transparência.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
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
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Perguntas{" "}
            <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Tire suas dúvidas sobre a Safe You e nossos serviços de verificação de antecedentes.
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
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg md:rounded-xl border border-border/50 px-4 md:px-6 shadow-soft data-[state=open]:shadow-medium transition-all"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline py-4 md:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 md:pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-muted-foreground text-sm md:text-base">
            Ainda tem dúvidas?{" "}
            <a href="mailto:contato@safeyou.com.br" className="text-lavender hover:underline font-medium">
              Entre em contato conosco
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
