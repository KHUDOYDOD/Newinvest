import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {
  Shield, AlertTriangle, TrendingUp, TrendingDown,
  BarChart2, PieChart, LineChart, Info, HelpCircle,
  Zap, BarChart, CheckCircle2, ArrowRight, ShieldCheck
} from "lucide-react";

// Пример данных для оценки рисков
const riskData = {
  riskProfile: {
    score: 67,
    level: "moderate", // conservative, moderate, aggressive
    description: "Умеренный профиль риска сочетает в себе стабильные и растущие активы, стремится к балансу между риском и доходностью.",
    recommendedAllocation: [
      { asset: "Акции", percentage: 55, color: "#4f46e5" },
      { asset: "Облигации", percentage: 35, color: "#10b981" },
      { asset: "Альтернативные инвестиции", percentage: 5, color: "#f59e0b" },
      { asset: "Денежные средства", percentage: 5, color: "#6b7280" }
    ]
  },
  currentPortfolioRisks: [
    {
      type: "market",
      level: "moderate",
      score: 65,
      description: "Риск снижения стоимости портфеля из-за общего падения рынка",
      recommendations: [
        "Увеличьте диверсификацию между классами активов",
        "Рассмотрите защитные активы"
      ]
    },
    {
      type: "volatility",
      level: "high",
      score: 78,
      description: "Волатильность вашего портфеля выше среднего из-за концентрации технологических активов",
      recommendations: [
        "Снизьте долю высоковолатильных активов",
        "Добавьте некоррелирующие инструменты"
      ]
    },
    {
      type: "liquidity",
      level: "low",
      score: 25,
      description: "Риск невозможности быстро продать активы без существенных потерь",
      recommendations: [
        "Поддерживайте текущий уровень ликвидных активов"
      ]
    },
    {
      type: "concentration",
      level: "high",
      score: 82,
      description: "Высокая концентрация портфеля в технологическом секторе (более 60%)",
      recommendations: [
        "Расширьте секторальную экспозицию",
        "Снизьте долю технологических компаний"
      ]
    }
  ],
  stressTests: [
    {
      scenario: "Рыночный спад -20%",
      impact: -14.5,
      description: "Симуляция падения рынка на 20%"
    },
    {
      scenario: "Рост процентных ставок +2%",
      impact: -8.3,
      description: "Эффект резкого повышения ставок на 2%"
    },
    {
      scenario: "Инфляция 10%",
      impact: -12.7,
      description: "Влияние высокой инфляции на ваш портфель"
    },
    {
      scenario: "Падение технологического сектора -30%",
      impact: -21.8,
      description: "Коррекция в технологическом секторе"
    }
  ],
  riskMetrics: {
    sharpeRatio: 1.25,
    volatility: 14.8,
    beta: 1.18,
    maxDrawdown: 22.4,
    var95: 9.2
  },
  riskToleranceQuestions: [
    {
      id: 1,
      question: "Как бы вы отреагировали на временное падение стоимости вашего портфеля на 20%?",
      options: [
        { text: "Немедленно продал бы большую часть инвестиций", score: 1 },
        { text: "Продал бы часть инвестиций для снижения риска", score: 2 },
        { text: "Не предпринимал бы никаких действий", score: 3 },
        { text: "Увеличил бы инвестиции, воспользовавшись снижением цен", score: 4 }
      ],
      answeredScore: 3
    },
    {
      id: 2,
      question: "Какой из следующих сценариев вам ближе?",
      options: [
        { text: "Низкий, но стабильный доход без риска", score: 1 },
        { text: "Умеренный доход с низким риском", score: 2 },
        { text: "Высокий доход с умеренным риском", score: 3 },
        { text: "Максимальный доход с высоким риском", score: 4 }
      ],
      answeredScore: 3
    },
    {
      id: 3,
      question: "Сколько времени вы планируете инвестировать до использования средств?",
      options: [
        { text: "Менее 3 лет", score: 1 },
        { text: "3-5 лет", score: 2 },
        { text: "5-10 лет", score: 3 },
        { text: "Более 10 лет", score: 4 }
      ],
      answeredScore: 4
    }
  ]
};

