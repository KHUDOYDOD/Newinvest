import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wallet, 
  TrendingUp, 
  CreditCard,
  ArrowUp
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ActiveDeposits from "./ActiveDeposits";
import TransactionHistory from "./TransactionHistory";

export function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: deposits = [] } = useQuery({
    queryKey: ["/api/deposits"],
    enabled: !!user,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["/api/transactions"],
    enabled: !!user,
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
  
  // Calculate total active investments
  const activeDeposits = deposits.filter((deposit: any) => deposit.status === "active");
  const totalActiveInvestments = activeDeposits.reduce(
    (sum: number, deposit: any) => sum + parseFloat(deposit.amount), 
    0
  );
  
  // Calculate weekly change percentage (mock data for now)
  const weeklyChangePercent = 15.3;
  
  // Calculate available funds (total balance minus active investments)
  const availableBalance = user ? parseFloat(user.balance) - totalActiveInvestments : 0;
  
  return (
    <div className="p-6">
      <h2 className="font-heading font-bold text-2xl mb-6">Обзор аккаунта</h2>
      
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Общий баланс</p>
                <p className="font-heading font-bold text-2xl mt-1">
                  ${user ? parseFloat(user.balance).toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-green-500 text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+{weeklyChangePercent}% за неделю</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Активные инвестиции</p>
                <p className="font-heading font-bold text-2xl mt-1">
                  ${totalActiveInvestments.toFixed(2)}
                </p>
              </div>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-muted-foreground text-sm font-medium">
              <span>{activeDeposits.length} активных депозитов</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Доступно к выводу</p>
                <p className="font-heading font-bold text-2xl mt-1">
                  ${availableBalance > 0 ? availableBalance.toFixed(2) : "0.00"}
                </p>
              </div>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3">
              <a href="#withdraw" className="text-primary text-sm font-medium">
                Вывести средства
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Active Deposits */}
      <ActiveDeposits deposits={deposits} />
      
      {/* Transaction History */}
      <TransactionHistory transactions={transactions} />
    </div>
  );
}
