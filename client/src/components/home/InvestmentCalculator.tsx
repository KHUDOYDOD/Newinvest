import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LineChart, Clock } from "lucide-react";

// Новая функция 3: Расширенный инвестиционный калькулятор с графиком
export function InvestmentCalculator() {
  const [investment, setInvestment] = useState(1000);
  const [period, setPeriod] = useState(12); // месяцы
  const [interestRate, setInterestRate] = useState(15); // процент годовых
  const [compounding, setCompounding] = useState("monthly"); // периодичность
  const [reinvest, setReinvest] = useState(true); // реинвестирование прибыли
  const [results, setResults] = useState<{total: number, interest: number, monthly: number[]}>({
    total: 0,
    interest: 0,
    monthly: []
  });

  // Расчет результатов инвестирования
  useEffect(() => {
    let total = investment;
    let monthlyResults = [investment];
    
    const monthlyRate = interestRate / 100 / 12;
    let compoundFrequency = 1;
    
    switch(compounding) {
      case "daily":
        compoundFrequency = 30;
        break;
      case "weekly":
        compoundFrequency = 4;
        break;
      case "monthly":
        compoundFrequency = 1;
        break;
      case "quarterly":
        compoundFrequency = 1/3;
        break;
      default:
        compoundFrequency = 1;
    }
    
    for (let i = 1; i <= period; i++) {
      if (compounding === "yearly" && i % 12 !== 0) {
        monthlyResults.push(total);
        continue;
      }
      
      const periodReturn = reinvest
        ? total * Math.pow(1 + (monthlyRate / compoundFrequency), compoundFrequency) - total
        : total * (monthlyRate / compoundFrequency) * compoundFrequency;
      
      total = reinvest ? total + periodReturn : total + periodReturn;
      monthlyResults.push(total);
    }
    
    setResults({
      total: total,
      interest: total - investment,
      monthly: monthlyResults
    });
  }, [investment, period, interestRate, compounding, reinvest]);

  // Функция форматирования чисел
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Инвестиционный калькулятор
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Рассчитайте потенциальную доходность вашего инвестиционного портфеля с учетом сложного процента.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-primary" />
                <span>Параметры расчета</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="font-medium">Сумма инвестиций</label>
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    min={100}
                    max={1000000}
                    className="flex-1"
                  />
                  <span className="flex items-center">USD</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="font-medium">Срок инвестирования</label>
                  <span>{period} мес.</span>
                </div>
                <Slider
                  value={[period]}
                  onValueChange={(value) => setPeriod(value[0])}
                  min={1}
                  max={60}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 месяц</span>
                  <span>60 месяцев</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="font-medium">Годовая доходность</label>
                  <span>{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  min={1}
                  max={50}
                  step={0.5}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1%</span>
                  <span>50%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="font-medium">Периодичность начисления</label>
                <Tabs 
                  defaultValue={compounding} 
                  onValueChange={(value) => setCompounding(value)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="daily">Ежедневно</TabsTrigger>
                    <TabsTrigger value="weekly">Еженедельно</TabsTrigger>
                    <TabsTrigger value="monthly">Ежемесячно</TabsTrigger>
                    <TabsTrigger value="yearly">Ежегодно</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reinvest"
                  checked={reinvest}
                  onChange={(e) => setReinvest(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="reinvest" className="text-sm font-medium">
                  Реинвестировать прибыль (сложный процент)
                </label>
              </div>
              
              <Button 
                className="w-full gradient-bg text-white" 
                size="lg"
                onClick={() => {
                  // Прокрутка к результатам на мобильных устройствах
                  if (window.innerWidth < 1024) {
                    document.getElementById('results-card')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Рассчитать доходность
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur" id="results-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="w-5 h-5 mr-2 text-primary" />
                <span>Результаты расчета</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Начальные инвестиции</p>
                  <p className="text-xl font-bold">{formatNumber(investment)}</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Итоговая сумма</p>
                  <p className="text-xl font-bold text-primary">{formatNumber(results.total)}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                  <p className="text-sm text-muted-foreground">Доход от инвестиций</p>
                  <p className="text-xl font-bold text-green-600">{formatNumber(results.interest)}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg">
                  <p className="text-sm text-muted-foreground">Среднемесячный доход</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatNumber(results.interest / period)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Рост инвестиций</h4>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="h-[200px] relative">
                  <div className="absolute inset-0 flex items-end space-x-1">
                    {results.monthly.map((value, index) => {
                      const maxValue = Math.max(...results.monthly);
                      const height = (value / maxValue) * 100;
                      const isLast = index === results.monthly.length - 1;
                      
                      return (
                        <div 
                          key={index}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div 
                            className={`w-full ${isLast ? 'bg-primary' : 'bg-primary/70'} rounded-t`}
                            style={{ height: `${height}%` }}
                            title={`Месяц ${index}: ${formatNumber(value)}`}
                          ></div>
                          {index % 12 === 0 && (
                            <span className="text-xs text-muted-foreground mt-1">
                              {index / 12} г.
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                  <span>Начало</span>
                  <span>Время</span>
                  <span>Конец</span>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-100 rounded text-sm mt-6">
                <p className="text-amber-800">
                  <strong>Внимание:</strong> Результаты калькулятора являются приблизительными и не гарантируют 
                  фактическую доходность. Инвестиции сопряжены с рисками.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}