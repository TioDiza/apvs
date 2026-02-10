import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { Benefits } from '@/components/Benefits';
import { Quotation } from '@/components/Quotation';
import { About } from '@/components/About';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';

export const HomePage: React.FC = () => {
  return (
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
  );
};