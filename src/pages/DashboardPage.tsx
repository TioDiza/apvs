import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2, LogOut, CheckCircle, RefreshCw } from 'lucide-react';
import logo from '@/assets/logo-apvs-gold.png';

interface Quotation {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  vehicle_type: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_year: string;
  vehicle_fipe_value: string;
  monthly_fee: number;
  adhesion_fee: number;
  state: string;
  contacted: boolean;
}

export const DashboardPage: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchQuotations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Falha ao buscar cotações.');
      console.error(error);
    } else {
      setQuotations(data as Quotation[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta cotação?')) {
      const { error } = await supabase.from('quotations').delete().eq('id', id);
      if (error) {
        alert('Erro ao excluir cotação.');
      } else {
        setQuotations(quotations.filter(q => q.id !== id));
      }
    }
  };

  const handleToggleContacted = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const originalQuotations = quotations;

    const updatedQuotations = quotations.map(q =>
      q.id === id ? { ...q, contacted: newStatus } : q
    );
    setQuotations(updatedQuotations);

    const { error } = await supabase
      .from('quotations')
      .update({ contacted: newStatus })
      .eq('id', id);

    if (error) {
      alert('Erro ao atualizar o status do contato.');
      console.error(error);
      setQuotations(originalQuotations);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-apvs-blue-900 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="APVS Brasil Logo" className="w-48" />
        </div>
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 dark:text-blue-200">Bem Vindo Corretor de Seguros Gabriel Ferreira Siqueira Andrade</p>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Dashboard de Cotações</h1>
            <p className="text-gray-600 dark:text-blue-200 mt-1">Lista de Leads que fizeram cotação APVS - BRASIL</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchQuotations}
              className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 backdrop-blur-md text-gray-800 dark:text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Atualizar
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-xl overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="w-10 h-10 animate-spin text-apvs-blue-900" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : quotations.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center p-8">Nenhuma cotação encontrada.</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">Data</th>
                  <th scope="col" className="px-6 py-3">Nome</th>
                  <th scope="col" className="px-6 py-3">Telefone</th>
                  <th scope="col" className="px-6 py-3">Veículo</th>
                  <th scope="col" className="px-6 py-3">Valor FIPE</th>
                  <th scope="col" className="px-6 py-3">Adesão</th>
                  <th scope="col" className="px-6 py-3">Mensalidade</th>
                  <th scope="col" className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map(q => (
                  <tr key={q.id} className={`border-b dark:border-gray-700 transition-colors ${q.contacted ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                    <td className="px-6 py-4">{new Date(q.created_at).toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{q.name}</td>
                    <td className="px-6 py-4">{q.phone}</td>
                    <td className="px-6 py-4">{q.vehicle_model} {q.vehicle_year}</td>
                    <td className="px-6 py-4">{q.vehicle_fipe_value}</td>
                    <td className="px-6 py-4 font-bold text-apvs-blue-900 dark:text-blue-300">R$ {q.adhesion_fee?.toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">R$ {q.monthly_fee?.toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4 flex items-center">
                      <button 
                        onClick={() => handleToggleContacted(q.id, q.contacted)} 
                        className={`p-1 rounded-full transition-colors ${q.contacted ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`} 
                        title={q.contacted ? 'Marcar como não contatado' : 'Marcar como contatado'}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(q.id)} 
                        className="text-red-600 hover:text-red-800 p-1 ml-2" 
                        title="Excluir cotação"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};