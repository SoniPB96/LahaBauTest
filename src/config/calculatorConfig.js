export const calculatorConfig = {
  titleEyebrow: "Erste Kosteneinschätzung Elektrik",
  title: "Unverbindliche Kosteneinschätzung für Elektroarbeiten",
  text:
    "Der Rechner dient ausschließlich als erste Orientierung. Er ersetzt kein Aufmaß, keine technische Prüfung und kein verbindliches Angebot.",
  disclaimer:
    "Dies ist nur eine unverbindliche erste Kostenschätzung und ersetzt kein verbindliches Angebot vor Ort.",
  sidebarTitle: "Kurzübersicht",
  resultFactorsTitle: "Wovon der Endpreis abhängt",
  resultFactors: [
    "Projektart und Umfang",
    "Bestand und Zustand der Anlage",
    "Anzahl der Räume ohne Küche und Badezimmer",
    "Ausstattung in den übrigen Räumen",
    "Zusatzoptionen wie Unterverteilung, Küche, Bad oder Außenbereich",
    "Schalterprogramm und gewünschtes Niveau",
  ],
  requestNote:
    "Die Anfrage wird aktuell noch nicht direkt aus dem Rechner versendet. Nach dem letzten Schritt gelangst du zur Anfrageseite und kannst dort den Kontaktweg wählen.",

  stepDefinitions: {
    1: { label: "Objekt" },
    2: { label: "Projekt" },
    3: { label: "Optionen" },
    4: { label: "Ausstattung" },
    5: { label: "Material" },
    6: { label: "Ergebnis" },
    7: { label: "Anfrage" },
  },

  wizardLabels: ["Objekt", "Projekt", "Optionen", "Ausstattung", "Material", "Ergebnis", "Anfrage"],
  directInquiryWizardLabels: ["Objekt", "Projekt", "Anfrage"],

  objectChoices: [
    { value: "wohnung", label: "Wohnung", icon: "home" },
    { value: "einfamilienhaus", label: "Einfamilienhaus", icon: "home" },
    { value: "mehrfamilienhaus", label: "Einheit im Mehrfamilienhaus", icon: "building" },
    { value: "gewerbe", label: "Gewerbe", icon: "building" },
  ],

  projectChoices: [
    { value: "neubau_neuinstallation", label: "Neubau / Neuinstallation", basePrice: 2600, sqmPrice: 75 },
    { value: "sanierung_altbau", label: "Sanierung / Altbau", basePrice: 1600, sqmPrice: 46 },
    { value: "erweiterung", label: "Erweiterung", directInquiry: true },
    { value: "zaehlerschrank", label: "Zählerschrank erneuern", directInquiry: true },
  ],

  optionsTitle: "Zusatzoptionen",
  optionsHint:
    "Wähle hier aus, welche Zusatzbereiche oder Vorbereitungen im Projekt berücksichtigt werden sollen.",
  options: [
    { key: "uv", label: "Neue Unterverteilung", price: 1450 },
    { key: "zaehlerschrank", label: "Zählerschrank erneuern", price: 3200 },
    { key: "lan", label: "LAN / Netzwerk verlegen", price: 820 },
    { key: "aussenbereich", label: "Außenbereich", price: 990 },
    { key: "kueche", label: "Küche neu installieren", price: 2600 },
    { key: "bad", label: "Bad neu installieren", price: 2200 },
    { key: "fussbodenheizung", label: "Fußbodenheizung", price: 1250 },
    { key: "waermepumpe", label: "Vorbereitung für Wärmepumpe", price: 920 },
    { key: "wallbox", label: "Vorbereitung für Wallbox", price: 1180 },
  ],

  roomInfoTitle: "Ausstattung ohne Küche und Badezimmer",
  roomInfoText:
    "Bitte gib hier zuerst an, wie viele Räume das Objekt ohne Küche und Badezimmer hat. Erst danach folgt die Ausstattung für diese übrigen Räume.",
  componentFields: [
    { key: "rooms", label: "Raumanzahl ohne Küche und Badezimmer", unitPrice: 220 },
    { key: "steckdosen", label: "Steckdosen", unitPrice: 98 },
    { key: "schalter", label: "Lichtschalter", unitPrice: 82 },
    { key: "netzwerkdosen", label: "Netzwerkdosen", unitPrice: 149, requiresOption: "lan" },
    { key: "lampenauslaesse", label: "Lampenauslässe", unitPrice: 92 },
    { key: "rollladenschalter", label: "Rollladenschalter", unitPrice: 136 },
    { key: "raumthermostate", label: "Raumthermostate für Fußbodenheizung", unitPrice: 210, requiresOption: "fussbodenheizung" },
  ],

  materialTitle: "Schalterprogramm / Materiallinie",
  materialInfo:
    "Hier wählst du das gewünschte Schalterprogramm. Die Auswahl beeinflusst vor allem das Materialniveau und den späteren Preisbereich.",
  brandChoices: [
    { value: "gira", label: "Gira", badge: "Hausmarke", accentClass: "accent-gold", factor: 1.12 },
    { value: "merten", label: "Merten", accentClass: "accent-silver", factor: 1.08 },
    { value: "schneider", label: "Schneider Electric", accentClass: "accent-blue", factor: 1.1 },
    { value: "jung", label: "JUNG", accentClass: "accent-violet", factor: 1.13 },
    { value: "buschjaeger", label: "Busch-Jaeger", accentClass: "accent-green", factor: 1.09 },
  ],

  defaults: {
    objectType: "wohnung",
    sqm: "85",
    projectType: "sanierung_altbau",
    rooms: 3,
    steckdosen: 12,
    schalter: 8,
    netzwerkdosen: 2,
    lampenauslaesse: 6,
    rollladenschalter: 0,
    raumthermostate: 0,
    brand: "gira",
    options: {
      uv: false,
      zaehlerschrank: false,
      lan: false,
      aussenbereich: false,
      kueche: false,
      bad: false,
      fussbodenheizung: false,
      waermepumpe: false,
      wallbox: false,
    },
    fileName: "",
    name: "",
    phone: "",
    email: "",
    zip: "",
    message: "",
  },

  pricing: {
    objectFactor: {
      wohnung: 1,
      einfamilienhaus: 1.05,
      mehrfamilienhaus: 1.03,
      gewerbe: 1.12,
    },
    range: 0.14,
    laborShare: 0.56,
    materialShare: 0.31,
  },
};

calculatorConfig.optionChoices = calculatorConfig.options;
