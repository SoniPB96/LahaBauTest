import React, { useMemo, useState } from "react";
import {
  CheckCircle2, Clock3, Home, Building2, UserCheck, ShieldCheck, MessageCircle,
  Phone, Mail, MapPin, ChevronRight, Calculator, Upload, Zap, Wrench, Network, Sun, ArrowRight,
} from "lucide-react";
import { siteConfig } from "./config/siteConfig";

const iconMap = {
  home: Home, building: Building2, zap: Zap, wrench: Wrench,
  network: Network, sun: Sun, calculator: Calculator, check: CheckCircle2,
};

function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(value);
}

function estimatePrice(data, cfg) {
  const pc = cfg.estimator.priceConfig;
  const base = pc.projectBase[data.projectType] || 0;
  const sqmPart = (pc.sqm[data.projectType] || 0) * (Number(data.sqm) || 0);
  const componentSum =
    (Number(data.steckdosen) || 0) * pc.components.steckdosen +
    (Number(data.schalter) || 0) * pc.components.schalter +
    (Number(data.netzwerkdosen) || 0) * pc.components.netzwerkdosen +
    (Number(data.lampenauslaesse) || 0) * pc.components.lampenauslaesse +
    (Number(data.rollladenschalter) || 0) * pc.components.rollladenschalter;
  const optionSum = Object.entries(data.options || {}).reduce((sum, [key, enabled]) =>
    enabled ? sum + (pc.options[key] || 0) : sum, 0);
  const total =
    (base + sqmPart + componentSum + optionSum) *
    (pc.brandFactor[data.brand] || 1) *
    (pc.qualityFactor[data.quality] || 1) *
    (pc.objectFactor[data.objectType] || 1);
  return {
    low:      Math.round(total * (1 - pc.range)),
    high:     Math.round(total * (1 + pc.range)),
    labor:    Math.round(total * pc.laborShare),
    material: Math.round(total * pc.materialShare),
    extras:   Math.round(total * pc.extraShare),
  };
}

