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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CircleDollarSign,
  CheckCircle,
  XCircle,
  ClockIcon,
  Filter,
  Download,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  ArrowUpDown,
  FileText,
  AlertTriangle,
  BarChart
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Типы для депозитов
type DepositStatus = "completed" | "pending" | "failed" | "review";

// Пример данных депозитов для административной панели
const depositData = {
  recentDeposits: [
    { 
      id: 1001, 
      userId: 42,
      username: "alex_investor",
      amount: 1500.00, 
      currency: "USD", 
      method: "Bank Card", 
      status: "completed" as DepositStatus, 
      date: "2025-05-20T08:45:12Z",
      processingFee: 30.00,
      notes: "",
      verified: true,
      profile: {
        name: "Александр Петров",
        email: "alex.petrov@example.com",
        country: "Russia",
        registrationDate: "2024-11-05T15:22:42Z"
      }
    },
    { 
      id: 1002, 
      userId: 153,
      username: "maria_trade",
      amount: 5000.00, 
      currency: "USD", 
      method: "Bank Transfer", 
      status: "pending" as DepositStatus, 
      date: "2025-05-19T23:12:09Z",
      processingFee: 0.00,
      notes: "Ожидание подтверждения банковского перевода",
      verified: false,
      profile: {
        name: "Мария Иванова",
        email: "maria.ivanova@example.com",
        country: "Russia",
        registrationDate: "2024-12-15T09:11:34Z"
      }
    },
    { 
      id: 1003, 
      userId: 89,
      username: "sergey_fin",
      amount: 12500.00, 
      currency: "USD", 
      method: "Bank Transfer", 
      status: "completed" as DepositStatus, 
      date: "2025-05-19T16:30:45Z",
      processingFee: 0.00,
      notes: "",
      verified: true,
      profile: {
        name: "Сергей Васильев",
        email: "sergey.fin@example.com",
        country: "Russia",
        registrationDate: "2025-01-23T11:45:21Z"
      }
    },
    { 
      id: 1004, 
      userId: 217,
      username: "elena_trading",
      amount: 800.00, 
      currency: "USD", 
      method: "Electronic Wallet", 
      status: "failed" as DepositStatus, 
      date: "2025-05-19T14:22:18Z",
      processingFee: 16.00,
      notes: "Ошибка авторизации платежа",
      verified: true,
      profile: {
        name: "Елена Смирнова",
        email: "elena.smirnova@example.com",
        country: "Russia",
        registrationDate: "2025-02-10T17:36:08Z"
      }
    },
    { 
      id: 1005, 
      userId: 124,
      username: "dmitry_investor",
      amount: 3200.00, 
      currency: "USD", 
      method: "Bank Card", 
      status: "completed" as DepositStatus, 
      date: "2025-05-19T11:05:33Z",
      processingFee: 64.00,
      notes: "",
      verified: true,
      profile: {
        name: "Дмитрий Козлов",
        email: "dmitry.kozlov@example.com",
        country: "Russia",
        registrationDate: "2025-01-05T10:15:42Z"
      }
    },
    { 
      id: 1006, 
      userId: 376,
      username: "anna_crypto",
      amount: 2500.00, 
      currency: "USD", 
      method: "Cryptocurrency", 
      status: "pending" as DepositStatus, 
      date: "2025-05-19T09:53:27Z",
      processingFee: 25.00,
      notes: "Ожидается подтверждение блокчейна",
      verified: true,
      profile: {
        name: "Анна Морозова",
        email: "anna.morozova@example.com",
        country: "Russia",
        registrationDate: "2025-03-20T14:25:19Z"
      }
    },
    { 
      id: 1007, 
      userId: 521,
      username: "ivan_markets",
      amount: 10000.00, 
      currency: "USD", 
      method: "Bank Transfer", 
      status: "review" as DepositStatus, 
      date: "2025-05-19T08:42:11Z",
      processingFee: 0.00,
      notes: "Требуется проверка AML из-за крупной суммы",
      verified: true,
      profile: {
        name: "Иван Соколов",
        email: "ivan.sokolov@example.com",
        country: "Russia",
        registrationDate: "2024-11-14T16:34:29Z"
      }
    },
    { 
      id: 1008, 
      userId: 98,
      username: "olga_invest",
      amount: 750.00, 
      currency: "USD", 
      method: "Bank Card", 
      status: "completed" as DepositStatus, 
      date: "2025-05-18T22:15:09Z",
      processingFee: 15.00,
      notes: "",
      verified: true,
      profile: {
        name: "Ольга Новикова",
        email: "olga.novikova@example.com",
        country: "Russia",
        registrationDate: "2025-02-28T09:11:52Z"
      }
    },
    { 
      id: 1009, 
      userId: 183,
      username: "pavel_trader",
      amount: 4500.00, 
      currency: "USD", 
      method: "Electronic Wallet", 
      status: "completed" as DepositStatus, 
      date: "2025-05-18T17:49:32Z",
      processingFee: 90.00,
      notes: "",
      verified: true,
      profile: {
        name: "Павел Белов",
        email: "pavel.belov@example.com",
        country: "Russia",
        registrationDate: "2025-01-12T13:48:36Z"
      }
    },
    { 
      id: 1010, 
      userId: 309,
      username: "natalia_fin",
      amount: 1200.00, 
      currency: "USD", 
      method: "Bank Card", 
      status: "completed" as DepositStatus, 
      date: "2025-05-18T15:33:51Z",
      processingFee: 24.00,
      notes: "",
      verified: true,
      profile: {
        name: "Наталья Кузнецова",
        email: "natalia.kuznetsova@example.com",
        country: "Russia",
        registrationDate: "2025-03-05T11:22:14Z"
      }
    }
  ],
  stats: {
    totalDeposits: 1538,
    pendingDeposits: 42,
    reviewDeposits: 8,
    failedDeposits: 23,
    totalAmount: 4735500.00,
    averageDeposit: 3078.99,
    processingFees: 62458.45,
    conversionRate: 72.8
  },
  depositMethods: [
    { method: "Bank Card", count: 845, percentage: 54.9, avgAmount: 2154.32 },
    { method: "Bank Transfer", count: 412, percentage: 26.8, avgAmount: 5645.78 },
    { method: "Electronic Wallet", count: 201, percentage: 13.1, avgAmount: 1865.45 },
    { method: "Cryptocurrency", count: 80, percentage: 5.2, avgAmount: 3852.21 }
  ]
};

