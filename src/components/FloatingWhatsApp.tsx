import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Shield, Clock, ChevronDown, Sparkles, Heart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  message: string;
  icon: string;
}

const quickReplies: QuickReply[] = [
  { label: "Como funciona?", message: "Como funciona a verificação?", icon: "🔍" },
  { label: "Preços", message: "Qual o preço da consulta?", icon: "💰" },
  { label: "É seguro?", message: "É seguro e confidencial?", icon: "🔒" },
  { label: "Tempo", message: "Quanto tempo demora?", icon: "⏱️" },
  { label: "Família", message: "Como proteger minha família?", icon: "👨‍👩‍👧" },
];

const botResponses: { [key: string]: string } = {
  "oi": "Olá! 👋 Seja bem-vinda à **Safe You**!\n\nSou a Sofia, sua assistente virtual de segurança. Como posso te ajudar hoje?",
  "olá": "Olá! 👋 Seja bem-vinda à **Safe You**!\n\nSou a Sofia, sua assistente virtual de segurança. Como posso te ajudar hoje?",
  "ola": "Olá! 👋 Seja bem-vinda à **Safe You**!\n\nSou a Sofia, sua assistente virtual de segurança. Como posso te ajudar hoje?",
  "funciona": "🔍 **Como funciona a Safe You:**\n\n1️⃣ Digite o CPF da pessoa\n2️⃣ Nossa tecnologia consulta bases oficiais\n3️⃣ Receba o relatório em segundos\n\n✅ Verificamos antecedentes criminais e processos em **todos os 27 estados**!",
  "como funciona": "🔍 **Como funciona a Safe You:**\n\n1️⃣ Digite o CPF da pessoa\n2️⃣ Nossa tecnologia consulta bases oficiais\n3️⃣ Receba o relatório em segundos\n\n✅ Verificamos antecedentes criminais e processos em **todos os 27 estados**!",
  "verificação": "🔍 **Como funciona a Safe You:**\n\n1️⃣ Digite o CPF da pessoa\n2️⃣ Nossa tecnologia consulta bases oficiais\n3️⃣ Receba o relatório em segundos\n\n✅ Verificamos antecedentes criminais e processos em **todos os 27 estados**!",
  "preço": "💰 **Nossos planos:**\n\n📋 **Consulta Avulsa** - R$19\nPara verificações pontuais\n\n⭐ **Plano Mensal** - R$29/mês\n5 consultas + suporte prioritário\n\n👨‍👩‍👧 **Plano Família** - R$49/mês\n15 consultas para toda família\n\n✅ Garantia de 7 dias!",
  "preco": "💰 **Nossos planos:**\n\n📋 **Consulta Avulsa** - R$19\nPara verificações pontuais\n\n⭐ **Plano Mensal** - R$29/mês\n5 consultas + suporte prioritário\n\n👨‍👩‍👧 **Plano Família** - R$49/mês\n15 consultas para toda família\n\n✅ Garantia de 7 dias!",
  "valor": "💰 **Nossos planos:**\n\n📋 **Consulta Avulsa** - R$19\nPara verificações pontuais\n\n⭐ **Plano Mensal** - R$29/mês\n5 consultas + suporte prioritário\n\n👨‍👩‍👧 **Plano Família** - R$49/mês\n15 consultas para toda família\n\n✅ Garantia de 7 dias!",
  "quanto custa": "💰 **Nossos planos:**\n\n📋 **Consulta Avulsa** - R$19\nPara verificações pontuais\n\n⭐ **Plano Mensal** - R$29/mês\n5 consultas + suporte prioritário\n\n👨‍👩‍👧 **Plano Família** - R$49/mês\n15 consultas para toda família\n\n✅ Garantia de 7 dias!",
  "seguro": "🔒 **Segurança Total:**\n\n✅ 100% confidencial\n✅ Dados criptografados\n✅ Conforme LGPD\n✅ Ninguém fica sabendo\n\nSua privacidade é nossa prioridade! 💜",
  "confidencial": "🔒 **Segurança Total:**\n\n✅ 100% confidencial\n✅ Dados criptografados\n✅ Conforme LGPD\n✅ Ninguém fica sabendo\n\nSua privacidade é nossa prioridade! 💜",
  "lgpd": "🔒 **Conformidade LGPD:**\n\nA Safe You está 100% em conformidade com a Lei Geral de Proteção de Dados.\n\n✅ Seus dados são protegidos\n✅ Consultas são confidenciais\n✅ Não compartilhamos informações",
  "tempo": "⏱️ **Resultado Instantâneo!**\n\nEm segundos você recebe:\n• Status de antecedentes\n• Processos judiciais\n• Índice de confiabilidade\n• Semáforo de segurança\n\n🟢🟡🔴 Simples e direto!",
  "demora": "⏱️ **Resultado Instantâneo!**\n\nEm segundos você recebe:\n• Status de antecedentes\n• Processos judiciais\n• Índice de confiabilidade\n• Semáforo de segurança\n\n🟢🟡🔴 Simples e direto!",
  "ajuda": "💜 **Como posso ajudar?**\n\nEscolha uma opção:\n• **Como funciona** - Entenda o processo\n• **Preços** - Conheça nossos planos\n• **Segurança** - Privacidade e LGPD\n• **Contato** - Fale com nossa equipe",
  "suporte": "👩‍💻 **Nosso suporte:**\n\n📧 contato@safeyou.com.br\n📱 WhatsApp: (11) 99999-9999\n⏰ Seg-Sex: 9h às 18h\n\nOu continue conversando aqui!",
  "contato": "📞 **Fale conosco:**\n\n📧 contato@safeyou.com.br\n📱 WhatsApp: (11) 99999-9999\n\nEstamos aqui para ajudar! 💜",
  "antecedentes": "🔍 **Verificação de Antecedentes:**\n\nConsultamos:\n• Antecedentes criminais federais\n• Processos em todos os 27 estados\n• Tribunais estaduais e federais\n• Bases oficiais atualizadas\n\nResultado em segundos!",
  "criminais": "🔍 **Verificação de Antecedentes:**\n\nConsultamos:\n• Antecedentes criminais federais\n• Processos em todos os 27 estados\n• Tribunais estaduais e federais\n• Bases oficiais atualizadas\n\nResultado em segundos!",
  "cpf": "🔍 **Consulta por CPF:**\n\nCom o CPF você verifica:\n• Antecedentes criminais\n• Processos judiciais\n• Score de confiabilidade\n\nAcesse o painel para começar!",
  "obrigada": "💜 De nada! Fico feliz em ajudar!\n\n**Verifique antes, confie depois!** 🛡️\n\nPrecisa de mais alguma coisa?",
  "obrigado": "💜 De nada! Fico feliz em ajudar!\n\n**Verifique antes, confie depois!** 🛡️\n\nPrecisa de mais alguma coisa?",
  "tchau": "👋 Até logo!\n\nLembre-se: sua segurança vem primeiro! 🛡️💜",
  "bye": "👋 Até logo!\n\nLembre-se: sua segurança vem primeiro! 🛡️💜",
  "mulher": "💜 **Feita para Mulheres:**\n\nA Safe You foi criada pensando em você!\n\n• Verifique pretendentes de apps\n• Conheça melhor novos contatos\n• Proteja-se antes de encontros\n\nSua segurança é nossa missão!",
  "namoro": "💜 **Dica de Segurança:**\n\nAntes de um encontro:\n✅ Verifique na Safe You\n✅ Avise alguém de confiança\n✅ Encontre em local público\n\nSua segurança em primeiro lugar!",
  "encontro": "💜 **Dica de Segurança:**\n\nAntes de um encontro:\n✅ Verifique na Safe You\n✅ Avise alguém de confiança\n✅ Encontre em local público\n\nSua segurança em primeiro lugar!",
  "família": "👨‍👩‍👧 **Proteção para Famílias:**\n\nVerifique antes de contratar:\n• Babás e cuidadores\n• Funcionários domésticos\n• Prestadores de serviço\n\nO Plano Família (R$49/mês) inclui 15 consultas!",
  "familia": "👨‍👩‍👧 **Proteção para Famílias:**\n\nVerifique antes de contratar:\n• Babás e cuidadores\n• Funcionários domésticos\n• Prestadores de serviço\n\nO Plano Família (R$49/mês) inclui 15 consultas!",
  "babá": "👶 **Contratando Babá?**\n\nVerifique antes:\n• Antecedentes criminais\n• Histórico judicial\n• Confiabilidade\n\nA segurança dos seus filhos é prioridade!",
  "baba": "👶 **Contratando Babá?**\n\nVerifique antes:\n• Antecedentes criminais\n• Histórico judicial\n• Confiabilidade\n\nA segurança dos seus filhos é prioridade!",
  "plano": "💰 **Nossos planos:**\n\n📋 **Avulsa** - R$19 (1 consulta)\n⭐ **Mensal** - R$29/mês (5 consultas)\n👨‍👩‍👧 **Família** - R$49/mês (15 consultas)\n\nTodos com garantia de 7 dias!",
};

