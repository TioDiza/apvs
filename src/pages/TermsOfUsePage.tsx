import React from 'react';
import { Link } from 'react-router-dom';

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h1 className="text-4xl font-extrabold text-apvs-blue-900 dark:text-white">Termos de Uso</h1>
          <p className="text-gray-500 dark:text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>1. Aceitação dos Termos</h2>
          <p>Ao acessar e utilizar o site da APVS Brasil, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concorda com estes termos, por favor, não utilize nosso site.</p>

          <h2>2. Uso do Site</h2>
          <p>Este site destina-se a fornecer informações sobre os serviços de proteção veicular da APVS Brasil e permitir que os usuários solicitem cotações. Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de, restrinja ou iniba o uso e gozo do site por qualquer terceiro.</p>

          <h2>3. Propriedade Intelectual</h2>
          <p>Todo o conteúdo presente neste site, incluindo textos, gráficos, logos, ícones, imagens e software, é propriedade da APVS Brasil ou de seus fornecedores de conteúdo e protegido pelas leis de direitos autorais.</p>

          <h2>4. Limitação de Responsabilidade</h2>
          <p>A APVS Brasil não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais que resultem do uso ou da incapacidade de usar nosso site ou serviços.</p>

          <h2>5. Alterações nos Termos</h2>
          <p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no site. É sua responsabilidade revisar os termos periodicamente.</p>

          <div className="mt-12 text-center">
            <Link to="/" className="bg-apvs-blue-900 hover:bg-apvs-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};