import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Users, TrendingUp, Award, UserPlus, Shield,
  ArrowUpRight, ArrowDownRight, ArrowRight,
  BarChart2, PieChart, DollarSign, Check,
  AlertTriangle, Star, StarHalf, Clock, Info
} from "lucide-react";

// Пример данных для сравнения с другими инвесторами
const peerComparisonData = {
  performanceRanking: {
    percentile: 72,
    totalInvestors: 10840,
    aboveAverage: true,
    description: "Ваша доходность выше, чем у 72% инвесторов с аналогичным профилем риска за последние 12 месяцев"
  },
  comparisonMetrics: [
    {
      name: "Годовая доходность",
      yourValue: 16.4,
      peerAverage: 12.8,
      topPerformers: 22.5,
      unit: "%"
    },
    {
      name: "Волатильность",
      yourValue: 14.8,
      peerAverage: 12.5,
      topPerformers: 13.2,
      unit: "%",
      lowerIsBetter: true
    },
    {
      name: "Коэффициент Шарпа",
      yourValue: 1.25,
      peerAverage: 1.05,
      topPerformers: 1.75,
      unit: ""
    },
    {
      name: "Максимальное падение",
      yourValue: 22.4,
      peerAverage: 18.6,
      topPerformers: 15.2,
      unit: "%",
      lowerIsBetter: true
    },
    {
      name: "Бета",
      yourValue: 1.18,
      peerAverage: 1.02,
      topPerformers: 0.95,
      unit: "",
      lowerIsBetter: true
    }
  ],
  allocationComparison: {
    yours: [
      { asset: "Акции", percentage: 65, color: "#4f46e5" },
      { asset: "Облигации", percentage: 20, color: "#10b981" },
      { asset: "Криптовалюта", percentage: 10, color: "#f59e0b" },
      { asset: "Товарные активы", percentage: 5, color: "#ef4444" }
    ],
    peerAverage: [
      { asset: "Акции", percentage: 55, color: "#4f46e5" },
      { asset: "Облигации", percentage: 35, color: "#10b981" },
      { asset: "Криптовалюта", percentage: 5, color: "#f59e0b" },
      { asset: "Товарные активы", percentage: 5, color: "#ef4444" }
    ],
    topPerformers: [
      { asset: "Акции", percentage: 60, color: "#4f46e5" },
      { asset: "Облигации", percentage: 25, color: "#10b981" },
      { asset: "Криптовалюта", percentage: 8, color: "#f59e0b" },
      { asset: "Товарные активы", percentage: 7, color: "#ef4444" }
    ]
  },
  sectorExposureComparison: {
    yours: [
      { sector: "Технологии", percentage: 42, performance: 18.5 },
      { sector: "Финансы", percentage: 15, performance: 12.2 },
      { sector: "Здравоохранение", percentage: 12, performance: 9.8 },
      { sector: "Потребительские товары", percentage: 8, performance: 7.5 },
      { sector: "Промышленность", percentage: 7, performance: 10.4 },
      { sector: "Энергетика", percentage: 6, performance: 15.8 },
      { sector: "Другие", percentage: 10, performance: 8.6 }
    ],
    peerAverage: [
      { sector: "Технологии", percentage: 35, performance: 16.5 },
      { sector: "Финансы", percentage: 18, performance: 10.2 },
      { sector: "Здравоохранение", percentage: 15, performance: 8.8 },
      { sector: "Потребительские товары", percentage: 10, performance: 6.5 },
      { sector: "Промышленность", percentage: 12, performance: 9.4 },
      { sector: "Энергетика", percentage: 4, performance: 12.8 },
      { sector: "Другие", percentage: 6, performance: 7.6 }
    ]
  },
  keyStrategyDifferences: [
    {
      strategy: "Технологический сектор",
      yourApproach: "Высокая доля (42% против среднего 35%)",
      impact: "positive",
      recommendation: "Ваша повышенная экспозиция к технологическому сектору способствовала более высокой доходности, но также повысила общую волатильность портфеля."
    },
    {
      strategy: "Диверсификация",
      yourApproach: "Меньше активов в облигациях (20% против среднего 35%)",
      impact: "mixed",
      recommendation: "Пониженная доля облигаций увеличила вашу доходность в растущем рынке, но также повысила риск при коррекции."
    },
    {
      strategy: "Криптовалюты",
      yourApproach: "Удвоенная доля по сравнению со средним (10% против 5%)",
      impact: "positive",
      recommendation: "Ваша повышенная экспозиция к криптовалютам была выгодной, но увеличивает риск в случае проблем в этом секторе."
    }
  ],
  peerGroups: [
    { name: "Все инвесторы", count: 10840 },
    { name: "Умеренный профиль риска", count: 4250 },
    { name: "Аналогичный размер портфеля", count: 2180 },
    { name: "Аналогичный опыт инвестирования", count: 1540 },
    { name: "Топ 10% по доходности", count: 1084 }
  ],
  performanceHistory: [
    {
      period: "1м",
      yourReturn: 2.8,
      peerReturn: 2.1,
      difference: 0.7
    },
    {
      period: "3м",
      yourReturn: 6.5,
      peerReturn: 5.2,
      difference: 1.3
    },
    {
      period: "6м",
      yourReturn: 9.2,
      peerReturn: 7.8,
      difference: 1.4
    },
    {
      period: "1г",
      yourReturn: 16.4,
      peerReturn: 12.8,
      difference: 3.6
    },
    {
      period: "С начала",
      yourReturn: 32.8,
      peerReturn: 27.5,
      difference: 5.3
    }
  ]
};

