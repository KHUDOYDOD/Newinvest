import { 
  Shield, 
  Clock, 
  Zap, 
  BarChart, 
  Award, 
  Repeat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const infoCards = [
  {
    icon: <Shield className="h-8 w-8 mb-4 text-primary" />,
    title: "Безопасность инвестиций",
    description: "Ваши средства под защитой современных технологий шифрования и многоуровневой системы безопасности.",
    buttonText: "Подробнее"
  },
  {
    icon: <Clock className="h-8 w-8 mb-4 text-accent" />,
    title: "Ежедневные выплаты",
    description: "Получайте прибыль каждые 24 часа. Вывод средств без задержек и скрытых комиссий.",
    buttonText: "Начать инвестировать"
  },
  {
    icon: <Zap className="h-8 w-8 mb-4 text-secondary" />,
    title: "Мгновенная активация",
    description: "Ваши инвестиции начинают работать сразу после подтверждения, без ожидания и проволочек.",
    buttonText: "Активировать"
  },
  {
    icon: <BarChart className="h-8 w-8 mb-4 text-purple-500" />,
    title: "Аналитика и прогнозы",
    description: "Получите доступ к профессиональным инструментам анализа и прогнозирования рынка.",
    buttonText: "Исследовать"
  },
  {
    icon: <Award className="h-8 w-8 mb-4 text-green-500" />,
    title: "Бонусы для постоянных клиентов",
    description: "Увеличивайте свою доходность с нашей программой лояльности для активных инвесторов.",
    buttonText: "Получить бонус"
  },
  {
    icon: <Repeat className="h-8 w-8 mb-4 text-rose-500" />,
    title: "Реинвестирование",
    description: "Автоматически реинвестируйте полученную прибыль для максимизации ваших доходов.",
    buttonText: "Настроить"
  }
];

export function InfoCards() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши ключевые преимущества</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Мы предлагаем надежную платформу для инвестиций с множеством уникальных преимуществ
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoCards.map((card, index) => (
            <div 
              key={index}
              className="hover-card p-6 rounded-2xl bg-white dark:bg-card border border-border flex flex-col"
            >
              <div>
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground mb-6">{card.description}</p>
              </div>
              
              <div className="mt-auto">
                <Link href="/auth?tab=register">
                  <Button 
                    variant={index === 1 ? "default" : "outline"} 
                    className={index === 1 ? "shimmer w-full gradient-bg" : "w-full"}
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}