function Button({ children, href, outline = false, onClick, type = "button", className = "", target }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  return <button className={cls} onClick={onClick} type={type}>{children}</button>;
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

function ChoiceIcon({ iconName, size = 16 }) {
  const Icon = iconMap[iconName] || CheckCircle2;
  return <Icon size={size} />;
}

function SummaryLabel({ value, choices }) {
  return choices?.find((i) => i.value === value)?.label || value || "—";
}

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState("start");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(cfg.estimator.defaults);

  const result = useMemo(() => estimatePrice(form, cfg), [form]);
  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateOption = (key, value) => setForm((prev) => ({ ...prev, options: { ...prev.options, [key]: value } }));

  const selectedOptions = Object.entries(form.options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => cfg.estimator.optionChoices.find((i) => i.key === key)?.label || key);

  const skipsCalculator = form.projectType === "erweiterung" || form.projectType === "zaehlerschrank";
  const heroExampleResult = estimatePrice(cfg.estimator.defaults, cfg);

  const handleProjectChoice = (value) => {
    updateField("projectType", value);
    if (value === "erweiterung" || value === "zaehlerschrank") setStep(7);
  };

  const nextStep = () => {
    if (step === 2 && skipsCalculator) { setStep(7); return; }
    if (step < cfg.estimator.wizardLabels.length) setStep((s) => s + 1);
  };
  const prevStep = () => {
    if (step === 7 && skipsCalculator) { setStep(2); return; }
    if (step > 1) setStep((s) => s - 1);
  };

  // Nav items without "kontakt"
  const navItems = cfg.navigation.items.filter((i) => i.key !== "kontakt");

  return (
    <div className="page">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      {/* ── HEADER ── */}
      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => setActiveTab("start")} aria-label="Startseite">
            <div className="brand-name">{cfg.company.name}</div>
            <div className="brand-sub">{cfg.company.subtitle}</div>
          </button>

          <nav className="nav">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => setActiveTab(item.key)}>{item.label}</button>
            ))}
          </nav>

          <Button onClick={() => setActiveTab("kontakt")}>{cfg.navigation.ctaLabel}</Button>
        </div>
      </header>

      {/* ══════════════════════════════
          START
      ══════════════════════════════ */}
      {activeTab === "start" && (
        <main>
          {/* HERO */}
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="badge-row">
                  <span className="badge">{cfg.hero.badgePrimary}</span>
                  <span className="badge muted">{cfg.hero.badgeSecondary}</span>
                </div>

                <h1>Saubere Elektroarbeiten.<br />Klare Absprache. Verlässliche Ausführung.</h1>
                <p>
                  Ich unterstütze Privatkunden bei Sanierung, Modernisierung und Erweiterung elektrischer Anlagen –
                  mit sauberer Ausführung, direkter Kommunikation und einer realistischen Ersteinschätzung statt vagen Versprechen.
                </p>
                <p className="hero-trust">
                  Elektroinstallation im Raum Paderborn – geplant und ausgeführt in enger Abstimmung mit Ihnen.
                </p>

                <div className="button-row">
                  <Button onClick={() => setActiveTab("rechner")}>Kostenschätzung starten</Button>
                  <Button outline onClick={() => setActiveTab("kontakt")}>Unverbindlich anfragen</Button>
                </div>
                <div className="cta-row">
                  <Button href={cfg.company.phoneLink}>Jetzt anrufen</Button>
                  <Button outline href={cfg.company.whatsappLink} target="_blank">
                    <MessageCircle size={16} /> WhatsApp
                  </Button>
                </div>

                <div className="mini-grid">
                  {cfg.hero.trustItems.map((item, i) => {
                    const icons = [CheckCircle2, UserCheck, ShieldCheck, Clock3];
                    const Icon = icons[i] || CheckCircle2;
                    return (
                      <div key={item} className="mini-card liquid-card subtle">
                        <div className="mini-icon"><Icon size={15} /></div>
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* HERO CARD */}
              <div className="hero-side">
                <div className="card liquid-card glow">
                  <div className="card-pad">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title">Elektro-Kostenschätzer</h3>
                    <div className="result-box glass-inset">
                      <div className="result-top">
                        <span>Beispiel: Wohnung, {cfg.estimator.defaults.sqm} m²</span>
                        <span>Sanierung</span>
                      </div>
                      <div className="hero-price">{formatEUR(heroExampleResult.low)} – {formatEUR(heroExampleResult.high)}</div>
                      <p style={{ color: "var(--text-soft)", fontSize: "0.84rem", marginTop: "6px" }}>
                        Unverbindliche Preisspanne – kein Festpreis, kein Versprechen.
                      </p>
                    </div>
                    <div className="hero-mini-boxes">
                      <div className="soft-box liquid-card subtle" style={{ fontSize: "0.82rem" }}>Geführte Eingabe in 7 Schritten</div>
                      <div className="soft-box liquid-card subtle" style={{ fontSize: "0.82rem" }}>Orientierungspreis statt Festpreis</div>
                    </div>
                    <Button className="full" onClick={() => setActiveTab("rechner")}>
                      Rechner öffnen <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT STRIP */}
          <div className="contact-strip">
            <div className="container">
              <div className="contact-strip-grid">
                <a href={cfg.company.phoneLink} className="contact-strip-item">
                  <div className="strip-icon"><Phone size={15} /></div>
                  {cfg.company.phoneDisplay}
                </a>
                <a href={`mailto:${cfg.company.email}`} className="contact-strip-item">
                  <div className="strip-icon"><Mail size={15} /></div>
                  {cfg.company.email}
                </a>
                <div className="contact-strip-item">
                  <div className="strip-icon"><MapPin size={15} /></div>
                  {cfg.company.region}
                </div>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <section className="section">
            <div className="container">
              <SectionTitle
                eyebrow="Leistungen"
                title="Was ich für Sie umsetze"
                text="Von der einzelnen Erweiterung bis zur vollständigen Elektrosanierung: Die Leistungen sind klar abgegrenzt, handwerklich sauber ausgeführt und direkt auf Privatkunden ausgerichtet."
              />
              <div className="services-grid">
                {cfg.services.items.map((service) => {
                  const Icon = iconMap[service.icon] || CheckCircle2;
                  return (
                    <div key={service.key} className="card liquid-card subtle">
                      <div className="card-pad">
                        <div className="service-icon"><Icon size={21} /></div>
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

      {/* ══════════════════════════════
          RECHNER
      ══════════════════════════════ */}
      {activeTab === "rechner" && (
        <main className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Kostenschätzer"
              title="Unverbindliche Kosteneinschätzung"
              text="Der Rechner liefert eine erste Orientierung auf Basis Ihrer Angaben. Er ersetzt weder ein Aufmaß noch ein verbindliches Angebot vor Ort."
            />

            <div className="estimator-layout">
              <div className="card estimator-card liquid-card glow">
                <div className="card-pad">
                  {/* PROGRESS */}
                  <div className="wizard-top">
                    <div className="wizard-meta">
                      <span>Schritt {step} von {cfg.estimator.wizardLabels.length}</span>
                      <span>{Math.round((step / cfg.estimator.wizardLabels.length) * 100)} %</span>
                    </div>
                    <div className="progress glass-inset">
                      <div className="progress-bar" style={{ width: `${(step / cfg.estimator.wizardLabels.length) * 100}%` }} />
                    </div>
                    <div className="chip-row">
                      {cfg.estimator.wizardLabels.map((label, i) => {
                        const n = i + 1;
                        return <div key={label} className={`step-chip ${n === step ? "active" : ""} ${n < step ? "done" : ""}`}>{label}</div>;
                      })}
                    </div>
                  </div>

                  {/* STEP 1 – Objekt */}
                  {step === 1 && (
                    <div className="form-grid two">
                      <div>
                        <label className="field-label">Objektart</label>
                        <div className="choice-grid">
                          {cfg.estimator.objectChoices.map((item) => (
                            <button key={item.value} className={`choice ${form.objectType === item.value ? "active" : ""}`} onClick={() => updateField("objectType", item.value)}>
                              <ChoiceIcon iconName={item.icon} size={16} />
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Wohnfläche / Nutzfläche in m²</label>
                        <input className="input glass-input" value={form.sqm} onChange={(e) => updateField("sqm", e.target.value)} inputMode="numeric" />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 – Projekt */}
                  {step === 2 && (
                    <div>
                      <label className="field-label">Projektart</label>
                      <div className="choice-grid wide">
                        {cfg.estimator.projectChoices.map((item) => (
                          <button key={item.value} className={`choice ${form.projectType === item.value ? "active" : ""}`} onClick={() => handleProjectChoice(item.value)}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                      {skipsCalculator && (
                        <div className="soft-box liquid-card subtle flow-note" style={{ fontSize: "0.86rem" }}>
                          Für diese Projektart ist keine automatische Schätzung möglich. Sie werden direkt zur Anfrage weitergeleitet.
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3 – Ausstattung */}
                  {step === 3 && !skipsCalculator && (
                    <div>
                      <div className="field-row">
                        <label className="field-label">Ausstattungsdetails</label>
                        <div className="hint-pill">{cfg.estimator.componentHint}</div>
                      </div>
                      <div className="form-grid three">
                        {cfg.estimator.componentFields.map((field) => (
                          <div key={field.key}>
                            <label className="field-label small">{field.label}</label>
                            <input className="input glass-input" value={form[field.key]} onChange={(e) => updateField(field.key, e.target.value)} inputMode="numeric" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4 – Optionen */}
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

                  {/* STEP 5 – Material */}
                  {step === 5 && !skipsCalculator && (
                    <div className="form-grid two">
                      <div>
                        <label className="field-label">Schalterprogramm</label>
                        <div className="choice-grid">
                          {cfg.estimator.brandChoices.map((item) => (
                            <button key={item.value} className={`choice ${form.brand === item.value ? "active" : ""}`} onClick={() => updateField("brand", item.value)}>
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Qualitätsstufe</label>
                        <div className="choice-grid">
                          {cfg.estimator.qualityChoices.map((item) => (
                            <button key={item.value} className={`choice ${form.quality === item.value ? "active" : ""}`} onClick={() => updateField("quality", item.value)}>
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6 – Ergebnis */}
                  {step === 6 && !skipsCalculator && (
                    <div className="form-grid two">
                      <div className="result-box big glass-inset">
                        <div className="eyebrow">Ihre Preisspanne</div>
                        <div className="hero-price">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                        <p className="body-text" style={{ marginTop: "8px", fontSize: "0.84rem" }}>
                          Unverbindliche Ersteinschätzung – kein verbindliches Angebot.
                        </p>
                        <div className="result-grid">
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

                  {/* STEP 7 – Anfrage */}
                  {step === 7 && (
                    <div className="form-grid two">
                      <div className="stack">
                        <div><label className="field-label">Name</label><input className="input glass-input" value={form.name} onChange={(e) => updateField("name", e.target.value)} autoComplete="name" /></div>
                        <div><label className="field-label">Telefon</label><input className="input glass-input" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} inputMode="tel" autoComplete="tel" /></div>
                        <div><label className="field-label">E-Mail</label><input className="input glass-input" value={form.email} onChange={(e) => updateField("email", e.target.value)} inputMode="email" autoComplete="email" /></div>
                        <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} inputMode="numeric" autoComplete="postal-code" /></div>
                        <div>
                          <label className="field-label">Grundriss / Plan (optional)</label>
                          <label className="upload-box glass-input">
                            <Upload size={16} />
                            <span>{form.fileName || "Datei auswählen (PDF, JPG, PNG)"}</span>
                            <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => updateField("fileName", e.target.files?.[0]?.name || "")} />
                          </label>
                        </div>
                        <div><label className="field-label">Anmerkungen zum Projekt</label><textarea className="input textarea glass-input" value={form.message} onChange={(e) => updateField("message", e.target.value)} /></div>
                        <div className="soft-box liquid-card subtle" style={{ fontSize: "0.84rem" }}>
                          Das Formular ist visuell vorbereitet. Der tatsächliche Versand ist noch nicht eingerichtet – bitte nutzen Sie bis dahin Telefon oder E-Mail.
                        </div>
                      </div>

                      <div className="soft-box liquid-card strong">
                        <div className="field-label">Ihre Angaben</div>
                        <div className="summary-list" style={{ marginTop: "12px" }}>
                          <div>Objekt: <span><SummaryLabel value={form.objectType} choices={cfg.estimator.objectChoices} /></span></div>
                          <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                          <div>Projekt: <span><SummaryLabel value={form.projectType} choices={cfg.estimator.projectChoices} /></span></div>
                          {!skipsCalculator && (
                            <>
                              <div>Programm: <span><SummaryLabel value={form.brand} choices={cfg.estimator.brandChoices} /></span></div>
                              <div>Qualität: <span><SummaryLabel value={form.quality} choices={cfg.estimator.qualityChoices} /></span></div>
                              <div>Optionen: <span>{selectedOptions.length ? `${selectedOptions.length} gewählt` : "keine"}</span></div>
                              <div style={{ paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "4px" }}>
                                Richtpreis: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span>
                              </div>
                            </>
                          )}
                          {skipsCalculator && <p className="summary-direct-note">Direktanfrage – keine automatische Schätzung für diese Projektart.</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NAVIGATION */}
                  <div className="wizard-actions">
                    <Button outline onClick={prevStep}>Zurück</Button>
                    {step < cfg.estimator.wizardLabels.length
                      ? <Button onClick={nextStep}>Weiter <ArrowRight size={15} /></Button>
                      : <Button onClick={() => setActiveTab("kontakt")}>Zum Kontakt</Button>
                    }
                  </div>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="card sidebar-card liquid-card subtle">
                <div className="card-pad">
                  <div className="eyebrow" style={{ marginBottom: "14px" }}>{cfg.estimator.sidebarTitle}</div>
                  <div className="summary-list compact">
                    <div>Objekt: <span><SummaryLabel value={form.objectType} choices={cfg.estimator.objectChoices} /></span></div>
                    <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                    <div>Projekt: <span><SummaryLabel value={form.projectType} choices={cfg.estimator.projectChoices} /></span></div>
                    {!skipsCalculator
                      ? <><div>Programm: <span><SummaryLabel value={form.brand} choices={cfg.estimator.brandChoices} /></span></div><div>Spanne: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div></>
                      : <div>Hinweis: <span>Direktanfrage</span></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ══════════════════════════════
          KONTAKT
      ══════════════════════════════ */}
      {activeTab === "kontakt" && (
        <main className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Kontakt"
              title="Direkt anfragen"
              text="Kurze Beschreibung Ihres Projekts genügt – ich melde mich in der Regel innerhalb eines Werktages."
            />
            <div className="contact-layout">
              <div className="card liquid-card subtle">
                <div className="card-pad stack">
                  <a className="contact-item" href={cfg.company.phoneLink}><Phone size={15} /> {cfg.company.phoneDisplay}</a>
                  <a className="contact-item" href={`mailto:${cfg.company.email}`}><Mail size={15} /> {cfg.company.email}</a>
                  <div className="contact-item"><MapPin size={15} /> {cfg.company.region}</div>
                  <a className="contact-item" href={cfg.company.whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp schreiben</a>
                </div>
              </div>

              <div className="card liquid-card subtle">
                <div className="card-pad stack">
                  <div><label className="field-label">Name</label><input className="input glass-input" placeholder="Ihr Name" autoComplete="name" /></div>
                  <div className="form-grid two">
                    <div><label className="field-label">E-Mail</label><input className="input glass-input" placeholder="E-Mail" inputMode="email" /></div>
                    <div><label className="field-label">Telefon</label><input className="input glass-input" placeholder="Telefon" inputMode="tel" /></div>
                  </div>
                  <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" placeholder="PLZ / Ort" /></div>
                  <div><label className="field-label">Kurze Projektbeschreibung</label><textarea className="input textarea glass-input" placeholder="Was planen Sie? Welche Räume? Bestand oder Neubau?" /></div>
                  <div className="soft-box liquid-card subtle" style={{ fontSize: "0.84rem" }}>
                    Das Kontaktformular ist noch nicht an einen Versand angebunden. Bitte nutzen Sie bis dahin Telefon oder E-Mail.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff" }}>{cfg.company.name}</div>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#5a5d6a", marginTop: "4px" }}>{cfg.company.subtitle}</div>
            </div>
            <p className="footer-text">© {new Date().getFullYear()} {cfg.company.name} · {cfg.company.region}</p>
          </div>
        </div>
      </footer>

      <button className="sticky-contact" onClick={() => setActiveTab("kontakt")}>Anfrage stellen</button>
    </div>
  );
}
