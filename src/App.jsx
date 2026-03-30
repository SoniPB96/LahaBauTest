import React, { useMemo, useState } from "react";
import {
  CheckCircle2, Home, Building2, MessageCircle, Phone, Mail, MapPin, ChevronRight,
  Calculator, Upload, Zap, Wrench, Network, Sun, ArrowRight, ClipboardList,
  Handshake, Gem, Hammer, Menu, X, FileText, SendHorizonal
} from "lucide-react";
import { siteConfig } from "./config/siteConfig";

const iconMap = {
  home: Home,
  building: Building2,
  zap: Zap,
  wrench: Wrench,
  network: Network,
  sun: Sun,
  calculator: Calculator,
  check: CheckCircle2,
};

function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function estimatePrice(data, cfg) {
  const priceConfig = cfg.estimator.priceConfig;
  const base = priceConfig.projectBase[data.projectType] || 0;
  const sqmPart = (priceConfig.sqm[data.projectType] || 0) * (Number(data.sqm) || 0);
  const componentSum =
    (Number(data.rooms) || 0) * priceConfig.components.rooms +
    (Number(data.steckdosen) || 0) * priceConfig.components.steckdosen +
    (Number(data.schalter) || 0) * priceConfig.components.schalter +
    (Number(data.netzwerkdosen) || 0) * priceConfig.components.netzwerkdosen +
    (Number(data.lampenauslaesse) || 0) * priceConfig.components.lampenauslaesse +
    (Number(data.rollladenschalter) || 0) * priceConfig.components.rollladenschalter;

  const optionSum = Object.entries(data.options || {}).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (priceConfig.options[key] || 0);
  }, 0);

  const total =
    (base + sqmPart + componentSum + optionSum) *
    (priceConfig.brandFactor[data.brand] || 1) *
    (priceConfig.objectFactor[data.objectType] || 1);

  return {
    low: Math.round(total * (1 - priceConfig.range)),
    high: Math.round(total * (1 + priceConfig.range)),
    labor: Math.round(total * priceConfig.laborShare),
    material: Math.round(total * priceConfig.materialShare),
    extras: Math.round(total * priceConfig.extraShare),
  };
}

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

function ChoiceIcon({ iconName, size = 16 }) {
  const Icon = iconMap[iconName] || CheckCircle2;
  return <Icon size={size} />;
}

function SummaryLabel({ value, choices }) {
  const found = choices?.find((item) => item.value === value);
  return found?.label || value || "—";
}

