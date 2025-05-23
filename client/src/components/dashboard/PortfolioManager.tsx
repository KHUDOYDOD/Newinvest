import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from "recharts";
import { 
  PieChart as PieChartIcon, 
  LineChart, 
  BarChart3, 
  Briefcase, 
  ArrowRight, 
  ArrowUpDown, 
  Plus, 
  Minus,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// Примеры данных для отображения
const portfolioData = {
  totalValue: 12458.94,
  profit: 1624.35,
  profitPercentage: 14.98,
  lastUpdate: "20.05.2025 12:45",
  allocation: [
    { name: "Акции", value: 5670.23, percentage: 45.5, color: "#8884d8" },
    { name: "Облигации", value: 3245.67, percentage: 26.1, color: "#82ca9d" },
    { name: "Криптовалюты", value: 2123.89, percentage: 17.0, color: "#ffc658" },
    { name: "Товары", value: 1012.45, percentage: 8.1, color: "#ff8042" },
    { name: "Наличные", value: 406.70, percentage: 3.3, color: "#0088fe" }
  ],
  performance: [
    { month: "Дек", value: 10320 },
    { month: "Янв", value: 10680 },
    { month: "Фев", value: 10450 },
    { month: "Мар", value: 11020 },
    { month: "Апр", value: 11580 },
    { month: "Май", value: 12459 }
  ],
  assets: [
    { 
      id: 1, 
      name: "Apple Inc.", 
      symbol: "AAPL", 
      type: "Акции",
      quantity: 15,
      price: 182.34,
      value: 2735.10,
      profit: 324.65,
      profitPercentage: 13.5,
      trend: "up"
    },
    { 
      id: 2, 
      name: "US Treasury Bond", 
      symbol: "USTB", 
      type: "Облигации",
      quantity: 25,
      price: 98.45,
      value: 2461.25,
      profit: 102.34,
      profitPercentage: 4.3,
      trend: "up"
    },
    { 
      id: 3, 
      name: "Bitcoin", 
      symbol: "BTC", 
      type: "Криптовалюты",
      quantity: 0.05,
      price: 28976.54,
      value: 1448.83,
      profit: 256.87,
      profitPercentage: 21.5,
      trend: "up"
    },
    { 
      id: 4, 
      name: "Ethereum", 
      symbol: "ETH", 
      type: "Криптовалюты",
      quantity: 0.45,
      price: 1500.12,
      value: 675.05,
      profit: -45.28,
      profitPercentage: -6.3,
      trend: "down"
    },
    { 
      id: 5, 
      name: "Gold ETF", 
      symbol: "GLD", 
      type: "Товары",
      quantity: 5,
      price: 202.49,
      value: 1012.45,
      profit: 87.45,
      profitPercentage: 9.4,
      trend: "up"
    }
  ],
  recommendedActions: [
    {
      id: 1,
      type: "rebalance",
      title: "Ребалансировка портфеля",
      description: "Текущее распределение отклоняется от целевого на 5.3%. Рекомендуется ребалансировка.",
      importance: "medium"
    },
    {
      id: 2,
      type: "diversify",
      title: "Повышение диверсификации",
      description: "Добавьте ETF на развивающиеся рынки для снижения общего риска портфеля.",
      importance: "high"
    },
    {
      id: 3,
      type: "tax",
      title: "Налоговая оптимизация",
      description: "Возможность применить налоговый вычет для инвестиций в облигации.",
      importance: "low"
    }
  ]
};

// Компонент управления портфелем - Новая функция 1 для личного кабинета
export default function PortfolioManager() {
  const [activeTab, setActiveTab] = useState("overview");
  const [assetView, setAssetView] = useState("all");
  
  // Фильтрация активов в зависимости от выбранного вида
  const filteredAssets = assetView === "all" 
    ? portfolioData.assets 
    : portfolioData.assets.filter(asset => asset.type === assetView);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Управление портфелем</h2>
          <p className="text-muted-foreground">
            Отслеживайте, анализируйте и оптимизируйте ваши инвестиции
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Переброс средств
          </Button>
          <Button size="sm" className="gradient-bg text-white">
            <Plus className="mr-2 h-4 w-4" />
            Добавить актив
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Стоимость портфеля
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(portfolioData.totalValue)}
            </div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className={`${portfolioData.profitPercentage >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {portfolioData.profitPercentage >= 0 ? '+' : ''}{portfolioData.profitPercentage}%
              </Badge>
              <span className="text-sm text-muted-foreground ml-2">
                за всё время
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Общая прибыль
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioData.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioData.profit >= 0 ? '+' : ''}{formatCurrency(portfolioData.profit)}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground">
                Последнее обновление: {portfolioData.lastUpdate}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Рекомендации
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {portfolioData.recommendedActions.map(action => (
                <div key={action.id} className="flex items-start gap-2">
                  {action.importance === "high" ? (
                    <AlertCircle className="h-4 w-4 mt-0.5 text-red-500" />
                  ) : action.importance === "medium" ? (
                    <Info className="h-4 w-4 mt-0.5 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-blue-500" />
                  )}
                  <span className="text-sm">{action.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            <span>Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Активы</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Динамика</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Распределение портфеля</CardTitle>
              <CardDescription>
                Текущее распределение ваших инвестиций по классам активов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData.allocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        innerRadius={60}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {portfolioData.allocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="space-y-4">
                    {portfolioData.allocation.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-sm mr-2" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className="space-x-4">
                          <span className="text-muted-foreground">
                            {item.percentage}%
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" size="sm">
                      Изменить целевое распределение
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Рекомендуемые действия</CardTitle>
              <CardDescription>
                Персональные рекомендации для оптимизации вашего портфеля
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.recommendedActions.map(action => (
                  <div key={action.id} className="p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`p-2.5 rounded-full ${
                          action.importance === "high" ? "bg-red-100" :
                          action.importance === "medium" ? "bg-amber-100" : "bg-blue-100"
                        }`}>
                          {action.importance === "high" ? (
                            <AlertCircle className={`h-5 w-5 ${
                              action.importance === "high" ? "text-red-600" :
                              action.importance === "medium" ? "text-amber-600" : "text-blue-600"
                            }`} />
                          ) : action.importance === "medium" ? (
                            <Info className={`h-5 w-5 ${
                              action.importance === "high" ? "text-red-600" :
                              action.importance === "medium" ? "text-amber-600" : "text-blue-600"
                            }`} />
                          ) : (
                            <CheckCircle2 className={`h-5 w-5 ${
                              action.importance === "high" ? "text-red-600" :
                              action.importance === "medium" ? "text-amber-600" : "text-blue-600"
                            }`} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{action.title}</h4>
                          <p className="text-muted-foreground text-sm mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getImportanceColor(action.importance)}>
                        {action.importance === "high" ? "Высокий приоритет" :
                         action.importance === "medium" ? "Средний приоритет" : "Низкий приоритет"}
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button size="sm">
                        Применить рекомендацию
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assets" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Ваши активы</CardTitle>
                  <CardDescription>
                    Детальная информация о каждом активе в вашем портфеле
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  <Button 
                    size="sm" 
                    variant={assetView === "all" ? "default" : "outline"}
                    onClick={() => setAssetView("all")}
                  >
                    Все
                  </Button>
                  <Button 
                    size="sm" 
                    variant={assetView === "Акции" ? "default" : "outline"}
                    onClick={() => setAssetView("Акции")}
                  >
                    Акции
                  </Button>
                  <Button 
                    size="sm" 
                    variant={assetView === "Облигации" ? "default" : "outline"}
                    onClick={() => setAssetView("Облигации")}
                  >
                    Облигации
                  </Button>
                  <Button 
                    size="sm" 
                    variant={assetView === "Криптовалюты" ? "default" : "outline"}
                    onClick={() => setAssetView("Криптовалюты")}
                  >
                    Крипто
                  </Button>
                  <Button 
                    size="sm" 
                    variant={assetView === "Товары" ? "default" : "outline"}
                    onClick={() => setAssetView("Товары")}
                  >
                    Товары
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Название</th>
                      <th className="text-right py-3 px-4 font-medium">Тип</th>
                      <th className="text-right py-3 px-4 font-medium">Количество</th>
                      <th className="text-right py-3 px-4 font-medium">Цена</th>
                      <th className="text-right py-3 px-4 font-medium">Стоимость</th>
                      <th className="text-right py-3 px-4 font-medium">Прибыль</th>
                      <th className="text-right py-3 px-4 font-medium">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map(asset => (
                      <tr key={asset.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Badge variant="outline">{asset.type}</Badge>
                        </td>
                        <td className="py-4 px-4 text-right">{asset.quantity}</td>
                        <td className="py-4 px-4 text-right">{formatCurrency(asset.price)}</td>
                        <td className="py-4 px-4 text-right font-medium">{formatCurrency(asset.value)}</td>
                        <td className="py-4 px-4 text-right">
                          <div className={asset.profit >= 0 ? "text-green-600" : "text-red-600"}>
                            {asset.profit >= 0 ? "+" : ""}{formatCurrency(asset.profit)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {asset.profit >= 0 ? "+" : ""}{asset.profitPercentage}%
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" size="sm">Экспорт в CSV</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Динамика портфеля</CardTitle>
              <CardDescription>
                Изменение стоимости вашего портфеля за последние 6 месяцев
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={portfolioData.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Стоимость портфеля" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Аналитика эффективности</CardTitle>
              <CardDescription>
                Показатели эффективности вашего портфеля
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Показатели доходности</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">Общая доходность</div>
                        <div className="text-xl font-bold text-green-600">+14.98%</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">Годовая доходность</div>
                        <div className="text-xl font-bold text-green-600">+23.75%</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">Дивидендная доходность</div>
                        <div className="text-xl font-bold">2.45%</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Показатели риска</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">Волатильность</div>
                        <div className="text-xl font-bold">12.34%</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">Коэффициент Шарпа</div>
                        <div className="text-xl font-bold">1.45</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">Максимальная просадка</div>
                        <div className="text-xl font-bold text-red-600">-8.92%</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Сравнение с индексами</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">vs S&P 500</div>
                        <div className="text-xl font-bold text-green-600">+4.23%</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">vs NASDAQ</div>
                        <div className="text-xl font-bold text-red-600">-1.67%</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground">vs Индекс облигаций</div>
                        <div className="text-xl font-bold text-green-600">+7.85%</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}