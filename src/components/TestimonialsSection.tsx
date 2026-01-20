import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
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
      role: "Mãe",
      content: "A Safe You me deu a tranquilidade que eu precisava ao contratar uma babá para minha filha. Em segundos, tive a confirmação que precisava.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Juliana Santos",
      role: "Corretora de Imóveis",
      content: "Antes de mostrar imóveis para novos clientes, faço uma verificação rápida. É segurança para mim e para minha equipe.",
      avatar: "JS",
      rating: 5,
    },
    {
      name: "Carolina Mendes",
      role: "Diretora de Escola",
      content: "Usamos a Safe You para verificar todos os funcionários terceirizados. A paz de espírito que isso traz para pais e professores é inestimável.",
      avatar: "CM",
      rating: 5,
    },
    {
      name: "Patrícia Oliveira",
      role: "Proprietária de Clínica",
      content: "Em uma clínica, a confiança é fundamental. A Safe You nos ajuda a garantir que nossa equipe seja 100% confiável.",
      avatar: "PO",
      rating: 5,
    },
    {
      name: "Amanda Rodrigues",
      role: "Síndica de Condomínio",
      content: "Antes de liberar acesso a prestadores de serviço, verifico rapidamente. Os moradores se sentem muito mais seguros.",
      avatar: "AR",
      rating: 5,
    },
    {
      name: "Beatriz Almeida",
      role: "Dona de Pet Shop",
      content: "Meus clientes confiam seus pets a mim. Com a Safe You, garanto que todos os funcionários são pessoas idôneas.",
      avatar: "BA",
      rating: 5,
    },
    {
      name: "Renata Vieira",
      role: "Coordenadora de Eventos",
      content: "Contratamos muitos freelancers por evento. A verificação rápida da Safe You tornou nosso processo muito mais seguro.",
      avatar: "RV",
      rating: 5,
    },
    {
      name: "Luciana Ferreira",
      role: "Advogada",
      content: "Recomendo a Safe You para todas as minhas clientes. Prevenção é sempre o melhor caminho, especialmente em contratações domésticas.",
      avatar: "LF",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-r from-rose-soft/10 to-lavender/10 rounded-full blur-3xl" />

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
            Depoimentos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Quem usa,{" "}
            <span className="text-gradient">confia</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Veja o que nossas usuárias dizem sobre a experiência com a Safe You.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="relative bg-card rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-soft border border-border/50 hover:shadow-medium transition-all h-full">
                    {/* Quote Icon */}
                    <Quote className="absolute top-4 md:top-6 right-4 md:right-6 w-6 h-6 md:w-8 md:h-8 text-rose-soft/20" />

                    {/* Rating */}
                    <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-caution-yellow text-caution-yellow" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center text-white text-sm md:text-base font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm md:text-base">{testimonial.name}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6 h-9 w-9 md:h-10 md:w-10 border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10 hover:text-rose-soft" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-6 h-9 w-9 md:h-10 md:w-10 border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10 hover:text-rose-soft" />
          </Carousel>
          
          {/* Mobile swipe indicator */}
          <div className="sm:hidden flex justify-center mt-4 gap-1">
            <span className="text-xs text-muted-foreground">Deslize para ver mais →</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
