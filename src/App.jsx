import React, { useState } from 'react';
import { siteConfig } from './siteConfig';
import { Zap, Wrench, Sun, Network, Calculator, Check, MessageCircle, Mail, Phone, ChevronDown } from 'lucide-react';
import './styles.css';

const iconMap = {
  zap: Zap,
  wrench: Wrench,
  sun: Sun,
  network: Network,
  calculator: Calculator,
  check: Check,
};

function App() {
  const [activeSection, setActiveSection] = useState('start');

  const scrollToSection = (key) => {
    setActiveSection(key);
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <ServicesSection />
        <TrustSection />
        <BegleitungSection />
        <RequestSection />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

function Header({ activeSection, scrollToSection }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <div className="logo-bars">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="logo-text">
            <div className="logo-name">{siteConfig.company.name}</div>
            <div className="logo-subtitle">{siteConfig.company.subtitle}</div>
          </div>
        </div>

        <nav className="nav">
          {siteConfig.navigation.items.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.key)}
              className={activeSection === item.key ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          className="cta-button"
          onClick={() => scrollToSection('anfrage')}
        >
          {siteConfig.navigation.ctaLabel}
        </button>
      </div>
    </header>
  );
}

function HeroSection({ scrollToSection }) {
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
              onClick={() => scrollToSection('anfrage')}
            >
              Projekt anfragen
            </button>
            <button 
              className="cta-secondary"
              onClick={() => scrollToSection('rechner')}
            >
              Kostenrechner öffnen
            </button>
          </div>
        </div>

        <div className="hero-estimator" id="rechner">
          <EstimatorCard scrollToSection={scrollToSection} />
        </div>
      </div>

      <button 
        className="scroll-indicator"
        onClick={() => scrollToSection('leistungen')}
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}

function EstimatorCard({ scrollToSection }) {
  const [mode, setMode] = useState('multi');

  return (
    <div className="estimator-card">
      <div className="estimator-header">
        <span className="estimator-label">DIGITALE ERSTEINSCHÄTZUNG</span>
        <h3>Erste Kosteneinschätzung Elektrik</h3>
      </div>

      <div className="estimator-example">
        <div className="example-params">
          <span>BEISPIEL: WOHNUNG, 85 M²</span>
          <span>SANIERUNG / ALTBAU</span>
        </div>
        <div className="example-price">8.239 € – 10.922 €</div>
        <p className="example-note">Realistische Preisspanne als erste Orientierung.</p>
      </div>

      <div className="estimator-modes">
        <button 
          className={mode === 'multi' ? 'active' : ''}
          onClick={() => setMode('multi')}
        >
          Mehrstufige Eingabe
        </button>
        <button 
          className={mode === 'fixed' ? 'active' : ''}
          onClick={() => setMode('fixed')}
        >
          Richtpreis statt Festpreis
        </button>
      </div>

      <button 
        className="estimator-open"
        onClick={() => scrollToSection('rechner-detail')}
      >
        Rechner öffnen
      </button>
    </div>
  );
}

function ServicesSection() {
  return (
    <section id="leistungen" className="services">
      <div className="services-container">
        <div className="section-header">
          <span className="eyebrow">{siteConfig.services.eyebrow}</span>
          <h2>{siteConfig.services.title}</h2>
        </div>

        <div className="services-grid">
          {siteConfig.services.items.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.key} className="service-card">
                <div className="service-icon">
                  <Icon size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const testimonials = [
    {
      text: "Klare Abstimmung, saubere Umsetzung.",
      author: "Familie K.",
      location: "Paderborn",
      initial: "FK"
    },
    {
      text: "Realistisch eingeschätzt und verständlich erklärt.",
      author: "M. Hoffmann",
      location: "Salzkotten",
      initial: "MH"
    }
  ];

  return (
    <section className="trust">
      <div className="trust-container">
        <div className="section-header">
          <span className="eyebrow">VERTRAUEN</span>
          <h2>Vertrauen durch klare Kommunikation</h2>
          <p>Saubere Arbeit, realistische Preise und klare Abstimmung.</p>
        </div>

        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.initial}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-location">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BegleitungSection() {
  return (
    <section id="begleitung" className="begleitung">
      <div className="begleitung-container">
        <div className="section-header">
          <span className="eyebrow">{siteConfig.begleitung.eyebrow}</span>
          <h2>{siteConfig.begleitung.title}</h2>
          <p>{siteConfig.begleitung.text}</p>
        </div>

        <div className="begleitung-content">
          <div className="begleitung-highlight">
            <h3>Passend zum Umfang, Budget und gewünschten Ergebnis.</h3>
            <ul className="begleitung-points">
              {siteConfig.begleitung.points.map((point, index) => (
                <li key={index}>
                  <Check size={20} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <button className="cta-primary">Projekt anfragen</button>
          </div>

          <div className="begleitung-cards">
            {siteConfig.begleitung.cards.map((card, index) => (
              <div key={index} className="begleitung-card">
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestSection() {
  return (
    <section id="anfrage" className="request">
      <div className="request-container">
        <div className="section-header">
          <span className="eyebrow">{siteConfig.requestPage.eyebrow}</span>
          <h2>{siteConfig.requestPage.title}</h2>
          <p>{siteConfig.requestPage.text}</p>
        </div>

        <div className="request-content">
          <div className="contact-methods">
            <h3>{siteConfig.requestPage.quickTitle}</h3>
            <p className="contact-intro">{siteConfig.requestPage.quickText}</p>

            <div className="contact-buttons">
              <a 
                href={siteConfig.company.whatsappLink}
                className="contact-button whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                <div>
                  <div className="button-label">WhatsApp</div>
                  <div className="button-sublabel">Empfohlen</div>
                </div>
              </a>

              <a 
                href={`mailto:${siteConfig.company.email}`}
                className="contact-button"
              >
                <Mail size={20} />
                <div className="button-label">E-Mail</div>
              </a>

              <a 
                href={siteConfig.company.phoneLink}
                className="contact-button"
              >
                <Phone size={20} />
                <div className="button-label">Anrufen</div>
              </a>
            </div>

            <div className="request-help">
              <h4>Was für die Rückmeldung hilft</h4>
              <ul>
                {siteConfig.requestPage.listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="contact-form-placeholder">
            <h3>Projektanfrage</h3>
            <p>Für strukturierte Anfragen mit Unterlagen oder Fotos.</p>
            <div className="form-note">
              Das Formular ist visuell vorbereitet, aber noch nicht an einen Versand angebunden.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ scrollToSection }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon">
              <div className="logo-bars">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="logo-text">
              <div className="logo-name">{siteConfig.company.name}</div>
              <div className="logo-subtitle">{siteConfig.company.subtitle}</div>
            </div>
          </div>
          <p>Elektroarbeiten & Baubegleitung im Raum Paderborn.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Leistungen</h4>
            <button onClick={() => scrollToSection('leistungen')}>Elektroinstallation</button>
            <button onClick={() => scrollToSection('rechner')}>Kostenrechner</button>
            <button onClick={() => scrollToSection('begleitung')}>Baubegleitung</button>
          </div>

          <div>
            <h4>Kontakt</h4>
            <a href={siteConfig.company.phoneLink}>{siteConfig.company.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a>
            <a href={siteConfig.company.whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          <div>
            <h4>Rechtliches</h4>
            <button>Impressum</button>
            <button>Datenschutz</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 LAHA Baudienstleistungen · Paderborn</p>
      </div>
    </footer>
  );
}

export default App;
