import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Home,
  Building2,
  UserCheck,
  ShieldCheck,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Calculator,
  Upload,
  Zap,
  Wrench,
  Network,
  Sun,
} from "lucide-react";

const PHONE_DISPLAY = "0176 / 820 67 106";
const PHONE_LINK = "tel:+4917682067106";
const EMAIL = "kontakt@laha-bau.de";
const WHATSAPP_LINK = "https://wa.me/4917682067106";
const REGION = "Paderborn und Umland";

const priceConfig = {
  projectBase: {
    neuinstallation: 2400,
    sanierung: 1600,
    erweiterung: 750,
    unterverteilung: 1350,
    zaehlerschrank: 2800,
  },
  sqm: {
    neuinstallation: 72,
    sanierung: 46,
    erweiterung: 20,
    unterverteilung: 0,
    zaehlerschrank: 0,
  },
  components: {
    steckdosen: 98,
    schalter: 82,
    netzwerkdosen: 149,
    lampenauslaesse: 92,
    rollladenschalter: 136,
    taster: 86,
  },
  options: {
    fi: 450,
    uv: 1450,
    sicherungskasten: 2550,
    lan: 820,
    aussenbereich: 990,
    kueche: 1350,
    bad: 1050,
    waermepumpe: 920,
    wallbox: 1180,
  },
  brandFactor: {
    standard: 1,
    gira: 1.12,
    merten: 1.08,
    schneider: 1.1,
    jung: 1.13,
  },
  qualityFactor: {
    einfach: 0.93,
    standard: 1,
    hochwertig: 1.18,
  },
  objectFactor: {
    wohnung: 1,
    einfamilienhaus: 1.05,
    mehrfamilienhaus: 1.03,
    gewerbe: 1.12,
  },
  range: 0.14,
  laborShare: 0.56,
  materialShare: 0.31,
  extraShare: 0.13,
};

const defaultEstimator = {
  objectType: "wohnung",
  sqm: "85",
  projectType: "sanierung",
  steckdosen: 12,
  schalter: 8,
  netzwerkdosen: 2,
  lampenauslaesse: 6,
  rollladenschalter: 0,
  taster: 0,
  brand: "standard",
  quality: "standard",
  options: {
    fi: false,
    uv: false,
    sicherungskasten: false,
    lan: false,
    aussenbereich: false,
    kueche: false,
    bad: false,
    waermepumpe: false,
    wallbox: false,
  },
  fileName: "",
  name: "",
  phone: "",
  email: "",
  zip: "",
  message: "",
};

function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function estimatePrice(data) {
  const base = priceConfig.projectBase[data.projectType] || 0;
  const sqmPart = (priceConfig.sqm[data.projectType] || 0) * (Number(data.sqm) || 0);

  const componentSum =
    (Number(data.steckdosen) || 0) * priceConfig.components.steckdosen +
    (Number(data.schalter) || 0) * priceConfig.components.schalter +
    (Number(data.netzwerkdosen) || 0) * priceConfig.components.netzwerkdosen +
    (Number(data.lampenauslaesse) || 0) * priceConfig.components.lampenauslaesse +
    (Number(data.rollladenschalter) || 0) * priceConfig.components.rollladenschalter +
    (Number(data.taster) || 0) * priceConfig.components.taster;

  const optionSum = Object.entries(data.options || {}).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (priceConfig.options[key] || 0);
  }, 0);

  const total =
    (base + sqmPart + componentSum + optionSum) *
    (priceConfig.brandFactor[data.brand] || 1) *
    (priceConfig.qualityFactor[data.quality] || 1) *
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
    return (
      <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} type={type}>
      {children}
    </button>
  );
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

