import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  DollarSign, Download, Printer, Share2, Calendar,
  TrendingUp, TrendingDown, BarChart2, PieChart,
  ArrowUpRight, ArrowDownRight, Clock, FileText,
  Receipt, ChevronDown, ChevronUp, Info, Mail
} from "lucide-react";

// Пример данных для отчетов о доходах
const earningsData = {
  summary: {
    totalEarnings: 4328.75,
    period: "2025, 1 квартал",
    change: 14.8,
    previousPeriod: 3770.69,
    sources: [
      { name: "Дивиденды", amount: 723.45, percentage: 16.7, change: 8.3 },
      { name: "Прирост капитала", amount: 2841.30, percentage: 65.6, change: 18.9 },
      { name: "Проценты", amount: 487.50, percentage: 11.3, change: 5.2 },
      { name: "Партнерские программы", amount: 276.50, percentage: 6.4, change: 12.8 }
    ]
  },
  monthlyEarnings: [
    { month: "Янв", earnings: 1385.25, expenses: 285.30 },
    { month: "Фев", earnings: 1426.80, expenses: 298.75 },
    { month: "Мар", earnings: 1516.70, expenses: 305.40 },
    { month: "Апр", earnings: 1610.20, expenses: 315.90 },
    { month: "Май", earnings: 1685.50, expenses: 325.10 },
    { month: "Июн", earnings: 1582.30, expenses: 320.45 }
  ],
  assetPerformance: [
    {
      name: "Apple Inc. (AAPL)",
      type: "Акции",
      earnings: 842.50,
      change: 18.7,
      percentage: 19.5
    },
    {
      name: "S&P 500 ETF (SPY)",
      type: "ETF",
      earnings: 625.30,
      change: 12.4,
      percentage: 14.4
    },
    {
      name: "Microsoft Corp. (MSFT)",
      type: "Акции",
      earnings: 756.80,
      change: 15.9,
      percentage: 17.5
    },
    {
      name: "US Treasury Bond",
      type: "Облигации",
      earnings: 387.45,
      change: 4.8,
      percentage: 9.0
    },
    {
      name: "Bitcoin (BTC)",
      type: "Криптовалюта",
      earnings: 1250.75,
      change: 32.6,
      percentage: 28.9
    },
    {
      name: "Ethereum (ETH)",
      type: "Криптовалюта",
      earnings: 465.95,
      change: 24.3,
      percentage: 10.7
    }
  ],
  taxInfo: {
    estimatedTax: 738.90,
    taxRate: 17.1,
    deductions: 125.40,
    netEarnings: 3589.85,
    categories: [
      { category: "Дивиденды", taxRate: 13, amount: 94.05 },
      { category: "Прирост капитала (долгосрочный)", taxRate: 15, amount: 285.45 },
      { category: "Прирост капитала (краткосрочный)", taxRate: 22, amount: 246.40 },
      { category: "Проценты", taxRate: 13, amount: 63.38 },
      { category: "Другое", taxRate: 13, amount: 49.62 }
    ]
  },
  historicalReports: [
    { period: "2024, 4 квартал", earnings: 3770.69, change: 8.9, link: "#" },
    { period: "2024, 3 квартал", earnings: 3462.45, change: 6.2, link: "#" },
    { period: "2024, 2 квартал", earnings: 3260.12, change: 5.4, link: "#" },
    { period: "2024, 1 квартал", earnings: 3092.15, change: -2.1, link: "#" },
    { period: "2023, 4 квартал", earnings: 3158.50, change: 12.3, link: "#" }
  ]
};

