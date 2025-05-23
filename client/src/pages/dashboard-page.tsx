import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Referrals } from "@/components/dashboard/Referrals";
import DepositRequestForm from "@/components/dashboard/DepositRequestForm";
import WithdrawRequestForm from "@/components/dashboard/WithdrawRequestForm";
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  BarChart2,
  Bell,
  Shield,
  Brain,
  Target,
  TrendingUp,
  Calculator,
  LineChart,
  Receipt,
  Users2
} from "lucide-react";
import Analytics from "@/components/dashboard/Analytics";
import Notifications from "@/components/dashboard/Notifications";
import Security from "@/components/dashboard/Security";
import PortfolioManager from "@/components/dashboard/PortfolioManager";
import InvestmentGoals from "@/components/dashboard/InvestmentGoals";
import MarketInsights from "@/components/dashboard/MarketInsights";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import TaxOptimizer from "@/components/dashboard/TaxOptimizer";
import AutomatedStrategies from "@/components/dashboard/AutomatedStrategies";
import FinancialPlanning from "@/components/dashboard/FinancialPlanning";
import RiskAssessment from "@/components/dashboard/RiskAssessment";
import PeerComparison from "@/components/dashboard/PeerComparison";
import EarningsReport from "@/components/dashboard/EarningsReport";
import CryptoWallet from "@/components/dashboard/CryptoWallet";
import LiveChat from "@/components/dashboard/LiveChat";
import TradingSignals from "@/components/dashboard/TradingSignals";

export default function DashboardPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const menuItems = [
    { id: "overview", label: "Обзор", icon: <LayoutDashboard className="h-5 w-5 mr-2" /> },
    { id: "portfolio", label: "Портфель", icon: <Wallet className="h-5 w-5 mr-2" /> },
    { id: "goals", label: "Цели", icon: <Target className="h-5 w-5 mr-2" /> },
    { id: "markets", label: "Рынки", icon: <LineChart className="h-5 w-5 mr-2" /> },
    { id: "deposit", label: "Пополнить", icon: <ArrowDownToLine className="h-5 w-5 mr-2" /> },
    { id: "withdraw", label: "Вывести", icon: <ArrowUpFromLine className="h-5 w-5 mr-2" /> },
    { id: "strategies", label: "Стратегии", icon: <Brain className="h-5 w-5 mr-2" /> },
    { id: "planning", label: "Планирование", icon: <Calculator className="h-5 w-5 mr-2" /> },
    { id: "risk", label: "Риски", icon: <Shield className="h-5 w-5 mr-2" /> },
    { id: "compare", label: "Сравнение", icon: <Users2 className="h-5 w-5 mr-2" /> },
    { id: "earnings", label: "Доходы", icon: <Receipt className="h-5 w-5 mr-2" /> },
    { id: "analytics", label: "Аналитика", icon: <BarChart2 className="h-5 w-5 mr-2" /> },
    { id: "alerts", label: "Уведомления", icon: <Bell className="h-5 w-5 mr-2" /> },
    { id: "tax", label: "Налоги", icon: <TrendingUp className="h-5 w-5 mr-2" /> },
    { id: "referrals", label: "Рефералы", icon: <Users className="h-5 w-5 mr-2" /> },
    { id: "security", label: "Безопасность", icon: <Shield className="h-5 w-5 mr-2" /> },
    { id: "settings", label: "Настройки", icon: <Settings className="h-5 w-5 mr-2" /> },
    { id: "support", label: "Поддержка", icon: <HelpCircle className="h-5 w-5 mr-2" /> }
  ];
  
  return (
    <div className="min-h-screen bg-background-light">
      {/* Dashboard Header */}
      <header className="gradient-bg py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <BarChart2 className="text-amber-400 text-xl mr-2" />
            <span className="font-heading font-bold text-white text-xl">ИнвестПро</span>
          </Link>
        </div>
        
        <div className="flex items-center">
          <div className="text-white mr-6 hidden md:block">
            <span className="opacity-80">Баланс:</span>
            <span className="font-bold ml-2">${user?.balance ? parseFloat(user.balance).toFixed(2) : '0.00'}</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center font-bold text-primary mr-2">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-white font-medium mr-2 hidden md:block">
              {user?.username || 'Пользователь'}
            </span>
          </div>
        </div>
      </header>
      
      {/* Dashboard Content */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-68px)] max-h-[calc(100vh-68px)] overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-sidebar p-4 md:h-auto overflow-y-auto">
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === item.id 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                </li>
              ))}
              <li className="mt-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Выйти</span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="overview" className="h-full">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="deposit" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Пополнение счета</h2>
              <DepositRequestForm />
            </TabsContent>
            
            <TabsContent value="withdraw" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Вывод средств</h2>
              <WithdrawRequestForm />
            </TabsContent>
            
            <TabsContent value="referrals" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Реферальная программа</h2>
              <Referrals />
            </TabsContent>
            
            <TabsContent value="settings" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Настройки аккаунта</h2>
              <p className="text-muted-foreground">
                Функционал настроек в разработке. Скоро здесь появится возможность изменения профиля, настройки безопасности и другие опции.
              </p>
            </TabsContent>
            
            <TabsContent value="analytics" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Аналитика</h2>
              <Analytics />
            </TabsContent>
            
            <TabsContent value="notifications" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Уведомления</h2>
              <Notifications />
            </TabsContent>
            
            <TabsContent value="portfolio" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Управление портфелем</h2>
              <PortfolioManager />
            </TabsContent>
            
            <TabsContent value="goals" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Инвестиционные цели</h2>
              <InvestmentGoals />
            </TabsContent>
            
            <TabsContent value="markets" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Рыночная аналитика</h2>
              <MarketInsights />
            </TabsContent>
            
            <TabsContent value="strategies" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Автоматизированные стратегии</h2>
              <AutomatedStrategies />
            </TabsContent>
            
            <TabsContent value="planning" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Финансовое планирование</h2>
              <FinancialPlanning />
            </TabsContent>
            
            <TabsContent value="risk" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Оценка рисков</h2>
              <RiskAssessment />
            </TabsContent>
            
            <TabsContent value="compare" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Сравнение с другими инвесторами</h2>
              <PeerComparison />
            </TabsContent>
            
            <TabsContent value="earnings" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Отчет о доходах</h2>
              <EarningsReport />
            </TabsContent>
            
            <TabsContent value="alerts" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Умные уведомления</h2>
              <SmartAlerts />
            </TabsContent>
            
            <TabsContent value="tax" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Налоговый оптимизатор</h2>
              <TaxOptimizer />
            </TabsContent>
            
            <TabsContent value="security" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Безопасность</h2>
              <Security />
            </TabsContent>
            
            <TabsContent value="support" className="h-full p-6">
              <h2 className="font-heading font-bold text-2xl mb-6">Поддержка</h2>
              <p className="text-muted-foreground mb-4">
                Если у вас возникли вопросы или проблемы, свяжитесь с нашей службой поддержки:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  support@investpro.ru
                </li>
                <li className="flex items-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +7 (495) 123-45-67
                </li>
              </ul>
              <Button className="gradient-bg text-white">Открыть чат с поддержкой</Button>
            </TabsContent>
            
            <TabsContent value="crypto" className="h-full p-6">
              <CryptoWallet />
            </TabsContent>
            
            <TabsContent value="signals" className="h-full p-6">
              <TradingSignals />
            </TabsContent>
            
            <TabsContent value="chat" className="h-full p-6">
              <LiveChat />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
