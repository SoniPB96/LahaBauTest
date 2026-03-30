import { calculatorConfig } from "../config/calculatorConfig";

export function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function estimatePrice(data) {
  const p = calculatorConfig.pricing;
  const base = p.projectBase[data.projectType] || 0;
  const sqmPart = (p.sqm[data.projectType] || 0) * (Number(data.sqm) || 0);

  const componentSum =
    (Number(data.rooms) || 0) * p.components.rooms +
    (Number(data.steckdosen) || 0) * p.components.steckdosen +
    (Number(data.schalter) || 0) * p.components.schalter +
    (Number(data.netzwerkdosen) || 0) * p.components.netzwerkdosen +
    (Number(data.lampenauslaesse) || 0) * p.components.lampenauslaesse +
    (Number(data.rollladenschalter) || 0) * p.components.rollladenschalter +
    (Number(data.raumthermostate) || 0) * p.components.raumthermostate;

  const optionSum = Object.entries(data.options || {}).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (p.options[key] || 0);
  }, 0);

  const total =
    (base + sqmPart + componentSum + optionSum) *
    (p.brandFactor[data.brand] || 1) *
    (p.objectFactor[data.objectType] || 1);

  return {
    low: Math.round(total * (1 - p.range)),
    high: Math.round(total * (1 + p.range)),
    labor: Math.round(total * p.laborShare),
    material: Math.round(total * p.materialShare),
    extras: Math.round(total * p.extraShare),
  };
}

export function getVisibleComponentFields(form) {
  return calculatorConfig.componentFields.filter((field) => {
    if (!field.requiresOption) return true;
    return Boolean(form.options?.[field.requiresOption]);
  });
}

export function isDirectInquiryProject(projectType) {
  return projectType === "erweiterung" || projectType === "zaehlerschrank";
}
