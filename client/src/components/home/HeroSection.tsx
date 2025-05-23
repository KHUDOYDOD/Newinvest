import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  const [countdown, setCountdown] = useState({
    days: 11,
    hours: 23,
    minutes: 45,
    seconds: 17
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + 11);
      targetDate.setHours(23, 59, 59, 0);

      const timeLeft = targetDate.getTime() - now.getTime();

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="gradient-bg py-12 md:py-24 relative overflow-hidden min-h-[90vh] md:min-h-0 flex items-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 md:gap-8 items-center relative z-10">
        <div className="text-white animate-fade-in">
          <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6 leading-tight">
            Увеличь свой капитал до <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 animate-glow">15%</span> за 24 часа!
          </h1>
          <p className="text-lg mb-8 opacity-90 animate-slide-up">Профессиональное управление активами с ежедневными выплатами. Начните инвестировать с нами сегодня и получите первую прибыль уже завтра.</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/auth?tab=register">
              <Button className="glass-effect text-white font-bold py-6 px-8 rounded-xl hover:scale-105 transition-all duration-300 animate-float">
                Начать инвестировать
              </Button>
            </Link>
            <a href="#calculator">
              <Button variant="outline" className="glass-effect text-white border-white/30 py-6 px-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                Рассчитать прибыль
              </Button>
            </a>
          </div>

          <div className="glass-effect p-6 rounded-xl inline-flex flex-col animate-slide-up">
            <p className="text-sm mb-2">До следующего повышения тарифов:</p>
            <div className="flex space-x-4 justify-center">
              {[
                { value: countdown.days, label: "Дней" },
                { value: countdown.hours, label: "Часов" },
                { value: countdown.minutes, label: "Минут" },
                { value: countdown.seconds, label: "Секунд" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="glass-effect w-16 h-16 flex items-center justify-center rounded-lg font-bold text-2xl">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <span className="text-xs mt-2">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&h=600"
            alt="Финансовый аналитик" 
            className="rounded-2xl shadow-2xl w-full object-cover gradient-border"
          />

          <div className="absolute -bottom-6 -left-6 glass-effect rounded-xl shadow-lg p-4 animate-slide-up">
            <p className="text-white/80 font-medium">Клиентов</p>
            <p className="font-heading font-bold text-2xl text-white">7,832+</p>
          </div>

          <div className="absolute -top-6 -right-6 glass-effect rounded-xl shadow-lg p-4 animate-slide-up">
            <p className="text-white/80 font-medium">Инвестиций</p>
            <p className="font-heading font-bold text-2xl text-white">$6.5M+</p>
          </div>
        </div>
      </div>
    </section>
  );
}