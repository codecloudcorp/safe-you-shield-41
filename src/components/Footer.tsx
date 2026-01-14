import { Shield, Instagram, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    produto: [
      { label: "Como Funciona", href: "#como-funciona" },
      { label: "Planos", href: "#planos" },
    ],
    suporte: [
      { label: "Central de Ajuda", href: "#" },
      { label: "Contato", href: "#contato" },
      { label: "FAQ", href: "#" },
    ],
    legal: [
      { label: "Termos de Uso", href: "#" },
      { label: "Privacidade", href: "#" },
      { label: "LGPD", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  };

  return (
    <footer id="contato" className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-rose-soft to-lavender p-2.5 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Safe You</span>
            </a>
            <p className="text-background/60 text-sm mb-6 max-w-xs">
              Informação que protege. Segurança que empodera. 
              Seu escudo digital contra riscos.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-background/60">
              <a href="mailto:contato@safeyou.com.br" className="flex items-center gap-2 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                contato@safeyou.com.br
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
