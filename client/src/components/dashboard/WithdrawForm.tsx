import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { withdrawSchema } from "@shared/schema";

type FormValues = z.infer<typeof withdrawSchema>;

export default function WithdrawForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  const userBalance = user ? parseFloat(user.balance) : 0;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 100,
      wallet: "",
    },
  });
  
  const withdrawMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest("POST", "/api/withdraw", data);
      return await res.json();
    },
    onSuccess: () => {
      setStep('success');
      
      // Invalidate related queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      toast({
        title: "Запрос на вывод создан",
        description: "Средства будут переведены в ближайшее время.",
      });
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        setStep('form');
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка вывода средств",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (values: FormValues) => {
    if (values.amount > userBalance) {
      toast({
        title: "Недостаточно средств",
        description: "Сумма вывода превышает ваш баланс.",
        variant: "destructive",
      });
      return;
    }
    
    withdrawMutation.mutate(values);
  };
  
  if (step === 'success') {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="font-heading font-bold text-xl mb-2">Запрос на вывод успешно создан</h3>
          <p className="text-muted-foreground mb-4">
            Ваши средства будут переведены в ближайшее время
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Доступно для вывода:</p>
          <p className="font-heading font-bold text-2xl">${userBalance.toFixed(2)}</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сумма вывода (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                      min={10}
                      max={userBalance}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Способ вывода</FormLabel>
              <Select defaultValue="crypto">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите способ вывода" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crypto">Криптовалюта</SelectItem>
                  <SelectItem value="card">Банковская карта</SelectItem>
                  <SelectItem value="bank">Банковский перевод</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес кошелька / реквизиты</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Например: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Важно:</strong> Вывод средств обрабатывается в течение 24 часов. Пожалуйста, внимательно проверьте реквизиты перед отправкой запроса.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gradient-bg"
              disabled={withdrawMutation.isPending}
            >
              {withdrawMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Вывести средства
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
