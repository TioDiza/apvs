import React from 'react';
import { Car, AlertTriangle, Wrench, Map, FileX, Clock } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const benefits = [
  {
    icon: AlertTriangle,
    title: 'Roubo e Furto',
    description: 'Indenização de 100% da tabela FIPE em caso de roubo ou furto não localizado.'
  },
  {
    icon: Car,
    title: 'Colisão e Perda Total',
    description: 'Cobertura completa para consertos ou indenização integral em caso de PT.'
  },
  {
    icon: Clock,
    title: 'Assistência 24h',
    description: 'Guincho, socorro mecânico, chaveiro, pane seca e elétrica em qualquer hora do dia.'
  },
  {
    icon: Map,
    title: 'Cobertura Nacional',
    description: 'Esteja protegido em qualquer lugar do território nacional, sem limites de fronteiras.'
  },
  {
    icon: FileX,
    title: 'Sem Burocracia',
    description: 'Adesão simplificada, sem análise de crédito (SPC/Serasa) e sem análise de perfil.'
  },
  {
    icon: Wrench,
    title: 'Carro Reserva',
    description: 'Não fique a pé em caso de sinistro. Disponibilizamos carro reserva para você.'
  }
];

export const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/3">
            <Reveal>
              <h2 className="text-apvs-accent-500 font-bold tracking-wide uppercase text-sm mb-2">Vantagens</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                Por que escolher a <span className="text-apvs-blue-900 dark:text-amber-400">APVS Brasil?</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Oferecemos as melhores coberturas do mercado com um preço justo, garantindo a tranquilidade que você e sua família merecem.
              </p>
              <a href="#cotacao" className="text-apvs-accent-600 font-bold hover:text-apvs-accent-600/80 flex items-center gap-2 group">
                Ver todos os benefícios 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </Reveal>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 100} animation="scale-up">
                <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-apvs-accent-500/50 transition-all duration-300 shadow-sm hover:shadow-md group h-full">
                  <div className="w-14 h-14 rounded-xl bg-apvs-blue-50 dark:bg-apvs-blue-900/50 flex items-center justify-center mb-4 group-hover:bg-apvs-accent-500 transition-colors duration-300">
                    <benefit.icon className="w-7 h-7 text-apvs-blue-900 dark:text-apvs-accent-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};