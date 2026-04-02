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
  if (sqm > 5000) return "Bitte gib eine realistische Fläche ein oder stelle direkt eine Anfrage.";
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

function validateNonNegativeInteger(value, label, max = 100) {
  const numeric = toNumber(value);
  if (!Number.isFinite(numeric) || numeric < 0) return `Bitte prüfe das Feld „${label}“.`;
  if (numeric > max) return `Die Angabe bei „${label}“ wirkt zu hoch. Bitte prüfe den Wert.`;
  return "";
}

export function validateStep(step, form) {
  if (step === 1) {
    if (!form.objectType) return "Bitte wähle zuerst die Objektart.";
    return validateSqm(form);
  }

  if (step === 2) {
    if (!form.packageType) return "Bitte wähle ein Paket aus.";
    return "";
  }

  if (step === 3) {
    const checks = [
      [form.uvCount, "Unterverteilungen", 10],
      [form.thermostats, "Raumthermostate", 30],
      [form.networkPoints, "Netzwerkanschlüsse", 50],
      [form.jalousieCount, "Jalousien", 50],
    ];

    for (const [value, label, max] of checks) {
      const error = validateNonNegativeInteger(value, label, max);
      if (error) return error;
    }
  }

  if (step === 4) {
    return validateNonNegativeInteger(form.additionalSockets, "zusätzliche Steckdosen", 100);
  }

  if (step === 6) {
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
