import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  rate: string;
  minAmount: string;
  maxAmount?: string;
  popular?: boolean;
  features: PlanFeature[];
}

const plans: InvestmentPlan[] = [
  {
    id: "starter",
    name: "Стартовый",
    description: "Идеально для начинающих инвесторов",
    rate: "5%",
    minAmount: "$100",
    maxAmount: "$499",
    features: [
      { text: "Ежедневные выплаты", included: true },
      { text: "Мгновенный вывод средств", included: true },
      { text: "Реферальная программа 0.1%", included: true },
      { text: "Персональный менеджер", included: false },
      { text: "VIP-статус", included: false },
    ]
  },
  {
    id: "standard",
    name: "Стандартный",
    description: "Оптимальный выбор большинства",
    rate: "10%",
    minAmount: "$500",
    maxAmount: "$999",
    popular: true,
    features: [
      { text: "Ежедневные выплаты", included: true },
      { text: "Мгновенный вывод средств", included: true },
      { text: "Реферальная программа 0.15%", included: true },
      { text: "Персональный менеджер", included: true },
      { text: "VIP-статус", included: false },
    ]
  },
  {
    id: "premium",
    name: "Премиум",
    description: "Максимальная доходность",
    rate: "15%",
    minAmount: "$1000",
    features: [
      { text: "Ежедневные выплаты", included: true },
      { text: "Мгновенный вывод средств", included: true },
      { text: "Реферальная программа 0.2%", included: true },
      { text: "Персональный менеджер", included: true },
      { text: "VIP-статус", included: true },
    ]
  }
];

export function InvestmentPlans() {
  return (
    <section id="plans" className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Наши инвестиционные планы</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Выберите подходящий для вас тариф и начните получать прибыль уже через 24 часа.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? "md:scale-105 z-10" : ""}`}
            >
              <CardHeader className={`p-6 border-b border-gray-100 ${plan.popular ? "gold-gradient" : ""}`}>
                {plan.popular && (
                  <div className="absolute -right-3 -top-3 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </div>
                )}
                <h3 className={`font-heading font-bold text-2xl mb-2 ${plan.popular ? "text-primary" : ""}`}>
                  {plan.name}
                </h3>
                <p className={`${plan.popular ? "text-foreground" : "text-muted-foreground"} mb-4`}>
                  {plan.description}
                </p>
                <div className="flex items-end gap-1 mb-4">
                  <span className={`font-heading font-bold text-4xl ${plan.popular ? "text-primary" : "text-primary"}`}>
                    {plan.rate}
                  </span>
                  <span className={plan.popular ? "text-foreground" : "text-muted-foreground"}>
                    за 24 часа
                  </span>
                </div>
                <p className={`font-medium ${plan.popular ? "text-primary" : ""}`}>
                  {plan.minAmount}{plan.maxAmount ? ` до ${plan.maxAmount}` : ""}
                </p>
              </CardHeader>
              
              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {feature.included ? (
                        <>
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>{feature.text}</span>
                        </>
                      ) : (
                        <>
                          <XIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{feature.text}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0">
                <Link href="/auth?tab=register" className="w-full">
                  <Button 
                    className={`w-full ${plan.popular ? "bg-primary text-white" : "border-2 border-primary text-primary hover:bg-primary hover:text-white"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Инвестировать сейчас" : "Инвестировать"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
