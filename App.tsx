import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Quotation } from './components/Quotation';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden selection:bg-apvs-green-500 selection:text-white">
      <Navbar />
      
      <main>
        <HeroSection />
        <HowItWorks />
        <Benefits />
        <Quotation />
        <About />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;