// Компонент для сравнения с другими инвесторами - Новая функция 9 для личного кабинета
export default function PeerComparison() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string>("all");
  
  // Форматирование процентов
  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value}%`;
  };
  
  // Форматирование числа
  const formatNumber = (value: number, unit: string = "") => {
    return `${value}${unit}`;
  };
  
  // Получение цвета значения в сравнении
  const getComparisonColor = (yours: number, peer: number, lowerIsBetter: boolean = false) => {
    if (lowerIsBetter) {
      return yours <= peer ? "text-green-600" : "text-red-600";
    }
    return yours >= peer ? "text-green-600" : "text-red-600";
  };
  
  // Получение иконки для значения в сравнении
  const getComparisonIcon = (yours: number, peer: number, lowerIsBetter: boolean = false) => {
    if (lowerIsBetter) {
      return yours <= peer ? (
        <ArrowDownRight className="h-4 w-4 text-green-600" />
      ) : (
        <ArrowUpRight className="h-4 w-4 text-red-600" />
      );
    }
    return yours >= peer ? (
      <ArrowUpRight className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-600" />
    );
  };
  
  // Получение текста для влияния стратегии
  const getImpactText = (impact: string) => {
    switch(impact) {
      case "positive": return "Положительное влияние";
      case "negative": return "Отрицательное влияние";
      case "mixed": return "Смешанное влияние";
      default: return "Нейтральное влияние";
    }
  };
  
  // Получение цвета для влияния стратегии
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case "positive": return "bg-green-100 text-green-800 border-green-200";
      case "negative": return "bg-red-100 text-red-800 border-red-200";
      case "mixed": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Получение количества звезд для прогресса
  const getStarRating = (percentile: number) => {
    if (percentile >= 80) return (
      <div className="flex">
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
      </div>
    );
    if (percentile >= 60) return (
      <div className="flex">
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <StarHalf className="h-5 w-5 text-amber-500" />
      </div>
    );
    if (percentile >= 40) return (
      <div className="flex">
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-muted-foreground" />
        <Star className="h-5 w-5 text-muted-foreground" />
      </div>
    );
    if (percentile >= 20) return (
      <div className="flex">
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-muted-foreground" />
        <Star className="h-5 w-5 text-muted-foreground" />
        <Star className="h-5 w-5 text-muted-foreground" />
      </div>
    );
    return (
      <div className="flex">
        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
        <Star className="h-5 w-5 text-muted-foreground" />
        <Star className="h-5 w-5 text-muted-foreground" />
        <Star className="h-5 w-5 text-muted-foreground" />
        <Star className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Сравнение с другими инвесторами</h2>
          <p className="text-muted-foreground">
            Анализ вашей инвестиционной эффективности в сравнении с другими инвесторами
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedPeerGroup}
            onValueChange={setSelectedPeerGroup}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Выберите группу для сравнения" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все инвесторы</SelectItem>
              <SelectItem value="risk">Аналогичный профиль риска</SelectItem>
              <SelectItem value="portfolio">Аналогичный размер портфеля</SelectItem>
              <SelectItem value="experience">Аналогичный опыт инвестирования</SelectItem>
              <SelectItem value="top">Топ 10% по доходности</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Рейтинг эффективности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {peerComparisonData.performanceRanking.percentile} процентиль
              {peerComparisonData.performanceRanking.aboveAverage && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Выше среднего
                </Badge>
              )}
            </div>
            <div className="mt-2">
              <Progress 
                value={peerComparisonData.performanceRanking.percentile} 
                className="h-2" 
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Сравнение с {peerComparisonData.performanceRanking.totalInvestors.toLocaleString()} инвесторами
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Рейтинг по доходности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {getStarRating(peerComparisonData.performanceRanking.percentile)}
              <div className="text-center mt-2 text-sm">
                <span className="text-green-600 font-medium">
                  +{peerComparisonData.comparisonMetrics[0].yourValue - peerComparisonData.comparisonMetrics[0].peerAverage}%
                </span> к среднему
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              12-месячная доходность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{peerComparisonData.comparisonMetrics[0].yourValue}%
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-muted-foreground">Среднее по группе:</span>
              <span>+{peerComparisonData.comparisonMetrics[0].peerAverage}%</span>
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
            <Users className="h-4 w-4" />
            <span>Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Показатели</span>
          </TabsTrigger>
          <TabsTrigger value="allocation" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Распределение</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Стратегии</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Историческая эффективность</CardTitle>
              <CardDescription>
                Сравнение вашей доходности с группой аналогичных инвесторов за разные периоды
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Период</th>
                      <th className="text-right py-3 px-4 font-medium">Ваша доходность</th>
                      <th className="text-right py-3 px-4 font-medium">Средняя по группе</th>
                      <th className="text-right py-3 px-4 font-medium">Разница</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peerComparisonData.performanceHistory.map((period, index) => (
                      <tr key={index} className="border-b hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-4">{period.period}</td>
                        <td className="py-3 px-4 text-right font-medium text-green-600">
                          +{period.yourReturn}%
                        </td>
                        <td className="py-3 px-4 text-right">
                          +{period.peerReturn}%
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className={`flex items-center justify-end ${
                            period.difference > 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {period.difference > 0 ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            <span>{Math.abs(period.difference)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <div className="p-4 border rounded-lg flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Ключевые выводы</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Выше среднего
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">Ваша доходность стабильно превышает среднюю по группе на всех временных горизонтах</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">Наибольшее превосходство показано за период в 1 год (+3.6%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">Положительная тенденция сохраняется с начала инвестирования</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg flex-1">
                  <h4 className="font-medium mb-3">Возможности для улучшения</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm">Потенциально высокий риск для достижения текущих показателей доходности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm">Рассмотрите возможность снижения волатильности без существенной потери в доходности</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Группы для сравнения</CardTitle>
              <CardDescription>
                Различные группы инвесторов, с которыми можно сравнить вашу эффективность
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {peerComparisonData.peerGroups.map((group, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer transition-colors ${
                      (selectedPeerGroup === "all" && group.name === "Все инвесторы") ||
                      (selectedPeerGroup === "risk" && group.name === "Умеренный профиль риска") ||
                      (selectedPeerGroup === "portfolio" && group.name === "Аналогичный размер портфеля") ||
                      (selectedPeerGroup === "experience" && group.name === "Аналогичный опыт инвестирования") ||
                      (selectedPeerGroup === "top" && group.name === "Топ 10% по доходности")
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted/10"
                    }`}
                    onClick={() => {
                      if (group.name === "Все инвесторы") setSelectedPeerGroup("all");
                      else if (group.name === "Умеренный профиль риска") setSelectedPeerGroup("risk");
                      else if (group.name === "Аналогичный размер портфеля") setSelectedPeerGroup("portfolio");
                      else if (group.name === "Аналогичный опыт инвестирования") setSelectedPeerGroup("experience");
                      else if (group.name === "Топ 10% по доходности") setSelectedPeerGroup("top");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        {group.name === "Все инвесторы" && <Users className="h-5 w-5 text-primary" />}
                        {group.name === "Умеренный профиль риска" && <Shield className="h-5 w-5 text-primary" />}
                        {group.name === "Аналогичный размер портфеля" && <DollarSign className="h-5 w-5 text-primary" />}
                        {group.name === "Аналогичный опыт инвестирования" && <Clock className="h-5 w-5 text-primary" />}
                        {group.name === "Топ 10% по доходности" && <Award className="h-5 w-5 text-primary" />}
                      </div>
                      <span className="font-medium">{group.name}</span>
                    </div>
                    <Badge variant="outline">
                      {group.count.toLocaleString()} инвесторов
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ключевые метрики</CardTitle>
              <CardDescription>
                Сравнение ваших инвестиционных показателей со средними по группе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {peerComparisonData.comparisonMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{metric.name}</h4>
                        <div className="text-xs text-muted-foreground">
                          {metric.lowerIsBetter ? "(ниже лучше)" : "(выше лучше)"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={getComparisonColor(metric.yourValue, metric.peerAverage, metric.lowerIsBetter)}>
                          {getComparisonIcon(metric.yourValue, metric.peerAverage, metric.lowerIsBetter)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {metric.lowerIsBetter ? 
                            (metric.yourValue <= metric.peerAverage ? "Лучше" : "Хуже") : 
                            (metric.yourValue >= metric.peerAverage ? "Лучше" : "Хуже")
                          } среднего
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative pt-6">
                      <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                        <span>Минимум</span>
                        <span>Среднее</span>
                        <span>Топ инвесторы</span>
                      </div>
                      
                      <div className="h-2 w-full bg-muted rounded-full">
                        {/* Метка средней позиции */}
                        <div 
                          className="absolute h-4 w-px bg-muted-foreground" 
                          style={{ 
                            left: "50%", 
                            top: "calc(50% - 4px)" 
                          }}
                        />
                        
                        {/* Метка топ инвесторов */}
                        <div 
                          className="absolute h-4 w-px bg-muted-foreground" 
                          style={{ 
                            left: "90%", 
                            top: "calc(50% - 4px)" 
                          }}
                        />
                        
                        {/* Маркер вашей позиции */}
                        <div 
                          className={`absolute h-5 w-5 rounded-full border-2 border-background ${
                            metric.lowerIsBetter ? 
                              (metric.yourValue <= metric.peerAverage ? "bg-green-500" : "bg-red-500") : 
                              (metric.yourValue >= metric.peerAverage ? "bg-green-500" : "bg-red-500")
                          }`} 
                          style={{ 
                            left: `${
                              metric.lowerIsBetter ?
                                (100 - (metric.yourValue / (metric.peerAverage * 2) * 100))
                                : (metric.yourValue / (metric.topPerformers * 1.1) * 100)
                            }%`,
                            top: "calc(50% - 10px)",
                            transform: "translateX(-50%)" 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">У вас</div>
                        <div className="font-medium">{formatNumber(metric.yourValue, metric.unit)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Среднее по группе</div>
                        <div className="font-medium">{formatNumber(metric.peerAverage, metric.unit)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Топ инвесторы</div>
                        <div className="font-medium">{formatNumber(metric.topPerformers, metric.unit)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Интерпретация метрик</CardTitle>
              <CardDescription>
                Анализ ваших показателей и их значение для эффективности инвестиций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Превосходная доходность</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ваша годовая доходность в 16.4% существенно выше, чем у средних инвесторов в вашей группе (12.8%). 
                        Это указывает на эффективность вашей стратегии в текущих рыночных условиях.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Повышенная волатильность</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ваша волатильность (14.8%) и максимальное падение (22.4%) выше средних показателей. 
                        Это может указывать на более рискованный подход к инвестированию, что объясняет 
                        повышенную доходность, но также увеличивает риск существенных потерь при неблагоприятных рыночных условиях.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Хороший коэффициент Шарпа</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Несмотря на повышенный риск, ваш коэффициент Шарпа (1.25) выше среднего (1.05), 
                        что указывает на хорошее соотношение доходности к риску. Вы получаете более высокую 
                        доходность на единицу риска по сравнению с большинством инвесторов в вашей группе.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocation" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Сравнение распределения активов</CardTitle>
              <CardDescription>
                Как распределение ваших активов отличается от других инвесторов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-center font-medium mb-4">Ваше распределение</h4>
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-background flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">Всего</div>
                        <div className="font-bold">100%</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {peerComparisonData.allocationComparison.yours.map((item, index) => {
                        let startAngle = 0;
                        for (let i = 0; i < index; i++) {
                          startAngle += (peerComparisonData.allocationComparison.yours[i].percentage / 100) * 360;
                        }
                        const angle = (item.percentage / 100) * 360;
                        const largeArcFlag = item.percentage > 50 ? 1 : 0;
                        
                        // Расчет координат для сектора диаграммы
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                        
                        const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                        
                        return (
                          <path 
                            key={index} 
                            d={pathData} 
                            fill={item.color} 
                            stroke="white" 
                            strokeWidth="0.5"
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="space-y-2 mt-4">
                    {peerComparisonData.allocationComparison.yours.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-sm mr-2" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.asset}</span>
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-center font-medium mb-4">Среднее по группе</h4>
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-background flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">Всего</div>
                        <div className="font-bold">100%</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {peerComparisonData.allocationComparison.peerAverage.map((item, index) => {
                        let startAngle = 0;
                        for (let i = 0; i < index; i++) {
                          startAngle += (peerComparisonData.allocationComparison.peerAverage[i].percentage / 100) * 360;
                        }
                        const angle = (item.percentage / 100) * 360;
                        const largeArcFlag = item.percentage > 50 ? 1 : 0;
                        
                        // Расчет координат для сектора диаграммы
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                        
                        const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                        
                        return (
                          <path 
                            key={index} 
                            d={pathData} 
                            fill={item.color} 
                            stroke="white" 
                            strokeWidth="0.5"
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="space-y-2 mt-4">
                    {peerComparisonData.allocationComparison.peerAverage.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-sm mr-2" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.asset}</span>
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-center font-medium mb-4">Топ инвесторы</h4>
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-background flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">Всего</div>
                        <div className="font-bold">100%</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {peerComparisonData.allocationComparison.topPerformers.map((item, index) => {
                        let startAngle = 0;
                        for (let i = 0; i < index; i++) {
                          startAngle += (peerComparisonData.allocationComparison.topPerformers[i].percentage / 100) * 360;
                        }
                        const angle = (item.percentage / 100) * 360;
                        const largeArcFlag = item.percentage > 50 ? 1 : 0;
                        
                        // Расчет координат для сектора диаграммы
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                        
                        const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                        
                        return (
                          <path 
                            key={index} 
                            d={pathData} 
                            fill={item.color} 
                            stroke="white" 
                            strokeWidth="0.5"
                          />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="space-y-2 mt-4">
                    {peerComparisonData.allocationComparison.topPerformers.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-sm mr-2" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.asset}</span>
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 border rounded-lg bg-muted/10">
                <h4 className="font-medium mb-3">Основные отличия в распределении</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#4f46e5" }} />
                      <span>Акции</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Вы: <strong>65%</strong></span>
                      <span className="text-muted-foreground">vs</span>
                      <span>Среднее: <strong>55%</strong></span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        +10%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#10b981" }} />
                      <span>Облигации</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Вы: <strong>20%</strong></span>
                      <span className="text-muted-foreground">vs</span>
                      <span>Среднее: <strong>35%</strong></span>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                        -15%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#f59e0b" }} />
                      <span>Криптовалюта</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Вы: <strong>10%</strong></span>
                      <span className="text-muted-foreground">vs</span>
                      <span>Среднее: <strong>5%</strong></span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        +5%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Секторальная экспозиция</CardTitle>
              <CardDescription>
                Распределение ваших инвестиций по секторам экономики
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Сектор</th>
                      <th className="text-right py-3 px-4 font-medium">Ваша доля</th>
                      <th className="text-right py-3 px-4 font-medium">Средняя доля</th>
                      <th className="text-right py-3 px-4 font-medium">Разница</th>
                      <th className="text-right py-3 px-4 font-medium">Доходность сектора</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peerComparisonData.sectorExposureComparison.yours.map((sector, index) => {
                      const peerSector = peerComparisonData.sectorExposureComparison.peerAverage.find(
                        p => p.sector === sector.sector
                      );
                      const difference = peerSector ? sector.percentage - peerSector.percentage : 0;
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/10 transition-colors">
                          <td className="py-3 px-4">{sector.sector}</td>
                          <td className="py-3 px-4 text-right font-medium">
                            {sector.percentage}%
                          </td>
                          <td className="py-3 px-4 text-right">
                            {peerSector?.percentage || 0}%
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className={`flex items-center justify-end ${
                              difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : ""
                            }`}>
                              {difference !== 0 && (
                                <>
                                  {difference > 0 ? (
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                  ) : (
                                    <ArrowDownRight className="h-4 w-4 mr-1" />
                                  )}
                                  <span>{Math.abs(difference)}%</span>
                                </>
                              )}
                              {difference === 0 && <span>0%</span>}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-green-600">
                            +{sector.performance}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border rounded-lg mt-6 bg-blue-50">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Анализ секторального распределения</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Ваш портфель имеет значительно большую экспозицию к технологическому сектору (42% против среднего 35%), 
                      что способствовало более высокой доходности, но увеличило волатильность. Топ-инвесторы также имеют 
                      повышенную экспозицию к технологиям, но более сбалансированную с другими секторами.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ключевые стратегические отличия</CardTitle>
              <CardDescription>
                Основные факторы, которые отличают вашу инвестиционную стратегию
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {peerComparisonData.keyStrategyDifferences.map((difference, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-full ${
                          difference.impact === "positive" ? "bg-green-100" :
                          difference.impact === "negative" ? "bg-red-100" : "bg-amber-100"
                        }`}>
                          {difference.impact === "positive" ? (
                            <TrendingUp className={`h-5 w-5 ${
                              difference.impact === "positive" ? "text-green-600" :
                              difference.impact === "negative" ? "text-red-600" : "text-amber-600"
                            }`} />
                          ) : difference.impact === "negative" ? (
                            <AlertTriangle className={`h-5 w-5 ${
                              difference.impact === "positive" ? "text-green-600" :
                              difference.impact === "negative" ? "text-red-600" : "text-amber-600"
                            }`} />
                          ) : (
                            <Info className={`h-5 w-5 ${
                              difference.impact === "positive" ? "text-green-600" :
                              difference.impact === "negative" ? "text-red-600" : "text-amber-600"
                            }`} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{difference.strategy}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {difference.yourApproach}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getImpactColor(difference.impact)}>
                        {getImpactText(difference.impact)}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 pl-10">
                      <p className="text-sm">
                        {difference.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Усилить и улучшить</CardTitle>
              <CardDescription>
                Рекомендации по оптимизации вашей стратегии на основе анализа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium flex items-center mb-3">
                    <Award className="h-5 w-5 text-green-600 mr-2" />
                    Что сохранить в стратегии
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">Сохраните повышенную экспозицию к технологическому сектору, которая способствовала росту доходности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">Продолжайте более активный подход к управлению криптовалютами в сравнении со средним инвестором</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">Поддерживайте общий подход к выбору высокодоходных акций внутри секторов</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium flex items-center mb-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                    Что улучшить в стратегии
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm">Увеличьте долю облигаций до 25-30% для снижения общей волатильности портфеля</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm">Диверсифицируйте технологический сектор, добавив больше разнообразных компаний вместо концентрации на небольшом количестве</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm">Рассмотрите добавление защитных секторов (коммунальные услуги, потребительские товары) для снижения максимального падения</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Найти инвесторов с похожим стилем
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}