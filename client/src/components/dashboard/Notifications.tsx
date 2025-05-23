
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, DollarSign, Users, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "deposit",
      message: "Депозит успешно создан",
      time: "5 минут назад",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "referral",
      message: "Новый реферал присоединился",
      time: "2 часа назад",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "warning",
      message: "Попытка входа с нового устройства",
      time: "1 день назад",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Уведомления</CardTitle>
        <Badge>{notifications.length}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 bg-primary/10 rounded-full">{notification.icon}</div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
