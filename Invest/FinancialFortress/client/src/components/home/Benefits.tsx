import { 
  ShieldCheck,
  Zap,
  Headphones,
  Coins,
  TrendingUp,
  Users
} from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Безопасность",
    description: "Современные методы шифрования и защиты данных обеспечивают полную безопасность ваших средств."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Быстрые выплаты",
    description: "Все операции по выводу средств обрабатываются автоматически в течение нескольких минут."
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Поддержка 24/7",
    description: "Наша команда технической поддержки доступна круглосуточно, 7 дней в неделю."
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Прозрачные условия",
    description: "Никаких скрытых комиссий и платежей. Вы всегда точно знаете, сколько получите."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Стабильный доход",
    description: "Наша стратегия инвестирования обеспечивает стабильный доход независимо от рыночных условий."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Реферальная система",
    description: "Приглашайте друзей и получайте вознаграждение от их инвестиций в размере до 0.2%."
  }
];

export function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Почему выбирают нас</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Мы предлагаем надежные инвестиционные решения и гарантируем безопасность ваших средств.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-background-light p-6 rounded-xl shadow-sm benefit-card transition-all duration-300"
            >
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-4 text-white">
                {benefit.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
