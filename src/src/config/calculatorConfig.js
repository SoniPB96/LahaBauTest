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
    "Frontend-Stand: Das Formular ist bewusst nur visuell vorbereitet und noch nicht an einen echten Versand angebunden.",

  wizardLabels: ["Objekt", "Projekt", "Optionen", "Ausstattung", "Material", "Ergebnis", "Anfrage"],

  objectChoices: [
    { value: "wohnung", label: "Wohnung", icon: "home" },
    { value: "einfamilienhaus", label: "Einfamilienhaus", icon: "home" },
    { value: "mehrfamilienhaus", label: "Einheit im Mehrfamilienhaus", icon: "building" },
    { value: "gewerbe", label: "Gewerbe", icon: "building" },
  ],

  projectChoices: [
    { value: "neubau_neuinstallation", label: "Neubau / Neuinstallation" },
    { value: "sanierung_altbau", label: "Sanierung / Altbau" },
    { value: "erweiterung", label: "Erweiterung" },
    { value: "zaehlerschrank", label: "Zählerschrank erneuern" },
  ],

  optionsTitle: "Zusatzoptionen",
  optionsHint:
    "Wähle hier aus, welche Zusatzbereiche oder Vorbereitungen im Projekt berücksichtigt werden sollen.",
  optionChoices: [
    { key: "uv", label: "Neue Unterverteilung" },
    { key: "zaehlerschrank", label: "Zählerschrank erneuern" },
    { key: "lan", label: "LAN / Netzwerk verlegen" },
    { key: "aussenbereich", label: "Außenbereich" },
    { key: "kueche", label: "Küche neu installieren" },
    { key: "bad", label: "Bad neu installieren" },
    { key: "fussbodenheizung", label: "Fußbodenheizung" },
    { key: "waermepumpe", label: "Vorbereitung für Wärmepumpe" },
    { key: "wallbox", label: "Vorbereitung für Wallbox" },
  ],

  roomInfoTitle: "Ausstattung ohne Küche und Badezimmer",
  roomInfoText:
    "Bitte gib hier zuerst an, wie viele Räume das Objekt ohne Küche und Badezimmer hat. Erst danach folgt die Ausstattung für diese übrigen Räume.",
  componentFields: [
    { key: "rooms", label: "Raumanzahl ohne Küche und Badezimmer" },
    { key: "steckdosen", label: "Steckdosen" },
    { key: "schalter", label: "Lichtschalter" },
    { key: "netzwerkdosen", label: "Netzwerkdosen", requiresOption: "lan" },
    { key: "lampenauslaesse", label: "Lampenauslässe" },
    { key: "rollladenschalter", label: "Rollladenschalter" },
    { key: "raumthermostate", label: "Raumthermostate für Fußbodenheizung", requiresOption: "fussbodenheizung" },
  ],

  materialTitle: "Schalterprogramm / Materiallinie",
  materialInfo:
    "Hier wählst du das gewünschte Schalterprogramm. Die Auswahl beeinflusst vor allem das Materialniveau und den späteren Preisbereich.",
  brandChoices: [
    { value: "gira", label: "Gira", badge: "Hausmarke", accentClass: "accent-gold" },
    { value: "merten", label: "Merten", accentClass: "accent-silver" },
    { value: "schneider", label: "Schneider Electric", accentClass: "accent-blue" },
    { value: "jung", label: "JUNG", accentClass: "accent-violet" },
    { value: "buschjaeger", label: "Busch-Jaeger", accentClass: "accent-green" },
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
    projectBase: {
      neubau_neuinstallation: 2600,
      sanierung_altbau: 1600,
    },
    sqm: {
      neubau_neuinstallation: 75,
      sanierung_altbau: 46,
    },
    components: {
      rooms: 220,
      steckdosen: 98,
      schalter: 82,
      netzwerkdosen: 149,
      lampenauslaesse: 92,
      rollladenschalter: 136,
      raumthermostate: 210,
    },
    options: {
      uv: 1450,
      zaehlerschrank: 3200,
      lan: 820,
      aussenbereich: 990,
      kueche: 2600,
      bad: 2200,
      fussbodenheizung: 1250,
      waermepumpe: 920,
      wallbox: 1180,
    },
    brandFactor: {
      gira: 1.12,
      merten: 1.08,
      schneider: 1.1,
      jung: 1.13,
      buschjaeger: 1.09,
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
  },
};
