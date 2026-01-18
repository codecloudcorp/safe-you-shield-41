import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Shield, Clock, ChevronDown } from "lucide-react";
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
}

const quickReplies: QuickReply[] = [
  { label: "💰 Preços", message: "Qual o preço?" },
  { label: "📱 Recursos", message: "Quais os recursos?" },
  { label: "🆘 Emergência", message: "Preciso de ajuda urgente" },
  { label: "❓ Ajuda", message: "Como funciona?" },
];

const botResponses: { [key: string]: string } = {
  "oi": "Olá! 👋 Seja bem-vinda à Safe You! Como posso ajudar você hoje?",
  "olá": "Olá! 👋 Seja bem-vinda à Safe You! Como posso ajudar você hoje?",
  "ola": "Olá! 👋 Seja bem-vinda à Safe You! Como posso ajudar você hoje?",
  "preço": "💰 **Nosso plano custa apenas R$4,90/mês**\n\n✅ 7 dias grátis para testar\n✅ Cancele quando quiser\n✅ Sem taxa de adesão\n\nQuer conhecer os recursos inclusos?",
  "preco": "💰 **Nosso plano custa apenas R$4,90/mês**\n\n✅ 7 dias grátis para testar\n✅ Cancele quando quiser\n✅ Sem taxa de adesão\n\nQuer conhecer os recursos inclusos?",
  "valor": "💰 **Nosso plano custa apenas R$4,90/mês**\n\n✅ 7 dias grátis para testar\n✅ Cancele quando quiser\n✅ Sem taxa de adesão\n\nQuer conhecer os recursos inclusos?",
  "quanto custa": "💰 **Nosso plano custa apenas R$4,90/mês**\n\n✅ 7 dias grátis para testar\n✅ Cancele quando quiser\n✅ Sem taxa de adesão\n\nQuer conhecer os recursos inclusos?",
  "funciona": "🛡️ **Como a Safe You funciona:**\n\n1️⃣ Baixe o app e cadastre-se\n2️⃣ Adicione seus contatos de confiança\n3️⃣ Configure o botão de pânico\n4️⃣ Em emergências, acione discretamente\n\nSeus contatos recebem sua localização em tempo real!",
  "como funciona": "🛡️ **Como a Safe You funciona:**\n\n1️⃣ Baixe o app e cadastre-se\n2️⃣ Adicione seus contatos de confiança\n3️⃣ Configure o botão de pânico\n4️⃣ Em emergências, acione discretamente\n\nSeus contatos recebem sua localização em tempo real!",
  "emergência": "🚨 **Em caso de emergência:**\n\n📞 **190** - Polícia Militar\n📞 **180** - Central da Mulher\n📞 **192** - SAMU\n\nSe você está em perigo, ligue agora. Sua segurança é prioridade!",
  "emergencia": "🚨 **Em caso de emergência:**\n\n📞 **190** - Polícia Militar\n📞 **180** - Central da Mulher\n📞 **192** - SAMU\n\nSe você está em perigo, ligue agora. Sua segurança é prioridade!",
  "urgente": "🚨 **Em caso de emergência:**\n\n📞 **190** - Polícia Militar\n📞 **180** - Central da Mulher\n📞 **192** - SAMU\n\nSe você está em perigo, ligue agora. Sua segurança é prioridade!",
  "ajuda": "💜 **Como posso ajudar?**\n\nEscolha uma opção:\n• **Preços** - Conheça nossos planos\n• **Recursos** - Veja o que oferecemos\n• **Emergência** - Números importantes\n• **Contato** - Fale com nossa equipe",
  "suporte": "👩‍💻 **Nosso suporte:**\n\n📧 contato@safeyou.com.br\n📱 WhatsApp: (11) 99999-9999\n⏰ Seg-Sex: 9h às 18h\n\nOu continue conversando aqui!",
  "contato": "📞 **Fale conosco:**\n\n📧 contato@safeyou.com.br\n📱 WhatsApp: (11) 99999-9999\n📍 São Paulo, SP\n\nEstamos aqui para ajudar!",
  "dicas": "📚 **Dicas de proteção:**\n\n• Sempre avise alguém sobre seus planos\n• Compartilhe sua localização em tempo real\n• Tenha contatos de emergência salvos\n• Confie nos seus instintos\n\nAcesse nosso site para mais dicas!",
  "obrigada": "💜 De nada! Estou sempre aqui para ajudar. Cuide-se e conte conosco! 🛡️",
  "obrigado": "💜 De nada! Estou sempre aqui para ajudar. Cuide-se e conte conosco! 🛡️",
  "tchau": "👋 Até logo! Lembre-se: sua segurança é nossa prioridade! 💜",
  "bye": "👋 Até logo! Lembre-se: sua segurança é nossa prioridade! 💜",
  "recursos": "📱 **Recursos da Safe You:**\n\n🚨 Botão de pânico silencioso\n📍 Localização em tempo real\n👥 Até 5 contatos de emergência\n🎙️ Gravação discreta de áudio\n📱 Alerta por SMS automático\n🛡️ Monitoramento 24/7\n⚡ Acionamento por shake",
  "app": "📲 **Nosso app:**\n\nDisponível para Android e iOS!\n\n✅ 7 dias grátis\n✅ Interface simples\n✅ Funciona offline\n\nBaixe e comece a se proteger!",
  "download": "📲 O app Safe You estará disponível em breve na Play Store e App Store!\n\nCadastre-se para ser avisada do lançamento! 💜",
  "segurança": "🛡️ A Safe You foi criada para sua proteção!\n\nCom tecnologia discreta e eficiente, você pode se sentir mais segura no dia a dia.\n\nSua segurança é nossa missão! 💜",
  "seguranca": "🛡️ A Safe You foi criada para sua proteção!\n\nCom tecnologia discreta e eficiente, você pode se sentir mais segura no dia a dia.\n\nSua segurança é nossa missão! 💜",
};

