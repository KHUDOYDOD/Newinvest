import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  ChevronDown,
  Calendar as CalendarIcon,
  FileText,
  Download,
  FileSpreadsheet,
  File as FilePdf,
  History,
  RefreshCw,
  Clock,
  Mail,
  Share2,
  Settings,
  Plus,
  CheckCircle2,
  AlertCircle,
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  Search
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

// Пример данных для отчетов
const reportingData = {
  templates: [
    {
      id: "daily-activity",
      name: "Ежедневная активность",
      description: "Отчет о пользовательской активности за день",
      lastGenerated: "2025-05-19T18:30:45Z",
      schedule: "daily",
      format: "excel",
      icon: <BarChart className="h-5 w-5" />,
      recipients: ["finance@example.com", "ceo@example.com"]
    },
    {
      id: "weekly-deposits",
      name: "Еженедельные депозиты",
      description: "Суммарная информация о депозитах за неделю",
      lastGenerated: "2025-05-18T12:15:22Z",
      schedule: "weekly",
      format: "pdf",
      icon: <LineChart className="h-5 w-5" />,
      recipients: ["finance@example.com"]
    },
    {
      id: "monthly-revenue",
      name: "Ежемесячный доход",
      description: "Подробный отчет о доходах и расходах за месяц",
      lastGenerated: "2025-04-30T23:59:00Z",
      schedule: "monthly",
      format: "excel",
      icon: <PieChart className="h-5 w-5" />,
      recipients: ["board@example.com", "finance@example.com", "ceo@example.com"]
    },
    {
      id: "user-retention",
      name: "Удержание пользователей",
      description: "Отчет об удержании пользователей и показателях оттока",
      lastGenerated: "2025-05-15T16:45:12Z",
      schedule: "weekly",
      format: "pdf",
      icon: <LineChart className="h-5 w-5" />,
      recipients: ["marketing@example.com", "product@example.com"]
    },
    {
      id: "conversion-funnel",
      name: "Воронка конверсии",
      description: "Анализ воронки конверсии пользователей",
      lastGenerated: "2025-05-14T09:20:36Z",
      schedule: "weekly",
      format: "excel",
      icon: <BarChart className="h-5 w-5" />,
      recipients: ["marketing@example.com", "product@example.com"]
    }
  ],
  recentReports: [
    {
      id: "rpt-2025-0587",
      name: "Ежедневная активность",
      generatedAt: "2025-05-20T18:30:45Z",
      generatedBy: "System",
      format: "excel",
      size: "1.2 MB",
      status: "completed",
      url: "#"
    },
    {
      id: "rpt-2025-0586",
      name: "Еженедельные депозиты",
      generatedAt: "2025-05-20T15:22:18Z",
      generatedBy: "Admin",
      format: "pdf",
      size: "3.5 MB",
      status: "completed",
      url: "#"
    },
    {
      id: "rpt-2025-0585",
      name: "Специальный отчет: Крупные депозиты",
      generatedAt: "2025-05-20T12:42:09Z",
      generatedBy: "Admin",
      format: "excel",
      size: "2.1 MB",
      status: "completed",
      url: "#"
    },
    {
      id: "rpt-2025-0584",
      name: "Анализ пользовательских сегментов",
      generatedAt: "2025-05-20T10:15:33Z",
      generatedBy: "Admin",
      format: "pdf",
      size: "4.8 MB",
      status: "completed",
      url: "#"
    },
    {
      id: "rpt-2025-0583",
      name: "Ежедневная активность",
      generatedAt: "2025-05-19T18:30:45Z",
      generatedBy: "System",
      format: "excel",
      size: "1.1 MB",
      status: "completed",
      url: "#"
    }
  ],
  scheduledReports: [
    {
      id: "scheduler-daily-activity",
      name: "Ежедневная активность",
      schedule: "Ежедневно в 18:30",
      nextRun: "2025-05-21T18:30:00Z",
      recipients: ["finance@example.com", "ceo@example.com"],
      format: "excel",
      status: "active"
    },
    {
      id: "scheduler-weekly-deposits",
      name: "Еженедельные депозиты",
      schedule: "Еженедельно в понедельник 12:00",
      nextRun: "2025-05-26T12:00:00Z",
      recipients: ["finance@example.com"],
      format: "pdf",
      status: "active"
    },
    {
      id: "scheduler-monthly-revenue",
      name: "Ежемесячный доход",
      schedule: "Ежемесячно в последний день месяца 23:59",
      nextRun: "2025-05-31T23:59:00Z",
      recipients: ["board@example.com", "finance@example.com", "ceo@example.com"],
      format: "excel",
      status: "active"
    }
  ],
  dashboardData: {
    reportsGenerated: {
      thisMonth: 87,
      lastMonth: 75,
      growth: 16
    },
    mostPopularReports: [
      { name: "Ежедневная активность", count: 31 },
      { name: "Еженедельные депозиты", count: 18 },
      { name: "Воронка конверсии", count: 12 },
      { name: "Ежемесячный доход", count: 9 },
      { name: "Удержание пользователей", count: 8 }
    ],
    formatDistribution: [
      { name: "Excel", value: 65 },
      { name: "PDF", value: 30 },
      { name: "CSV", value: 5 }
    ],
    reportsByDay: [
      { date: "14.05", count: 4 },
      { date: "15.05", count: 6 },
      { date: "16.05", count: 5 },
      { date: "17.05", count: 3 },
      { date: "18.05", count: 7 },
      { date: "19.05", count: 5 },
      { date: "20.05", count: 4 }
    ]
  },
  customReportOptions: {
    dataSources: [
      { id: "users", name: "Пользователи", fields: ["id", "username", "firstName", "lastName", "email", "registrationDate", "status", "balance", "refCode"] },
      { id: "deposits", name: "Депозиты", fields: ["id", "userId", "amount", "currency", "method", "status", "createdAt"] },
      { id: "transactions", name: "Транзакции", fields: ["id", "userId", "type", "amount", "status", "description", "createdAt"] },
      { id: "referrals", name: "Рефералы", fields: ["id", "referrerId", "referredId", "createdAt", "commission"] }
    ],
    timeRanges: [
      { id: "today", name: "Сегодня" },
      { id: "yesterday", name: "Вчера" },
      { id: "thisWeek", name: "Текущая неделя" },
      { id: "lastWeek", name: "Прошлая неделя" },
      { id: "thisMonth", name: "Текущий месяц" },
      { id: "lastMonth", name: "Прошлый месяц" },
      { id: "last3Months", name: "Последние 3 месяца" },
      { id: "lastYear", name: "Последний год" },
      { id: "custom", name: "Произвольный период" }
    ],
    formats: [
      { id: "excel", name: "Excel (.xlsx)", icon: <FileSpreadsheet className="h-4 w-4 mr-2" /> },
      { id: "pdf", name: "PDF (.pdf)", icon: <FilePdf className="h-4 w-4 mr-2" /> },
      { id: "csv", name: "CSV (.csv)", icon: <FileText className="h-4 w-4 mr-2" /> }
    ],
    visualizations: [
      { id: "table", name: "Таблица", icon: <FileText className="h-4 w-4 mr-2" /> },
      { id: "bar", name: "Столбчатая диаграмма", icon: <BarChart className="h-4 w-4 mr-2" /> },
      { id: "line", name: "Линейная диаграмма", icon: <LineChart className="h-4 w-4 mr-2" /> },
      { id: "pie", name: "Круговая диаграмма", icon: <PieChart className="h-4 w-4 mr-2" /> }
    ],
    aggregations: [
      { id: "sum", name: "Сумма" },
      { id: "avg", name: "Среднее" },
      { id: "min", name: "Минимум" },
      { id: "max", name: "Максимум" },
      { id: "count", name: "Количество" }
    ],
    filters: [
      { id: "status", name: "Статус", type: "select", options: ["active", "pending", "completed", "failed"] },
      { id: "amount", name: "Сумма", type: "range" },
      { id: "date", name: "Дата", type: "date" }
    ]
  }
};

