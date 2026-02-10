import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-24 bg-apvs-blue-900 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-apvs-green-500 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
        <Reveal>
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
            <ShieldCheck className="w-10 h-10 text-apvs-green-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Não deixe seu patrimônio <br className="hidden md:block"/> desprotecido.
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Faça sua cotação gratuita agora mesmo e junte-se à maior associação de proteção veicular da América Latina.
          </p>
          <a 
            href="#cotacao" 
            className="relative overflow-hidden inline-flex items-center justify-center bg-apvs-green-500 hover:bg-apvs-green-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,176,80,0.4)] hover:shadow-[0_0_40px_rgba(0,176,80,0.6)] shine-effect"
          >
            Quero proteger meu veículo agora
          </a>
          <p className="mt-6 text-sm text-blue-200">
            Processo 100% online. Sem análise de Serasa/SPC.
          </p>
        </Reveal>
      </div>
    </section>
  );
};