// Компонент для оценки рисков - Новая функция 8 для личного кабинета
export default function RiskAssessment() {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Получение цвета для уровня риска
  const getRiskLevelColor = (level: string) => {
    switch(level) {
      case "low": return "bg-green-100 text-green-800 border-green-200";
      case "moderate": return "bg-amber-100 text-amber-800 border-amber-200";
      case "high": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Получение текста для уровня риска
  const getRiskLevelText = (level: string) => {
    switch(level) {
      case "low": return "Низкий";
      case "moderate": return "Умеренный";
      case "high": return "Высокий";
      default: return "Неизвестный";
    }
  };
  
  // Получение иконки для типа риска
  const getRiskTypeIcon = (type: string) => {
    switch(type) {
      case "market": return <TrendingDown className="h-5 w-5 text-red-500" />;
      case "volatility": return <BarChart2 className="h-5 w-5 text-purple-500" />;
      case "liquidity": return <Zap className="h-5 w-5 text-blue-500" />;
      case "concentration": return <PieChart className="h-5 w-5 text-amber-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Форматирование процентов
  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value}%`;
  };
  
  // Получение цвета для значения импакта
  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-600";
    if (impact < -15) return "text-red-600";
    return "text-amber-600";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Оценка рисков</h2>
          <p className="text-muted-foreground">
            Анализ и управление рисками вашего инвестиционного портфеля
          </p>
        </div>
        <Button className="gradient-bg text-white">
          <Shield className="mr-2 h-4 w-4" />
          Пройти полную оценку рисков
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Профиль риска
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {riskData.riskProfile.level === "conservative" ? "Консервативный" :
               riskData.riskProfile.level === "moderate" ? "Умеренный" : "Агрессивный"}
              <Badge variant="outline" className={getRiskLevelColor(riskData.riskProfile.level)}>
                {riskData.riskProfile.score}/100
              </Badge>
            </div>
            <div className="mt-2">
              <Progress 
                value={riskData.riskProfile.score} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Волатильность портфеля
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {riskData.riskMetrics.volatility}%
              <Badge 
                variant="outline" 
                className={
                  riskData.riskMetrics.volatility > 15 
                    ? "bg-red-100 text-red-800" 
                    : "bg-amber-100 text-amber-800"
                }
              >
                {riskData.riskMetrics.volatility > 15 ? "Высокая" : "Средняя"}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Годовое стандартное отклонение
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Максимальное падение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -{riskData.riskMetrics.maxDrawdown}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Исторический максимум падения стоимости
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
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Профиль риска</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Риски портфеля</span>
          </TabsTrigger>
          <TabsTrigger value="stress" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Стресс-тесты</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Метрики рисков</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ваш профиль риска</CardTitle>
              <CardDescription>
                Оценка вашей толерантности к риску и рекомендуемое распределение активов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg mb-6">
                <h4 className="font-medium mb-2">Описание профиля</h4>
                <p className="text-muted-foreground">
                  {riskData.riskProfile.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Рекомендуемое распределение активов</h4>
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-background flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">Всего</div>
                        <div className="font-bold">100%</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {riskData.riskProfile.recommendedAllocation.map((item, index) => {
                        let startAngle = 0;
                        for (let i = 0; i < index; i++) {
                          startAngle += (riskData.riskProfile.recommendedAllocation[i].percentage / 100) * 360;
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
                    {riskData.riskProfile.recommendedAllocation.map((item, index) => (
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
                  <h4 className="font-medium mb-4">Тест на толерантность к риску</h4>
                  <div className="space-y-6">
                    {riskData.riskToleranceQuestions.map((q) => (
                      <div key={q.id} className="space-y-2">
                        <p className="font-medium">{q.id}. {q.question}</p>
                        <div className="space-y-1 pl-4">
                          {q.options.map((option, index) => (
                            <div 
                              key={index} 
                              className={`flex items-center py-1 ${
                                option.score === q.answeredScore 
                                  ? "text-primary font-medium" 
                                  : "text-muted-foreground"
                              }`}
                            >
                              {option.score === q.answeredScore ? (
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                              ) : (
                                <div className="w-4 h-4 mr-2"></div>
                              )}
                              <span className="text-sm">{option.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm">
                      Пройти тест заново
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Сопоставление с целями</CardTitle>
              <CardDescription>
                Анализ соответствия вашего профиля риска и финансовых целей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Ваш профиль риска соответствует большинству ваших целей</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Умеренный профиль риска хорошо подходит для ваших долгосрочных целей по покупке недвижимости и пенсионным накоплениям. 
                      Однако для краткосрочной цели "Отпуск в Европе" рекомендуется более консервативный подход.
                    </p>
                    <Button size="sm" className="mt-2">
                      Адаптировать риск для краткосрочных целей
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Риски вашего портфеля</CardTitle>
              <CardDescription>
                Детальный анализ основных рисков вашего текущего инвестиционного портфеля
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskData.currentPortfolioRisks.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-full ${
                          risk.level === "high" ? "bg-red-100" :
                          risk.level === "moderate" ? "bg-amber-100" : "bg-green-100"
                        }`}>
                          {getRiskTypeIcon(risk.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{
                            risk.type === "market" ? "Рыночный риск" :
                            risk.type === "volatility" ? "Риск волатильности" :
                            risk.type === "liquidity" ? "Риск ликвидности" :
                            risk.type === "concentration" ? "Риск концентрации" : "Другой риск"
                          }</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {risk.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getRiskLevelColor(risk.level)}>
                        {getRiskLevelText(risk.level)} ({risk.score}/100)
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <Progress 
                        value={risk.score} 
                        className="h-2" 
                      />
                    </div>
                    
                    {risk.recommendations && risk.recommendations.length > 0 && (
                      <div className="mt-4 pt-3 border-t">
                        <h5 className="text-sm font-medium mb-2">Рекомендации:</h5>
                        <ul className="space-y-1">
                          {risk.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Управление рисками</CardTitle>
              <CardDescription>
                Методы снижения рисков и улучшения профиля доходность/риск
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Диверсификация</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Распределение инвестиций между различными классами активов для снижения общего риска
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Хеджирование</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Использование инструментов для защиты портфеля от неблагоприятных изменений рынка
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">Ребалансировка</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Регулярная корректировка портфеля для поддержания целевого распределения активов
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Применить меры по снижению рисков
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stress" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Стресс-тесты портфеля</CardTitle>
              <CardDescription>
                Симуляция воздействия различных негативных сценариев на ваш портфель
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskData.stressTests.map((test, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-red-100">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{test.scenario}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {test.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Влияние на портфель:</span>
                      <span className={`font-bold text-xl ${getImpactColor(test.impact)}`}>
                        {formatPercent(test.impact)}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            test.impact > -10 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(100, Math.abs(test.impact) * 5)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border rounded-lg mt-6 bg-amber-50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-700">Повышенная уязвимость к технологическому сектору</h4>
                    <p className="text-sm text-amber-600 mt-1">
                      Ваш портфель показывает высокую чувствительность к падению технологического сектора.
                      Потенциальное падение стоимости портфеля на 21.8% при 30% коррекции сектора указывает на 
                      повышенную концентрацию в этой области.
                    </p>
                    <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700">
                      Снизить концентрацию
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Исторические сценарии</CardTitle>
              <CardDescription>
                Моделирование поведения вашего портфеля в исторические периоды кризисов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span>Финансовый кризис 2008-2009</span>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800">-32.5%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span>Кризис доткомов 2000-2002</span>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800">-28.3%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span>Пандемия COVID-19 2020</span>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800">-22.9%</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="h-4 w-4 text-amber-500" />
                    <span>Обвал рынка 2018</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">-14.7%</Badge>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">
                  Просмотреть детальный отчет
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ключевые метрики риска</CardTitle>
              <CardDescription>
                Количественные показатели для оценки риска вашего портфеля
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Коэффициент Шарпа</h4>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </div>
                  <div className="text-2xl font-bold">{riskData.riskMetrics.sharpeRatio}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Отношение доходности к волатильности. Выше 1.0 считается хорошим показателем.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Бета</h4>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </div>
                  <div className="text-2xl font-bold">{riskData.riskMetrics.beta}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Мера чувствительности к рыночным движениям. Бета больше 1 означает более высокую волатильность, чем рынок.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Value at Risk (95%)</h4>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">-{riskData.riskMetrics.var95}%</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Максимальная ожидаемая потеря за день с вероятностью 95%.
                  </p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg mt-6">
                <h4 className="font-medium mb-3">Сравнение с рынком</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">Метрика</th>
                        <th className="text-right py-2 px-4 font-medium">Ваш портфель</th>
                        <th className="text-right py-2 px-4 font-medium">Рынок (S&P 500)</th>
                        <th className="text-right py-2 px-4 font-medium">Отклонение</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">Волатильность</td>
                        <td className="py-2 px-4 text-right">{riskData.riskMetrics.volatility}%</td>
                        <td className="py-2 px-4 text-right">13.2%</td>
                        <td className="py-2 px-4 text-right text-red-600">+12.1%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Бета</td>
                        <td className="py-2 px-4 text-right">{riskData.riskMetrics.beta}</td>
                        <td className="py-2 px-4 text-right">1.00</td>
                        <td className="py-2 px-4 text-right text-red-600">+18.0%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Коэф. Шарпа</td>
                        <td className="py-2 px-4 text-right">{riskData.riskMetrics.sharpeRatio}</td>
                        <td className="py-2 px-4 text-right">1.10</td>
                        <td className="py-2 px-4 text-right text-green-600">+13.6%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Макс. падение</td>
                        <td className="py-2 px-4 text-right">{riskData.riskMetrics.maxDrawdown}%</td>
                        <td className="py-2 px-4 text-right">19.6%</td>
                        <td className="py-2 px-4 text-right text-red-600">+14.3%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg mt-6 bg-primary/5">
                <h4 className="font-medium mb-3">Интерпретация</h4>
                <p className="text-sm text-muted-foreground">
                  Ваш портфель демонстрирует более высокую волатильность и риск по сравнению с рынком, 
                  но также показывает более высокий коэффициент Шарпа, что указывает на лучшую доходность с учетом риска. 
                  Ваш инвестиционный портфель имеет агрессивный профиль и может сильнее реагировать на движения рынка.
                </p>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Хорошая доходность с учетом риска</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span className="text-sm">Высокая чувствительность к рынку</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="text-sm">Потенциал для высокой доходности</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span className="text-sm">Высокий риск падения</span>
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