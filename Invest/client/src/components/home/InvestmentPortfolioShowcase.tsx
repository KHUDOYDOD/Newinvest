import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Briefcase, BarChart3, Percent } from "lucide-react";

// Примеры портфелей для разных стратегий
const portfolioData = {
  conservative: {
    title: "Консервативный",
    description: "Минимальный риск с фокусом на стабильный доход",
    annualReturn: 8.5,
    volatility: "Низкая",
    riskLevel: "Низкий",
    minInvestment: 500,
    recommendedTerm: "От 1 года",
    allocation: [
      { name: "Государственные облигации", percentage: 40, color: "#4338ca" },
      { name: "Корпоративные облигации", percentage: 30, color: "#6366f1" },
      { name: "Дивидендные акции", percentage: 15, color: "#818cf8" },
      { name: "Денежный рынок", percentage: 10, color: "#93c5fd" },
      { name: "Золото", percentage: 5, color: "#fde68a" }
    ],
    monthlyPerformance: [2.1, 1.2, -0.8, 1.5, 0.9, 1.4, 0.7, 0.5, 1.1, -0.3, 0.8, 1.2]
  },
  balanced: {
    title: "Сбалансированный",
    description: "Оптимальное соотношение риска и доходности",
    annualReturn: 12.7,
    volatility: "Средняя",
    riskLevel: "Средний",
    minInvestment: 1000,
    recommendedTerm: "От 2 лет",
    allocation: [
      { name: "Акции компаний США", percentage: 30, color: "#0369a1" },
      { name: "Европейские акции", percentage: 20, color: "#0ea5e9" },
      { name: "Корпоративные облигации", percentage: 25, color: "#7dd3fc" },
      { name: "Недвижимость (REIT)", percentage: 15, color: "#84cc16" },
      { name: "Золото и драгметаллы", percentage: 10, color: "#facc15" }
    ],
    monthlyPerformance: [3.2, 2.1, -1.5, 2.8, 1.3, 1.9, -0.8, 1.2, 2.3, -1.1, 1.5, 2.2]
  },
  aggressive: {
    title: "Агрессивный рост",
    description: "Максимальная доходность при высоком риске",
    annualReturn: 18.3,
    volatility: "Высокая",
    riskLevel: "Высокий",
    minInvestment: 2500,
    recommendedTerm: "От 3 лет",
    allocation: [
      { name: "Технологические акции", percentage: 35, color: "#7c3aed" },
      { name: "Акции развивающихся рынков", percentage: 25, color: "#a855f7" },
      { name: "Биотехнологии", percentage: 15, color: "#c084fc" },
      { name: "Криптовалюты", percentage: 15, color: "#2563eb" },
      { name: "Венчурные инвестиции", percentage: 10, color: "#3b82f6" }
    ],
    monthlyPerformance: [4.1, 3.2, -2.7, 5.1, -1.8, 3.5, 2.9, -2.2, 4.3, -3.1, 2.7, 3.8]
  },
  crypto: {
    title: "Криптопортфель",
    description: "Высокодоходная стратегия для цифровых активов",
    annualReturn: 25.2,
    volatility: "Очень высокая",
    riskLevel: "Очень высокий",
    minInvestment: 5000,
    recommendedTerm: "От 3 лет",
    allocation: [
      { name: "Bitcoin (BTC)", percentage: 40, color: "#f59e0b" },
      { name: "Ethereum (ETH)", percentage: 30, color: "#3b82f6" },
      { name: "Solana (SOL)", percentage: 10, color: "#10b981" },
      { name: "Polkadot (DOT)", percentage: 10, color: "#ec4899" },
      { name: "Другие альткоины", percentage: 10, color: "#8b5cf6" }
    ],
    monthlyPerformance: [8.3, -5.7, 12.4, -9.2, 15.6, -7.3, 9.5, 6.8, -8.1, 13.7, -6.2, 10.5]
  }
};

