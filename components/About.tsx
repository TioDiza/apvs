import React from 'react';
import { Users, Award, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';

const stats = [
  { icon: Users, value: '500.000+', label: 'Associados Ativos' },
  { icon: Award, value: '14 Anos', label: 'de Experiência' },
  { icon: MapPin, value: '2.500+', label: 'Pontos de Atendimento' },
];

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2 relative">
            <Reveal animation="slide-right">
              {/* Image composition */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Escritório APVS" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-apvs-blue-900/10"></div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="bg-apvs-green-100 p-3 rounded-full">
                    <Award className="w-8 h-8 text-apvs-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Eleita a Melhor</p>
                    <p className="text-lg font-extrabold text-apvs-blue-900">Proteção Veicular</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="w-full lg:w-1/2">
            <Reveal animation="fade-up">
              <h2 className="text-apvs-green-500 font-bold tracking-wide uppercase text-sm mb-2">Quem Somos</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                A Maior Associação de Proteção Veicular da América Latina
              </h3>
              
              <div className="space-y-4 text-gray-600 text-lg mb-8">
                <p>
                  Nascemos com o propósito de democratizar o acesso à proteção veicular no Brasil. Acreditamos que todo motorista merece dirigir com tranquilidade, sem pagar preços abusivos.
                </p>
                <p>
                  Com uma infraestrutura robusta, tecnologia de ponta e um atendimento humanizado, a APVS Brasil revolucionou o mercado, garantindo a reposição do seu bem de forma rápida e transparente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <stat.icon className="w-8 h-8 text-apvs-blue-900 mb-3" />
                    <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
                    <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
