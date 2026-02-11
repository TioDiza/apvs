-- Cria a tabela 'quotations' para armazenar os dados do formulário.
CREATE TABLE public.quotations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT,
  vehicle_type TEXT,
  vehicle_brand TEXT,
  vehicle_model TEXT,
  vehicle_year TEXT,
  vehicle_fipe_value TEXT,
  monthly_fee NUMERIC,
  adhesion_fee NUMERIC
);

-- Habilita a Segurança a Nível de Linha (RLS) para proteger os dados.
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

-- Política de Segurança: Permite que qualquer pessoa (anônima) insira uma nova cotação.
-- Isso é necessário porque o formulário é público no site.
CREATE POLICY "Allow anonymous inserts" ON public.quotations
FOR INSERT WITH CHECK (true);

-- Política de Segurança: Permite que usuários autenticados (admins) leiam todas as cotações.
CREATE POLICY "Allow admin read access" ON public.quotations
FOR SELECT TO authenticated USING (true);

-- Política de Segurança: Permite que usuários autenticados (admins) atualizem cotações.
CREATE POLICY "Allow admin update access" ON public.quotations
FOR UPDATE TO authenticated USING (true);

-- Política de Segurança: Permite que usuários autenticados (admins) excluam cotações.
CREATE POLICY "Allow admin delete access" ON public.quotations
FOR DELETE TO authenticated USING (true);