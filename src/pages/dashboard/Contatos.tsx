import { useState, useEffect } from "react";
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
  Navigation
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when location changes
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
  locationSharing?: {
    active: boolean;
    duration: string;
    startedAt: Date;
  };
}

// Lista vazia - será preenchida com dados reais quando integrado ao backend
const initialContacts: Contact[] = [];

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
  
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // Form state
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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
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

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Nome e telefone são obrigatórios");
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name: formData.name.trim(),
      relation: formData.relation.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      isEmergency: formData.isEmergency
    };

    setContacts(prev => [...prev, newContact]);
    toast.success("Contato adicionado com sucesso!");
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedContact) return;
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Nome e telefone são obrigatórios");
      return;
    }

    setContacts(prev => prev.map(c => 
      c.id === selectedContact.id 
        ? {
            ...c,
            name: formData.name.trim(),
            relation: formData.relation.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            isEmergency: formData.isEmergency
          }
        : c
    ));
    
    toast.success("Contato atualizado com sucesso!");
    resetForm();
    setSelectedContact(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteContact = () => {
    if (!selectedContact) return;
    
    setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
    toast.success("Contato removido com sucesso!");
    setSelectedContact(null);
    setIsDeleteDialogOpen(false);
  };

  const handleToggleEmergency = (contact: Contact) => {
    setContacts(prev => prev.map(c => 
      c.id === contact.id ? { ...c, isEmergency: !c.isEmergency } : c
    ));
    toast.success(
      contact.isEmergency 
        ? "Contato removido dos contatos de emergência" 
        : "Contato adicionado como emergência!"
    );
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
    setLocationDuration(contact.locationSharing?.duration || "1h");
    setCurrentLocation(null);
    setLocationAddress("");
    setIsLocationDialogOpen(true);
    
    // Get current location
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          console.log("Localização obtida:", latitude, longitude);
          
          // Try to get address from coordinates (reverse geocoding)
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
          console.error("Erro ao obter localização:", error);
          toast.error("Não foi possível obter sua localização. Verifique as permissões.");
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocalização não suportada pelo seu navegador");
      setIsLoadingLocation(false);
    }
  };

  const handleStartLocationSharing = () => {
    if (!selectedContact || !currentLocation) return;

    setContacts(prev => prev.map(c => 
      c.id === selectedContact.id 
        ? { 
            ...c, 
            locationSharing: {
              active: true,
              duration: locationDuration,
              startedAt: new Date()
            }
          }
        : c
    ));
    
    const durationLabel = durationOptions.find(d => d.value === locationDuration)?.label;
    toast.success(`Localização compartilhada com ${selectedContact.name} por ${durationLabel}`);
    setIsLocationDialogOpen(false);
  };

  const handleStopLocationSharing = (contact: Contact) => {
    setContacts(prev => prev.map(c => 
      c.id === contact.id 
        ? { ...c, locationSharing: undefined }
        : c
    ));
    toast.success(`Compartilhamento de localização com ${contact.name} encerrado`);
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
              <h1 className="text-2xl font-bold text-foreground">Contatos</h1>
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

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-primary/20 bg-gradient-to-r from-rose-soft/5 to-lavender/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  Contatos de Emergência
                </CardTitle>
                <CardDescription>
                  Estes contatos serão notificados em caso de alerta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhum contato de emergência cadastrado</p>
                  </div>
                ) : (
                  emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white font-medium text-lg">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{contact.name}</p>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              {contact.relation}
                            </span>
                            {contact.locationSharing?.active && (
                              <span className="px-2 py-0.5 bg-safe-green/10 text-safe-green text-xs rounded-full flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Localização ativa
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </span>
                            {contact.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {contact.locationSharing?.active ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-safe-green border-safe-green hover:bg-safe-green/10"
                            onClick={() => handleStopLocationSharing(contact)}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            Parar
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-primary border-primary hover:bg-primary/10"
                            onClick={() => openLocationDialog(contact)}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            Localização
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteDialog(contact)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Other Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Outros Contatos
                </CardTitle>
                <CardDescription>
                  Contatos de confiança cadastrados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {otherContacts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhum contato adicional cadastrado</p>
                  </div>
                ) : (
                  otherContacts.map((contact, index) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-foreground font-medium text-lg">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{contact.name}</p>
                            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                              {contact.relation}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {contact.phone}
                            </span>
                            {contact.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-primary" onClick={() => handleToggleEmergency(contact)}>
                          <Heart className="w-4 h-4 mr-1" />
                          Tornar emergência
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteDialog(contact)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) {
          resetForm();
          setSelectedContact(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Contato</DialogTitle>
            <DialogDescription>
              Atualize as informações do contato
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditContact} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome completo *</Label>
              <Input 
                id="edit-name" 
                placeholder="Digite o nome" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-relation">Relação</Label>
              <Input 
                id="edit-relation" 
                placeholder="Ex: Mãe, Amiga, Irmão" 
                value={formData.relation}
                onChange={(e) => setFormData(prev => ({ ...prev, relation: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Telefone *</Label>
              <Input 
                id="edit-phone" 
                placeholder="(00) 00000-0000" 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">E-mail</Label>
              <Input 
                id="edit-email" 
                type="email" 
                placeholder="email@exemplo.com" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="edit-emergency" 
                checked={formData.isEmergency}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isEmergency: checked === true }))}
              />
              <Label htmlFor="edit-emergency" className="text-sm cursor-pointer">Contato de emergência</Label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-rose-soft to-lavender text-white">
                Atualizar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => {
        setIsDeleteDialogOpen(open);
        if (!open) setSelectedContact(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Contato</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir {selectedContact?.name}? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleDeleteContact}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Sharing Dialog */}
      <Dialog open={isLocationDialogOpen} onOpenChange={(open) => {
        setIsLocationDialogOpen(open);
        if (!open) setSelectedContact(null);
      }}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Compartilhar Localização
            </DialogTitle>
            <DialogDescription>
              Compartilhe sua localização em tempo real com <strong>{selectedContact?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
            {/* Map Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-muted-foreground" />
                Sua localização atual
              </Label>
              <div className="h-40 sm:h-48 rounded-xl overflow-hidden border border-border relative">
                {isLoadingLocation ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Obtendo localização...</p>
                    </div>
                  </div>
                ) : currentLocation ? (
                  <MapContainer
                    center={[currentLocation.lat, currentLocation.lng]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[currentLocation.lat, currentLocation.lng]} icon={customIcon}>
                      <Popup>Você está aqui</Popup>
                    </Marker>
                    <RecenterMap lat={currentLocation.lat} lng={currentLocation.lng} />
                  </MapContainer>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <div className="flex flex-col items-center gap-2 text-center p-4">
                      <MapPin className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Não foi possível obter sua localização
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {locationAddress && (
                <p className="text-xs text-muted-foreground line-clamp-2" title={locationAddress}>
                  📍 {locationAddress}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="p-3 bg-gradient-to-r from-rose-soft/10 to-lavender/10 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-soft to-lavender rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {selectedContact?.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{selectedContact?.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{selectedContact?.phone}</p>
                </div>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Duração do compartilhamento
              </Label>
              <Select value={locationDuration} onValueChange={setLocationDuration}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  {durationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Note */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Nota:</strong> O contato receberá um link para acompanhar sua localização. 
                Você pode interromper o compartilhamento a qualquer momento.
              </p>
            </div>
          </div>

          <div className="flex gap-3 flex-shrink-0 pt-4 border-t border-border mt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsLocationDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-rose-soft to-lavender text-white"
              onClick={handleStartLocationSharing}
              disabled={!currentLocation || isLoadingLocation}
            >
              {isLoadingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Carregando...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Compartilhar
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contatos;
