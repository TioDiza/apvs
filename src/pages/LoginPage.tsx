import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-extrabold text-apvs-blue-900 text-center mb-2">Acesso ao Dashboard</h1>
          <p className="text-gray-500 text-center mb-8">Faça login para ver as cotações.</p>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="light"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Seu email',
                  password_label: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                },
                sign_up: {
                    email_label: 'Seu email',
                    password_label: 'Sua senha',
                    button_label: 'Registrar',
                    loading_button_label: 'Registrando...',
                },
                forgotten_password: {
                    email_label: 'Seu email',
                    button_label: 'Enviar instruções',
                    loading_button_label: 'Enviando...',
                }
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};