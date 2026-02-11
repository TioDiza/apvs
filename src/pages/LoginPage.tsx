import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import '@/styles/login.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Email ou senha inválidos.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="card">
        <input 
          id="blind-check" 
          className="blind-check" 
          type="checkbox" 
          hidden 
          checked={isPasswordVisible}
          onChange={() => {}} // dummy onChange to prevent warning
        />
        <div className="avatar">
          <svg id="monkey" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 95c-24.853 0-45-20.147-45-45S25.147 5 50 5s45 20.147 45 45-20.147 45-45 45z" fill="#f2d2b1"></path>
            <path d="M50 92.5c-23.474 0-42.5-19.026-42.5-42.5S26.526 7.5 50 7.5s42.5 19.026 42.5 42.5-19.026 42.5-42.5 42.5z" fill="#f2ae72"></path>
            <path d="M49.999 84.848c-18.151 0-32.879-15.634-32.879-34.848S31.848 15.152 50 15.152c18.15 0 32.878 15.634 32.878 34.848S68.15 84.848 49.999 84.848z" fill="#e38752"></path>
            <path d="M50 82.348c-16.78 0-30.379-14.543-30.379-32.348S33.22 17.652 50 17.652c16.78 0 30.378 14.543 30.378 32.348S66.78 82.348 50 82.348z" fill="#e39e73"></path>
            <path d="M38.828 53.727c-4.072 0-7.379-3.307-7.379-7.379s3.307-7.379 7.379-7.379 7.379 3.307 7.379 7.379-3.307 7.379-7.379 7.379z" fill="#f2d2b1"></path>
            <path d="M61.172 53.727c-4.072 0-7.379-3.307-7.379-7.379s3.307-7.379 7.379-7.379 7.379 3.307 7.379 7.379-3.307 7.379-7.379 7.379z" fill="#f2d2b1"></path>
            <g className="monkey-eye-nose">
                <path d="M50 46.348c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z" fill="#3c302a"></path>
                <path d="M48.5 43.848a1 1 0 01-1-1v-2.5a1 1 0 012 0v2.5a1 1 0 01-1 1z" fill="#3c302a"></path>
                <path d="M51.5 43.848a1 1 0 01-1-1v-2.5a1 1 0 012 0v2.5a1 1 0 01-1 1z" fill="#3c302a"></path>
            </g>
            <ellipse className="monkey-eye-l" cx="38.828" cy="31.7" rx="5.5" ry="4.5" fill="#3c302a"></ellipse>
            <ellipse className="monkey-eye-r" cx="61.172" cy="31.7" rx="5.5" ry="4.5" fill="#3c302a"></ellipse>
          </svg>
          <svg id="monkey-hands" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M85.435 50.833c0-2.34-1.903-4.243-4.243-4.243h-9.898c-2.34 0-4.243 1.903-4.243 4.243v12.728c0 2.34 1.903 4.243 4.243 4.243h9.898c2.34 0 4.243-1.903 4.243-4.243v-12.728z" fill="#f2ae72"></path>
            <path d="M81.192 67.804h-9.898c-2.34 0-4.243-1.903-4.243-4.243V50.833c0-2.34 1.903-4.243 4.243-4.243h9.898c2.34 0 4.243 1.903 4.243 4.243v12.728c0 2.34-1.903 4.243-4.243 4.243z" fill="#f2d2b1"></path>
            <path d="M14.565 50.833c0-2.34 1.903-4.243 4.243-4.243h9.898c2.34 0 4.243 1.903 4.243 4.243v12.728c0 2.34-1.903 4.243-4.243 4.243h-9.898c-2.34 0-4.243-1.903-4.243-4.243v-12.728z" fill="#f2ae72"></path>
            <path d="M18.808 67.804h-9.898c-2.34 0-4.243-1.903-4.243-4.243V50.833c0-2.34 1.903-4.243 4.243-4.243h9.898c2.34 0 4.243 1.903 4.243 4.243v12.728c0 2.34-1.903 4.243-4.243 4.243z" fill="#f2d2b1"></path>
          </svg>
        </div>
        <form className="form" onSubmit={handleLogin}>
          <p className="title">Acesso ao Dashboard</p>
          <label className="label_input">Email</label>
          <input 
            className="input" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label_input">Senha</label>
          <input 
            id="password-input" 
            className="input" 
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label 
            htmlFor="blind-check" 
            className="blind_input"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <span className="show">MOSTRAR</span>
            <span className="hide">ESCONDER</span>
          </label>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className="submit" disabled={loading}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};