import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Zap, Clock, Star } from "lucide-react";

export default function TradingSignals() {
  const [activeFilter, setActiveFilter] = useState("all");

  const signals = [
    {
      id: 1,
      pair: "BTC/USD",
      direction: "buy",
      strength: "strong",
      entry: 42150,
      target: 44500,
      stopLoss: 40800,
      timeframe: "4H",
      accuracy: 87,
      profit: "+5.6%",
      status: "active"
    },
    {
      id: 2,
      pair: "ETH/USD",
      direction: "sell",
      strength: "medium",
      entry: 2580,
      target: 2420,
      stopLoss: 2650,
      timeframe: "1D",
      accuracy: 92,
      profit: "+3.2%",
      status: "completed"
    },
    {
      id: 3,
      pair: "XRP/USD",
      direction: "buy",
      strength: "strong",
      entry: 0.52,
      target: 0.58,
      stopLoss: 0.49,
      timeframe: "1H",
      accuracy: 78,
      profit: "pending",
      status: "new"
    }
  ];

  const getSignalIcon = (direction: string) => {
    return direction === "buy" ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "weak": return "bg-gray-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
          Торговые сигналы
        </h2>
        <p className="text-muted-foreground mt-2">Профессиональные торговые рекомендации от наших аналитиков</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-800">87%</p>
                <p className="text-sm text-green-600">Точность</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-800">24</p>
                <p className="text-sm text-blue-600">Активных</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-800">+12.5%</p>
                <p className="text-sm text-purple-600">Прибыль</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-800">3</p>
                <p className="text-sm text-orange-600">Новых</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "buy", "sell", "strong"].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
          >
            {filter === "all" && "Все сигналы"}
            {filter === "buy" && "Покупка"}
            {filter === "sell" && "Продажа"}
            {filter === "strong" && "Сильные"}
          </Button>
        ))}
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {signals.map((signal) => (
          <Card key={signal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-xl font-bold">{signal.pair}</div>
                  {getSignalIcon(signal.direction)}
                  <Badge className={`${getStrengthColor(signal.strength)} text-white`}>
                    {signal.strength.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{signal.timeframe}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{signal.accuracy}% точность</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Вход</p>
                  <p className="font-semibold">${signal.entry}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Цель</p>
                  <p className="font-semibold text-green-600">${signal.target}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Стоп-лосс</p>
                  <p className="font-semibold text-red-600">${signal.stopLoss}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Прибыль</p>
                  <p className={`font-semibold ${signal.profit === "pending" ? "text-gray-500" : "text-green-600"}`}>
                    {signal.profit}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Статус</p>
                  <Badge 
                    variant={signal.status === "active" ? "default" : signal.status === "completed" ? "secondary" : "outline"}
                  >
                    {signal.status === "active" && "Активен"}
                    {signal.status === "completed" && "Завершен"}
                    {signal.status === "new" && "Новый"}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  Следовать сигналу
                </Button>
                <Button size="sm" variant="outline">
                  Подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}