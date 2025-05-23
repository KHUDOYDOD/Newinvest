import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Clock,
  User,
  UserX,
  Lock,
  Unlock,
  Eye,
  MapPin,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Activity,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Play,
  Pause
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Пример данных для модуля безопасности
const securityData = {
  overview: {
    securityScore: 87,
    totalAlerts: 34,
    criticalAlerts: 3,
    highAlerts: 7,
    mediumAlerts: 12,
    lowAlerts: 12,
    activeThreats: 5,
    blockedAttempts: 243
  },
  alertsOverTime: [
    { date: "01.05", total: 8, critical: 1, high: 2, medium: 3, low: 2 },
    { date: "02.05", total: 5, critical: 0, high: 1, medium: 2, low: 2 },
    { date: "03.05", total: 12, critical: 2, high: 3, medium: 4, low: 3 },
    { date: "04.05", total: 10, critical: 1, high: 2, medium: 3, low: 4 },
    { date: "05.05", total: 7, critical: 0, high: 1, medium: 3, low: 3 },
    { date: "06.05", total: 14, critical: 2, high: 4, medium: 5, low: 3 },
    { date: "07.05", total: 9, critical: 0, high: 2, medium: 4, low: 3 }
  ],
  recentAlerts: [
    {
      id: "SEC-1042",
      timestamp: "2025-05-20T15:23:45Z",
      type: "Suspicious Login",
      severity: "critical",
      status: "active",
      description: "Множественные неудачные попытки входа с неизвестного IP-адреса",
      location: "Moscow, Russia",
      ip: "185.23.45.67",
      user: "maria_trade",
      userId: 153,
      device: "Windows 10, Chrome 95.0.4638",
      resolved: false
    },
    {
      id: "SEC-1041",
      timestamp: "2025-05-20T14:12:37Z",
      type: "Large Withdrawal Attempt",
      severity: "high",
      status: "active",
      description: "Попытка вывода необычно большой суммы с неподтвержденного устройства",
      location: "Saint Petersburg, Russia",
      ip: "92.45.178.23",
      user: "alexey_invest",
      userId: 284,
      device: "macOS 12.3, Safari 15.2",
      resolved: false
    },
    {
      id: "SEC-1040",
      timestamp: "2025-05-20T12:47:12Z",
      type: "API Access Violation",
      severity: "medium",
      status: "active",
      description: "Попытка доступа к API с недействительным токеном",
      location: "Unknown",
      ip: "168.32.45.78",
      user: "System",
      userId: 0,
      device: "Unknown",
      resolved: false
    },
    {
      id: "SEC-1039",
      timestamp: "2025-05-20T10:32:29Z",
      type: "Account Lockout",
      severity: "medium",
      status: "resolved",
      description: "Аккаунт заблокирован после 5 неудачных попыток входа",
      location: "Moscow, Russia",
      ip: "77.45.123.56",
      user: "ivan_markets",
      userId: 521,
      device: "iOS 15.4, Safari Mobile",
      resolved: true,
      resolvedAt: "2025-05-20T11:15:42Z",
      resolvedBy: "Security System"
    },
    {
      id: "SEC-1038",
      timestamp: "2025-05-20T08:15:08Z",
      type: "New Device Login",
      severity: "low",
      status: "resolved",
      description: "Вход с нового устройства",
      location: "Kazan, Russia",
      ip: "94.45.23.67",
      user: "elena_trading",
      userId: 217,
      device: "Android 12, Chrome Mobile 95.0.4638",
      resolved: true,
      resolvedAt: "2025-05-20T08:20:33Z",
      resolvedBy: "User Verified"
    },
    {
      id: "SEC-1037",
      timestamp: "2025-05-19T22:43:15Z",
      type: "Password Change",
      severity: "low",
      status: "resolved",
      description: "Запрос на изменение пароля из неизвестного местоположения",
      location: "Berlin, Germany",
      ip: "91.23.45.68",
      user: "sergey_fin",
      userId: 89,
      device: "Windows 11, Firefox 98.0",
      resolved: true,
      resolvedAt: "2025-05-19T23:10:22Z",
      resolvedBy: "User Verified"
    },
    {
      id: "SEC-1036",
      timestamp: "2025-05-19T18:55:32Z",
      type: "2FA Disabled Attempt",
      severity: "high",
      status: "active",
      description: "Попытка отключения двухфакторной аутентификации",
      location: "Unknown",
      ip: "45.78.32.15",
      user: "dmitry_investor",
      userId: 124,
      device: "Unknown",
      resolved: false
    },
    {
      id: "SEC-1035",
      timestamp: "2025-05-19T15:27:18Z",
      type: "Unusual Activity",
      severity: "medium",
      status: "resolved",
      description: "Необычно высокая активность на счете",
      location: "Moscow, Russia",
      ip: "77.88.99.12",
      user: "pavel_trader",
      userId: 183,
      device: "Windows 10, Edge 97.0.1072",
      resolved: true,
      resolvedAt: "2025-05-19T16:05:27Z",
      resolvedBy: "Admin (ID: 1)"
    },
    {
      id: "SEC-1034",
      timestamp: "2025-05-19T12:14:53Z",
      type: "Login from New Country",
      severity: "high",
      status: "active",
      description: "Вход из новой страны, не совпадающей с обычным местоположением",
      location: "Bangkok, Thailand",
      ip: "124.45.67.89",
      user: "natalia_fin",
      userId: 309,
      device: "macOS 12.3, Chrome 95.0.4638",
      resolved: false
    },
    {
      id: "SEC-1033",
      timestamp: "2025-05-19T09:45:22Z",
      type: "SQL Injection Attempt",
      severity: "critical",
      status: "resolved",
      description: "Обнаружена попытка SQL-инъекции",
      location: "Unknown",
      ip: "176.32.45.67",
      user: "Unknown",
      userId: null,
      device: "Unknown",
      resolved: true,
      resolvedAt: "2025-05-19T09:46:01Z",
      resolvedBy: "WAF System"
    }
  ],
  activeUsers: {
    total: 1285,
    withTwoFA: 842,
    withStrongPasswords: 953,
    recentlyActive: 764,
    dormant: 134,
    suspicious: 18,
    withRecentPasswordChange: 376
  },
  vulnerabilities: [
    { id: "VUL-23", severity: "critical", name: "XSS in Profile Form", status: "open", discoveredAt: "2025-05-15T10:23:45Z", affectedComponent: "User Profile" },
    { id: "VUL-22", severity: "high", name: "API Rate Limiting Bypass", status: "open", discoveredAt: "2025-05-12T15:43:22Z", affectedComponent: "API Gateway" },
    { id: "VUL-21", severity: "medium", name: "Session Fixation Risk", status: "open", discoveredAt: "2025-05-10T09:12:34Z", affectedComponent: "Authentication" },
    { id: "VUL-20", severity: "low", name: "Weak Password Policy", status: "open", discoveredAt: "2025-05-08T11:32:56Z", affectedComponent: "User Management" },
    { id: "VUL-19", severity: "high", name: "CSRF in Payment Form", status: "open", discoveredAt: "2025-05-05T14:23:45Z", affectedComponent: "Payment System" },
    { id: "VUL-18", severity: "critical", name: "Remote Code Execution", status: "fixed", discoveredAt: "2025-04-28T08:45:23Z", affectedComponent: "Admin Panel", fixedAt: "2025-04-29T17:23:45Z" },
    { id: "VUL-17", severity: "high", name: "Insecure Direct Object References", status: "fixed", discoveredAt: "2025-04-25T16:43:21Z", affectedComponent: "User Data API", fixedAt: "2025-04-27T12:34:56Z" }
  ],
  securityControls: [
    { name: "Two-Factor Authentication", status: "active", coverage: 65.5, lastUpdate: "2025-05-18T08:23:45Z" },
    { name: "Password Policy Enforcement", status: "active", coverage: 100, lastUpdate: "2025-05-15T10:12:34Z" },
    { name: "IP Filtering", status: "active", coverage: 100, lastUpdate: "2025-05-20T09:45:12Z" },
    { name: "Rate Limiting", status: "active", coverage: 100, lastUpdate: "2025-05-19T14:23:45Z" },
    { name: "Data Encryption at Rest", status: "active", coverage: 100, lastUpdate: "2025-05-01T11:34:56Z" },
    { name: "SSL/TLS Implementation", status: "active", coverage: 100, lastUpdate: "2025-05-10T15:23:45Z" },
    { name: "Security Headers", status: "partial", coverage: 88.2, lastUpdate: "2025-05-12T16:45:23Z" },
    { name: "Web Application Firewall", status: "active", coverage: 100, lastUpdate: "2025-05-20T08:23:45Z" },
    { name: "DDoS Protection", status: "active", coverage: 100, lastUpdate: "2025-05-05T12:34:56Z" },
    { name: "User Activity Monitoring", status: "active", coverage: 100, lastUpdate: "2025-05-20T15:45:23Z" }
  ],
  loginData: {
    successRate: 94.3,
    loginAttempts: [
      { date: "01.05", success: 845, failed: 52 },
      { date: "02.05", success: 932, failed: 41 },
      { date: "03.05", success: 876, failed: 38 },
      { date: "04.05", success: 764, failed: 65 },
      { date: "05.05", success: 843, failed: 47 },
      { date: "06.05", success: 901, failed: 39 },
      { date: "07.05", success: 824, failed: 43 }
    ],
    loginMethods: [
      { method: "Password", count: 4865, percentage: 46.5 },
      { method: "2FA SMS", count: 2432, percentage: 23.3 },
      { method: "2FA Email", count: 1546, percentage: 14.8 },
      { method: "2FA App", count: 987, percentage: 9.4 },
      { method: "Social Login", count: 421, percentage: 4.0 },
      { method: "OAuth", count: 208, percentage: 2.0 }
    ],
    deviceTypes: [
      { type: "Desktop", count: 5243, percentage: 50.1 },
      { type: "Mobile", count: 4327, percentage: 41.4 },
      { type: "Tablet", count: 889, percentage: 8.5 }
    ]
  }
};

