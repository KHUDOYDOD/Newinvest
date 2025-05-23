import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Александр К.",
    rating: 5,
    text: "Инвестирую уже более полугода. Ежедневные выплаты приходят вовремя, без задержек. Очень доволен сервисом и поддержкой. Рекомендую!",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200"
  },
  {
    id: 2,
    name: "Елена М.",
    rating: 4.5,
    text: "Начала с малого, постепенно увеличивала депозит. Сейчас на тарифе \"Премиум\" - доходность впечатляет! Техподдержка отвечает оперативно, выплаты моментальные.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200"
  },
  {
    id: 3,
    name: "Владимир П.",
    rating: 5,
    text: "Профессиональный сервис. Зарегистрировался по рекомендации друга, начал с тарифа \"Стандартный\". Результаты превзошли ожидания. Вывод средств работает без проблем.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200"
  },
  {
    id: 4,
    name: "Марина С.",
    rating: 4,
    text: "Пользуюсь платформой 4 месяца. Особенно радует реферальная программа - привлекла несколько друзей и получаю дополнительный доход. Всё прозрачно и честно.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200"
  }
];

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(100);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSlideWidth(33.33);
      } else {
        setSlideWidth(100);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section id="reviews" className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Отзывы наших клиентов</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Узнайте, что говорят о нас наши инвесторы.</p>
        </div>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex overflow-hidden" 
            style={{ transform: `translateX(-${currentSlide * slideWidth}%)`, transition: 'transform 0.5s ease' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="min-w-full md:min-w-[33.33%] px-4"
                style={{ width: `${slideWidth}%` }}
              >
                <div className="bg-white p-6 rounded-xl shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-heading font-bold">{testimonial.name}</h4>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-4 w-4" 
                            fill={i < Math.floor(testimonial.rating) ? "currentColor" : "none"}
                            strokeWidth={i < Math.floor(testimonial.rating) ? 0 : 2}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider Controls */}
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center text-primary hover:bg-gray-100"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center text-primary hover:bg-gray-100"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-primary opacity-100' : 'bg-primary opacity-40'}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
