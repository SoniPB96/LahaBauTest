import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  CheckCircle2, MessageCircle, Phone, Mail, Menu, X, Zap, Wrench, Network, Sun, Calculator,
  ClipboardList, Handshake, Gem, Hammer, Upload, Star
} from "lucide-react";
import { siteConfig } from "./config/siteConfig";
import { calculatorConfig } from "./config/calculatorConfig";
import { estimatePrice, formatEUR } from "./components/calculatorLogic";
import CalculatorPanel from "./components/CalculatorPanel";

const serviceIconMap = {
  zap: Zap,
  wrench: Wrench,
  network: Network,
  sun: Sun,
  calculator: Calculator,
  check: CheckCircle2,
};

function Button({ children, href, outline = false, onClick, type = "button", className = "", target, disabled = false }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) {
    return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  }
  return <button className={cls} onClick={onClick} type={type} disabled={disabled}>{children}</button>;
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

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestMode, setRequestMode] = useState("whatsapp");
  const [topInView, setTopInView] = useState(true);
  const [stickyBlocked, setStickyBlocked] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const begleitungRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", zip: "", projectType: "", description: "", file: null });
  const [formState, setFormState] = useState("idle"); // idle | sending | success | error

  const heroExampleResult = useMemo(() => estimatePrice(calculatorConfig.defaults), []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormState("sending");
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (v) body.append(k, v); });
      body.append("_subject", `Neue Anfrage von ${formData.name}`);
      const res = await fetch("https://formspree.io/f/DEINE_FORMSPREE_ID", {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  useEffect(() => {
    const target = activeTab === "begleitung" ? begleitungRef.current : heroRef.current;
    if (!target) {
      setTopInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setTopInView(entry.isIntersecting),
      { threshold: 0.12 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "start" || !testimonialsRef.current) {
      setStickyBlocked(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setStickyBlocked(entry.isIntersecting),
      { threshold: 0.18 }
    );
    observer.observe(testimonialsRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    const shouldShow = !topInView && !menuOpen && (activeTab === "start" || activeTab === "begleitung") && !stickyBlocked;
    setShowSticky(shouldShow);
  }, [topInView, menuOpen, activeTab, stickyBlocked]);

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
              <button
                key={item.key}
                className={activeTab === item.key ? "nav-active" : ""}
                onClick={() => openTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="desktop-cta">
            <Button onClick={() => openTab("anfrage")} className={activeTab === "anfrage" ? "btn-active" : ""}>{cfg.navigation.ctaLabel}</Button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="container mobile-menu-inner">
              {cfg.navigation.items.map((item) => (
                <button
                  key={item.key}
                  className={activeTab === item.key ? "nav-active" : ""}
                  onClick={() => openTab(item.key)}
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => openTab("anfrage")}>{cfg.navigation.ctaLabel}</Button>
            </div>
          </div>
        )}
      </header>

      {activeTab === "start" && (
        <main>
          <section className="hero" ref={heroRef}>
            <div className="container hero-grid">
              <div className="hero-copy clean-hero-copy">
                <div className="hero-copy-panel">
                  <h1>{cfg.hero.headline}</h1>
                  <h2 className="hero-subheadline">{cfg.hero.subheadline}</h2>

                  <div className="hero-lead-stack">
                    <p className="hero-lead">{cfg.hero.text}</p>
                    <p className="hero-trust">{cfg.hero.trustLine}</p>
                  </div>

                  <div className="hero-proof-grid" aria-label="Vorteile auf einen Blick">
                    <div className="hero-proof-item glass-inset">
                      <span className="hero-proof-label">Ansprechpartner</span>
                      <strong>Fester Ansprechpartner ohne wechselnde Zuständigkeiten.</strong>
                    </div>
                    <div className="hero-proof-item glass-inset">
                      <span className="hero-proof-label">Ersteinschätzung</span>
                      <strong>Früh einordnen, was technisch sinnvoll und preislich realistisch ist.</strong>
                    </div>
                    <div className="hero-proof-item glass-inset hero-proof-item-wide">
                      <span className="hero-proof-label">Meisterbetrieb</span>
                      <strong>Planung und Ausführung fachlich sauber abgestimmt für Privatkunden im Raum Paderborn.</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-side">
                <div className="card liquid-card glow hero-main-card">
                  <div className="hero-accent-line" aria-hidden="true" />
                  <div className="card-pad">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title">Erste Kosteneinschätzung Elektrik</h3>
                    <div className="result-box glass-inset">
                      <div className="result-top">
                        <span>Beispiel: Wohnung, {calculatorConfig.defaults.sqm} m²</span>
                        <span>Sanierung / Altbau</span>
                      </div>
                      <div className="hero-price hero-price-strong">{formatEUR(heroExampleResult.low)} – {formatEUR(heroExampleResult.high)}</div>
                      <p>{cfg.hero.estimatorCardInfo}</p>
                    </div>
                    <div className="hero-mini-boxes">
                      <div className="soft-box liquid-card subtle">Mehrstufige Eingabe</div>
                      <div className="soft-box liquid-card subtle">Richtpreis statt Festpreis</div>
                    </div>
                    <Button className="full" onClick={() => openTab("rechner")}>
                      Rechner öffnen
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
                    <div key={service.key} className="card liquid-card subtle service-card">
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

          <section className="section testimonials-section" ref={testimonialsRef}>
            <div className="container">
              <SectionTitle eyebrow={cfg.testimonials.eyebrow} title={cfg.testimonials.title} text={cfg.testimonials.text} />
              <div className="testimonials-grid">
                {cfg.testimonials.items.map((item) => (
                  <div key={item.name} className="card liquid-card subtle testimonial-card">
                    <div className="card-pad">
                      <div className="testimonial-stars">
                        {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#bfa166" stroke="none" />)}
                      </div>
                      <div className="testimonial-quote-mark">"</div>
                      <p className="testimonial-quote">{item.quote}</p>
                      <div className="testimonial-person">
                        <div className="testimonial-avatar" aria-hidden="true">{item.initials}</div>
                        <div>
                          <div className="testimonial-name">{item.name}</div>
                          <div className="testimonial-location">{item.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === "begleitung" && (
        <main className="section" ref={begleitungRef}>
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

      {activeTab === "rechner" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={calculatorConfig.titleEyebrow} title={calculatorConfig.title} text={calculatorConfig.text} />
            <CalculatorPanel onOpenRequestPage={() => openTab("anfrage")} />
          </div>
        </main>
      )}

      {activeTab === "anfrage" && (
        <main className="section">
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
                <div className="card-pad">
                  <div className="request-form-head">
                    <div className="eyebrow">Formular</div>
                    <h3 className="card-title">Detaillierte Projektanfrage</h3>
                    <p className="body-text">Für strukturierte Anfragen mit Unterlagen, Fotos oder Grundrissen.</p>
                  </div>

                  {formState === "success" ? (
                    <div className="soft-box liquid-card subtle" style={{ textAlign: "center", padding: "32px 20px", marginTop: "16px" }}>
                      <CheckCircle2 size={32} style={{ color: "#4ba776", display: "block", margin: "0 auto 10px" }} />
                      <p style={{ fontWeight: 700, color: "#f4f7ff", marginBottom: 6 }}>Anfrage gesendet!</p>
                      <p className="body-text">Ich melde mich in der Regel innerhalb von 24 Stunden.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="form-stack">
                      <div><label className="field-label">Name *</label><input required className="input glass-input" placeholder="Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} /></div>
                      <div className="form-grid two">
                        <div><label className="field-label">E-Mail *</label><input required type="email" className="input glass-input" placeholder="E-Mail" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} /></div>
                        <div><label className="field-label">Telefon</label><input className="input glass-input" placeholder="Telefon" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} /></div>
                      </div>
                      <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" placeholder="PLZ / Ort" value={formData.zip} onChange={e => setFormData(p => ({ ...p, zip: e.target.value }))} /></div>
                      <div><label className="field-label">Projektart / Thema</label><input className="input glass-input" placeholder="z. B. Sanierung / Altbau, Baubegleitung, Erweiterung" value={formData.projectType} onChange={e => setFormData(p => ({ ...p, projectType: e.target.value }))} /></div>
                      <div>
                        <label className="field-label">Unterlagen / Grundriss</label>
                        <label className="upload-box glass-input">
                          <Upload size={16} />
                          <span>{formData.file ? formData.file.name : "Datei auswählen"}</span>
                          <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFormData(p => ({ ...p, file: e.target.files[0] || null }))} />
                        </label>
                      </div>
                      <div><label className="field-label">Beschreibung</label><textarea className="input textarea glass-input" placeholder="Kurze Beschreibung des Projekts" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} /></div>
                      {formState === "error" && (
                        <div className="soft-box liquid-card subtle" style={{ color: "#f09575" }}>
                          Fehler beim Senden. Bitte versuche es erneut oder schreib direkt per WhatsApp.
                        </div>
                      )}
                      <Button type="submit" className="full" disabled={formState === "sending"}>
                        {formState === "sending" ? "Wird gesendet…" : "Anfrage absenden"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === "impressum" && (
        <main className="section">
          <div className="container legal-container">
            <SectionTitle eyebrow="Rechtliches" title="Impressum" text="" />
            <div className="card liquid-card subtle">
              <div className="card-pad legal-content">
                <p><strong>Angaben gemäß § 5 TMG</strong></p>
                <p>LAHA Baudienstleistungen<br />Vorname Nachname<br />Musterstraße 1<br />33100 Paderborn</p>
                <p><strong>Kontakt</strong><br />Telefon: {cfg.company.phoneDisplay}<br />E-Mail: {cfg.company.email}</p>
                <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</strong><br />Vorname Nachname, Anschrift wie oben</p>
                <p className="legal-hint">⚠️ Bitte ersetze „Vorname Nachname" und „Musterstraße 1" mit deinen echten Daten.</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === "datenschutz" && (
        <main className="section">
          <div className="container legal-container">
            <SectionTitle eyebrow="Rechtliches" title="Datenschutzerklärung" text="" />
            <div className="card liquid-card subtle">
              <div className="card-pad legal-content">
                <p><strong>1. Verantwortlicher</strong><br />LAHA Baudienstleistungen, {cfg.company.email}</p>
                <p><strong>2. Erhobene Daten</strong><br />Diese Website erhebt nur Daten, die Sie aktiv im Kontaktformular eingeben (Name, E-Mail, Telefon, Projektbeschreibung). Es werden keine Cookies gesetzt und kein Tracking durchgeführt.</p>
                <p><strong>3. Zweck der Verarbeitung</strong><br />Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.</p>
                <p><strong>4. Speicherdauer</strong><br />Ihre Daten werden gelöscht, sobald sie für die Erreichung des Zwecks nicht mehr erforderlich sind.</p>
                <p><strong>5. Ihre Rechte</strong><br />Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Kontakt: {cfg.company.email}</p>
                <p><strong>6. Formularversand</strong><br />Nachrichten werden über Formspree (formspree.io) übermittelt. Deren Datenschutzerklärung: <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noreferrer">formspree.io/legal/privacy-policy</a></p>
              </div>
            </div>
          </div>
        </main>
      )}

      {showSticky && (
        <button className="sticky-contact sticky-contact-compact" onClick={() => openTab("anfrage")}>Anfrage stellen</button>
      )}

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Logo />
            <p className="footer-tagline">Elektroarbeiten & Baubegleitung im Raum Paderborn.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Leistungen</div>
              <button onClick={() => openTab("start")}>Elektroinstallation</button>
              <button onClick={() => openTab("rechner")}>Kostenrechner</button>
              <button onClick={() => openTab("begleitung")}>Baubegleitung</button>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Kontakt</div>
              <a href={cfg.company.phoneLink}>{cfg.company.phoneDisplay}</a>
              <a href={`mailto:${cfg.company.email}`}>{cfg.company.email}</a>
              <a href={cfg.company.whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Rechtliches</div>
              <button onClick={() => openTab("impressum")}>Impressum</button>
              <button onClick={() => openTab("datenschutz")}>Datenschutz</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">© {new Date().getFullYear()} LAHA Baudienstleistungen · Paderborn</div>
        </div>
      </footer>
    </div>
  );
}
