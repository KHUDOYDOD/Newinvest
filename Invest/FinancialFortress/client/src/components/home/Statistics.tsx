import { useState, useEffect, useRef } from "react";

interface StatItem {
  value: number;
  label: string;
  suffix: string;
  animated?: boolean;
}

const stats: StatItem[] = [
  {
    value: 7832,
    label: "Клиентов",
    suffix: "+",
    animated: true
  },
  {
    value: 6.5,
    label: "Инвестиций",
    suffix: "M+",
    animated: true
  },
  {
    value: 48563,
    label: "Выплат",
    suffix: "+",
    animated: true
  },
  {
    value: 3,
    label: "Года на рынке",
    suffix: "",
    animated: false
  }
];

export function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <StatCounter 
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              animate={isVisible && stat.animated}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCounterProps {
  value: number;
  label: string;
  suffix: string;
  animate: boolean;
}

function StatCounter({ value, label, suffix, animate }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 2000; // Animation duration in ms
  
  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }
    
    let startTime: number | null = null;
    let animationFrame: number;
    
    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      }
    };
    
    animationFrame = requestAnimationFrame(updateValue);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [animate, value]);
  
  const formattedValue = suffix === "M+" 
    ? displayValue.toFixed(1)
    : displayValue.toLocaleString();
  
  return (
    <div>
      <div className="text-amber-300 font-heading font-bold text-4xl md:text-5xl mb-2">
        {formattedValue}{suffix}
      </div>
      <p className="opacity-80">{label}</p>
    </div>
  );
}