function Logo() {
  return (
    <div className="logo-lockup">
      <div className="logo-mark" aria-hidden="true">
        <span className="logo-bar b1" />
        <span className="logo-bar b2" />
        <span className="logo-bar b3" />
        <span className="logo-bar b4" />
        <span className="logo-cut c1" />
        <span className="logo-cut c2" />
        <span className="logo-cut c3" />
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
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(cfg.estimator.defaults);
  const [menuOpen, setMenuOpen] = useState(false);

  const result = useMemo(() => estimatePrice(form, cfg), [form]);
  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateOption = (key, value) => setForm((prev) => ({ ...prev, options: { ...prev.options, [key]: value } }));

  const selectedOptions = Object.entries(form.options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => cfg.estimator.optionChoices.find((item) => item.key === key)?.label || key);

  const skipsCalculator = form.projectType === "erweiterung" || form.projectType === "zaehlerschrank";
  const heroExampleResult = estimatePrice(cfg.estimator.defaults, cfg);

  const nextStep = () => {
    if (step === 2 && skipsCalculator) {
      setStep(7);
      return;
    }
    if (step < cfg.estimator.wizardLabels.length) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step === 7 && skipsCalculator) {
      setStep(2);
      return;
    }
    if (step > 1) setStep((s) => s - 1);
  };

  const openTab = (key) => {
    setActiveTab(key);
    setMenuOpen(false);
  };

  return (
    <div className="page">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

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

      {activeTab === "start" && (
        <main>
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy clean-hero-copy">
                <div className="badge-row">
                  <span className="badge">{cfg.hero.badgePrimary}</span>
                  <span className="badge muted">{cfg.hero.badgeSecondary}</span>
                </div>

                <h1>{cfg.hero.headline}</h1>
                <p>{cfg.hero.text}</p>
                <p className="hero-trust">{cfg.hero.trustLine}</p>

                <div className="button-row hero-cta-row">
                  <Button onClick={() => openTab("anfrage")}>Anfrage stellen</Button>
                </div>
              </div>

              <div className="hero-side">
                <div className="card liquid-card glow">
                  <div className="card-pad">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title">Elektro-Kostenschätzer</h3>
                    <div className="result-box glass-inset">
                      <div className="result-top">
                        <span>Beispiel: Wohnung, {cfg.estimator.defaults.sqm} m²</span>
                        <span>Sanierung / Altbau</span>
                      </div>
                      <div className="hero-price">{formatEUR(heroExampleResult.low)} – {formatEUR(heroExampleResult.high)}</div>
                      <p>{cfg.hero.estimatorCardInfo}</p>
                    </div>
                    <div className="hero-mini-boxes">
                      <div className="soft-box liquid-card subtle">Mehrstufige Eingabe</div>
                      <div className="soft-box liquid-card subtle">Richtpreis statt Festpreis</div>
                    </div>
                    <Button className="full" onClick={() => openTab("rechner")}>
                      Rechner öffnen <ChevronRight size={16} />
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
                  const Icon = iconMap[service.icon] || CheckCircle2;
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
        </main>
      )}

      {activeTab === "begleitung" && (
        <main className="section">
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
            <SectionTitle eyebrow={cfg.estimator.titleEyebrow} title={cfg.estimator.title} text={cfg.estimator.text} />

            <div className="estimator-layout">
              <div className="card estimator-card liquid-card glow">
                <div className="card-pad">
                  <div className="wizard-top">
                    <div className="wizard-meta">
                      <span>Schritt {step} von {cfg.estimator.wizardLabels.length}</span>
                      <span>{Math.round((step / cfg.estimator.wizardLabels.length) * 100)}%</span>
                    </div>
                    <div className="progress glass-inset">
                      <div className="progress-bar" style={{ width: `${(step / cfg.estimator.wizardLabels.length) * 100}%` }} />
                    </div>
                    <div className="chip-row">
                      {cfg.estimator.wizardLabels.map((label, index) => {
                        const n = index + 1;
                        return <div key={label} className={`step-chip ${n === step ? "active" : ""} ${n < step ? "done" : ""}`}>{label}</div>;
                      })}
                    </div>
                  </div>

                  {step === 1 && (
                    <div className="form-grid two">
                      <div>
                        <label className="field-label">Objektart</label>
                        <div className="choice-grid">
                          {cfg.estimator.objectChoices.map((item) => (
                            <button key={item.value} className={`choice ${form.objectType === item.value ? "active" : ""}`} onClick={() => updateField("objectType", item.value)}>
                              <div><ChoiceIcon iconName={item.icon} size={16} /></div>
                              <div>{item.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Wohnfläche / Nutzfläche in m²</label>
                        <input className="input glass-input" value={form.sqm} onChange={(e) => updateField("sqm", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label className="field-label">Projektart</label>
                      <div className="choice-grid wide project-grid">
                        {cfg.estimator.projectChoices.map((item) => (
                          <button key={item.value} className={`choice ${form.projectType === item.value ? "active" : ""}`} onClick={() => updateField("projectType", item.value)}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                      {(form.projectType === "erweiterung" || form.projectType === "zaehlerschrank") && (
                        <div className="soft-box liquid-card subtle flow-note">
                          Für diese Projektart wird keine automatische Kostenschätzung ausgegeben. Nach „Weiter“ gelangst du direkt zur Anfrage.
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && !skipsCalculator && (
                    <div>
                      <div className="room-info-block liquid-card subtle">
                        <div className="room-info-title">{cfg.estimator.roomInfoTitle}</div>
                        <div className="room-info-text">{cfg.estimator.roomInfoText}</div>
                      </div>
                      <div className="room-first-block">
                        <div>
                          <label className="field-label small">{cfg.estimator.componentFields[0].label}</label>
                          <input className="input glass-input room-input" value={form.rooms} onChange={(e) => updateField("rooms", e.target.value)} />
                        </div>
                      </div>
                      <div className="form-grid three room-grid">
                        {cfg.estimator.componentFields.slice(1).map((field) => (
                          <div key={field.key}>
                            <label className="field-label small">{field.label}</label>
                            <input className="input glass-input" value={form[field.key]} onChange={(e) => updateField(field.key, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && !skipsCalculator && (
                    <div>
                      <label className="field-label">Zusatzoptionen</label>
                      <div className="choice-grid wide">
                        {cfg.estimator.optionChoices.map((item) => (
                          <button key={item.key} className={`choice ${form.options[item.key] ? "active" : ""}`} onClick={() => updateOption(item.key, !form.options[item.key])}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 5 && !skipsCalculator && (
                    <div>
                      <div className="room-info-block liquid-card subtle material-info">
                        <div className="room-info-title">{cfg.estimator.materialTitle}</div>
                        <div className="room-info-text">{cfg.estimator.materialInfo}</div>
                      </div>
                      <div className="choice-grid wide material-grid">
                        {cfg.estimator.brandChoices.map((item) => (
                          <button key={item.value} className={`choice ${form.brand === item.value ? "active" : ""}`} onClick={() => updateField("brand", item.value)}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 6 && !skipsCalculator && (
                    <div className="form-grid two">
                      <div className="result-box big glass-inset">
                        <div className="eyebrow">Ergebnis</div>
                        <div className="hero-price">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                        <p className="body-text">{cfg.estimator.disclaimer}</p>
                        <div className="mini-grid result-grid">
                          <div className="soft-box liquid-card subtle"><div className="meta-label">Material</div><div className="meta-value">{formatEUR(result.material)}</div></div>
                          <div className="soft-box liquid-card subtle"><div className="meta-label">Arbeitszeit</div><div className="meta-value">{formatEUR(result.labor)}</div></div>
                          <div className="soft-box liquid-card subtle"><div className="meta-label">Zusatzoptionen</div><div className="meta-value">{formatEUR(result.extras)}</div></div>
                        </div>
                      </div>
                      <div className="soft-box liquid-card strong">
                        <div className="field-label">{cfg.estimator.resultFactorsTitle}</div>
                        <ul className="bullet-list">
                          {cfg.estimator.resultFactors.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="form-grid two">
                      <div className="stack">
                        <div><label className="field-label">Name</label><input className="input glass-input" value={form.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                        <div><label className="field-label">Telefon</label><input className="input glass-input" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                        <div><label className="field-label">E-Mail</label><input className="input glass-input" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                        <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} /></div>
                        <div>
                          <label className="field-label">Grundriss / Umrissplan</label>
                          <label className="upload-box glass-input">
                            <Upload size={16} />
                            <span>{form.fileName || "Datei auswählen"}</span>
                            <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => updateField("fileName", e.target.files?.[0]?.name || "")} />
                          </label>
                        </div>
                        <div><label className="field-label">Zusätzliche Angaben</label><textarea className="input textarea glass-input" value={form.message} onChange={(e) => updateField("message", e.target.value)} /></div>
                        <div className="soft-box liquid-card subtle">{cfg.estimator.requestNote}</div>
                      </div>

                      <div className="soft-box liquid-card strong">
                        <div className="field-label">Zusammenfassung</div>
                        <div className="summary-list">
                          <div>Objekt: <span>{SummaryLabel({ value: form.objectType, choices: cfg.estimator.objectChoices })}</span></div>
                          <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                          <div>Projekt: <span>{SummaryLabel({ value: form.projectType, choices: cfg.estimator.projectChoices })}</span></div>
                          {!skipsCalculator && (
                            <>
                              <div>Raumanzahl: <span>{form.rooms || "—"}</span></div>
                              <div>Programm: <span>{SummaryLabel({ value: form.brand, choices: cfg.estimator.brandChoices })}</span></div>
                              <div>Optionen: <span>{selectedOptions.length ? selectedOptions.join(", ") : "keine"}</span></div>
                              <div>Richtpreis: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                            </>
                          )}
                          {skipsCalculator && <div className="summary-direct-note">Für diese Projektart wird direkt eine individuelle Anfrage vorbereitet.</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="wizard-actions">
                    <Button outline onClick={prevStep}>Zurück</Button>
                    {step < cfg.estimator.wizardLabels.length ? (
                      <Button onClick={nextStep}>Weiter <ArrowRight size={15} /></Button>
                    ) : (
                      <Button onClick={() => openTab("anfrage")}>Zur Anfrageseite</Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="card sidebar-card liquid-card subtle">
                <div className="card-pad">
                  <div className="eyebrow">{cfg.estimator.sidebarTitle}</div>
                  <div className="summary-list compact">
                    <div>Objekt: <span>{SummaryLabel({ value: form.objectType, choices: cfg.estimator.objectChoices })}</span></div>
                    <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                    <div>Projekt: <span>{SummaryLabel({ value: form.projectType, choices: cfg.estimator.projectChoices })}</span></div>
                    {!skipsCalculator ? (
                      <>
                        <div>Programm: <span>{SummaryLabel({ value: form.brand, choices: cfg.estimator.brandChoices })}</span></div>
                        <div>Spanne: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                      </>
                    ) : (
                      <div>Hinweis: <span>Direktanfrage</span></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
                  <h3 className="card-title">Direkte Wege für die erste Abstimmung</h3>
                  <p className="body-text">{cfg.requestPage.quickText}</p>
                  <div className="request-actions">
                    <Button href={cfg.company.whatsappLink} target="_blank"><MessageCircle size={16} /> WhatsApp schreiben</Button>
                    <Button outline href={`mailto:${cfg.company.email}`}><Mail size={16} /> E-Mail senden</Button>
                    <Button outline href={cfg.company.phoneLink}><Phone size={16} /> Jetzt anrufen</Button>
                  </div>

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

              <div className="card liquid-card subtle">
                <div className="card-pad stack">
                  <div>
                    <label className="field-label">Name</label>
                    <input className="input glass-input" placeholder="Name" />
                  </div>
                  <div className="form-grid two">
                    <div>
                      <label className="field-label">E-Mail</label>
                      <input className="input glass-input" placeholder="E-Mail" />
                    </div>
                    <div>
                      <label className="field-label">Telefon</label>
                      <input className="input glass-input" placeholder="Telefon" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">PLZ / Ort</label>
                    <input className="input glass-input" placeholder="PLZ / Ort" />
                  </div>
                  <div>
                    <label className="field-label">Projektart / Thema</label>
                    <input className="input glass-input" placeholder="z. B. Sanierung / Altbau, Baubegleitung, Erweiterung" />
                  </div>
                  <div>
                    <label className="field-label">Unterlagen / Grundriss</label>
                    <label className="upload-box glass-input">
                      <Upload size={16} />
                      <span>Datei auswählen</span>
                      <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                  </div>
                  <div>
                    <label className="field-label">Beschreibung</label>
                    <textarea className="input textarea glass-input" placeholder="Kurze Beschreibung des Projekts" />
                  </div>
                  <div className="soft-box liquid-card subtle">{cfg.requestPage.formNote}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {(activeTab === "start" || activeTab === "begleitung") && (
        <button className="sticky-contact" onClick={() => openTab("anfrage")}>Anfrage</button>
      )}
    </div>
  );
}
