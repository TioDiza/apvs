import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-apvs-green-500"
    >
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-white">
          Teste de Atualização do Componente
        </h1>
        <p className="text-2xl text-white mt-4">
          Se você está vendo esta tela verde, a atualização finalmente funcionou.
        </p>
      </div>
    </section>
  );
};