import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2, MessageCircle, Phone, Mail, Menu, X, Zap, Wrench, Network, Sun, Calculator,
  ClipboardList, Handshake, Gem, Hammer, Upload, MapPin, ShieldCheck
} from "lucide-react";
import { siteConfig } from "./config/siteConfig";

const serviceIconMap = {
  zap: Zap,
  wrench: Wrench,
  network: Network,
  sun: Sun,
  calculator: Calculator,
  check: CheckCircle2,
};

function Button({ children, href, outline = false, onClick, type = "button", className = "", target }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) {
    return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  }
  return <button className={cls} onClick={onClick} type={type}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div>;
}

function Logo() {
  return (
    <div className="logo-lockup">
      <div className="logo-mark" aria-hidden="true">
        <span className="logo-bar b1" /><span className="logo-bar b2" /><span className="logo-bar b3" /><span className="logo-bar b4" />
        <span className="logo-cut c1" /><span className="logo-cut c2" /><span className="logo-cut c3" />
      </div>
      <div className="logo-text">
        <div className="brand-name">LAHA</div>
        <div className="brand-sub">BAUDIENSTLEISTUNGEN</div>
      </div>
    </div>
  );
}

function HomePage({ cfg, openTab, heroRef }) {
  return (
    <main>
      <section className="hero" ref={heroRef}>
        <div className="container hero-grid">
          <div className="hero-copy clean-hero-copy">
            <div className="badge-row">
              <span className="badge">{cfg.hero.badgePrimary}</span>
              <span className="badge muted">{cfg.hero.badgeSecondary}</span>
            </div>

            <h1>{cfg.hero.headline}</h1>
            <h2 className="hero-subheadline">{cfg.hero.subheadline}</h2>
            <p>{cfg.hero.text}</p>
            <p className="hero-trust">{cfg.hero.trustLine}</p>

            <div className="button-row hero-cta-row">
              <Button onClick={() => openTab("anfrage")}>Anfrage stellen</Button>
              <Button outline onClick={() => openTab("ablauf")}>So läuft es ab</Button>
            </div>
          </div>

          <div className="hero-side">
            <div className="card liquid-card glow">
              <div className="card-pad">
                <div className="eyebrow">{cfg.calculatorTeaser.eyebrow}</div>
                <h3 className="card-title">{cfg.calculatorTeaser.title}</h3>
                <div className="result-box glass-inset">
                  <div className="result-top">
                    <span>Separater Bereich</span>
                    <span>Kompatibel gehalten</span>
                  </div>
                  <div className="hero-price hero-price-strong">Klar getrennt</div>
                  <p>{cfg.hero.estimatorCardInfo}</p>
                </div>
                <div className="hero-mini-boxes">
                  {cfg.calculatorTeaser.bullets.map((item) => (
                    <div key={item} className="soft-box liquid-card subtle">{item}</div>
                  ))}
                </div>
                <Button className="full" onClick={() => openTab("rechner")}>
                  Zur Erste Kosteneinschätzung
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={cfg.services.eyebrow} title={cfg.services.title} text={cfg.services.text} />
          <div className="services-grid">
            {cfg.services.items.map((service) => {
              const Icon = serviceIconMap[service.icon] || CheckCircle2;
              return (
                <div key={service.key} className="card liquid-card subtle">
                  <div className="card-pad">
                    <div className="service-icon"><Icon size={22} /></div>
                    <h3 className="card-title">{service.title}</h3>
                    <p className="body-text">{service.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container">
          <SectionTitle eyebrow={cfg.trust.eyebrow} title={cfg.trust.title} text={cfg.trust.text} />
          <div className="mini-grid trust-grid three-col-grid">
            {cfg.trust.items.map((item) => (
              <div key={item.title} className="card liquid-card subtle">
                <div className="card-pad">
                  <div className="service-icon small-icon-circle"><ShieldCheck size={18} /></div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="body-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight-top">
        <div className="container area-strip liquid-card subtle">
          <div className="card-pad">
            <SectionTitle eyebrow={cfg.areas.eyebrow} title={cfg.areas.title} text={cfg.areas.text} />
            <div className="chip-cloud">
              {cfg.areas.chips.map((chip) => (
                <div key={chip} className="badge area-chip"><MapPin size={14} /> {chip}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestMode, setRequestMode] = useState("whatsapp");
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting && !menuOpen && activeTab !== "anfrage";
        setShowSticky(shouldShow);
      },
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [menuOpen, activeTab]);

  useEffect(() => {
    if (menuOpen) setShowSticky(false);
  }, [menuOpen]);

  const openTab = (key) => {
    setActiveTab(key);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <div className="bg-orb orb-1" /><div className="bg-orb orb-2" /><div className="bg-orb orb-3" />

      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => openTab("start")} aria-label="Startseite">
            <Logo />
          </button>

          <nav className="nav desktop-nav">
            {cfg.navigation.items.map((item) => (
              <button key={item.key} onClick={() => openTab(item.key)}>{item.label}</button>
            ))}
          </nav>

          <div className="desktop-cta">
            <Button onClick={() => openTab("anfrage")}>{cfg.navigation.ctaLabel}</Button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="container mobile-menu-inner">
              {cfg.navigation.items.map((item) => (
                <button key={item.key} onClick={() => openTab(item.key)}>{item.label}</button>
              ))}
              <Button onClick={() => openTab("anfrage")}>{cfg.navigation.ctaLabel}</Button>
            </div>
          </div>
        )}
      </header>

      {activeTab === "start" && <HomePage cfg={cfg} openTab={openTab} heroRef={heroRef} />}

      {activeTab === "ablauf" && (
        <main className="section" ref={heroRef}>
          <div className="container">
            <SectionTitle eyebrow={cfg.process.eyebrow} title={cfg.process.title} text={cfg.process.text} />
            <div className="services-grid process-grid">
              {cfg.process.steps.map((step) => (
                <div key={step.title} className="card liquid-card glow">
                  <div className="card-pad">
                    <h3 className="card-title">{step.title}</h3>
                    <p className="body-text">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="request-steps liquid-card subtle process-note-box">
              <div className="eyebrow">Wichtig für normale Privatkunden</div>
              <div className="feature-list compact-list">
                {cfg.process.notes.map((item) => (
                  <div key={item} className="feature-row">
                    <div className="feature-icon small-icon"><CheckCircle2 size={16} /></div>
                    <div className="feature-text">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === "begleitung" && (
        <main className="section" ref={heroRef}>
          <div className="container">
            <SectionTitle eyebrow={cfg.begleitung.eyebrow} title={cfg.begleitung.title} text={cfg.begleitung.text} />
            <p className="begleitung-subline">{cfg.begleitung.subline}</p>
            <div className="begleitung-hero liquid-card glow">
              <div className="begleitung-main">
                <p className="begleitung-intro">{cfg.begleitung.intro}</p>
                <div className="feature-list">
                  {cfg.begleitung.points.map((point, i) => {
                    const icons = [ClipboardList, Handshake, Hammer, Gem];
                    const Icon = icons[i] || CheckCircle2;
                    return (
                      <div key={point} className="feature-row">
                        <div className="feature-icon"><Icon size={18} /></div>
                        <div className="feature-text">{point}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="button-row feature-cta-row">
                  <Button onClick={() => openTab("anfrage")}>Projekt anfragen</Button>
                </div>
              </div>
            </div>

            <div className="begleitung-cards">
              {cfg.begleitung.cards.map((card) => (
                <div key={card.title} className="card liquid-card subtle">
                  <div className="card-pad">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="body-text">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === "faq" && (
        <main className="section" ref={heroRef}>
          <div className="container">
            <SectionTitle eyebrow={cfg.faq.eyebrow} title={cfg.faq.title} text={cfg.faq.text} />
            <div className="faq-stack">
              {cfg.faq.items.map((item) => (
                <div key={item.question} className="card liquid-card subtle faq-card">
                  <div className="card-pad">
                    <h3 className="card-title faq-question">{item.question}</h3>
                    <p className="body-text">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === "rechner" && (
        <main className="section" ref={heroRef}>
          <div className="container">
            <SectionTitle eyebrow={cfg.calculatorTeaser.eyebrow} title={cfg.calculatorTeaser.title} text={cfg.calculatorTeaser.text} />
            <div className="estimator-layout">
              <div className="card liquid-card glow">
                <div className="card-pad stack">
                  <div className="result-box glass-inset big">
                    <div className="eyebrow">Status</div>
                    <h3 className="card-title">Rechner separat geführt</h3>
                    <p className="body-text">Dieser Workspace baut den Rechner bewusst nicht um. Die restliche Website bleibt dadurch klar, stabil und mit der separaten Rechner-Weiterentwicklung kompatibel.</p>
                  </div>
                  <div className="summary-list">
                    {cfg.calculatorTeaser.bullets.map((item) => (
                      <div key={item} className="feature-row compact-feature-row">
                        <div className="feature-icon small-icon"><CheckCircle2 size={16} /></div>
                        <div className="feature-text">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card liquid-card subtle">
                <div className="card-pad stack">
                  <div className="eyebrow">Nächster Schritt für den Kunden</div>
                  <p className="summary-direct-note">Für Interessenten ist der logischste Ablauf: kurz orientieren, Anfrage stellen oder direkt in die Erste Kosteneinschätzung wechseln.</p>
                  <Button onClick={() => openTab("anfrage")}>Anfrage stellen</Button>
                  <Button outline onClick={() => openTab("start")}>Zur Startseite</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === "anfrage" && (
        <main className="section" ref={heroRef}>
          <div className="container">
            <SectionTitle eyebrow={cfg.requestPage.eyebrow} title={cfg.requestPage.title} text={cfg.requestPage.text} />
            <div className="request-layout">
              <div className="card liquid-card glow">
                <div className="card-pad">
                  <div className="eyebrow">{cfg.requestPage.quickTitle}</div>
                  <h3 className="card-title">Wähle deinen bevorzugten Kontaktweg</h3>
                  <p className="body-text">{cfg.requestPage.quickText}</p>

                  <div className="request-selector">
                    <button className={`request-option request-option-primary ${requestMode==="whatsapp" ? "active" : ""}`} onClick={() => setRequestMode("whatsapp")}>
                      <MessageCircle size={18} />
                      <div className="request-option-text">
                        <span>WhatsApp</span>
                        <small>Empfohlen</small>
                      </div>
                    </button>
                    <button className={`request-option ${requestMode==="phone" ? "active" : ""}`} onClick={() => setRequestMode("phone")}>
                      <Phone size={18} />
                      <div className="request-option-text"><span>Anrufen</span></div>
                    </button>
                    <button className={`request-option ${requestMode==="email" ? "active" : ""}`} onClick={() => setRequestMode("email")}>
                      <Mail size={18} />
                      <div className="request-option-text"><span>E-Mail</span></div>
                    </button>
                    <button className={`request-option ${requestMode==="form" ? "active" : ""}`} onClick={() => setRequestMode("form")}>
                      <Calculator size={18} />
                      <div className="request-option-text"><span>Formular</span></div>
                    </button>
                  </div>

                  {requestMode === "whatsapp" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Schnellste Abstimmung direkt per WhatsApp.</p>
                      <Button href={cfg.company.whatsappLink} target="_blank"><MessageCircle size={16} /> WhatsApp schreiben</Button>
                    </div>
                  )}
                  {requestMode === "phone" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Direkter Anruf für schnelle Klärung.</p>
                      <Button href={cfg.company.phoneLink}><Phone size={16} /> Jetzt anrufen</Button>
                    </div>
                  )}
                  {requestMode === "email" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Für strukturierte Anfragen per E-Mail.</p>
                      <Button href={`mailto:${cfg.company.email}`}><Mail size={16} /> E-Mail senden</Button>
                    </div>
                  )}

                  <div className="request-steps liquid-card subtle">
                    <div className="eyebrow">{cfg.requestPage.listTitle}</div>
                    <div className="feature-list compact-list">
                      {cfg.requestPage.listItems.map((item) => (
                        <div key={item} className="feature-row">
                          <div className="feature-icon small-icon"><CheckCircle2 size={16} /></div>
                          <div className="feature-text">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`card liquid-card subtle form-card ${requestMode === "form" ? "form-card-show" : "form-card-muted"}`}>
                <div className="card-pad stack">
                  <div className="request-form-head">
                    <div className="eyebrow">Formular</div>
                    <h3 className="card-title">Detaillierte Projektanfrage</h3>
                    <p className="body-text">Für strukturierte Anfragen mit Unterlagen, Fotos oder Grundrissen.</p>
                  </div>
                  <div><label className="field-label">Name</label><input className="input glass-input" placeholder="Name" /></div>
                  <div className="form-grid two">
                    <div><label className="field-label">E-Mail</label><input className="input glass-input" placeholder="E-Mail" /></div>
                    <div><label className="field-label">Telefon</label><input className="input glass-input" placeholder="Telefon" /></div>
                  </div>
                  <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" placeholder="PLZ / Ort" /></div>
                  <div><label className="field-label">Projektart / Thema</label><input className="input glass-input" placeholder="z. B. Sanierung, Erweiterung, Unterverteilung, Baubegleitung" /></div>
                  <div>
                    <label className="field-label">Unterlagen / Grundriss</label>
                    <label className="upload-box glass-input">
                      <Upload size={16} />
                      <span>Datei auswählen</span>
                      <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                  </div>
                  <div><label className="field-label">Beschreibung</label><textarea className="input textarea glass-input" placeholder="Kurze Beschreibung des Projekts" /></div>
                  <div className="soft-box liquid-card subtle">{cfg.requestPage.formNote}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {showSticky && (
        <button className="sticky-contact sticky-contact-wide" onClick={() => openTab("anfrage")}>Anfrage stellen</button>
      )}
    </div>
  );
}
