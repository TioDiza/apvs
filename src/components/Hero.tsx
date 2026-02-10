import React from 'react';
import { Reveal } from './Reveal';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-apvs-blue-900">
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
              <span className="text-apvs-green-500">Completa</span> para o<br />
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
                className="bg-apvs-green-500 hover:bg-apvs-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-apvs-green-500/30 flex items-center justify-center gap-2"
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
          
          <Reveal animation="fade-in" delay={1000}>
            <div className="mt-12 flex items-center gap-4 text-sm text-gray-300">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-apvs-blue-900" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                ))}
              </div>
              <p>Mais de <strong className="text-white">500.000</strong> veículos protegidos.</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#como-funciona" className="text-white/50 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </a>
      </div>
    </section>
  );
};