const defaultResponse = "Não entendi completamente, mas estou aqui para ajudar! 💜\n\nPosso te explicar sobre:\n• **Como funciona** a verificação\n• **Preços** dos planos\n• **Segurança** e privacidade\n• Proteção para **famílias**\n\nO que você gostaria de saber?";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Sou a **Sofia**, assistente virtual da Safe You.\n\nEstou aqui para tirar suas dúvidas sobre segurança e verificação de antecedentes. Como posso ajudar? 💜",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return defaultResponse;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/50"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-rose-soft via-primary to-lavender p-4">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center">
                        <span className="text-2xl">👩‍💼</span>
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-safe-green rounded-full ring-2 ring-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg flex items-center gap-1.5">
                      Sofia
                      <Sparkles className="w-4 h-4 text-caution-yellow" />
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <span className="w-1.5 h-1.5 bg-safe-green rounded-full animate-pulse" />
                      Assistente Safe You • Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Trust Banner */}
            <div className="bg-gradient-to-r from-safe-green/10 to-safe-green/5 px-4 py-2 border-b border-safe-green/20 flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5 text-safe-green" />
              <span className="text-xs font-medium text-safe-green">Conversa 100% segura e confidencial</span>
            </div>

            {/* Messages Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="h-[280px] sm:h-[320px] overflow-y-auto p-4 bg-gradient-to-b from-rose-light/20 to-background scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index === messages.length - 1 ? 0.1 : 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}>
                      {message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center shrink-0 shadow-md text-sm">
                          👩‍💼
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div
                          className={`p-3 shadow-sm ${
                            message.isBot
                              ? "bg-white dark:bg-muted rounded-2xl rounded-bl-sm border border-border/50"
                              : "bg-gradient-to-r from-rose-soft to-lavender text-white rounded-2xl rounded-br-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{renderMessageText(message.text)}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] text-muted-foreground ${message.isBot ? "ml-1" : "mr-1 justify-end"}`}>
                          <Clock className="w-3 h-3" />
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-soft to-lavender flex items-center justify-center shadow-md text-sm">
                      👩‍💼
                    </div>
                    <div className="bg-white dark:bg-muted p-3 rounded-2xl rounded-bl-sm border border-border/50 shadow-sm">
                      <div className="flex gap-1.5 items-center">
                        <span className="text-xs text-muted-foreground mr-1">Sofia está digitando</span>
                        <motion.span 
                          className="w-1.5 h-1.5 bg-rose-soft rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span 
                          className="w-1.5 h-1.5 bg-rose-soft rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span 
                          className="w-1.5 h-1.5 bg-rose-soft rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Scroll to bottom button */}
              <AnimatePresence>
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToBottom}
                    className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-rose-soft text-white p-2 rounded-full shadow-lg hover:bg-rose-soft/90 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Replies */}
            <div className="px-3 py-2 border-t border-border/50 bg-muted/30">
              <p className="text-[10px] text-muted-foreground mb-2 font-medium">Perguntas rápidas:</p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.label}
                    onClick={() => handleSendMessage(reply.message)}
                    className="shrink-0 px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-card border border-rose-soft/30 rounded-full hover:border-rose-soft hover:bg-rose-light/50 dark:hover:bg-rose-soft/20 transition-all duration-200 shadow-sm text-foreground flex items-center gap-1"
                  >
                    <span>{reply.icon}</span>
                    <span>{reply.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border/50 bg-background">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua dúvida..."
                  className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-rose-soft rounded-xl text-sm"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-rose-soft to-lavender hover:opacity-90 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Protegido por criptografia • <span className="text-rose-soft">Safe You</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 group"
      >
        {/* Pulse Animation */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-soft to-lavender animate-ping opacity-20" />
            <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-rose-soft to-lavender opacity-30 blur-sm" />
          </>
        )}
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-rose-soft to-lavender shadow-lg hover:shadow-xl transition-all duration-300">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Notification badge */}
          {!isOpen && hasNewMessage && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-safe-green rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shadow-md ring-2 ring-background"
            >
              1
            </motion.span>
          )}
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:block"
          >
            <div className="bg-card text-foreground text-sm font-medium px-4 py-2.5 rounded-xl whitespace-nowrap shadow-lg border border-border/50 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-soft" />
              <span>Fale com a Sofia</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-card border-r border-b border-border/50 rotate-[-45deg]" />
            </div>
          </motion.div>
        )}
      </motion.button>
    </>
  );
};

export default FloatingWhatsApp;
