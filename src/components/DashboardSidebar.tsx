import { NavLink, useLocation } from "react-router-dom";
import { 
  Shield, 
  Home,
  Search,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  FileText,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isCollapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Início", path: "/dashboard" },
    { icon: Search, label: "Consultar CPF", path: "/dashboard/consulta" },
    { icon: FileText, label: "Histórico", path: "/dashboard/historico" },
    { icon: Users, label: "Contatos", path: "/dashboard/contatos" },
    { icon: Bell, label: "Alertas", path: "/dashboard/alertas" },
    { icon: Heart, label: "Dicas de Proteção", path: "/dicas-de-protecao" },
  ];

  const bottomItems = [
    { icon: HelpCircle, label: "Ajuda", path: "/central-de-ajuda" },
    { icon: Settings, label: "Configurações", path: "/dashboard/configuracoes" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-border flex flex-col transition-all duration-300 z-50 shadow-sm",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <a href="/" className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 gradient-hero rounded-xl blur-lg opacity-50" />
            <div className="relative bg-gradient-to-br from-rose-soft to-lavender p-2.5 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-gradient">Safe You</span>
          )}
        </a>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-3">
            Menu Principal
          </p>
        )}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-gradient-to-r from-rose-soft/10 to-lavender/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "group-hover:text-primary"
              )} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border space-y-2">
        {!isCollapsed && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-3">
            Suporte
          </p>
        )}
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-gradient-to-r from-rose-soft/10 to-lavender/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "group-hover:text-primary"
              )} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 px-3 py-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl",
            isCollapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Sair</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
