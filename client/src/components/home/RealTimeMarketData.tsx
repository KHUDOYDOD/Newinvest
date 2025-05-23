import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

// Имитация данных рынка (в реальном приложении должны загружаться из API)
const marketData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 62347.81,
    change: 2.43,
    marketCap: 1223598645123,
    volume: 38254985623
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3214.65,
    change: 1.87,
    marketCap: 384562153478,
    volume: 19865324578
  },
  {
    id: 3,
    name: "Ripple",
    symbol: "XRP",
    price: 0.5687,
    change: -1.23,
    marketCap: 28564789325,
    volume: 2356478912
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    price: 0.4567,
    change: 3.78,
    marketCap: 16258943725,
    volume: 985634127
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    price: 142.87,
    change: 4.52,
    marketCap: 59842563174,
    volume: 4856321478
  },
  {
    id: 6,
    name: "Polkadot",
    symbol: "DOT",
    price: 6.32,
    change: -0.87,
    marketCap: 7569348125,
    volume: 354123689
  }
];

// Новая функция 2: Таблица данных криптовалют в реальном времени
export function RealTimeMarketData() {
  const [data, setData] = useState(marketData);
  
  // Имитация обновления данных каждые 5 секунд
  useEffect(() => {
    const timer = setInterval(() => {
      // Обновляем цену и изменение для каждой монеты с небольшими случайными колебаниями
      setData(prevData => 
        prevData.map(coin => {
          const randomChange = (Math.random() * 0.4) - 0.2; // от -0.2% до +0.2%
          const newChange = parseFloat((coin.change + randomChange).toFixed(2));
          const priceChangePercentage = coin.price * (randomChange / 100);
          const newPrice = parseFloat((coin.price + priceChangePercentage).toFixed(4));
          
          return {
            ...coin,
            price: newPrice,
            change: newChange
          };
        })
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  // Форматирование чисел для отображения
  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + " млрд";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + " млн";
    } else {
      return num.toLocaleString();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-background-light to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Рыночные данные <TrendingUp className="inline-block ml-2 text-primary" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Актуальные данные о стоимости основных криптовалют и изменениях их курса в режиме реального времени.
          </p>
        </div>
        
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur overflow-hidden">
          <CardHeader>
            <CardTitle>Курсы криптовалют</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">#</th>
                    <th className="text-left py-3 px-4 font-medium">Название</th>
                    <th className="text-right py-3 px-4 font-medium">Цена</th>
                    <th className="text-right py-3 px-4 font-medium">Изменение (24ч)</th>
                    <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Капитализация</th>
                    <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Объем (24ч)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(coin => (
                    <tr key={coin.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">{coin.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="font-medium">{coin.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {coin.symbol}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        ${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={coin.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {coin.change >= 0 ? (
                            <ArrowUp className="inline w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDown className="inline w-4 h-4 mr-1" />
                          )}
                          {Math.abs(coin.change)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right hidden md:table-cell">
                        ${formatNumber(coin.marketCap)}
                      </td>
                      <td className="py-4 px-4 text-right hidden md:table-cell">
                        ${formatNumber(coin.volume)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              * Данные обновляются каждые 5 секунд. Последнее обновление: {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}