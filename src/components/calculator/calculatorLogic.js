import { calculatorConfig } from "../../config/calculatorConfig";

function toNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return numeric;
}

function roundToHundreds(value) {
  return Math.round(value / 100) * 100;
}

function getPackageDefinition(packageType) {
  return calculatorConfig.packageChoices.find((item) => item.value === packageType);
}

function getFieldDefinition(key) {
  return calculatorConfig.fields[key];
}

export function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function isMultiFamilyProject(objectType) {
  return objectType === "mehrparteienhaus";
}

export function getVisibleFields(form, keys) {
  return keys
    .map((key) => getFieldDefinition(key))
    .filter(Boolean)
    .filter((field) => (field.visibleWhen ? field.visibleWhen(form) : true));
}

export function getVisibleTechnologyGroups(form) {
  return Object.entries(calculatorConfig.technologyGroups).map(([groupKey, group]) => ({
    key: groupKey,
    title: group.title,
    fields: getVisibleFields(form, group.fields),
  }));
}

export function getVisibleExtensionFields(form) {
  return getVisibleFields(form, ["additionalSockets"]);
}

export function getSanitizedForm(form) {
  const sanitized = {
    ...form,
    sqm: toNumber(form.sqm),
  };

  Object.values(calculatorConfig.fields).forEach((field) => {
    const isVisible = field.visibleWhen ? field.visibleWhen(sanitized) : true;
    if (field.type === "integer") {
      sanitized[field.key] = isVisible ? toNumber(form[field.key]) : 0;
    }
    if (field.type === "boolean" && !isVisible) {
      sanitized[field.key] = false;
    }
    if (field.type === "enum" && !isVisible) {
      sanitized[field.key] = field.options?.[0]?.value ?? "";
    }
  });

  if (!sanitized.underfloorHeating) sanitized.thermostats = 0;
  return sanitized;
}

function getFieldPrice(field, value) {
  if (field.type === "boolean") return value ? field.price || 0 : 0;
  if (field.type === "integer") return toNumber(value) * (field.pricePerUnit || 0);
  if (field.type === "enum") {
    const option = field.options?.find((item) => item.value === value);
    return option?.price || 0;
  }
  return 0;
}

export function estimatePrice(data) {
  const form = getSanitizedForm(data);
  const pkg = getPackageDefinition(form.packageType);
  const basePrice = (pkg?.pricePerSqm || 0) * form.sqm;

  if (isMultiFamilyProject(form.objectType)) {
    const range = calculatorConfig.mfhRanges[form.packageType] ?? 0.2;
    const low = roundToHundreds(basePrice * (1 - range));
    const high = roundToHundreds(basePrice * (1 + range));
    return {
      mode: "range",
      basePrice: roundToHundreds(basePrice),
      total: 0,
      low,
      high,
      breakdown: [],
    };
  }

  const breakdown = [
    {
      key: "basis",
      label: `${pkg?.label || "Paket"} (${pkg?.pricePerSqm || 0} €/m²)`,
      value: roundToHundreds(basePrice),
    },
  ];

  const appendFieldBreakdown = (field) => {
    const value = form[field.key];
    const price = getFieldPrice(field, value);
    if (!price) return;

    let suffix = "";
    if (field.type === "integer") suffix = ` (${value} ${field.unitLabel || "Stück"})`;
    if (field.type === "enum") {
      const option = field.options?.find((item) => item.value === value);
      suffix = option ? ` (${option.label})` : "";
    }

    breakdown.push({
      key: field.key,
      label: `${field.label}${suffix}`,
      value: roundToHundreds(price),
    });
  };

  getVisibleTechnologyGroups(form).forEach((group) => group.fields.forEach(appendFieldBreakdown));
  getVisibleExtensionFields(form).forEach(appendFieldBreakdown);

  const total = roundToHundreds(breakdown.reduce((sum, item) => sum + item.value, 0));

  return {
    mode: "exact",
    basePrice: roundToHundreds(basePrice),
    total,
    low: total,
    high: total,
    breakdown,
  };
}
