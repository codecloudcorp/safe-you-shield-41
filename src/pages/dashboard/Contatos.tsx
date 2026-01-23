import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  Plus,
  Search,
  Phone,
  Mail,
  Heart,
  Edit,
  Trash2,
  Shield,
  UserPlus,
  MapPin,
  Clock,
  Loader2,
  Navigation,
  Share2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { contactService, userService } from "@/services/api"; // Importando contactService e userService

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
};

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
  email: string;
  isEmergency: boolean;
  locationActive?: boolean; // Atualizado para refletir o DTO
  locationSharing?: { // Mantido para compatibilidade visual
    active: boolean;
    duration: string;
    startedAt: Date;
  };
}

const Contatos = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [locationDuration, setLocationDuration] = useState("1h");
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Loading state geral
  
  // Refs para controle do Rastreamento em Tempo Real
  const watchIdRef = useRef<number | null>(null);
  const lastSentTimeRef = useRef<number>(0);
  const [isTracking, setIsTracking] = useState(false);
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    phone: "",
    email: "",
    isEmergency: false
  });

  const durationOptions = [
    { value: "1h", label: "1 hora" },
    { value: "2h", label: "2 horas" },
    { value: "4h", label: "4 horas" },
    { value: "8h", label: "8 horas" },
    { value: "12h", label: "12 horas" },
    { value: "1d", label: "1 dia" },
    { value: "2d", label: "2 dias" },
    { value: "3d", label: "3 dias" },
    { value: "1w", label: "1 semana" },
    { value: "2w", label: "2 semanas" },
    { value: "1m", label: "1 mês" },
    { value: "always", label: "Sempre ativo" },
  ];

  // --- LÓGICA DE RASTREAMENTO ROBUSTA ---
  
  const startTracking = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada.");
      return;
    }

    // Se já estiver rastreando, não faz nada
    if (watchIdRef.current !== null) return;

    setIsTracking(true);
    
    // Configurações para evitar Timeout (aumentado para 30s) e aceitar cache recente
    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 30000, 
        maximumAge: 10000 
    };

    const handlePosition = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        // Envia para o backend a cada 10 segundos (Throttling)
        const now = Date.now();
        if (now - lastSentTimeRef.current > 10000) {
          try {
            await userService.updateLocation(latitude, longitude);
            lastSentTimeRef.current = now;
            console.log("📍 Localização enviada:", latitude, longitude);
          } catch (error) {
            console.error("Erro envio silencioso:", error);
          }
        }
    };

    const handleError = (error: GeolocationPositionError) => {
        console.warn("Erro GPS (Alta Precisão):", error.message);
        
        // Se der timeout ou erro com alta precisão, tenta reiniciar com baixa precisão
        if (error.code === 3 || error.code === 2) { 
            console.log("Tentando modo de baixa precisão...");
            // Limpa o watcher atual
            if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
            
            // Reinicia com baixa precisão
            watchIdRef.current = navigator.geolocation.watchPosition(
                handlePosition,
                (err) => console.error("Erro fatal GPS:", err),
                { enableHighAccuracy: false, timeout: 30000, maximumAge: 30000 }
            );
        } else if (error.code === 1) {
            toast.error("Permissão de localização negada.");
            setIsTracking(false);
        }
    };

    // Inicia o watcher principal
    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      geoOptions
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  // Limpa o rastreamento ao desmontar o componente
  useEffect(() => {
    return () => stopTracking();
  }, []);

  // ------------------------------

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await contactService.list();
      const mappedContacts = response.data.map((c: any) => ({
        ...c,
        locationSharing: c.locationActive ? { active: true, duration: 'Ativo', startedAt: new Date() } : undefined
      }));
      setContacts(mappedContacts);
      
      // Verifica se deve manter o rastreamento ativo
      const hasActiveSharing = mappedContacts.some((c: any) => c.locationActive);
      if (hasActiveSharing && watchIdRef.current === null) {
        startTracking();
      } else if (!hasActiveSharing && watchIdRef.current !== null) {
        stopTracking();
      }

    } catch (error) {
      toast.error("Erro ao carregar contatos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // CORREÇÃO: Verifica ambas as chaves possíveis para o token
    const token = localStorage.getItem("userToken") || localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchContacts();
    }
  }, [navigate]);

  const resetForm = () => {
    setFormData({
      name: "",
      relation: "",
      phone: "",
      email: "",
      isEmergency: false
    });
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Nome e telefone são obrigatórios");
      return;
    }
    try {
      await contactService.save(formData);
      toast.success("Contato adicionado com sucesso!");
      fetchContacts();
      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao salvar contato.");
    }
  };

  const handleEditContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Nome e telefone são obrigatórios");
      return;
    }
    try {
      await contactService.save({ ...formData, id: selectedContact.id });
      toast.success("Contato atualizado com sucesso!");
      fetchContacts();
      resetForm();
      setSelectedContact(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar contato.");
    }
  };

  const handleDeleteContact = async () => {
    if (!selectedContact) return;
    try {
      await contactService.delete(selectedContact.id);
      setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
      toast.success("Contato removido com sucesso!");
      setSelectedContact(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao excluir contato.");
    }
  };

  const handleToggleEmergency = async (contact: Contact) => {
    const updatedData = {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        relation: contact.relation,
        email: contact.email,
        isEmergency: !contact.isEmergency
    };
    try {
        await contactService.save(updatedData);
        await fetchContacts();
        toast.success(
            !contact.isEmergency 
              ? "Contato adicionado como emergência!" 
              : "Contato removido dos contatos de emergência"
          );
    } catch (error) {
        toast.error("Erro ao atualizar status.");
    }
  };

  const openEditDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setFormData({
      name: contact.name,
      relation: contact.relation,
      phone: contact.phone,
      email: contact.email,
      isEmergency: contact.isEmergency
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const openLocationDialog = (contact: Contact) => {
    setSelectedContact(contact);
    setLocationDuration("1h");
    setCurrentLocation(null);
    setLocationAddress("");
    setIsLocationDialogOpen(true);
    
    setIsLoadingLocation(true);
    // Pega a posição inicial apenas para centralizar o mapa no modal
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            if (data.display_name) {
              setLocationAddress(data.display_name);
            }
          } catch (error) {
            console.error("Erro ao obter endereço:", error);
          }
          setIsLoadingLocation(false);
        },
        (error) => {
          toast.error("Não foi possível obter sua localização inicial.");
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      toast.error("Geolocalização não suportada.");
      setIsLocationDialogOpen(false);
    }
  };

  const handleStartLocationSharing = async () => {
    if (!selectedContact || !currentLocation) return;

    try {
      // 1. Salvar no Backend (ativa a flag)
      await contactService.startLocation(selectedContact.id, locationDuration);
      
      // 2. Forçar início do rastreamento (caso não tenha iniciado pelo fetchContacts)
      startTracking();
      
      // 3. Atualizar UI
      await fetchContacts();
      
      // 4. Gerar Link e Abrir WhatsApp
      const durationLabel = durationOptions.find(d => d.value === locationDuration)?.label;
      const userEmail = localStorage.getItem('userEmail') || 'user';
      
      const trackingLink = `https://safeyou.app/track/${userEmail}`;
      const mapsLink = `https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`;
      
      const message = `*SafeYou - Localização em Tempo Real* 📍\n\nOlá ${selectedContact.name}, estou compartilhando minha localização com você por *${durationLabel}*.\n\nAcompanhe meu trajeto aqui: ${trackingLink}\n\n(Caso não consiga acessar, veja minha última posição conhecida: ${mapsLink})`;
      
      const cleanPhone = selectedContact.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');

      toast.success(`Rastreamento iniciado!`);
      setIsLocationDialogOpen(false);

    } catch (error) {
      toast.error("Erro ao ativar compartilhamento.");
    }
  };

  const handleStopLocationSharing = async (contact: Contact) => {
    try {
        await contactService.stopLocation(contact.id);
        
        // Verifica se ainda há compartilhamentos ativos
        const activeShares = contacts.filter(c => c.locationSharing?.active && c.id !== contact.id);
        if (activeShares.length === 0) {
            stopTracking();
            toast.info("Rastreamento desligado (economia de bateria).");
        }

        await fetchContacts();
        toast.success(`Compartilhamento encerrado.`);
    } catch (error) {
        toast.error("Erro ao parar compartilhamento.");
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.relation.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const emergencyContacts = filteredContacts.filter(c => c.isEmergency);
  const otherContacts = filteredContacts.filter(c => !c.isEmergency);

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
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Contatos
                {isTracking && (
                  <span className="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full animate-pulse border border-red-200">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    GPS Ativo
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground text-sm">
                Gerencie seus contatos de emergência e confiança
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-rose-soft to-lavender text-white">
                  <Plus className="w-4 h-4" />
                  Novo Contato
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Contato</DialogTitle>
                  <DialogDescription>
                    Adicione um novo contato de confiança
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddContact} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input 
                      id="name" 
                      placeholder="Digite o nome" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relation">Relação</Label>
                    <Input 
                      id="relation" 
                      placeholder="Ex: Mãe, Amiga, Irmão" 
                      value={formData.relation}
                      onChange={(e) => setFormData(prev => ({ ...prev, relation: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input 
                      id="phone" 
                      placeholder="(00) 00000-0000" 
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@exemplo.com" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="emergency" 
                      checked={formData.isEmergency}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isEmergency: checked === true }))}
                    />
                    <Label htmlFor="emergency" className="text-sm cursor-pointer">Contato de emergência</Label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-rose-soft to-lavender text-white">
                      Salvar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Search */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contato..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>
          ) : (
            <>
            {/* Emergency Contacts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-primary/20 bg-gradient-to-r from-rose-soft/5 to-lavender/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Shield className="w-5 h-5" />
                    Contatos de Emergência
                  </CardTitle>
                  <CardDescription>Estes contatos serão notificados em caso de alerta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emergencyContacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum contato de emergência cadastrado</p>
                    </div>
                  ) : (
                    emergencyContacts.map((contact, index) => (
                      <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        index={index} 
                        onLocation={openLocationDialog}
                        onStopLocation={handleStopLocationSharing}
                        onEdit={openEditDialog}
                        onDelete={openDeleteDialog}
                        onToggleEmergency={handleToggleEmergency}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Other Contacts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Outros Contatos
                  </CardTitle>
                  <CardDescription>Contatos de confiança cadastrados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {otherContacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum contato adicional cadastrado</p>
                    </div>
                  ) : (
                    otherContacts.map((contact, index) => (
                      <ContactCard 
                        key={contact.id} 
                        contact={contact} 
                        index={index} 
                        isOther
                        onLocation={openLocationDialog}
                        onStopLocation={handleStopLocationSharing}
                        onEdit={openEditDialog}
                        onDelete={openDeleteDialog}
                        onToggleEmergency={handleToggleEmergency}
                      />
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
            </>
          )}
        </div>
      </main>

      {/* Location Sharing Dialog */}
      <Dialog open={isLocationDialogOpen} onOpenChange={(open) => {
        setIsLocationDialogOpen(open);
        if (!open) setSelectedContact(null);
      }}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Compartilhar Localização
            </DialogTitle>
            <DialogDescription>
              Compartilhe via <strong>WhatsApp</strong> com {selectedContact?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
             <div className="h-40 sm:h-48 rounded-xl overflow-hidden border border-border relative">
                {isLoadingLocation ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : currentLocation ? (
                  <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[currentLocation.lat, currentLocation.lng]} icon={customIcon} />
                    <RecenterMap lat={currentLocation.lat} lng={currentLocation.lng} />
                  </MapContainer>
                ) : null}
             </div>
             
             <div className="space-y-2">
               <Label>Duração</Label>
               <Select value={locationDuration} onValueChange={setLocationDuration}>
                 <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                 <SelectContent>
                   {durationOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                 </SelectContent>
               </Select>
             </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={() => setIsLocationDialogOpen(false)}>Cancelar</Button>
            <Button 
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white" 
              onClick={handleStartLocationSharing}
              disabled={!currentLocation || isLoadingLocation}
            >
              {isLoadingLocation ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" />}
              Compartilhar no WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit and Delete Dialogs */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
         <DialogContent>
            <DialogHeader><DialogTitle>Editar</DialogTitle></DialogHeader>
            <form onSubmit={handleEditContact} className="space-y-4 mt-4">
                <Input placeholder="Nome" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <Input placeholder="Relação" value={formData.relation} onChange={e => setFormData({...formData, relation: e.target.value})} />
                <Input placeholder="Telefone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <Input placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <div className="flex items-center gap-2">
                    <Checkbox checked={formData.isEmergency} onCheckedChange={(c) => setFormData({...formData, isEmergency: c === true})} />
                    <Label>Emergência</Label>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-rose-soft to-lavender text-white">Salvar</Button>
            </form>
         </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
            <DialogHeader><DialogTitle>Confirmar Exclusão</DialogTitle></DialogHeader>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1">Cancelar</Button>
                <Button variant="destructive" onClick={handleDeleteContact} className="flex-1">Excluir</Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

const ContactCard = ({ contact, index, isOther = false, onLocation, onStopLocation, onEdit, onDelete, onToggleEmergency }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className={cn(
      "flex items-center justify-between p-4 rounded-xl transition-colors",
      isOther ? "bg-muted/30 hover:bg-muted/50" : "bg-white border border-primary/10"
    )}
  >
    <div className="flex items-center gap-4">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-foreground font-medium text-lg", isOther ? "bg-muted" : "bg-gradient-to-br from-rose-soft to-lavender text-white")}>
        {contact.name.charAt(0)}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground">{contact.name}</p>
          <span className={cn("px-2 py-0.5 text-xs rounded-full", isOther ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary")}>
            {contact.relation}
          </span>
          {contact.locationSharing?.active && (
            <span className="px-2 py-0.5 bg-safe-green/10 text-safe-green text-xs rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Ativo
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2">
        {isOther && (
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => onToggleEmergency(contact)}>
                <Heart className="w-4 h-4 mr-1" /> Tornar emergência
            </Button>
        )}
        {contact.locationSharing?.active ? (
            <Button variant="outline" size="sm" className="text-safe-green border-safe-green hover:bg-safe-green/10" onClick={() => onStopLocation(contact)}>
                <MapPin className="w-4 h-4 mr-1" /> Parar
            </Button>
        ) : (
            <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10" onClick={() => onLocation(contact)}>
                <MapPin className="w-4 h-4 mr-1" /> Localização
            </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => onEdit(contact)}><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(contact)}><Trash2 className="w-4 h-4" /></Button>
    </div>
  </motion.div>
);

export default Contatos;