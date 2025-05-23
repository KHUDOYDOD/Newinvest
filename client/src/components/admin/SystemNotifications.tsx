
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Send, Trash } from "lucide-react";

export function SystemNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Системное обновление", priority: "high", sent: false },
    { id: 2, title: "Новые функции", priority: "medium", sent: true },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Управление уведомлениями
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Заголовок уведомления" />
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Отправить
            </Button>
          </div>
          
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Badge variant={notification.priority === "high" ? "destructive" : "default"}>
                    {notification.priority === "high" ? "Важное" : "Обычное"}
                  </Badge>
                  <span>{notification.title}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
