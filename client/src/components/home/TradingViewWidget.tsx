import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Новая функция 1: Торговый виджет с графиками криптовалют
export function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("btcusd");

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Создаем контейнер для виджета
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Настройки виджета
    const symbol = activeTab === "btcusd" ? "BITSTAMP:BTCUSD" : 
                  activeTab === "ethusd" ? "BITSTAMP:ETHUSD" : 
                  activeTab === "xrpusd" ? "BITSTAMP:XRPUSD" : "BITSTAMP:BTCUSD";
    
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "ru",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "save_image": false,
      "calendar": false,
      "hide_volume": true,
      "support_host": "https://www.tradingview.com"
    });
    
    // Очищаем контейнер перед добавлением нового виджета
    if (containerRef.current.firstChild) {
      containerRef.current.innerHTML = '';
    }
    
    // Добавляем скрипт в контейнер
    containerRef.current.appendChild(script);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [activeTab]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Следите за рынком в реальном времени
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Анализируйте движение крипторынка с помощью профессиональных инструментов
            и принимайте взвешенные инвестиционные решения.
          </p>
        </div>
        
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>График котировок</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="btcusd">BTC/USD</TabsTrigger>
                  <TabsTrigger value="ethusd">ETH/USD</TabsTrigger>
                  <TabsTrigger value="xrpusd">XRP/USD</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div ref={containerRef} style={{ height: "400px" }} className="tradingview-widget-container" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}