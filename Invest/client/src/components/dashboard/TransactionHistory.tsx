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
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Transaction {
  id: number;
  type: string;
  amount: string;
  status: string;
  createdAt: string;
  description?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions = [] }: TransactionHistoryProps) {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Format the amount with + or - sign based on transaction type
  const formatAmount = (transaction: Transaction) => {
    const amount = parseFloat(transaction.amount);
    
    if (transaction.type === "withdraw") {
      return <span className="text-red-500">-${Math.abs(amount).toFixed(2)}</span>;
    } else {
      return <span className="text-green-500">+${amount.toFixed(2)}</span>;
    }
  };
  
  // Get transaction type label in Russian
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deposit":
        return "Пополнение";
      case "withdraw":
        return "Вывод";
      case "profit":
        return "Прибыль";
      case "referral":
        return "Реферальный бонус";
      default:
        return type;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">История транзакций</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedTransactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Описание</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>#{transaction.id}</TableCell>
                  <TableCell>
                    {format(new Date(transaction.createdAt), "dd.MM.yyyy, HH:mm", { locale: ru })}
                  </TableCell>
                  <TableCell>{getTypeLabel(transaction.type)}</TableCell>
                  <TableCell className="font-medium">
                    {formatAmount(transaction)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        transaction.status === "completed" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {transaction.status === "completed" ? "Завершено" : 
                       transaction.status === "pending" ? "В обработке" : "Отклонено"}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            История транзакций пуста.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
