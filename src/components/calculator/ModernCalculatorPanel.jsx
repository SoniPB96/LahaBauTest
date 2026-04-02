import React, { useMemo, useState } from "react";
import './modern-calculator.css';
import {
  Home,
  Building2,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  Sparkles,
  TrendingUp,
  Info,
} from "lucide-react";
import { calculatorConfig } from "../../config/calculatorConfig";
import {
  estimatePrice,
  formatEUR,
  getVisibleExtensionFields,
  getVisibleTechnologyGroups,
  isMultiFamilyProject,
} from "./calculatorLogic";
import { getNextStep, getPreviousStep, getStepPosition, getWizardLabelsForFlow } from "../../calculator/flow";
import { validateStep } from "../../calculator/validation";

const iconMap = { home: Home, building: Building2 };

function StepperField({ field, value, onChange }) {
  return (
    <div className="calc-component-item">
      <div className="calc-component-info">
        <span className="calc-component-label">{field.label}</span>
        {field.hint && <span className="calc-component-hint">{field.hint}</span>}
      </div>
      <div className="calc-stepper">
        <button onClick={() => onChange(Math.max(field.min || 0, (value || 0) - 1))} className="calc-stepper-btn">
          -
        </button>
        <input
          type="number"
          min={field.min || 0}
          max={field.max || 999}
          className="calc-stepper-input"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button onClick={() => onChange((value || 0) + 1)} className="calc-stepper-btn">
          +
        </button>
      </div>
    </div>
  );
}

