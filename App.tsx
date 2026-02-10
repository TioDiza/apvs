import React from 'react';
import { Navbar } from './src/components/Navbar';
import { HeroSection } from './src/components/HeroSection';
import { HowItWorks } from './src/components/HowItWorks';
import { Benefits } from './src/components/Benefits';
import { Quotation } from './src/components/Quotation';
import { About } from './src/components/About';
import { Testimonials } from './src/components/Testimonials';
import { FAQ } from './src/components/FAQ';
import { FinalCTA } from './src/components/FinalCTA';
import { Footer } from './src/components/Footer';
import { WhatsAppButton } from './src/components/WhatsAppButton';

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