const defaultResponse = "Não entendi sua mensagem, mas estou aqui para ajudar! 💜\n\nTente perguntar sobre:\n• **Preços** e planos\n• **Recursos** do app\n• **Emergência** e contatos\n• **Como funciona** o app";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Sou a assistente virtual da Safe You.\n\nComo posso ajudar você hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
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
    if (isOpen && inputRef.current) {
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
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] bg-background rounded-2xl shadow-2xl overflow-hidden border border-border/50"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-4">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Safe You</h3>
                    <div className="flex items-center gap-1.5 text-white/80 text-xs">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online agora
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="h-[320px] overflow-y-auto p-4 bg-gradient-to-b from-muted/30 to-background scroll-smooth"
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
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-md">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div
                          className={`p-3 shadow-sm ${
                            message.isBot
                              ? "bg-white dark:bg-muted rounded-2xl rounded-bl-md border border-border/50"
                              : "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl rounded-br-md"
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
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white dark:bg-muted p-3 rounded-2xl rounded-bl-md border border-border/50 shadow-sm">
                      <div className="flex gap-1.5">
                        <motion.span 
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span 
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                        />
                        <motion.span 
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
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
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-border/50 bg-muted/30">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.label}
                    onClick={() => handleSendMessage(reply.message)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium bg-white dark:bg-muted border border-border/50 rounded-full hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 shadow-sm"
                  >
                    {reply.label}
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
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-purple-400 rounded-xl"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
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
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-ping opacity-20" />
            <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur-sm" />
          </>
        )}
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:shadow-xl transition-all duration-300">
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
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Notification badge */}
          {!isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md"
            >
              1
            </motion.span>
          )}
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background text-sm font-medium px-3 py-2 rounded-xl whitespace-nowrap shadow-lg">
              Precisa de ajuda? 💜
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </div>
        )}
      </motion.button>
    </>
  );
};

export default FloatingWhatsApp;
