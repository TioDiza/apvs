-- Create quotations table
CREATE TABLE public.quotations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  phone TEXT,
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

-- Create policies for operations
-- Allow public (anonymous) users to insert quotations
CREATE POLICY "Public can insert quotations" ON public.quotations
FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admins) to view all quotations
CREATE POLICY "Authenticated users can view quotations" ON public.quotations
FOR SELECT TO authenticated USING (true);

-- Allow authenticated users (admins) to update quotations
CREATE POLICY "Authenticated users can update quotations" ON public.quotations
FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users (admins) to delete quotations
CREATE POLICY "Authenticated users can delete quotations" ON public.quotations
FOR DELETE TO authenticated USING (true);