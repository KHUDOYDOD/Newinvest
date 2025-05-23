import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calculator, FileText, Download, TrendingUp,
  ArrowUp, ArrowDown, HelpCircle, Calendar,
  CheckCircle, AlertCircle, BarChart, DollarSign,
  PieChart, ArrowRight
} from "lucide-react";

// Пример данных для налогового оптимизатора
const taxData = {
  taxYear: 2025,
  currentLiability: 3580,
  potentialSavings: 1250,
  taxableIncome: 78500,
  portfolioTransactions: [
    {
      id: 1,
      asset: "Apple Inc.",
      symbol: "AAPL",
      purchaseDate: "10.01.2025",
      purchasePrice: 160.50,
      currentPrice: 192.75,
      quantity: 15,
      gain: 483.75,
      gainPercentage: 20.09,
      holdingPeriod: "Short-term", // Short-term или Long-term
      taxRate: 22,
      taxAmount: 106.43
    },
    {
      id: 2,
      asset: "Microsoft Corp.",
      symbol: "MSFT",
      purchaseDate: "15.03.2024",
      purchasePrice: 350.20,
      currentPrice: 425.40,
      quantity: 8,
      gain: 601.60,
      gainPercentage: 21.47,
      holdingPeriod: "Long-term",
      taxRate: 15,
      taxAmount: 90.24
    },
    {
      id: 3,
      asset: "Tesla Inc.",
      symbol: "TSLA",
      purchaseDate: "05.04.2025",
      purchasePrice: 180.40,
      currentPrice: 165.80,
      quantity: 10,
      gain: -146.00,
      gainPercentage: -8.09,
      holdingPeriod: "Short-term",
      taxRate: 22,
      taxAmount: 0 // Убыток не облагается налогом
    },
    {
      id: 4,
      asset: "Ethereum",
      symbol: "ETH",
      purchaseDate: "20.12.2024",
      purchasePrice: 2150.00,
      currentPrice: 3250.65,
      quantity: 2.5,
      gain: 2751.63,
      gainPercentage: 51.19,
      holdingPeriod: "Short-term",
      taxRate: 22,
      taxAmount: 605.36
    },
    {
      id: 5,
      asset: "S&P 500 ETF",
      symbol: "SPY",
      purchaseDate: "15.05.2023",
      purchasePrice: 410.80,
      currentPrice: 485.25,
      quantity: 25,
      gain: 1861.25,
      gainPercentage: 18.12,
      holdingPeriod: "Long-term",
      taxRate: 15,
      taxAmount: 279.19
    }
  ],
  taxOptimizations: [
    {
      id: 1,
      type: "harvest-loss",
      description: "Продажа Tesla с убытком (Tax Loss Harvesting)",
      asset: "Tesla Inc. (TSLA)",
      potentialSavings: 450.25,
      impact: "high"
    },
    {
      id: 2,
      type: "hold-longer",
      description: "Удержание Apple до долгосрочного периода",
      asset: "Apple Inc. (AAPL)",
      potentialSavings: 234.50,
      impact: "medium"
    },
    {
      id: 3,
      type: "tax-deferred",
      description: "Перемещение части активов в пенсионный счет",
      asset: "Microsoft Corp. (MSFT)",
      potentialSavings: 325.75,
      impact: "high"
    },
    {
      id: 4,
      type: "tax-credit",
      description: "Инвестиционный налоговый вычет",
      asset: "Квалифицированные инвестиции",
      potentialSavings: 240.00,
      impact: "medium"
    }
  ],
  taxBrackets: [
    {
      income: "до 40,000",
      rate: 12,
      yourRate: false
    },
    {
      income: "40,000 - 85,000",
      rate: 22,
      yourRate: true
    },
    {
      income: "85,000 - 170,000",
      rate: 24,
      yourRate: false
    },
    {
      income: "170,000 - 215,000",
      rate: 32,
      yourRate: false
    },
    {
      income: "свыше 215,000",
      rate: 35,
      yourRate: false
    }
  ],
  taxCalendar: [
    {
      date: "15.04.2025",
      event: "Крайний срок подачи налоговой декларации",
      status: "upcoming"
    },
    {
      date: "15.06.2025",
      event: "Второй квартальный платеж по налогам",
      status: "upcoming"
    },
    {
      date: "31.12.2025",
      event: "Крайний срок для фиксации убытков текущего года",
      status: "upcoming"
    }
  ]
};