// Компонент для отчета о доходах - Новая функция 10 для личного кабинета
export default function EarningsReport() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<string>(earningsData.summary.period);
  
  // Форматирование валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Форматирование процентов
  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value}%`;
  };
  
  // Получение цвета для изменения
  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };
  
  // Получение иконки для изменения
  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <ArrowUpRight className="h-4 w-4" />
    ) : (
      <ArrowDownRight className="h-4 w-4" />
    );
  };
  
  // Получение максимального значения для графика
  const getMaxChartValue = () => {
    return Math.max(...earningsData.monthlyEarnings.map(item => item.earnings)) * 1.1;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Отчет о доходах</h2>
          <p className="text-muted-foreground">
            Детальная информация о ваших инвестиционных доходах и их структуре
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={earningsData.summary.period}>{earningsData.summary.period}</SelectItem>
              {earningsData.historicalReports.map((report, index) => (
                <SelectItem key={index} value={report.period}>{report.period}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Общий доход за {selectedPeriod}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(earningsData.summary.totalEarnings)}
            </div>
            <div className="flex items-center mt-1">
              <Badge 
                variant="outline" 
                className={`flex items-center gap-1 ${
                  earningsData.summary.change >= 0 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {getChangeIcon(earningsData.summary.change)}
                {formatPercent(earningsData.summary.change)}
              </Badge>
              <span className="text-sm text-muted-foreground ml-2">
                vs предыдущий период
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Чистая прибыль (после налогов)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(earningsData.taxInfo.netEarnings)}
            </div>
            <div className="flex items-center mt-1">
              <Progress 
                value={
                  (earningsData.taxInfo.netEarnings / earningsData.summary.totalEarnings) * 100
                } 
                className="w-1/3 h-2 mr-2" 
              />
              <span className="text-sm text-muted-foreground">
                {Math.round((earningsData.taxInfo.netEarnings / earningsData.summary.totalEarnings) * 100)}% от общего дохода
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Предполагаемые налоги
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(earningsData.taxInfo.estimatedTax)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Эффективная ставка: {earningsData.taxInfo.taxRate}%
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
            <PieChart className="h-4 w-4" />
            <span>Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>По активам</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span>Налоги</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>История</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Структура доходов</CardTitle>
              <CardDescription>
                Разбивка ваших доходов по различным источникам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="relative aspect-square md:aspect-auto md:h-[300px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-background flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground">Всего</div>
                        <div className="font-bold">{formatCurrency(earningsData.summary.totalEarnings)}</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {earningsData.summary.sources.map((source, index) => {
                        let startAngle = 0;
                        for (let i = 0; i < index; i++) {
                          startAngle += (earningsData.summary.sources[i].percentage / 100) * 360;
                        }
                        const angle = (source.percentage / 100) * 360;
                        const largeArcFlag = source.percentage > 50 ? 1 : 0;
                        
                        // Расчет координат для сектора диаграммы
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                        
                        // Цветовая схема
                        const getColor = () => {
                          const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];
                          return colors[index % colors.length];
                        };
                        
                        const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                        
                        return (
                          <path 
                            key={index} 
                            d={pathData} 
                            fill={getColor()} 
                            stroke="white" 
                            strokeWidth="0.5"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {earningsData.summary.sources.map((source, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{source.name}</div>
                        <Badge variant="outline">
                          {source.percentage}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xl font-bold">{formatCurrency(source.amount)}</div>
                        <div className={`flex items-center ${getChangeColor(source.change)}`}>
                          {getChangeIcon(source.change)}
                          <span className="ml-1">{formatPercent(source.change)}</span>
                        </div>
                      </div>
                      <Progress 
                        value={source.percentage} 
                        className="h-1" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Месячная динамика</CardTitle>
              <CardDescription>
                Изменение ваших доходов и расходов по месяцам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="h-full flex items-end space-x-2">
                  {earningsData.monthlyEarnings.map((item, index) => {
                    const maxValue = getMaxChartValue();
                    const earningsHeight = (item.earnings / maxValue) * 100;
                    const expensesHeight = (item.expenses / maxValue) * 100;
                    
                    return (
                      <div 
                        key={index}
                        className="flex-1 flex flex-col items-center justify-end h-[250px]"
                      >
                        <div className="w-full flex justify-center items-end h-full gap-1">
                          <div
                            className="w-1/2 rounded-t-sm bg-primary"
                            style={{ height: `${earningsHeight}%` }}
                          ></div>
                          <div
                            className="w-1/3 rounded-t-sm bg-amber-400"
                            style={{ height: `${expensesHeight}%` }}
                          ></div>
                        </div>
                        <div className="w-full text-center text-xs text-muted-foreground mt-2">
                          {item.month}
                        </div>
                        <div className="w-full text-center text-[10px] text-muted-foreground">
                          {formatCurrency(item.earnings)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-sm"></div>
                  <span className="text-sm">Доходы</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                  <span className="text-sm">Расходы</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assets" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Доходность по активам</CardTitle>
              <CardDescription>
                Разбивка доходов по отдельным инвестиционным активам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Актив</th>
                      <th className="text-left py-3 px-4 font-medium">Тип</th>
                      <th className="text-right py-3 px-4 font-medium">Доход</th>
                      <th className="text-right py-3 px-4 font-medium">Доля</th>
                      <th className="text-right py-3 px-4 font-medium">Изменение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earningsData.assetPerformance.map((asset, index) => (
                      <tr key={index} className="border-b hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-4 font-medium">{asset.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{asset.type}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatCurrency(asset.earnings)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {asset.percentage}%
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className={`flex items-center justify-end ${getChangeColor(asset.change)}`}>
                            {getChangeIcon(asset.change)}
                            <span className="ml-1">{formatPercent(asset.change)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Топ исполнители</h4>
                  <div className="space-y-3">
                    {earningsData.assetPerformance
                      .sort((a, b) => b.change - a.change)
                      .slice(0, 3)
                      .map((asset, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-1.5 rounded-full bg-green-100 text-green-800 mr-2">
                              <TrendingUp className="h-4 w-4" />
                            </div>
                            <span>{asset.name}</span>
                          </div>
                          <div className="text-green-600 font-medium">
                            +{asset.change}%
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Активы с наибольшим доходом</h4>
                  <div className="space-y-3">
                    {earningsData.assetPerformance
                      .sort((a, b) => b.earnings - a.earnings)
                      .slice(0, 3)
                      .map((asset, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-1.5 rounded-full bg-blue-100 text-blue-800 mr-2">
                              <DollarSign className="h-4 w-4" />
                            </div>
                            <span>{asset.name}</span>
                          </div>
                          <div className="font-medium">
                            {formatCurrency(asset.earnings)}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Распределение по типам активов</CardTitle>
              <CardDescription>
                Вклад различных типов активов в общий доход
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  // Группировка активов по типу
                  const typeGroups = earningsData.assetPerformance.reduce((groups, asset) => {
                    if (!groups[asset.type]) {
                      groups[asset.type] = {
                        type: asset.type,
                        earnings: 0,
                        percentage: 0
                      };
                    }
                    groups[asset.type].earnings += asset.earnings;
                    return groups;
                  }, {} as Record<string, { type: string; earnings: number; percentage: number }>);
                  
                  // Расчет процентов
                  const totalEarnings = Object.values(typeGroups).reduce((sum, group) => sum + group.earnings, 0);
                  Object.values(typeGroups).forEach(group => {
                    group.percentage = Math.round((group.earnings / totalEarnings) * 100);
                  });
                  
                  return Object.values(typeGroups).map((group, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{group.type}</div>
                        <Badge variant="outline">
                          {group.percentage}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xl font-bold">{formatCurrency(group.earnings)}</div>
                      </div>
                      <Progress 
                        value={group.percentage} 
                        className="h-1" 
                      />
                    </div>
                  ));
                })()}
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50 mt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Анализ распределения доходов</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Ваш портфель демонстрирует высокую доходность от криптовалют и технологических акций.
                      Хотя это привело к отличным результатам в текущем квартале, рассмотрите возможность диверсификации
                      для снижения долгосрочных рисков.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Налоговая информация</CardTitle>
              <CardDescription>
                Предполагаемые налоговые обязательства по вашим инвестиционным доходам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Общий доход</div>
                    <div className="text-xl font-bold">{formatCurrency(earningsData.summary.totalEarnings)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Налоговые вычеты</div>
                    <div className="text-xl font-bold">{formatCurrency(earningsData.taxInfo.deductions)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Предполагаемый налог</div>
                    <div className="text-xl font-bold">{formatCurrency(earningsData.taxInfo.estimatedTax)}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Чистый доход после налогообложения</div>
                    <div className="text-xl font-bold text-green-600">{formatCurrency(earningsData.taxInfo.netEarnings)}</div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Эффективная налоговая ставка</span>
                      <span className="font-medium">{earningsData.taxInfo.taxRate}%</span>
                    </div>
                    <Progress 
                      value={earningsData.taxInfo.taxRate} 
                      className="h-1.5" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Разбивка по налоговым категориям</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Категория дохода</th>
                        <th className="text-right py-3 px-4 font-medium">Налоговая ставка</th>
                        <th className="text-right py-3 px-4 font-medium">Налоговая база</th>
                        <th className="text-right py-3 px-4 font-medium">Сумма налога</th>
                      </tr>
                    </thead>
                    <tbody>
                      {earningsData.taxInfo.categories.map((category, index) => (
                        <tr key={index} className="border-b hover:bg-muted/10 transition-colors">
                          <td className="py-3 px-4">{category.category}</td>
                          <td className="py-3 px-4 text-right">{category.taxRate}%</td>
                          <td className="py-3 px-4 text-right">
                            {formatCurrency(category.amount / (category.taxRate / 100))}
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            {formatCurrency(category.amount)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-muted/10">
                        <td className="py-3 px-4 font-medium">Итого</td>
                        <td className="py-3 px-4 text-right">-</td>
                        <td className="py-3 px-4 text-right">
                          {formatCurrency(earningsData.summary.totalEarnings)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          {formatCurrency(earningsData.taxInfo.estimatedTax)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Важная информация</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Данные о налогах являются предварительными и могут измениться</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Предполагаемый срок подачи налоговой декларации: 30 апреля 2025</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Receipt className="h-4 w-4 text-primary mt-1" />
                      <span className="text-sm">Точный расчет налогов следует производить с учетом всех доходов и вычетов</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg bg-amber-50">
                  <h4 className="font-medium mb-3 text-amber-800">Налоговая оптимизация</h4>
                  <p className="text-sm text-amber-700 mb-4">
                    Вы можете снизить налоговые обязательства с помощью следующих стратегий:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronDown className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm text-amber-700">Используйте налоговые вычеты на долгосрочные инвестиции</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronDown className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm text-amber-700">Рассмотрите инвестиции через налогово-эффективные инструменты</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronDown className="h-4 w-4 text-amber-600 mt-1" />
                      <span className="text-sm text-amber-700">Запланируйте реализацию убытков для оптимизации налоговой базы</span>
                    </li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-3">
                    Подробнее о налоговой оптимизации
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>История отчетов</CardTitle>
              <CardDescription>
                Доступ к вашим предыдущим отчетам о доходах
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Период</th>
                      <th className="text-right py-3 px-4 font-medium">Общий доход</th>
                      <th className="text-right py-3 px-4 font-medium">Изменение</th>
                      <th className="text-right py-3 px-4 font-medium">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-muted/10">
                      <td className="py-3 px-4 font-medium">{earningsData.summary.period}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        {formatCurrency(earningsData.summary.totalEarnings)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className={`flex items-center justify-end ${getChangeColor(earningsData.summary.change)}`}>
                          {getChangeIcon(earningsData.summary.change)}
                          <span className="ml-1">{formatPercent(earningsData.summary.change)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="secondary">Текущий</Badge>
                      </td>
                    </tr>
                    {earningsData.historicalReports.map((report, index) => (
                      <tr key={index} className="border-b hover:bg-muted/10 transition-colors">
                        <td className="py-3 px-4">
                          <Button 
                            variant="link" 
                            className="p-0 h-auto" 
                            onClick={() => setSelectedPeriod(report.period)}
                          >
                            {report.period}
                          </Button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatCurrency(report.earnings)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className={`flex items-center justify-end ${getChangeColor(report.change)}`}>
                            {getChangeIcon(report.change)}
                            <span className="ml-1">{formatPercent(report.change)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Годовой отчет</CardTitle>
              <CardDescription>
                Сводный отчет о доходах за текущий год
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Общий доход за 2025 год</div>
                    <div className="text-2xl font-bold mt-1">$12,585.41</div>
                    <div className="text-sm text-green-600 mt-1">+18.7% к прошлому году</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Средний месячный доход</div>
                    <div className="text-2xl font-bold mt-1">$1,520.65</div>
                    <Progress 
                      value={75} 
                      className="h-1.5 mt-2 w-2/3 mx-auto" 
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Ожидаемые налоги за год</div>
                    <div className="text-2xl font-bold mt-1">$2,149.57</div>
                    <div className="text-sm text-muted-foreground mt-1">Эффективная ставка: 17.1%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Сформировать полный годовой отчет
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}