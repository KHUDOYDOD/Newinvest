import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, TrendingDown, RefreshCw, Star, 
  Clock, Calendar, BarChart3, ArrowUpRight,
  ArrowDownRight, Share2, Bookmark, ChevronDown,
  Info
} from "lucide-react";

// Пример данных для рыночной аналитики
const marketData = {
  majorIndices: [
    { 
      id: 1, 
      name: "S&P 500", 
      value: 4892.37, 
      change: 1.23, 
      trend: "up",
      chartData: [
        { date: "10:00", value: 4850 },
        { date: "11:00", value: 4855 },
        { date: "12:00", value: 4870 },
        { date: "13:00", value: 4865 },
        { date: "14:00", value: 4880 },
        { date: "15:00", value: 4890 },
        { date: "16:00", value: 4892 }
      ]
    },
    { 
      id: 2, 
      name: "NASDAQ", 
      value: 15982.11, 
      change: 1.67, 
      trend: "up",
      chartData: [
        { date: "10:00", value: 15900 },
        { date: "11:00", value: 15930 },
        { date: "12:00", value: 15950 },
        { date: "13:00", value: 15940 },
        { date: "14:00", value: 15970 },
        { date: "15:00", value: 15975 },
        { date: "16:00", value: 15982 }
      ]
    },
    { 
      id: 3, 
      name: "Dow Jones", 
      value: 38492.23, 
      change: 0.89, 
      trend: "up",
      chartData: [
        { date: "10:00", value: 38400 },
        { date: "11:00", value: 38420 },
        { date: "12:00", value: 38450 },
        { date: "13:00", value: 38430 },
        { date: "14:00", value: 38460 },
        { date: "15:00", value: 38480 },
        { date: "16:00", value: 38492 }
      ]
    },
    { 
      id: 4, 
      name: "Russell 2000", 
      value: 2072.19, 
      change: -0.47, 
      trend: "down",
      chartData: [
        { date: "10:00", value: 2080 },
        { date: "11:00", value: 2078 },
        { date: "12:00", value: 2075 },
        { date: "13:00", value: 2077 },
        { date: "14:00", value: 2074 },
        { date: "15:00", value: 2070 },
        { date: "16:00", value: 2072 }
      ]
    }
  ],
  cryptoMarket: [
    { 
      id: 1, 
      name: "Bitcoin", 
      symbol: "BTC",
      value: 62475.83, 
      change: 2.45, 
      trend: "up",
      marketCap: "1.21T",
      volume: "43.5B"
    },
    { 
      id: 2, 
      name: "Ethereum", 
      symbol: "ETH",
      value: 3289.47, 
      change: 3.12, 
      trend: "up",
      marketCap: "394.5B",
      volume: "17.2B"
    },
    { 
      id: 3, 
      name: "Solana", 
      symbol: "SOL",
      value: 149.78, 
      change: 4.87, 
      trend: "up",
      marketCap: "63.8B",
      volume: "5.7B"
    },
    { 
      id: 4, 
      name: "Cardano", 
      symbol: "ADA",
      value: 0.59, 
      change: -1.23, 
      trend: "down",
      marketCap: "20.9B",
      volume: "1.8B"
    },
    { 
      id: 5, 
      name: "Dogecoin", 
      symbol: "DOGE",
      value: 0.1432, 
      change: -0.87, 
      trend: "down",
      marketCap: "19.4B",
      volume: "2.1B"
    }
  ],
  marketNews: [
    {
      id: 1,
      title: "ФРС сохранила ключевую ставку, но сигнализирует о возможном снижении в ближайшие месяцы",
      source: "Financial Times",
      time: "2 часа назад",
      category: "Экономика",
      bookmark: false
    },
    {
      id: 2,
      title: "Акции технологических компаний растут на фоне сильных квартальных отчетов",
      source: "Reuters",
      time: "4 часа назад",
      category: "Рынок акций",
      bookmark: true
    },
    {
      id: 3,
      title: "Bitcoin преодолел отметку в $62,000 впервые с декабря прошлого года",
      source: "Bloomberg",
      time: "6 часов назад",
      category: "Криптовалюты",
      bookmark: false
    },
    {
      id: 4,
      title: "Рынок недвижимости показывает признаки стабилизации после долгого падения",
      source: "Wall Street Journal",
      time: "10 часов назад",
      category: "Недвижимость",
      bookmark: false
    },
    {
      id: 5,
      title: "Инфляция в еврозоне снизилась до целевого уровня ЕЦБ впервые за три года",
      source: "CNBC",
      time: "1 день назад",
      category: "Макроэкономика",
      bookmark: true
    }
  ],
  economicCalendar: [
    {
      id: 1,
      event: "Отчет по занятости (Non-Farm Payrolls)",
      date: "05.06.2025",
      time: "15:30",
      importance: "high",
      previous: "+175K",
      forecast: "+192K",
      country: "США"
    },
    {
      id: 2,
      event: "Решение ЕЦБ по процентной ставке",
      date: "06.06.2025",
      time: "14:45",
      importance: "high",
      previous: "3.25%",
      forecast: "3.00%",
      country: "Еврозона"
    },
    {
      id: 3,
      event: "Индекс потребительских цен (CPI)",
      date: "10.06.2025",
      time: "15:30",
      importance: "high",
      previous: "3.1%",
      forecast: "2.9%",
      country: "США"
    },
    {
      id: 4,
      event: "Розничные продажи",
      date: "12.06.2025",
      time: "15:30",
      importance: "medium",
      previous: "0.6%",
      forecast: "0.4%",
      country: "США"
    },
    {
      id: 5,
      event: "Отчет Банка Японии по монетарной политике",
      date: "13.06.2025",
      time: "06:00",
      importance: "medium",
      previous: "-0.1%",
      forecast: "-0.1%",
      country: "Япония"
    }
  ]
};

