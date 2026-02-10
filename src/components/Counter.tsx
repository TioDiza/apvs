import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, className }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.5, // Inicia a animação quando 50% do elemento está visível
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentNum = Math.floor(progress * end);
      
      setCount(currentNum);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end); // Garante que o número final seja exato
      }
    };

    requestAnimationFrame(animateCount);

  }, [isVisible, end, duration]);

  const formatNumber = (num: number) => {
    // Adiciona pontos como separadores de milhar
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  );
};

export default Counter;