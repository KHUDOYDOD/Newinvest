import { Button } from "@/components/ui/button";

// Новая функция 7: Промо-раздел мобильного приложения
export function MobileAppPromo() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl bg-gradient-to-r from-primary/90 to-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=1920')] mix-blend-overlay opacity-10"></div>
          <div className="absolute right-0 bottom-0 -mb-10 md:mb-0 opacity-90 xl:opacity-100">
            <img 
              src="https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_960_720.png" 
              alt="Мобильное приложение" 
              className="h-[300px] md:h-[400px] xl:h-[480px] object-contain"
            />
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="text-white max-w-xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Инвестируйте на ходу с нашим мобильным приложением
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Получите полный доступ к вашему портфелю, отслеживайте инвестиции и совершайте операции
                в любое время и в любом месте с помощью нашего удобного мобильного приложения.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Мгновенные уведомления о движении средств</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Биометрическая защита доступа</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Торговля акциями и криптовалютами</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Аналитика портфеля в реальном времени</span>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-black hover:bg-black/90 text-white flex items-center justify-center gap-2 h-14 px-6 shadow-lg"
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.11 2.27-.79 3.45-.84 1.22.03 2.33.41 3.13 1.17-2.81 1.82-2.34 5.86.31 7.13-.82 2.6-2.06 5.68-4.97 7.72zM12.03 7.25c-.15-2.23 1.66-4.22 3.78-4.98-1.77 2.24-1.43 6.67 3.83 7.26-1.18 3.82-5.8 4.77-7.61-2.28z"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Скачать в</span>
                    <span className="text-sm font-medium">App Store</span>
                  </div>
                </Button>
                <Button 
                  className="bg-black hover:bg-black/90 text-white flex items-center justify-center gap-2 h-14 px-6 shadow-lg"
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9 5c.1.1.2.3.3.5v13c0 .2-.1.3-.3.5l-5.4-7"/>
                    <path d="M3 20.5V3.5c0-.2.3-.3.4-.2l11 8.3-11 8.3c-.2.2-.4 0-.4-.2"/>
                    <path d="M15.9 21.2L5.2 14h.1l10.7-7.2c.2-.1.4 0 .4.2v13.9c0 .3-.3.4-.5.3"/>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Доступно в</span>
                    <span className="text-sm font-medium">Google Play</span>
                  </div>
                </Button>
              </div>
              
              <p className="text-white/70 text-sm mt-4">
                * Приложение доступно для iOS 12+ и Android 8.0+
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}