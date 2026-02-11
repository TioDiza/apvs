import React, { useState, useEffect } from 'react';
import { getBrands, getModels, getYears, getVehicleInfo, Brand, Model, Year, VehicleInfo } from '@/services/fipeApi';
import { Reveal } from '@/components/Reveal';
import { Car, Bike, Truck, Shield, CheckCircle2, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

type VehicleType = 'cars' | 'motorcycles' | 'trucks';

const VehicleTypeSelector: React.FC<{ selected: VehicleType; onSelect: (type: VehicleType) => void }> = ({ selected, onSelect }) => {
  const types: { id: VehicleType; label: string; icon: React.ElementType }[] = [
    { id: 'cars', label: 'Carro', icon: Car },
    { id: 'motorcycles', label: 'Moto', icon: Bike },
    { id: 'trucks', label: 'Caminhão', icon: Truck },
  ];

  return (
    <div className="flex justify-center gap-4 mb-8">
      {types.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex flex-col items-center justify-center w-24 h-24 p-4 rounded-xl border-2 transition-all duration-300 ${
            selected === id ? 'bg-apvs-blue-900 border-apvs-green-500 text-white shadow-lg' : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-apvs-blue-900 hover:bg-white'
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
    <label className="block text-sm font-medium text-gray-500 mb-2 text-left">{label}</label>
    <select
      {...props}
      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg text-gray-800 placeholder-gray-400 focus:ring-0 focus:border-apvs-blue-900 transition-colors bg-gray-50"
    >
      {children}
    </select>
  </div>
);

export const FipeQuotation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState<VehicleType>('cars');
  
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYear, setSelectedYear] = useState('');
  
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setStep(1);
    setVehicleType('cars');
    setBrands([]);
    setSelectedBrand('');
    setModels([]);
    setSelectedModel('');
    setYears([]);
    setSelectedYear('');
    setVehicleInfo(null);
    setError(null);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getBrands(vehicleType);
        setBrands(data);
        setStep(2);
      } catch (err) {
        setError('Não foi possível carregar as marcas. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    if (step === 2) fetchBrands();
  }, [vehicleType, step]);

  useEffect(() => {
    if (!selectedBrand) return;
    const fetchModels = async () => {
      setIsLoading(true);
      setError(null);
      setModels([]);
      setSelectedModel('');
      try {
        const data = await getModels(vehicleType, selectedBrand);
        setModels(data);
        setStep(3);
      } catch (err) {
        setError('Não foi possível carregar os modelos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, [selectedBrand]);

  useEffect(() => {
    if (!selectedModel) return;
    const fetchYears = async () => {
      setIsLoading(true);
      setError(null);
      setYears([]);
      setSelectedYear('');
      try {
        const data = await getYears(vehicleType, selectedBrand, selectedModel);
        setYears(data);
        setStep(4);
      } catch (err) {
        setError('Não foi possível carregar os anos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchYears();
  }, [selectedModel]);

  useEffect(() => {
    if (!selectedYear) return;
    const fetchVehicleInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVehicleInfo(vehicleType, selectedBrand, selectedModel, selectedYear);
        setVehicleInfo(data);
        setStep(5);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do veículo.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicleInfo();
  }, [selectedYear]);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulação de envio
    setTimeout(() => {
      alert(`Cotação para ${name} (${phone}) enviada com sucesso! Entraremos em contato.`);
      setIsSubmitting(false);
      reset();
    }, 1500);
  };

  const renderStep = () => {
    if (isLoading) {
      return <div className="flex flex-col items-center justify-center h-64"><Loader2 className="w-12 h-12 animate-spin text-apvs-blue-900" /><p className="mt-4 text-lg font-semibold text-gray-600">Buscando informações...</p></div>;
    }
    if (error) {
      return <div className="flex flex-col items-center justify-center h-64 text-center"><AlertCircle className="w-12 h-12 text-red-500" /><p className="mt-4 text-lg font-semibold text-red-600">{error}</p><button onClick={reset} className="mt-4 bg-apvs-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Tentar Novamente</button></div>;
    }

    switch (step) {
      case 1:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-2">Selecione o Tipo de Veículo</h4>
            <p className="text-gray-500 mb-8">Comece escolhendo o tipo do seu veículo.</p>
            <VehicleTypeSelector selected={vehicleType} onSelect={(type) => { setVehicleType(type); setStep(2); }} />
          </>
        );
      case 2:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-8">Selecione a Marca</h4>
            <StyledSelect label="Marca" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="" disabled>-- Escolha uma marca --</option>
              {brands.map(brand => <option key={brand.code} value={brand.code}>{brand.name}</option>)}
            </StyledSelect>
          </>
        );
      case 3:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-8">Selecione o Modelo</h4>
            <StyledSelect label="Modelo" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
              <option value="" disabled>-- Escolha um modelo --</option>
              {models.map(model => <option key={model.code} value={model.code}>{model.name}</option>)}
            </StyledSelect>
          </>
        );
      case 4:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-8">Selecione o Ano</h4>
            <StyledSelect label="Ano" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="" disabled>-- Escolha o ano --</option>
              {years.map(year => <option key={year.code} value={year.code}>{year.name}</option>)}
            </StyledSelect>
          </>
        );
      case 5:
        return (
          <>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-2">Resultado da Cotação</h4>
            <p className="text-gray-500 mb-6">Confira o valor e preencha seus dados para concluir.</p>
            <div className="text-left bg-apvs-blue-50 p-6 rounded-xl border border-apvs-blue-200 mb-6 w-full">
              <p><strong>Veículo:</strong> {vehicleInfo?.model}</p>
              <p><strong>Marca:</strong> {vehicleInfo?.brand}</p>
              <p><strong>Ano:</strong> {vehicleInfo?.modelYear}</p>
              <p><strong>Combustível:</strong> {vehicleInfo?.fuel}</p>
              <p className="text-2xl font-bold text-apvs-green-600 mt-2">Valor FIPE: {vehicleInfo?.price}</p>
              <p className="text-xs text-gray-500 mt-1">Referência: {vehicleInfo?.referenceMonth}</p>
            </div>
            <form onSubmit={handleFinalSubmit} className="w-full flex flex-col gap-4">
              <input type="text" placeholder="Seu nome completo" value={name} onChange={e => setName(e.target.value)} required className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-apvs-blue-900" />
              <input type="tel" placeholder="Seu melhor telefone (WhatsApp)" value={phone} onChange={e => setPhone(e.target.value)} required className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-apvs-blue-900" />
              <button type="submit" disabled={isSubmitting} className="w-full py-4 px-6 rounded-xl text-lg font-bold bg-apvs-green-500 hover:bg-apvs-green-600 text-white transition-all shadow-lg hover:-translate-y-1">
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
    <section id="cotacao" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 bg-apvs-blue-50 p-8 md:p-12 flex flex-col justify-center">
            <Reveal animation="slide-right">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-apvs-green-500" />
                <h3 className="text-2xl font-bold text-apvs-blue-900">Cotação Online FIPE</h3>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Use nossa ferramenta integrada para obter o valor de referência do seu veículo e solicitar sua proteção de forma rápida e transparente.
              </p>
              <ul className="space-y-4">
                {['Cotação baseada na Tabela FIPE', 'Processo 100% online', 'Rápido e sem compromisso', 'Dados seguros e protegidos'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-apvs-green-500 flex-shrink-0" />
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