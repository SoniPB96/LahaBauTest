import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  CheckCircle2, MessageCircle, Phone, Mail, Menu, X, Zap, Wrench, Network, Sun, Calculator,
  ClipboardList, Handshake, Gem, Hammer, Upload, Star, MapPin, ShieldCheck
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

const VALID_TABS = new Set(["start", "rechner", "begleitung", "anfrage", "impressum", "datenschutz"]);
const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || "";

function getInitialTab() {
  const hash = window.location.hash.replace("#", "").trim();
  return VALID_TABS.has(hash) ? hash : "start";
}

function Button({ children, href, outline = false, onClick, type = "button", className = "", target, disabled = false, ariaLabel }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) {
    return <a aria-label={ariaLabel} className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  }
  return <button aria-label={ariaLabel} className={cls} onClick={onClick} type={type} disabled={disabled}>{children}</button>;
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
        <div className="brand-name">{siteConfig.company.name}</div>
        <div className="brand-sub">{siteConfig.company.subtitle}</div>
      </div>
    </div>
  );
}

function createMailto(formData) {
  const subject = `Projektanfrage von ${formData.name || "Website"}`;
  const lines = [
    `Name: ${formData.name || "-"}`,
    `E-Mail: ${formData.email || "-"}`,
    `Telefon: ${formData.phone || "-"}`,
    `PLZ / Ort: ${formData.zip || "-"}`,
    `Projektart / Thema: ${formData.projectType || "-"}`,
    "",
    "Beschreibung:",
    formData.description || "-",
    "",
    formData.file ? `Hinweis zu Unterlagen: Datei \"${formData.file.name}\" bitte separat mitsenden.` : "Keine Datei ausgewählt.",
  ];
  return `mailto:${siteConfig.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState(getInitialTab);
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
  const [formMessage, setFormMessage] = useState("");

  const heroExampleResult = useMemo(() => estimatePrice(calculatorConfig.defaults), []);
  const localBusinessJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: cfg.company.legalName,
    url: cfg.seo.siteUrl,
    areaServed: cfg.company.serviceAreas,
    email: cfg.company.email,
    telephone: cfg.company.phoneLink.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: cfg.company.street,
      addressLocality: "Paderborn",
      postalCode: cfg.company.cityLine.split(" ")[0],
      addressCountry: "DE",
    },
  }), [cfg]);

  useEffect(() => {
    document.title = cfg.seo.pageTitle;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", cfg.seo.pageDescription);

    const updateOrCreateMeta = (selector, attr, value) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, selector.includes("property=") ? selector.match(/property="([^"]+)"/)?.[1] || "" : selector.match(/name="([^"]+)"/)?.[1] || "");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", value);
    };

    updateOrCreateMeta('meta[property="og:title"]', "property", cfg.seo.ogTitle);
    updateOrCreateMeta('meta[property="og:description"]', "property", cfg.seo.ogDescription);
    updateOrCreateMeta('meta[name="twitter:card"]', "name", "summary_large_image");

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", cfg.seo.siteUrl);
  }, [cfg]);

  useEffect(() => {
    const onHashChange = () => setActiveTab(getInitialTab());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeTab}`);
  }, [activeTab]);

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
    const shouldShow = !topInView && !menuOpen && activeTab === "begleitung";
    setShowSticky(shouldShow);
  }, [topInView, menuOpen, activeTab]);

  const openTab = (key) => {
    setActiveTab(key);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (!formEndpoint) {
      window.location.href = createMailto(formData);
      setFormState("success");
      setFormMessage("Dein E-Mail-Programm wurde mit einer vorbereiteten Anfrage geöffnet.");
      return;
    }

    setFormState("sending");
    setFormMessage("");
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (v) body.append(k, v); });
      body.append("_subject", `Neue Anfrage von ${formData.name}`);
      const res = await fetch(formEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("submit_failed");
      setFormState("success");
      setFormMessage(`Anfrage gesendet – Rückmeldung ${cfg.company.responseTime}.`);
    } catch {
      setFormState("error");
      setFormMessage("Fehler beim Senden. Bitte versuche es erneut oder nutze WhatsApp bzw. E-Mail.");
    }
  };

  return (
    <div className="page">
      <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      <div className="bg-orb orb-1" /><div className="bg-orb orb-2" /><div className="bg-orb orb-3" />

      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => openTab("start")} aria-label="Startseite">
            <Logo />
          </button>

          <nav className="nav desktop-nav" aria-label="Hauptnavigation">
            {cfg.navigation.items.map((item) => (
              <button
                key={item.key}
                className={activeTab === item.key ? "nav-active" : ""}
                onClick={() => openTab(item.key)}
                aria-current={activeTab === item.key ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="desktop-cta">
            <Button onClick={() => openTab("anfrage")} className={activeTab === "anfrage" ? "btn-active" : ""}>{cfg.navigation.ctaLabel}</Button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü" aria-expanded={menuOpen}>
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
                  aria-current={activeTab === item.key ? "page" : undefined}
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
          <section className="hero hero-compact" ref={heroRef}>
            <div className="container hero-grid hero-grid-compact">
              <div className="hero-copy clean-hero-copy">
                <div className="hero-copy-panel hero-copy-panel-compact">
                  <div className="badge-row">
                    <span className="badge">{cfg.hero.badgePrimary}</span>
                  </div>
                  <h1>{cfg.hero.headline}</h1>
                  <p className="hero-lead hero-lead-compact">{cfg.hero.subheadline}</p>
                  <p className="hero-support-text hero-support-text-compact">{cfg.hero.text}</p>

                  <div className="hero-trust-inline glass-inset" aria-label="Vorteile auf einen Blick">
                    <strong>{cfg.hero.quickFacts[0]}</strong>
                    <span aria-hidden="true">•</span>
                    <strong>{cfg.hero.quickFacts[2]}</strong>
                  </div>

                  <div className="button-row hero-cta-row hero-cta-row-compact">
                    <Button onClick={() => openTab("rechner")}>Ersteinschätzung starten</Button>
                  </div>
                </div>
              </div>

              <div className="hero-side hero-side-compact">
                <div className="card liquid-card subtle hero-main-card hero-main-card-compact">
                  <div className="hero-accent-line" aria-hidden="true" />
                  <div className="card-pad hero-card-pad-finish">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title hero-card-title-finish">Schnelle Orientierung vor der Anfrage</h3>
                    <p className="body-text hero-card-text hero-card-text-finish">Realistische Einordnung statt Bauchgefühl – sinnvoll, bevor Details abgestimmt werden.</p>
                    <div className="hero-mini-boxes hero-mini-boxes-compact hero-mini-boxes-finish">
                      <div className="soft-box liquid-card subtle">Richtpreis statt Bauchgefühl</div>
                      <div className="soft-box liquid-card subtle">Für Bestand, Sanierung und Erweiterung</div>
                    </div>
                    <Button className="full" onClick={() => openTab("rechner")}>Zum Rechner</Button>
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

          <section className="section">
            <div className="container">
              <SectionTitle eyebrow={cfg.process.eyebrow} title={cfg.process.title} text={cfg.process.text} />
              <div className="process-grid">
                {cfg.process.items.map((item) => (
                  <div key={item.step} className="card liquid-card subtle process-card">
                    <div className="card-pad">
                      <div className="process-step">{item.step}</div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="body-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section area-section">
            <div className="container">
              <div className="card liquid-card subtle area-card">
                <div className="card-pad area-card-pad">
                  <div>
                    <div className="eyebrow">Region</div>
                    <h3 className="card-title">Im Raum {cfg.company.region}</h3>
                    <p className="body-text">Lokaler Bezug ist im Handwerk kein Nebenthema. Sichtbar gemeint sind Projekte in und um Paderborn mit nachvollziehbarer Abstimmung und kurzen Wegen.</p>
                  </div>
                  <div className="service-areas" aria-label="Einsatzgebiet">
                    {cfg.company.serviceAreas.map((area) => (
                      <div key={area} className="badge"><MapPin size={14} /> {area}</div>
                    ))}
                  </div>
                </div>
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

          <section className="section faq-section">
            <div className="container">
              <SectionTitle eyebrow={cfg.faq.eyebrow} title={cfg.faq.title} text={cfg.faq.text} />
              <div className="faq-list">
                {cfg.faq.items.map((item) => (
                  <details key={item.question} className="card liquid-card subtle faq-item">
                    <summary>{item.question}</summary>
                    <p className="body-text faq-answer">{item.answer}</p>
                  </details>
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
                  <Button onClick={() => openTab("anfrage")}>Projekt besprechen</Button>
                  <Button outline onClick={() => openTab("rechner")}>Richtpreis einschätzen</Button>
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
            <div className={`request-layout ${requestMode === "form" ? "" : "request-layout-single"}`.trim()}>
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
                      <p className="body-text">Schnellste Abstimmung für erste Fragen, Fotos und kurze Einordnung direkt per WhatsApp.</p>
                      <Button href={cfg.company.whatsappLink} target="_blank"><MessageCircle size={16} /> WhatsApp schreiben</Button>
                    </div>
                  )}
                  {requestMode === "phone" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Direkter Kontakt, wenn das Thema kurz telefonisch geklärt werden soll.</p>
                      <Button href={cfg.company.phoneLink}><Phone size={16} /> Jetzt anrufen</Button>
                    </div>
                  )}
                  {requestMode === "email" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Gut, wenn du Unterlagen gesammelt per E-Mail schicken möchtest.</p>
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

              {requestMode === "form" && (
                <div className="card liquid-card subtle form-card form-card-show">
                  <div className="card-pad">
                    <div className="request-form-head">
                      <div className="eyebrow">Formular</div>
                      <h3 className="card-title">Detaillierte Projektanfrage</h3>
                      <p className="body-text">Für strukturierte Anfragen mit Unterlagen, Fotos oder Grundrissen. Je besser die Ausgangslage beschrieben ist, desto sinnvoller fällt die erste Rückmeldung aus.</p>
                      <div className="request-form-note">{cfg.requestPage.formNote}</div>
                    </div>

                    {formState === "success" ? (
                      <div className="soft-box liquid-card subtle success-box">
                        <CheckCircle2 size={32} className="success-icon" />
                        <p className="success-title">Anfrage vorbereitet</p>
                        <p className="body-text">{formMessage}</p>
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
                            <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFormData(p => ({ ...p, file: e.target.files?.[0] || null }))} />
                          </label>
                        </div>
                        <div><label className="field-label">Beschreibung</label><textarea className="input textarea glass-input" placeholder="Kurze Beschreibung des Projekts" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} /></div>
                        {formState === "error" && (
                          <div className="soft-box liquid-card subtle error-box">{formMessage}</div>
                        )}
                        <Button type="submit" className="full" disabled={formState === "sending"}>
                          {formState === "sending" ? "Wird gesendet…" : formEndpoint ? "Projektanfrage absenden" : "Anfrage per E-Mail vorbereiten"}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {activeTab === "impressum" && (
        <main className="section">
          <div className="container legal-container">
            <SectionTitle eyebrow="Rechtliches" title="Impressum" text="Die Platzhalter in diesem Bereich müssen vor dem finalen Livegang mit den echten Firmendaten ersetzt werden." />
            <div className="card liquid-card subtle">
              <div className="card-pad legal-content">
                <p><strong>Angaben gemäß § 5 TMG</strong></p>
                <p>{cfg.company.legalName}<br />{cfg.company.ownerName}<br />{cfg.company.street}<br />{cfg.company.cityLine}</p>
                <p><strong>Kontakt</strong><br />Telefon: {cfg.company.phoneDisplay}<br />E-Mail: {cfg.company.email}</p>
                <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</strong><br />{cfg.company.ownerName}, Anschrift wie oben</p>
                <p className="legal-hint">Vor Livegang Eigentümername, Straße und ggf. weitere Pflichtangaben durch reale Daten ersetzen.</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === "datenschutz" && (
        <main className="section">
          <div className="container legal-container">
            <SectionTitle eyebrow="Rechtliches" title="Datenschutzerklärung" text="Datenschutztext auf den real eingesetzten Formularweg abstimmen." />
            <div className="card liquid-card subtle">
              <div className="card-pad legal-content">
                <p><strong>1. Verantwortlicher</strong><br />{cfg.company.legalName}, {cfg.company.email}</p>
                <p><strong>2. Erhobene Daten</strong><br />Diese Website erhebt nur Daten, die aktiv im Kontaktformular eingegeben werden. Es werden keine Cookies gesetzt und kein Tracking durchgeführt.</p>
                <p><strong>3. Zweck der Verarbeitung</strong><br />Die Daten werden ausschließlich zur Bearbeitung von Anfragen verwendet und nicht ohne Rechtsgrundlage an Dritte weitergegeben.</p>
                <p><strong>4. Speicherdauer</strong><br />Anfragedaten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
                <p><strong>5. Ihre Rechte</strong><br />Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Kontakt: {cfg.company.email}</p>
                <p><strong>6. Formularversand</strong><br />{formEndpoint ? "Formularnachrichten werden über den konfigurierten Versand-Endpunkt übermittelt. Vor Livegang bitte Datenschutzhinweise und Auftragsverarbeitung an den realen Dienst anpassen." : "Wenn kein externer Endpunkt hinterlegt ist, öffnet das Formular lediglich eine vorbereitete E-Mail im Mailprogramm des Nutzers."}</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {showSticky && (
        <button className="sticky-contact sticky-contact-compact" onClick={() => openTab("anfrage")}>Projekt anfragen</button>
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
          <div className="container">© {new Date().getFullYear()} {cfg.company.legalName} · Paderborn</div>
        </div>
      </footer>
    </div>
  );
}
