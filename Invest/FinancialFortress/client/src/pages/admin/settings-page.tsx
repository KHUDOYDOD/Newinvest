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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Save,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Wrench,
  Database,
  Mail,
  Globe,
  ServerCrash,
  FileText,
  BarChart4,
  ShieldCheck,
  PercentSquare,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

// Определяем схему для формы настроек
const settingSchema = z.object({
  siteTitle: z.string().min(1, "Укажите название сайта"),
  siteDescription: z.string().min(1, "Укажите описание сайта"),
  contactEmail: z.string().email("Укажите корректный email"),
  maintenanceMode: z.boolean().default(false),
  referralPercent: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите числовое значение"
  }),
  cryptoEnabled: z.boolean().default(true),
  cardEnabled: z.boolean().default(true),
  depositMinAmount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите числовое значение"
  }),
  withdrawMinAmount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите числовое значение"
  }),
  plan1Rate: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите числовое значение"
  }),
  plan2Rate: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите числовое значение"
  }),
  plan3Rate: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите числовое значение"
  }),
});

// Тип настроек из схемы
type SettingsFormValues = z.infer<typeof settingSchema>;

// Тип сообщения системного лога
interface LogMessage {
  id: number;
  timestamp: string;
  level: "info" | "warning" | "error";
  message: string;
  details?: string;
}

// Фиктивные данные для системных логов
const logMessages: LogMessage[] = [
  {
    id: 1,
    timestamp: "2025-05-14 12:15:44",
    level: "info",
    message: "Пользователь Admin вошел в систему",
    details: "IP: 192.168.1.1, User-Agent: Mozilla/5.0"
  },
  {
    id: 2,
    timestamp: "2025-05-14 12:16:12",
    level: "info",
    message: "Создан новый депозит",
    details: "Пользователь: Admin, Сумма: $100.00, Тариф: 5%"
  },
  {
    id: 3,
    timestamp: "2025-05-14 12:30:55",
    level: "warning",
    message: "Неудачная попытка входа",
    details: "Пользователь: User123, IP: 192.168.1.52"
  },
  {
    id: 4,
    timestamp: "2025-05-14 12:45:23",
    level: "error",
    message: "Ошибка при обработке платежа",
    details: "Транзакция #45862, Ошибка: Network timeout"
  }
];

