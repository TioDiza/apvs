import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const testimonials = [
  {
    name: 'Carlos Mendes',
    city: 'Belo Horizonte, MG',
    text: 'Tive meu carro furtado e confesso que estava com medo da burocracia. A APVS me surpreendeu. Em menos de 30 dias já estava com a indenização na conta. Recomendo de olhos fechados.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Mariana Silva',
    city: 'São Paulo, SP',
    text: 'Sofri uma colisão e acionei o aplicativo. O guincho chegou em 20 minutos. O carro foi para uma oficina excelente e não tive dor de cabeça nenhuma. O atendimento é nota 10!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Roberto Alves',
    city: 'Rio de Janeiro, RJ',
    text: 'Migrei do seguro tradicional para a APVS e a economia foi gigante. A cobertura é a mesma, mas sem aquelas análises de perfil chatas. Muito satisfeito com a escolha.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=12'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h2 className="text-apvs-blue-900 font-bold tracking-wide uppercase text-sm mb-2">Depoimentos</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">A voz de quem confia na APVS</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Não acredite apenas em nós. Veja o que nossos associados têm a dizer sobre nossas entregas.</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Reveal key={index} delay={index * 150} animation="fade-up">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 relative h-full flex flex-col">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-apvs-green-100 dark:text-apvs-green-500/20" />
                
                <div className="flex text-apvs-green-500 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic flex-grow mb-8 relative z-10">"{item.text}"</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-gray-100">{item.name}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};