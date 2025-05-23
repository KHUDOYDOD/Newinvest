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
import { Loader2, CreditCard, Wallet, Clock, CheckCircle, XCircle, DollarSign, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number().min(10, "Минимальная сумма пополнения $10"),
  paymentMethod: z.string().min(1, "Выберите способ оплаты"),
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

export default function DepositRequestForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      paymentMethod: "card",
    },
  });
  
  // Fetch user's deposit requests
  const { data: depositRequests, isLoading } = useQuery({
    queryKey: ["/api/deposit-requests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/deposit-requests");
      return await res.json();
    },
  });
  
  const depositRequestMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest("POST", "/api/deposit-request", data);
      return await res.json();
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/deposit-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      
      toast({
        title: "Заявка отправлена! 🎉",
        description: "Ваша заявка на пополнение отправлена администратору на рассмотрение.",
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
    depositRequestMutation.mutate(values);
  };

  return (
    <div className="space-y-6">
      {/* Форма создания заявки */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            Пополнить баланс
          </CardTitle>
          <p className="text-muted-foreground">
            Отправьте заявку на пополнение баланса. Администратор рассмотрит её в течение 24 часов.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Сумма пополнения (USD)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={10}
                          placeholder="Введите сумму"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Способ пополнения</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${field.value === "card" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200"}`}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="h-6 w-6 text-blue-500" />
                            <div>
                              <label htmlFor="card" className="font-semibold cursor-pointer">Банковская карта</label>
                              <p className="text-sm text-muted-foreground">Visa, MasterCard, МИР</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${field.value === "crypto" ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-gray-200"}`}>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="crypto" id="crypto" />
                            <Wallet className="h-6 w-6 text-orange-500" />
                            <div>
                              <label htmlFor="crypto" className="font-semibold cursor-pointer">Криптовалюта</label>
                              <p className="text-sm text-muted-foreground">BTC, ETH, USDT</p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-200">Преимущества пополнения</span>
                </div>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Мгновенное зачисление после одобрения</li>
                  <li>• Безопасные платежи</li>
                  <li>• Круглосуточная поддержка</li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg"
                disabled={depositRequestMutation.isPending}
              >
                {depositRequestMutation.isPending && (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                )}
                Отправить заявку на пополнение
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
            История заявок на пополнение
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : depositRequests && depositRequests.length > 0 ? (
            <div className="space-y-4">
              {depositRequests.map((request: any) => (
                <div key={request.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <DollarSign className="h-4 w-4 text-blue-600" />
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
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Способ пополнения:</span>
                      <p className="font-medium capitalize">{request.paymentMethod === 'card' ? 'Банковская карта' : 'Криптовалюта'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Статус:</span>
                      <p className="font-medium">
                        {request.status === 'pending' && 'Ожидает рассмотрения'}
                        {request.status === 'approved' && 'Одобрено и зачислено'}
                        {request.status === 'rejected' && 'Отклонено администратором'}
                      </p>
                    </div>
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
              <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-muted-foreground">У вас пока нет заявок на пополнение</p>
              <p className="text-sm text-muted-foreground mt-1">Создайте первую заявку выше</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}