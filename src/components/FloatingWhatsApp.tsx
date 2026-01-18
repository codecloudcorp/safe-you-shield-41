import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: { [key: string]: string } = {
  "oi": "Olá! 👋 Seja bem-vinda à Safe You! Como posso ajudar você hoje?",
  "olá": "Olá! 👋 Seja bem-vinda à Safe You! Como posso ajudar você hoje?",
  "ola": "Olá! 👋 Seja bem-vinda à Safe You! Como posso ajudar você hoje?",
  "preço": "Nosso plano custa apenas R$4,90/mês, com 7 dias grátis para você testar! 💜 Quer saber mais sobre os recursos inclusos?",
  "preco": "Nosso plano custa apenas R$4,90/mês, com 7 dias grátis para você testar! 💜 Quer saber mais sobre os recursos inclusos?",
  "valor": "Nosso plano custa apenas R$4,90/mês, com 7 dias grátis para você testar! 💜 Quer saber mais sobre os recursos inclusos?",
  "quanto custa": "Nosso plano custa apenas R$4,90/mês, com 7 dias grátis para você testar! 💜 Quer saber mais sobre os recursos inclusos?",
  "funciona": "A Safe You é um app de proteção pessoal que inclui: botão de pânico, localização em tempo real, contatos de emergência, gravação discreta e muito mais! 🛡️",
  "como funciona": "A Safe You é um app de proteção pessoal que inclui: botão de pânico, localização em tempo real, contatos de emergência, gravação discreta e muito mais! 🛡️",
  "emergência": "Em caso de emergência, você pode acionar o botão de pânico no app que alertará seus contatos de confiança com sua localização! 🚨 Ligue também 190 (Polícia) ou 180 (Central da Mulher).",
  "emergencia": "Em caso de emergência, você pode acionar o botão de pânico no app que alertará seus contatos de confiança com sua localização! 🚨 Ligue também 190 (Polícia) ou 180 (Central da Mulher).",
  "ajuda": "Estou aqui para ajudar! 💜 Você pode perguntar sobre:\n• Preços e planos\n• Como funciona o app\n• Recursos de segurança\n• Dicas de proteção\n• Contato com suporte",
  "suporte": "Para falar com nosso suporte humano, você pode nos enviar um email para contato@safeyou.com.br ou continuar conversando aqui! 💜",
  "contato": "Você pode nos contatar por:\n📧 Email: contato@safeyou.com.br\n📱 WhatsApp: (11) 99999-9999\n💬 Ou continue conversando aqui!",
  "dicas": "Temos várias dicas de proteção no nosso site! Acesse a seção 'Dicas de Proteção' no menu. Algumas dicas rápidas:\n• Sempre avise alguém sobre seus planos\n• Compartilhe sua localização\n• Tenha contatos de emergência salvos",
  "obrigada": "De nada! 💜 Estou sempre aqui para ajudar. Cuide-se! 🛡️",
  "obrigado": "De nada! 💜 Estou sempre aqui para ajudar. Cuide-se! 🛡️",
  "tchau": "Até logo! 👋 Lembre-se: sua segurança é nossa prioridade! 💜",
  "bye": "Até logo! 👋 Lembre-se: sua segurança é nossa prioridade! 💜",
  "recursos": "A Safe You oferece:\n🚨 Botão de pânico silencioso\n📍 Compartilhamento de localização\n👥 Até 5 contatos de emergência\n🎙️ Gravação discreta de áudio\n📱 Alerta por SMS automático\n🛡️ Monitoramento 24/7",
  "app": "Nosso app está disponível para Android e iOS! Você pode baixar e testar grátis por 7 dias. 📱",
  "download": "O app Safe You estará disponível em breve na Play Store e App Store! Cadastre-se para ser avisada do lançamento! 📱",
  "segurança": "A Safe You foi criada para sua segurança! Com tecnologia discreta e eficiente, você pode se sentir mais protegida no dia a dia. 🛡️💜",
  "seguranca": "A Safe You foi criada para sua segurança! Com tecnologia discreta e eficiente, você pode se sentir mais protegida no dia a dia. 🛡️💜",
};

const defaultResponse = "Obrigada pela sua mensagem! 💜 Para falar com nosso time, digite 'ajuda' para ver as opções ou 'contato' para nossos canais de atendimento.";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! 👋 Sou a assistente virtual da Safe You. Como posso ajudar você hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return defaultResponse;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Safe You</h3>
                    <p className="text-xs text-white/80">Assistente Virtual</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-80 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isBot
                          ? "bg-muted text-foreground rounded-tl-sm"
                          : "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-tr-sm"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.isBot && (
                          <Bot className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                        )}
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {!message.isBot && (
                          <User className="w-4 h-4 mt-0.5 shrink-0" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Digite "ajuda" para ver as opções
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
        transition={{ delay: 1, duration: 0.3, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        {/* Pulse Animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-ping opacity-30" />
        )}
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:shadow-xl transition-shadow">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-foreground text-background text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Fale conosco
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </div>
        )}
      </motion.button>
    </>
  );
};

export default FloatingWhatsApp;
