import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Bell, 
  MapPin, 
  Phone, 
  Users, 
  Settings, 
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  MessageCircle,
  Navigation
} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    setUserEmail(email || "");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const quickActions = [
    { icon: AlertTriangle, label: "Alerta SOS", color: "bg-red-500", description: "Enviar alerta de emergência" },
    { icon: MapPin, label: "Compartilhar Local", color: "bg-blue-500", description: "Envie sua localização" },
    { icon: Phone, label: "Ligar 180", color: "bg-green-500", description: "Central de atendimento" },
    { icon: MessageCircle, label: "Chat Seguro", color: "bg-purple-500", description: "Mensagens criptografadas" },
  ];

  const contacts = [
    { name: "Maria Silva", relation: "Mãe", status: "online" },
    { name: "Ana Santos", relation: "Amiga", status: "online" },
    { name: "João Oliveira", relation: "Irmão", status: "offline" },
  ];

  const recentActivities = [
    { action: "Localização compartilhada", time: "Há 2 horas", icon: MapPin },
    { action: "Contato de emergência atualizado", time: "Ontem", icon: Users },
    { action: "Check-in de segurança", time: "2 dias atrás", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-primary">Donna Shield</h1>
              <p className="text-xs text-muted-foreground">Seu escudo de proteção</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Olá, {userEmail.split("@")[0] || "Usuária"}! 👋
          </h2>
          <p className="text-muted-foreground">
            Você está protegida. Seu escudo está ativo.
          </p>
          <div className="flex items-center justify-center gap-2 text-green-500">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Status: Segura</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-primary/10">
                  <CardContent className="p-4 text-center space-y-3">
                    <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SOS Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <button className="relative group">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105">
              <div className="text-center text-white">
                <AlertTriangle className="w-10 h-10 mx-auto mb-1" />
                <span className="font-bold text-lg">SOS</span>
              </div>
            </div>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  Contatos de Emergência
                </CardTitle>
                <CardDescription>Pessoas que serão notificadas em caso de alerta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.relation}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  + Adicionar Contato
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  Atividade Recente
                </CardTitle>
                <CardDescription>Suas últimas ações de segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Dica de Segurança do Dia</h4>
                  <p className="text-muted-foreground">
                    Sempre compartilhe sua localização em tempo real com um contato de confiança quando estiver em um encontro ou local desconhecido.
                  </p>
                  <Button variant="link" className="px-0 mt-2 text-primary">
                    Ver mais dicas →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
