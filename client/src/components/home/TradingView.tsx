import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, RefreshCw, ChevronRight } from "lucide-react";

const CANDLE_COUNT = 20;
const MAX_PRICE = 65000;
const MIN_PRICE = 55000;

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateRandomCandles = (count: number): Candle[] => {
  const candles: Candle[] = [];
  let lastClose = 60000; // Starting price
  
  for (let i = 0; i < count; i++) {
    // Generate random price movement
    const changePercent = (Math.random() * 2 - 1) * 0.02; // -1% to +1%
    const change = lastClose * changePercent;
    
    const open = lastClose;
    const close = Math.max(MIN_PRICE, Math.min(MAX_PRICE, open + change));
    
    // High and low should encompass open and close
    const highExtra = Math.random() * Math.abs(change) * 0.5;
    const lowExtra = Math.random() * Math.abs(change) * 0.5;
    
    const high = Math.max(open, close) + highExtra;
    const low = Math.min(open, close) - lowExtra;
    
    const volume = Math.floor(Math.random() * 500) + 100; // Random volume
    
    const date = new Date();
    date.setMinutes(date.getMinutes() - (count - i) * 15);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume
    });
    
    lastClose = close;
  }
  
  return candles;
};

export function TradingView() {
  const [activeChart, setActiveChart] = useState("BTC/USD");
  const [candles, setCandles] = useState<Candle[]>(generateRandomCandles(CANDLE_COUNT));
  const [priceChange, setPriceChange] = useState({ value: 0, percent: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calculate current price from last candle
  const currentPrice = candles[candles.length - 1]?.close || 0;
  const openPrice = candles[0]?.open || 0;
  
  useEffect(() => {
    // Calculate price change and percentage
    const value = currentPrice - openPrice;
    const percent = (value / openPrice) * 100;
    
    setPriceChange({
      value,
      percent
    });
  }, [candles, currentPrice, openPrice]);
  
  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate scale
    const maxPrice = Math.max(...candles.map(c => c.high));
    const minPrice = Math.min(...candles.map(c => c.low));
    const priceRange = maxPrice - minPrice;
    const candleWidth = canvas.width / (CANDLE_COUNT * 2);
    const candleSpacing = candleWidth;
    
    const scaleY = (price: number) => {
      const heightRatio = (price - minPrice) / priceRange;
      return canvas.height - (heightRatio * canvas.height * 0.8 + canvas.height * 0.1);
    };
    
    // Draw price lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    const priceLines = 5;
    for (let i = 0; i <= priceLines; i++) {
      const price = minPrice + (priceRange / priceLines) * i;
      const y = scaleY(price);
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
      
      // Draw price labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Montserrat';
      ctx.textAlign = 'right';
      ctx.fillText(`$${Math.round(price).toLocaleString()}`, canvas.width - 5, y - 5);
    }
    
    // Draw candles
    candles.forEach((candle, index) => {
      const x = index * (candleWidth + candleSpacing) + candleSpacing;
      const open = scaleY(candle.open);
      const close = scaleY(candle.close);
      const high = scaleY(candle.high);
      const low = scaleY(candle.low);
      
      // Determine if candle is up or down
      const isUp = candle.close > candle.open;
      ctx.fillStyle = isUp ? '#10b981' : '#ef4444';
      ctx.strokeStyle = isUp ? '#10b981' : '#ef4444';
      
      // Draw candle body
      ctx.fillRect(x, Math.min(open, close), candleWidth, Math.abs(close - open));
      
      // Draw candle wicks
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, high);
      ctx.lineTo(x + candleWidth / 2, Math.min(open, close));
      ctx.moveTo(x + candleWidth / 2, Math.max(open, close));
      ctx.lineTo(x + candleWidth / 2, low);
      ctx.stroke();
      
      // Draw time labels for every 5th candle
      if (index % 5 === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText(candle.time, x + candleWidth / 2, canvas.height - 5);
      }
    });
    
    // Draw current price line
    const currentY = scaleY(currentPrice);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.lineTo(canvas.width, currentY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Current price label
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 12px Montserrat';
    ctx.textAlign = 'left';
    ctx.fillText(`$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 5, currentY - 5);
    
  }, [candles, currentPrice]);
  
  // Update candles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prev => {
        // Update the last candle
        const updated = [...prev];
        const last = updated[updated.length - 1];
        
        // Generate random price movement
        const changePercent = (Math.random() * 2 - 1) * 0.01; // -0.5% to +0.5%
        const change = last.close * changePercent;
        const newClose = Math.max(MIN_PRICE, Math.min(MAX_PRICE, last.close + change));
        
        // Update high and low if needed
        const newHigh = Math.max(last.high, newClose);
        const newLow = Math.min(last.low, newClose);
        
        updated[updated.length - 1] = {
          ...last,
          high: newHigh,
          low: newLow,
          close: newClose,
          volume: last.volume + Math.floor(Math.random() * 20)
        };
        
        return updated;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="border rounded-xl shadow-md overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base flex items-center">
                {activeChart}
                <span className="text-sm font-normal ml-1 text-muted-foreground">График</span>
              </CardTitle>
            </div>
          </div>
          <div className="flex space-x-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setCandles(generateRandomCandles(CANDLE_COUNT))}
            />
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="chart" className="px-2">
        <TabsList className="grid grid-cols-2 w-48 mb-4 mx-4">
          <TabsTrigger value="chart">График цены</TabsTrigger>
          <TabsTrigger value="depth">Книга заявок</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="px-2">
          <div className="flex justify-between items-center mb-4 px-4">
            <div>
              <div className="text-2xl font-bold">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`flex items-center ${priceChange.value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange.value >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span>${Math.abs(priceChange.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="ml-1">({priceChange.percent.toFixed(2)}%)</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="text-xs border border-border rounded px-2 py-1 text-muted-foreground">1H</button>
              <button className="text-xs border border-primary rounded px-2 py-1 bg-primary/10 text-primary font-medium">1D</button>
              <button className="text-xs border border-border rounded px-2 py-1 text-muted-foreground">1W</button>
              <button className="text-xs border border-border rounded px-2 py-1 text-muted-foreground">1M</button>
            </div>
          </div>
          
          <div className="relative h-60 px-2">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 mb-4 px-4">
            <div>
              <div className="text-xs text-muted-foreground">Объем (24ч)</div>
              <div className="font-semibold">$3.2B</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Макс. (24ч)</div>
              <div className="font-semibold">${Math.max(...candles.map(c => c.high)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Мин. (24ч)</div>
              <div className="font-semibold">${Math.min(...candles.map(c => c.low)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="depth" className="space-y-4 px-6 py-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">Книга заявок</div>
            <div className="text-xs text-muted-foreground">Обновлено: только что</div>
          </div>
          
          <div className="space-y-2">
            {/* Buy orders */}
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Заявки на покупку</div>
              {[...Array(5)].map((_, i) => {
                const price = currentPrice * (1 - (i + 1) * 0.001);
                const amount = Math.floor(Math.random() * 10) / 10 + 0.1;
                const total = price * amount;
                
                return (
                  <div key={`buy-${i}`} className="flex justify-between text-sm">
                    <div className="text-green-500 font-medium">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    <div>{amount.toFixed(2)} BTC</div>
                    <div className="text-muted-foreground">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  </div>
                );
              })}
            </div>
            
            {/* Price */}
            <div className="py-2 border-y border-border my-4">
              <div className="text-xl font-semibold text-center">
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            
            {/* Sell orders */}
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Заявки на продажу</div>
              {[...Array(5)].map((_, i) => {
                const price = currentPrice * (1 + (i + 1) * 0.001);
                const amount = Math.floor(Math.random() * 10) / 10 + 0.1;
                const total = price * amount;
                
                return (
                  <div key={`sell-${i}`} className="flex justify-between text-sm">
                    <div className="text-red-500 font-medium">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    <div>{amount.toFixed(2)} BTC</div>
                    <div className="text-muted-foreground">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border-t border-border">
        <button className="text-primary text-sm flex items-center font-medium">
          Открыть полный терминал 
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </Card>
  );
}