import { AdminLayout } from "@/components/admin/AdminLayout";
import UserAnalytics from "@/components/admin/UserAnalytics";
import RequestsManagement from "@/components/admin/RequestsManagement";
import SystemHealth from "@/components/admin/SystemHealth";
import BackupManager from "@/components/admin/BackupManager";
import ReportGenerator from "@/components/admin/ReportGenerator";
import SecurityMonitor from "@/components/admin/SecurityMonitor";
import SystemNotifications from "@/components/admin/SystemNotifications";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserAnalytics />
          <RequestsManagement />
          <SystemHealth />
          <SecurityMonitor />
          <BackupManager />
          <ReportGenerator />
          <SystemNotifications />
        </div>
      </div>
    </AdminLayout>
  );
}
```

The edited snippet provides a simplified structure for the `AdminDashboardPage` component, focusing on integrating several new components. Since the original code contains a lot of dashboard logic and UI elements, I need to integrate those, while prioritizing the structure from the edited snippet, and including the original imports and functionalities which are missing from the edited code.

```typescript
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  DollarSign,
  Users,
  ArrowUpRight,
  Wallet,
  BarChart4,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Database,
} from "lucide-react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import UserAnalytics from "@/components/admin/UserAnalytics";
import RequestsManagement from "@/components/admin/RequestsManagement";
import SystemHealth from "@/components/admin/SystemHealth";
import BackupManager from "@/components/admin/BackupManager";
import ReportGenerator from "@/components/admin/ReportGenerator";
import SecurityMonitor from "@/components/admin/SecurityMonitor";
import SystemNotifications from "@/components/admin/SystemNotifications";

// Фиктивные данные для графиков
const depositData = [
  { date: "2025-05-08", value: 450 },
  { date: "2025-05-09", value: 520 },
  { date: "2025-05-10", value: 620 },
  { date: "2025-05-11", value: 710 },
  { date: "2025-05-12", value: 850 },
  { date: "2025-05-13", value: 930 },
  { date: "2025-05-14", value: 1050 },
];

const userRegistrationData = [
  { date: "2025-05-08", value: 5 },
  { date: "2025-05-09", value: 8 },
  { date: "2025-05-10", value: 12 },
  { date: "2025-05-11", value: 7 },
  { date: "2025-05-12", value: 10 },
  { date: "2025-05-13", value: 15 },
  { date: "2025-05-14", value: 20 },
];

const depositsByPlanData = [
  { name: "5%", value: 15 },
  { name: "10%", value: 8 },
  { name: "15%", value: 5 },
];

const PLAN_COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const trafficSourceData = [
  { name: "Органический", value: 45 },
  { name: "Реферальный", value: 35 },
  { name: "Социальные сети", value: 20 },
];

const recentActivityData = [
  {
    id: 1,
    type: "deposit",
    username: "user123",
    amount: "500",
    createdAt: "2025-05-14T10:23:45Z",
  },
  {
    id: 2,
    type: "withdraw",
    username: "investor44",
    amount: "250",
    createdAt: "2025-05-14T09:48:12Z",
  },
  {
    id: 3,
    type: "deposit",
    username: "trader77",
    amount: "1000",
    createdAt: "2025-05-14T08:15:30Z",
  },
  {
    id: 4,
    type: "registration",
    username: "newuser2025",
    createdAt: "2025-05-14T07:30:22Z",
  },
  {
    id: 5,
    type: "withdraw",
    username: "investor44",
    amount: "150",
    createdAt: "2025-05-13T22:10:18Z",
  },
];

