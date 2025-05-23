import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {
  Home, Briefcase, Plane, GraduationCap, Heart,
  Target, Plus, Edit, Trash2, Calendar, TrendingUp,
  ArrowRight, ChevronDown, Calculator, AlertCircle,
  DollarSign, CreditCard, Clock, AlertTriangle
} from "lucide-react";

// Пример данных для финансового планирования
const planningData = {
  financialGoals: [
    {
      id: 1,
      name: "Покупка недвижимости",
      type: "property",
      target: 75000,
      saved: 27500,
      targetDate: "2028-05-01",
      monthlyContribution: 1200,
      estimatedCompletion: "Апрель 2028",
      status: "on-track", // on-track, behind, ahead
      progress: 36.7
    },
    {
      id: 2,
      name: "Образование детей",
      type: "education",
      target: 45000,
      saved: 8500,
      targetDate: "2030-09-01",
      monthlyContribution: 850,
      estimatedCompletion: "Август 2030",
      status: "on-track",
      progress: 18.9
    },
    {
      id: 3,
      name: "Пенсионный фонд",
      type: "retirement",
      target: 500000,
      saved: 120000,
      targetDate: "2045-01-01",
      monthlyContribution: 1500,
      estimatedCompletion: "Декабрь 2044",
      status: "ahead",
      progress: 24.0
    },
    {
      id: 4,
      name: "Отпуск в Европе",
      type: "travel",
      target: 8000,
      saved: 3200,
      targetDate: "2026-06-15",
      monthlyContribution: 400,
      estimatedCompletion: "Май 2026",
      status: "behind",
      progress: 40.0
    }
  ],
  budgetCategories: [
    {
      name: "Жилье",
      planned: 1500,
      actual: 1450,
      percentage: 30
    },
    {
      name: "Питание",
      planned: 800,
      actual: 920,
      percentage: 16
    },
    {
      name: "Транспорт",
      planned: 500,
      actual: 480,
      percentage: 10
    },
    {
      name: "Развлечения",
      planned: 400,
      actual: 520,
      percentage: 8
    },
    {
      name: "Сбережения",
      planned: 1000,
      actual: 1000,
      percentage: 20
    },
    {
      name: "Прочее",
      planned: 800,
      actual: 750,
      percentage: 16
    }
  ],
  lastMonthIncomeExpense: {
    income: 5000,
    expenses: 4120,
    savings: 880,
    savingsRate: 17.6
  },
  cashFlowForecast: [
    { month: "Июнь 2025", income: 5000, expenses: 4120, savings: 880 },
    { month: "Июль 2025", income: 5000, expenses: 4300, savings: 700 },
    { month: "Август 2025", income: 5300, expenses: 4200, savings: 1100 },
    { month: "Сентябрь 2025", income: 5000, expenses: 4500, savings: 500 },
    { month: "Октябрь 2025", income: 5000, expenses: 4250, savings: 750 },
    { month: "Ноябрь 2025", income: 5500, expenses: 4300, savings: 1200 }
  ],
  financialChecklist: [
    { id: 1, name: "Создать резервный фонд", completed: true },
    { id: 2, name: "Оформить страхование жизни", completed: true },
    { id: 3, name: "Составить завещание", completed: false },
    { id: 4, name: "Диверсифицировать инвестиции", completed: true },
    { id: 5, name: "Оптимизировать налоги", completed: false },
    { id: 6, name: "Создать пассивный доход", completed: false }
  ]
};

