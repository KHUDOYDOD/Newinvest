import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import DepositRequestForm from "@/components/dashboard/DepositRequestForm";
import WithdrawRequestForm from "@/components/dashboard/WithdrawRequestForm";
import { useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import PeerComparison from "@/components/dashboard/PeerComparison";
import EarningsReport from "@/components/dashboard/EarningsReport";
import CryptoWallet from "@/components/dashboard/CryptoWallet";
import LiveChat from "@/components/dashboard/LiveChat";
import TradingSignals from "@/components/dashboard/TradingSignals";
import ActiveDeposits from "@/components/dashboard/ActiveDeposits";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import Analytics from "@/components/dashboard/Analytics";
import Referrals from "@/components/dashboard/Referrals";

export default function DashboardPage() {
  const { user, logoutMutation } = useAuth();
  

  
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
      
      <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveDeposits />
        <TransactionHistory />
        <Analytics />
        <EarningsReport />
        <CryptoWallet />
        <TradingSignals />
        <PeerComparison />
        <Referrals />
      </div>
      <LiveChat />
    </div>
    </div>
  );
}