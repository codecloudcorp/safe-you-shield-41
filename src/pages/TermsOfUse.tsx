import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
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
            <h1 className="text-3xl font-bold">Termos de Uso</h1>
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
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Identificação da Empresa</h2>
            <p className="text-muted-foreground leading-relaxed">
              A plataforma <strong>Safe You</strong> é de propriedade e operada pela empresa inscrita no CNPJ nº <strong>58.500.491/0001-10</strong>, com sede nas cidades de <strong>Florianópolis - SC</strong> e <strong>Goiânia - GO</strong>, Brasil.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Objeto</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Safe You é uma plataforma especializada na verificação de antecedentes de pessoas, voltada para mulheres, famílias e empresas que desejam se proteger antes de iniciar relacionamentos pessoais, profissionais ou comerciais.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nossos serviços incluem a consulta de dados públicos e legalmente acessíveis para fornecer informações que auxiliem na tomada de decisões seguras.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao acessar e utilizar a plataforma Safe You, você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso. Caso não concorde com qualquer disposição aqui prevista, solicitamos que não utilize nossos serviços.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Conformidade com a LGPD</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Safe You opera em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), garantindo:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li><strong>Uso apenas de dados públicos e legalmente acessíveis:</strong> Todas as informações consultadas são obtidas de fontes públicas oficiais.</li>
              <li><strong>Transparência sobre as fontes de informação:</strong> Informamos claramente a origem dos dados apresentados.</li>
              <li><strong>Finalidade clara de proteção e prevenção:</strong> Os dados são utilizados exclusivamente para fins de segurança pessoal e profissional.</li>
              <li><strong>Consentimento do usuário:</strong> O uso da plataforma requer o consentimento expresso do usuário.</li>
              <li><strong>Segurança e criptografia dos dados:</strong> Utilizamos tecnologia de ponta para proteger todas as informações.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Cadastro e Responsabilidades do Usuário</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para utilizar os serviços da Safe You, o usuário deve:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li>Ser maior de 18 anos ou estar devidamente representado;</li>
              <li>Fornecer informações verdadeiras, atualizadas e completas durante o cadastro;</li>
              <li>Manter a confidencialidade de suas credenciais de acesso;</li>
              <li>Utilizar os serviços apenas para fins lícitos e de acordo com a legislação vigente;</li>
              <li>Não utilizar as informações obtidas para fins discriminatórios, ilegais ou antiéticos.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Uso das Informações</h2>
            <p className="text-muted-foreground leading-relaxed">
              As informações fornecidas pela Safe You têm caráter exclusivamente informativo e de auxílio à tomada de decisão. O usuário reconhece que:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li>Os dados apresentados são compilados de fontes públicas e podem não refletir a situação atual completa do consultado;</li>
              <li>A Safe You não se responsabiliza por decisões tomadas com base nas informações fornecidas;</li>
              <li>É vedado o uso das informações para assédio, perseguição, discriminação ou qualquer atividade ilegal;</li>
              <li>O compartilhamento indevido das informações obtidas é de responsabilidade exclusiva do usuário.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Propriedade Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo o conteúdo da plataforma Safe You, incluindo mas não se limitando a textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade exclusiva da empresa ou de seus fornecedores de conteúdo e está protegido pelas leis brasileiras e internacionais de propriedade intelectual.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Safe You não será responsável por:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
              <li>Danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou incapacidade de uso dos serviços;</li>
              <li>Interrupções temporárias no serviço por manutenção ou problemas técnicos;</li>
              <li>Ações de terceiros que violem a segurança da plataforma;</li>
              <li>Uso indevido das informações pelo usuário.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Pagamentos e Reembolsos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os valores dos serviços estão disponíveis na plataforma e podem ser alterados a qualquer momento, mediante aviso prévio. As políticas de reembolso seguem as disposições do Código de Defesa do Consumidor e estão detalhadas em nossa política específica.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Modificações dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Safe You reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma. O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Foro e Legislação Aplicável</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Florianópolis - SC para dirimir quaisquer controvérsias decorrentes destes termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">12. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para dúvidas, sugestões ou reclamações relacionadas a estes Termos de Uso, entre em contato conosco através do e-mail disponível em nossa plataforma ou pelos canais de atendimento indicados no rodapé do site.
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

export default TermsOfUse;