// Вспомогательные функции
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Компонент для значка уровня серьезности
interface SeverityBadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
}

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const config = {
    critical: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertCircle className="h-3.5 w-3.5" />
    },
    high: {
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: <AlertTriangle className="h-3.5 w-3.5" />
    },
    medium: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <AlertTriangle className="h-3.5 w-3.5" />
    },
    low: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <AlertTriangle className="h-3.5 w-3.5" />
    }
  };

  return (
    <Badge variant="outline" className={config[severity].color}>
      <div className="flex items-center gap-1">
        {config[severity].icon}
        <span className="capitalize">{severity}</span>
      </div>
    </Badge>
  );
};

// Компонент мониторинга безопасности
export default function SecurityMonitor() {
  const [tabView, setTabView] = useState("overview");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [alertDetailsOpen, setAlertDetailsOpen] = useState(false);
  
  // Получение выбранного алерта
  const selectedAlert = securityData.recentAlerts.find(alert => alert.id === selectedAlertId);
  
  // Вычисление фильтрованного списка алертов
  const filteredAlerts = securityData.recentAlerts.filter(alert => {
    // Фильтр по серьезности
    if (filterSeverity !== "all" && alert.severity !== filterSeverity) {
      return false;
    }
    
    // Фильтр по статусу
    if (filterStatus !== "all" && alert.status !== filterStatus) {
      return false;
    }
    
    // Поисковый фильтр
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        alert.id.toLowerCase().includes(query) ||
        alert.type.toLowerCase().includes(query) ||
        alert.user.toLowerCase().includes(query) ||
        alert.ip.includes(query) ||
        alert.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Данные для графика серьезности алертов
  const alertSeverityData = [
    { name: "Critical", value: securityData.overview.criticalAlerts, color: "#f87171" },
    { name: "High", value: securityData.overview.highAlerts, color: "#fb923c" },
    { name: "Medium", value: securityData.overview.mediumAlerts, color: "#fbbf24" },
    { name: "Low", value: securityData.overview.lowAlerts, color: "#60a5fa" }
  ];
  
  // Обработка просмотра деталей алерта
  const handleViewAlertDetails = (alertId: string) => {
    setSelectedAlertId(alertId);
    setAlertDetailsOpen(true);
  };
  
  // Обработка разрешения алерта
  const handleResolveAlert = (alertId: string) => {
    // Здесь будет API-запрос для разрешения алерта
    toast({
      title: "Алерт разрешен",
      description: `Алерт ${alertId} был успешно разрешен.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Мониторинг безопасности</h2>
          <p className="text-muted-foreground">
            Отслеживание угроз безопасности и инцидентов
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <ShieldAlert className="h-4 w-4 mr-2" />
            Запустить сканирование
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Рейтинг безопасности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityData.overview.securityScore}/100</div>
            <div className="mt-1">
              <Progress 
                value={securityData.overview.securityScore} 
                className="h-1.5" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Активные угрозы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityData.overview.activeThreats}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {securityData.overview.criticalAlerts > 0 ? (
                <span className="text-red-600 font-medium">
                  {securityData.overview.criticalAlerts} критических
                </span>
              ) : (
                "Нет критических угроз"
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Предотвращено атак
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityData.overview.blockedAttempts}</div>
            <div className="text-sm text-muted-foreground mt-1">
              За последние 7 дней
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              2FA охват
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((securityData.activeUsers.withTwoFA / securityData.activeUsers.total) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {securityData.activeUsers.withTwoFA} из {securityData.activeUsers.total} пользователей
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4" value={tabView} onValueChange={setTabView}>
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Алерты безопасности</span>
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Уязвимости</span>
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Меры защиты</span>
          </TabsTrigger>
          <TabsTrigger value="login" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Логины</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Алерты по времени</CardTitle>
                <CardDescription>
                  Распределение алертов безопасности за последнюю неделю
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={securityData.alertsOverTime}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="total" name="Все алерты" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="critical" name="Критические" stroke="#f87171" />
                      <Line type="monotone" dataKey="high" name="Высокие" stroke="#fb923c" />
                      <Line type="monotone" dataKey="medium" name="Средние" stroke="#fbbf24" />
                      <Line type="monotone" dataKey="low" name="Низкие" stroke="#60a5fa" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Распределение алертов</CardTitle>
                <CardDescription>
                  Распределение по уровню серьезности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={alertSeverityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {alertSeverityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Последние алерты безопасности</CardTitle>
              <CardDescription>
                Недавние инциденты безопасности, требующие внимания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Серьезность</TableHead>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityData.recentAlerts.slice(0, 5).map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>
                          <SeverityBadge severity={alert.severity as 'critical' | 'high' | 'medium' | 'low'} />
                        </TableCell>
                        <TableCell>{alert.user}</TableCell>
                        <TableCell>{formatDate(alert.timestamp)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              alert.status === "active"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {alert.status === "active" ? "Активный" : "Разрешен"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewAlertDetails(alert.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTabView("alerts")}
                >
                  Просмотреть все алерты
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Открытые уязвимости</CardTitle>
                <CardDescription>
                  Выявленные уязвимости, требующие устранения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityData.vulnerabilities
                    .filter((vuln) => vuln.status === "open")
                    .slice(0, 3)
                    .map((vuln) => (
                      <div key={vuln.id} className="border rounded-md p-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{vuln.id}</span>
                              <SeverityBadge severity={vuln.severity as 'critical' | 'high' | 'medium' | 'low'} />
                            </div>
                            <p className="font-medium">{vuln.name}</p>
                            <div className="text-sm text-muted-foreground">
                              Компонент: {vuln.affectedComponent}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Обнаружено: {formatDate(vuln.discoveredAt)}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Исправить
                          </Button>
                        </div>
                      </div>
                    ))}
                  
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTabView("vulnerabilities")}
                    >
                      Просмотреть все уязвимости
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Статус безопасности</CardTitle>
                <CardDescription>
                  Текущее состояние мер безопасности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityData.securityControls.slice(0, 5).map((control) => (
                    <div key={control.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{control.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            control.status === "active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                          }
                        >
                          {control.status === "active" ? "Активно" : "Частично"}
                        </Badge>
                      </div>
                      <Progress
                        value={control.coverage}
                        className="h-1.5"
                      />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Покрытие: {control.coverage}%</span>
                        <span>Обновлено: {formatDate(control.lastUpdate)}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTabView("controls")}
                    >
                      Просмотреть все меры защиты
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Алерты безопасности</CardTitle>
                  <CardDescription>
                    Все инциденты безопасности, обнаруженные системой
                  </CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Select
                    value={filterSeverity}
                    onValueChange={setFilterSeverity}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Фильтр по серьезности" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все уровни</SelectItem>
                      <SelectItem value="critical">Критический</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="low">Низкий</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={filterStatus}
                    onValueChange={setFilterStatus}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Фильтр по статусу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="active">Активные</SelectItem>
                      <SelectItem value="resolved">Разрешенные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по ID, типу, пользователю..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Серьезность</TableHead>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>IP адрес</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>
                          <SeverityBadge severity={alert.severity as 'critical' | 'high' | 'medium' | 'low'} />
                        </TableCell>
                        <TableCell>{alert.user}</TableCell>
                        <TableCell>{alert.ip}</TableCell>
                        <TableCell>{formatDate(alert.timestamp)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              alert.status === "active"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {alert.status === "active" ? "Активный" : "Разрешен"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleViewAlertDetails(alert.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Просмотр деталей</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            {alert.status === "active" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleResolveAlert(alert.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Отметить как разрешенный</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Действия</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleViewAlertDetails(alert.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Просмотреть детали
                                </DropdownMenuItem>
                                {alert.status === "active" ? (
                                  <DropdownMenuItem onClick={() => handleResolveAlert(alert.id)}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Отметить как разрешенный
                                  </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Экспортировать
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredAlerts.length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <ShieldCheck className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Нет алертов</h3>
                  <p className="text-muted-foreground mt-2">
                    По выбранным фильтрам не найдено алертов безопасности.
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  Предыдущая
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  Следующая
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Уязвимости безопасности</CardTitle>
              <CardDescription>
                Выявленные уязвимости в системе, требующие внимания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Уязвимость</TableHead>
                      <TableHead>Серьезность</TableHead>
                      <TableHead>Затронутый компонент</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Обнаружена</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityData.vulnerabilities.map((vuln) => (
                      <TableRow key={vuln.id}>
                        <TableCell className="font-medium">{vuln.id}</TableCell>
                        <TableCell>{vuln.name}</TableCell>
                        <TableCell>
                          <SeverityBadge severity={vuln.severity as 'critical' | 'high' | 'medium' | 'low'} />
                        </TableCell>
                        <TableCell>{vuln.affectedComponent}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              vuln.status === "open"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {vuln.status === "open" ? "Открыта" : "Исправлена"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(vuln.discoveredAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={vuln.status === "open" ? "default" : "outline"}
                            size="sm"
                            disabled={vuln.status === "fixed"}
                          >
                            {vuln.status === "open" ? "Исправить" : "Подробнее"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex flex-col md:flex-row gap-4 border rounded-md p-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2">Рекомендации по безопасности</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <span>Регулярно обновляйте все компоненты системы и библиотеки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <span>Внедрите проверку кода на уязвимости в процесс разработки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <span>Отключите неиспользуемые HTTP-методы и возможности</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-2">Статистика устранения уязвимостей</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Критические</span>
                        <span className="text-xs font-medium">50%</span>
                      </div>
                      <Progress value={50} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Высокие</span>
                        <span className="text-xs font-medium">33%</span>
                      </div>
                      <Progress value={33} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Средние</span>
                        <span className="text-xs font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs">Низкие</span>
                        <span className="text-xs font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="controls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Меры безопасности</CardTitle>
              <CardDescription>
                Настройка и статус мер защиты системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityData.securityControls.map((control) => (
                  <div key={control.name} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{control.name}</h4>
                      <Badge
                        variant="outline"
                        className={
                          control.status === "active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {control.status === "active" ? "Активно" : "Частично"}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Покрытие</span>
                        <span className="text-sm font-medium">{control.coverage}%</span>
                      </div>
                      <Progress
                        value={control.coverage}
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Обновлено: {formatDate(control.lastUpdate)}</span>
                      <Button variant="outline" size="sm">
                        Настроить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Запланированные проверки безопасности</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                    <div>
                      <h4 className="font-medium">Ежедневное сканирование уязвимостей</h4>
                      <p className="text-sm text-muted-foreground">Следующий запуск: сегодня в 23:00</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Запустить
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pause className="h-4 w-4 mr-1" />
                        Пауза
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                    <div>
                      <h4 className="font-medium">Еженедельный аудит безопасности</h4>
                      <p className="text-sm text-muted-foreground">Следующий запуск: 25.05.2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Запустить
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pause className="h-4 w-4 mr-1" />
                        Пауза
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                    <div>
                      <h4 className="font-medium">Ежемесячный пентест</h4>
                      <p className="text-sm text-muted-foreground">Следующий запуск: 01.06.2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Запустить
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pause className="h-4 w-4 mr-1" />
                        Пауза
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="login" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Успешность входов</CardTitle>
                <CardDescription>
                  Соотношение успешных и неудачных попыток входа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center aspect-square relative">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {securityData.loginData.successRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Успешных входов
                    </div>
                  </div>
                  <svg 
                    className="absolute top-0 left-0 w-full h-full" 
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray={`${securityData.loginData.successRate * 2.51} 251`}
                      strokeDashoffset="0"
                      className="text-primary"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                    <div className="text-sm font-medium">Успешных</div>
                    <div className="text-lg font-bold text-green-600">
                      {securityData.loginData.loginAttempts.reduce((sum, item) => sum + item.success, 0)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/20 rounded-md">
                    <div className="text-sm font-medium">Неудачных</div>
                    <div className="text-lg font-bold text-red-600">
                      {securityData.loginData.loginAttempts.reduce((sum, item) => sum + item.failed, 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Статистика входов</CardTitle>
                <CardDescription>
                  Количество успешных и неудачных входов по дням
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={securityData.loginData.loginAttempts}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="success" name="Успешные входы" stackId="a" fill="#22c55e" />
                      <Bar dataKey="failed" name="Неудачные попытки" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Методы аутентификации</CardTitle>
                <CardDescription>
                  Распределение методов входа пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={securityData.loginData.loginMethods}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="method"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {securityData.loginData.loginMethods.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={[
                              "#f87171", "#60a5fa", "#4ade80", 
                              "#facc15", "#a78bfa", "#fb923c"
                            ][index % 6]} 
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {securityData.loginData.loginMethods.map((method, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-sm mr-2" 
                          style={{ 
                            backgroundColor: [
                              "#f87171", "#60a5fa", "#4ade80", 
                              "#facc15", "#a78bfa", "#fb923c"
                            ][index % 6] 
                          }}
                        />
                        <span>{method.method}</span>
                      </div>
                      <span className="font-medium">{method.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Типы устройств</CardTitle>
                <CardDescription>
                  Распределение устройств для входа в систему
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={securityData.loginData.deviceTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="type"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#4f46e5" />
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center justify-center p-2 bg-muted/20 rounded-md">
                    <Monitor className="h-5 w-5 mb-1 text-primary" />
                    <div className="text-xs text-muted-foreground">Desktop</div>
                    <div className="text-sm font-bold">
                      {securityData.loginData.deviceTypes[0].percentage}%
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-muted/20 rounded-md">
                    <Smartphone className="h-5 w-5 mb-1 text-green-600" />
                    <div className="text-xs text-muted-foreground">Mobile</div>
                    <div className="text-sm font-bold">
                      {securityData.loginData.deviceTypes[1].percentage}%
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-muted/20 rounded-md">
                    <Tablet className="h-5 w-5 mb-1 text-amber-600" />
                    <div className="text-xs text-muted-foreground">Tablet</div>
                    <div className="text-sm font-bold">
                      {securityData.loginData.deviceTypes[2].percentage}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Подозрительные активности входа</CardTitle>
              <CardDescription>
                Необычные паттерны входа в систему
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <UserX className="h-4 w-4 mr-2 text-red-600" />
                        Множественные неудачные попытки входа
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        7 пользователей с более чем 5 неудачными попытками за последние 24 часа
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Просмотреть
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                        Входы из необычных местоположений
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        12 пользователей вошли в систему из необычного местоположения за последние 7 дней
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Просмотреть
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <Laptop className="h-4 w-4 mr-2 text-blue-600" />
                        Входы с новых устройств
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        28 пользователей вошли с новых устройств за последние 3 дня
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Просмотреть
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Диалог с деталями алерта */}
      <Dialog open={alertDetailsOpen} onOpenChange={setAlertDetailsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span>Детали алерта безопасности</span>
            </DialogTitle>
            <DialogDescription>
              {selectedAlert ? `ID: ${selectedAlert.id} - ${selectedAlert.type}` : ""}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Информация об алерте</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">ID:</div>
                      <div className="text-sm font-medium">{selectedAlert.id}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Тип:</div>
                      <div className="text-sm font-medium">{selectedAlert.type}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Серьезность:</div>
                      <div className="text-sm">
                        <SeverityBadge severity={selectedAlert.severity as 'critical' | 'high' | 'medium' | 'low'} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Время:</div>
                      <div className="text-sm font-medium">{formatDate(selectedAlert.timestamp)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Статус:</div>
                      <div className="text-sm">
                        <Badge
                          variant="outline"
                          className={
                            selectedAlert.status === "active"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }
                        >
                          {selectedAlert.status === "active" ? "Активный" : "Разрешен"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Информация о пользователе и устройстве</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Пользователь:</div>
                      <div className="text-sm font-medium">{selectedAlert.user}</div>
                    </div>
                    {selectedAlert.userId && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">ID пользователя:</div>
                        <div className="text-sm font-medium">{selectedAlert.userId}</div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">IP адрес:</div>
                      <div className="text-sm font-medium">{selectedAlert.ip}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Местоположение:</div>
                      <div className="text-sm font-medium">{selectedAlert.location}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Устройство:</div>
                      <div className="text-sm font-medium">{selectedAlert.device}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Описание</h4>
                <div className="p-3 bg-muted/30 rounded-md text-sm">
                  {selectedAlert.description}
                </div>
              </div>
              
              {selectedAlert.resolved && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Информация о разрешении</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Разрешено:</div>
                      <div className="text-sm font-medium">{formatDate(selectedAlert.resolvedAt || "")}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Кем разрешено:</div>
                      <div className="text-sm font-medium">{selectedAlert.resolvedBy}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedAlert.status === "active" && (
                <div className="border rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Рекомендуемые действия</h4>
                  <div className="space-y-2 text-sm">
                    {selectedAlert.severity === "critical" && (
                      <>
                        <p>
                          <strong>Критический уровень:</strong> Требуется немедленное внимание и реакция.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Немедленно заблокируйте затронутый аккаунт</li>
                          <li>Проверьте другие системы на признаки компрометации</li>
                          <li>Инициируйте протокол реагирования на инциденты</li>
                        </ul>
                      </>
                    )}
                    
                    {selectedAlert.severity === "high" && (
                      <>
                        <p>
                          <strong>Высокий уровень:</strong> Требуется оперативное расследование.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Свяжитесь с пользователем для подтверждения легитимности действий</li>
                          <li>Временно ограничьте доступ к критическим функциям</li>
                          <li>Проверьте последние действия пользователя в системе</li>
                        </ul>
                      </>
                    )}
                    
                    {selectedAlert.severity === "medium" && (
                      <>
                        <p>
                          <strong>Средний уровень:</strong> Требуется внимание в ближайшее время.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Проверьте последние действия пользователя</li>
                          <li>Оцените необходимость временной блокировки аккаунта</li>
                          <li>Документируйте инцидент для дальнейшего анализа</li>
                        </ul>
                      </>
                    )}
                    
                    {selectedAlert.severity === "low" && (
                      <>
                        <p>
                          <strong>Низкий уровень:</strong> Информационное уведомление.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Мониторинг дальнейшей активности</li>
                          <li>Проверка по расписанию</li>
                          <li>Добавление заметки в профиль пользователя</li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            {selectedAlert && selectedAlert.status === "active" ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setAlertDetailsOpen(false)}
                >
                  Закрыть
                </Button>
                <Button
                  onClick={() => {
                    handleResolveAlert(selectedAlert.id);
                    setAlertDetailsOpen(false);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Разрешить алерт
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => setAlertDetailsOpen(false)}
              >
                Закрыть
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}