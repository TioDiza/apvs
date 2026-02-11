const API_BASE_URL = 'https://fipe.parallelum.com.br/api/v2';

export interface Brand {
  code: string;
  name: string;
}

export interface Model {
  code: string;
  name: string;
}

export interface Year {
  code: string;
  name: string;
}

export interface VehicleInfo {
  brand: string;
  model: string;
  modelYear: number;
  price: string;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(errorData.message || `Erro na API: ${response.statusText}`);
  }
  return response.json();
};

export const getBrands = async (vehicleType: string): Promise<Brand[]> => {
  const response = await fetch(`${API_BASE_URL}/${vehicleType}/brands`);
  return handleResponse(response);
};

export const getModels = async (vehicleType: string, brandId: string): Promise<Model[]> => {
  const response = await fetch(`${API_BASE_URL}/${vehicleType}/brands/${brandId}/models`);
  const data = await handleResponse(response);
  
  // Corrigindo: A API pode retornar um array diretamente ou um objeto com a lista aninhada.
  // Esta verificação torna o código mais robusto.
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.models)) {
    return data.models;
  }
  
  console.error("Estrutura de resposta inesperada para modelos:", data);
  throw new Error("A resposta da API para modelos de veículos não está no formato esperado.");
};

export const getYears = async (vehicleType: string, brandId: string, modelId: string): Promise<Year[]> => {
  const response = await fetch(`${API_BASE_URL}/${vehicleType}/brands/${brandId}/models/${modelId}/years`);
  return handleResponse(response);
};

export const getVehicleInfo = async (vehicleType: string, brandId: string, modelId: string, yearId: string): Promise<VehicleInfo> => {
  const response = await fetch(`${API_BASE_URL}/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`);
  return handleResponse(response);
};