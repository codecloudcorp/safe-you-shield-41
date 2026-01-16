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
      role: "Mãe e Empresária",
      content: "A Safe You me deu a tranquilidade que eu precisava ao contratar uma babá para minha filha. Em segundos, tive a confirmação que precisava.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Fernanda Lima",
      role: "Gerente de RH",
      content: "Implementamos a Safe You em nosso processo de contratação. Reduziu nossos riscos e agilizou as verificações em 80%.",
      avatar: "FL",
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
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-soft/10 to-lavender/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-light text-lavender text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quem usa,{" "}
            <span className="text-gradient">confia</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Veja o que nossas usuárias dizem sobre a experiência com a Safe You.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <div className="flex items-center gap-4">
                <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10 hover:text-rose-soft" />
                <CarouselContent className="-ml-4">
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="relative bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-medium transition-all h-full">
                        {/* Quote Icon */}
                        <Quote className="absolute top-6 right-6 w-8 h-8 text-rose-soft/20" />

                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-caution-yellow text-caution-yellow" />
                          ))}
                        </div>

                        {/* Content */}
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          "{testimonial.content}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center text-white font-semibold">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 border-rose-soft/30 text-rose-soft hover:bg-rose-soft/10 hover:text-rose-soft" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
