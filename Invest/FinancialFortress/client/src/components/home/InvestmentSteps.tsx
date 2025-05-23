import { useEffect, useRef, useState } from "react";
import { Circle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Регистрация",
    description: "Создайте аккаунт на нашей платформе. Это займет менее 1 минуты, требуется только имя пользователя и пароль.",
    icon: "👤"
  },
  {
    number: 2,
    title: "Выбор тарифа",
    description: "Выберите подходящий для вас инвестиционный план: 5%, 10% или 15% за 24 часа.",
    icon: "📊"
  },
  {
    number: 3,
    title: "Пополнение баланса",
    description: "Пополните счет удобным для вас способом: банковская карта, банковский перевод или криптовалюта.",
    icon: "💳"
  },
  {
    number: 4,
    title: "Активация депозита",
    description: "Создайте депозит на выбранную сумму. Ваши инвестиции начнут работать моментально.",
    icon: "🚀"
  },
  {
    number: 5,
    title: "Получение прибыли",
    description: "Получайте прибыль каждые 24 часа. Вы можете вывести её или реинвестировать для увеличения дохода.",
    icon: "💰"
  }
];

export function InvestmentSteps() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto-changing steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(current => current === steps.length ? 1 : current + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Scroll to active step on mobile
  useEffect(() => {
    if (containerRef.current && window.innerWidth < 768) {
      const activeElement = containerRef.current.querySelector(`.step-${activeStep}`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeStep]);
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как начать инвестировать</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Просто выполните пять простых шагов и начните получать прибыль уже через 24 часа
          </p>
        </div>
        
        {/* Steps navigation - Desktop */}
        <div className="hidden md:flex justify-between items-center mb-12">
          {steps.map((step) => (
            <div 
              key={step.number}
              onClick={() => setActiveStep(step.number)}
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center relative ${
                activeStep === step.number ? 'scale-110' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <div 
                className={`flex items-center justify-center w-14 h-14 md:w-20 md:h-20 text-xl rounded-full mb-4 ${
                  activeStep === step.number 
                    ? 'gradient-bg text-white shadow-glow animate-pulse-glow' 
                    : 'bg-muted text-foreground'
                }`}
              >
                <span className="text-2xl">{step.icon}</span>
              </div>
              <p className="font-semibold text-center">{step.title}</p>
              
              {/* Connector line */}
              {step.number < steps.length && (
                <div className="absolute top-10 left-full w-full h-0.5 bg-border">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ 
                      width: activeStep > step.number ? '100%' : '0%' 
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Steps navigation - Mobile */}
        <div 
          ref={containerRef}
          className="md:hidden flex space-x-4 overflow-x-auto pb-4 mb-8 scrollbar-hide"
        >
          {steps.map((step) => (
            <div 
              key={step.number}
              onClick={() => setActiveStep(step.number)}
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center step-${step.number} ${
                activeStep === step.number ? 'scale-110' : 'opacity-60'
              }`}
            >
              <div 
                className={`flex items-center justify-center w-16 h-16 text-xl rounded-full mb-2 ${
                  activeStep === step.number 
                    ? 'gradient-bg text-white shadow-md' 
                    : 'bg-muted text-foreground'
                }`}
              >
                <span className="text-2xl">{step.icon}</span>
              </div>
              <p className="font-semibold whitespace-nowrap">{step.title}</p>
            </div>
          ))}
        </div>
        
        {/* Content for active step */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`transition-all duration-500 p-8 rounded-2xl border border-border bg-white dark:bg-card ${
                activeStep === step.number ? 'opacity-100 transform scale-100' : 'opacity-0 absolute -z-10 transform scale-95'
              }`}
              style={{
                display: activeStep === step.number ? 'block' : 'none'
              }}
            >
              <div className="flex items-center mb-4">
                <div className="gradient-bg text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
              </div>
              
              <p className="text-lg">{step.description}</p>
              
              {/* Step indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {steps.map((s) => (
                  <Circle
                    key={s.number}
                    onClick={() => setActiveStep(s.number)}
                    className={`h-3 w-3 cursor-pointer ${
                      s.number === activeStep 
                        ? 'fill-primary text-primary' 
                        : 'fill-transparent text-muted-foreground hover:text-primary'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}