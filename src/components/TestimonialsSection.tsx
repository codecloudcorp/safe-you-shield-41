import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
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
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-soft/10 to-lavender/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
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
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:shadow-medium transition-all"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
