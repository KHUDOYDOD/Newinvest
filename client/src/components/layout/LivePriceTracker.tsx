import { useEffect, useState } from "react";
import { BadgeDollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

const initialPrices: CryptoPrice[] = [
  { symbol: "BTC", name: "Bitcoin", price: 58432.21, change24h: 2.4 },
  { symbol: "ETH", name: "Ethereum", price: 3254.76, change24h: 1.8 },
  { symbol: "BNB", name: "Binance Coin", price: 385.89, change24h: -0.7 },
  { symbol: "SOL", name: "Solana", price: 134.51, change24h: 4.2 },
  { symbol: "ADA", name: "Cardano", price: 0.45, change24h: -1.5 },
  { symbol: "USDT", name: "Tether", price: 1.00, change24h: 0.01 },
];

export function LivePriceTracker() {
  const [prices, setPrices] = useState<CryptoPrice[]>(initialPrices);
  
  // Simulated price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(currentPrices => 
        currentPrices.map(crypto => {
          // Random price change between -0.5% and +0.5%
          const priceChange = crypto.price * (Math.random() * 0.01 - 0.005);
          // Random change in 24h trend between -0.2% and +0.2%
          const trendChange = Math.random() * 0.4 - 0.2;
          
          return {
            ...crypto,
            price: Math.max(0.01, crypto.price + priceChange),
            change24h: parseFloat((crypto.change24h + trendChange).toFixed(2))
          };
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-white dark:bg-sidebar py-1 border-b border-border overflow-hidden">
      <div className="ticker">
        <div className="ticker-wrapper">
          {prices.map((crypto, index) => (
            <div key={crypto.symbol} className="ticker-item">
              <div className="flex items-center">
                <BadgeDollarSign className="h-4 w-4 mr-1 text-accent" />
                <span className="font-semibold mr-1">{crypto.symbol}</span>
                <span className="text-muted-foreground text-sm mr-2 hidden sm:inline">{crypto.name}</span>
                <span className="font-medium">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`ml-2 flex items-center text-xs ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {crypto.change24h > 0 ? '+' : ''}{crypto.change24h}%
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate items for seamless loop */}
          {prices.map((crypto, index) => (
            <div key={`${crypto.symbol}-dup`} className="ticker-item">
              <div className="flex items-center">
                <BadgeDollarSign className="h-4 w-4 mr-1 text-accent" />
                <span className="font-semibold mr-1">{crypto.symbol}</span>
                <span className="text-muted-foreground text-sm mr-2 hidden sm:inline">{crypto.name}</span>
                <span className="font-medium">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`ml-2 flex items-center text-xs ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {crypto.change24h > 0 ? '+' : ''}{crypto.change24h}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}