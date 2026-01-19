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
  UserPlus
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
  email: string;
  isEmergency: boolean;
}

const initialContacts: Contact[] = [
  { id: 1, name: "Maria Silva", relation: "Mãe", phone: "(11) 99999-1111", email: "maria@email.com", isEmergency: true },
  { id: 2, name: "Ana Santos", relation: "Amiga", phone: "(11) 99999-2222", email: "ana@email.com", isEmergency: true },
  { id: 3, name: "João Oliveira", relation: "Irmão", phone: "(11) 99999-3333", email: "joao@email.com", isEmergency: true },
  { id: 4, name: "Carla Mendes", relation: "Amiga", phone: "(11) 99999-4444", email: "carla@email.com", isEmergency: false },
  { id: 5, name: "Roberto Costa", relation: "Pai", phone: "(11) 99999-5555", email: "roberto@email.com", isEmergency: false },
];

const Contatos = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
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
    </div>
  );
};

export default Contatos;