// Компонент для значка статуса отчета
interface ReportStatusBadgeProps {
  status: string;
}

const ReportStatusBadge = ({ status }: ReportStatusBadgeProps) => {
  const config = {
    completed: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />
    },
    pending: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Clock className="h-3.5 w-3.5" />
    },
    failed: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertCircle className="h-3.5 w-3.5" />
    }
  };

  const statusInfo = config[status as keyof typeof config] || config.pending;

  return (
    <Badge variant="outline" className={statusInfo.color}>
      <div className="flex items-center gap-1">
        {statusInfo.icon}
        <span className="capitalize">
          {status === "completed" ? "Готов" : 
           status === "pending" ? "В процессе" : 
           status === "failed" ? "Ошибка" : status}
        </span>
      </div>
    </Badge>
  );
};

// Компонент для значка формата файла
interface FileFormatBadgeProps {
  format: string;
}

const FileFormatBadge = ({ format }: FileFormatBadgeProps) => {
  const config = {
    excel: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <FileSpreadsheet className="h-3.5 w-3.5" />
    },
    pdf: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <FilePdf className="h-3.5 w-3.5" />
    },
    csv: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <FileText className="h-3.5 w-3.5" />
    }
  };

  const formatInfo = config[format as keyof typeof config] || config.excel;

  return (
    <Badge variant="outline" className={formatInfo.color}>
      <div className="flex items-center gap-1">
        {formatInfo.icon}
        <span className="uppercase">{format}</span>
      </div>
    </Badge>
  );
};

