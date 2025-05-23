import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  BarChart, LineChart, PieChart, User, UserPlus, UserMinus,
  Calendar, Download, Filter, Search, Clock, ArrowUpRight,
  ArrowDownRight, CircleDollarSign, TrendingUp
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  Legend
} from "recharts";

// Пример данных для аналитики пользователей
const userAnalyticsData = {
  userSummary: {
    totalUsers: 1285,
    activeUsers: 964,
    newUsersToday: 37,
    newUsersThisWeek: 154,
    verifiedUsers: 1102,
    percentageGrowth: 8.4,
    retentionRate: 76.5
  },
  userActivity: [
    { date: "01.05", active: 752, new: 21, churn: 5 },
    { date: "02.05", active: 768, new: 24, churn: 8 },
    { date: "03.05", active: 784, new: 27, churn: 11 },
    { date: "04.05", active: 800, new: 24, churn: 8 },
    { date: "05.05", active: 816, new: 20, churn: 4 },
    { date: "06.05", active: 832, new: 23, churn: 7 },
    { date: "07.05", active: 847, new: 22, churn: 7 },
    { date: "08.05", active: 862, new: 25, churn: 10 },
    { date: "09.05", active: 877, new: 23, churn: 8 },
    { date: "10.05", active: 892, new: 27, churn: 12 },
    { date: "11.05", active: 907, new: 28, churn: 13 },
    { date: "12.05", active: 922, new: 29, churn: 14 },
    { date: "13.05", active: 937, new: 30, churn: 15 },
    { date: "14.05", active: 952, new: 26, churn: 11 },
    { date: "15.05", active: 964, new: 37, churn: 25 }
  ],
  userRetention: [
    { cohort: "Апрель 2025", week1: 100, week2: 87, week3: 76, week4: 68, week5: 65, week6: 62, week7: 60, week8: 58 },
    { cohort: "Март 2025", week1: 100, week2: 85, week3: 73, week4: 65, week5: 60, week6: 58, week7: 55, week8: 54 },
    { cohort: "Февраль 2025", week1: 100, week2: 83, week3: 70, week4: 61, week5: 58, week6: 55, week7: 52, week8: 50 },
    { cohort: "Январь 2025", week1: 100, week2: 80, week3: 68, week4: 60, week5: 55, week6: 52, week7: 48, week8: 45 },
    { cohort: "Декабрь 2024", week1: 100, week2: 78, week3: 65, week4: 55, week5: 50, week6: 48, week7: 45, week8: 42 }
  ],
  userSegments: [
    { segment: "Активные инвесторы", count: 426, percentage: 33.2, growth: 12.3 },
    { segment: "Умеренные пользователи", count: 538, percentage: 41.9, growth: 7.6 },
    { segment: "Неактивные пользователи", count: 205, percentage: 15.9, growth: -3.5 },
    { segment: "Новые пользователи", count: 116, percentage: 9.0, growth: 14.8 }
  ],
  userDemographics: {
    countries: [
      { name: "Россия", value: 642, percentage: 50 },
      { name: "Казахстан", value: 192, percentage: 15 },
      { name: "Беларусь", value: 154, percentage: 12 },
      { name: "Украина", value: 115, percentage: 9 },
      { name: "Другие СНГ", value: 64, percentage: 5 },
      { name: "Другие страны", value: 116, percentage: 9 }
    ],
    age: [
      { range: "18-24", count: 154, percentage: 12 },
      { range: "25-34", count: 500, percentage: 39 },
      { range: "35-44", count: 321, percentage: 25 },
      { range: "45-54", count: 192, percentage: 15 },
      { range: "55+", count: 116, percentage: 9 }
    ],
    devices: [
      { type: "Desktop", count: 642, percentage: 50 },
      { type: "Mobile", count: 514, percentage: 40 },
      { type: "Tablet", count: 128, percentage: 10 }
    ]
  },
  trafficSources: [
    { source: "Прямой заход", users: 385, percentage: 30 },
    { source: "Поисковые системы", users: 257, percentage: 20 },
    { source: "Социальные сети", users: 192, percentage: 15 },
    { source: "Реферальная программа", users: 154, percentage: 12 },
    { source: "Email-маркетинг", users: 128, percentage: 10 },
    { source: "Партнерские программы", users: 77, percentage: 6 },
    { source: "Другие источники", users: 90, percentage: 7 }
  ],
  depositStatistics: {
    totalDeposits: 3852,
    totalAmount: 7620450,
    averageDeposit: 1978.83,
    depositDistribution: [
      { range: "до $100", count: 578, percentage: 15 },
      { range: "$100-$500", count: 1156, percentage: 30 },
      { range: "$500-$1,000", count: 770, percentage: 20 },
      { range: "$1,000-$5,000", count: 962, percentage: 25 },
      { range: "$5,000-$10,000", count: 192, percentage: 5 },
      { range: "более $10,000", count: 192, percentage: 5 }
    ],
    depositsByDay: [
      { date: "01.05", count: 235, amount: 465420 },
      { date: "02.05", count: 248, amount: 489760 },
      { date: "03.05", count: 262, amount: 518140 },
      { date: "04.05", count: 251, amount: 494970 },
      { date: "05.05", count: 239, amount: 472530 },
      { date: "06.05", count: 255, amount: 504900 },
      { date: "07.05", count: 268, amount: 530640 }
    ]
  }
};

