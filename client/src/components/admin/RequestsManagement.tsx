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
  const { data: depositRequests = [], isLoading: depositLoading, error: depositError } = useQuery({
    queryKey: ["/api/admin/deposit-requests"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/admin/deposit-requests");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await res.json();
        console.log("Deposit requests data:", data);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching deposit requests:", error);
        return [];
      }
    },
  });
  
  // Fetch withdraw requests
  const { data: withdrawRequests = [], isLoading: withdrawLoading, error: withdrawError } = useQuery({
    queryKey: ["/api/admin/withdraw-requests"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/admin/withdraw-requests");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await res.json();
        console.log("Withdraw requests data:", data);
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
        return [];
      }
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

  const pendingDeposits = depositRequests.filter((req: any) => req.status === 'pending');
  const pendingWithdraws = withdrawRequests.filter((req: any) => req.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Beautiful Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Управление заявками
        </h1>
        <p className="text-lg text-muted-foreground">
          Обрабатывайте заявки пользователей на пополнение и вывод средств
        </p>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 border-0 shadow-xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 font-medium">Заявки на пополнение</p>
                <p className="text-3xl font-bold mt-2">{depositRequests.length}</p>
                <p className="text-sm text-blue-200 mt-1">{pendingDeposits.length} ожидает</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <DollarSign className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-pink-700 border-0 shadow-xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 font-medium">Заявки на вывод</p>
                <p className="text-3xl font-bold mt-2">{withdrawRequests.length}</p>
                <p className="text-sm text-purple-200 mt-1">{pendingWithdraws.length} ожидает</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <ArrowUpRight className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 border-0 shadow-xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 font-medium">Всего одобрено</p>
                <p className="text-3xl font-bold mt-2">
                  {[...depositRequests, ...withdrawRequests].filter((req: any) => req.status === 'approved').length}
                </p>
                <p className="text-sm text-green-200 mt-1">заявок обработано</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 border-0 shadow-xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 font-medium">Всего отклонено</p>
                <p className="text-3xl font-bold mt-2">
                  {[...depositRequests, ...withdrawRequests].filter((req: any) => req.status === 'rejected').length}
                </p>
                <p className="text-sm text-orange-200 mt-1">заявок отклонено</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <XCircle className="h-8 w-8" />
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