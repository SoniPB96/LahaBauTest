import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import EstimatorCard from '../calculator/EstimatorCard';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      <section id="start" className="hero">
        {/* Großes LAHA-Outline im Hintergrund */}
        <div className="hero-bg-word" aria-hidden="true">LAHA</div>

        {/* Meta-Zeile oben */}
        <div className="hero-meta-row">
          <div className="hero-badge">{siteConfig.hero.badge}</div>
          <div className="hero-badge" style={{ opacity: 0.4 }}>Est. 2024</div>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-headline">
            Handwerk,<br />das hält.
          </h1>
          <span className="hero-headline-italic">
            {siteConfig.hero.subheadline.startsWith('—')
              ? siteConfig.hero.subheadline
              : `— ${siteConfig.hero.subheadline}`}
          </span>
        </div>

        {/* Dreigeteilte Bottom-Bar */}
        <div className="hero-bottom-bar">
          <div className="hero-bottom-cell">
            <p className="hero-subheadline" style={{ marginTop: 0 }}>
              {siteConfig.hero.subheadline.replace(/^—\s*/, '')}
            </p>
          </div>
          <div className="hero-bottom-cell">
            <div className="hero-trust" style={{ borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
              Ein Ansprechpartner.<br />
              Kein Pfuschen.<br />
              Keine versteckten Kosten.<br /><br />
              <span style={{ color: 'var(--text-muted)' }}>
                {siteConfig.hero.trustLine}
              </span>
            </div>
          </div>
          <div className="hero-bottom-cell" style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              className="cta-primary"
              style={{ width: '100%' }}
              onClick={() => navigate(siteConfig.hero.cta.primary.path)}
            >
              {siteConfig.hero.cta.primary.label}
            </button>
            <button
              className="cta-secondary"
              style={{ width: '100%' }}
              onClick={() => navigate(siteConfig.hero.cta.secondary.path)}
            >
              {siteConfig.hero.cta.secondary.label}
            </button>
          </div>
        </div>

        <button
          className="scroll-indicator"
          onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={18} />
        </button>
      </section>

      {/* Estimator-Strip direkt unter dem Hero */}
      <div className="estimator-strip">
        <div className="estimator-strip-label">
          <div className="estimator-strip-eyebrow">Ersteinschätzung</div>
          <div className="estimator-strip-title">Kostenrechner Elektrik</div>
        </div>
        <div className="estimator-strip-price">
          <div className="estimator-strip-ex">Bsp. 95 m² Altbau</div>
          <div className="estimator-strip-amount">
            8.239 € <span className="estimator-strip-range">– 10.922 €</span>
          </div>
          <div className="estimator-strip-ex">Realistische Preisspanne</div>
        </div>
        <div className="estimator-strip-modes">
          <div className="estimator-strip-mode active">Mehrstufige Eingabe</div>
          <div className="estimator-strip-mode">Richtpreis</div>
        </div>
        <button
          className="estimator-strip-cta"
          onClick={() => navigate('/rechner')}
        >
          Rechner öffnen →
        </button>
      </div>
    </>
  );
}

export default HeroSection;
