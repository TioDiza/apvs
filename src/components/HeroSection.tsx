import React, { useState, useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import heroBg from '@/assets/hero-background-v2.png';

export const HeroSection: React.FC = () => {
  const words = [
    'Integral',
    'Absoluta',
    'Premium',
    'Avançada',
    'Exclusiva',
    'Blindada',
    'Elite',
    'Prime',
    'Completa',
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 75;
    const pauseDuration = 1500;

    const handleTyping = () => {
      const currentWord = words[wordIndex % words.length];
      
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      // Logic to switch between typing, deleting, and changing words
      if (!isDeleting && text === currentWord) {
        // If it's the last word ("Completa"), stop the animation.
        if (wordIndex === words.length - 1) {
          return; 
        }
        // Pause at the end of a word, then start deleting
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-label="Fachada da sede da APVS Brasil com carros adesivados"
        role="img"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-apvs-blue-900/90 via-apvs-blue-900/80 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-2/3 max-w-3xl text-left">
          <Reveal animation="fade-up" delay={100}>
            <span className="inline-block py-1 px-3 rounded-full bg-apvs-blue-800/50 border border-apvs-blue-500 text-blue-200 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
              A MAIOR DA AMÉRICA LATINA
            </span>
          </Reveal>
          
          <Reveal animation="fade-up" delay={300}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Proteção Veicular <br />
              <span className="relative text-amber-400">
                {/* Invisible placeholder for the longest word to prevent layout shift */}
                <span className="opacity-0">Exclusiva</span>
                {/* The actual animated text */}
                <span className="absolute left-0 top-0">
                  {text}
                  <span className="animate-pulse opacity-75">|</span>
                </span>
              </span> para o<br />
              Seu Veículo
            </h1>
          </Reveal>

          <Reveal animation="fade-up" delay={500}>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              Segurança, economia e cobertura nacional para você rodar tranquilo. 
              Junte-se a mais de 500 mil associados satisfeitos em todo o Brasil.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={700}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#cotacao" 
                className="relative overflow-hidden bg-apvs-green-500 hover:bg-apvs-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-apvs-green-500/30 flex items-center justify-center gap-2 shine-effect"
              >
                Fazer cotação agora
              </a>
              <a 
                href="#como-funciona" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg text-center transition-all flex items-center justify-center"
              >
                Como funciona
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-5"></div>
    </section>
  );
};