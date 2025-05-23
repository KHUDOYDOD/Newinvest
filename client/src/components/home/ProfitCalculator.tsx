import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ProfitCalculator() {
  const [amount, setAmount] = useState(500);
  const [rate, setRate] = useState("10");
  const [days, setDays] = useState(7);
  const [profit, setProfit] = useState({
    daily: 0,
    total: 0,
    finalAmount: 0
  });
  
  // Update profit calculations when inputs change
  useEffect(() => {
    const dailyProfit = amount * (parseFloat(rate) / 100);
    const totalProfit = dailyProfit * days;
    const finalAmount = amount + totalProfit;
    
    setProfit({
      daily: dailyProfit,
      total: totalProfit,
      finalAmount: finalAmount
    });
  }, [amount, rate, days]);
  
  const handleAmountChange = (value: string) => {
    const newAmount = parseInt(value);
    if (!isNaN(newAmount) && newAmount >= 100 && newAmount <= 10000) {
      setAmount(newAmount);
    }
  };
  
  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
  };
  
  const handleDaysChange = (value: string) => {
    const newDays = parseInt(value);
    if (!isNaN(newDays) && newDays >= 1 && newDays <= 365) {
      setDays(newDays);
    }
  };
  
  const handleDaysSliderChange = (value: number[]) => {
    setDays(value[0]);
  };
  
  const increaseAmount = () => {
    if (amount < 10000) {
      setAmount(amount + 100);
    }
  };
  
  const decreaseAmount = () => {
    if (amount > 100) {
      setAmount(amount - 100);
    }
  };
  
  return (
    <section id="calculator" className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Калькулятор прибыли</h2>
          <p className="opacity-90 max-w-2xl mx-auto">Рассчитайте вашу потенциальную прибыль за выбранный период времени.</p>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block mb-2 font-medium">Сумма инвестиции ($)</label>
                <div className="relative">
                  <Input
                    type="number"
                    min={100}
                    max={10000}
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full bg-white bg-opacity-20 rounded-lg border border-white border-opacity-20 p-3 text-white pr-20"
                  />
                  <div className="absolute right-3 top-3 flex space-x-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="w-6 h-6 rounded-full bg-white bg-opacity-30 p-0"
                      onClick={decreaseAmount}
                    >
                      -
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="w-6 h-6 rounded-full bg-white bg-opacity-30 p-0"
                      onClick={increaseAmount}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Slider
                  value={[amount]}
                  min={100}
                  max={10000}
                  step={100}
                  onValueChange={handleSliderChange}
                  className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer mt-2 custom-range"
                />
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Тариф</label>
                <Select defaultValue={rate} onValueChange={setRate}>
                  <SelectTrigger className="w-full bg-white bg-opacity-20 rounded-lg border border-white border-opacity-20 p-3 text-white">
                    <SelectValue placeholder="Выберите тариф" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Стартовый - 5% за 24 часа</SelectItem>
                    <SelectItem value="10">Стандартный - 10% за 24 часа</SelectItem>
                    <SelectItem value="15">Премиум - 15% за 24 часа</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 font-medium">Срок в днях</label>
                <Input
                  type="number"
                  min={1}
                  max={365}
                  value={days}
                  onChange={(e) => handleDaysChange(e.target.value)}
                  className="w-full bg-white bg-opacity-20 rounded-lg border border-white border-opacity-20 p-3 text-white"
                />
                <Slider
                  value={[days]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={handleDaysSliderChange}
                  className="w-full h-2 bg-white bg-opacity-20 rounded-lg appearance-none cursor-pointer mt-2 custom-range"
                />
              </div>
            </div>
            
            <div className="bg-white bg-opacity-5 p-6 rounded-xl">
              <h3 className="font-heading font-medium text-xl mb-6 text-center">Ваша прибыль</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span>Начальная инвестиция:</span>
                  <span className="font-medium">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ежедневная прибыль:</span>
                  <span className="font-medium text-amber-300">${profit.daily.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Общая прибыль за период:</span>
                  <span className="font-medium text-amber-300">${profit.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Итоговая сумма:</span>
                  <span className="font-heading font-bold text-xl">${profit.finalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Link href="/auth?tab=register">
                <Button className="w-full gold-gradient text-primary font-bold py-6 hover:opacity-90 transition-all">
                  Начать инвестировать
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
