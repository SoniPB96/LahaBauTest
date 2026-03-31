import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle2, MessageCircle, Phone, Mail, Menu, X, Zap, Wrench, Network, Sun, Calculator,
  ClipboardList, Handshake, Gem, Hammer, Upload, Quote, ArrowRight
} from "lucide-react";
import { siteConfig } from "./config/siteConfig";
import { calculatorConfig } from "./config/calculatorConfig";
import { estimatePrice, formatEUR } from "./components/calculatorLogic";
import CalculatorPanel from "./components/CalculatorPanel";

const serviceIconMap = {
  zap: Zap, wrench: Wrench, network: Network, sun: Sun, calculator: Calculator, check: CheckCircle2,
};

// ─── Shared primitives ───────────────────────────────────────────────────────

function Button({ children, href, outline = false, onClick, type = "button", className = "", target, disabled = false, "aria-label": ariaLabel }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) {
    return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} aria-label={ariaLabel}>{children}</a>;
  }
  return <button className={cls} onClick={onClick} type={type} disabled={disabled} aria-label={ariaLabel}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

// ─── Logo with entrance animation ────────────────────────────────────────────

function Logo() {
  return (
    <div className="logo-lockup" aria-label="LAHA Baudienstleistungen">
      <div className="logo-mark" aria-hidden="true">
        <span className="logo-bar b1" /><span className="logo-bar b2" />
        <span className="logo-bar b3" /><span className="logo-bar b4" />
        <span className="logo-cut c1" /><span className="logo-cut c2" /><span className="logo-cut c3" />
      </div>
      <div className="logo-text">
        <div className="brand-name">LAHA</div>
        <div className="brand-sub">BAUDIENSTLEISTUNGEN</div>
      </div>
    </div>
  );
}

// ─── Legal Modal ─────────────────────────────────────────────────────────────

