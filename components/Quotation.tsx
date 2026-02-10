import React, { useState } from 'react';
import { CheckCircle2, Search, ArrowRight, Shield } from 'lucide-react';
import { Reveal } from './Reveal';

export const Quotation: React.FC = () => {
  const [placa, setPlaca] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple mask for Brazilian License Plate format: ABC1D23 or ABC1234
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 7) val = val.slice(0, 7);
    
    // Add hyphen for older format visualization if desired, but modern Mercosul doesn't need it.
    // For simplicity, just max 7 chars uppercase.
    setPlaca(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (placa.length < 7) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Simulando cotação para a placa: ${placa}. Em um ambiente real, isso abriria o modal de cotação ou redirecionaria.`);
    }, 1500);
  };

  return (
    <section id="cotacao" className="py-20 relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-apvs-blue-900 skew-y-3 origin-bottom-left z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Info */}
          <div className="w-full md:w-5/12 bg-apvs-blue-50 p-8 md:p-12 flex flex-col justify-center">
            <Reveal animation="slide-right">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-apvs-green-500" />
                <h3 className="text-2xl font-bold text-apvs-blue-900">Cotação Rápida</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nosso sistema integrado à base nacional identifica automaticamente os dados do seu veículo em segundos.
              </p>
              
              <ul className="space-y-4">
                {['Tipo de Veículo', 'Marca e Modelo', 'Ano de Fabricação', 'Valor de Mercado (FIPE)'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-apvs-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <Reveal animation="slide-left" delay={200} className="w-full max-w-sm">
              <h4 className="text-3xl font-extrabold text-gray-900 mb-2">Digite sua Placa</h4>
              <p className="text-gray-500 mb-8">Descubra o valor da sua proteção agora.</p>
              
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={placa}
                    onChange={handleInputChange}
                    placeholder="ABC1D23"
                    className="block w-full pl-12 pr-4 py-5 border-2 border-gray-200 rounded-xl text-center text-3xl font-bold tracking-widest text-gray-800 placeholder-gray-300 focus:ring-0 focus:border-apvs-blue-900 transition-colors bg-gray-50 uppercase"
                    maxLength={7}
                    required
                  />
                  {/* Fake BR Tag indicating license plate */}
                  <div className="absolute top-1 right-1 bg-blue-700 w-12 h-6 rounded flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">BR</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={placa.length < 7 || isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                    placa.length >= 7 
                      ? 'bg-apvs-green-500 hover:bg-apvs-green-600 text-white hover:shadow-xl hover:-translate-y-1' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Consultando base...</span>
                  ) : (
                    <>
                      Consultar veículo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </form>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
