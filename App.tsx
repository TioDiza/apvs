import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { HomePage } from '@/pages/HomePage';
import { TermsOfUsePage } from '@/pages/TermsOfUsePage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import ScrollToTop from '@/components/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden selection:bg-apvs-green-500 selection:text-white">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;