// Функции для работы с депозитами
interface DepositProfile {
  name: string;
  email: string;
  country: string;
  registrationDate: string;
}

interface Deposit {
  id: number;
  userId: number;
  username: string;
  amount: number;
  currency: string;
  method: string;
  status: DepositStatus;
  date: string;
  processingFee: number;
  notes: string;
  verified: boolean;
  profile: DepositProfile;
}

interface DepositStatusAction {
  status: DepositStatus;
  label: string;
  color: string;
  icon: React.ReactNode;
}

// Компонент управления депозитами
export default function DepositManagement() {
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);
  const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false);
  const [actionDialogOpen, setActionDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<DepositStatusAction | null>(null);
  
  // Статусы депозитов с информацией о цветах и иконках
  const statusConfig: Record<DepositStatus, { color: string; icon: React.ReactNode; text: string }> = {
    completed: { color: "bg-green-100 text-green-800 border-green-200", icon: <CheckCircle className="h-4 w-4" />, text: "Выполнен" },
    pending: { color: "bg-amber-100 text-amber-800 border-amber-200", icon: <ClockIcon className="h-4 w-4" />, text: "В обработке" },
    failed: { color: "bg-red-100 text-red-800 border-red-200", icon: <XCircle className="h-4 w-4" />, text: "Неудачный" },
    review: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: <AlertTriangle className="h-4 w-4" />, text: "На проверке" }
  };
  
  // Возможные действия для изменения статуса депозита
  const statusActions: DepositStatusAction[] = [
    { status: "completed", label: "Подтвердить", color: "bg-green-600 hover:bg-green-700", icon: <CheckCircle className="h-4 w-4 mr-2" /> },
    { status: "pending", label: "Отправить на обработку", color: "bg-amber-600 hover:bg-amber-700", icon: <ClockIcon className="h-4 w-4 mr-2" /> },
    { status: "failed", label: "Отклонить", color: "bg-red-600 hover:bg-red-700", icon: <XCircle className="h-4 w-4 mr-2" /> },
    { status: "review", label: "Отправить на проверку", color: "bg-blue-600 hover:bg-blue-700", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  ];
  
  // Форматирование даты и времени
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Форматирование валюты
  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Вычисление фильтрованного списка депозитов
  const filteredDeposits = depositData.recentDeposits.filter(deposit => {
    // Фильтрация по статусу
    if (filterStatus !== "all" && deposit.status !== filterStatus) {
      return false;
    }
    
    // Фильтрация по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        deposit.username.toLowerCase().includes(query) ||
        deposit.profile.name.toLowerCase().includes(query) ||
        deposit.profile.email.toLowerCase().includes(query) ||
        deposit.id.toString().includes(query)
      );
    }
    
    return true;
  });
  
  // Обработка изменения статуса депозита
  const handleStatusChange = (deposit: Deposit, newStatus: DepositStatus) => {
    setSelectedDeposit(deposit);
    const action = statusActions.find(action => action.status === newStatus);
    if (action) {
      setPendingAction(action);
      setActionDialogOpen(true);
    }
  };
  
  // Подтверждение изменения статуса
  const confirmStatusChange = () => {
    if (selectedDeposit && pendingAction) {
      // Здесь бы происходил API-запрос для изменения статуса
      toast({
        title: "Статус депозита изменен",
        description: `Депозит #${selectedDeposit.id} изменен на статус "${statusConfig[pendingAction.status].text}"`,
      });
      
      setActionDialogOpen(false);
      setPendingAction(null);
      setSelectedDeposit(null);
    }
  };
  
  // Обработка открытия диалога с деталями
  const handleViewDetails = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setEditModeEnabled(false);
    setShowDetailsDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Управление депозитами</h2>
          <p className="text-muted-foreground">
            Управление и мониторинг депозитов пользователей
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart className="h-4 w-4 mr-2" />
            Отчеты
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Всего депозитов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {depositData.stats.totalDeposits.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              На сумму {formatCurrency(depositData.stats.totalAmount)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Ожидают обработки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {depositData.stats.pendingDeposits.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {depositData.stats.pendingDeposits > 0 ? "Требуют внимания" : "Нет ожидающих депозитов"}
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
              {formatCurrency(depositData.stats.averageDeposit)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              За всё время
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Комиссии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(depositData.stats.processingFees)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Общие комиссии за обработку
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, ID или email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все депозиты</SelectItem>
                <SelectItem value="completed">Выполненные</SelectItem>
                <SelectItem value="pending">В обработке</SelectItem>
                <SelectItem value="review">На проверке</SelectItem>
                <SelectItem value="failed">Неудачные</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Расширенный фильтр
            </Button>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Метод</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell className="font-medium">{deposit.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{deposit.username}</span>
                          <span className="text-xs text-muted-foreground">{deposit.profile.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(deposit.amount)}</TableCell>
                      <TableCell>{deposit.method}</TableCell>
                      <TableCell>{formatDateTime(deposit.date)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusConfig[deposit.status].color}>
                          <div className="flex items-center gap-1">
                            {statusConfig[deposit.status].icon}
                            <span>{statusConfig[deposit.status].text}</span>
                          </div>
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
                                  onClick={() => handleViewDetails(deposit)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Просмотр деталей</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Действия</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(deposit)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Просмотреть детали
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setSelectedDeposit(deposit);
                                setEditModeEnabled(true);
                                setShowDetailsDialog(true);
                              }}>
                                <Edit className="h-4 w-4 mr-2" />
                                Редактировать
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {deposit.status !== "completed" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(deposit, "completed")}>
                                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                  Подтвердить
                                </DropdownMenuItem>
                              )}
                              {deposit.status !== "pending" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(deposit, "pending")}>
                                  <ClockIcon className="h-4 w-4 mr-2 text-amber-600" />
                                  Отправить на обработку
                                </DropdownMenuItem>
                              )}
                              {deposit.status !== "review" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(deposit, "review")}>
                                  <AlertTriangle className="h-4 w-4 mr-2 text-blue-600" />
                                  Отправить на проверку
                                </DropdownMenuItem>
                              )}
                              {deposit.status !== "failed" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(deposit, "failed")}>
                                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                  Отклонить
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-6">
            <div className="text-sm text-muted-foreground">
              Показано <strong>{filteredDeposits.length}</strong> из <strong>{depositData.recentDeposits.length}</strong> депозитов
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Предыдущая
              </Button>
              <Button variant="outline" size="sm">
                Следующая
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Диалог с деталями депозита */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {editModeEnabled ? "Редактирование депозита" : "Детали депозита"}
              {selectedDeposit && <span className="ml-2 text-muted-foreground">#{selectedDeposit.id}</span>}
            </DialogTitle>
            <DialogDescription>
              {editModeEnabled 
                ? "Внесите необходимые изменения в информацию о депозите." 
                : "Подробная информация о депозите и связанном пользователе."}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDeposit && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Информация о депозите</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">ID:</div>
                      <div className="text-sm font-medium">{selectedDeposit.id}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Сумма:</div>
                      <div className="text-sm font-medium">{formatCurrency(selectedDeposit.amount)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Метод:</div>
                      <div className="text-sm font-medium">{selectedDeposit.method}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Комиссия:</div>
                      <div className="text-sm font-medium">{formatCurrency(selectedDeposit.processingFee)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Дата:</div>
                      <div className="text-sm font-medium">{formatDateTime(selectedDeposit.date)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Статус:</div>
                      <div className="text-sm">
                        <Badge variant="outline" className={statusConfig[selectedDeposit.status].color}>
                          <div className="flex items-center gap-1">
                            {statusConfig[selectedDeposit.status].icon}
                            <span>{statusConfig[selectedDeposit.status].text}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                    {editModeEnabled ? (
                      <div className="col-span-2 pt-2">
                        <label className="text-sm font-medium">Примечания:</label>
                        <Input
                          value={selectedDeposit.notes}
                          className="mt-1"
                          placeholder="Добавьте комментарий к депозиту..."
                        />
                      </div>
                    ) : selectedDeposit.notes ? (
                      <div className="col-span-2 pt-2">
                        <div className="text-sm text-muted-foreground">Примечания:</div>
                        <div className="text-sm mt-1 p-2 bg-muted/30 rounded-md">
                          {selectedDeposit.notes}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Информация о пользователе</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">ID пользователя:</div>
                      <div className="text-sm font-medium">{selectedDeposit.userId}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Имя пользователя:</div>
                      <div className="text-sm font-medium">{selectedDeposit.username}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Полное имя:</div>
                      <div className="text-sm font-medium">{selectedDeposit.profile.name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Email:</div>
                      <div className="text-sm font-medium">{selectedDeposit.profile.email}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Страна:</div>
                      <div className="text-sm font-medium">{selectedDeposit.profile.country}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Дата регистрации:</div>
                      <div className="text-sm font-medium">{formatDateTime(selectedDeposit.profile.registrationDate)}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Верификация:</div>
                      <div className="text-sm font-medium">
                        {selectedDeposit.verified ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Верифицирован
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Не верифицирован
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {!editModeEnabled && (
                <div className="border rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Изменить статус депозита</h4>
                  <div className="flex flex-wrap gap-2">
                    {statusActions.filter(action => action.status !== selectedDeposit.status).map((action) => (
                      <Button
                        key={action.status}
                        variant="outline"
                        className={`text-white ${action.color}`}
                        onClick={() => handleStatusChange(selectedDeposit, action.status)}
                      >
                        {action.icon}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            {editModeEnabled ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditModeEnabled(false);
                    // Здесь можно добавить логику сброса изменений
                  }}
                >
                  Отмена
                </Button>
                <Button onClick={() => {
                  // Здесь должна быть логика сохранения изменений
                  toast({
                    title: "Депозит обновлен",
                    description: `Депозит #${selectedDeposit?.id} успешно обновлен`,
                  });
                  setEditModeEnabled(false);
                  setShowDetailsDialog(false);
                }}>
                  Сохранить изменения
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDetailsDialog(false);
                  }}
                >
                  Закрыть
                </Button>
                <Button
                  onClick={() => {
                    setEditModeEnabled(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог подтверждения действия */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Подтверждение действия</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите изменить статус депозита?
            </DialogDescription>
          </DialogHeader>
          
          {selectedDeposit && pendingAction && (
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">ID депозита:</span>
                  <span className="font-bold">{selectedDeposit.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Пользователь:</span>
                  <span>{selectedDeposit.username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Сумма:</span>
                  <span>{formatCurrency(selectedDeposit.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Текущий статус:</span>
                  <Badge variant="outline" className={statusConfig[selectedDeposit.status].color}>
                    <div className="flex items-center gap-1">
                      {statusConfig[selectedDeposit.status].icon}
                      <span>{statusConfig[selectedDeposit.status].text}</span>
                    </div>
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Новый статус:</span>
                  <Badge variant="outline" className={statusConfig[pendingAction.status].color}>
                    <div className="flex items-center gap-1">
                      {statusConfig[pendingAction.status].icon}
                      <span>{statusConfig[pendingAction.status].text}</span>
                    </div>
                  </Badge>
                </div>
              </div>
              
              {pendingAction.status === "failed" && (
                <div className="mt-4 p-3 border rounded-md bg-red-50">
                  <h4 className="text-sm font-medium text-red-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Внимание!
                  </h4>
                  <p className="text-sm text-red-600">
                    Отклонение депозита приведет к тому, что средства не будут зачислены на счет пользователя.
                    Если средства уже были получены, их необходимо будет вернуть.
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setActionDialogOpen(false);
                setPendingAction(null);
              }}
            >
              Отмена
            </Button>
            <Button
              variant="default"
              onClick={confirmStatusChange}
              className={pendingAction?.color}
            >
              {pendingAction?.icon}
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}