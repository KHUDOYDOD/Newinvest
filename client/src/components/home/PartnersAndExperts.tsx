import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

// Данные о партнерах
const partners = [
  {
    id: 1,
    name: "GlobalFinance",
    logo: "https://via.placeholder.com/150x60?text=GlobalFinance",
  },
  {
    id: 2,
    name: "InvestBank",
    logo: "https://via.placeholder.com/150x60?text=InvestBank",
  },
  {
    id: 3,
    name: "CryptoTrust",
    logo: "https://via.placeholder.com/150x60?text=CryptoTrust",
  },
  {
    id: 4,
    name: "AssetGuard",
    logo: "https://via.placeholder.com/150x60?text=AssetGuard",
  },
  {
    id: 5,
    name: "FinTech Solutions",
    logo: "https://via.placeholder.com/150x60?text=FinTech",
  },
  {
    id: 6,
    name: "Securities Pro",
    logo: "https://via.placeholder.com/150x60?text=SecuritiesPro",
  }
];

// Данные об экспертах и их отзывы
const experts = [
  {
    id: 1,
    name: "Алексей Морозов",
    position: "Финансовый аналитик, ВТБ Капитал",
    quote: "ИнвестПро предлагает уникальные инвестиционные возможности с прозрачной системой управления активами. Их подход к диверсификации впечатляет.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Елена Васильева",
    position: "Профессор экономики, МГУ",
    quote: "Исследовав множество инвестиционных платформ, я могу с уверенностью заявить, что ИнвестПро выделяется своим инновационным подходом к управлению рисками.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Дмитрий Соколов",
    position: "Главный экономист, Альфа-Банк",
    quote: "Команда ИнвестПро создала действительно надежную систему для инвесторов разного уровня. Особенно впечатляет их аналитический подход к выбору активов.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

// Новая функция 6: Раздел с партнерами и мнениями экспертов
export function PartnersAndExperts() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Нам доверяют эксперты и партнеры
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы сотрудничаем с ведущими финансовыми организациями и получаем высокие оценки от экспертов отрасли
          </p>
        </div>
        
        {/* Партнеры */}
        <div className="mb-20">
          <h3 className="text-xl font-semibold text-center mb-8">Наши партнеры</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map(partner => (
              <div key={partner.id} className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-[150px]"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Эксперты и их отзывы */}
        <div>
          <h3 className="text-xl font-semibold text-center mb-8">Мнения экспертов</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map(expert => (
              <Card key={expert.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Quote className="text-primary opacity-20 h-12 w-12 mb-4" />
                  <p className="text-lg italic mb-6">
                    "{expert.quote}"
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={expert.avatar} alt={expert.name} />
                      <AvatarFallback>{expert.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{expert.name}</p>
                      <p className="text-sm text-muted-foreground">{expert.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}