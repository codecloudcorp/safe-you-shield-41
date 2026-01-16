import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Cookie, Settings, BarChart3, Target, Lock, RefreshCw } from "lucide-react";

const CookiesPolicy = () => {
  const cookieTypes = [
    {
      icon: Settings,
      title: "Cookies Essenciais",
      description: "Necessários para o funcionamento básico do site. Sem eles, algumas funcionalidades podem não funcionar corretamente.",
      examples: ["Autenticação de usuário", "Preferências de sessão", "Segurança"],
      canDisable: false
    },
    {
      icon: BarChart3,
      title: "Cookies de Análise",
      description: "Nos ajudam a entender como os visitantes interagem com o site, permitindo melhorias contínuas.",
      examples: ["Páginas visitadas", "Tempo de permanência", "Origem do tráfego"],
      canDisable: true
    },
    {
      icon: Target,
      title: "Cookies de Marketing",
      description: "Utilizados para exibir anúncios relevantes e medir a eficácia das campanhas publicitárias.",
      examples: ["Anúncios personalizados", "Remarketing", "Redes sociais"],
      canDisable: true
    }
  ];

  const userRights = [
    {
      icon: Settings,
      title: "Configurar Preferências",
      description: "Você pode aceitar ou recusar cookies não essenciais a qualquer momento através do nosso banner de cookies."
    },
    {
      icon: Lock,
      title: "Bloquear Cookies",
      description: "Configure seu navegador para bloquear cookies. Note que isso pode afetar a funcionalidade do site."
    },
    {
      icon: RefreshCw,
      title: "Excluir Cookies",
      description: "Você pode excluir cookies já armazenados nas configurações do seu navegador."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-rose-soft/20 via-lavender/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-rose-soft/20 text-rose-soft px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Cookie className="w-4 h-4" />
              Transparência Digital
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Política de{" "}
              <span className="bg-gradient-to-r from-rose-soft to-lavender bg-clip-text text-transparent">
                Cookies
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Entenda como utilizamos cookies para melhorar sua experiência e como você pode gerenciar suas preferências.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Última atualização: Janeiro de 2026
            </p>
          </div>
        </div>
      </section>

      {/* O que são Cookies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-rose-soft to-lavender p-3 rounded-xl">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">O que são Cookies?</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou smartphone) quando você visita um site. Eles são amplamente utilizados para fazer sites funcionarem de forma mais eficiente e fornecer informações aos proprietários do site.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Na Safe You, utilizamos cookies para garantir que você tenha a melhor experiência possível, mantendo sua navegação segura e personalizada às suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Cookies */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Tipos de Cookies que Utilizamos
              </h2>
              <p className="text-muted-foreground">
                Diferentes cookies servem a propósitos diferentes
              </p>
            </div>

            <div className="space-y-6">
              {cookieTypes.map((cookie, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-lg border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-rose-soft to-lavender p-3 rounded-xl flex-shrink-0">
                      <cookie.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{cookie.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          cookie.canDisable 
                            ? "bg-lavender/20 text-lavender" 
                            : "bg-rose-soft/20 text-rose-soft"
                        }`}>
                          {cookie.canDisable ? "Opcional" : "Obrigatório"}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{cookie.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, i) => (
                          <span key={i} className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seus Direitos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Como Gerenciar seus Cookies
              </h2>
              <p className="text-muted-foreground">
                Você tem controle total sobre os cookies armazenados no seu dispositivo
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {userRights.map((right, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-lg border border-border text-center"
                >
                  <div className="bg-gradient-to-br from-rose-soft to-lavender p-3 rounded-xl w-fit mx-auto mb-4">
                    <right.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{right.title}</h3>
                  <p className="text-sm text-muted-foreground">{right.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookies de Terceiros */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Cookies de Terceiros</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Alguns cookies são colocados por serviços de terceiros que aparecem em nossas páginas. Esses cookies podem ser utilizados para:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-rose-soft flex-shrink-0 mt-0.5" />
                  <span>Análise de tráfego e comportamento do usuário (Google Analytics)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-rose-soft flex-shrink-0 mt-0.5" />
                  <span>Integração com redes sociais (Facebook, Instagram, LinkedIn)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-rose-soft flex-shrink-0 mt-0.5" />
                  <span>Serviços de chat e suporte ao cliente</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-rose-soft flex-shrink-0 mt-0.5" />
                  <span>Processamento de pagamentos seguros</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Recomendamos que você revise as políticas de privacidade desses terceiros para entender como eles utilizam cookies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tempo de Armazenamento */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Tempo de Armazenamento
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Cookies de Sessão</h3>
                  <p className="text-muted-foreground text-sm">
                    São temporários e são excluídos automaticamente quando você fecha o navegador. Utilizados para manter informações durante sua visita.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Cookies Persistentes</h3>
                  <p className="text-muted-foreground text-sm">
                    Permanecem no seu dispositivo por um período definido ou até serem excluídos manualmente. Utilizados para lembrar suas preferências.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-gradient-to-br from-rose-soft/10 to-lavender/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Dúvidas sobre Cookies?
              </h2>
              <p className="text-muted-foreground mb-6">
                Se você tiver dúvidas sobre o uso de cookies ou quiser exercer seus direitos de privacidade, entre em contato conosco.
              </p>
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <p className="text-foreground font-medium mb-2">Safe You Serviços Digitais LTDA</p>
                <p className="text-muted-foreground text-sm mb-1">CNPJ: 58.500.491/0001-10</p>
                <p className="text-muted-foreground text-sm mb-1">Florianópolis - SC | Goiânia - GO</p>
                <a href="mailto:contato@safeyou.com.br" className="text-rose-soft hover:underline text-sm">
                  contato@safeyou.com.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
