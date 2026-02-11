import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

const MainLayout: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden selection:bg-apvs-green-500 selection:text-white">
      <Navbar />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;