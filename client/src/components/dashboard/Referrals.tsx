import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Referrals() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);
  
  const { data: referrals = [] } = useQuery({
    queryKey: ["/api/referrals"],
    enabled: !!user,
  });
  
  const refCode = user?.refCode || "";
  const refLink = `${window.location.origin}/auth?ref=${refCode}`;
  
  // Calculate referral bonus rate based on deposit amount
  const getReferralRate = () => {
    // Retrieve user's active deposit - in this example we're simplifying
    // In a real app, you'd calculate this based on the user's active deposits
    const deposits = []; // This would be retrieved from the backend
    
    if (deposits.length === 0) return "0.1%";
    
    const totalAmount = 0; // Calculate based on deposits
    
    if (totalAmount >= 1000) return "0.2%";
    if (totalAmount >= 500) return "0.15%";
    return "0.1%";
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink);
    setCopySuccess(true);
    toast({
      title: "Скопировано!",
      description: "Реферальная ссылка скопирована в буфер обмена.",
    });
    
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ваша реферальная программа</CardTitle>
          <CardDescription>
            Приглашайте друзей на платформу и получайте {getReferralRate()} от их инвестиций.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Input readOnly value={refLink} className="flex-1" />
            <Button 
              size="icon" 
              onClick={copyToClipboard}
              className={copySuccess ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Ваш бонус</p>
                <p className="font-heading font-bold text-xl">{getReferralRate()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Всего рефералов</p>
                <p className="font-heading font-bold text-xl">{referrals.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">Заработано</p>
                <p className="font-heading font-bold text-xl">$0.00</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ваши рефералы</CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Имя пользователя</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead>Инвестиции</TableHead>
                  <TableHead>Ваш бонус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral: any) => (
                  <TableRow key={referral.id}>
                    <TableCell>#{referral.id}</TableCell>
                    <TableCell>{referral.username}</TableCell>
                    <TableCell>{new Date(referral.createdAt).toLocaleDateString("ru-RU")}</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              У вас пока нет рефералов. Поделитесь своей реферальной ссылкой, чтобы начать зарабатывать!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