export default function App() {
  const [activeTab, setActiveTab] = useState("start");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultEstimator);

  const result = useMemo(() => estimatePrice(form), [form]);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateOption = (key, value) =>
    setForm((prev) => ({ ...prev, options: { ...prev.options, [key]: value } }));

  const selectedOptions = Object.entries(form.options).filter(([, enabled]) => enabled).map(([key]) => key);

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => setActiveTab("start")} aria-label="Startseite">
            <div className="brand-name">LAHA</div>
            <div className="brand-sub">BAUDIENSTLEISTUNGEN</div>
          </button>

          <nav className="nav">
            <button onClick={() => setActiveTab("start")}>Start</button>
            <button onClick={() => setActiveTab("rechner")}>Kostenschätzer</button>
            <button onClick={() => setActiveTab("kontakt")}>Kontakt</button>
          </nav>

          <Button onClick={() => setActiveTab("kontakt")}>Anfrage stellen</Button>
        </div>
      </header>

      {activeTab === "start" && (
        <main>
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="badge-row">
                  <span className="badge">Elektroarbeiten in Paderborn und Umgebung</span>
                  <span className="badge muted">Unverbindliche Ersteinschätzung</span>
                </div>

                <h1>Saubere Elektroarbeiten. Klare Kommunikation. Verlässliche Ausführung.</h1>

                <p>
                  Ich unterstütze Privatkunden bei Sanierung, Modernisierung und Erweiterung elektrischer Anlagen.
                  Der Fokus liegt auf sauberer Ausführung, klarer Abstimmung und einer realistischen unverbindlichen
                  Ersteinschätzung.
                </p>

                <p className="hero-trust">
                  Elektroarbeiten im Raum Paderborn und Umgebung. Planung und Ausführung in Zusammenarbeit mit
                  Meisterbetrieb.
                </p>

                <div className="button-row">
                  <Button onClick={() => setActiveTab("rechner")}>Kostenschätzung starten</Button>
                  <Button outline onClick={() => setActiveTab("kontakt")}>Unverbindlich anfragen</Button>
                </div>

                <div className="cta-row">
                  <Button href={PHONE_LINK}>Jetzt anrufen</Button>
                  <Button outline href={WHATSAPP_LINK} target="_blank">
                    <MessageCircle size={16} /> WhatsApp
                  </Button>
                </div>

                <div className="mini-grid">
                  {[
                    { icon: <CheckCircle2 size={16} />, text: "Saubere Ausführung" },
                    { icon: <UserCheck size={16} />, text: "Klare Abstimmung" },
                    { icon: <ShieldCheck size={16} />, text: "Realistische Ersteinschätzung" },
                    { icon: <Clock3 size={16} />, text: "Paderborn und Umland" },
                  ].map((item) => (
                    <div key={item.text} className="mini-card">
                      <div className="mini-icon">{item.icon}</div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-side">
                <div className="card">
                  <div className="card-pad">
                    <div className="eyebrow">Digitale Ersteinschätzung</div>
                    <h3 className="card-title">Elektro-Kostenschätzer</h3>
                    <div className="result-box">
                      <div className="result-top">
                        <span>Beispiel: Wohnung, 85 m²</span>
                        <span>Sanierung</span>
                      </div>
                      <div className="hero-price">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                      <p>Unverbindliche Preisspanne auf Basis von Fläche, Ausstattung und Zusatzoptionen.</p>
                    </div>
                    <div className="hero-mini-boxes">
                      <div className="soft-box">Mehrstufige Eingabe</div>
                      <div className="soft-box">Richtpreis statt Festpreis</div>
                    </div>
                    <Button className="full" onClick={() => setActiveTab("rechner")}>
                      Rechner öffnen <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-strip">
            <div className="container contact-strip-grid">
              <div className="soft-box">Telefon: {PHONE_DISPLAY}</div>
              <div className="soft-box">E-Mail: {EMAIL}</div>
              <div className="soft-box">Einsatzgebiet: {REGION}</div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <SectionTitle
                eyebrow="Leistungen"
                title="Leistungsbereiche mit klarem Fokus auf Privatkunden"
                text="Von der einzelnen Erweiterung bis zur strukturierten Sanierung ganzer Wohneinheiten: Die Leistungen sind bewusst klar, sachlich und handwerklich formuliert."
              />
              <div className="services-grid">
                {[
                  {
                    icon: <Zap size={22} />,
                    title: "Elektroinstallation",
                    text: "Neuinstallation, Modernisierung und strukturierte Elektroarbeiten für Wohnung, Haus und kleinere Einheiten.",
                  },
                  {
                    icon: <Wrench size={22} />,
                    title: "Unterverteilungen & Schutztechnik",
                    text: "Erweiterung, Erneuerung und sinnvolle Anpassung bestehender Unterverteilungen und Sicherungstechnik.",
                  },
                  {
                    icon: <Sun size={22} />,
                    title: "Beleuchtung",
                    text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung und passender Schaltlogik.",
                  },
                  {
                    icon: <Network size={22} />,
                    title: "Netzwerk & Datenleitungen",
                    text: "Strukturierte Verkabelung für Homeoffice, Medienpunkte und moderne Haustechnik.",
                  },
                  {
                    icon: <Calculator size={22} />,
                    title: "Digitale Ersteinschätzung",
                    text: "Mehrstufige Ersteinschätzung mit Preisspanne statt ungenauem Festpreisversprechen.",
                  },
                  {
                    icon: <CheckCircle2 size={22} />,
                    title: "Saubere Ausführung",
                    text: "Fokus auf klare Abstimmung, nachvollziehbare Umsetzung und ruhige Kommunikation im Projekt.",
                  },
                ].map((service) => (
                  <div key={service.title} className="card">
                    <div className="card-pad">
                      <div className="service-icon">{service.icon}</div>
                      <h3 className="card-title">{service.title}</h3>
                      <p className="body-text">{service.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === "rechner" && (
        <main className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Kostenschätzer"
              title="Unverbindliche Kostenschätzung für Elektroarbeiten"
              text="Der Rechner dient ausschließlich als erste Orientierung. Er ersetzt kein Aufmaß, keine technische Prüfung und kein verbindliches Angebot."
            />

            <div className="estimator-layout">
              <div className="card estimator-card">
                <div className="card-pad">
                  <div className="wizard-top">
                    <div className="wizard-meta">
                      <span>Schritt {step} von 7</span>
                      <span>{Math.round((step / 7) * 100)}%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${(step / 7) * 100}%` }} />
                    </div>
                    <div className="chip-row">
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <div key={n} className={`step-chip ${n === step ? "active" : ""} ${n < step ? "done" : ""}`}>
                          {["Objekt", "Projekt", "Ausstattung", "Optionen", "Material", "Ergebnis", "Anfrage"][n - 1]}
                        </div>
                      ))}
                    </div>
                  </div>

                  {step === 1 && (
                    <div className="form-grid two">
                      <div>
                        <label className="field-label">Objektart</label>
                        <div className="choice-grid">
                          {[
                            ["wohnung", "Wohnung", <Home size={16} />],
                            ["einfamilienhaus", "Einfamilienhaus", <Home size={16} />],
                            ["mehrfamilienhaus", "Einheit im Mehrfamilienhaus", <Building2 size={16} />],
                            ["gewerbe", "Kleingewerbe", <Building2 size={16} />],
                          ].map(([value, label, icon]) => (
                            <button
                              key={value}
                              className={`choice ${form.objectType === value ? "active" : ""}`}
                              onClick={() => updateField("objectType", value)}
                            >
                              <div>{icon}</div>
                              <div>{label}</div>
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
                        {[
                          ["neuinstallation", "Komplette Neuinstallation"],
                          ["sanierung", "Sanierung / Teilerneuerung"],
                          ["erweiterung", "Erweiterung / einzelne Räume"],
                          ["unterverteilung", "Neue Unterverteilung"],
                          ["zaehlerschrank", "Zählerschrank / Verteilerarbeiten"],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            className={`choice ${form.projectType === value ? "active" : ""}`}
                            onClick={() => updateField("projectType", value)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="form-grid three">
                      {[
                        ["steckdosen", "Steckdosen"],
                        ["schalter", "Lichtschalter"],
                        ["netzwerkdosen", "Netzwerkdosen"],
                        ["lampenauslaesse", "Lampenauslässe"],
                        ["rollladenschalter", "Rollladenschalter"],
                        ["taster", "Taster / Wechsel / Kreuz"],
                      ].map(([key, label]) => (
                        <div key={key}>
                          <label className="field-label">{label}</label>
                          <input className="input" value={form[key]} onChange={(e) => updateField(key, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <label className="field-label">Zusatzoptionen</label>
                      <div className="choice-grid wide">
                        {[
                          ["fi", "FI / RCD-Erweiterung"],
                          ["uv", "Neue Unterverteilung"],
                          ["sicherungskasten", "Sicherungskasten ersetzen"],
                          ["lan", "LAN / Netzwerk mit verlegen"],
                          ["aussenbereich", "Außenbereich"],
                          ["kueche", "Küche aufwerten"],
                          ["bad", "Bad modernisieren"],
                          ["waermepumpe", "Vorbereitung Wärmepumpe"],
                          ["wallbox", "Vorbereitung Wallbox"],
                        ].map(([key, label]) => (
                          <button
                            key={key}
                            className={`choice ${form.options[key] ? "active" : ""}`}
                            onClick={() => updateOption(key, !form.options[key])}
                          >
                            {label}
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
                          {["standard", "gira", "merten", "schneider", "jung"].map((brand) => (
                            <button
                              key={brand}
                              className={`choice ${form.brand === brand ? "active" : ""}`}
                              onClick={() => updateField("brand", brand)}
                            >
                              {brand === "schneider" ? "Schneider Electric" : brand}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Qualitätsstufe</label>
                        <div className="choice-grid">
                          {[
                            ["einfach", "Einfach"],
                            ["standard", "Standard"],
                            ["hochwertig", "Hochwertig"],
                          ].map(([value, label]) => (
                            <button
                              key={value}
                              className={`choice ${form.quality === value ? "active" : ""}`}
                              onClick={() => updateField("quality", value)}
                            >
                              {label}
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
                        <p className="body-text">
                          Dies ist nur eine unverbindliche erste Kostenschätzung und ersetzt kein verbindliches Angebot vor Ort.
                        </p>
                        <div className="mini-grid result-grid">
                          <div className="soft-box">
                            <div className="meta-label">Material</div>
                            <div className="meta-value">{formatEUR(result.material)}</div>
                          </div>
                          <div className="soft-box">
                            <div className="meta-label">Arbeitszeit</div>
                            <div className="meta-value">{formatEUR(result.labor)}</div>
                          </div>
                          <div className="soft-box">
                            <div className="meta-label">Zusatzoptionen</div>
                            <div className="meta-value">{formatEUR(result.extras)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="soft-box strong">
                        <div className="field-label">Wovon der Endpreis abhängt</div>
                        <ul className="bullet-list">
                          <li>Bestand und Zustand der Anlage</li>
                          <li>Leitungswege und bauliche Gegebenheiten</li>
                          <li>Verteilertechnik und Schutzmaßnahmen</li>
                          <li>Materiallinie und Ausstattungsniveau</li>
                          <li>Zusätzliche Arbeiten vor Ort</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="form-grid two">
                      <div className="stack">
                        <div>
                          <label className="field-label">Name</label>
                          <input className="input" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">Telefon</label>
                          <input className="input" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">E-Mail</label>
                          <input className="input" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">PLZ / Ort</label>
                          <input className="input" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">Grundriss / Umrissplan</label>
                          <label className="upload-box">
                            <Upload size={16} />
                            <span>{form.fileName || "Datei auswählen"}</span>
                            <input
                              hidden
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => updateField("fileName", e.target.files?.[0]?.name || "")}
                            />
                          </label>
                        </div>
                        <div>
                          <label className="field-label">Zusätzliche Angaben</label>
                          <textarea className="input textarea" value={form.message} onChange={(e) => updateField("message", e.target.value)} />
                        </div>
                        <div className="soft-box">
                          Frontend-Stand: Das Formular ist bewusst nur visuell vorbereitet und noch nicht an einen echten Versand angebunden.
                        </div>
                      </div>

                      <div className="soft-box strong">
                        <div className="field-label">Zusammenfassung</div>
                        <div className="summary-list">
                          <div>Objekt: <span>{form.objectType}</span></div>
                          <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                          <div>Projektart: <span>{form.projectType}</span></div>
                          <div>Programm: <span>{form.brand}</span></div>
                          <div>Qualität: <span>{form.quality}</span></div>
                          <div>Optionen: <span>{selectedOptions.length ? selectedOptions.join(", ") : "keine"}</span></div>
                          <div>Richtpreis: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="wizard-actions">
                    <Button outline onClick={() => setStep((s) => Math.max(1, s - 1))}>Zurück</Button>
                    {step < 7 ? (
                      <Button onClick={() => setStep((s) => Math.min(7, s + 1))}>Weiter</Button>
                    ) : (
                      <Button onClick={() => setActiveTab("kontakt")}>Zum Kontakt</Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="card sidebar-card">
                <div className="card-pad">
                  <div className="eyebrow">Kurzübersicht</div>
                  <div className="summary-list compact">
                    <div>Objekt: <span>{form.objectType}</span></div>
                    <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                    <div>Projekt: <span>{form.projectType}</span></div>
                    <div>Programm: <span>{form.brand}</span></div>
                    <div>Spanne: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === "kontakt" && (
        <main className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Kontakt"
              title="Unverbindlich anfragen"
              text="Die Kontaktseite ist bewusst einfach gehalten. Für den Frontend-Stand reichen direkte Kontaktwege und ein sauberer erster Eindruck."
            />

            <div className="contact-layout">
              <div className="card">
                <div className="card-pad stack">
                  <a className="contact-item" href={PHONE_LINK}>
                    <Phone size={16} /> {PHONE_DISPLAY}
                  </a>
                  <a className="contact-item" href={`mailto:${EMAIL}`}>
                    <Mail size={16} /> {EMAIL}
                  </a>
                  <div className="contact-item">
                    <MapPin size={16} /> {REGION}
                  </div>
                  <a className="contact-item" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> WhatsApp schreiben
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="card-pad stack">
                  <div>
                    <label className="field-label">Name</label>
                    <input className="input" placeholder="Name" />
                  </div>
                  <div className="form-grid two">
                    <div>
                      <label className="field-label">E-Mail</label>
                      <input className="input" placeholder="E-Mail" />
                    </div>
                    <div>
                      <label className="field-label">Telefon</label>
                      <input className="input" placeholder="Telefon" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">PLZ / Ort</label>
                    <input className="input" placeholder="PLZ / Ort" />
                  </div>
                  <div>
                    <label className="field-label">Kurze Beschreibung Ihres Projekts</label>
                    <textarea className="input textarea" placeholder="Beschreibung" />
                  </div>
                  <div className="soft-box">
                    Frontend-Stand: Das Kontaktformular ist aktuell visuell vorbereitet, aber noch nicht an einen Versand angebunden.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <button className="sticky-contact" onClick={() => setActiveTab("kontakt")}>
        Kontakt
      </button>
    </div>
  );
}
