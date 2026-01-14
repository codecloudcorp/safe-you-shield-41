import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <Shield className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Política de Privacidade</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introdução</h2>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>Safe You</strong>, inscrita no CNPJ nº <strong>58.500.491/0001-10</strong>, com sede em <strong>Florianópolis - SC</strong> e <strong>Goiânia - GO</strong>, está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais ao utilizar nossa plataforma.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Dados que Coletamos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Dados fornecidos por você:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Nome completo e CPF</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Dados de pagamento (processados por terceiros seguros)</li>
              <li>Informações das pessoas que você deseja consultar</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Dados coletados automaticamente:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Endereço IP e localização aproximada</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de navegação</li>
              <li>Cookies e tecnologias similares</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Como Utilizamos seus Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos suas informações para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li><strong>Prestação de serviços:</strong> Realizar as consultas de antecedentes solicitadas</li>
              <li><strong>Comunicação:</strong> Enviar notificações sobre sua conta, atualizações e informações relevantes</li>
              <li><strong>Melhoria dos serviços:</strong> Analisar o uso da plataforma para aprimorar a experiência do usuário</li>
              <li><strong>Segurança:</strong> Detectar e prevenir fraudes, abusos e atividades ilegais</li>
              <li><strong>Obrigações legais:</strong> Cumprir com exigências legais e regulatórias</li>
              <li><strong>Marketing:</strong> Com seu consentimento, enviar ofertas e novidades (você pode cancelar a qualquer momento)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Base Legal para Tratamento</h2>
            <p className="text-muted-foreground leading-relaxed">
              O tratamento de dados pessoais pela Safe You está fundamentado nas seguintes bases legais previstas na LGPD:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li><strong>Consentimento:</strong> Quando você autoriza expressamente o tratamento</li>
              <li><strong>Execução de contrato:</strong> Para cumprir nossas obrigações contratuais</li>
              <li><strong>Legítimo interesse:</strong> Para melhorar nossos serviços e sua experiência</li>
              <li><strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Safe You não vende, aluga ou comercializa seus dados pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li><strong>Prestadores de serviço:</strong> Empresas que nos auxiliam na operação da plataforma (hospedagem, pagamentos, análise de dados)</li>
              <li><strong>Obrigações legais:</strong> Quando exigido por lei, ordem judicial ou autoridade competente</li>
              <li><strong>Proteção de direitos:</strong> Para proteger os direitos, propriedade ou segurança da Safe You e seus usuários</li>
              <li><strong>Com seu consentimento:</strong> Em outras situações, mediante sua autorização expressa</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Segurança dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li>Criptografia SSL/TLS em todas as transmissões de dados</li>
              <li>Armazenamento seguro com criptografia em repouso</li>
              <li>Controle de acesso restrito aos dados</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e planos de recuperação</li>
              <li>Treinamento de equipe sobre proteção de dados</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Retenção de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo obrigações legais, contratuais, de prestação de contas ou requisição de autoridades competentes.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Após o término do período de retenção, os dados serão eliminados de forma segura ou anonimizados.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Seus Direitos</h2>
            <p className="text-muted-foreground leading-relaxed">
              De acordo com a LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessar suas informações</li>
              <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar quando os dados forem desnecessários ou tratados em desconformidade</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
              <li><strong>Eliminação:</strong> Solicitar a exclusão dos dados tratados com base no consentimento</li>
              <li><strong>Informação sobre compartilhamento:</strong> Saber com quais entidades seus dados foram compartilhados</li>
              <li><strong>Revogação do consentimento:</strong> Revogar seu consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> Opor-se ao tratamento em determinadas situações</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Para exercer seus direitos, entre em contato conosco através dos canais indicados nesta política.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Cookies e Tecnologias Similares</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência em nossa plataforma. Para mais informações, consulte nossa Política de Cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Transferência Internacional de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Seus dados podem ser processados em servidores localizados fora do Brasil. Nesses casos, garantimos que as transferências ocorram em conformidade com a LGPD, utilizando mecanismos adequados de proteção.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Alterações nesta Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas através de aviso em nossa plataforma ou por e-mail. Recomendamos que você revise esta página regularmente.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Contato e Encarregado de Dados (DPO)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, entre em contato conosco:
            </p>
            <ul className="list-none mt-4 space-y-2 text-muted-foreground">
              <li><strong>E-mail:</strong> privacidade@safeyou.com.br</li>
              <li><strong>Endereços:</strong> Florianópolis - SC | Goiânia - GO</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Você também tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </section>

          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <p className="text-center text-muted-foreground">
              <strong>Safe You</strong><br />
              CNPJ: 58.500.491/0001-10<br />
              Florianópolis - SC | Goiânia - GO
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Safe You. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
