import { calculatorAdmin } from "./calculatorAdmin";

export const calculatorConfig = {
  titleEyebrow: calculatorAdmin.texts.titleEyebrow,
  title: calculatorAdmin.texts.title,
  text: calculatorAdmin.texts.intro,
  disclaimer: calculatorAdmin.texts.disclaimer,
  requestNote: calculatorAdmin.texts.requestNote,

  stepDefinitions: {
    1: { label: "Objekt" },
    2: { label: "Paket" },
    3: { label: "Technik" },
    4: { label: "Erweiterungen" },
    5: { label: "Ergebnis" },
    6: { label: "Anfrage" },
  },

  objectChoices: calculatorAdmin.objectTypes,
  packageChoices: calculatorAdmin.packageTypes,
  technologyGroups: calculatorAdmin.technologyGroups,
  fields: calculatorAdmin.fields,
  defaults: calculatorAdmin.defaults,
  mfhRanges: calculatorAdmin.mfhRanges,
};
