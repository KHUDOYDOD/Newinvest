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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  UserCog,
  UserPlus,
  Search,
  RefreshCw,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Wallet,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Lock,
  Ban,
  Plus,
  Minus,
  Download,
} from "lucide-react";
import { format } from 'date-fns';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@shared/schema";

// Схема для редактирования баланса
const updateBalanceSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Введите корректную сумму"
  }),
  type: z.enum(["add", "subtract"]),
  description: z.string().min(1, "Укажите описание"),
});

// Тип для редактирования баланса
type UpdateBalanceFormValues = z.infer<typeof updateBalanceSchema>;

export default function UsersPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateBalanceModalOpen, setIsUpdateBalanceModalOpen] = useState(false);

  // Запрос пользователей
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ["/api/admin/users", page, perPage, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        search: searchTerm,
      });
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) throw new Error("Ошибка загрузки пользователей");
      return res.json();
    },
  });

  // Форма редактирования баланса
  const updateBalanceForm = useForm<UpdateBalanceFormValues>({
    resolver: zodResolver(updateBalanceSchema),
    defaultValues: {
      amount: "0",
      type: "add",
      description: "",
    },
  });

  // Мутация для обновления баланса пользователя
  const updateBalanceMutation = useMutation({
    mutationFn: async (data: UpdateBalanceFormValues & { userId: number }) => {
      const { userId, ...rest } = data;
      const res = await apiRequest("POST", `/api/admin/users/${userId}/balance`, rest);
      return await res.json();
    },
    onSuccess: () => {
      setIsUpdateBalanceModalOpen(false);
      updateBalanceForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Баланс обновлен",
        description: "Баланс пользователя успешно обновлен",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Обработчик отправки формы редактирования баланса
  const onSubmitUpdateBalance = (values: UpdateBalanceFormValues) => {
    if (selectedUser) {
      updateBalanceMutation.mutate({
        ...values,
        userId: selectedUser.id,
      });
    }
  };

  // Мутация для блокировки/разблокировки пользователя
  const toggleUserStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: number; isActive: boolean }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/status`, { isActive });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Статус обновлен",
        description: "Статус пользователя успешно обновлен",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleUpdateBalance = (user: User) => {
    setSelectedUser(user);
    setIsUpdateBalanceModalOpen(true);
  };

  const handleToggleUserStatus = (user: User) => {
    toggleUserStatusMutation.mutate({
      userId: user.id,
      isActive: !user.isActive,
    });
  };

  // Обработчик поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Сбрасываем страницу при новом поиске
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Управление пользователями</h1>
            <p className="text-muted-foreground">
              Просмотр и редактирование учетных записей пользователей
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Добавить пользователя
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Список пользователей</CardTitle>
                  <CardDescription>
                    Всего пользователей: {users?.length || 0}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Поиск по имени, email или телефону"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline" type="submit">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                  <Select
                    value={perPage.toString()}
                    onValueChange={(value) => setPerPage(parseInt(value))}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <RefreshCw className="h-10 w-10 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">
                  Ошибка загрузки данных: {error.toString()}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">ID</TableHead>
                        <TableHead>Пользователь</TableHead>
                        <TableHead>Email / Телефон</TableHead>
                        <TableHead>Реф. код</TableHead>
                        <TableHead className="text-right">Баланс</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Дата регистрации</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users && users.length > 0 ? (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {user.username}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>{user.email || "—"}</div>
                              <div className="text-xs text-muted-foreground">
                                {user.phone || "—"}
                              </div>
                            </TableCell>
                            <TableCell>
                              {user.refCode ? (
                                <Badge variant="outline">{user.refCode}</Badge>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${user.balance}
                            </TableCell>
                            <TableCell>
                              {user.isActive ? (
                                <Badge className="bg-green-500">Активен</Badge>
                              ) : (
                                <Badge variant="destructive">Заблокирован</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                              {user.createdAt
                                ? format(new Date(user.createdAt), "dd.MM.yyyy HH:mm")
                                : "—"}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewUser(user)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleUpdateBalance(user)}
                                >
                                  <Wallet className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleUserStatus(user)}
                                >
                                  {user.isActive ? (
                                    <Ban className="h-4 w-4" />
                                  ) : (
                                    <CheckCircle2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-6">
                            Пользователи не найдены
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Страница {page} из {Math.ceil((users?.length || 0) / perPage) || 1}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= Math.ceil((users?.length || 0) / perPage)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Модальное окно просмотра пользователя */}
        {selectedUser && (
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Информация о пользователе</DialogTitle>
                <DialogDescription>
                  Подробная информация о пользователе и его активности
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="general">Основная</TabsTrigger>
                  <TabsTrigger value="deposits">Депозиты</TabsTrigger>
                  <TabsTrigger value="transactions">Транзакции</TabsTrigger>
                  <TabsTrigger value="referrals">Рефералы</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                        <div>{selectedUser.id}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Логин</h3>
                        <div>{selectedUser.username}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Имя</h3>
                        <div>
                          {selectedUser.firstName} {selectedUser.lastName}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <div>{selectedUser.email || "—"}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Телефон</h3>
                        <div>{selectedUser.phone || "—"}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Баланс</h3>
                        <div className="text-xl font-bold">${selectedUser.balance}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Статус</h3>
                        <div>
                          {selectedUser.isActive ? (
                            <Badge className="mt-1 bg-green-500">Активен</Badge>
                          ) : (
                            <Badge className="mt-1" variant="destructive">
                              Заблокирован
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Реферальный код</h3>
                        <div>{selectedUser.refCode || "—"}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Роль</h3>
                        <div>
                          {selectedUser.role === "admin" ? (
                            <Badge className="mt-1 bg-purple-500">Администратор</Badge>
                          ) : (
                            <Badge className="mt-1" variant="secondary">
                              Пользователь
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Дата регистрации
                        </h3>
                        <div>
                          {selectedUser.createdAt
                            ? format(new Date(selectedUser.createdAt), "dd.MM.yyyy HH:mm:ss")
                            : "—"}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Последний вход
                        </h3>
                        <div>
                          {selectedUser.lastLogin
                            ? format(new Date(selectedUser.lastLogin), "dd.MM.yyyy HH:mm:ss")
                            : "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="deposits">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Тариф</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата создания</TableHead>
                        <TableHead>Дата окончания</TableHead>
                        <TableHead>Выплачен</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          Депозиты не найдены
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="transactions">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Описание</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          Транзакции не найдены
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="referrals">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Пользователь</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Баланс</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          Рефералы не найдены
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleUpdateBalance(selectedUser)}
                  className="gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Изменить баланс
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleToggleUserStatus(selectedUser)}
                  className="gap-2"
                >
                  {selectedUser.isActive ? (
                    <>
                      <Ban className="h-4 w-4" />
                      Заблокировать
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Разблокировать
                    </>
                  )}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Сбросить пароль
                </Button>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Удалить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Модальное окно изменения баланса */}
        {selectedUser && (
          <Dialog open={isUpdateBalanceModalOpen} onOpenChange={setIsUpdateBalanceModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Изменение баланса</DialogTitle>
                <DialogDescription>
                  Изменение баланса пользователя {selectedUser.username} (ID: {selectedUser.id})
                </DialogDescription>
              </DialogHeader>

              <Form {...updateBalanceForm}>
                <form
                  onSubmit={updateBalanceForm.handleSubmit(onSubmitUpdateBalance)}
                  className="space-y-4"
                >
                  <FormField
                    control={updateBalanceForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Сумма</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="0.00" />
                        </FormControl>
                        <FormDescription>
                          Введите сумму для добавления или вычитания
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateBalanceForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Тип операции</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип операции" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="add">
                                <div className="flex items-center gap-2">
                                  <Plus className="h-4 w-4 text-green-500" />
                                  Добавить на баланс
                                </div>
                              </SelectItem>
                              <SelectItem value="subtract">
                                <div className="flex items-center gap-2">
                                  <Minus className="h-4 w-4 text-red-500" />
                                  Вычесть с баланса
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={updateBalanceForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Причина изменения баланса"
                          />
                        </FormControl>
                        <FormDescription>
                          Укажите причину изменения баланса
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsUpdateBalanceModalOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateBalanceMutation.isPending}
                    >
                      {updateBalanceMutation.isPending ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      Сохранить
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
}