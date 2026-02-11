import React, inport { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const faqs = [
  {
    question: 'Qual a diferença entre Proteção Veicular e Seguro?',
    answer: 'A principal diferença é o modelo de negócio. No seguro tradicional, a seguradora assume o risco visando lucro. Na proteção veicular, os associados dividem os custos dos eventos (sinistros) de forma cooperativa. Isso torna a proteção veicular muito mais barata, menos burocrática e sem análise de perfil (idade, CEP, gênero não importam).'
  },
  {
    question: 'A APVS Brasil consulta o SPC/Serasa?',
    answer: 'Não! Para se associar à APVS Brasil não realizamos consulta ao SPC ou Serasa. Acreditamos que todos têm o direito de proteger seu patrimônio.'
  },
  {
    question: 'Como funciona em caso de Roubo ou Furto?',
    answer: 'Em caso de roubo ou furto não localizado do veículo, o associado é indenizado em 100% do valor da tabela FIPE vigente, seguindo o regulamento da associação.'
  },
  {
    question: 'A cobertura tem validade em todo o Brasil?',
    answer: 'Sim! Nossa cobertura é de âmbito nacional. Você está protegido e pode acionar a assistência 24 horas em qualquer estado do Brasil.'
  },
  {
    question: 'Como faço para acionar o guincho?',
    answer: 'É muito simples. Você pode acionar nossa Assistência 24h através do nosso aplicativo oficial com apenas um clique, ou ligar gratuitamente para nossa central de atendimento a qualquer hora do dia ou da noite.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-apvs-blue-900 dark:text-amber-400 font-bold tracking-wide uppercase text-sm mb-2">Tire suas dúvidas</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Perguntas Frequentes</h3>
          </Reveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 100}>
              <div 
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'border-apvs-accent-500 shadow-md bg-white dark:bg-gray-800/50' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`font-semibold text-lg ${openIndex === index ? 'text-apvs-blue-900 dark:text-apvs-accent-500' : 'text-gray-800 dark:text-gray-100'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180 text-apvs-accent-500' : 'text-gray-400 dark:text-gray-500'}`} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};