export default function SettingsPage() {
  const { toast } = useToast();
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Используем значения по умолчанию для формы
  const defaultValues: SettingsFormValues = {
    siteTitle: "ИнвестПро - Инвестиционная платформа",
    siteDescription: "Инвестиционная платформа с высокими процентами доходности",
    contactEmail: "admin@investpro.ru",
    maintenanceMode: false,
    referralPercent: "5",
    cryptoEnabled: true,
    cardEnabled: true,
    depositMinAmount: "100",
    withdrawMinAmount: "10",
    plan1Rate: "5",
    plan2Rate: "10",
    plan3Rate: "15",
  };

  // Настраиваем форму
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingSchema),
    defaultValues,
  });

  // Мутация для сохранения настроек
  const saveSettingsMutation = useMutation({
    mutationFn: async (settings: SettingsFormValues) => {
      const res = await apiRequest("POST", "/api/admin/settings", settings);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Настройки сохранены",
        description: "Все изменения успешно применены",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка сохранения",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    saveSettingsMutation.mutate(values);
  };

  // Мутация для создания резервной копии
  const createBackupMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/backup", {});
      return await res.json();
    },
    onSuccess: () => {
      setIsBackupDialogOpen(false);
      toast({
        title: "Резервная копия создана",
        description: "Резервная копия данных создана успешно",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка создания резервной копии",
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
            <h1 className="text-2xl font-bold">Настройки системы</h1>
            <p className="text-muted-foreground">
              Управление параметрами и конфигурацией платформы
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="general">
              <Globe className="mr-2 h-4 w-4" />
              Основные
            </TabsTrigger>
            <TabsTrigger value="finance">
              <PercentSquare className="mr-2 h-4 w-4" />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="system">
              <Wrench className="mr-2 h-4 w-4" />
              Система
            </TabsTrigger>
            <TabsTrigger value="logs">
              <FileText className="mr-2 h-4 w-4" />
              Логи
            </TabsTrigger>
          </TabsList>

          {/* Вкладка общих настроек */}
          <TabsContent value="general">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Основные настройки</CardTitle>
                    <CardDescription>
                      Настройте основные параметры вашей платформы
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="siteTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название сайта</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Отображается в заголовке страницы и на панели навигации
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Описание сайта</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={3} />
                          </FormControl>
                          <FormDescription>
                            Краткое описание для мета-тегов и SEO
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Контактный email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormDescription>
                            Email для связи и получения уведомлений
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Режим обслуживания
                            </FormLabel>
                            <FormDescription>
                              При включении сайт будет доступен только администраторам
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      type="submit"
                      className="gap-2"
                      disabled={saveSettingsMutation.isPending}
                    >
                      {saveSettingsMutation.isPending ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>

          {/* Вкладка финансовых настроек */}
          <TabsContent value="finance">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Финансовые настройки</CardTitle>
                    <CardDescription>
                      Настройка тарифов, комиссий и платежных систем
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="depositMinAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Минимальная сумма депозита ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="withdrawMinAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Минимальная сумма вывода ($)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="plan1Rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тариф 1 (%)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormDescription>
                              Процент доходности для тарифа 1
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="plan2Rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тариф 2 (%)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormDescription>
                              Процент доходности для тарифа 2
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="plan3Rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тариф 3 (%)</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormDescription>
                              Процент доходности для тарифа 3
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="referralPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Реферальное вознаграждение (%)</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormDescription>
                            Процент от депозита реферала, который получает пригласивший
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="cryptoEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Криптовалютные платежи
                              </FormLabel>
                              <FormDescription>
                                Разрешить пополнение и вывод через криптовалюты
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Банковские карты
                              </FormLabel>
                              <FormDescription>
                                Разрешить пополнение и вывод через банковские карты
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      type="submit"
                      className="gap-2"
                      disabled={saveSettingsMutation.isPending}
                    >
                      {saveSettingsMutation.isPending ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Сохранить настройки
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>

          {/* Вкладка системных настроек */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Резервное копирование</CardTitle>
                  <CardDescription>
                    Управление резервными копиями базы данных
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Создайте резервную копию всех данных платформы для обеспечения
                      сохранности информации в случае технических сбоев
                    </p>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => setIsBackupDialogOpen(true)}
                      >
                        <Database className="h-4 w-4" />
                        Создать резервную копию
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Оптимизация системы</CardTitle>
                  <CardDescription>
                    Управление производительностью и очистка данных
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Кэш системы</div>
                        <Badge>12.4 MB</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Временные файлы и кэшированные данные для ускорения работы
                      </p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-3 w-3" />
                        Очистить кэш
                      </Button>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Логи системы</div>
                        <Badge>65.8 MB</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Записи о событиях и операциях в системе
                      </p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-3 w-3" />
                        Очистить логи
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Email-уведомления</CardTitle>
                  <CardDescription>
                    Настройка шаблонов и отправки email-уведомлений
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Название шаблона</TableHead>
                            <TableHead>Описание</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Регистрация</TableCell>
                            <TableCell>Приветственное письмо новым пользователям</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500">Активно</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Создание депозита</TableCell>
                            <TableCell>Подтверждение создания нового депозита</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500">Активно</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Вывод средств</TableCell>
                            <TableCell>Уведомление о выводе средств</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500">Активно</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Сброс пароля</TableCell>
                            <TableCell>Инструкции по сбросу пароля</TableCell>
                            <TableCell>
                              <Badge variant="outline">Неактивно</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Тестовое письмо
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Вкладка логов системы */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Системные логи</CardTitle>
                <CardDescription>
                  Записи о работе системы и действиях пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Время</TableHead>
                        <TableHead className="w-24">Уровень</TableHead>
                        <TableHead>Сообщение</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logMessages.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs text-muted-foreground">{log.timestamp}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.level === "error" ? "destructive" :
                                log.level === "warning" ? "default" : "outline"
                              }
                            >
                              {log.level === "info" ? "Инфо" :
                               log.level === "warning" ? "Предупреждение" : "Ошибка"}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.message}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Подробнее
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Экспорт логов
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  Предыдущая
                </Button>
                <Button variant="outline" className="gap-2" disabled>
                  Следующая
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Диалог подтверждения создания резервной копии */}
      <Dialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать резервную копию</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите создать резервную копию базы данных? 
              Это действие может занять некоторое время.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBackupDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={() => createBackupMutation.mutate()}
              disabled={createBackupMutation.isPending}
            >
              {createBackupMutation.isPending ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}