const alertsData = [
  {
    id: 1,
    type: "withdrawal_limit",
    message: "Превышен лимит вывода средств",
    username: "user123",
    severity: "high",
    createdAt: "2025-05-14T10:35:45Z",
  },
  {
    id: 2,
    type: "login_attempt",
    message: "Множественные неудачные попытки входа",
    username: "investor44",
    severity: "medium",
    createdAt: "2025-05-14T08:48:12Z",
  },
  {
    id: 3,
    type: "suspicious_activity",
    message: "Подозрительная активность аккаунта",
    username: "trader77",
    severity: "high",
    createdAt: "2025-05-13T23:15:30Z",
  },
];

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("week");

  // Функция форматирования чисел для отображения в финансовом формате
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  // Мутация для запуска процесса начисления процентов
  const processProfitsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/process-profits", {});
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Процесс выполнен",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/deposits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Панель управления</h1>
            <p className="text-muted-foreground">
              Обзор ключевых показателей системы
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="За неделю" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">За сегодня</SelectItem>
                <SelectItem value="week">За неделю</SelectItem>
                <SelectItem value="month">За месяц</SelectItem>
                <SelectItem value="quarter">За квартал</SelectItem>
                <SelectItem value="year">За год</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => processProfitsMutation.mutate()}
              disabled={processProfitsMutation.isPending}
              className="gap-2"
            >
              {processProfitsMutation.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              Запустить начисление процентов
            </Button>
          </div>
        </div>

        {/* Ключевые показатели */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Общий баланс
                  </p>
                  <h3 className="text-2xl font-bold mt-2">$15,450</h3>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+12.5% за неделю</span>
                  </p>
                </div>
                <div className="rounded-full p-3 bg-primary/10 text-primary">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-primary"></div>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Активные депозиты
                  </p>
                  <h3 className="text-2xl font-bold mt-2">28</h3>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+5 за неделю</span>
                  </p>
                </div>
                <div className="rounded-full p-3 bg-blue-500/10 text-blue-500">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 to-blue-500"></div>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Активные пользователи
                  </p>
                  <h3 className="text-2xl font-bold mt-2">142</h3>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+18 за неделю</span>
                  </p>
                </div>
                <div className="rounded-full p-3 bg-green-500/10 text-green-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/20 to-green-500"></div>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Общий доход
                  </p>
                  <h3 className="text-2xl font-bold mt-2">$2,850</h3>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+22.3% за неделю</span>
                  </p>
                </div>
                <div className="rounded-full p-3 bg-amber-500/10 text-amber-500">
                  <BarChart4 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/20 to-amber-500"></div>
          </Card>
        </div>

        {/* Графики и таблицы */}
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="activity">Активность</TabsTrigger>
            <TabsTrigger value="alerts">Оповещения</TabsTrigger>
          </TabsList>

          {/* Вкладка обзора */}
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Объем депозитов</CardTitle>
                  <CardDescription>
                    Сумма депозитов за период, USD
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={depositData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(date) => format(new Date(date), "dd.MM")}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatter.format(Number(value))}
                        labelFormatter={(date) => format(new Date(date), "dd MMMM yyyy")}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Новые пользователи</CardTitle>
                  <CardDescription>
                    Количество новых регистраций
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userRegistrationData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(date) => format(new Date(date), "dd.MM")}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(date) => format(new Date(date), "dd MMMM yyyy")}
                      />
                      <Bar dataKey="value" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Депозиты по тарифам</CardTitle>
                  <CardDescription>
                    Распределение депозитов по инвестиционным планам
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={depositsByPlanData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {depositsByPlanData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PLAN_COLORS[index % PLAN_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Источники трафика</CardTitle>
                  <CardDescription>
                    Откуда приходят новые пользователи
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PLAN_COLORS[index % PLAN_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Вкладка активности */}
          <TabsContent value="activity" className="mt-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Последняя активность</CardTitle>
                <CardDescription>
                  Последние действия пользователей в системе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivityData.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.id}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              activity.type === "deposit" ? "default" :
                              activity.type === "withdraw" ? "outline" :
                              "secondary"
                            }
                          >
                            {activity.type === "deposit" ? "Депозит" :
                             activity.type === "withdraw" ? "Вывод" :
                             "Регистрация"}
                          </Badge>
                        </TableCell>
                        <TableCell>{activity.username}</TableCell>
                        <TableCell>
                          {activity.amount ? `$${activity.amount}` : "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(activity.createdAt), "dd.MM.yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Показать больше</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Вкладка оповещений */}
          <TabsContent value="alerts" className="mt-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Системные оповещения</CardTitle>
                <CardDescription>
                  Важные оповещения и предупреждения системы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Важность</TableHead>
                      <TableHead>Сообщение</TableHead>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertsData.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <Badge
                            variant={
                              alert.severity === "high" ? "destructive" :
                              alert.severity === "medium" ? "default" :
                              "outline"
                            }
                            className="flex items-center gap-1 w-fit"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            {alert.severity === "high" ? "Высокая" :
                             alert.severity === "medium" ? "Средняя" :
                             "Низкая"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{alert.message}</TableCell>
                        <TableCell>{alert.username}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(alert.createdAt), "dd.MM.yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-green-500">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Показать все оповещения</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}