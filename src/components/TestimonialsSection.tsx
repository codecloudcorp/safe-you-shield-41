import { motion } from "framer-motion";
import { Star, Quote, Shield, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const TestimonialsSection = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const testimonials = [
    {
      name: "Mariana Costa",
      role: "Mãe de 2 filhos",
      content: "Antes de contratar a babá, fiz a verificação pela Safe You. Em segundos, tive a tranquilidade que precisava para deixar meus filhos em segurança.",
      avatar: "MC",
      rating: 5,
      highlight: "Proteção para a família",
    },
    {
      name: "Juliana Santos",
      role: "Corretora de Imóveis",
      content: "Trabalho sozinha visitando imóveis com desconhecidos. A Safe You me dá segurança antes de cada visita. Já evitei situações de risco.",
      avatar: "JS",
      rating: 5,
      highlight: "Segurança profissional",
    },
    {
      name: "Carolina Mendes",
      role: "Mãe solo",
      content: "Como mãe solo, preciso confiar em quem entra na minha casa. Uso a Safe You para verificar prestadores de serviço. Paz de espírito!",
      avatar: "CM",
      rating: 5,
      highlight: "Confiança em casa",
    },
    {
      name: "Patrícia Oliveira",
      role: "Cuidadora de idosos",
      content: "Cuido de pessoas vulneráveis e sei como é importante a segurança. Recomendo a Safe You para todas as famílias que atendo.",
      avatar: "PO",
      rating: 5,
      highlight: "Cuidado com idosos",
    },
    {
      name: "Amanda Rodrigues",
      role: "Moradora de condomínio",
      content: "Antes de liberar entrada de prestadores, verifico rapidamente. Me sinto muito mais segura no meu próprio lar.",
      avatar: "AR",
      rating: 5,
      highlight: "Segurança em casa",
    },
    {
      name: "Beatriz Almeida",
      role: "Dona de casa",
      content: "Contratei uma diarista nova e fiz a verificação antes. A Safe You confirmou que era uma pessoa de confiança. Excelente!",
      avatar: "BA",
      rating: 5,
      highlight: "Contratação segura",
    },
    {
      name: "Renata Vieira",
      role: "Professora particular",
      content: "Dou aulas em casas de alunos. Às vezes são ambientes desconhecidos. A Safe You me ajuda a ir preparada.",
      avatar: "RV",
      rating: 5,
      highlight: "Trabalho seguro",
    },
    {
      name: "Luciana Ferreira",
      role: "Mãe e advogada",
      content: "Como advogada, sei da importância da prevenção. Uso a Safe You em casa e recomendo para todas as minhas amigas.",
      avatar: "LF",
      rating: 5,
      highlight: "Prevenção é tudo",
    },
  ];

  return (
    <section id="depoimentos" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 md:w-64 md:h-64 bg-rose-soft/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 md:w-64 md:h-64 bg-lavender/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender-light border border-lavender/20 mb-6">
            <Heart className="w-4 h-4 text-rose-soft" />
            <span className="text-sm font-medium text-lavender">+10.000 mulheres protegidas</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Quem usa,{" "}
            <span className="text-gradient">confia</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Histórias reais de mulheres que escolheram a prevenção e hoje vivem com mais segurança.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
        >
          {[
            { value: "98%", label: "Satisfação" },
            { value: "50k+", label: "Consultas" },
            { value: "4.9", label: "Avaliação", icon: Star },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</span>
                {stat.icon && <stat.icon className="w-5 h-5 fill-caution-yellow text-caution-yellow" />}
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 hover:shadow-medium hover:border-rose-soft/30 transition-all duration-300 h-full group"
                  >
                    {/* Highlight Badge */}
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-rose-soft to-lavender text-white text-xs font-medium shadow-sm">
                        <Shield className="w-3 h-3" />
                        {testimonial.highlight}
                      </span>
                    </div>

                    {/* Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-rose-soft/10 group-hover:text-rose-soft/20 transition-colors" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-caution-yellow text-caution-yellow" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed min-h-[80px]">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center text-white font-semibold shadow-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6 h-10 w-10 border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10 hover:text-rose-soft hover:border-rose-soft" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-6 h-10 w-10 border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10 hover:text-rose-soft hover:border-rose-soft" />
          </Carousel>
          
          {/* Mobile swipe indicator */}
          <div className="sm:hidden flex justify-center mt-6">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-8 h-0.5 bg-rose-soft/30 rounded-full" />
              Deslize para ver mais
              <span className="w-8 h-0.5 bg-rose-soft/30 rounded-full" />
            </span>
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe-green/10 border border-safe-green/20">
            <Shield className="w-4 h-4 text-safe-green" />
            <span className="text-sm text-safe-green font-medium">Depoimentos verificados</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
