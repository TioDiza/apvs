import React from 'react';
import { Car, AlertTriangle, Wrench, Map, FileX, Clock } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { GlowingEffect } from '@/components/GlowingEffect';
import { cn } from '@/lib/utils';

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

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ icon, title, description }) => {
  return (
    <li className="min-h-[14rem] list-none group">
      <div className="relative h-full rounded-[1.25rem] border border-gray-200 dark:border-gray-700 p-2 md:rounded-[1.5rem] md:p-3">
        {/* This div will handle the pulsing glow on hover */}
        <div className="absolute -inset-px rounded-[inherit] animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-gray-900 dark:text-white">
                {title}
              </h3>
              <h2 className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-600 dark:text-gray-300">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const Benefits: React.FC = () => {
  return (
    <section id="beneficios" className="relative py-24 bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none hidden dark:block" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
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
          
          <ul className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 100} animation="scale-up">
                <GridItem
                  icon={<benefit.icon className="w-5 h-5 text-apvs-blue-900 dark:text-apvs-accent-500" />}
                  title={benefit.title}
                  description={benefit.description}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};