import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2, LogOut } from 'lucide-react';

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
}

export const DashboardPage: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotations = async () => {
      const { data, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError('Falha ao buscar cotações.');
        console.error(error);
      } else {
        setQuotations(data as Quotation[]);
      }
      setLoading(false);
    };

    fetchQuotations();
  }, []);

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

  return (
    <div className="bg-gray-50 min-h-screen py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-apvs-blue-900">Dashboard de Cotações</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="w-10 h-10 animate-spin text-apvs-blue-900" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : quotations.length === 0 ? (
            <p className="text-gray-500 text-center p-8">Nenhuma cotação encontrada.</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Data</th>
                  <th scope="col" className="px-6 py-3">Nome</th>
                  <th scope="col" className="px-6 py-3">Telefone</th>
                  <th scope="col" className="px-6 py-3">Veículo</th>
                  <th scope="col" className="px-6 py-3">Valor FIPE</th>
                  <th scope="col" className="px-6 py-3">Mensalidade</th>
                  <th scope="col" className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map(q => (
                  <tr key={q.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{new Date(q.created_at).toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{q.name}</td>
                    <td className="px-6 py-4">{q.phone}</td>
                    <td className="px-6 py-4">{q.vehicle_model} {q.vehicle_year}</td>
                    <td className="px-6 py-4">{q.vehicle_fipe_value}</td>
                    <td className="px-6 py-4 font-bold text-apvs-green-600">R$ {q.monthly_fee?.toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(q.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
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