-- Create quotations table
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

-- Enable RLS (REQUIRED for security)
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anonymous users to create new quotations (from the public form)
CREATE POLICY "Allow anonymous inserts" ON public.quotations
FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users (admins) to view all quotations
CREATE POLICY "Allow authenticated users to select" ON public.quotations
FOR SELECT TO authenticated USING (true);

-- Allow authenticated users (admins) to delete quotations
CREATE POLICY "Allow authenticated users to delete" ON public.quotations
FOR DELETE TO authenticated USING (true);

-- Allow authenticated users (admins) to update quotations (good practice to have it)
CREATE POLICY "Allow authenticated users to update" ON public.quotations
FOR UPDATE TO authenticated USING (true);