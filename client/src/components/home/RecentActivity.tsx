import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Banknote, ArrowDownCircle, ArrowUpCircle, Users } from "lucide-react";

// Временные данные, в реальном приложении должны подгружаться с сервера
const newUsers = [
  { id: 1, username: "Алексей", date: "19.05.2025", country: "Россия", avatar: "" },
  { id: 2, username: "София", date: "18.05.2025", country: "Украина", avatar: "" },
  { id: 3, username: "Максим", date: "18.05.2025", country: "Казахстан", avatar: "" },
  { id: 4, username: "Елена", date: "17.05.2025", country: "Беларусь", avatar: "" },
  { id: 5, username: "Дмитрий", date: "17.05.2025", country: "Россия", avatar: "" },
  { id: 6, username: "Анна", date: "16.05.2025", country: "Узбекистан", avatar: "" },
  { id: 7, username: "Сергей", date: "16.05.2025", country: "Россия", avatar: "" },
  { id: 8, username: "Мария", date: "15.05.2025", country: "Грузия", avatar: "" },
  { id: 9, username: "Владимир", date: "15.05.2025", country: "Армения", avatar: "" },
  { id: 10, username: "Екатерина", date: "14.05.2025", country: "Азербайджан", avatar: "" },
];

const newDeposits = [
  { id: 1, username: "Игорь", date: "19.05.2025", amount: 5000, currency: "USD", status: "Успешно" },
  { id: 2, username: "Наталья", date: "19.05.2025", amount: 3200, currency: "USD", status: "Успешно" },
  { id: 3, username: "Олег", date: "18.05.2025", amount: 1750, currency: "USD", status: "Успешно" },
  { id: 4, username: "Светлана", date: "18.05.2025", amount: 8900, currency: "USD", status: "Успешно" },
  { id: 5, username: "Артём", date: "17.05.2025", amount: 2300, currency: "USD", status: "Успешно" },
  { id: 6, username: "Татьяна", date: "17.05.2025", amount: 12000, currency: "USD", status: "Успешно" },
  { id: 7, username: "Виктор", date: "16.05.2025", amount: 4300, currency: "USD", status: "Успешно" },
  { id: 8, username: "Ирина", date: "16.05.2025", amount: 7600, currency: "USD", status: "Успешно" },
  { id: 9, username: "Павел", date: "15.05.2025", amount: 3800, currency: "USD", status: "Успешно" },
  { id: 10, username: "Юлия", date: "15.05.2025", amount: 6500, currency: "USD", status: "Успешно" },
];

const newWithdrawals = [
  { id: 1, username: "Роман", date: "19.05.2025", amount: 3800, currency: "USD", status: "Выплачено" },
  { id: 2, username: "Марина", date: "19.05.2025", amount: 2900, currency: "USD", status: "Выплачено" },
  { id: 3, username: "Андрей", date: "18.05.2025", amount: 6400, currency: "USD", status: "Выплачено" },
  { id: 4, username: "Ксения", date: "18.05.2025", amount: 1700, currency: "USD", status: "Выплачено" },
  { id: 5, username: "Денис", date: "17.05.2025", amount: 3200, currency: "USD", status: "Выплачено" },
  { id: 6, username: "Полина", date: "17.05.2025", amount: 8900, currency: "USD", status: "Выплачено" },
  { id: 7, username: "Георгий", date: "16.05.2025", amount: 5500, currency: "USD", status: "Выплачено" },
  { id: 8, username: "Вера", date: "16.05.2025", amount: 4100, currency: "USD", status: "Выплачено" },
  { id: 9, username: "Евгений", date: "15.05.2025", amount: 7300, currency: "USD", status: "Выплачено" },
  { id: 10, username: "Алина", date: "15.05.2025", amount: 2800, currency: "USD", status: "Выплачено" },
];

export function RecentActivity() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Активность платформы
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наша платформа активно растет, привлекая новых инвесторов со всего мира.
            Мы с гордостью демонстрируем недавнюю активность наших пользователей.
          </p>
        </div>

        <Tabs defaultValue="users" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-xl">
              <TabsTrigger value="users" className="flex flex-col md:flex-row gap-2 items-center">
                <Users className="h-5 w-5" />
                <span>Новые участники</span>
              </TabsTrigger>
              <TabsTrigger value="deposits" className="flex flex-col md:flex-row gap-2 items-center">
                <ArrowDownCircle className="h-5 w-5" />
                <span>Депозиты</span>
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="flex flex-col md:flex-row gap-2 items-center">
                <ArrowUpCircle className="h-5 w-5" />
                <span>Выводы</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="users" className="focus-visible:outline-none focus-visible:ring-0">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Новые пользователи платформы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="space-y-4">
                    {newUsers.map((user) => (
                      <div 
                        key={user.id} 
                        className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-card hover:bg-card/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {user.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.username}</div>
                            <div className="text-sm text-muted-foreground">Регистрация: {user.date}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {user.country}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposits" className="focus-visible:outline-none focus-visible:ring-0">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownCircle className="h-5 w-5 text-green-500" />
                  <span>Последние депозиты</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="space-y-4">
                    {newDeposits.map((deposit) => (
                      <div 
                        key={deposit.id} 
                        className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-card hover:bg-card/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Banknote className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <div className="font-medium">{deposit.username}</div>
                            <div className="text-sm text-muted-foreground">{deposit.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">+{deposit.amount.toLocaleString()} {deposit.currency}</div>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            {deposit.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="focus-visible:outline-none focus-visible:ring-0">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpCircle className="h-5 w-5 text-blue-500" />
                  <span>Последние выводы средств</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="space-y-4">
                    {newWithdrawals.map((withdrawal) => (
                      <div 
                        key={withdrawal.id} 
                        className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-card hover:bg-card/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <ArrowUpCircle className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium">{withdrawal.username}</div>
                            <div className="text-sm text-muted-foreground">{withdrawal.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{withdrawal.amount.toLocaleString()} {withdrawal.currency}</div>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            {withdrawal.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}