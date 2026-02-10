import React from 'react';
import { ShieldCheck, Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-8 h-8 text-apvs-green-500" />
              <span className="text-2xl font-bold text-white">
                APVS <span className="text-apvs-green-500">Brasil</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              A maior associação de proteção veicular da América Latina. Protegendo o seu patrimônio com seriedade e transparência há mais de 14 anos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-apvs-green-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-apvs-green-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-apvs-green-500 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Acesso Rápido</h4>
            <ul className="space-y-3">
              <li><a href="#inicio" className="hover:text-apvs-green-500 transition-colors">Início</a></li>
              <li><a href="#como-funciona" className="hover:text-apvs-green-500 transition-colors">Como Funciona</a></li>
              <li><a href="#beneficios" className="hover:text-apvs-green-500 transition-colors">Benefícios</a></li>
              <li><a href="#sobre" className="hover:text-apvs-green-500 transition-colors">Sobre a APVS</a></li>
              <li><a href="#cotacao" className="hover:text-apvs-green-500 transition-colors">Fazer Cotação</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-apvs-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Assistência 24h</p>
                  <p className="text-sm">0800 000 0000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-apvs-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Comercial</p>
                  <p className="text-sm">(31) 4003-0000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-apvs-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">contato@apvs.com.br</p>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Sede Administrativa</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-apvs-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                Av. Nossa Senhora do Carmo, 1234<br />
                Sion, Belo Horizonte - MG<br />
                CEP: 30330-000
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} APVS Brasil. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
