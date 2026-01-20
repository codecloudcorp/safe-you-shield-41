import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  FileText,
  Info,
  X,
  User,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Consulta = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cpfValue, setCpfValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [searchStep, setSearchStep] = useState("");
  
  const searchTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    if (formatted.length <= 14) {
      setCpfValue(formatted);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    if (formatted.length <= 15) {
      setPhoneValue(formatted);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const searchSteps = [
    "Validando dados informados...",
    "Consultando bases criminais...",
    "Verificando processos cíveis...",
    "Analisando restrições financeiras...",
    "Compilando resultados..."
  ];

  const hasAnyField = cpfValue.trim().length > 0 || phoneValue.trim().length > 0 || nameValue.trim().length > 0;

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAnyField) return;
    
    searchTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    searchTimeoutsRef.current = [];
    
    setIsSearching(true);
    setSearchProgress(0);
    setSearchStep(searchSteps[0]);
    
    triggerHapticFeedback('light');

    const totalDuration = 3000;
    const stepDuration = totalDuration / searchSteps.length;
    
    searchSteps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setSearchStep(step);
        setSearchProgress(((index + 1) / searchSteps.length) * 100);
        
        if (index < searchSteps.length - 1) {
          triggerHapticFeedback('light');
        }
      }, stepDuration * index);
      searchTimeoutsRef.current.push(timeout);
    });

    const completeTimeout = setTimeout(() => {
      setIsSearching(false);
      setSearchProgress(0);
      searchTimeoutsRef.current = [];
      
      triggerHapticFeedback('success');
      
      // Navigate to details page with search data
      navigate("/dashboard/consulta/detalhe", { 
        state: { 
          cpf: cpfValue || undefined,
          phone: phoneValue || undefined,
          name: nameValue || undefined,
        } 
      });
      
      toast.success("Consulta realizada com sucesso!");
    }, totalDuration);
    searchTimeoutsRef.current.push(completeTimeout);
  };

  const handleCancelSearch = () => {
    searchTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    searchTimeoutsRef.current = [];
    
    setIsSearching(false);
    setSearchProgress(0);
    setSearchStep("");
    
    triggerHapticFeedback('medium');
  };

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
        <header className="bg-white border-b border-border sticky top-0 z-40">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Nova Consulta</h1>
            <p className="text-muted-foreground text-sm">
              Preencha um ou mais campos para realizar a consulta
            </p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Consulta de Segurança
                </CardTitle>
                <CardDescription>
                  Todos os campos são opcionais. Quanto mais informações, mais preciso o resultado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={cpfValue}
                          onChange={handleCPFChange}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          value={phoneValue}
                          onChange={handlePhoneChange}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Nome da pessoa"
                          value={nameValue}
                          onChange={handleNameChange}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Preencha pelo menos um campo para realizar a consulta
                  </p>

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-rose-soft to-lavender text-white text-lg font-medium"
                    disabled={isSearching || !hasAnyField}
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
                        {!hasAnyField ? "Preencha pelo menos um campo" : "Consultar"}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

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
                            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                            isCompleted ? "bg-lavender/20" : "bg-muted/30",
                            isCurrent && "ring-2 ring-lavender/50"
                          )}
                        >
                          <span className={cn(
                            "text-xs text-center font-medium",
                            isCompleted ? "text-lavender" : "text-muted-foreground"
                          )}>
                            {index + 1}
                          </span>
                          {isCurrent ? (
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
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelSearch}
                      className="gap-2 text-muted-foreground hover:text-destructive hover:border-destructive"
                    >
                      <X className="w-4 h-4" />
                      Cancelar Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Consulta;
