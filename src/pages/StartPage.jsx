import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import TrustSection from '../components/sections/TrustSection';

function StartPage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <TrustSection />
    </main>
  );
}

export default StartPage;
