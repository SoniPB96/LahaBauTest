import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import EstimatorCard from '../calculator/EstimatorCard';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="start" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            {siteConfig.hero.badge}
          </div>

          <h1 className="hero-headline">
            {siteConfig.hero.headline}
          </h1>

          <p className="hero-subheadline">
            {siteConfig.hero.subheadline}
          </p>

          <div className="hero-trust">
            {siteConfig.hero.trustLine}
          </div>

          <div className="hero-cta">
            <button
              className="cta-primary"
              onClick={() => navigate(siteConfig.hero.cta.primary.path)}
            >
              {siteConfig.hero.cta.primary.label}
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate(siteConfig.hero.cta.secondary.path)}
            >
              {siteConfig.hero.cta.secondary.label}
            </button>
          </div>
        </div>

        <div className="hero-estimator hero-estimator-desktop">
          <EstimatorCard onOpenCalculator={() => navigate('/rechner')} />
        </div>
      </div>

      <button
        className="scroll-indicator"
        onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}

export default HeroSection;
