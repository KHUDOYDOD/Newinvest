import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface Deposit {
  id: number;
  amount: string;
  rate: string;
  status: string;
  createdAt: string;
  endsAt: string;
  isPaid: boolean;
}

interface ActiveDepositsProps {
  deposits: Deposit[];
}

export default function ActiveDeposits({ deposits = [] }: ActiveDepositsProps) {
  const [now, setNow] = useState(new Date());
  
  // Update the current time every second for accurate countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter to show only active deposits
  const activeDeposits = deposits.filter((deposit) => deposit.status === "active");
  
  // Calculate time remaining until payout
  const formatTimeRemaining = (endsAt: string) => {
    const endTime = new Date(endsAt);
    const timeLeft = Math.max(0, endTime.getTime() - now.getTime());
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage for the progress bar
  const calculateProgress = (createdAt: string, endsAt: string) => {
    const startTime = new Date(createdAt).getTime();
    const endTime = new Date(endsAt).getTime();
    const currentTime = now.getTime();
    
    const total = endTime - startTime;
    const elapsed = currentTime - startTime;
    
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Активные депозиты</CardTitle>
      </CardHeader>
      <CardContent>
        {activeDeposits.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>План</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Процент</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>До начисления</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDeposits.map((deposit) => {
                const progress = calculateProgress(deposit.createdAt, deposit.endsAt);
                return (
                  <TableRow key={deposit.id}>
                    <TableCell>#{deposit.id}</TableCell>
                    <TableCell>
                      {deposit.rate === "5" && "Стартовый"}
                      {deposit.rate === "10" && "Стандартный"}
                      {deposit.rate === "15" && "Премиум"}
                    </TableCell>
                    <TableCell className="font-medium">${parseFloat(deposit.amount).toFixed(2)}</TableCell>
                    <TableCell>{deposit.rate}%</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Активный
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-24 h-2 rounded-full overflow-hidden mr-2 bg-gray-200">
                          <Progress value={progress} className="h-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatTimeRemaining(deposit.endsAt)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            У вас пока нет активных депозитов. Начните инвестировать прямо сейчас!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
