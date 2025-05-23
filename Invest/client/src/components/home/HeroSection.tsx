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
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="text-white z-10">
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-6 leading-tight">Увеличь свой капитал до 15% за 24 часа!</h1>
          <p className="text-lg mb-8 opacity-90">Профессиональное управление активами с ежедневными выплатами. Начните инвестировать с нами сегодня и получите первую прибыль уже завтра.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/auth?tab=register">
              <Button className="gold-gradient text-primary font-bold py-6 px-6 rounded-lg hover:opacity-90 transition-all w-full sm:w-auto">
                Начать инвестировать
              </Button>
            </Link>
            <a href="#calculator">
              <Button variant="outline" className="bg-white bg-opacity-20 text-white border-white border-opacity-30 py-6 px-6 rounded-lg hover:bg-opacity-30 transition-all w-full sm:w-auto">
                Рассчитать прибыль
              </Button>
            </a>
          </div>
          
          {/* Countdown Timer */}
          <div className="bg-white bg-opacity-10 p-4 rounded-lg inline-flex flex-col">
            <p className="text-sm mb-2">До следующего повышения тарифов:</p>
            <div className="flex space-x-3 justify-center">
              <div className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl">
                  {countdown.days}
                </div>
                <span className="text-xs mt-1">Дней</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl">
                  {countdown.hours.toString().padStart(2, '0')}
                </div>
                <span className="text-xs mt-1">Часов</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl">
                  {countdown.minutes.toString().padStart(2, '0')}
                </div>
                <span className="text-xs mt-1">Минут</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 w-12 h-12 flex items-center justify-center rounded-lg font-bold text-xl">
                  {countdown.seconds.toString().padStart(2, '0')}
                </div>
                <span className="text-xs mt-1">Секунд</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&h=600"
            alt="Финансовый аналитик изучает графики" 
            className="rounded-lg shadow-lg w-full object-cover"
          />
          
          {/* Floating Stats Cards */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 w-32">
            <p className="text-primary font-medium">Клиентов</p>
            <p className="font-heading font-bold text-2xl">7,832+</p>
          </div>
          
          <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 w-36">
            <p className="text-primary font-medium">Инвестиций</p>
            <p className="font-heading font-bold text-2xl">$6.5M+</p>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-96 w-96 absolute top-1/4 right-1/4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 absolute bottom-1/4 right-1/3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      </div>
    </section>
  );
}