// Компонент для рыночной аналитики - Новая функция 3 для личного кабинета
export default function MarketInsights() {
  const [bookmarks, setBookmarks] = useState<number[]>([2, 5]);
  
  // Форматирование чисел
  const formatNumber = (value: number) => {
    if (value < 1) {
      return value.toFixed(4);
    }
    return value.toFixed(2);
  };
  
  // Получение цвета для тренда
  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };
  
  // Получение иконки для тренда
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-600" />;
  };
  
  // Получение цвета для уровня важности
  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Переключение закладок для новостей
  const toggleBookmark = (id: number) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(itemId => itemId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Рыночная аналитика</h2>
          <p className="text-muted-foreground">
            Актуальные данные о рынках, индексах и экономических событиях
          </p>
        </div>
        <Button 
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Обновить данные
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Основные индексы</CardTitle>
            <CardDescription>
              Текущие значения ведущих мировых индексов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.majorIndices.map(index => (
                <div 
                  key={index.id} 
                  className="p-4 border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{index.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xl font-bold mr-2">
                          {formatNumber(index.value)}
                        </span>
                        <span className={`flex items-center ${getTrendColor(index.trend)}`}>
                          {index.change > 0 ? "+" : ""}{index.change}%
                          {getTrendIcon(index.trend)}
                        </span>
                      </div>
                    </div>
                    <div className="w-[150px] h-[40px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={index.chartData}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={index.trend === "up" ? "#16a34a" : "#dc2626"} 
                            dot={false} 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Криптовалютный рынок</CardTitle>
            <CardDescription>
              Топ криптовалют по капитализации
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Название</th>
                    <th className="text-right py-3 px-4 font-medium">Цена</th>
                    <th className="text-right py-3 px-4 font-medium">Изменение (24ч)</th>
                    <th className="text-right py-3 px-4 font-medium hidden md:table-cell">Капитализация</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.cryptoMarket.map(crypto => (
                    <tr key={crypto.id} className="border-b hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        ${formatNumber(crypto.value)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={getTrendColor(crypto.trend)}>
                          {crypto.change > 0 ? "+" : ""}{crypto.change}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right hidden md:table-cell">
                        ${crypto.marketCap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Новости рынка</CardTitle>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="all" className="text-xs px-3">Все</TabsTrigger>
                  <TabsTrigger value="stocks" className="text-xs px-3">Акции</TabsTrigger>
                  <TabsTrigger value="crypto" className="text-xs px-3">Крипто</TabsTrigger>
                  <TabsTrigger value="economy" className="text-xs px-3">Экономика</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {marketData.marketNews.map(news => (
                <div 
                  key={news.id} 
                  className="p-3 rounded-lg hover:bg-muted/20 transition-colors border-b last:border-b-0"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium hover:text-primary transition-colors cursor-pointer">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {news.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {news.time}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {news.source}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => toggleBookmark(news.id)}
                      >
                        <Bookmark 
                          className={`h-4 w-4 ${bookmarks.includes(news.id) ? 'fill-primary text-primary' : ''}`} 
                        />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" size="sm">
              Загрузить больше новостей
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Экономический календарь</CardTitle>
            <CardDescription>
              Ближайшие важные экономические события
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto">
            <div className="space-y-4">
              {marketData.economicCalendar.map(event => (
                <div 
                  key={event.id} 
                  className="p-3 border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge 
                        variant="outline" 
                        className={getImportanceColor(event.importance)}
                      >
                        {event.country}
                      </Badge>
                      <h4 className="font-medium mt-2">{event.event}</h4>
                    </div>
                    <div className="flex items-center">
                      {event.importance === "high" && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {event.date}, {event.time}
                    </div>
                    <div className="flex gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground">Предыдущий</div>
                        <div className="font-medium">{event.previous}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Прогноз</div>
                        <div className="font-medium">{event.forecast}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Тенденции рынка</CardTitle>
          <CardDescription>
            Визуализация рыночных данных и тенденций
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sp500" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="sp500">S&P 500</TabsTrigger>
              <TabsTrigger value="nasdaq">NASDAQ</TabsTrigger>
              <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
              <TabsTrigger value="interest">Процентные ставки</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sp500" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { date: "Янв", value: 4700 },
                      { date: "Фев", value: 4650 },
                      { date: "Мар", value: 4730 },
                      { date: "Апр", value: 4780 },
                      { date: "Май", value: 4850 },
                      { date: "Июн", value: 4892 }
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 border rounded-lg bg-muted/10">
                  <div className="text-xs text-muted-foreground">Изменение за 6 мес</div>
                  <div className="text-lg font-bold text-green-600">+4.09%</div>
                </div>
                <div className="p-3 border rounded-lg bg-muted/10">
                  <div className="text-xs text-muted-foreground">Волатильность</div>
                  <div className="text-lg font-bold">12.45%</div>
                </div>
                <div className="p-3 border rounded-lg bg-muted/10">
                  <div className="text-xs text-muted-foreground">Тренд</div>
                  <div className="text-lg font-bold flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                    Восходящий
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nasdaq" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="flex items-center justify-center py-10">
                <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Выберите S&P 500 для просмотра данных
                </span>
              </div>
            </TabsContent>
            
            <TabsContent value="bitcoin" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="flex items-center justify-center py-10">
                <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Выберите S&P 500 для просмотра данных
                </span>
              </div>
            </TabsContent>
            
            <TabsContent value="interest" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="flex items-center justify-center py-10">
                <Info className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Выберите S&P 500 для просмотра данных
                </span>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}