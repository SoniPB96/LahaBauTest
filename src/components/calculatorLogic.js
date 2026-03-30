import { calculatorConfig } from "../config/calculatorConfig";

function toNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return numeric;
}

function clampShare(value, fallback = 0) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  if (numeric < 0) return 0;
  if (numeric > 1) return 1;
  return numeric;
}

function splitLineItem(total, materialShare = 0) {
  const safeTotal = toNumber(total);
  const safeShare = clampShare(materialShare, 0);
  const material = safeTotal * safeShare;
  return {
    total: safeTotal,
    material,
    labor: safeTotal - material,
  };
}

function getProjectDefinition(projectType) {
  return calculatorConfig.projectChoices.find((item) => item.value === projectType);
}

function getBrandDefinition(brand) {
  return calculatorConfig.brandChoices.find((item) => item.value === brand);
}

export function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function isDirectInquiryProject(projectType) {
  return Boolean(getProjectDefinition(projectType)?.directInquiry);
}

export function getWizardLabels(form) {
  return isDirectInquiryProject(form.projectType)
    ? calculatorConfig.directInquiryWizardLabels
    : calculatorConfig.wizardLabels;
}

export function getVisibleComponentFields(form) {
  return calculatorConfig.componentFields.filter((field) => {
    if (!field.requiresOption) return true;
    return Boolean(form.options?.[field.requiresOption]);
  });
}

export function getSelectedOptions(form) {
  return calculatorConfig.options.filter((item) => Boolean(form.options?.[item.key]));
}

export function getSanitizedForm(form) {
  const visibleFieldKeys = new Set(getVisibleComponentFields(form).map((field) => field.key));
  const sanitized = {
    ...form,
    sqm: toNumber(form.sqm),
  };

  calculatorConfig.componentFields.forEach((field) => {
    sanitized[field.key] = visibleFieldKeys.has(field.key) ? toNumber(form[field.key]) : 0;
  });

  return sanitized;
}

export function estimatePrice(data) {
  const form = getSanitizedForm(data);
  const pricing = calculatorConfig.pricing;
  const project = getProjectDefinition(form.projectType);
  const brand = getBrandDefinition(form.brand);

  if (!project || project.directInquiry) {
    return {
      total: 0,
      low: 0,
      high: 0,
      labor: 0,
      material: 0,
      optionTotal: 0,
      componentTotal: 0,
      baseTotal: 0,
      sqmTotal: 0,
    };
  }

  const baseLine = splitLineItem(project.basePrice || 0, project.baseMaterialShare ?? pricing.defaultBaseMaterialShare);
  const sqmLine = splitLineItem((project.sqmPrice || 0) * form.sqm, project.sqmMaterialShare ?? pricing.defaultSqmMaterialShare);

  const componentLines = getVisibleComponentFields(form).map((field) => {
    const total = toNumber(form[field.key]) * (field.unitPrice || 0);
    return {
      key: field.key,
      ...splitLineItem(total, field.materialShare ?? pricing.defaultComponentMaterialShare),
    };
  });

  const optionLines = getSelectedOptions(form).map((option) => ({
    key: option.key,
    ...splitLineItem(option.price || 0, option.materialShare ?? pricing.defaultOptionMaterialShare),
  }));

  const componentTotal = componentLines.reduce((sum, item) => sum + item.total, 0);
  const optionTotal = optionLines.reduce((sum, item) => sum + item.total, 0);
  const subtotal = baseLine.total + sqmLine.total + componentTotal + optionTotal;

  const materialBeforeBrand = baseLine.material + sqmLine.material
    + componentLines.reduce((sum, item) => sum + item.material, 0)
    + optionLines.reduce((sum, item) => sum + item.material, 0);

  const laborBeforeBrand = subtotal - materialBeforeBrand;
  const brandFactor = brand?.factor || 1;
  const objectFactor = pricing.objectFactor[form.objectType] || 1;
  const materialAfterBrand = materialBeforeBrand * brandFactor;
  const totalBeforeObjectFactor = laborBeforeBrand + materialAfterBrand;
  const total = totalBeforeObjectFactor * objectFactor;

  return {
    baseTotal: Math.round(baseLine.total),
    sqmTotal: Math.round(sqmLine.total),
    componentTotal: Math.round(componentTotal),
    optionTotal: Math.round(optionTotal),
    subtotal: Math.round(subtotal),
    materialBeforeBrand: Math.round(materialBeforeBrand),
    laborBeforeBrand: Math.round(laborBeforeBrand),
    totalBeforeObjectFactor: Math.round(totalBeforeObjectFactor),
    total: Math.round(total),
    low: Math.round(total * (1 - pricing.range)),
    high: Math.round(total * (1 + pricing.range)),
    labor: Math.round(laborBeforeBrand * objectFactor),
    material: Math.round(materialAfterBrand * objectFactor),
    brandFactor,
    objectFactor,
  };
}
