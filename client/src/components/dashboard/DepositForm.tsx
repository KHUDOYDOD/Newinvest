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
import { Loader2, CreditCard, Wallet, Clock, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { depositRequestSchema } from "@shared/schema";

const formSchema = z.object({
  amount: z.number().min(10, "Минимальная сумма пополнения $10"),
  paymentMethod: z.string().min(1, "Выберите способ оплаты"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DepositForm() {
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
  const { data: depositRequests } = useQuery({
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
        title: "Заявка отправлена",
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
    depositMutation.mutate(values);
  };
  
  const completePayment = () => {
    // In a real app, this would process actual payment
    setStep('success');
    
    // Simulate payment delay
    setTimeout(() => {
      // Reset form after success
      form.reset();
      setStep('form');
      
      // Show success toast
      toast({
        title: "Оплата успешна",
        description: "Ваш депозит активирован и начал работать.",
      });
    }, 2000);
  };
  
  // Helper function to get minimum amount based on selected plan
  const getMinAmount = (plan: string) => {
    switch (plan) {
      case "5": return 100;
      case "10": return 500;
      case "15": return 1000;
      default: return 100;
    }
  };
  
  const getPlanName = (plan: string) => {
    switch (plan) {
      case "5": return "Стартовый";
      case "10": return "Стандартный";
      case "15": return "Премиум";
      default: return "Неизвестный";
    }
  };
  
  if (step === 'payment') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h3 className="font-heading font-bold text-xl mb-2">Оплата депозита</h3>
            <p className="text-muted-foreground">Для активации депозита, пожалуйста, выполните оплату</p>
          </div>
          
          <div className="border p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Тариф:</span>
              <span className="font-medium">{getPlanName(paymentDetails.plan)} ({paymentDetails.plan}%)</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Сумма:</span>
              <span className="font-medium">${paymentDetails.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Ежедневная прибыль:</span>
              <span className="font-medium text-green-600">
                ${(paymentDetails.amount * (parseInt(paymentDetails.plan) / 100)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Срок:</span>
              <span className="font-medium">24 часа</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Выберите способ оплаты:</h4>
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2 border p-3 rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  <label htmlFor="card" className="cursor-pointer">Банковская карта</label>
                </div>
                <div className="flex items-center space-x-2 border p-3 rounded-lg">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.191-50.739-54.55-62.573l11.146-44.702-27.213-6.781-10.851 43.524c-7.154-1.783-14.502-3.464-21.803-5.13l10.929-43.81-27.198-6.781-11.153 44.686c-5.922-1.349-11.735-2.682-17.377-4.084l.031-.14-37.53-9.37-7.239 29.062s20.191 4.627 19.765 4.913c11.022 2.751 13.014 10.044 12.68 15.825l-12.696 50.925c.76.194 1.744.473 2.829.907-.907-.225-1.876-.473-2.876-.713l-17.796 71.338c-1.349 3.348-4.767 8.37-12.471 6.464.271.395-19.78-4.937-19.78-4.937l-13.51 31.147 35.414 8.827c6.588 1.651 13.045 3.379 19.4 5.006l-11.262 45.213 27.182 6.781 11.153-44.733a1038.209 1038.209 0 0 0 21.687 5.627l-11.115 44.523 27.213 6.781 11.262-45.128c46.404 8.781 81.299 5.239 95.986-36.727 11.836-33.79-.589-53.281-25.004-65.991 17.78-4.098 31.174-15.792 34.747-39.949zm-62.177 87.179c-8.41 33.79-65.308 15.523-83.755 10.943l14.944-59.899c18.446 4.603 77.6 13.717 68.811 48.956zm8.417-87.667c-7.673 30.736-55.031 15.12-70.393 11.292l13.548-54.327c15.363 3.828 64.836 10.973 56.845 43.035z"/>
                  </svg>
                  <label htmlFor="crypto" className="cursor-pointer">Криптовалюта</label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => setStep('form')}>
                Назад
              </Button>
              <Button onClick={completePayment} className="gradient-bg">
                Оплатить ${paymentDetails.amount.toFixed(2)}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (step === 'success') {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 gradient-bg rounded-full mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="font-heading font-bold text-xl mb-2">Платеж успешно обработан</h3>
          <p className="text-muted-foreground mb-6">Ваш депозит активирован и начал работать</p>
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Выберите инвестиционный план</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        // Update form value
                        field.onChange(value);
                        
                        // Get current amount
                        const currentAmount = form.getValues("amount");
                        const minAmount = getMinAmount(value);
                        
                        // Update amount if needed
                        if (currentAmount < minAmount) {
                          form.setValue("amount", minAmount);
                        }
                      }}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className={`border rounded-lg p-4 cursor-pointer transition-all ${field.value === "5" ? "border-primary bg-primary/5" : ""}`}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5" id="plan-5" />
                          <label htmlFor="plan-5" className="font-bold cursor-pointer">Стартовый</label>
                        </div>
                        <div className="mt-2 pl-6">
                          <div className="text-xl font-bold text-primary">5%</div>
                          <div className="text-sm text-muted-foreground">за 24 часа</div>
                          <div className="text-sm mt-1">от $100 до $499</div>
                        </div>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer transition-all ${field.value === "10" ? "border-primary bg-primary/5" : ""}`}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10" id="plan-10" />
                          <label htmlFor="plan-10" className="font-bold cursor-pointer">Стандартный</label>
                        </div>
                        <div className="mt-2 pl-6">
                          <div className="text-xl font-bold text-primary">10%</div>
                          <div className="text-sm text-muted-foreground">за 24 часа</div>
                          <div className="text-sm mt-1">от $500 до $999</div>
                        </div>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer transition-all ${field.value === "15" ? "border-primary bg-primary/5" : ""}`}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="15" id="plan-15" />
                          <label htmlFor="plan-15" className="font-bold cursor-pointer">Премиум</label>
                        </div>
                        <div className="mt-2 pl-6">
                          <div className="text-xl font-bold text-primary">15%</div>
                          <div className="text-sm text-muted-foreground">за 24 часа</div>
                          <div className="text-sm mt-1">от $1000</div>
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введите сумму инвестиции (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        field.onChange(value);
                      }}
                      min={getMinAmount(form.getValues("plan"))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ежедневная прибыль:</p>
                  <p className="font-bold text-green-600">
                    ${((form.getValues("amount") || 0) * (parseInt(form.getValues("plan") || "0") / 100)).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Срок депозита:</p>
                  <p className="font-bold">24 часа</p>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gradient-bg"
              disabled={depositMutation.isPending}
            >
              {depositMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Создать депозит
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
