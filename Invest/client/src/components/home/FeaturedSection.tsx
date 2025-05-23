import { TradingView } from "./TradingView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  ArrowUpRight, 
  TrendingUp, 
  Shield, 
  Clock3, 
  Zap 
} from "lucide-react";
import { Link } from "wouter";

export function FeaturedSection() {
  return (
    <section className="py-16 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-dot-pattern opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-grid-pattern opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Инновационная платформа
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Современные инструменты инвестирования
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Мы предлагаем передовые возможности для увеличения вашего капитала с использованием 
            самых современных технологий анализа рынка и управления инвестициями
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <TradingView />
          </div>
          
          <div className="space-y-6 md:pl-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Почему выбирают нас</h3>
              
              <div className="flex items-start gap-4 group hover-card p-4 rounded-lg border border-border">
                <div className="rounded-full p-3 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Высокая доходность</h4>
                  <p className="text-muted-foreground text-sm">Ежедневные выплаты с доходностью до 15% — ваши деньги работают на максимум</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group hover-card p-4 rounded-lg border border-border">
                <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Безопасность и надежность</h4>
                  <p className="text-muted-foreground text-sm">Безопасные и прозрачные инвестиции с минимальными рисками и гарантией возврата</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group hover-card p-4 rounded-lg border border-border">
                <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Быстрые выплаты</h4>
                  <p className="text-muted-foreground text-sm">Мгновенное зачисление средств на счет и быстрый вывод на ваши кошельки или карты</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group hover-card p-4 rounded-lg border border-border">
                <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Мгновенный старт</h4>
                  <p className="text-muted-foreground text-sm">Начните инвестировать всего за несколько минут после регистрации</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Link href="/auth?tab=register">
                <Button size="lg" className="gradient-bg shimmer mr-4">
                  Начать инвестировать
                </Button>
              </Link>
              <Link href="/#plans">
                <Button variant="outline" size="lg">
                  Тарифные планы
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}