import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Gift, Percent, TrendingUp } from "lucide-react";

// Новая функция 9: Промо-блок реферальной программы
export function ReferralProgram() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block p-2.5 bg-amber-100 rounded-full mb-4">
            <Users className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Пригласите друзей и зарабатывайте вместе
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наша реферальная программа позволяет вам и вашим друзьям получать 
            дополнительный доход и бонусы за совместные инвестиции.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-r from-amber-50 to-yellow-50">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-10">
                  <h3 className="text-2xl font-bold mb-6 text-amber-800">
                    Преимущества реферальной программы
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                        <Percent className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Комиссия 10% от прибыли</h4>
                        <p className="text-muted-foreground">
                          Получайте 10% от прибыли приглашённых вами пользователей 
                          без ограничения по времени и сумме.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                        <Gift className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Бонусы для друзей</h4>
                        <p className="text-muted-foreground">
                          Ваши друзья получают бонус 5% к доходности на первые
                          три месяца инвестирования.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Многоуровневая система</h4>
                        <p className="text-muted-foreground">
                          Зарабатывайте 3% со второго уровня рефералов – тех, кого
                          пригласили ваши друзья.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button className="gradient-bg text-white" size="lg">
                      Присоединиться к программе
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Доступно только для верифицированных пользователей с активными инвестициями
                    </p>
                  </div>
                </div>
                
                <div className="relative overflow-hidden lg:h-auto p-8 lg:p-0 bg-gradient-to-br from-amber-500 to-yellow-600 text-white">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000')] opacity-20 mix-blend-overlay bg-center bg-cover"></div>
                  <div className="relative h-full flex flex-col justify-center p-8 lg:p-10">
                    <div className="mb-6 border-2 border-white/30 text-white inline-block p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                      <Users className="h-8 w-8" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-3xl font-bold">Как это работает?</div>
                      <p className="text-white/90">
                        Просто поделитесь своей реферальной ссылкой с друзьями через
                        социальные сети, мессенджеры или электронную почту.
                      </p>
                      
                      <ol className="space-y-3 mt-6">
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-white text-amber-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">1</div>
                          <span>Зарегистрируйтесь и активируйте реферальную программу</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-white text-amber-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">2</div>
                          <span>Получите уникальную реферальную ссылку в личном кабинете</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-white text-amber-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">3</div>
                          <span>Поделитесь ссылкой с друзьями и коллегами</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-white text-amber-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">4</div>
                          <span>Получайте вознаграждение автоматически при инвестировании рефералов</span>
                        </li>
                      </ol>
                    </div>
                    
                    <div className="mt-8 inline-block px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm">
                      <div className="text-xs opacity-80">Среднее реферальное вознаграждение</div>
                      <div className="text-2xl font-bold">$380 в месяц</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}