function LegalModal({ title, content, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-box liquid-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="card-title" style={{ fontSize: "1.2rem" }}>{title}</h3>
          <button onClick={onClose} aria-label="Schließen" className="modal-close"><X size={20} /></button>
        </div>
        <div className="modal-body">
          {content.split("\n\n").map((block, i) => {
            const isHeading = block.length < 60 && !block.includes(".");
            return isHeading
              ? <p key={i} className="legal-heading">{block}</p>
              : <p key={i} className="legal-para">{block}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Contact Form with EmailJS ────────────────────────────────────────────────

function ContactForm({ prefill = {} }) {
  const [fields, setFields] = useState({
    name: prefill.name || "",
    email: prefill.email || "",
    phone: prefill.phone || "",
    zip: prefill.zip || "",
    subject: prefill.subject || "",
    message: prefill.message || "",
  });
  const [fileName, setFileName] = useState(prefill.fileName || "");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (key, val) => setFields((p) => ({ ...p, [key]: val }));

  const handleSubmit = async () => {
    if (!fields.name.trim()) { alert("Bitte gib deinen Namen an."); return; }
    if (!fields.email.trim() && !fields.phone.trim()) { alert("Bitte hinterlege E-Mail oder Telefon."); return; }

    setStatus("sending");

    // Build a mailto fallback – replace with EmailJS when service keys are configured
    const body = [
      `Name: ${fields.name}`,
      `E-Mail: ${fields.email}`,
      `Telefon: ${fields.phone}`,
      `PLZ / Ort: ${fields.zip}`,
      `Betreff: ${fields.subject}`,
      `Nachricht: ${fields.message}`,
      fileName ? `Datei: ${fileName}` : "",
    ].filter(Boolean).join("\n");

    // Try EmailJS if configured, else open mailto
    const serviceId = window.__EMAILJS_SERVICE__;
    const templateId = window.__EMAILJS_TEMPLATE__;
    const publicKey = window.__EMAILJS_KEY__;

    if (serviceId && templateId && publicKey && window.emailjs) {
      try {
        await window.emailjs.send(serviceId, templateId, {
          from_name: fields.name,
          from_email: fields.email,
          phone: fields.phone,
          zip: fields.zip,
          subject: fields.subject,
          message: fields.message,
        }, publicKey);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    } else {
      // Fallback: open mailto
      const mailto = `mailto:kontakt@laha-bau.de?subject=${encodeURIComponent("Anfrage via Website")}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success liquid-card subtle">
        <CheckCircle2 size={32} strokeWidth={1.5} color="#4ba776" />
        <h3 className="card-title" style={{ fontSize: "1.2rem", marginTop: 12 }}>Anfrage gesendet</h3>
        <p className="body-text">Ich melde mich in der Regel innerhalb von 24 Stunden. Bei Dringlichkeit gerne direkt per WhatsApp.</p>
        <Button href={siteConfig.company.whatsappLink} target="_blank" outline style={{ marginTop: 8 }}>
          <MessageCircle size={16} /> WhatsApp schreiben
        </Button>
      </div>
    );
  }

  return (
    <div className="stack">
      <div><label className="field-label">Name *</label><input className="input glass-input" placeholder="Dein Name" value={fields.name} onChange={e => update("name", e.target.value)} /></div>
      <div className="form-grid two">
        <div><label className="field-label">E-Mail</label><input className="input glass-input" placeholder="E-Mail" type="email" value={fields.email} onChange={e => update("email", e.target.value)} /></div>
        <div><label className="field-label">Telefon</label><input className="input glass-input" placeholder="Telefon" type="tel" value={fields.phone} onChange={e => update("phone", e.target.value)} /></div>
      </div>
      <div className="form-grid two">
        <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" placeholder="z. B. 33100 Paderborn" value={fields.zip} onChange={e => update("zip", e.target.value)} /></div>
        <div><label className="field-label">Projektart</label><input className="input glass-input" placeholder="z. B. Sanierung, Erweiterung" value={fields.subject} onChange={e => update("subject", e.target.value)} /></div>
      </div>
      <div>
        <label className="field-label">Grundriss / Unterlagen</label>
        <label className="upload-box glass-input" style={{ cursor: "pointer" }}>
          <Upload size={16} />
          <span>{fileName || "Datei auswählen (PDF, JPG, PNG)"}</span>
          <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFileName(e.target.files?.[0]?.name || "")} />
        </label>
      </div>
      <div><label className="field-label">Nachricht</label><textarea className="input textarea glass-input" placeholder="Kurze Beschreibung des Projekts" value={fields.message} onChange={e => update("message", e.target.value)} /></div>
      {status === "error" && <div className="soft-box liquid-card subtle" style={{ color: "#f87171" }}>Senden fehlgeschlagen. Bitte nutze WhatsApp oder E-Mail direkt.</div>}
      <Button onClick={handleSubmit} disabled={status === "sending"} className="full">
        {status === "sending" ? "Wird gesendet…" : "Anfrage senden"}
      </Button>
      <p className="body-text" style={{ fontSize: ".8rem", marginTop: 0, textAlign: "center" }}>
        Pflichtfeld: Name + mindestens E-Mail oder Telefon. Keine Weitergabe an Dritte.
      </p>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const cfg = siteConfig.testimonials;
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionTitle eyebrow={cfg.eyebrow} title={cfg.title} />
        <div className="testimonials-grid">
          {cfg.items.map((item, i) => (
            <div key={i} className="card liquid-card subtle testimonial-card">
              <div className="card-pad">
                <Quote size={20} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.25)", marginBottom: 14 }} aria-hidden="true" />
                <p className="testimonial-quote">„{item.quote}"</p>
                <div className="testimonial-author">
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-location">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onLegal }) {
  const cfg = siteConfig.company;
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
        </div>
        <div className="footer-links">
          <a href={cfg.phoneLink} className="footer-link">{cfg.phoneDisplay}</a>
          <a href={`mailto:${cfg.email}`} className="footer-link">{cfg.email}</a>
          <button className="footer-link" onClick={() => onLegal("impressum")}>Impressum</button>
          <button className="footer-link" onClick={() => onLegal("datenschutz")}>Datenschutz</button>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} LAHA Baudienstleistungen · {cfg.region}</p>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestMode, setRequestMode] = useState("whatsapp");
  const [showSticky, setShowSticky] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // null | "impressum" | "datenschutz"
  const [calculatorPrefill, setCalculatorPrefill] = useState({});
  const heroRef = useRef(null);

  const heroExampleResult = useMemo(() => estimatePrice(calculatorConfig.defaults), []);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting && !menuOpen && (activeTab === "start" || activeTab === "begleitung");
        setShowSticky(shouldShow);
      },
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [menuOpen, activeTab]);

  useEffect(() => { if (menuOpen) setShowSticky(false); }, [menuOpen]);

  // Scroll to top on tab change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeTab]);

  const openTab = useCallback((key) => {
    setActiveTab(key);
    setMenuOpen(false);
  }, []);

  const openRequest = useCallback((prefill = {}) => {
    setCalculatorPrefill(prefill);
    openTab("anfrage");
  }, [openTab]);

  return (
    <div className="page">
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />
      <div className="bg-orb orb-3" aria-hidden="true" />

      {/* ── Header ── */}
      <header className="header" role="banner">
        <div className="container header-inner">
          <button className="brand" onClick={() => openTab("start")} aria-label="Startseite">
            <Logo />
          </button>

          <nav className="nav desktop-nav" aria-label="Hauptnavigation">
            {cfg.navigation.items.map((item) => (
              <button
                key={item.key}
                onClick={() => openTab(item.key)}
                aria-current={activeTab === item.key ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="desktop-cta">
            <Button onClick={() => openRequest()}>{cfg.navigation.ctaLabel}</Button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu" role="navigation" aria-label="Mobilnavigation">
            <div className="container mobile-menu-inner">
              {cfg.navigation.items.map((item) => (
                <button key={item.key} onClick={() => openTab(item.key)} aria-current={activeTab === item.key ? "page" : undefined}>
                  {item.label}
                </button>
              ))}
              <Button onClick={() => openRequest()}>{cfg.navigation.ctaLabel}</Button>
            </div>
          </div>
        )}
      </header>

      {/* ── Start ── */}
      {activeTab === "start" && (
        <main>
          <section className="hero" ref={heroRef} aria-labelledby="hero-headline">
            <div className="container hero-grid">
              <div className="hero-copy clean-hero-copy">
                <div className="badge-row">
                  <span className="badge">{cfg.hero.badgePrimary}</span>
                  <span className="badge muted">{cfg.hero.badgeSecondary}</span>
                </div>
                <h1 id="hero-headline">{cfg.hero.headline}</h1>
                <h2 className="hero-subheadline">{cfg.hero.subheadline}</h2>
                <p>{cfg.hero.text}</p>
                <p className="hero-trust">{cfg.hero.trustLine}</p>
                <div className="button-row hero-cta-row">
                  <Button onClick={() => openRequest()}>Anfrage stellen</Button>
                  <Button outline onClick={() => openTab("rechner")}>Kosten einschätzen</Button>
                </div>
              </div>

              <div className="hero-side">
                <div className="card liquid-card glow">
                  <div className="card-pad">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title">Kosteneinschätzung Elektrik</h3>
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
                      <div className="soft-box liquid-card subtle">Preisspanne statt Festpreis</div>
                    </div>
                    <Button className="full" onClick={() => openTab("rechner")}>
                      Rechner öffnen <ArrowRight size={15} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="services-title">
            <div className="container">
              <SectionTitle eyebrow={cfg.services.eyebrow} title={cfg.services.title} text={cfg.services.text} />
              <div className="services-grid" id="services-title">
                {cfg.services.items.map((service) => {
                  const Icon = serviceIconMap[service.icon] || CheckCircle2;
                  return (
                    <div key={service.key} className="card liquid-card subtle">
                      <div className="card-pad">
                        <div className="service-icon" aria-hidden="true"><Icon size={22} /></div>
                        <h3 className="card-title">{service.title}</h3>
                        <p className="body-text">{service.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <Testimonials />
        </main>
      )}

      {/* ── Baubegleitung ── */}
      {activeTab === "begleitung" && (
        <main className="section" aria-labelledby="begleitung-title">
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
                        <div className="feature-icon" aria-hidden="true"><Icon size={18} /></div>
                        <div className="feature-text">{point}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="button-row feature-cta-row">
                  <Button onClick={() => openRequest()}>Anfrage stellen</Button>
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

      {/* ── Rechner ── */}
      {activeTab === "rechner" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={calculatorConfig.titleEyebrow} title={calculatorConfig.title} text={calculatorConfig.text} />
            <CalculatorPanel onOpenRequestPage={(prefill) => openRequest(prefill)} />
          </div>
        </main>
      )}

      {/* ── Anfrage ── */}
      {activeTab === "anfrage" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={cfg.requestPage.eyebrow} title={cfg.requestPage.title} text={cfg.requestPage.text} />
            <div className="request-layout">
              {/* Left: quick contacts */}
              <div className="card liquid-card glow">
                <div className="card-pad">
                  <div className="eyebrow">{cfg.requestPage.quickTitle}</div>
                  <h3 className="card-title">Bevorzugten Kontaktweg wählen</h3>
                  <p className="body-text">{cfg.requestPage.quickText}</p>

                  <div className="request-selector" role="group" aria-label="Kontaktoptionen">
                    <button className={`request-option request-option-primary ${requestMode === "whatsapp" ? "active" : ""}`} onClick={() => setRequestMode("whatsapp")} aria-pressed={requestMode === "whatsapp"}>
                      <MessageCircle size={18} aria-hidden="true" />
                      <div className="request-option-text"><span>WhatsApp</span><small>Empfohlen</small></div>
                    </button>
                    <button className={`request-option ${requestMode === "phone" ? "active" : ""}`} onClick={() => setRequestMode("phone")} aria-pressed={requestMode === "phone"}>
                      <Phone size={18} aria-hidden="true" />
                      <div className="request-option-text"><span>Anrufen</span></div>
                    </button>
                    <button className={`request-option ${requestMode === "email" ? "active" : ""}`} onClick={() => setRequestMode("email")} aria-pressed={requestMode === "email"}>
                      <Mail size={18} aria-hidden="true" />
                      <div className="request-option-text"><span>E-Mail</span></div>
                    </button>
                    <button className={`request-option ${requestMode === "form" ? "active" : ""}`} onClick={() => setRequestMode("form")} aria-pressed={requestMode === "form"}>
                      <Calculator size={18} aria-hidden="true" />
                      <div className="request-option-text"><span>Formular</span></div>
                    </button>
                  </div>

                  {requestMode === "whatsapp" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Schnellste Abstimmung direkt per WhatsApp.</p>
                      <Button href={cfg.company.whatsappLink} target="_blank"><MessageCircle size={16} aria-hidden="true" /> WhatsApp schreiben</Button>
                    </div>
                  )}
                  {requestMode === "phone" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Direkter Anruf für schnelle Klärung.</p>
                      <Button href={cfg.company.phoneLink}><Phone size={16} aria-hidden="true" /> {cfg.company.phoneDisplay}</Button>
                    </div>
                  )}
                  {requestMode === "email" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Für strukturierte Anfragen per E-Mail.</p>
                      <Button href={`mailto:${cfg.company.email}`}><Mail size={16} aria-hidden="true" /> {cfg.company.email}</Button>
                    </div>
                  )}

                  <div className="request-steps liquid-card subtle">
                    <div className="eyebrow">{cfg.requestPage.listTitle}</div>
                    <div className="feature-list compact-list">
                      {cfg.requestPage.listItems.map((item) => (
                        <div key={item} className="feature-row">
                          <div className="feature-icon small-icon" aria-hidden="true"><CheckCircle2 size={16} /></div>
                          <div className="feature-text">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className={`card liquid-card subtle form-card ${requestMode === "form" ? "form-card-show" : "form-card-muted"}`}>
                <div className="card-pad">
                  <div className="request-form-head">
                    <div className="eyebrow">Formular</div>
                    <h3 className="card-title">Detaillierte Projektanfrage</h3>
                    <p className="body-text">Für strukturierte Anfragen mit Unterlagen, Fotos oder Grundrissen.</p>
                  </div>
                  <ContactForm prefill={calculatorPrefill} />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ── Footer ── */}
      <Footer onLegal={setLegalModal} />

      {/* ── Sticky CTA ── */}
      {showSticky && (
        <button className="sticky-contact sticky-contact-wide" onClick={() => openRequest()} aria-label="Anfrage stellen">
          Anfrage stellen
        </button>
      )}

      {/* ── Legal Modal ── */}
      {legalModal && (
        <LegalModal
          title={cfg.legal[legalModal].title}
          content={cfg.legal[legalModal].content}
          onClose={() => setLegalModal(null)}
        />
      )}
    </div>
  );
}
