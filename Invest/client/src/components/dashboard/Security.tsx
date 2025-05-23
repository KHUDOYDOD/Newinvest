
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Smartphone, Key } from "lucide-react";

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Безопасность аккаунта</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Двухфакторная аутентификация</h3>
              <p className="text-sm text-muted-foreground">Дополнительный уровень защиты для вашего аккаунта</p>
            </div>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Подтверждение операций</h3>
              <p className="text-sm text-muted-foreground">SMS-подтверждение при выводе средств</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <Button className="w-full" variant="outline">
          <Key className="h-4 w-4 mr-2" />
          Сменить пароль
        </Button>
      </CardContent>
    </Card>
  );
}