// Компонент для налоговой оптимизации - Новая функция 5 для личного кабинета
export default function TaxOptimizer() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Форматирование валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Получение цвета для воздействия
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case "high": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-blue-100 text-blue-800 border-blue-200";
      case "low": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Вычисление общей прибыли
  const calculateTotalGain = () => {
    return taxData.portfolioTransactions.reduce((total, transaction) => {
      return total + transaction.gain;
    }, 0);
  };
  
  // Вычисление общего налога
  const calculateTotalTax = () => {
    return taxData.portfolioTransactions.reduce((total, transaction) => {
      return total + transaction.taxAmount;
    }, 0);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Налоговый оптимизатор</h2>
          <p className="text-muted-foreground">
            Анализ налоговых последствий и оптимизация налогообложения инвестиций
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Налоговый год: {taxData.taxYear}
          </Badge>
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Рассчитать заново
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Текущие налоговые обязательства
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(taxData.currentLiability)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-sm text-muted-foreground">
                Налог на прирост капитала
              </div>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Потенциальная экономия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(taxData.potentialSavings)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={Math.round((taxData.potentialSavings / taxData.currentLiability) * 100)} className="h-2" />
              <span className="text-sm font-medium">
                {Math.round((taxData.potentialSavings / taxData.currentLiability) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Налоговая ставка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              22%
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-sm text-muted-foreground">
                Ваша текущая налоговая категория
              </div>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Транзакции</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Стратегии</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Календарь</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Распределение налогов</CardTitle>
                <CardDescription>
                  Разбивка ваших текущих налоговых обязательств по активам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxData.portfolioTransactions.map(transaction => (
                    transaction.taxAmount > 0 && (
                      <div key={transaction.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-3 h-3 rounded-full ${
                              transaction.holdingPeriod === "Long-term" 
                                ? "bg-blue-500" 
                                : "bg-purple-500"
                            }`}
                          />
                          <span>{transaction.asset} ({transaction.symbol})</span>
                        </div>
                        <div>
                          {formatCurrency(transaction.taxAmount)}
                        </div>
                      </div>
                    )
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center font-bold">
                    <span>Общий налог</span>
                    <span>{formatCurrency(calculateTotalTax())}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">Налоговые ставки на прирост капитала</span>
                    </div>
                    <div className="space-x-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        Краткоср. 22%
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        Долгоср. 15%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Прирост/Убыток</CardTitle>
                <CardDescription>
                  Текущие результаты инвестиций до налогообложения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxData.portfolioTransactions.map(transaction => (
                    <div key={transaction.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-3 h-3 rounded-full ${
                            transaction.gain >= 0 
                              ? "bg-green-500" 
                              : "bg-red-500"
                          }`}
                        />
                        <span>{transaction.asset} ({transaction.symbol})</span>
                      </div>
                      <div className={transaction.gain >= 0 ? "text-green-600" : "text-red-600"}>
                        {transaction.gain >= 0 ? "+" : ""}{formatCurrency(transaction.gain)}
                      </div>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center font-bold">
                    <span>Общий прирост</span>
                    <span className={calculateTotalGain() >= 0 ? "text-green-600" : "text-red-600"}>
                      {calculateTotalGain() >= 0 ? "+" : ""}{formatCurrency(calculateTotalGain())}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg bg-muted/10">
                      <div className="text-xs text-muted-foreground">Краткосрочный прирост</div>
                      <div className="text-lg font-medium text-green-600">+$3,089.38</div>
                    </div>
                    <div className="p-3 border rounded-lg bg-muted/10">
                      <div className="text-xs text-muted-foreground">Долгосрочный прирост</div>
                      <div className="text-lg font-medium text-green-600">+$2,462.85</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Потенциальные оптимизации</CardTitle>
              <CardDescription>
                Рекомендуемые действия для снижения налоговой нагрузки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxData.taxOptimizations.map(optimization => (
                  <div key={optimization.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-full ${
                          optimization.impact === "high" ? "bg-green-100" :
                          optimization.impact === "medium" ? "bg-blue-100" : "bg-amber-100"
                        }`}>
                          {optimization.type === "harvest-loss" ? (
                            <ArrowDown className={`h-5 w-5 ${
                              optimization.impact === "high" ? "text-green-600" :
                              optimization.impact === "medium" ? "text-blue-600" : "text-amber-600"
                            }`} />
                          ) : optimization.type === "hold-longer" ? (
                            <Calendar className={`h-5 w-5 ${
                              optimization.impact === "high" ? "text-green-600" :
                              optimization.impact === "medium" ? "text-blue-600" : "text-amber-600"
                            }`} />
                          ) : optimization.type === "tax-deferred" ? (
                            <PieChart className={`h-5 w-5 ${
                              optimization.impact === "high" ? "text-green-600" :
                              optimization.impact === "medium" ? "text-blue-600" : "text-amber-600"
                            }`} />
                          ) : (
                            <DollarSign className={`h-5 w-5 ${
                              optimization.impact === "high" ? "text-green-600" :
                              optimization.impact === "medium" ? "text-blue-600" : "text-amber-600"
                            }`} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{optimization.description}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Актив: {optimization.asset}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getImpactColor(optimization.impact)}>
                        Экономия: {formatCurrency(optimization.potentialSavings)}
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button size="sm">
                        Применить стратегию
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Налогооблагаемые транзакции</CardTitle>
              <CardDescription>
                Детальная информация о транзакциях, влияющих на ваши налоговые обязательства
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Актив</th>
                      <th className="text-left py-3 px-4 font-medium">Дата покупки</th>
                      <th className="text-right py-3 px-4 font-medium">Цена покупки</th>
                      <th className="text-right py-3 px-4 font-medium">Текущая цена</th>
                      <th className="text-right py-3 px-4 font-medium">Кол-во</th>
                      <th className="text-right py-3 px-4 font-medium">Прибыль/Убыток</th>
                      <th className="text-right py-3 px-4 font-medium">Период</th>
                      <th className="text-right py-3 px-4 font-medium">Налог</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxData.portfolioTransactions.map(transaction => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium">{transaction.asset}</div>
                          <div className="text-xs text-muted-foreground">{transaction.symbol}</div>
                        </td>
                        <td className="py-4 px-4">{transaction.purchaseDate}</td>
                        <td className="py-4 px-4 text-right">{formatCurrency(transaction.purchasePrice)}</td>
                        <td className="py-4 px-4 text-right">{formatCurrency(transaction.currentPrice)}</td>
                        <td className="py-4 px-4 text-right">{transaction.quantity}</td>
                        <td className="py-4 px-4 text-right">
                          <div className={transaction.gain >= 0 ? "text-green-600" : "text-red-600"}>
                            {transaction.gain >= 0 ? "+" : ""}{formatCurrency(transaction.gain)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {transaction.gain >= 0 ? "+" : ""}{transaction.gainPercentage.toFixed(2)}%
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Badge variant="outline" className={
                            transaction.holdingPeriod === "Long-term" 
                              ? "bg-blue-100 text-blue-800 border-blue-200" 
                              : "bg-purple-100 text-purple-800 border-purple-200"
                          }>
                            {transaction.holdingPeriod === "Long-term" ? "Долгосрочный" : "Краткосрочный"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {transaction.taxAmount > 0 ? (
                            <div className="font-medium">{formatCurrency(transaction.taxAmount)}</div>
                          ) : (
                            <div className="text-green-600 text-sm font-medium">Нет налога</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт для налогового учета
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Налоговые ставки</CardTitle>
              <CardDescription>
                Информация о текущих налоговых ставках на доходы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Диапазон доходов</th>
                        <th className="text-right py-3 px-4 font-medium">Ставка налога</th>
                        <th className="text-right py-3 px-4 font-medium">Ваша ставка</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxData.taxBrackets.map((bracket, index) => (
                        <tr key={index} className={`border-b ${bracket.yourRate ? "bg-muted/20" : ""}`}>
                          <td className="py-3 px-4">${bracket.income}</td>
                          <td className="py-3 px-4 text-right">{bracket.rate}%</td>
                          <td className="py-3 px-4 text-right">
                            {bracket.yourRate ? (
                              <CheckCircle className="h-5 w-5 text-green-600 inline-block" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border rounded-lg bg-amber-50 text-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Важно знать о налоговых ставках</p>
                      <p className="text-sm mt-1">
                        Долгосрочный прирост капитала (активы, удерживаемые более 1 года) облагается по более низкой ставке (15%), 
                        чем краткосрочный прирост (облагается по вашей обычной ставке подоходного налога).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Loss Harvesting</CardTitle>
                <CardDescription>
                  Стратегии использования убытков для уменьшения налогооблагаемого дохода
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Tax Loss Harvesting - стратегия, при которой вы продаете активы с убытком, чтобы компенсировать 
                  налоги на прибыль от других инвестиций. Вы можете компенсировать до $3,000 обычного дохода в год.
                </p>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Потенциальные кандидаты для Tax Loss Harvesting</h4>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="h-4 w-4 text-red-500" />
                        <span>Tesla Inc. (TSLA)</span>
                      </div>
                      <div className="text-red-600">
                        -$146.00
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button size="sm">Применить стратегию</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-blue-50 text-blue-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Правило Wash Sale</p>
                      <p className="text-sm mt-1">
                        Помните о правиле Wash Sale: нельзя купить тот же или существенно идентичный актив 
                        в течение 30 дней до или после продажи с убытком, иначе убыток не будет признан для налоговых целей.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Долгосрочное удержание</CardTitle>
                <CardDescription>
                  Преимущества удержания активов более 1 года
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Активы, удерживаемые более 1 года, подпадают под льготное налогообложение долгосрочного прироста капитала. 
                  Это может значительно снизить ваши налоговые обязательства.
                </p>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Активы, приближающиеся к долгосрочному статусу</h4>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>Apple Inc. (AAPL)</span>
                      </div>
                      <div className="text-muted-foreground">
                        Осталось: 62 дня
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button size="sm">Установить напоминание</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Потенциальная налоговая экономия</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Текущий налог (22%)</div>
                      <div className="font-medium">$106.43</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Долгосрочный налог (15%)</div>
                      <div className="font-medium text-green-600">$72.56</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground">Потенциальная экономия</div>
                    <div className="font-medium text-green-600">$33.87</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Налоговые вычеты и льготы</CardTitle>
              <CardDescription>
                Доступные налоговые вычеты и льготы для инвесторов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Инвестиционный налоговый вычет</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Вы можете получить налоговый вычет на сумму до 400,000 рублей в год на вложения в ценные бумаги 
                    через индивидуальный инвестиционный счет (ИИС).
                  </p>
                  <div className="mt-3">
                    <Button size="sm">Узнать подробнее</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Пенсионные счета с налоговыми льготами</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Инвестирование через пенсионные счета может предложить значительные налоговые преимущества, 
                    включая отсрочку налогообложения или освобождение от налогов.
                  </p>
                  <div className="mt-3">
                    <Button size="sm">Узнать подробнее</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Благотворительные пожертвования</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Пожертвования акций, которые выросли в цене, могут предложить двойное налоговое преимущество: 
                    благотворительный вычет и избежание налога на прирост капитала.
                  </p>
                  <div className="mt-3">
                    <Button size="sm">Узнать подробнее</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Налоговый календарь</CardTitle>
              <CardDescription>
                Важные даты и сроки для вашего налогового планирования
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxData.taxCalendar.map((event, index) => (
                  <div 
                    key={index} 
                    className="p-4 border rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{event.event}</div>
                          <div className="text-sm text-muted-foreground mt-1">Дата: {event.date}</div>
                        </div>
                      </div>
                      <Badge variant={event.status === "upcoming" ? "default" : "outline"}>
                        {event.status === "upcoming" ? "Предстоит" : "Завершено"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="p-4 border rounded-lg bg-blue-50 text-blue-800">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Важно помнить</p>
                      <p className="text-sm mt-1">
                        Tax Loss Harvesting нужно завершить до конца календарного года (31 декабря), 
                        чтобы получить налоговые преимущества в текущем налоговом году.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Добавить в мой календарь
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Консультация специалиста</CardTitle>
              <CardDescription>
                Получите профессиональный совет по налоговому планированию
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-lg bg-muted/10 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Нужна помощь с налоговым планированием?</h3>
                <p className="text-muted-foreground mb-6">
                  Наши сертифицированные налоговые консультанты помогут вам разработать оптимальную 
                  стратегию для минимизации налоговой нагрузки и максимизации доходности инвестиций.
                </p>
                <Button className="gradient-bg text-white">
                  Записаться на консультацию
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}