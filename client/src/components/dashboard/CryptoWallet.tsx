import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Bitcoin, Coins, ArrowUpDown, QrCode, Copy, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CryptoWallet() {
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  const cryptoBalances = [
    { symbol: "BTC", name: "Bitcoin", balance: 0.00524, value: 245.67, change: +5.2, icon: Bitcoin },
    { symbol: "ETH", name: "Ethereum", balance: 0.156, value: 423.89, change: -2.1, icon: Coins },
    { symbol: "USDT", name: "Tether", balance: 1250.45, value: 1250.45, change: 0.0, icon: Coins },
  ];

  const transactions = [
    { id: 1, type: "receive", crypto: "BTC", amount: 0.002, value: 95.34, date: "2024-01-15", status: "completed" },
    { id: 2, type: "send", crypto: "ETH", amount: 0.05, value: 178.23, date: "2024-01-14", status: "pending" },
    { id: 3, type: "receive", crypto: "USDT", amount: 500, value: 500, date: "2024-01-13", status: "completed" },
  ];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Адрес скопирован! 📋",
      description: "Адрес кошелька скопирован в буфер обмена",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
          Криптокошелек
        </h2>
        <p className="text-muted-foreground mt-2">Управляйте своими криптовалютными активами</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cryptoBalances.map((crypto) => {
          const IconComponent = crypto.icon;
          return (
            <Card key={crypto.symbol} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCrypto(crypto.symbol)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <IconComponent className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{crypto.symbol}</p>
                      <p className="text-sm text-muted-foreground">{crypto.name}</p>
                    </div>
                  </div>
                  <Badge variant={crypto.change >= 0 ? "default" : "destructive"} className="flex items-center gap-1">
                    {crypto.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{crypto.balance} {crypto.symbol}</p>
                  <p className="text-lg text-muted-foreground">${crypto.value.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Портфель</TabsTrigger>
          <TabsTrigger value="send">Отправить</TabsTrigger>
          <TabsTrigger value="receive">Получить</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Общий баланс портфеля
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  ${cryptoBalances.reduce((sum, crypto) => sum + crypto.value, 0).toFixed(2)}
                </p>
                <p className="text-muted-foreground">Общая стоимость активов</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Отправить криптовалюту</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="send-crypto">Выберите криптовалюту</Label>
                <select className="w-full p-3 border rounded-lg mt-1">
                  {cryptoBalances.map((crypto) => (
                    <option key={crypto.symbol} value={crypto.symbol}>
                      {crypto.symbol} - {crypto.balance} доступно
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="recipient">Адрес получателя</Label>
                <Input id="recipient" placeholder="Введите адрес кошелька получателя" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="amount">Сумма</Label>
                <Input id="amount" type="number" placeholder="0.00" className="mt-1" />
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                Отправить
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Получить криптовалюту</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-500" />
                </div>
                <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded border break-all">
                  bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => handleCopyAddress("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Скопировать адрес
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>История транзакций</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tx.type === 'receive' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                        <ArrowUpDown className={`h-4 w-4 ${tx.type === 'receive' ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium">
                          {tx.type === 'receive' ? 'Получено' : 'Отправлено'} {tx.amount} {tx.crypto}
                        </p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${tx.value.toFixed(2)}</p>
                      <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                        {tx.status === 'completed' ? 'Завершено' : 'В обработке'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}