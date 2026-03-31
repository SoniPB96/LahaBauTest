import React from "react";
import { CheckCircle2, Home, Building2, Upload, ArrowRight } from "lucide-react";
import { calculatorConfig } from "../config/calculatorConfig";
import { estimatePrice, formatEUR, getVisibleComponentFields, isDirectInquiryProject } from "./calculatorLogic";
import { getNextStep, getPreviousStep, getStepPosition, getWizardLabelsForFlow } from "../calculator/flow";
import { validateStep } from "../calculator/validation";

const iconMap = { home: Home, building: Building2 };

function Button({ children, href, outline = false, onClick, type = "button", className = "", target, disabled = false }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  return <button className={cls} onClick={onClick} type={type} disabled={disabled}>{children}</button>;
}

function ChoiceIcon({ iconName, size = 16 }) {
  const Icon = iconMap[iconName] || CheckCircle2;
  return <Icon size={size} />;
}

function SummaryLabel({ value, choices }) {
  const found = choices?.find((item) => item.value === value);
  return found?.label || value || "—";
}

export default function CalculatorPanel({ onOpenRequestPage }) {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState(calculatorConfig.defaults);
  const [stepError, setStepError] = React.useState("");

  const result = React.useMemo(() => estimatePrice(form), [form]);
  const skipsCalculator = isDirectInquiryProject(form.projectType);
  const wizardLabels = React.useMemo(() => getWizardLabelsForFlow(form), [form]);
  const visibleComponentFields = React.useMemo(() => getVisibleComponentFields(form), [form]);
  const { index: stepIndex, total: totalSteps, sequence } = React.useMemo(() => getStepPosition(step, form), [step, form]);
  const progress = Math.round((((stepIndex >= 0 ? stepIndex : 0) + 1) / totalSteps) * 100);

  const selectedOptions = Object.entries(form.options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => calculatorConfig.options.find((item) => item.key === key)?.label || key);

  const updateField = (key, value) => { setForm((prev) => ({ ...prev, [key]: value })); setStepError(""); };
  const updateOption = (key, value) => { setForm((prev) => ({ ...prev, options: { ...prev.options, [key]: value } })); setStepError(""); };

  React.useEffect(() => {
    if (!sequence.includes(step)) { setStep(sequence[sequence.length - 1]); setStepError(""); }
  }, [sequence, step]);

  const nextStep = () => {
    const error = validateStep(step, form, { skipsCalculator });
    if (error) { setStepError(error); return; }
    setStepError("");
    const next = getNextStep(step, form);
    if (next !== step) setStep(next);
  };

  const prevStep = () => { setStepError(""); const previous = getPreviousStep(step, form); if (previous !== step) setStep(previous); };

  // Build prefill data to pass to request page
  const buildPrefill = () => {
    const projectLabel = calculatorConfig.projectChoices.find(c => c.value === form.projectType)?.label || "";
    const objectLabel = calculatorConfig.objectChoices.find(c => c.value === form.objectType)?.label || "";
    const priceText = !skipsCalculator && result.low ? `Richtpreis: ${formatEUR(result.low)} – ${formatEUR(result.high)}` : "";
    const subject = [objectLabel, form.sqm ? `${form.sqm} m²` : "", projectLabel].filter(Boolean).join(", ");
    const messageParts = [
      priceText,
      selectedOptions.length ? `Optionen: ${selectedOptions.join(", ")}` : "",
      form.message || "",
    ].filter(Boolean);
    return {
      name: form.name,
      phone: form.phone,
      email: form.email,
      zip: form.zip,
      fileName: form.fileName,
      subject,
      message: messageParts.join("\n"),
    };
  };

  return (
    <div className="estimator-layout">
      <div className="card estimator-card liquid-card glow">
        <div className="card-pad">
          <div className="wizard-top">
            <div className="wizard-meta">
              <span>Schritt {stepIndex + 1} von {totalSteps}</span>
              <span>{progress}%</span>
            </div>
            <div className="progress glass-inset" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="chip-row" aria-label="Wizard-Fortschritt">
              {wizardLabels.map((label, index) => (
                <div key={label} className={`step-chip ${index === stepIndex ? "active" : ""} ${index < stepIndex ? "done" : ""}`} aria-current={index === stepIndex ? "step" : undefined}>{label}</div>
              ))}
            </div>
          </div>

          {/* Step 1: Object + sqm */}
          {step === 1 && (
            <div className="form-grid two">
              <div>
                <label className="field-label">Objektart</label>
                <div className="choice-grid" role="group" aria-label="Objektart wählen">
                  {calculatorConfig.objectChoices.map((item) => (
                    <button key={item.value} className={`choice ${form.objectType === item.value ? "active" : ""}`} onClick={() => updateField("objectType", item.value)} aria-pressed={form.objectType === item.value}>
                      <ChoiceIcon iconName={item.icon} size={17} />
                      <div>{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="field-label" htmlFor="sqm-input">Wohnfläche / Nutzfläche in m²</label>
                <input id="sqm-input" className="input glass-input" inputMode="numeric" value={form.sqm} onChange={(e) => updateField("sqm", e.target.value)} placeholder="z. B. 120" />
              </div>
            </div>
          )}

          {/* Step 2: Project type */}
          {step === 2 && (
            <div>
              <label className="field-label">Projektart</label>
              <div className="choice-grid wide project-grid" role="group" aria-label="Projektart wählen">
                {calculatorConfig.projectChoices.map((item) => (
                  <button key={item.value} className={`choice ${form.projectType === item.value ? "active" : ""}`} onClick={() => updateField("projectType", item.value)} aria-pressed={form.projectType === item.value}>
                    {item.label}
                  </button>
                ))}
              </div>
              {skipsCalculator && (
                <div className="soft-box liquid-card subtle flow-note">
                  Für diese Projektart wird keine automatische Kostenschätzung angezeigt. Im nächsten Schritt kannst du direkt deine Anfrage vorbereiten.
                </div>
              )}
            </div>
          )}

          {/* Step 3: Extra options */}
          {step === 3 && !skipsCalculator && (
            <div>
              <label className="field-label">{calculatorConfig.optionsTitle}</label>
              <div className="room-info-block liquid-card subtle">
                <div className="room-info-title">Zusätzliche Bereiche und Vorbereitungen</div>
                <div className="room-info-text">{calculatorConfig.optionsHint}</div>
              </div>
              <div className="choice-grid wide" role="group" aria-label="Zusatzoptionen wählen">
                {calculatorConfig.options.map((item) => (
                  <button key={item.key} className={`choice ${form.options[item.key] ? "active" : ""}`} onClick={() => updateOption(item.key, !form.options[item.key])} aria-pressed={!!form.options[item.key]}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Room equipment */}
          {step === 4 && !skipsCalculator && (
            <div>
              <div className="room-info-block liquid-card subtle">
                <div className="room-info-title">{calculatorConfig.roomInfoTitle}</div>
                <div className="room-info-text">{calculatorConfig.roomInfoText}</div>
              </div>
              <div className="room-first-block">
                <div>
                  <label className="field-label small" htmlFor="rooms-input">{visibleComponentFields[0]?.label || "Raumanzahl"}</label>
                  <input id="rooms-input" className="input glass-input room-input" inputMode="numeric" value={form.rooms} onChange={(e) => updateField("rooms", e.target.value)} />
                </div>
              </div>
              <div className="form-grid three room-grid">
                {visibleComponentFields.slice(1).map((field) => (
                  <div key={field.key}>
                    <label className="field-label small" htmlFor={`field-${field.key}`}>{field.label}</label>
                    <input id={`field-${field.key}`} className="input glass-input" inputMode="numeric" value={form[field.key]} onChange={(e) => updateField(field.key, e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Material */}
          {step === 5 && !skipsCalculator && (
            <div>
              <div className="room-info-block liquid-card subtle material-info">
                <div className="room-info-title">{calculatorConfig.materialTitle}</div>
                <div className="room-info-text">{calculatorConfig.materialInfo}</div>
              </div>
              <div className="choice-grid wide material-grid" role="group" aria-label="Schalterprogramm wählen">
                {calculatorConfig.brandChoices.map((item) => (
                  <button
                    key={item.value}
                    className={`choice material-choice ${item.accentClass} ${form.brand === item.value ? "active" : ""} ${item.value === "gira" ? "recommended-material" : ""}`}
                    onClick={() => updateField("brand", item.value)}
                    aria-pressed={form.brand === item.value}
                  >
                    <div className="material-topline">
                      <span>{item.label}</span>
                      {item.badge ? <span className="material-badge">{item.badge}</span> : null}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Result */}
          {step === 6 && !skipsCalculator && (
            <div className="form-grid two">
              <div className="result-box big glass-inset">
                <div className="eyebrow">Ergebnis</div>
                <div className="hero-price" aria-live="polite">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                <p className="body-text">{calculatorConfig.disclaimer}</p>
                <div className="mini-grid result-grid">
                  <div className="soft-box liquid-card subtle"><div className="meta-label">Material</div><div className="meta-value">{formatEUR(result.material)}</div></div>
                  <div className="soft-box liquid-card subtle"><div className="meta-label">Arbeitszeit</div><div className="meta-value">{formatEUR(result.labor)}</div></div>
                  <div className="soft-box liquid-card subtle"><div className="meta-label">Zusatzoptionen</div><div className="meta-value">{formatEUR(result.optionTotal)}</div></div>
                </div>
              </div>
              <div className="soft-box liquid-card strong">
                <div className="field-label">{calculatorConfig.resultFactorsTitle}</div>
                <ul className="bullet-list">
                  {calculatorConfig.resultFactors.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          )}

          {/* Step 7: Contact */}
          {step === 7 && (
            <div className="form-grid two">
              <div className="stack">
                <div><label className="field-label" htmlFor="c-name">Name *</label><input id="c-name" className="input glass-input" value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Dein Name" /></div>
                <div><label className="field-label" htmlFor="c-phone">Telefon</label><input id="c-phone" className="input glass-input" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></div>
                <div><label className="field-label" htmlFor="c-email">E-Mail</label><input id="c-email" className="input glass-input" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
                <div><label className="field-label" htmlFor="c-zip">PLZ / Ort</label><input id="c-zip" className="input glass-input" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} /></div>
                <div>
                  <label className="field-label">Grundriss / Umrissplan</label>
                  <label className="upload-box glass-input" style={{ cursor: "pointer" }}>
                    <Upload size={16} aria-hidden="true" />
                    <span>{form.fileName || "Datei auswählen"}</span>
                    <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => updateField("fileName", e.target.files?.[0]?.name || "")} />
                  </label>
                </div>
                <div><label className="field-label" htmlFor="c-message">Zusätzliche Angaben</label><textarea id="c-message" className="input textarea glass-input" value={form.message} onChange={(e) => updateField("message", e.target.value)} /></div>
                <div className="soft-box liquid-card subtle">{calculatorConfig.requestNote}</div>
              </div>

              <div className="soft-box liquid-card strong">
                <div className="field-label">Zusammenfassung</div>
                <div className="summary-list">
                  <div>Objekt: <span>{SummaryLabel({ value: form.objectType, choices: calculatorConfig.objectChoices })}</span></div>
                  <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                  <div>Projekt: <span>{SummaryLabel({ value: form.projectType, choices: calculatorConfig.projectChoices })}</span></div>
                  {!skipsCalculator ? (
                    <>
                      <div>Raumanzahl: <span>{form.rooms || "—"}</span></div>
                      <div>Programm: <span>{SummaryLabel({ value: form.brand, choices: calculatorConfig.brandChoices })}</span></div>
                      <div>Optionen: <span>{selectedOptions.length ? selectedOptions.join(", ") : "keine"}</span></div>
                      <div>Richtpreis: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                    </>
                  ) : (
                    <div className="summary-direct-note">Für diese Projektart wird direkt eine individuelle Anfrage vorbereitet.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {stepError && <div className="soft-box liquid-card subtle flow-note" role="alert">{stepError}</div>}

          <div className="wizard-actions">
            <Button outline onClick={prevStep} disabled={stepIndex <= 0} aria-label="Vorheriger Schritt">Zurück</Button>
            {stepIndex < totalSteps - 1 ? (
              <Button onClick={nextStep} aria-label="Nächster Schritt">Weiter <ArrowRight size={15} /></Button>
            ) : (
              <Button onClick={() => {
                const error = validateStep(step, form, { skipsCalculator });
                if (error) { setStepError(error); return; }
                setStepError("");
                onOpenRequestPage(buildPrefill());
              }}>Zur Anfrageseite <ArrowRight size={15} /></Button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar summary */}
      <div className="card sidebar-card liquid-card subtle">
        <div className="card-pad">
          <div className="eyebrow">{calculatorConfig.sidebarTitle}</div>
          <div className="summary-list compact">
            <div>Objekt: <span>{SummaryLabel({ value: form.objectType, choices: calculatorConfig.objectChoices })}</span></div>
            <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
            <div>Projekt: <span>{SummaryLabel({ value: form.projectType, choices: calculatorConfig.projectChoices })}</span></div>
            {!skipsCalculator ? (
              <>
                <div>Programm: <span>{SummaryLabel({ value: form.brand, choices: calculatorConfig.brandChoices })}</span></div>
                <div>Spanne: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
              </>
            ) : (
              <div>Hinweis: <span>Direktanfrage</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
