import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  HelpCircle, 
  User, 
  CreditCard, 
  Activity, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronRight,
  Shield,
  BarChartHorizontal,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };
  
  const menuItems = [
    { 
      icon: <BarChart3 size={20} />, 
      label: "Панель управления", 
      href: "/admin", 
      active: location === "/admin",
      badge: null
    },
    { 
      icon: <Users size={20} />, 
      label: "Пользователи", 
      href: "/admin/users", 
      active: location === "/admin/users",
      badge: "124"
    },
    { 
      icon: <CreditCard size={20} />, 
      label: "Транзакции", 
      href: "/admin/transactions", 
      active: location === "/admin/transactions",
      badge: "12"
    },
    { 
      icon: <Activity size={20} />, 
      label: "Депозиты", 
      href: "/admin/deposits", 
      active: location === "/admin/deposits",
      badge: "56"
    },
    { 
      icon: <HelpCircle size={20} />, 
      label: "Тикеты поддержки", 
      href: "/admin/support", 
      active: location === "/admin/support",
      badge: "8"
    },
    { 
      icon: <Settings size={20} />, 
      label: "Настройки", 
      href: "/admin/settings", 
      active: location === "/admin/settings",
      badge: null
    },
  ];

  return (
    <div className="flex h-screen bg-muted/30 dark:bg-sidebar-background/30">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-sidebar overflow-y-auto border-r border-border">
          <div className="flex items-center justify-center h-16 px-4 mb-4">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></span>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Админ-панель
            </span>
          </div>
          
          <div className="flex-1 px-3 py-3">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start mb-1 relative ${
                      item.active ? "gradient-bg" : ""
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                    {item.active && (
                      <div className="absolute right-0 top-0 h-full w-1 bg-accent"></div>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/avatar-admin.png" />
                  <AvatarFallback className="bg-primary text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.username || 'Admin'}</div>
                  <div className="text-xs text-muted-foreground">Администратор</div>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center mt-2"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" /> Выйти
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-sidebar-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              className="mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="relative">
              <Shield className="h-6 w-6 text-primary" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            </div>
            <span className="ml-1 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Админ-панель
            </span>
          </div>
          
          <div className="flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            
            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src="/avatar-admin.png" />
              <AvatarFallback className="bg-primary text-white">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-20 bg-background/80 backdrop-blur-sm transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-sidebar flex flex-col overflow-y-auto shadow-xl">
          <div className="p-6 pt-16">
            <div className="flex items-center mb-6">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src="/avatar-admin.png" />
                <AvatarFallback className="bg-primary text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-lg">{user?.username || 'Admin'}</div>
                <div className="text-sm text-muted-foreground">Администратор</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start mb-1 ${
                      item.active ? "gradient-bg" : ""
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
              
              <Separator className="my-4" />
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" /> Выйти
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Desktop header */}
        <header className="hidden md:flex sticky top-0 z-10 h-16 bg-white dark:bg-sidebar-background border-b border-border">
          <div className="flex-1 flex items-center justify-between px-6">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <User size={16} />
                  <span className="ml-1">На сайт</span>
                </Button>
              </Link>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Уведомления</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>
        
        {/* Mobile search */}
        <div className="md:hidden px-4 py-3 bg-white dark:bg-sidebar-background border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}