import { Shield, Instagram, Linkedin, Twitter, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const legalLinks = [
    { label: "Termos de Uso", href: "/termos-de-uso" },
    { label: "Privacidade", href: "/politica-de-privacidade" },
    { label: "LGPD", href: "/lgpd" },
    { label: "Cookies", href: "/politica-de-cookies" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-soft/10 via-transparent to-lavender/10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-soft/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lavender/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-rose-soft to-lavender p-3 rounded-2xl shadow-lg shadow-rose-soft/20 group-hover:shadow-rose-soft/40 group-hover:scale-110 transition-all duration-300">
              <Shield className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-rose-soft transition-colors duration-300">Safe You</span>
          </a>

          {/* Tagline */}
          <p className="text-white/60 text-lg max-w-md mb-8">
            Informação que protege. Segurança que empodera.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            <a 
              href="#" 
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <Instagram className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <Twitter className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <TikTokIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Contact */}
          <a 
            href="mailto:contato@safeyou.com.br" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm"
          >
            <Mail className="w-4 h-4" />
            contato@safeyou.com.br
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {legalLinks.map((link) => (
            <Link 
              key={link.label} 
              to={link.href} 
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Security Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-soft/20 to-lavender/20 border border-white/10">
            <Lock className="w-4 h-4 text-rose-soft" />
            <span className="text-sm text-white/80">Feito com segurança de dados para sua segurança</span>
          </div>
          
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
