
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

export function ReportGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Генератор отчетов</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип отчета" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="users">Пользователи</SelectItem>
            <SelectItem value="transactions">Транзакции</SelectItem>
            <SelectItem value="deposits">Депозиты</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Сгенерировать отчет
        </Button>
      </CardContent>
    </Card>
  );
}