// Основной компонент модуля отчетов
export default function ReportGenerator() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [generatingReport, setGeneratingReport] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  
  // Состояние для создания пользовательского отчета
  const [customReport, setCustomReport] = useState({
    name: "",
    description: "",
    dataSource: "",
    fields: [] as string[],
    timeRange: "thisMonth",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    format: "excel",
    visualization: "table",
    aggregation: "",
    filters: [] as any[],
    groupBy: "",
    sortBy: "",
    limit: 100
  });
  
  // Функция для форматирования даты
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
  
  // Симуляция генерации отчета
  const handleGenerateReport = (templateId: string) => {
    const template = reportingData.templates.find(t => t.id === templateId);
    if (!template) return;
    
    setGeneratingReport(true);
    
    // Симуляция процесса генерации
    setTimeout(() => {
      setGeneratingReport(false);
      
      toast({
        title: "Отчет сгенерирован",
        description: `Отчет "${template.name}" успешно сгенерирован и готов к загрузке.`,
      });
    }, 2500);
  };
  
  // Изменение выбранных полей для пользовательского отчета
  const handleFieldChange = (field: string) => {
    const fields = [...customReport.fields];
    const index = fields.indexOf(field);
    
    if (index !== -1) {
      fields.splice(index, 1);
    } else {
      fields.push(field);
    }
    
    setCustomReport({
      ...customReport,
      fields
    });
  };
  
  // Получение доступных полей для выбранного источника данных
  const getAvailableFields = () => {
    const dataSource = reportingData.customReportOptions.dataSources.find(
      ds => ds.id === customReport.dataSource
    );
    return dataSource ? dataSource.fields : [];
  };
  
  // Обработка создания пользовательского отчета
  const handleCreateCustomReport = () => {
    // Здесь была бы реальная логика создания отчета
    setGeneratingReport(true);
    
    // Симуляция процесса генерации
    setTimeout(() => {
      setGeneratingReport(false);
      
      toast({
        title: "Отчет сгенерирован",
        description: `Пользовательский отчет "${customReport.name}" успешно сгенерирован.`,
      });
    }, 3000);
  };
  
  // Информация о цветах для диаграмм
  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Генератор отчетов</h2>
          <p className="text-muted-foreground">
            Создание, управление и просмотр отчетов системы
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новый отчет
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="dashboard" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Дашборд</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Шаблоны отчетов</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>История отчетов</span>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Расписание</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Конструктор</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Дашборд */}
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-muted-foreground">
                  Сгенерировано отчетов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reportingData.dashboardData.reportsGenerated.thisMonth}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`flex items-center ${
                    reportingData.dashboardData.reportsGenerated.growth >= 0 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {reportingData.dashboardData.reportsGenerated.growth >= 0 
                      ? <ArrowUpRight className="h-4 w-4" />
                      : <ArrowDownRight className="h-4 w-4" />
                    }
                    <span className="text-sm">
                      {Math.abs(reportingData.dashboardData.reportsGenerated.growth)}%
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    по сравнению с прошлым месяцем
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Отчеты по дням</CardTitle>
                <CardDescription>
                  Количество сгенерированных отчетов за последнюю неделю
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={reportingData.dashboardData.reportsByDay}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <RechartsTooltip 
                        formatter={(value) => [`${value} отчетов`, "Количество"]}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="#4f46e5" 
                        radius={[4, 4, 0, 0]} 
                        name="Отчеты"
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Популярные отчеты</CardTitle>
                <CardDescription>
                  Наиболее часто генерируемые отчеты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportingData.dashboardData.mostPopularReports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-sm w-6 text-center">
                          #{index + 1}
                        </span>
                        <span>{report.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={report.count} 
                          max={reportingData.dashboardData.mostPopularReports[0].count} 
                          className="h-2 w-24" 
                        />
                        <span className="text-sm font-medium">{report.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Распределение форматов</CardTitle>
                <CardDescription>
                  Популярность различных форматов отчетов
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={reportingData.dashboardData.formatDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {reportingData.dashboardData.formatDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Недавние отчеты</CardTitle>
              <CardDescription>
                Последние сгенерированные отчеты
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Время создания</TableHead>
                      <TableHead>Формат</TableHead>
                      <TableHead>Размер</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportingData.recentReports.slice(0, 3).map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{formatDate(report.generatedAt)}</TableCell>
                        <TableCell>
                          <FileFormatBadge format={report.format} />
                        </TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <ReportStatusBadge status={report.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Скачать
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("history")}>
                  Посмотреть все отчеты
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Шаблоны отчетов */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportingData.templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {template.icon}
                      <div>
                        <CardTitle>{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                    <FileFormatBadge format={template.format} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Последняя генерация:</span>
                      <span className="text-sm">{formatDate(template.lastGenerated)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Расписание:</span>
                      <span className="text-sm capitalize">
                        {template.schedule === "daily" ? "Ежедневно" :
                         template.schedule === "weekly" ? "Еженедельно" :
                         template.schedule === "monthly" ? "Ежемесячно" : template.schedule}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Получатели:</span>
                      <span className="text-sm">{template.recipients.length}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPreviewDialogOpen(true)}
                  >
                    Предпросмотр
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleGenerateReport(template.id)}
                    disabled={generatingReport}
                  >
                    {generatingReport ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Генерация...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Сгенерировать
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full py-8 border-dashed"
            onClick={() => setActiveTab("custom")}
          >
            <Plus className="h-5 w-5 mr-2" />
            Создать новый шаблон отчета
          </Button>
        </TabsContent>
        
        {/* История отчетов */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                  <CardTitle>История отчетов</CardTitle>
                  <CardDescription>
                    Все сгенерированные отчеты
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск отчетов..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP", { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Время создания</TableHead>
                      <TableHead>Кем создан</TableHead>
                      <TableHead>Формат</TableHead>
                      <TableHead>Размер</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportingData.recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{formatDate(report.generatedAt)}</TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell>
                          <FileFormatBadge format={report.format} />
                        </TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <ReportStatusBadge status={report.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Страница 1 из 3
                </div>
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
                >
                  Следующая
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Расписание */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Запланированные отчеты</CardTitle>
                  <CardDescription>
                    Отчеты с автоматической генерацией по расписанию
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить расписание
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Расписание</TableHead>
                      <TableHead>Следующий запуск</TableHead>
                      <TableHead>Получатели</TableHead>
                      <TableHead>Формат</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportingData.scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.schedule}</TableCell>
                        <TableCell>{formatDate(report.nextRun)}</TableCell>
                        <TableCell>{report.recipients.length} получателей</TableCell>
                        <TableCell>
                          <FileFormatBadge format={report.format} />
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            Активно
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Настройка уведомлений</CardTitle>
              <CardDescription>
                Управление способами доставки отчетов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email-уведомления
                    </h4>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-200"
                    >
                      Активно
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Отправка отчетов на указанные email-адреса
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                    <Button variant="outline" size="sm">
                      Тестовое сообщение
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Интеграция API
                    </h4>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 border-amber-200"
                    >
                      Настройка
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Передача отчетов через API в другие системы
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                    <Button variant="outline" size="sm">
                      Документация API
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Автоматическое сохранение
                    </h4>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-200"
                    >
                      Активно
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Автоматическое сохранение отчетов в системе с доступом из личного кабинета
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Конструктор отчетов */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Конструктор отчетов</CardTitle>
              <CardDescription>
                Создание пользовательского отчета с выбором параметров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    Основная информация
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportName">Название отчета</Label>
                      <Input 
                        id="reportName" 
                        placeholder="Введите название отчета"
                        value={customReport.name}
                        onChange={(e) => setCustomReport({...customReport, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportDescription">Описание (опционально)</Label>
                      <Input 
                        id="reportDescription" 
                        placeholder="Краткое описание отчета"
                        value={customReport.description}
                        onChange={(e) => setCustomReport({...customReport, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-1">
                    Источник данных и поля
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataSource">Источник данных</Label>
                      <Select
                        value={customReport.dataSource}
                        onValueChange={(value) => setCustomReport({...customReport, dataSource: value, fields: []})}
                      >
                        <SelectTrigger id="dataSource">
                          <SelectValue placeholder="Выберите источник данных" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportingData.customReportOptions.dataSources.map((source) => (
                            <SelectItem key={source.id} value={source.id}>
                              {source.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Выберите поля</Label>
                      {customReport.dataSource ? (
                        <div className="border rounded-md p-3 h-40 overflow-y-auto">
                          <div className="space-y-2">
                            {getAvailableFields().map((field) => (
                              <div key={field} className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  id={`field-${field}`}
                                  checked={customReport.fields.includes(field)}
                                  onChange={() => handleFieldChange(field)}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label 
                                  htmlFor={`field-${field}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {field}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="border rounded-md p-4 text-center text-muted-foreground">
                          Сначала выберите источник данных
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Период данных</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeRange">Временной диапазон</Label>
                      <Select
                        value={customReport.timeRange}
                        onValueChange={(value) => setCustomReport({...customReport, timeRange: value})}
                      >
                        <SelectTrigger id="timeRange">
                          <SelectValue placeholder="Выберите временной диапазон" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportingData.customReportOptions.timeRanges.map((range) => (
                            <SelectItem key={range.id} value={range.id}>
                              {range.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {customReport.timeRange === "custom" && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Начальная дата</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {customReport.startDate ? (
                                  format(customReport.startDate, "PPP", { locale: ru })
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={customReport.startDate}
                                onSelect={(date) => setCustomReport({...customReport, startDate: date})}
                                locale={ru}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Конечная дата</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {customReport.endDate ? (
                                  format(customReport.endDate, "PPP", { locale: ru })
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={customReport.endDate}
                                onSelect={(date) => setCustomReport({...customReport, endDate: date})}
                                locale={ru}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Формат и визуализация</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="format">Формат отчета</Label>
                      <Select
                        value={customReport.format}
                        onValueChange={(value) => setCustomReport({...customReport, format: value})}
                      >
                        <SelectTrigger id="format">
                          <SelectValue placeholder="Выберите формат" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportingData.customReportOptions.formats.map((format) => (
                            <SelectItem key={format.id} value={format.id}>
                              <div className="flex items-center gap-2">
                                {format.icon}
                                <span>{format.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="visualization">Визуализация</Label>
                      <Select
                        value={customReport.visualization}
                        onValueChange={(value) => setCustomReport({...customReport, visualization: value})}
                      >
                        <SelectTrigger id="visualization">
                          <SelectValue placeholder="Выберите тип визуализации" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportingData.customReportOptions.visualizations.map((viz) => (
                            <SelectItem key={viz.id} value={viz.id}>
                              <div className="flex items-center gap-2">
                                {viz.icon}
                                <span>{viz.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="aggregation">Агрегация (опционально)</Label>
                      <Select
                        value={customReport.aggregation}
                        onValueChange={(value) => setCustomReport({...customReport, aggregation: value})}
                      >
                        <SelectTrigger id="aggregation">
                          <SelectValue placeholder="Выберите агрегацию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Без агрегации</SelectItem>
                          {reportingData.customReportOptions.aggregations.map((agg) => (
                            <SelectItem key={agg.id} value={agg.id}>
                              {agg.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Дополнительные параметры</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupBy">Группировка (опционально)</Label>
                      <Select
                        value={customReport.groupBy}
                        onValueChange={(value) => setCustomReport({...customReport, groupBy: value})}
                        disabled={!customReport.dataSource}
                      >
                        <SelectTrigger id="groupBy">
                          <SelectValue placeholder="Выберите поле для группировки" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Без группировки</SelectItem>
                          {getAvailableFields().map((field) => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sortBy">Сортировка (опционально)</Label>
                      <Select
                        value={customReport.sortBy}
                        onValueChange={(value) => setCustomReport({...customReport, sortBy: value})}
                        disabled={!customReport.dataSource}
                      >
                        <SelectTrigger id="sortBy">
                          <SelectValue placeholder="Выберите поле для сортировки" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Без сортировки</SelectItem>
                          {getAvailableFields().map((field) => (
                            <SelectItem key={field} value={field}>
                              {field}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Автоматизация (опционально)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emailRecipients">Получатели по email</Label>
                      <Textarea 
                        id="emailRecipients" 
                        placeholder="Введите email-адреса через запятую"
                        className="h-20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Расписание</Label>
                      <Select>
                        <SelectTrigger id="schedule">
                          <SelectValue placeholder="Выберите расписание" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Без расписания</SelectItem>
                          <SelectItem value="daily">Ежедневно</SelectItem>
                          <SelectItem value="weekly">Еженедельно</SelectItem>
                          <SelectItem value="monthly">Ежемесячно</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Оставьте пустым, если отчет генерируется только вручную
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("templates")}>
                Отмена
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setPreviewDialogOpen(true)}>
                  Предпросмотр
                </Button>
                <Button 
                  onClick={handleCreateCustomReport}
                  disabled={!customReport.name || !customReport.dataSource || customReport.fields.length === 0 || generatingReport}
                >
                  {generatingReport ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Создать отчет
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Диалоговое окно предпросмотра отчета */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Предпросмотр отчета</DialogTitle>
            <DialogDescription>
              Пример того, как будет выглядеть сгенерированный отчет
            </DialogDescription>
          </DialogHeader>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-medium">
                  {customReport.name || "Пример отчета"}
                </h3>
              </div>
              <FileFormatBadge format={customReport.format || "excel"} />
            </div>
            
            <div className="p-4">
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Имя пользователя</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead className="text-right">Баланс</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">1</TableCell>
                      <TableCell>user1</TableCell>
                      <TableCell>user1@example.com</TableCell>
                      <TableCell>01.05.2025</TableCell>
                      <TableCell className="text-right">$1,250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2</TableCell>
                      <TableCell>user2</TableCell>
                      <TableCell>user2@example.com</TableCell>
                      <TableCell>02.05.2025</TableCell>
                      <TableCell className="text-right">$875.50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">3</TableCell>
                      <TableCell>user3</TableCell>
                      <TableCell>user3@example.com</TableCell>
                      <TableCell>05.05.2025</TableCell>
                      <TableCell className="text-right">$2,340.75</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">4</TableCell>
                      <TableCell>user4</TableCell>
                      <TableCell>user4@example.com</TableCell>
                      <TableCell>08.05.2025</TableCell>
                      <TableCell className="text-right">$560.25</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">5</TableCell>
                      <TableCell>user5</TableCell>
                      <TableCell>user5@example.com</TableCell>
                      <TableCell>12.05.2025</TableCell>
                      <TableCell className="text-right">$1,840.30</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {customReport.visualization === "bar" && (
                <div className="mt-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={[
                        { name: "user1", balance: 1250 },
                        { name: "user2", balance: 875.5 },
                        { name: "user3", balance: 2340.75 },
                        { name: "user4", balance: 560.25 },
                        { name: "user5", balance: 1840.3 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => [`$${value}`, "Баланс"]} />
                      <Bar dataKey="balance" fill="#4f46e5" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {customReport.visualization === "line" && (
                <div className="mt-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={[
                        { name: "user1", balance: 1250 },
                        { name: "user2", balance: 875.5 },
                        { name: "user3", balance: 2340.75 },
                        { name: "user4", balance: 560.25 },
                        { name: "user5", balance: 1840.3 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => [`$${value}`, "Баланс"]} />
                      <Line type="monotone" dataKey="balance" stroke="#4f46e5" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {customReport.visualization === "pie" && (
                <div className="mt-6 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "user1", value: 1250 },
                          { name: "user2", value: 875.5 },
                          { name: "user3", value: 2340.75 },
                          { name: "user4", value: 560.25 },
                          { name: "user5", value: 1840.3 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1, 2, 3, 4].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => [`$${value}`, "Баланс"]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  Эта страница отображает предварительный просмотр отчета с примерными данными.
                  Фактический отчет будет содержать реальные данные согласно выбранным параметрам.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPreviewDialogOpen(false)}
            >
              Закрыть
            </Button>
            <Button>Сгенерировать реальный отчет</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}