// Компонент аналитики пользователей
export default function UserAnalytics() {
  const [dateRange, setDateRange] = useState<string>("last30days");
  const [filterSegment, setFilterSegment] = useState<string>("all");
  
  // Форматирование чисел
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };
  
  // Форматирование валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Получение цвета для процентного изменения
  const getChangeColor = (value: number) => {
    return value >= 0 ? "text-green-600" : "text-red-600";
  };
  
  // Получение иконки для процентного изменения
  const getChangeIcon = (value: number) => {
    return value >= 0 ? (
      <ArrowUpRight className="h-4 w-4" />
    ) : (
      <ArrowDownRight className="h-4 w-4" />
    );
  };
  
  // Цвета для графиков
  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Аналитика пользователей</h2>
          <p className="text-muted-foreground">
            Статистика и метрики по пользователям платформы
          </p>
        </div>
        <div className="flex gap-2">
          <Select
            value={dateRange}
            onValueChange={setDateRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Последние 7 дней</SelectItem>
              <SelectItem value="last30days">Последние 30 дней</SelectItem>
              <SelectItem value="last90days">Последние 90 дней</SelectItem>
              <SelectItem value="thisYear">Этот год</SelectItem>
              <SelectItem value="allTime">Все время</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Всего пользователей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(userAnalyticsData.userSummary.totalUsers)}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className={`flex items-center ${getChangeColor(userAnalyticsData.userSummary.percentageGrowth)}`}>
                {getChangeIcon(userAnalyticsData.userSummary.percentageGrowth)}
                <span className="text-sm">
                  {userAnalyticsData.userSummary.percentageGrowth}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                за последний месяц
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Активные пользователи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(userAnalyticsData.userSummary.activeUsers)}
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {Math.round((userAnalyticsData.userSummary.activeUsers / userAnalyticsData.userSummary.totalUsers) * 100)}% от всех пользователей
              </span>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Онлайн
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Новые пользователи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(userAnalyticsData.userSummary.newUsersThisWeek)}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                За последние 7 дней
              </span>
              <div className="text-xs font-medium text-green-600">
                +{userAnalyticsData.userSummary.newUsersToday} сегодня
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Удержание пользователей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userAnalyticsData.userSummary.retentionRate}%
            </div>
            <div className="mt-1">
              <Progress 
                value={userAnalyticsData.userSummary.retentionRate} 
                className="h-1.5" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Рост и активность</span>
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Удержание</span>
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Сегменты</span>
          </TabsTrigger>
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Демография</span>
          </TabsTrigger>
          <TabsTrigger value="deposits" className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4" />
            <span>Депозиты</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Рост пользователей</CardTitle>
                  <CardDescription>
                    Динамика роста активных пользователей, новых регистраций и оттока
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-sm mr-2"></div>
                    <span className="text-xs">Активных</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                    <span className="text-xs">Новых</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
                    <span className="text-xs">Отток</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={userAnalyticsData.userActivity}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="active"
                      name="Активные пользователи"
                      stroke="#4f46e5"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="new"
                      name="Новые пользователи"
                      stroke="#10b981"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="churn"
                      name="Отток"
                      stroke="#ef4444"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Источники трафика</CardTitle>
                <CardDescription>
                  Распределение пользователей по источникам привлечения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={userAnalyticsData.trafficSources}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="users"
                        nameKey="source"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userAnalyticsData.trafficSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatNumber(value as number), "Пользователей"]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {userAnalyticsData.trafficSources.map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{source.source}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {source.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Метрики роста</CardTitle>
                <CardDescription>
                  Ключевые показатели роста пользовательской базы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium">Коэффициент конверсии</div>
                      <div className="text-sm font-bold">4.8%</div>
                    </div>
                    <Progress value={4.8} max={10} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Посетители в зарегистрированных пользователей</span>
                      <span className="text-green-600">+0.5%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium">Активация</div>
                      <div className="text-sm font-bold">65.2%</div>
                    </div>
                    <Progress value={65.2} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Регистрация в первый депозит</span>
                      <span className="text-green-600">+2.1%</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium">Коэффициент роста</div>
                      <div className="text-sm font-bold">1.35x</div>
                    </div>
                    <Progress value={67.5} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Месяц к месяцу</span>
                      <span className="text-amber-600">-0.2x</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm font-medium">Чистый прирост пользователей</div>
                      <div className="text-sm font-bold">+12.5%</div>
                    </div>
                    <Progress value={12.5} max={20} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>С учетом оттока</span>
                      <span className="text-green-600">+1.3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Анализ удержания пользователей</CardTitle>
              <CardDescription>
                Удержание пользователей по когортам за последние месяцы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Когорта</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 1</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 2</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 3</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 4</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 5</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 6</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 7</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Неделя 8</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAnalyticsData.userRetention.map((cohort, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 font-medium">{cohort.cohort}</td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week1 / 100})`,
                              color: cohort.week1 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week1}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week2 / 100})`,
                              color: cohort.week2 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week2}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week3 / 100})`,
                              color: cohort.week3 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week3}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week4 / 100})`,
                              color: cohort.week4 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week4}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week5 / 100})`,
                              color: cohort.week5 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week5}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week6 / 100})`,
                              color: cohort.week6 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week6}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week7 / 100})`,
                              color: cohort.week7 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week7}%
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div 
                            className="p-2 rounded text-white font-medium"
                            style={{ 
                              background: `rgba(79, 70, 229, ${cohort.week8 / 100})`,
                              color: cohort.week8 > 50 ? 'white' : 'black' 
                            }}
                          >
                            {cohort.week8}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Ключевые метрики удержания</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Удержание первого дня (D1)</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Удержание седьмого дня (D7)</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Удержание тридцатого дня (D30)</span>
                      <span className="font-medium">58%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Средний срок активности пользователя</span>
                      <span className="font-medium">4.2 месяца</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Рекомендации по улучшению удержания</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mt-1" />
                      <span>Увеличить частоту отправки уведомлений о новых инвестиционных возможностях</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mt-1" />
                      <span>Внедрить программу поощрения за регулярную активность</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-600 mt-1" />
                      <span>Улучшить процесс обучения для новых пользователей</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Сегментация пользователей</CardTitle>
              <CardDescription>
                Разделение пользователей по характеру активности и поведению
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <div className="space-y-4">
                    {userAnalyticsData.userSegments.map((segment, index) => (
                      <div key={index} className="p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{segment.segment}</span>
                          <Badge variant="outline">
                            {segment.percentage}%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">
                            {formatNumber(segment.count)} пользователей
                          </span>
                          <div className={`flex items-center ${getChangeColor(segment.growth)}`}>
                            {getChangeIcon(segment.growth)}
                            <span className="text-xs">{segment.growth}%</span>
                          </div>
                        </div>
                        <Progress value={segment.percentage} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Legend />
                        <Pie
                          data={userAnalyticsData.userSegments}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="count"
                          nameKey="segment"
                          label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                        >
                          {userAnalyticsData.userSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${formatNumber(value as number)} пользователей`, "Количество"]} 
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Сравнение конверсий по сегментам</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Активные инвесторы</span>
                        <span className="text-sm font-medium">8.9%</span>
                      </div>
                      <Progress value={8.9} max={10} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Умеренные пользователи</span>
                        <span className="text-sm font-medium">4.2%</span>
                      </div>
                      <Progress value={4.2} max={10} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Неактивные пользователи</span>
                        <span className="text-sm font-medium">1.1%</span>
                      </div>
                      <Progress value={1.1} max={10} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Новые пользователи</span>
                        <span className="text-sm font-medium">3.7%</span>
                      </div>
                      <Progress value={3.7} max={10} className="h-1.5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Средний размер депозита по сегментам</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Активные инвесторы</span>
                        <span className="text-sm font-medium">{formatCurrency(4850)}</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Умеренные пользователи</span>
                        <span className="text-sm font-medium">{formatCurrency(1650)}</span>
                      </div>
                      <Progress value={55} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Неактивные пользователи</span>
                        <span className="text-sm font-medium">{formatCurrency(320)}</span>
                      </div>
                      <Progress value={20} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Новые пользователи</span>
                        <span className="text-sm font-medium">{formatCurrency(950)}</span>
                      </div>
                      <Progress value={35} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>География</CardTitle>
                <CardDescription>
                  Распределение пользователей по странам
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={userAnalyticsData.userDemographics.countries}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {userAnalyticsData.userDemographics.countries.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatNumber(value as number), "Пользователей"]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {userAnalyticsData.userDemographics.countries.map((country, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{country.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {country.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Возраст</CardTitle>
                <CardDescription>
                  Возрастные группы пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={userAnalyticsData.userDemographics.age}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatNumber(value as number), "Пользователей"]} />
                      <Bar dataKey="count" fill="#4f46e5">
                        {userAnalyticsData.userDemographics.age.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {userAnalyticsData.userDemographics.age.map((age, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{age.range}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {age.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Устройства</CardTitle>
                <CardDescription>
                  Типы устройств, используемые пользователями
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={userAnalyticsData.userDemographics.devices}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="type"
                        label={({ type, percentage }) => `${type}: ${percentage}%`}
                      >
                        {userAnalyticsData.userDemographics.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatNumber(value as number), "Пользователей"]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {userAnalyticsData.userDemographics.devices.map((device, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-sm mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{device.type}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {device.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Поведенческий анализ</CardTitle>
              <CardDescription>
                Дополнительные характеристики пользовательской активности
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Активность по времени суток</h4>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { time: "00-04", users: 45 },
                          { time: "04-08", users: 75 },
                          { time: "08-12", users: 285 },
                          { time: "12-16", users: 345 },
                          { time: "16-20", users: 410 },
                          { time: "20-24", users: 215 }
                        ]}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                      >
                        <XAxis dataKey="time" />
                        <YAxis hide />
                        <Tooltip formatter={(value) => [formatNumber(value as number), "Пользователей"]} />
                        <Bar dataKey="users" fill="#4f46e5" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-xs text-center text-muted-foreground">
                    Пик активности: 16:00 - 20:00
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Активность по дням недели</h4>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { day: "Пн", users: 280 },
                          { day: "Вт", users: 255 },
                          { day: "Ср", users: 245 },
                          { day: "Чт", users: 260 },
                          { day: "Пт", users: 290 },
                          { day: "Сб", users: 345 },
                          { day: "Вс", users: 320 }
                        ]}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                      >
                        <XAxis dataKey="day" />
                        <YAxis hide />
                        <Tooltip formatter={(value) => [formatNumber(value as number), "Пользователей"]} />
                        <Bar dataKey="users" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-xs text-center text-muted-foreground">
                    Пик активности в выходные дни
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Среднее время на платформе</h4>
                  <div className="h-[150px] flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-primary">18:35</div>
                    <div className="text-sm text-muted-foreground">мин:сек / сессия</div>
                    
                    <div className="flex items-center mt-4 text-sm text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+2:42 к прошлому месяцу</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deposits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-muted-foreground">
                  Общая сумма депозитов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(userAnalyticsData.depositStatistics.totalAmount)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {formatNumber(userAnalyticsData.depositStatistics.totalDeposits)} транзакций
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-muted-foreground">
                  Средний депозит
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(userAnalyticsData.depositStatistics.averageDeposit)}
                </div>
                <div className="flex items-center text-sm mt-1">
                  <div className="text-green-600 flex items-center mr-2">
                    <ArrowUpRight className="h-4 w-4 mr-0.5" />
                    <span>+8.3%</span>
                  </div>
                  <span className="text-muted-foreground">к прошлому месяцу</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-muted-foreground">
                  Коэффициент конверсии в депозит
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  65.8%
                </div>
                <div className="mt-1">
                  <Progress value={65.8} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Распределение депозитов</CardTitle>
                <CardDescription>
                  Разбивка депозитов по размеру
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={userAnalyticsData.depositStatistics.depositDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="range"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userAnalyticsData.depositStatistics.depositDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatNumber(value as number), "Депозитов"]} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Динамика депозитов</CardTitle>
                <CardDescription>
                  Количество и объем депозитов за последние 7 дней
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={userAnalyticsData.depositStatistics.depositsByDay}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === "count" 
                            ? formatNumber(value as number) 
                            : formatCurrency(value as number),
                          name === "count" ? "Количество" : "Сумма"
                        ]} 
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Количество" fill="#4f46e5" />
                      <Bar yAxisId="right" dataKey="amount" name="Сумма ($)" fill="#10b981" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Дополнительные метрики</CardTitle>
              <CardDescription>
                Ключевые показатели эффективности привлечения депозитов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Время до первого депозита</h4>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-primary">2.3</div>
                    <div className="text-sm text-muted-foreground">дня в среднем</div>
                    
                    <div className="w-full mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">По сегментам</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Новые пользователи</span>
                            <span>3.1 дня</span>
                          </div>
                          <Progress value={65} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Реферальные</span>
                            <span>1.8 дня</span>
                          </div>
                          <Progress value={82} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Повторные депозиты</h4>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-primary">48%</div>
                    <div className="text-sm text-muted-foreground">пользователей делают повторные депозиты</div>
                    
                    <div className="w-full mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Среднее количество депозитов на пользователя</span>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Количество</span>
                        <span>3.4</span>
                      </div>
                      <Progress value={68} className="h-1" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Платежные методы</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Банковские карты</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Банковский перевод</span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Электронные кошельки</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Криптовалюты</span>
                        <span>3%</span>
                      </div>
                      <Progress value={3} className="h-1" />
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-center text-muted-foreground">
                    Успешные транзакции: 97.8%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Сохранить отчет
        </Button>
      </div>
    </div>
  );
}