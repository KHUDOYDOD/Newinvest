import { Shield, Lock, FileCheck, ServerCrash, Server } from "lucide-react";

// Новая функция 8: Раздел безопасности и соответствия требованиям
export function SecurityAndCompliance() {
  return (
    <section className="py-16 bg-gradient-to-b from-background-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block p-2.5 bg-blue-100 rounded-full mb-4">
            <Shield className="h-6 w-6 text-blue-700" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Безопасность и защита ваших инвестиций
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы обеспечиваем максимальную защиту ваших данных и инвестиций с помощью
            современных технологий и строгого соблюдения законодательства.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
            <div className="p-3 bg-amber-100 rounded-lg inline-block mb-4">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Шифрование данных
            </h3>
            <p className="text-muted-foreground">
              Шифрование всех данных по стандарту AES-256, защищенное SSL-соединение и многофакторная аутентификация.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
            <div className="p-3 bg-green-100 rounded-lg inline-block mb-4">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Соответствие нормам
            </h3>
            <p className="text-muted-foreground">
              Полное соответствие требованиям регуляторов и соблюдение международных стандартов финансовой безопасности.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
            <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
              <ServerCrash className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Защита от сбоев
            </h3>
            <p className="text-muted-foreground">
              Регулярное резервное копирование всех данных и распределенная инфраструктура для непрерывности работы.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
            <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4">
              <Server className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Изолированное хранение
            </h3>
            <p className="text-muted-foreground">
              Средства клиентов хранятся отдельно от операционных средств компании, обеспечивая полную сохранность.
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="md:shrink-0 flex justify-center">
              <div className="rounded-full bg-indigo-200 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-center md:text-left">
                Гарантированная защита инвестиций
              </h3>
              <p className="text-indigo-900/70 mb-4">
                Все средства пользователей застрахованы на сумму до $100,000 от несанкционированного доступа, 
                технических сбоев и других непредвиденных ситуаций. Мы обеспечиваем максимальную прозрачность 
                и надежность для ваших инвестиций.
              </p>
              <div className="flex justify-center md:justify-start">
                <div className="flex items-center space-x-1.5 text-xs bg-white px-3 py-1.5 rounded-full text-indigo-800">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Страховой полис №SECI-2025-84572</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}