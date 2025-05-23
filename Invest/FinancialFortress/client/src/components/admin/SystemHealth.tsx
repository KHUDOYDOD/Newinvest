
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

export function SystemHealth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Состояние системы
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>CPU</span>
            <span>45%</span>
          </div>
          <Progress value={45} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Память</span>
            <span>60%</span>
          </div>
          <Progress value={60} />
        </div>
      </CardContent>
    </Card>
  );
}
