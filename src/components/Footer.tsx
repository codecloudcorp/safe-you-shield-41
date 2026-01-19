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
    <footer id="contato" className="bg-foreground text-background pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-rose-soft to-lavender p-2.5 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Safe You</span>
            </a>
            <p className="text-background/60 text-sm max-w-xs text-center md:text-left">
              Informação que protege. Segurança que empodera.
            </p>
          </div>

          {/* Contact */}
          <a href="mailto:contato@safeyou.com.br" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
            <Mail className="w-4 h-4" />
            contato@safeyou.com.br
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <TikTokIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-background/10 pt-6">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.href} 
                className="text-sm text-background/60 hover:text-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Security Badge & Copyright */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Lock className="w-4 h-4" />
              <span>Feito com segurança de dados para sua segurança</span>
            </div>
            <p className="text-xs text-background/50">
              © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