// Компонент для финансового планирования - Новая функция 7 для личного кабинета
export default function FinancialPlanning() {
  const [activeTab, setActiveTab] = useState("goals");
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  
  // Форматирование валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Получение иконки для типа цели
  const getGoalIcon = (type: string) => {
    switch(type) {
      case "property": return <Home className="h-5 w-5 text-blue-600" />;
      case "education": return <GraduationCap className="h-5 w-5 text-purple-600" />;
      case "retirement": return <Briefcase className="h-5 w-5 text-green-600" />;
      case "travel": return <Plane className="h-5 w-5 text-amber-600" />;
      case "health": return <Heart className="h-5 w-5 text-red-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };
  
  // Получение цвета для статуса
  const getStatusColor = (status: string) => {
    switch(status) {
      case "ahead": return "text-green-600";
      case "behind": return "text-red-600";
      default: return "text-blue-600";
    }
  };
  
  // Получение текста для статуса
  const getStatusText = (status: string) => {
    switch(status) {
      case "ahead": return "Опережает график";
      case "behind": return "Отстает от графика";
      default: return "По графику";
    }
  };
  
  // Расчет оставшегося количества дней до цели
  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Преобразование дней в читаемый формат
  const formatDaysRemaining = (days: number) => {
    if (days < 0) return "Просрочено";
    
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    
    if (years > 0) {
      return `${years} г. ${months} мес.`;
    } else if (months > 0) {
      return `${months} мес.`;
    } else {
      return `${days} дн.`;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Финансовое планирование</h2>
          <p className="text-muted-foreground">
            Управляйте своими финансовыми целями и бюджетом
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setActiveTab("budget")}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Бюджет
          </Button>
          <Button 
            className="gradient-bg text-white"
            onClick={() => setShowAddGoalForm(!showAddGoalForm)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {showAddGoalForm ? "Отменить" : "Новая цель"}
          </Button>
        </div>
      </div>
      
      {showAddGoalForm && (
        <Card className="border-dashed border-2 border-primary/50">
          <CardHeader>
            <CardTitle>Добавить новую финансовую цель</CardTitle>
            <CardDescription>
              Определите свою следующую финансовую цель и план ее достижения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название цели</label>
                <Input placeholder="Например: Покупка автомобиля" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Тип цели</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="property">Недвижимость</option>
                  <option value="education">Образование</option>
                  <option value="retirement">Пенсия</option>
                  <option value="travel">Путешествие</option>
                  <option value="health">Здоровье</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Целевая сумма</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="0" />
                  <span>USD</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Уже накоплено</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="0" />
                  <span>USD</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Ежемесячный взнос</label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="0" />
                  <span>USD</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Целевая дата</label>
                <Input type="date" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddGoalForm(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={() => {
                // Логика сохранения цели
                setShowAddGoalForm(false);
              }}
            >
              Сохранить цель
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
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Финансовые цели</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Бюджет</span>
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Денежный поток</span>
          </TabsTrigger>
          <TabsTrigger value="checklist" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Финансовый чек-лист</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planningData.financialGoals.map(goal => (
              <Card key={goal.id}>
                <div className={`h-1 w-full ${
                  goal.status === "ahead" ? "bg-green-500" :
                  goal.status === "behind" ? "bg-red-500" : "bg-blue-500"
                }`}></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        {getGoalIcon(goal.type)}
                      </div>
                      <CardTitle>{goal.name}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className={`text-sm ${getStatusColor(goal.status)}`}>
                    {getStatusText(goal.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-medium">{goal.progress.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={goal.progress} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Цель</p>
                      <p className="font-medium">{formatCurrency(goal.target)}</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs text-muted-foreground">Накоплено</p>
                      <p className="font-medium">{formatCurrency(goal.saved)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">Целевая дата</span>
                      </div>
                      <span>{new Date(goal.targetDate).toLocaleDateString("ru-RU")}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">Осталось</span>
                      </div>
                      <span>{formatDaysRemaining(getDaysRemaining(goal.targetDate))}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">Ежемесячно</span>
                      </div>
                      <span>{formatCurrency(goal.monthlyContribution)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-muted-foreground">Ожидаемое завершение</span>
                      </div>
                      <span>{goal.estimatedCompletion}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Внести средства
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Рекомендации финансового планирования</CardTitle>
              <CardDescription>
                Советы для более эффективного достижения ваших финансовых целей
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Оптимизация цели "Отпуск в Европе"</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Ваша цель "Отпуск в Европе" отстает от графика. Увеличьте ежемесячный взнос на $100, 
                      чтобы достичь цель вовремя, или рассмотрите возможность переноса даты.
                    </p>
                    <Button size="sm" className="mt-2">
                      Оптимизировать
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Calculator className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Сбалансируйте свои цели</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Текущие ежемесячные взносы по всем целям составляют $3,950. Это 79% от вашего 
                      ежемесячного дохода. Рекомендуется выделять не более 50-60% дохода на долгосрочные цели.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Добавьте цель "Резервный фонд"</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Важно иметь резервный фонд, покрывающий 3-6 месяцев расходов. Это поможет 
                      избежать финансовых трудностей при непредвиденных обстоятельствах.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Добавить цель
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Распределение бюджета</CardTitle>
                <CardDescription>
                  Текущее распределение вашего ежемесячного бюджета
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {planningData.budgetCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {category.percentage}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${
                            category.actual > category.planned ? "text-red-600" : 
                            category.actual < category.planned ? "text-green-600" : ""
                          }`}>
                            {formatCurrency(category.actual)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            из {formatCurrency(category.planned)}
                          </span>
                        </div>
                      </div>
                      <div className="relative h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div 
                          className={`absolute top-0 left-0 h-full rounded-full ${
                            category.actual > category.planned 
                              ? "bg-red-500" 
                              : "bg-primary"
                          }`}
                          style={{ 
                            width: `${Math.min(100, (category.actual / category.planned) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Общий обзор расходов</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Запланировано</div>
                      <div className="text-xl font-bold">
                        {formatCurrency(planningData.budgetCategories.reduce((sum, cat) => sum + cat.planned, 0))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Фактически</div>
                      <div className="text-xl font-bold">
                        {formatCurrency(planningData.budgetCategories.reduce((sum, cat) => sum + cat.actual, 0))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Разница</div>
                      <div className={`text-xl font-bold ${
                        planningData.budgetCategories.reduce((sum, cat) => sum + cat.planned, 0) >=
                        planningData.budgetCategories.reduce((sum, cat) => sum + cat.actual, 0)
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        {formatCurrency(
                          planningData.budgetCategories.reduce((sum, cat) => sum + cat.planned, 0) -
                          planningData.budgetCategories.reduce((sum, cat) => sum + cat.actual, 0)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button>
                    Настроить бюджет
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Доходы и расходы</CardTitle>
                <CardDescription>
                  Баланс доходов и расходов за последний месяц
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Доход</span>
                    <span className="font-medium">{formatCurrency(planningData.lastMonthIncomeExpense.income)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Расходы</span>
                    <span className="font-medium">{formatCurrency(planningData.lastMonthIncomeExpense.expenses)}</span>
                  </div>
                  <div className="h-px w-full bg-border"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Сбережения</span>
                    <span className="font-bold text-green-600">{formatCurrency(planningData.lastMonthIncomeExpense.savings)}</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Норма сбережений</div>
                    <div className="text-2xl font-bold">{planningData.lastMonthIncomeExpense.savingsRate}%</div>
                    <div className="w-full h-4 bg-muted rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${planningData.lastMonthIncomeExpense.savingsRate}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Рекомендуемая норма: 20-30%
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Рекомендации</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <p className="text-sm">
                        Превышение бюджета на питание и развлечения. Рассмотрите возможность оптимизации.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <p className="text-sm">
                        Увеличьте норму сбережений для достижения финансовых целей быстрее.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cashflow" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Прогноз денежного потока</CardTitle>
              <CardDescription>
                Прогнозирование доходов и расходов на ближайшие 6 месяцев
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Месяц</th>
                      <th className="text-right py-3 px-4 font-medium">Доходы</th>
                      <th className="text-right py-3 px-4 font-medium">Расходы</th>
                      <th className="text-right py-3 px-4 font-medium">Сбережения</th>
                      <th className="text-right py-3 px-4 font-medium">Норма сбережений</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planningData.cashFlowForecast.map((month, index) => (
                      <tr key={index} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-4">{month.month}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(month.income)}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(month.expenses)}</td>
                        <td className="py-3 px-4 text-right font-medium text-green-600">
                          {formatCurrency(month.savings)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge 
                            variant="outline" 
                            className={`${
                              (month.savings / month.income) * 100 >= 20 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {((month.savings / month.income) * 100).toFixed(1)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 border rounded-lg bg-blue-50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Возможность оптимизации</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Анализ показывает, что вы можете увеличить ежемесячные сбережения 
                      на $400-$600 за счет оптимизации расходов на развлечения и питание вне дома.
                    </p>
                    <Button size="sm" className="mt-2">
                      Создать план оптимизации
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Денежный поток и финансовые цели</CardTitle>
              <CardDescription>
                Анализ достаточности денежного потока для достижения ваших финансовых целей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Общие ежемесячные сбережения</h4>
                    <p className="text-sm text-muted-foreground mt-1">Среднее за 6 месяцев</p>
                  </div>
                  <div className="text-xl font-bold text-green-600">$855</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Необходимые ежемесячные взносы</h4>
                    <p className="text-sm text-muted-foreground mt-1">По всем финансовым целям</p>
                  </div>
                  <div className="text-xl font-bold">${
                    planningData.financialGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)
                  }</div>
                </div>
                
                <div className="h-px w-full bg-border"></div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Разница</h4>
                    <p className="text-sm text-muted-foreground mt-1">Дефицит/избыток</p>
                  </div>
                  <div className="text-xl font-bold text-red-600">-$3,095</div>
                </div>
                
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-700">Предупреждение о дефиците</h4>
                      <p className="text-sm text-red-600 mt-1">
                        Ваши текущие взносы по финансовым целям ($3,950) превышают средние 
                        ежемесячные сбережения ($855). Это может привести к невозможности достижения 
                        всех ваших финансовых целей в установленные сроки.
                      </p>
                      <Button variant="destructive" size="sm" className="mt-2">
                        Пересмотреть цели
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checklist" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Финансовый чек-лист</CardTitle>
              <CardDescription>
                Основные шаги для укрепления вашего финансового положения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planningData.financialChecklist.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/10 transition-colors">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.completed 
                        ? "bg-green-100 text-green-700 border border-green-300" 
                        : "bg-amber-100 text-amber-700 border border-amber-300"
                    }`}>
                      {item.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${item.completed ? "text-muted-foreground" : ""}`}>
                        {item.name}
                      </div>
                    </div>
                    {!item.completed && (
                      <Button variant="outline" size="sm">
                        Выполнить
                      </Button>
                    )}
                  </div>
                ))}
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Прогресс финансового благополучия</h4>
                    <Badge variant="outline">
                      {Math.round((planningData.financialChecklist.filter(i => i.completed).length / planningData.financialChecklist.length) * 100)}%
                    </Badge>
                  </div>
                  <Progress 
                    value={
                      (planningData.financialChecklist.filter(i => i.completed).length / planningData.financialChecklist.length) * 100
                    } 
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    Выполнение всех пунктов чек-листа поможет построить крепкий финансовый фундамент и
                    более эффективно достигать ваших финансовых целей.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Начать финансовый план с консультантом
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Полезные ресурсы</CardTitle>
              <CardDescription>
                Образовательные материалы для повышения финансовой грамотности
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <BookIcon className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Основы личных финансов</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Узнайте о базовых принципах управления личными финансами, 
                    бюджетировании и построении финансовой безопасности.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Читать статью
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Инвестиционные стратегии</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Подробное руководство по различным инвестиционным стратегиям 
                    и их применению в зависимости от ваших финансовых целей.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Открыть руководство
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Видеокурс по планированию</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Серия видеоуроков по эффективному финансовому планированию 
                    и достижению долгосрочных финансовых целей.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Смотреть курс
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Финансовое сообщество</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Присоединяйтесь к сообществу единомышленников для обмена опытом, 
                    советами и стратегиями по достижению финансовых целей.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Присоединиться
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Экспорт компонента иконки книги, используемого в компоненте
const BookIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
};

// Экспорт компонента иконки пользователей, используемого в компоненте
const Users = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
};

// Экспорт компонента иконки видео, используемого в компоненте
const Video = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  );
};