import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  TrendingUp, 
  CreditCard,
  ArrowUp,
  ArrowDown,
  Settings,
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Activity
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ActiveDeposits from "./ActiveDeposits";
import TransactionHistory from "./TransactionHistory";
import RequestsManagement from "../admin/RequestsManagement";

export function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const { data: deposits = [] } = useQuery({
    queryKey: ["/api/deposits"],
    enabled: !!user,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["/api/transactions"],
    enabled: !!user,
  });

  // Fetch deposit and withdraw requests for admin stats
  const { data: depositRequests = [] } = useQuery({
    queryKey: ["/api/deposit-requests"],
    enabled: !!user,
  });

  const { data: withdrawRequests = [] } = useQuery({
    queryKey: ["/api/withdraw-requests"],
    enabled: !!user,
  });

  // Fetch admin data if user is admin
  const { data: adminDepositRequests = [] } = useQuery({
    queryKey: ["/api/admin/deposit-requests"],
    enabled: !!user && user.role === 'admin',
  });

  const { data: adminWithdrawRequests = [] } = useQuery({
    queryKey: ["/api/admin/withdraw-requests"],
    enabled: !!user && user.role === 'admin',
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: !!user && user.role === 'admin',
  });
  
  // Check for deposits that have completed their term
  const processProfitsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/process-profits");
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Прибыль обработана",
        description: data.message,
        variant: data.message.includes("успешно") ? "default" : "secondary",
      });
      
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["/api/deposits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Process profits on component mount
  useEffect(() => {
    if (user) {
      processProfitsMutation.mutate();
    }
  }, [user]);
  
  // Calculate statistics
  const activeDeposits = deposits.filter((deposit: any) => deposit.status === "active");
  const totalActiveInvestments = activeDeposits.reduce(
    (sum: number, deposit: any) => sum + parseFloat(deposit.amount), 
    0
  );
  
  const userBalance = user ? parseFloat(user.balance.toString()) : 0;
  const availableBalance = userBalance;
  
  // Calculate request statistics
  const pendingDepositRequests = depositRequests.filter((req: any) => req.status === 'pending');
  const pendingWithdrawRequests = withdrawRequests.filter((req: any) => req.status === 'pending');
  
  // Admin statistics
  const allPendingDeposits = adminDepositRequests.filter((req: any) => req.status === 'pending');
  const allPendingWithdraws = adminWithdrawRequests.filter((req: any) => req.status === 'pending');
  const totalPendingRequests = allPendingDeposits.length + allPendingWithdraws.length;
  
  // Check if user is admin
  const isAdmin = user && (user as any).role === 'admin';

  if (showAdminPanel && isAdmin) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-3xl">Панель администратора</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowAdminPanel(false)}
            className="flex items-center gap-2"
          >
            <ArrowDown className="h-4 w-4" />
            Вернуться к обзору
          </Button>
        </div>
        
        {/* Admin Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Всего пользователей</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{allUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Ожидающих заявок</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">{totalPendingRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-700 dark:text-green-300">Заявки на пополнение</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{allPendingDeposits.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Заявки на вывод</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{allPendingWithdraws.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <RequestsManagement />
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-3xl">Обзор аккаунта</h2>
        {isAdmin && (
          <Button 
            onClick={() => setShowAdminPanel(true)}
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 flex items-center gap-2 shadow-lg"
          >
            <Settings className="h-4 w-4" />
            Панель администратора
            {totalPendingRequests > 0 && (
              <Badge variant="secondary" className="ml-2 bg-white text-red-600">
                {totalPendingRequests}
              </Badge>
            )}
          </Button>
        )}
      </div>
      
      {/* User Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Общий баланс</p>
                <p className="font-heading font-bold text-3xl mt-2 text-blue-700 dark:text-blue-300">
                  ${userBalance.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>Баланс активен</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Активные инвестиции</p>
                <p className="font-heading font-bold text-3xl mt-2 text-green-700 dark:text-green-300">
                  ${totalActiveInvestments.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-muted-foreground text-sm font-medium">
              <Activity className="h-4 w-4 mr-1" />
              <span>{activeDeposits.length} активных депозитов</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Доступно к выводу</p>
                <p className="font-heading font-bold text-3xl mt-2 text-purple-700 dark:text-purple-300">
                  ${availableBalance.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-purple-600 text-sm font-medium hover:underline cursor-pointer">
                Создать заявку на вывод
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-blue-500" />
              Заявки на пополнение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{depositRequests.length}</p>
                <p className="text-sm text-muted-foreground">Всего заявок</p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {pendingDepositRequests.length} ожидает
                </Badge>
                <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                  <CheckCircle className="h-3 w-3" />
                  {depositRequests.filter((req: any) => req.status === 'approved').length} одобрено
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ArrowUpRight className="h-5 w-5 text-purple-500" />
              Заявки на вывод
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{withdrawRequests.length}</p>
                <p className="text-sm text-muted-foreground">Всего заявок</p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {pendingWithdrawRequests.length} ожидает
                </Badge>
                <Badge variant="default" className="flex items-center gap-1 bg-green-500">
                  <CheckCircle className="h-3 w-3" />
                  {withdrawRequests.filter((req: any) => req.status === 'approved').length} одобрено
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Active Deposits */}
      <ActiveDeposits deposits={deposits as any} />
      
      {/* Transaction History */}
      <TransactionHistory transactions={transactions as any} />
    </div>
  );
}