function ModernCalculatorPanel({ onOpenRequestPage, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(calculatorConfig.defaults);
  const [stepError, setStepError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const result = useMemo(() => estimatePrice(form), [form]);
  const wizardLabels = useMemo(() => getWizardLabelsForFlow(form), [form]);
  const visibleTechnologyGroups = useMemo(() => getVisibleTechnologyGroups(form), [form]);
  const visibleExtensionFields = useMemo(() => getVisibleExtensionFields(form), [form]);
  const isMFH = isMultiFamilyProject(form.objectType);
  const { index: stepIndex, total: totalSteps } = useMemo(() => getStepPosition(step, form), [step, form]);
  const progress = Math.round((((stepIndex >= 0 ? stepIndex : 0) + 1) / totalSteps) * 100);

  const updateField = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "objectType" && value !== "einfamilienhaus") {
        next.doorbell = false;
        next.wallbox = "none";
        next.outdoorArea = false;
        next.cellar = false;
      }
      if (key === "underfloorHeating" && !value) {
        next.thermostats = 0;
      }
      return next;
    });
    setStepError("");
  };

  const nextStep = () => {
    const error = validateStep(step, form);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    const next = getNextStep(step, form);
    if (next !== step) setStep(next);
  };

  const prevStep = () => {
    setStepError("");
    const previous = getPreviousStep(step, form);
    if (previous !== step) setStep(previous);
  };

  const handleSubmit = async () => {
    const error = validateStep(step, form);
    if (error) {
      setStepError(error);
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "estimator",
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.zip,
          message: form.message,
          estimator: {
            objectType: form.objectType,
            sqm: form.sqm,
            packageType: form.packageType,
            low: result.low,
            high: result.high,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unbekannter Fehler");
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Anfrage konnte nicht gesendet werden. Bitte ruf uns direkt an oder schreib per WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderBooleanCard = (field) => (
    <button
      key={field.key}
      onClick={() => updateField(field.key, !form[field.key])}
      className={`calc-option-card ${form[field.key] ? "selected" : ""}`}
    >
      <div className="calc-option-content">
        <div className="calc-option-main">
          <span className="calc-option-label">{field.label}</span>
          {field.price ? <span className="calc-option-price">+{formatEUR(field.price)}</span> : null}
        </div>
        {field.hint ? <span className="calc-option-hint">{field.hint}</span> : null}
      </div>
      <div className="calc-option-checkbox">{form[field.key] && <Check size={16} />}</div>
    </button>
  );

  const renderEnumCard = (field) => (
    <div key={field.key} className="calc-step" style={{ padding: 0 }}>
      <h3 className="calc-step-title" style={{ fontSize: "1.05rem", marginBottom: "1rem" }}>{field.label}</h3>
      <div className="calc-project-grid">
        {field.options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateField(field.key, option.value)}
            className={`calc-project-card ${form[field.key] === option.value ? "selected" : ""}`}
          >
            <div className="calc-project-content">
              <span className="calc-project-label">{option.label}</span>
              <span className="calc-project-hint">{option.price > 0 ? `+${formatEUR(option.price)}` : "Kein Aufpreis"}</span>
            </div>
            <div className="calc-project-check">
              <Check size={18} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="modern-calculator">
        <div className="calc-content" style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <Check size={48} style={{ color: "var(--green)", margin: "0 auto 1.5rem" }} />
          <h2 className="calc-step-title">Anfrage gesendet!</h2>
          <p style={{ color: "var(--text-soft)", marginTop: "1rem" }}>
            Wir melden uns innerhalb von 24 Stunden bei dir zurück.
          </p>
          {onClose && (
            <button onClick={onClose} className="calc-btn calc-btn-primary" style={{ marginTop: "2rem" }}>
              Zurück zur Startseite
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="modern-calculator">
      <div className="calc-header">
        <div className="calc-header-top">
          {onClose && step === 1 && (
            <button onClick={onClose} className="calc-close-btn">
              <ArrowLeft size={16} />
              <span>Zurück</span>
            </button>
          )}
          <div className="calc-title">
            <Sparkles size={20} />
            <span>Kosteneinschätzung</span>
          </div>
        </div>

        <div className="calc-progress-wrapper">
          <div className="calc-progress-info">
            <span className="calc-progress-text">Schritt {stepIndex + 1} von {totalSteps}</span>
            <span className="calc-progress-percent">{progress}%</span>
          </div>
          <div className="calc-progress-track">
            <div className="calc-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="calc-steps-indicator">
          {wizardLabels.map((label, index) => (
            <div key={label} className={`calc-step-dot ${index === stepIndex ? "active" : ""} ${index < stepIndex ? "done" : ""}`}>
              {index < stepIndex && <Check size={12} />}
            </div>
          ))}
        </div>
      </div>

      <div className="calc-content">
        {step === 1 && (
          <div className="calc-step">
            <h2 className="calc-step-title">Für welches Objekt planst du die Elektroarbeiten?</h2>

            <div className="calc-object-grid">
              {calculatorConfig.objectChoices.map((item) => {
                const Icon = iconMap[item.icon] || Home;
                return (
                  <button
                    key={item.value}
                    onClick={() => updateField("objectType", item.value)}
                    className={`calc-object-card ${form.objectType === item.value ? "selected" : ""}`}
                  >
                    <div className="calc-object-icon">
                      <Icon size={28} />
                    </div>
                    <span className="calc-object-label">{item.label}</span>
                    <div className="calc-object-check">
                      <Check size={16} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="calc-input-group">
              <label className="calc-label">
                <span>Wohnfläche / Nutzfläche</span>
                <span className="calc-label-hint">in m²</span>
              </label>
              <div className="calc-input-wrapper">
                <input
                  type="number"
                  className="calc-input"
                  value={form.sqm}
                  onChange={(e) => updateField("sqm", e.target.value)}
                  placeholder="z. B. 85"
                />
                <span className="calc-input-unit">m²</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="calc-step">
            <h2 className="calc-step-title">Welches Ausstattungsniveau passt zu deinem Projekt?</h2>
            <div className="calc-brand-grid">
              {calculatorConfig.packageChoices.map((item) => (
                <button
                  key={item.value}
                  onClick={() => updateField("packageType", item.value)}
                  className={`calc-brand-card ${form.packageType === item.value ? "selected" : ""}`}
                >
                  <div className="calc-brand-header">
                    <span className="calc-brand-label">{item.label}</span>
                    {item.popular ? (
                      <span className="calc-brand-badge">
                        <TrendingUp size={12} />
                        Beliebt
                      </span>
                    ) : null}
                  </div>
                  <p className="calc-brand-desc">{item.description}</p>
                  <div className="calc-brand-examples">
                    <span className="calc-brand-example">{item.pricePerSqm} €/m²</span>
                  </div>
                  <div className="calc-brand-check">
                    <Check size={18} />
                  </div>
                </button>
              ))}
            </div>

            {isMFH && (
              <div className="calc-info-box">
                <Info size={18} />
                <p>Bei Mehrparteienhäusern zeigen wir bewusst nur eine grobe Schätzung. Technik und Erweiterungen werden hier nicht einzeln abgefragt.</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && !isMFH && (
          <div className="calc-step">
            <h2 className="calc-step-title">Welche Technik soll berücksichtigt werden?</h2>
            {visibleTechnologyGroups.map((group) => (
              <div key={group.key} className="calc-summary-section" style={{ marginBottom: "1rem" }}>
                <h3>{group.title}</h3>
                <div className="calc-components-list">
                  {group.fields.map((field) => {
                    if (field.type === "boolean") return renderBooleanCard(field);
                    if (field.type === "integer") {
                      return (
                        <StepperField
                          key={field.key}
                          field={field}
                          value={form[field.key]}
                          onChange={(nextValue) => updateField(field.key, nextValue)}
                        />
                      );
                    }
                    if (field.type === "enum") return renderEnumCard(field);
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 4 && !isMFH && (
          <div className="calc-step">
            <h2 className="calc-step-title">Welche Erweiterungen sollen zusätzlich einfließen?</h2>
            <div className="calc-components-list">
              {visibleExtensionFields.map((field) => (
                <StepperField
                  key={field.key}
                  field={field}
                  value={form[field.key]}
                  onChange={(nextValue) => updateField(field.key, nextValue)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="calc-step">
            <h2 className="calc-step-title">Deine Kostenschätzung</h2>

            <div className="calc-result-card">
              <div className="calc-result-header">
                <Zap size={24} className="calc-result-icon" />
                <div className="calc-result-main">
                  <span className="calc-result-label">{result.mode === "range" ? "Grobe Schätzung" : "Geschätzte Kosten"}</span>
                  <div className="calc-result-price">
                    {result.mode === "range"
                      ? `${formatEUR(result.low)} – ${formatEUR(result.high)}`
                      : formatEUR(result.total)}
                  </div>
                </div>
              </div>

              <div className="calc-result-note">
                <Info size={16} />
                <p>
                  {result.mode === "range"
                    ? "Bei Mehrparteienhäusern ist ohne Objektprüfung nur eine grobe Spanne sinnvoll."
                    : "Dies ist eine erste Orientierung. Ein genaues Angebot erstellen wir nach Besichtigung."}
                </p>
              </div>
            </div>

            <div className="calc-summary-sections">
              <div className="calc-summary-section">
                <h3>Deine Angaben</h3>
                <div className="calc-summary-grid">
                  <div className="calc-summary-item">
                    <span>Objektart</span>
                    <strong>{calculatorConfig.objectChoices.find((c) => c.value === form.objectType)?.label}</strong>
                  </div>
                  <div className="calc-summary-item">
                    <span>Fläche</span>
                    <strong>{form.sqm} m²</strong>
                  </div>
                  <div className="calc-summary-item">
                    <span>Paket</span>
                    <strong>{calculatorConfig.packageChoices.find((c) => c.value === form.packageType)?.label}</strong>
                  </div>
                </div>
              </div>

              {!isMFH && result.breakdown?.length > 0 && (
                <div className="calc-summary-section">
                  <h3>Preisaufstellung</h3>
                  <div className="calc-result-breakdown" style={{ marginTop: 0 }}>
                    {result.breakdown.map((item) => (
                      <div key={item.key} className="calc-breakdown-item">
                        <span>{item.label}</span>
                        <span>{formatEUR(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="calc-step">
            <h2 className="calc-step-title">Fast geschafft! Wie können wir dich erreichen?</h2>

            <div className="calc-contact-form">
              <div className="calc-input-group">
                <label className="calc-label">Name *</label>
                <input type="text" className="calc-input" value={form.name || ""} onChange={(e) => updateField("name", e.target.value)} placeholder="Dein Name" />
              </div>

              <div className="calc-input-row">
                <div className="calc-input-group">
                  <label className="calc-label">Telefon</label>
                  <input type="tel" className="calc-input" value={form.phone || ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="0176 123 456" />
                </div>
                <div className="calc-input-group">
                  <label className="calc-label">E-Mail</label>
                  <input type="email" className="calc-input" value={form.email || ""} onChange={(e) => updateField("email", e.target.value)} placeholder="deine@email.de" />
                </div>
              </div>

              <div className="calc-input-group">
                <label className="calc-label">PLZ / Ort *</label>
                <input type="text" className="calc-input" value={form.zip || ""} onChange={(e) => updateField("zip", e.target.value)} placeholder="z. B. 33098 Paderborn" />
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Nachricht (optional)</label>
                <textarea className="calc-textarea" value={form.message || ""} onChange={(e) => updateField("message", e.target.value)} placeholder="Gibt es noch etwas, das wir wissen sollten?" rows="4" />
              </div>

              <div className="calc-info-box">
                <Info size={16} />
                <p>Wir melden uns innerhalb von 24 Stunden bei dir zurück.</p>
              </div>
            </div>
          </div>
        )}

        {stepError && <div className="calc-error">{stepError}</div>}
      </div>

      <div className="calc-footer">
        <button onClick={prevStep} disabled={stepIndex === 0} className="calc-btn calc-btn-secondary">
          <ArrowLeft size={18} />
          Zurück
        </button>

        {step === totalSteps ? (
          <>
            {submitError && <div className="calc-error" style={{ marginBottom: "0.75rem" }}>{submitError}</div>}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="calc-btn calc-btn-primary"
            >
              {submitting ? "Wird gesendet…" : "Anfrage absenden"}
              {!submitting && <Check size={18} />}
            </button>
          </>
        ) : (
          <button onClick={nextStep} className="calc-btn calc-btn-primary">
            Weiter
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ModernCalculatorPanel;
