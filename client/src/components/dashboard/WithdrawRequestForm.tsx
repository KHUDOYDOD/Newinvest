import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Wallet, Clock, CheckCircle, XCircle, ArrowUpRight, Shield, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number().min(10, "Минимальная сумма вывода $10"),
  walletAddress: z.string().min(10, "Введите корректный адрес кошелька"),
  paymentMethod: z.string().min(1, "Выберите способ вывода"),
});

type FormValues = z.infer<typeof formSchema>;

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Ожидание</Badge>;
    case "approved":
      return <Badge variant="default" className="flex items-center gap-1 bg-green-500"><CheckCircle className="h-3 w-3" />Одобрено</Badge>;
    case "rejected":
      return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Отклонено</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function WithdrawRequestForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 10,
      walletAddress: "",
      paymentMethod: "card",
    },
  });
  
  const watchAmount = form.watch("amount");
  
  // Fetch user's withdraw requests
  const { data: withdrawRequests, isLoading } = useQuery({
    queryKey: ["/api/withdraw-requests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/withdraw-requests");
      return await res.json();
    },
  });
  
  const withdrawRequestMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest("POST", "/api/withdraw-request", data);
      return await res.json();
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/withdraw-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      
      toast({
        title: "Заявка отправлена! 💰",
        description: "Ваша заявка на вывод средств отправлена администратору на рассмотрение.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (values: FormValues) => {
    withdrawRequestMutation.mutate(values);
  };

  const userBalance = user?.balance ? parseFloat(user.balance.toString()) : 0;

  return (
    <div className="space-y-6">
      {/* Форма создания заявки */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 bg-purple-500 rounded-lg">
              <ArrowUpRight className="h-6 w-6 text-white" />
            </div>
            Вывести средства
          </CardTitle>
          <p className="text-muted-foreground">
            Отправьте заявку на вывод средств. Администратор обработает её в течение 24 часов.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Информация о балансе */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 dark:text-green-300">Доступно для вывода</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">${userBalance.toFixed(2)}</p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Сумма вывода (USD)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ArrowUpRight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          className="pl-10 h-12 text-lg border-2 focus:border-purple-500"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={10}
                          max={userBalance}
                          placeholder="Введите сумму"
                        />
                      </div>
                    </FormControl>
                    {watchAmount > userBalance && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Сумма превышает доступный баланс
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Способ вывода</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${field.value === "card" ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" : "border-gray-200"}`}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="card" id="withdraw-card" />
                            <CreditCard className="h-6 w-6 text-purple-500" />
                            <div>
                              <label htmlFor="withdraw-card" className="font-semibold cursor-pointer">Банковская карта</label>
                              <p className="text-sm text-muted-foreground">1-3 рабочих дня</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${field.value === "crypto" ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" : "border-gray-200"}`}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="crypto" id="withdraw-crypto" />
                            <Wallet className="h-6 w-6 text-orange-500" />
                            <div>
                              <label htmlFor="withdraw-crypto" className="font-semibold cursor-pointer">Криптовалюта</label>
                              <p className="text-sm text-muted-foreground">Мгновенно</p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      {form.watch("paymentMethod") === "card" ? "Номер карты" : "Адрес кошелька"}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          className="pl-10 h-12 text-lg border-2 focus:border-purple-500"
                          {...field}
                          placeholder={
                            form.watch("paymentMethod") === "card" 
                              ? "1234 5678 9012 3456" 
                              : "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Безопасность</span>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Все выводы проверяются администратором</li>
                  <li>• Защищенное соединение SSL</li>
                  <li>• Уведомления о всех операциях</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg"
                disabled={withdrawRequestMutation.isPending || watchAmount > userBalance || watchAmount < 10}
              >
                {withdrawRequestMutation.isPending && (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                )}
                Отправить заявку на вывод
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* История заявок */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            История заявок на вывод
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : withdrawRequests && withdrawRequests.length > 0 ? (
            <div className="space-y-4">
              {withdrawRequests.map((request: any) => (
                <div key={request.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                        <ArrowUpRight className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">${parseFloat(request.amount).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Способ вывода:</span>
                      <p className="font-medium capitalize">{request.paymentMethod === 'card' ? 'Банковская карта' : 'Криптовалюта'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Адрес/Карта:</span>
                      <p className="font-medium font-mono text-xs">{request.walletAddress}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-muted-foreground text-sm">Статус:</span>
                    <p className="font-medium text-sm">
                      {request.status === 'pending' && 'Ожидает рассмотрения администратором'}
                      {request.status === 'approved' && 'Одобрено и отправлено'}
                      {request.status === 'rejected' && 'Отклонено администратором'}
                    </p>
                  </div>
                  
                  {request.adminComment && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Комментарий администратора:</span><br />
                        {request.adminComment}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ArrowUpRight className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-muted-foreground">У вас пока нет заявок на вывод</p>
              <p className="text-sm text-muted-foreground mt-1">Создайте первую заявку выше</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}