import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Menu, 
  X,
  ChevronDown,
  MoonStar, 
  Sun
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { LivePriceTracker } from "./LivePriceTracker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location] = useLocation();
  const { user, isLoading } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${isScrolled ? 'shadow-md backdrop-blur-md bg-white/90 dark:bg-sidebar-background/90' : 'bg-white dark:bg-sidebar-background'} transition-all duration-300`}>
      <LivePriceTracker />

      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative">
              <BarChart2 className="text-primary text-2xl mr-2" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-heading font-bold text-2xl">ИнвестПро</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="/#plans" className="text-foreground hover:text-primary font-medium transition-colors">Тарифы</a>
          <a href="/#calculator" className="text-foreground hover:text-primary font-medium transition-colors">Калькулятор</a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-foreground hover:text-primary font-medium transition-colors">
                Инструменты <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <a href="/#chart" className="cursor-pointer">Торговый терминал</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/#steps" className="cursor-pointer">Как начать</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/#reviews" className="cursor-pointer">Отзывы</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="/#faq" className="text-foreground hover:text-primary font-medium transition-colors">FAQ</a>
          <a href="/#contacts" className="text-foreground hover:text-primary font-medium transition-colors">Контакты</a>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            title={isDarkMode ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-accent" />
            ) : (
              <MoonStar className="h-5 w-5 text-primary" />
            )}
          </button>

          {!isLoading && !user ? (
            <>
              <Link href="/auth?tab=login">
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all">
                  Войти
                </Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button className="gradient-bg shimmer text-white hover:opacity-90 shadow-md transition-all rounded-full px-6">
                  Регистрация
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button className="gradient-bg shimmer text-white hover:opacity-90 shadow-md transition-all rounded-full px-6">
                Личный кабинет
              </Button>
            </Link>
          )}

          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 text-primary hover:bg-primary/10 rounded-full" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-white/95 dark:bg-sidebar-background/95 backdrop-blur-sm border-t border-border fixed left-0 right-0 bottom-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100 shadow-lg' 
            : 'translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
          <a href="/#plans" className="text-foreground hover:text-primary font-medium py-2 pl-2">Тарифы</a>
          <a href="/#calculator" className="text-foreground hover:text-primary font-medium py-2 pl-2">Калькулятор</a>
          <a href="/#chart" className="text-foreground hover:text-primary font-medium py-2 pl-2">Торговый терминал</a>
          <a href="/#steps" className="text-foreground hover:text-primary font-medium py-2 pl-2">Как начать</a>
          <a href="/#reviews" className="text-foreground hover:text-primary font-medium py-2 pl-2">Отзывы</a>
          <a href="/#faq" className="text-foreground hover:text-primary font-medium py-2 pl-2">FAQ</a>
          <a href="/#contacts" className="text-foreground hover:text-primary font-medium py-2 pl-2">Контакты</a>
        </div>
      </div>
    </header>
  );
}