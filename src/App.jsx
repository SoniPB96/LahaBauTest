import React, { useMemo, useState } from "react";
import {
  CheckCircle2, Clock3, Home, Building2, UserCheck, ShieldCheck,
  MessageCircle, Phone, Mail, MapPin, ChevronRight, Calculator,
  Upload, Zap, Wrench, Network, Sun,
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
    (Number(data.rollladenschalter) || 0) * pc.components.rollladenschalter +
    (Number(data.taster) || 0) * pc.components.taster;
  const optionSum = Object.entries(data.options || {}).reduce((sum, [key, enabled]) =>
    enabled ? sum + (pc.options[key] || 0) : sum, 0);
  const total =
    (base + sqmPart + componentSum + optionSum) *
    (pc.brandFactor[data.brand] || 1) *
    (pc.qualityFactor[data.quality] || 1) *
    (pc.objectFactor[data.objectType] || 1);
  return {
    low: Math.round(total * (1 - pc.range)),
    high: Math.round(total * (1 + pc.range)),
    labor: Math.round(total * pc.laborShare),
    material: Math.round(total * pc.materialShare),
    extras: Math.round(total * pc.extraShare),
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
      <p>{text}</p>
    </div>
  );
}

function ChoiceIcon({ iconName, size = 16 }) {
  const Icon = iconMap[iconName] || CheckCircle2;
  return <Icon size={size} />;
}

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState("start");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(cfg.estimator.defaults);
  const result = useMemo(() => estimatePrice(form, cfg), [form]);
  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateOption = (key, value) => setForm((prev) => ({ ...prev, options: { ...prev.options, [key]: value } }));
  const selectedOptions = Object.entries(form.options).filter(([, enabled]) => enabled).map(([key]) => key);

  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => setActiveTab("start")} aria-label="Startseite">
            <div className="brand-name">{cfg.company.name}</div>
            <div className="brand-sub">{cfg.company.subtitle}</div>
          </button>
          <nav className="nav">
            {cfg.navigation.items.map((item) => (
              <button key={item.key} onClick={() => setActiveTab(item.key)}>{item.label}</button>
            ))}
          </nav>
          <Button onClick={() => setActiveTab("kontakt")}>{cfg.navigation.ctaLabel}</Button>
        </div>
      </header>

      {/* START PAGE */}
      {activeTab === "start" && (
        <main>
          {/* HERO */}
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="badge-row">
                  <span className="badge accent"><span className="dot" />{cfg.hero.badgePrimary}</span>
                  <span className="badge">{cfg.hero.badgeSecondary}</span>
                </div>
                <h1>Saubere <em>Elektro&shy;arbeiten.</em> Klare Kommunikation.</h1>
                <p>{cfg.hero.text}</p>
                <p className="hero-trust">{cfg.hero.trustLine}</p>

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
                  {cfg.hero.trustItems.map((item, index) => {
                    const icons = [CheckCircle2, UserCheck, ShieldCheck, Clock3];
                    const Icon = icons[index] || CheckCircle2;
                    return (
                      <div key={item} className="mini-card">
                        <div className="mini-icon"><Icon size={15} /></div>
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hero-side">
                <div className="card">
                  <div className="card-pad">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title">Elektro-Kostenschätzer</h3>
                    <div className="result-box">
                      <div className="result-top">
                        <span>Beispiel: Wohnung, {form.sqm} m²</span>
                        <span>{form.projectType}</span>
                      </div>
                      <div className="hero-price">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "6px" }}>
                        {cfg.hero.estimatorCardInfo}
                      </p>
                    </div>
                    <div className="hero-mini-boxes">
                      <div className="soft-box" style={{ fontSize: "0.8rem", textAlign: "center" }}>Mehrstufige Eingabe</div>
                      <div className="soft-box" style={{ fontSize: "0.8rem", textAlign: "center" }}>Richtpreis statt Festpreis</div>
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
                <div className="contact-strip-item">
                  <div className="contact-strip-icon"><Phone size={16} /></div>
                  {cfg.company.phoneDisplay}
                </div>
                <div className="contact-strip-item">
                  <div className="contact-strip-icon"><Mail size={16} /></div>
                  {cfg.company.email}
                </div>
                <div className="contact-strip-item">
                  <div className="contact-strip-icon"><MapPin size={16} /></div>
                  {cfg.company.region}
                </div>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <section className="section">
            <div className="container">
              <SectionTitle eyebrow={cfg.services.eyebrow} title={cfg.services.title} text={cfg.services.text} />
              <div className="services-grid">
                {cfg.services.items.map((service) => {
                  const Icon = iconMap[service.icon] || CheckCircle2;
                  return (
                    <div key={service.key} className="service-card">
                      <div className="service-icon"><Icon size={22} /></div>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* RECHNER PAGE */}
      {activeTab === "rechner" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={cfg.estimator.titleEyebrow} title={cfg.estimator.title} text={cfg.estimator.text} />
            <div className="estimator-layout">
              <div className="card estimator-card">
                <div className="card-pad">
                  <div className="wizard-top">
                    <div className="wizard-meta">
                      <span>Schritt {step} von {cfg.estimator.wizardLabels.length}</span>
                      <span>{Math.round((step / cfg.estimator.wizardLabels.length) * 100)}%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${(step / cfg.estimator.wizardLabels.length) * 100}%` }} />
                    </div>
                    <div className="chip-row">
                      {cfg.estimator.wizardLabels.map((label, index) => {
                        const n = index + 1;
                        return (
                          <div key={label} className={`step-chip ${n === step ? "active" : ""} ${n < step ? "done" : ""}`}>
                            {label}
                          </div>
                        );
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
                        <input className="input" value={form.sqm} onChange={(e) => updateField("sqm", e.target.value)} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <label className="field-label">Projektart</label>
                      <div className="choice-grid wide">
                        {cfg.estimator.projectChoices.map((item) => (
                          <button key={item.value} className={`choice ${form.projectType === item.value ? "active" : ""}`} onClick={() => updateField("projectType", item.value)}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="form-grid three">
                      {cfg.estimator.componentFields.map((field) => (
                        <div key={field.key}>
                          <label className="field-label">{field.label}</label>
                          <input className="input" value={form[field.key]} onChange={(e) => updateField(field.key, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
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

                  {step === 5 && (
                    <div className="form-grid two">
                      <div>
                        <label className="field-label">Schalterprogramm / Materiallinie</label>
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

                  {step === 6 && (
                    <div className="form-grid two">
                      <div className="result-box big">
                        <div className="eyebrow">Ergebnis</div>
                        <div className="hero-price">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "6px" }}>{cfg.estimator.disclaimer}</p>
                        <div className="result-grid">
                          <div className="soft-box"><div className="meta-label">Material</div><div className="meta-value">{formatEUR(result.material)}</div></div>
                          <div className="soft-box"><div className="meta-label">Arbeitszeit</div><div className="meta-value">{formatEUR(result.labor)}</div></div>
                          <div className="soft-box"><div className="meta-label">Zusatzoptionen</div><div className="meta-value">{formatEUR(result.extras)}</div></div>
                        </div>
                      </div>
                      <div className="soft-box strong">
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
                        <div><label className="field-label">Name</label><input className="input" value={form.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                        <div><label className="field-label">Telefon</label><input className="input" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                        <div><label className="field-label">E-Mail</label><input className="input" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                        <div><label className="field-label">PLZ / Ort</label><input className="input" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} /></div>
                        <div>
                          <label className="field-label">Grundriss / Umrissplan</label>
                          <label className="upload-box">
                            <Upload size={16} />
                            <span>{form.fileName || "Datei auswählen (PDF, JPG, PNG)"}</span>
                            <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => updateField("fileName", e.target.files?.[0]?.name || "")} />
                          </label>
                        </div>
                        <div><label className="field-label">Zusätzliche Angaben</label><textarea className="input textarea" value={form.message} onChange={(e) => updateField("message", e.target.value)} /></div>
                        <div className="soft-box">{cfg.estimator.requestNote}</div>
                      </div>
                      <div className="soft-box strong">
                        <div className="field-label">Zusammenfassung</div>
                        <div className="summary-list" style={{ marginTop: "12px" }}>
                          <div>Objekt <span>{form.objectType}</span></div>
                          <div>Fläche <span>{form.sqm || "—"} m²</span></div>
                          <div>Projektart <span>{form.projectType}</span></div>
                          <div>Programm <span>{form.brand}</span></div>
                          <div>Qualität <span>{form.quality}</span></div>
                          <div>Optionen <span>{selectedOptions.length ? selectedOptions.length + " gewählt" : "keine"}</span></div>
                          <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
                            Richtpreis <span style={{ color: "var(--accent)" }}>{formatEUR(result.low)} – {formatEUR(result.high)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="wizard-actions">
                    <Button outline onClick={() => setStep((s) => Math.max(1, s - 1))}>Zurück</Button>
                    {step < cfg.estimator.wizardLabels.length
                      ? <Button onClick={() => setStep((s) => Math.min(cfg.estimator.wizardLabels.length, s + 1))}>Weiter <ChevronRight size={16} /></Button>
                      : <Button onClick={() => setActiveTab("kontakt")}>Zum Kontakt</Button>}
                  </div>
                </div>
              </div>

              <div className="card sidebar-card">
                <div className="card-pad">
                  <div className="eyebrow" style={{ marginBottom: "16px" }}>{cfg.estimator.sidebarTitle}</div>
                  <div className="summary-list compact">
                    <div>Objekt <span>{form.objectType}</span></div>
                    <div>Fläche <span>{form.sqm || "—"} m²</span></div>
                    <div>Projekt <span>{form.projectType}</span></div>
                    <div>Programm <span>{form.brand}</span></div>
                    <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
                      Spanne <span style={{ color: "var(--accent)" }}>{formatEUR(result.low)} – {formatEUR(result.high)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* KONTAKT PAGE */}
      {activeTab === "kontakt" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={cfg.contactSection.eyebrow} title={cfg.contactSection.title} text={cfg.contactSection.text} />
            <div className="contact-layout">
              <div className="card">
                <div className="card-pad stack">
                  <a className="contact-item" href={cfg.company.phoneLink}><Phone size={16} /> {cfg.company.phoneDisplay}</a>
                  <a className="contact-item" href={`mailto:${cfg.company.email}`}><Mail size={16} /> {cfg.company.email}</a>
                  <div className="contact-item"><MapPin size={16} /> {cfg.company.region}</div>
                  <a className="contact-item" href={cfg.company.whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp schreiben</a>
                </div>
              </div>
              <div className="card">
                <div className="card-pad stack">
                  <div><label className="field-label">Name</label><input className="input" placeholder="Ihr Name" /></div>
                  <div className="form-grid two">
                    <div><label className="field-label">E-Mail</label><input className="input" placeholder="E-Mail" /></div>
                    <div><label className="field-label">Telefon</label><input className="input" placeholder="Telefon" /></div>
                  </div>
                  <div><label className="field-label">PLZ / Ort</label><input className="input" placeholder="PLZ / Ort" /></div>
                  <div><label className="field-label">Kurze Beschreibung Ihres Projekts</label><textarea className="input textarea" placeholder="Beschreibung" /></div>
                  <div className="soft-box">{cfg.contactSection.formNote}</div>
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
              <div className="brand-name" style={{ fontSize: "1.2rem" }}>{cfg.company.name}</div>
              <div className="brand-sub">{cfg.company.subtitle}</div>
            </div>
            <p className="footer-text">© {new Date().getFullYear()} {cfg.company.name} · {cfg.company.region}</p>
          </div>
        </div>
      </footer>

      <button className="sticky-contact" onClick={() => setActiveTab("kontakt")}>Kontakt</button>
    </div>
  );
}
