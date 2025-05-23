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
  Target,
  Plus,
  Calendar,
  CreditCard,
  Trophy,
  Car,
  Home,
  GraduationCap,
  Plane,
  PiggyBank,
  Edit,
  AlertTriangle,
  Check,
  Trash2
} from "lucide-react";

// Имитация данных для финансовых целей
const goalsData = [
  {
    id: 1,
    title: "Покупка автомобиля",
    targetAmount: 35000,
    currentAmount: 21500,
    deadline: "Декабрь 2025",
    monthlyContribution: 1250,
    projectedCompletion: "Ноябрь 2025",
    icon: "car",
    status: "on-track", // on-track, behind, ahead
    progress: 61
  },
  {
    id: 2,
    title: "Отпуск в Европе",
    targetAmount: 8500,
    currentAmount: 6200,
    deadline: "Июль 2025",
    monthlyContribution: 700,
    projectedCompletion: "Июнь 2025",
    icon: "travel",
    status: "ahead",
    progress: 73
  },
  {
    id: 3,
    title: "Первоначальный взнос за недвижимость",
    targetAmount: 75000,
    currentAmount: 27300,
    deadline: "Сентябрь 2026",
    monthlyContribution: 2200,
    projectedCompletion: "Октябрь 2026",
    icon: "house",
    status: "behind",
    progress: 36
  },
  {
    id: 4,
    title: "Фонд для образования",
    targetAmount: 30000,
    currentAmount: 5450,
    deadline: "Январь 2027",
    monthlyContribution: 850,
    projectedCompletion: "Январь 2027",
    icon: "education",
    status: "on-track",
    progress: 18
  }
];

// Компонент для инвестиционных целей - Новая функция 2 для личного кабинета
export default function InvestmentGoals() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: 10000,
    currentAmount: 0,
    monthlyContribution: 500,
    deadline: "",
    icon: "savings"
  });
  
  // Форматирование валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Получение иконки для цели
  const getGoalIcon = (iconType: string) => {
    switch(iconType) {
      case "car": return <Car className="h-5 w-5 text-blue-500" />;
      case "travel": return <Plane className="h-5 w-5 text-purple-500" />;
      case "house": return <Home className="h-5 w-5 text-green-500" />;
      case "education": return <GraduationCap className="h-5 w-5 text-amber-500" />;
      case "savings":
      default: return <PiggyBank className="h-5 w-5 text-indigo-500" />;
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
  
  // Получение иконки для статуса
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "ahead": return <Check className="h-4 w-4 text-green-600" />;
      case "behind": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };
  
  // Получение цвета для прогресса
  const getProgressColor = (status: string, progress: number) => {
    if (status === "ahead") return "bg-green-600";
    if (status === "behind") return "bg-red-600";
    if (progress > 75) return "bg-green-600";
    if (progress > 40) return "bg-blue-600";
    return "bg-amber-600";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Инвестиционные цели</h2>
          <p className="text-muted-foreground">
            Отслеживайте прогресс в достижении ваших финансовых целей
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="gradient-bg text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {showAddForm ? "Отменить" : "Добавить цель"}
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="border-dashed border-2 border-primary/50">
          <CardHeader>
            <CardTitle>Добавить новую цель</CardTitle>
            <CardDescription>
              Заполните форму для создания новой финансовой цели
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Название цели</label>
                <Input 
                  placeholder="Например: Новый автомобиль" 
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Иконка</label>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant={newGoal.icon === "savings" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setNewGoal({...newGoal, icon: "savings"})}
                  >
                    <PiggyBank className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant={newGoal.icon === "car" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setNewGoal({...newGoal, icon: "car"})}
                  >
                    <Car className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant={newGoal.icon === "house" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setNewGoal({...newGoal, icon: "house"})}
                  >
                    <Home className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant={newGoal.icon === "travel" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setNewGoal({...newGoal, icon: "travel"})}
                  >
                    <Plane className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant={newGoal.icon === "education" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setNewGoal({...newGoal, icon: "education"})}
                  >
                    <GraduationCap className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Целевая сумма: {formatCurrency(newGoal.targetAmount)}</label>
                <Slider
                  value={[newGoal.targetAmount]}
                  min={1000}
                  max={100000}
                  step={1000}
                  onValueChange={(value) => setNewGoal({...newGoal, targetAmount: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Уже накоплено: {formatCurrency(newGoal.currentAmount)}</label>
                <Slider
                  value={[newGoal.currentAmount]}
                  min={0}
                  max={newGoal.targetAmount}
                  step={500}
                  onValueChange={(value) => setNewGoal({...newGoal, currentAmount: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Ежемесячный взнос: {formatCurrency(newGoal.monthlyContribution)}</label>
                <Slider
                  value={[newGoal.monthlyContribution]}
                  min={100}
                  max={5000}
                  step={100}
                  onValueChange={(value) => setNewGoal({...newGoal, monthlyContribution: value[0]})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Срок достижения цели</label>
                <Input 
                  type="month" 
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={() => {
                // Тут будет логика сохранения цели
                setShowAddForm(false);
              }}
            >
              Сохранить цель
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goalsData.map(goal => (
          <Card key={goal.id} className="overflow-hidden">
            <div className={`h-1.5 w-full ${getProgressColor(goal.status, goal.progress)}`}></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    {getGoalIcon(goal.icon)}
                  </div>
                  <CardTitle>{goal.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(goal.status)}
                <span className={`text-sm ${getStatusColor(goal.status)}`}>
                  {getStatusText(goal.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/40 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Целевая сумма</div>
                  <div className="font-bold text-lg">{formatCurrency(goal.targetAmount)}</div>
                </div>
                <div className="bg-muted/40 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Накоплено</div>
                  <div className="font-bold text-lg">{formatCurrency(goal.currentAmount)}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Срок</span>
                  </div>
                  <span>{goal.deadline}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Ежемесячно</span>
                  </div>
                  <span>{formatCurrency(goal.monthlyContribution)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Ожидаемое завершение</span>
                  </div>
                  <span>{goal.projectedCompletion}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline" size="sm">
                Внести средства
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Рекомендации по достижению целей</CardTitle>
          <CardDescription>
            Оптимизируйте свои стратегии накопления для достижения финансовых целей
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Оптимизация фонда для образования</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Увеличьте ежемесячный взнос на 15% для достижения цели раньше срока. Это позволит сэкономить на возможном росте стоимости образования.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Переоценка цели по недвижимости</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Текущий темп накопления на первоначальный взнос за недвижимость отстает от графика. Рассмотрите возможность увеличения ежемесячного взноса или продления срока.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Перераспределение вложений</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Для цели "Отпуск в Европе" вы опережаете график. Рассмотрите возможность переноса части средств на отстающие цели.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}