// Новая функция 10: Витрина инвестиционных портфелей с интерактивным выбором
export function InvestmentPortfolioShowcase() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("balanced");
  const portfolio = portfolioData[selectedPortfolio as keyof typeof portfolioData];
  
  // Расчет значений для графика эффективности
  const getPerformanceGraph = () => {
    const performanceData = portfolio.monthlyPerformance;
    const maxValue = Math.max(...performanceData);
    const minValue = Math.min(...performanceData);
    const range = Math.max(Math.abs(maxValue), Math.abs(minValue));
    
    return performanceData.map((value, index) => {
      const height = (Math.abs(value) / range) * 100;
      const isPositive = value >= 0;
      
      return (
        <div key={index} className="flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center justify-end h-20">
            <div 
              className={`w-4 rounded-t-sm ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ 
                height: `${height}%`, 
                position: 'absolute',
                bottom: isPositive ? '50%' : 'auto',
                top: isPositive ? 'auto' : '50%'
              }}
            ></div>
            <div className="absolute top-1/2 h-px w-full bg-gray-200"></div>
          </div>
          {index % 3 === 0 && (
            <div className="text-xs text-muted-foreground mt-1">
              {["Янв", "Апр", "Июл", "Окт"][index/3]}
            </div>
          )}
        </div>
      );
    });
  };

  // Отрисовка диаграммы распределения активов
  const renderAllocationChart = () => {
    let startAngle = 0;
    
    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {portfolio.allocation.map((item, index) => {
            const percentage = item.percentage;
            const angle = (percentage / 100) * 360;
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            // Расчет координат для сектора диаграммы
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
            
            const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            const currentStartAngle = startAngle;
            startAngle += angle;
            
            return (
              <path 
                key={index} 
                d={pathData} 
                fill={item.color} 
                stroke="white" 
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xs text-muted-foreground">Доходность</span>
          <span className="text-2xl font-bold">{portfolio.annualReturn}%</span>
          <span className="text-xs text-muted-foreground">годовых</span>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block p-2.5 bg-green-100 rounded-full mb-4">
            <Briefcase className="h-6 w-6 text-green-700" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Инвестиционные портфели
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Выберите стратегию, которая соответствует вашим целям и уровню риска.
            Мы предлагаем профессионально управляемые портфели для любых предпочтений.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs
            value={selectedPortfolio}
            onValueChange={setSelectedPortfolio}
            className="space-y-8"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="conservative">
                Консервативный
              </TabsTrigger>
              <TabsTrigger value="balanced">
                Сбалансированный
              </TabsTrigger>
              <TabsTrigger value="aggressive">
                Агрессивный
              </TabsTrigger>
              <TabsTrigger value="crypto">
                Крипто
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedPortfolio} className="focus-visible:outline-none focus-visible:ring-0">
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {portfolio.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">{portfolio.description}</p>
                    </div>
                    <div className="bg-green-50 text-green-700 flex items-center px-3 py-1.5 rounded-full">
                      <Percent className="h-4 w-4 mr-1" />
                      <span className="font-medium">{portfolio.annualReturn}% годовых</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                        Распределение активов
                      </h4>
                      <div className="flex">
                        {renderAllocationChart()}
                        <div className="ml-6 space-y-2">
                          {portfolio.allocation.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-sm mr-2" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <div className="text-sm">
                                <span className="font-medium">{item.percentage}%</span>
                                <span className="text-muted-foreground ml-2">{item.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <Percent className="h-5 w-5 mr-2 text-primary" />
                        Доходность по месяцам
                      </h4>
                      <div className="mt-4">
                        <div className="flex justify-between items-end h-40 gap-1">
                          {getPerformanceGraph()}
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            <span className="text-muted-foreground">Прибыль</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                            <span className="text-muted-foreground">Убыток</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Волатильность</p>
                      <p className="font-medium">{portfolio.volatility}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Уровень риска</p>
                      <p className="font-medium">{portfolio.riskLevel}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Мин. инвестиция</p>
                      <p className="font-medium">${portfolio.minInvestment}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Рек. срок</p>
                      <p className="font-medium">{portfolio.recommendedTerm}</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
                    <p>
                      <strong>Примечание:</strong> Исторические показатели доходности не гарантируют будущих 
                      результатов. Перед инвестированием рекомендуем проконсультироваться с финансовым советником.
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <button className="gradient-bg text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
                      Инвестировать в этот портфель
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}