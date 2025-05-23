import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, DollarSign, ArrowUpRight, CheckCircle, XCircle, Clock, CreditCard, Wallet, User, Calendar, MessageCircle } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />Ожидание</Badge>;
    case "approved":
      return <Badge variant="default" className="flex items-center gap-1 bg-green-500"><CheckCircle className="h-3 w-3" />Одобрено</Badge>;
    case "rejected":
      return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Отклонено</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const RequestCard = ({ 
  request, 
  type, 
  onApprove, 
  onReject,
  isProcessing 
}: { 
  request: any;
  type: 'deposit' | 'withdraw';
  onApprove: (id: number, comment?: string) => void;
  onReject: (id: number, comment?: string) => void;
  isProcessing: boolean;
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (action === 'approve') {
      onApprove(request.id, comment);
    } else {
      onReject(request.id, comment);
    }
    setShowDialog(false);
    setComment('');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${type === 'deposit' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-purple-100 dark:bg-purple-900/20'}`}>
              {type === 'deposit' ? 
                <DollarSign className={`h-6 w-6 ${type === 'deposit' ? 'text-blue-600' : 'text-purple-600'}`} /> :
                <ArrowUpRight className={`h-6 w-6 ${type === 'deposit' ? 'text-blue-600' : 'text-purple-600'}`} />
              }
            </div>
            <div>
              <p className="text-2xl font-bold">${parseFloat(request.amount).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                ID пользователя: {request.userId}
              </p>
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Способ:</span>
            <div className="flex items-center gap-1 mt-1">
              {request.paymentMethod === 'card' ? <CreditCard className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
              <span className="font-medium">{request.paymentMethod === 'card' ? 'Банковская карта' : 'Криптовалюта'}</span>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Дата:</span>
            <div className="flex items-center gap-1 mt-1">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">
                {new Date(request.createdAt).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>

        {type === 'withdraw' && request.walletAddress && (
          <div className="mb-4">
            <span className="text-muted-foreground text-sm">Адрес/Карта:</span>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 break-all">
              {request.walletAddress}
            </p>
          </div>
        )}

        {request.adminComment && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex items-center gap-1 mb-1">
              <MessageCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Комментарий:</span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">{request.adminComment}</p>
          </div>
        )}

        {request.status === 'pending' && (
          <div className="flex gap-2">
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => setAction('approve')}
                  disabled={isProcessing}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Одобрить
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => setAction('reject')}
                  disabled={isProcessing}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Отклонить
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {action === 'approve' ? 'Одобрить заявку' : 'Отклонить заявку'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="comment">Комментарий (необязательно)</Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={
                        action === 'approve' 
                          ? 'Заявка одобрена и обработана' 
                          : 'Укажите причину отклонения'
                      }
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowDialog(false)} className="flex-1">
                      Отмена
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      className={`flex-1 ${action === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                      disabled={isProcessing}
                    >
                      {isProcessing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      {action === 'approve' ? 'Одобрить' : 'Отклонить'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function RequestsManagement() {
  const { toast } = useToast();
  
  // Fetch deposit requests
  const { data: depositRequests, isLoading: depositLoading } = useQuery({
    queryKey: ["/api/admin/deposit-requests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/deposit-requests");
      const data = await res.json();
      console.log("Deposit requests data:", data);
      return data;
    },
  });
  
  // Fetch withdraw requests
  const { data: withdrawRequests, isLoading: withdrawLoading } = useQuery({
    queryKey: ["/api/admin/withdraw-requests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/admin/withdraw-requests");
      const data = await res.json();
      console.log("Withdraw requests data:", data);
      return data;
    },
  });
  
  const processDepositMutation = useMutation({
    mutationFn: async ({ id, action, comment }: { id: number; action: 'approve' | 'reject'; comment?: string }) => {
      const res = await apiRequest("POST", `/api/admin/deposit-requests/${id}/process`, {
        requestId: id,
        action,
        comment
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/deposit-requests"] });
      toast({
        title: "Заявка обработана! ✅",
        description: "Заявка на пополнение успешно обработана.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const processWithdrawMutation = useMutation({
    mutationFn: async ({ id, action, comment }: { id: number; action: 'approve' | 'reject'; comment?: string }) => {
      const res = await apiRequest("POST", `/api/admin/withdraw-requests/${id}/process`, {
        requestId: id,
        action,
        comment
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/withdraw-requests"] });
      toast({
        title: "Заявка обработана! ✅",
        description: "Заявка на вывод успешно обработана.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const pendingDeposits = depositRequests?.filter((req: any) => req.status === 'pending') || [];
  const pendingWithdraws = withdrawRequests?.filter((req: any) => req.status === 'pending') || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Заявки на пополнение</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{pendingDeposits.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-700 dark:text-purple-300">Заявки на вывод</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{pendingWithdraws.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700 dark:text-green-300">Всего одобрено</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {[...(depositRequests || []), ...(withdrawRequests || [])].filter((req: any) => req.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <XCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-700 dark:text-red-300">Всего отклонено</p>
                <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                  {[...(depositRequests || []), ...(withdrawRequests || [])].filter((req: any) => req.status === 'rejected').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deposits" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposits" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Пополнения ({depositRequests?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="withdraws" className="flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Выводы ({withdrawRequests?.length || 0})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposits" className="space-y-4">
          {depositLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : depositRequests && depositRequests.length > 0 ? (
            <div className="grid gap-4">
              {depositRequests.map((request: any) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type="deposit"
                  onApprove={(id, comment) => processDepositMutation.mutate({ id, action: 'approve', comment })}
                  onReject={(id, comment) => processDepositMutation.mutate({ id, action: 'reject', comment })}
                  isProcessing={processDepositMutation.isPending}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-muted-foreground">Нет заявок на пополнение</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="withdraws" className="space-y-4">
          {withdrawLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : withdrawRequests && withdrawRequests.length > 0 ? (
            <div className="grid gap-4">
              {withdrawRequests.map((request: any) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type="withdraw"
                  onApprove={(id, comment) => processWithdrawMutation.mutate({ id, action: 'approve', comment })}
                  onReject={(id, comment) => processWithdrawMutation.mutate({ id, action: 'reject', comment })}
                  isProcessing={processWithdrawMutation.isPending}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <ArrowUpRight className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-muted-foreground">Нет заявок на вывод</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}