import { getVisibleComponentFields } from "../components/calculatorLogic";
import { calculatorConfig } from "../config/calculatorConfig";

function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : NaN;
}

function isBlank(value) {
  return String(value ?? "").trim() === "";
}

function validateSqm(form) {
  const sqm = toNumber(form.sqm);
  if (!Number.isFinite(sqm) || sqm <= 0) return "Bitte gib eine sinnvolle Fläche in m² ein.";
  if (sqm < 15) return "Bitte prüfe die Fläche. Für die erste Einschätzung sollte sie mindestens 15 m² betragen.";
  if (sqm > 5000) return "Bitte gib eine realistische Fläche ein oder nutze direkt die Anfrage.";
  return "";
}

function validateEmail(email) {
  if (isBlank(email)) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim()) ? "" : "Bitte gib eine gültige E-Mail-Adresse ein.";
}

function validatePhone(phone) {
  if (isBlank(phone)) return "";
  const digits = String(phone).replace(/[^\d+]/g, "");
  return digits.length >= 6 ? "" : "Bitte gib eine erreichbare Telefonnummer ein.";
}

export function validateStep(step, form, { skipsCalculator } = {}) {
  if (step === 1) {
    if (!form.objectType) return "Bitte wähle zuerst die Objektart.";
    return validateSqm(form);
  }

  if (step === 2) {
    if (!form.projectType) return "Bitte wähle die Projektart aus.";
    return "";
  }

  if (step === 4 && !skipsCalculator) {
    const visibleFields = getVisibleComponentFields(form);

    for (const field of visibleFields) {
      const value = toNumber(form[field.key]);
      if (!Number.isFinite(value)) return `Bitte prüfe das Feld „${field.label}“.`;

      const min = Number.isFinite(field.min) ? field.min : 0;
      const max = Number.isFinite(field.max) ? field.max : 500;

      if (value < min) {
        if (field.key === "rooms") return "Bitte gib mindestens einen Raum an.";
        return `Bitte gib bei „${field.label}“ mindestens ${min} an.`;
      }

      if (value > max) {
        if (field.key === "rooms") return "Bitte prüfe die Raumanzahl. Für sehr große Projekte ist eine direkte Anfrage sinnvoller.";
        return `Die Angabe bei „${field.label}“ wirkt zu hoch. Bitte prüfe den Wert.`;
      }
    }

    const project = calculatorConfig.projectChoices.find((item) => item.value === form.projectType);
    const sqm = toNumber(form.sqm);
    const rooms = toNumber(form.rooms);
    if (project?.value === "sanierung_altbau" && sqm >= 120 && rooms <= 1) {
      return "Die Kombination aus großer Fläche und sehr wenigen Räumen wirkt unplausibel. Bitte prüfe die Raumanzahl.";
    }
  }

  if (step === 7) {
    if (isBlank(form.name)) return "Bitte gib deinen Namen an.";
    if (isBlank(form.phone) && isBlank(form.email)) {
      return "Bitte hinterlege mindestens eine Telefonnummer oder E-Mail-Adresse.";
    }
    const emailError = validateEmail(form.email);
    if (emailError) return emailError;
    const phoneError = validatePhone(form.phone);
    if (phoneError) return phoneError;
    if (isBlank(form.zip)) return "Bitte gib PLZ oder Ort an, damit die Anfrage zugeordnet werden kann.";
  }

  return "";
}
