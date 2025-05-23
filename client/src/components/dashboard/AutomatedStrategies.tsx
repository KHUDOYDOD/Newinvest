import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Brain, PlayCircle, PauseCircle, TrendingUp, Settings,
  AlertTriangle, Repeat, Sliders, Copy, Plus, ArrowRight,
  Check, History, RefreshCw, PieChart, LineChart, Calculator,
  Clock, BadgeCheck, ChevronDown, ChevronUp, ShieldCheck, Info
} from "lucide-react";

// Пример данных для автоматизированных стратегий
const strategiesData = {
  activeStrategies: [
    {
      id: 1,
      name: "Сбалансированный рост",
      description: "Диверсифицированный портфель с умеренным риском и ребалансировкой",
      status: "active",
      allocation: [
        { name: "Акции США", percentage: 45, color: "#4f46e5" },
        { name: "Акции развивающихся рынков", percentage: 15, color: "#8b5cf6" },
        { name: "Облигации", percentage: 30, color: "#10b981" },
        { name: "Золото", percentage: 10, color: "#f59e0b" }
      ],
      riskLevel: "medium",
      performance: {
        lastMonth: 2.4,
        lastYear: 14.6,
        since: 32.8
      },
      initialInvestment: 5000,
      currentValue: 6640,
      transactions: 8,
      nextRebalance: "15.06.2025",
      settings: {
        rebalanceFrequency: "quarterly",
        driftThreshold: 5,
        reinvestDividends: true,
        taxOptimization: true
      }
    },
    {
      id: 2,
      name: "Технологический фокус",
      description: "Высокорисковая стратегия с фокусом на технологический сектор",
      status: "active",
      allocation: [
        { name: "Технологические акции", percentage: 65, color: "#4f46e5" },
        { name: "Полупроводники", percentage: 20, color: "#8b5cf6" },
        { name: "Финтех", percentage: 10, color: "#10b981" },
        { name: "Кибербезопасность", percentage: 5, color: "#f59e0b" }
      ],
      riskLevel: "high",
      performance: {
        lastMonth: 3.8,
        lastYear: 19.2,
        since: 42.4
      },
      initialInvestment: 3000,
      currentValue: 4272,
      transactions: 6,
      nextRebalance: "10.06.2025",
      settings: {
        rebalanceFrequency: "monthly",
        driftThreshold: 7,
        reinvestDividends: true,
        taxOptimization: false
      }
    }
  ],
  strategyTemplates: [
    {
      id: 1,
      name: "Пассивное инвестирование",
      description: "Низкозатратная стратегия инвестирования в индексные фонды",
      riskLevel: "low",
      expectedReturn: "6-8%",
      minimumInvestment: 1000,
      recommendation: "Подходит для начинающих инвесторов с долгосрочным горизонтом",
      allocation: [
        { name: "Мировые акции", percentage: 60, color: "#4f46e5" },
        { name: "Облигации", percentage: 35, color: "#10b981" },
        { name: "Денежный рынок", percentage: 5, color: "#f59e0b" }
      ]
    },
    {
      id: 2,
      name: "Дивидендный доход",
      description: "Фокус на акции с высокими дивидендами для регулярного дохода",
      riskLevel: "medium",
      expectedReturn: "7-9%",
      minimumInvestment: 3000,
      recommendation: "Подходит для инвесторов, ищущих стабильный пассивный доход",
      allocation: [
        { name: "Дивидендные акции", percentage: 70, color: "#4f46e5" },
        { name: "REIT", percentage: 15, color: "#8b5cf6" },
        { name: "Привилегированные акции", percentage: 10, color: "#10b981" },
        { name: "Облигации", percentage: 5, color: "#f59e0b" }
      ]
    },
    {
      id: 3,
      name: "Агрессивный рост",
      description: "Высокорисковая стратегия, нацеленная на максимальный рост капитала",
      riskLevel: "high",
      expectedReturn: "10-15%",
      minimumInvestment: 5000,
      recommendation: "Для опытных инвесторов с высокой толерантностью к риску",
      allocation: [
        { name: "Акции роста", percentage: 50, color: "#4f46e5" },
        { name: "Технологический сектор", percentage: 25, color: "#8b5cf6" },
        { name: "Развивающиеся рынки", percentage: 15, color: "#10b981" },
        { name: "Инновационные компании", percentage: 10, color: "#f59e0b" }
      ]
    }
  ],
  strategyPerformance: [
    { month: "Дек", value: 5000 },
    { month: "Янв", value: 5120 },
    { month: "Фев", value: 5280 },
    { month: "Мар", value: 5700 },
    { month: "Апр", value: 6200 },
    { month: "Май", value: 6640 }
  ],
  rebalanceHistory: [
    {
      id: 1,
      date: "15.03.2025",
      strategy: "Сбалансированный рост",
      changes: [
        { asset: "Акции США", from: 48.5, to: 45.0, action: "sell" },
        { asset: "Облигации", from: 26.8, to: 30.0, action: "buy" }
      ],
      trigger: "scheduled"
    },
    {
      id: 2,
      date: "22.02.2025",
      strategy: "Технологический фокус",
      changes: [
        { asset: "Технологические акции", from: 72.6, to: 65.0, action: "sell" },
        { asset: "Полупроводники", from: 14.3, to: 20.0, action: "buy" },
        { asset: "Финтех", from: 8.2, to: 10.0, action: "buy" }
      ],
      trigger: "drift-threshold"
    }
  ]
};

