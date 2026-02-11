import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h1 className="text-4xl font-extrabold text-apvs-blue-900 dark:text-white">Política de Privacidade</h1>
          <p className="text-gray-500 dark:text-gray-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2>1. Coleta de Informações</h2>
          <p>Coletamos informações que você nos fornece diretamente, como quando solicita uma cotação (placa do veículo, nome, telefone). Também podemos coletar informações automaticamente através de cookies e tecnologias semelhantes para melhorar sua experiência no site.</p>

          <h2>2. Uso das Informações</h2>
          <p>As informações coletadas são utilizadas para: processar sua solicitação de cotação, entrar em contato com você, melhorar nossos serviços e personalizar sua experiência. Não compartilhamos suas informações pessoais com terceiros para fins de marketing sem o seu consentimento.</p>

          <h2>3. Segurança dos Dados</h2>
          <p>Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.</p>

          <h2>4. Seus Direitos</h2>
          <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais que possuímos. Para exercer esses direitos, entre em contato conosco através dos canais fornecidos em nosso site.</p>

          <h2>5. Cookies</h2>
          <p>Nosso site utiliza cookies para melhorar a funcionalidade e a experiência do usuário. Você pode configurar seu navegador para recusar todos ou alguns cookies, mas isso pode afetar a funcionalidade do site.</p>

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