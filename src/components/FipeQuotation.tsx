import React, { useState, useEffect } from 'react';
import { getBrands, getModels, getYears, getVehicleInfo, Brand, Model, Year, VehicleInfo } from '@/services/fipeApi';
import { calculateMonthlyFee, VehicleCategory } from '@/services/pricingData';
import { Reveal } from '@/components/Reveal';
import { Car, Bike, Truck, Shield, CheckCircle2, Loader2, AlertCircle, RefreshCw, Edit3 } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import SearchableSelect from './SearchableSelect';

type ApiVehicleType = 'cars' | 'motorcycles' | 'trucks';

const formatPhone = (value: string) => {
  if (!value) return "";
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return "";

  if (digits.length <= 2) return `(${digits}`;
  
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const VehicleTypeSelector: React.FC<{ selected: ApiVehicleType; onSelect: (type: ApiVehicleType) => void }> = ({ selected, onSelect }) => {
  const types: { id: ApiVehicleType; label: string; icon: React.ElementType }[] = [
    { id: 'cars', label: 'Carro', icon: Car },
    { id: 'motorcycles', label: 'Moto', icon: Bike },
    { id: 'trucks', label: 'Caminhão', icon: Truck },
  ];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {types.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex flex-col items-center justify-center w-24 h-24 p-4 rounded-xl border-2 transition-all duration-300 ${
            selected === id ? 'bg-apvs-blue-900 border-apvs-accent-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-apvs-blue-900 hover:bg-white dark:hover:bg-gray-700'
          }`}
        >
          <Icon className="w-8 h-8 mb-2" />
          <span className="font-semibold text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

const StyledSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
  <div className="w-full mb-4">
    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 text-left">{label}</label>
    <div className="relative">
      <select
        {...props}
        className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 focus:border-apvs-blue-900 transition-colors bg-gray-50 dark:bg-gray-800 appearance-none"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
);

const SelectedInfo: React.FC<{ label: string; value: string; onChangeClick: () => void }> = ({ label, value, onChangeClick }) => (
  <div className="w-full text-left mb-4 p-3 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700 flex justify-between items-center">
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
    <button onClick={onChangeClick} className="text-sm text-apvs-accent-500 hover:text-apvs-accent-600 font-semibold flex items-center gap-1">
      <Edit3 className="w-4 h-4" />
      Alterar
    </button>
  </div>
);

export const FipeQuotation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [apiVehicleType, setApiVehicleType] = useState<ApiVehicleType>('cars');
  const [selectedState, setSelectedState] = useState('');
  const [carCategory, setCarCategory] = useState<VehicleCategory | null>(null);
  
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [monthlyFee, setMonthlyFee] = useState<number | null>(null);
  const [adhesionFee, setAdhesionFee] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefitsData = {
    cars: [
      "Roubo e Furto", "Colisão e Perda Total", "Incêndio", "Fenômenos da Natureza",
      "Proteção a Terceiros (R$ 50 mil)", "Guincho", "Socorro Elétrico/Mecânico",
      "Troca De Pneu", "Chaveiro", "Pane Seca", "Hospedagem", "Assistência Residencial",
      "Assistência Funeral", "Assistência PET",
    ],
    trucks: [
      "Roubo e Furto", "Colisão e Perda Total", "Incêndio", "Fenômenos da Natureza",
      "Proteção a Terceiros (R$ 50 mil)", "Guincho", "Socorro Elétrico/Mecânico",
      "Troca De Pneu", "Chaveiro", "Pane Seca", "Hospedagem", "Assistência Residencial",
      "Assistência Funeral", "Assistência PET",
    ],
    motorcycles: [
      "Roubo e Furto", "Colisão e Perda Total", "Incêndio", "Fenômenos da Natureza",
      "Proteção a Terceiros (R$ 20 mil)", "Assistência 24 Horas - 200 KM",
      "Assistência Residencial", "Assistência Funeral", "Assistência PET",
    ],
  };

  const benefits = benefitsData[apiVehicleType];

  const reset = () => {
    setStep(1);
    setApiVehicleType('cars');
    setSelectedState('');
    setCarCategory(null);
    setBrands([]);
    setSelectedBrand('');
    setModels([]);
    setSelectedModel('');
    setYears([]);
    setSelectedYear('');
    setVehicleInfo(null);
    setMonthlyFee(null);
    setAdhesionFee(null);
    setError(null);
    setName('');
    setPhone('');
  };

  const handleStart = () => {
    if (!selectedState) return;
    if (apiVehicleType === 'cars' && !carCategory) {
      setStep(1.5);
    } else {
      fetchBrands();
    }
  };

  const handleCategorySelect = (category: VehicleCategory) => {
    setCarCategory(category);
    fetchBrands();
  };

  const fetchBrands = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBrands(apiVehicleType);
      setBrands(data);
      setStep(2);
    } catch (err) {
      setError('Não foi possível carregar as marcas. Tente novamente.');
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedBrand) return;
    const fetchModels = async () => {
      setIsLoading(true);
      setError(null);
      setModels([]);
      setSelectedModel('');
      setYears([]);
      setSelectedYear('');
      try {
        const data = await getModels(apiVehicleType, selectedBrand);
        setModels(data);
      } catch (err) {
        setError('Não foi possível carregar os modelos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, [selectedBrand, apiVehicleType]);

  useEffect(() => {
    if (!selectedModel) return;
    const fetchYears = async () => {
      setIsLoading(true);
      setError(null);
      setYears([]);
      setSelectedYear('');
      try {
        const data = await getYears(apiVehicleType, selectedBrand, selectedModel);
        setYears(data);
      } catch (err) {
        setError('Não foi possível carregar os anos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchYears();
  }, [selectedModel, apiVehicleType, selectedBrand]);

  const handleShowQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await getVehicleInfo(apiVehicleType, selectedBrand, selectedModel, selectedYear);
      setVehicleInfo(data);

      let category: VehicleCategory = 'motorcycle';
      if (apiVehicleType === 'cars' && carCategory) category = carCategory;
      if (apiVehicleType === 'trucks') category = 'heavy';

      const fee = calculateMonthlyFee(selectedState, category, data.price);
      setMonthlyFee(fee);

      if (fee) {
        let calculatedAdhesionFee = fee - (fee * 0.10);
        if (calculatedAdhesionFee < 200) {
          calculatedAdhesionFee = 200;
        }
        setAdhesionFee(calculatedAdhesionFee);
      } else {
        setAdhesionFee(null);
      }

      setStep(3);
    } catch (err) {
      setError('Não foi possível carregar os detalhes do veículo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const quotationData = {
      name: name,
      phone: phone,
      state: selectedState,
      vehicle_type: apiVehicleType,
      vehicle_brand: brands.find(b => b.code === selectedBrand)?.name,
      vehicle_model: vehicleInfo?.model,
      vehicle_year: vehicleInfo?.modelYear?.toString(),
      vehicle_fipe_value: vehicleInfo?.price,
      monthly_fee: monthlyFee,
      adhesion_fee: adhesionFee,
    };

    const { error } = await supabase.from('quotations').insert([quotationData]);

    if (error) {
      console.error('Error saving quotation:', error);
      alert(`Ocorreu um erro ao salvar sua cotação. Por favor, tente novamente.`);
    } else {
      alert(`Cotação para ${name} enviada com sucesso! Entraremos em contato.`);
      reset();
    }
    
    setIsSubmitting(false);
  };

  const handleChangeBrand = () => {
    setSelectedBrand('');
    setModels([]);
    setSelectedModel('');
    setYears([]);
    setSelectedYear('');
  };

  const handleChangeModel = () => {
    setSelectedModel('');
    setYears([]);
    setSelectedYear('');
  };

  const handleChangeYear = () => {
    setSelectedYear('');
  };

  const renderStep = () => {
    if (error) {
      return <div className="flex flex-col items-center justify-center h-64 text-center"><AlertCircle className="w-12 h-12 text-red-500" /><p className="mt-4 text-lg font-semibold text-red-600">{error}</p><button onClick={reset} className="mt-4 bg-apvs-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Tentar Novamente</button></div>;
    }

    switch (step) {
      case 1:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Faça sua cotação</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Comece informando o tipo e o estado do seu veículo.</p>
            <VehicleTypeSelector selected={apiVehicleType} onSelect={setApiVehicleType} />
            <StyledSelect label="Selecione seu estado" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="" disabled>-- Escolha um estado --</option>
              <option value="SP">São Paulo</option>
              <option value="RJ_METRO">Rio de Janeiro (Metropolitana)</option>
              <option value="RJ_INTERIOR">Rio de Janeiro (Interior)</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="PE">Pernambuco</option>
            </StyledSelect>
            <button onClick={handleStart} disabled={!selectedState} className="w-full py-3 px-6 rounded-xl text-lg font-bold bg-apvs-accent-500 hover:bg-apvs-accent-600 text-white transition-all shadow-lg hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed">
              Avançar
            </button>
          </>
        );
      case 1.5:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Qual a categoria do seu carro?</h4>
            <div className="flex gap-4 mb-6">
              <button onClick={() => handleCategorySelect('light')} className="flex-1 p-4 border-2 rounded-lg font-semibold hover:border-apvs-accent-500 dark:border-gray-600 dark:hover:border-apvs-accent-500">Passeio Leve</button>
              <button onClick={() => handleCategorySelect('heavy')} className="flex-1 p-4 border-2 rounded-lg font-semibold hover:border-apvs-accent-500 dark:border-gray-600 dark:hover:border-apvs-accent-500">SUV / Pesado</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Detalhes do Veículo</h4>
            {isLoading && <div className="flex items-center justify-center my-4"><Loader2 className="w-8 h-8 animate-spin text-apvs-blue-900" /></div>}
            
            {!selectedBrand ? (
              <SearchableSelect label="Marca" placeholder="Digite o nome da marca" options={brands} onSelect={setSelectedBrand} disabled={isLoading} />
            ) : (
              <SelectedInfo label="Marca" value={brands.find(b => b.code === selectedBrand)?.name || ''} onChangeClick={handleChangeBrand} />
            )}

            {selectedBrand && !selectedModel && (
              <SearchableSelect label="Modelo" placeholder="Digite o nome do modelo" options={models} onSelect={setSelectedModel} disabled={isLoading || models.length === 0} />
            )}
            {selectedModel && (
              <SelectedInfo label="Modelo" value={models.find(m => m.code === selectedModel)?.name || ''} onChangeClick={handleChangeModel} />
            )}

            {selectedModel && !selectedYear && (
              <SearchableSelect label="Ano" placeholder="Selecione o ano" options={years} onSelect={setSelectedYear} disabled={isLoading || years.length === 0} />
            )}
            {selectedYear && (
              <SelectedInfo label="Ano" value={years.find(y => y.code === selectedYear)?.name || ''} onChangeClick={handleChangeYear} />
            )}
            
            {selectedYear && (
              <>
                <div className="w-full my-6 border-t border-gray-200 dark:border-gray-700"></div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quase lá!</h4>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Preencha seus dados para ver o valor.</p>
                <form onSubmit={handleShowQuotation} className="w-full flex flex-col gap-4">
                  <input type="text" placeholder="Seu nome completo" value={name} onChange={e => setName(e.target.value)} required className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-apvs-blue-900 bg-transparent" />
                  <input type="tel" placeholder="Seu melhor telefone (WhatsApp)" value={phone} onChange={e => setPhone(formatPhone(e.target.value))} maxLength={15} required className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-apvs-blue-900 bg-transparent" />
                  <button type="submit" disabled={!name || !phone || isLoading} className="w-full py-3 px-6 rounded-xl text-lg font-bold bg-apvs-accent-500 hover:bg-apvs-accent-600 text-white transition-all shadow-lg hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Ver Cotação Agora'}
                  </button>
                </form>
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Resultado da Cotação</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Olá, {name.split(' ')[0]}! Confira os valores para seu veículo.</p>
            <div className="text-left bg-apvs-blue-50 dark:bg-apvs-blue-900/50 p-6 rounded-xl border border-apvs-blue-200 dark:border-apvs-blue-800 mb-6 w-full space-y-2">
              <p><strong>Veículo:</strong> {vehicleInfo?.model}</p>
              <p><strong>Valor FIPE:</strong> <span className="font-bold">{vehicleInfo?.price}</span></p>
              {adhesionFee && (
                <p><strong>Taxa de Adesão:</strong> <span className="font-bold">R$ {adhesionFee.toFixed(2).replace('.', ',')}</span></p>
              )}
              <div className="pt-2 mt-2 border-t border-apvs-blue-200 dark:border-apvs-blue-800">
                {monthlyFee ? (
                  <p className="text-2xl font-bold text-apvs-accent-600">
                    Mensalidade: R$ {monthlyFee.toFixed(2).replace('.', ',')}*
                  </p>
                ) : (
                  <p className="font-semibold text-apvs-blue-900 dark:text-apvs-accent-500">Valor sob consulta. Fale com um especialista.</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">*Valor de referência, sujeito a alterações.</p>
              </div>
            </div>

            <div className="text-left w-full space-y-3 mb-6">
              <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Benefícios Inclusos:</h5>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-gray-700 dark:text-gray-300">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-apvs-accent-500 dark:text-amber-400 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                *Os benefícios podem ser alterados, conforme o plano contratado.
              </p>
            </div>
            
            <form onSubmit={handleFinalSubmit} className="w-full">
              <button type="submit" disabled={isSubmitting} className="relative overflow-hidden w-full py-4 px-6 rounded-xl text-lg font-bold bg-apvs-accent-500 hover:bg-apvs-accent-600 text-white transition-all shadow-lg hover:-translate-y-1 shine-effect">
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Quero essa proteção!'}
              </button>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section id="cotacao" className="relative py-20 bg-gray-50 dark:bg-black">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none hidden dark:block" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 bg-apvs-blue-50 dark:bg-gray-800/50 p-8 md:p-12 flex flex-col justify-center">
            <Reveal animation="slide-right">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-apvs-accent-500 dark:text-amber-400" />
                <h3 className="text-2xl font-bold text-apvs-blue-900 dark:text-white">Cotação Online FIPE</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Use nossa ferramenta para obter o valor de referência do seu veículo e uma estimativa da sua mensalidade de forma rápida e transparente.
              </p>
              <ul className="space-y-4">
                {['Cotação baseada na Tabela FIPE', 'Processo 100% online', 'Rápido e sem compromisso', 'Dados seguros e protegidos'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-apvs-accent-500 dark:text-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <Reveal animation="slide-left" delay={200} className="w-full max-w-md">
              {renderStep()}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};