// Компонент для автоматизированных инвестиционных стратегий - Новая функция 6 для личного кабинета
export default function AutomatedStrategies() {
  const [activeTab, setActiveTab] = useState("active");
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  
  // Форматирование валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Получение цвета для уровня риска
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "high": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Получение текста для уровня риска
  const getRiskText = (riskLevel: string) => {
    switch(riskLevel) {
      case "low": return "Низкий риск";
      case "medium": return "Средний риск";
      case "high": return "Высокий риск";
      default: return "Неизвестный риск";
    }
  };
  
  // Получение роста в процентах
  const getGrowthPercentage = (initial: number, current: number) => {
    return (((current - initial) / initial) * 100).toFixed(1);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Автоматизированные стратегии</h2>
          <p className="text-muted-foreground">
            Настройте и управляйте автоматическими инвестиционными стратегиями
          </p>
        </div>
        <Button 
          onClick={() => setShowNewForm(!showNewForm)}
          className="gradient-bg text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {showNewForm ? "Отменить" : "Новая стратегия"}
        </Button>
      </div>
      
      {showNewForm && (
        <Card className="border-dashed border-2 border-primary/50">
          <CardHeader>
            <CardTitle>Создание новой автоматизированной стратегии</CardTitle>
            <CardDescription>
              Выберите шаблон или настройте собственную инвестиционную стратегию
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Выберите шаблон стратегии</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {strategiesData.strategyTemplates.map(template => (
                    <div 
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate === template.id ? "ring-2 ring-primary border-primary" : "hover:bg-muted/20"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline" className={getRiskColor(template.riskLevel)}>
                          {getRiskText(template.riskLevel)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Ожидаемая доходность:</span>
                        <span className="font-medium">{template.expectedReturn}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Минимальная инвестиция:</span>
                        <span className="font-medium">{formatCurrency(template.minimumInvestment)}</span>
                      </div>
                      
                      {selectedTemplate === template.id && (
                        <div className="mt-4 flex justify-end">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedTemplate && (
                <>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="strategy-name">Название стратегии</Label>
                      <Input 
                        id="strategy-name" 
                        placeholder="Например: Мой сбалансированный портфель" 
                        defaultValue={strategiesData.strategyTemplates.find(t => t.id === selectedTemplate)?.name || ""}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="initial-investment">Начальная инвестиция</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="initial-investment" 
                          type="number" 
                          defaultValue={strategiesData.strategyTemplates.find(t => t.id === selectedTemplate)?.minimumInvestment} 
                        />
                        <span>USD</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Распределение активов</Label>
                      <div className="space-y-2 mt-2">
                        {strategiesData.strategyTemplates
                          .find(t => t.id === selectedTemplate)?.allocation
                          .map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                              <div className="flex-1">{item.name}</div>
                              <div className="w-16">
                                <Input 
                                  type="number" 
                                  value={item.percentage} 
                                  min={0} 
                                  max={100}
                                  className="h-8 text-right"
                                />
                              </div>
                              <div className="w-4">%</div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    
                    <div>
                      <Label>Настройки ребалансировки</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor="rebalance-frequency" className="text-sm">Частота</Label>
                          <select 
                            id="rebalance-frequency" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            defaultValue="monthly"
                          >
                            <option value="weekly">Еженедельно</option>
                            <option value="monthly">Ежемесячно</option>
                            <option value="quarterly">Ежеквартально</option>
                            <option value="annually">Ежегодно</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="drift-threshold" className="text-sm">Порог дрейфа: 5%</Label>
                          </div>
                          <Slider
                            id="drift-threshold"
                            defaultValue={[5]}
                            max={10}
                            min={1}
                            step={1}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Дополнительные настройки</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="reinvest-dividends" className="cursor-pointer">
                            Реинвестировать дивиденды
                          </Label>
                          <Switch id="reinvest-dividends" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tax-optimization" className="cursor-pointer">
                            Налоговая оптимизация
                          </Label>
                          <Switch id="tax-optimization" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-deposit" className="cursor-pointer">
                            Регулярное пополнение
                          </Label>
                          <Switch id="auto-deposit" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowNewForm(false);
                setSelectedTemplate(null);
              }}
            >
              Отмена
            </Button>
            <Button 
              disabled={!selectedTemplate}
              onClick={() => {
                // Тут будет логика сохранения стратегии
                setShowNewForm(false);
              }}
            >
              Создать стратегию
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            <span>Активные стратегии</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Эффективность</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>История ребалансировок</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6 pt-4">
          {strategiesData.activeStrategies.map(strategy => (
            <Card key={strategy.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      {strategy.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {strategy.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={strategy.status === "active" ? "default" : "outline"}
                      className={strategy.status === "active" ? "bg-green-100 text-green-800 border-green-200" : ""}
                    >
                      {strategy.status === "active" ? "Активна" : "Приостановлена"}
                    </Badge>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Распределение активов</h4>
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-background flex flex-col items-center justify-center">
                          <div className="text-xs text-muted-foreground">Всего</div>
                          <div className="font-bold">100%</div>
                        </div>
                      </div>
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {strategy.allocation.map((item, index) => {
                          let startAngle = 0;
                          for (let i = 0; i < index; i++) {
                            startAngle += (strategy.allocation[i].percentage / 100) * 360;
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
                      {strategy.allocation.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-sm mr-2" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium mb-3">Производительность</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <div className="text-xs text-muted-foreground">За месяц</div>
                        <div className="text-lg font-bold text-green-600">+{strategy.performance.lastMonth}%</div>
                      </div>
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <div className="text-xs text-muted-foreground">За год</div>
                        <div className="text-lg font-bold text-green-600">+{strategy.performance.lastYear}%</div>
                      </div>
                      <div className="p-3 bg-muted/20 rounded-lg">
                        <div className="text-xs text-muted-foreground">Всего</div>
                        <div className="text-lg font-bold text-green-600">+{strategy.performance.since}%</div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Начальная инвестиция</span>
                        <span className="font-medium">{formatCurrency(strategy.initialInvestment)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm">Текущая стоимость</span>
                        <span className="font-medium text-green-600">{formatCurrency(strategy.currentValue)}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-medium">+{getGrowthPercentage(strategy.initialInvestment, strategy.currentValue)}%</span>
                        </div>
                        <Progress 
                          value={Math.min(100, (strategy.currentValue / (strategy.initialInvestment * 2)) * 100)} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Настройки стратегии</h4>
                    <div className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Repeat className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Частота ребалансировки</span>
                        </div>
                        <span className="text-sm font-medium">
                          {strategy.settings.rebalanceFrequency === "monthly" ? "Ежемесячно" : 
                           strategy.settings.rebalanceFrequency === "quarterly" ? "Ежеквартально" : 
                           strategy.settings.rebalanceFrequency === "annually" ? "Ежегодно" : "Еженедельно"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Sliders className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Порог дрейфа</span>
                        </div>
                        <span className="text-sm font-medium">{strategy.settings.driftThreshold}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <RefreshCw className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Следующая ребалансировка</span>
                        </div>
                        <span className="text-sm font-medium">{strategy.nextRebalance}</span>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <PieChart className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Реинвестирование дивидендов</span>
                        </div>
                        <div>
                          {strategy.settings.reinvestDividends ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              <span>Вкл</span>
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Выкл</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Calculator className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Налоговая оптимизация</span>
                        </div>
                        <div>
                          {strategy.settings.taxOptimization ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              <span>Вкл</span>
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Выкл</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4 gap-2">
                      <Button variant="outline" size="sm">
                        <Sliders className="h-4 w-4 mr-2" />
                        Настроить
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <PauseCircle className="h-4 w-4 mr-2" />
                        Приостановить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Совокупная эффективность</CardTitle>
              <CardDescription>
                Общая эффективность всех ваших автоматизированных стратегий
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 text-green-800 rounded-lg">
                  <div className="text-sm text-green-600 mb-1">Суммарная прибыль</div>
                  <div className="text-2xl font-bold">+$2,912</div>
                  <div className="text-sm mt-1">+36.4% от начальной инвестиции</div>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Активных стратегий</div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground mt-1">3 транзакций за последний месяц</div>
                </div>
                
                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Рост портфеля</div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold mr-2">$10,912</div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      +$2,912
                    </Badge>
                  </div>
                  <div className="text-sm mt-1">Начальные инвестиции: $8,000</div>
                </div>
              </div>
              
              <div className="h-72 mb-6">
                <div className="text-sm font-medium mb-2">Рост стоимости портфеля</div>
                <div className="h-64 w-full bg-muted/10 rounded-lg flex items-end p-4">
                  <div className="w-full h-full flex items-end space-x-2">
                    {strategiesData.strategyPerformance.map((item, index) => {
                      const initialValue = strategiesData.strategyPerformance[0].value;
                      const maxValue = Math.max(...strategiesData.strategyPerformance.map(p => p.value));
                      const minValue = Math.min(...strategiesData.strategyPerformance.map(p => p.value));
                      const range = maxValue - minValue;
                      const heightPercentage = ((item.value - minValue) / range) * 100;
                      
                      return (
                        <div 
                          key={index}
                          className="flex-1 flex flex-col items-center justify-end"
                        >
                          <div 
                            className={`w-full rounded-t-sm ${
                              item.value >= initialValue ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {item.month}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Лучшая стратегия</h4>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-green-100">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">Технологический фокус</div>
                        <div className="text-sm text-muted-foreground">С начала: +42.4%</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Рекомендации по оптимизации</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                      <div className="flex-1">
                        <div className="text-sm">Оптимизация налогов для "Сбалансированный рост"</div>
                        <div className="text-xs text-muted-foreground">Потенциальная экономия: $120</div>
                      </div>
                      <Button variant="outline" size="sm" className="h-7">
                        Применить
                      </Button>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
                      <div className="flex-1">
                        <div className="text-sm">Увеличение доли облигаций в "Сбалансированный рост"</div>
                        <div className="text-xs text-muted-foreground">Для лучшей диверсификации</div>
                      </div>
                      <Button variant="outline" size="sm" className="h-7">
                        Применить
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>История ребалансировок</CardTitle>
              <CardDescription>
                Записи о выполненных ребалансировках ваших стратегий
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategiesData.rebalanceHistory.map(rebalance => (
                  <div key={rebalance.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium">{rebalance.strategy}</div>
                        <div className="text-sm text-muted-foreground">Дата: {rebalance.date}</div>
                      </div>
                      <Badge variant="outline" className={
                        rebalance.trigger === "scheduled" 
                          ? "bg-blue-100 text-blue-800 border-blue-200" 
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }>
                        {rebalance.trigger === "scheduled" ? "Плановая" : "По дрейфу"}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Выполненные изменения:</div>
                      <div className="space-y-2">
                        {rebalance.changes.map((change, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className={`p-1 rounded-full ${
                                change.action === "buy" ? "bg-green-100" : "bg-amber-100"
                              }`}>
                                {change.action === "buy" ? (
                                  <ChevronUp className={`h-3 w-3 ${
                                    change.action === "buy" ? "text-green-600" : "text-amber-600"
                                  }`} />
                                ) : (
                                  <ChevronDown className={`h-3 w-3 ${
                                    change.action === "buy" ? "text-green-600" : "text-amber-600"
                                  }`} />
                                )}
                              </div>
                              <span className="text-sm ml-2">{change.asset}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground mr-2">{change.from.toFixed(1)}%</span>
                              <ArrowRight className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium ml-2">{change.to.toFixed(1)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-3">
                      <Button variant="outline" size="sm">
                        Подробный отчет
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline">
                Показать все записи
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                Безопасность автоматизированных стратегий
              </CardTitle>
              <CardDescription>
                Информация о системе безопасности автоматизированных инвестиций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <BadgeCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Защита от аномальных колебаний рынка</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Все автоматизированные стратегии имеют встроенную защиту от резких колебаний рынка. 
                      При обнаружении аномальной волатильности (более 7% в день) стратегия автоматически 
                      приостанавливается и уведомляет вас.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Мониторинг 24/7</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Наши системы непрерывно отслеживают состояние ваших стратегий и рыночные условия, 
                      обеспечивая своевременную реакцию на любые изменения даже в нерабочее время.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Защищенный доступ</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Все операции автоматизированных стратегий требуют подтверждения через защищенный 
                      канал и выполняются с использованием шифрования на уровне банков.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}