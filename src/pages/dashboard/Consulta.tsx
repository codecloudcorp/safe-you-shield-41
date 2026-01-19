import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  ShieldX
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";

type SimulationType = "seguro" | "alerta" | "perigo";

const Consulta = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cpfValue, setCpfValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchStep, setSearchStep] = useState("");
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationType | null>(null);
  const [searchResult, setSearchResult] = useState<null | {
    status: "safe" | "caution" | "alert";
    name: string;
    details: string[];
  }>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpfValue(formatted);
      setSelectedSimulation(null);
      setSearchResult(null);
    }
  };

  const simulationOptions = [
    {
      type: "seguro" as SimulationType,
      label: "Perfil Seguro",
      description: "Simular pessoa sem pendências",
      icon: ShieldCheck,
      color: "text-safe-green",
      bgColor: "bg-safe-green/10",
      borderColor: "border-safe-green/30",
      hoverColor: "hover:bg-safe-green/20",
    },
    {
      type: "alerta" as SimulationType,
      label: "Atenção",
      description: "Simular pessoa com alertas",
      icon: ShieldAlert,
      color: "text-caution-yellow",
      bgColor: "bg-caution-yellow/10",
      borderColor: "border-caution-yellow/30",
      hoverColor: "hover:bg-caution-yellow/20",
    },
    {
      type: "perigo" as SimulationType,
      label: "Alto Risco",
      description: "Simular pessoa perigosa",
      icon: ShieldX,
      color: "text-alert-red",
      bgColor: "bg-alert-red/10",
      borderColor: "border-alert-red/30",
      hoverColor: "hover:bg-alert-red/20",
    },
  ];

  const handleSimulationSelect = (type: SimulationType) => {
    setSelectedSimulation(type);
  };

  const searchSteps = [
    "Validando CPF...",
    "Consultando bases criminais...",
    "Verificando processos cíveis...",
    "Analisando restrições financeiras...",
    "Compilando resultados..."
  ];

  // Haptic feedback function
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'success') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [30],
        medium: [50],
        success: [50, 50, 100]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Sound feedback function using Web Audio API
  const playStepSound = (isComplete: boolean = false) => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (isComplete) {
        // Success sound - two ascending tones
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      } else {
        // Step sound - subtle tick
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    } catch {
      // Audio not supported, fail silently
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpfValue.trim() || cpfValue.length < 14 || !selectedSimulation) return;
    
    setIsSearching(true);
    setSearchResult(null);
    setSearchProgress(0);
    setSearchStep(searchSteps[0]);
    
    // Initial feedback
    triggerHapticFeedback('light');
    playStepSound();

    // Simulate progress updates
    const totalDuration = 3000;
    const stepDuration = totalDuration / searchSteps.length;
    
    searchSteps.forEach((step, index) => {
      setTimeout(() => {
        setSearchStep(step);
        setSearchProgress(((index + 1) / searchSteps.length) * 100);
        
        // Feedback for each step
        if (index < searchSteps.length - 1) {
          triggerHapticFeedback('light');
          playStepSound();
        }
      }, stepDuration * index);
    });

    // Complete the search
    setTimeout(() => {
      const statusMap: Record<SimulationType, "safe" | "caution" | "alert"> = {
        seguro: "safe",
        alerta: "caution",
        perigo: "alert",
      };

      const detailsMap: Record<SimulationType, string[]> = {
        seguro: [
          "Nenhum registro criminal encontrado",
          "CPF regular na Receita Federal",
          "Sem restrições financeiras",
          "Histórico completamente limpo",
        ],
        alerta: [
          "CPF regular na Receita Federal",
          "Possui processos cíveis em andamento",
          "Restrição financeira identificada",
          "Recomenda-se cautela ao prosseguir",
        ],
        perigo: [
          "Antecedentes criminais identificados",
          "Múltiplos processos judiciais ativos",
          "Restrições financeiras graves",
          "Alto risco - evite contato",
        ],
      };
      
      setSearchResult({
        status: statusMap[selectedSimulation],
        name: "Resultado da Consulta",
        details: detailsMap[selectedSimulation],
      });
      setIsSearching(false);
      setSearchProgress(0);
      
      // Success feedback
      triggerHapticFeedback('success');
      playStepSound(true);
    }, totalDuration);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "safe":
        return { 
          color: "bg-safe-green", 
          bgLight: "bg-safe-green/10",
          text: "Situação Regular", 
          textColor: "text-safe-green",
          icon: CheckCircle,
          description: "Não foram encontradas pendências ou alertas significativos."
        };
      case "caution":
        return { 
          color: "bg-caution-yellow", 
          bgLight: "bg-caution-yellow/10",
          text: "Atenção Recomendada", 
          textColor: "text-caution-yellow",
          icon: AlertTriangle,
          description: "Foram encontrados alguns pontos que merecem atenção."
        };
      case "alert":
        return { 
          color: "bg-alert-red", 
          bgLight: "bg-alert-red/10",
          text: "Alerta de Segurança", 
          textColor: "text-alert-red",
          icon: XCircle,
          description: "Foram encontradas pendências importantes. Tenha cautela."
        };
      default:
        return { 
          color: "bg-muted", 
          bgLight: "bg-muted/50",
          text: "Pendente", 
          textColor: "text-muted-foreground",
          icon: Clock,
          description: ""
        };
    }
  };

  const isCpfValid = cpfValue.length === 14;

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <main className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Nova Consulta</h1>
            <p className="text-muted-foreground text-sm">
              Verifique informações de segurança através do CPF
            </p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Consulta por CPF
                </CardTitle>
                <CardDescription>
                  Digite o CPF e escolha o tipo de simulação para testar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">Número do CPF</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={cpfValue}
                        onChange={handleCPFChange}
                        className="h-14 pl-11 text-lg"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Digite apenas os números do CPF
                    </p>
                  </div>

                  {/* Simulation Type Selection */}
                  {isCpfValid && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3"
                    >
                      <Label>Selecione o tipo de simulação</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {simulationOptions.map((option) => {
                          const Icon = option.icon;
                          const isSelected = selectedSimulation === option.type;
                          
                          return (
                            <motion.button
                              key={option.type}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSimulationSelect(option.type)}
                              className={cn(
                                "p-4 rounded-xl border-2 transition-all text-left",
                                option.bgColor,
                                option.hoverColor,
                                isSelected 
                                  ? `${option.borderColor.replace('/30', '')} ring-2 ring-offset-2 ${option.borderColor.replace('border-', 'ring-').replace('/30', '/50')}`
                                  : "border-transparent"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  option.bgColor
                                )}>
                                  <Icon className={cn("w-5 h-5", option.color)} />
                                </div>
                                <div>
                                  <p className={cn("font-semibold", option.color)}>
                                    {option.label}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-2 right-2"
                                >
                                  <CheckCircle className={cn("w-5 h-5", option.color)} />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-rose-soft to-lavender text-white text-lg font-medium"
                    disabled={isSearching || !isCpfValid || !selectedSimulation}
                  >
                    {isSearching ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        {!isCpfValid 
                          ? "Digite o CPF completo" 
                          : !selectedSimulation 
                            ? "Selecione o tipo de simulação"
                            : "Consultar CPF"
                        }
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Progress Bar during Search */}
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-lavender/30 bg-gradient-to-r from-lavender/5 to-turquoise/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 bg-gradient-to-br from-lavender to-turquoise rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Search className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        Consultando bases de dados...
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {searchStep}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-lavender">
                      {Math.round(searchProgress)}%
                    </span>
                  </div>
                  <Progress 
                    value={searchProgress} 
                    className="h-2 bg-muted"
                  />
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {searchSteps.map((step, index) => {
                      const stepProgress = ((index + 1) / searchSteps.length) * 100;
                      const isCompleted = searchProgress >= stepProgress;
                      const isCurrent = searchStep === step;
                      return (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "flex items-center justify-center p-2 rounded-lg text-xs text-center transition-colors",
                            isCompleted ? "bg-safe-green/20 text-safe-green" :
                            isCurrent ? "bg-lavender/20 text-lavender" : "bg-muted text-muted-foreground"
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : isCurrent ? (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-lavender"
                            />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Search Result */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={cn("border-2", getStatusConfig(searchResult.status).textColor.replace("text-", "border-"))}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        getStatusConfig(searchResult.status).bgLight
                      )}
                    >
                      {(() => {
                        const StatusIcon = getStatusConfig(searchResult.status).icon;
                        return <StatusIcon className={cn("w-7 h-7", getStatusConfig(searchResult.status).textColor)} />;
                      })()}
                    </motion.div>
                    <div>
                      <CardTitle className={getStatusConfig(searchResult.status).textColor}>
                        {getStatusConfig(searchResult.status).text}
                      </CardTitle>
                      <CardDescription>
                        {getStatusConfig(searchResult.status).description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-muted/30 rounded-lg p-3 mb-4">
                      <p className="text-xs text-muted-foreground mb-1">CPF Consultado</p>
                      <p className="font-mono font-semibold text-foreground">{cpfValue}</p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Detalhes da consulta:</p>
                    {searchResult.details.map((detail, index) => {
                      const statusConfig = getStatusConfig(searchResult.status);
                      const DetailIcon = searchResult.status === "safe" ? CheckCircle : 
                                        searchResult.status === "caution" ? AlertTriangle : XCircle;
                      return (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn("flex items-center gap-3 p-3 rounded-lg", statusConfig.bgLight)}
                        >
                          <DetailIcon className={cn("w-4 h-4 flex-shrink-0", statusConfig.textColor)} />
                          <span className="text-sm text-foreground">{detail}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setCpfValue("");
                        setSelectedSimulation(null);
                        setSearchResult(null);
                      }}
                    >
                      Nova Consulta
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-rose-soft to-lavender text-white"
                      onClick={() => navigate("/dashboard/consulta/detalhe", { 
                        state: { 
                          cpf: cpfValue,
                          status: searchResult.status,
                          name: searchResult.name,
                          details: searchResult.details,
                          simulationType: selectedSimulation
                        } 
                      })}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-r from-lavender/10 to-turquoise/10 border-lavender/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-lavender to-turquoise rounded-xl flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Modo de Demonstração
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Esta é uma versão de demonstração. Selecione o tipo de resultado 
                      que deseja simular para testar as diferentes respostas do sistema. 
                      Em produção, os resultados serão obtidos de bases de dados reais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Consulta;
