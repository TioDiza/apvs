import React from 'react';
import { Search, FileText, Smartphone, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const steps = [
  {
    icon: Search,
    title: 'Faça a Cotação',
    description: 'Informe a placa do seu veículo e descubra o valor da sua proteção em segundos.'
  },
  {
    icon: FileText,
    title: 'Escolha o Plano',
    description: 'Personalize as coberturas de acordo com a sua necessidade e o seu bolso.'
  },
  {
    icon: Smartphone,
    title: 'Vistoria Online',
    description: 'Sem burocracia. Realize a vistoria do seu veículo pelo próprio celular.'
  },
  {
    icon: ShieldCheck,
    title: 'Veículo Protegido',
    description: 'Pronto! Seu veículo já conta com a proteção da maior associação do Brasil.'
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h2 className="text-apvs-blue-900 dark:text-amber-400 font-bold tracking-wide uppercase text-sm mb-2">Processo Simples</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Como funciona a APVS Brasil?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Proteger o seu patrimônio nunca foi tão rápido e fácil. Sem análise de perfil e sem burocracia.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 200} className="relative z-10">
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center mb-6 border-4 border-gray-50 dark:border-gray-700 group-hover:border-apvs-accent-500 transition-colors duration-300 relative glowing-border-circle">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-apvs-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                  <step.icon className="w-10 h-10 text-apvs-blue-900 dark:text-blue-300 group-hover:text-apvs-accent-500 transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <a 
            href="#cotacao" 
            className="relative overflow-hidden inline-flex items-center justify-center bg-apvs-blue-900 hover:bg-apvs-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl shine-effect"
          >
            Simular minha proteção
          </a>
        </Reveal>
      </div>
    </section>
  );
};