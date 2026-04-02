export const siteConfig = {
  company: {
    name: "LAHA",
    subtitle: "BAUDIENSTLEISTUNGEN",
    email: "kontakt@laha-bau.de",
    phoneDisplay: "0176 / 820 67 106",
    phoneLink: "tel:+4917682067106",
    whatsappLink: "https://wa.me/4917682067106",
    region: "Paderborn und Umland",
  },

  navigation: {
    items: [
      { key: "start",        path: "/",             label: "Start" },
      { key: "rechner",      path: "/rechner",       label: "Kostenrechner" },
      { key: "baubegleitung",path: "/baubegleitung", label: "Baubegleitung" },
      { key: "kontakt",      path: "/kontakt",       label: "Kontakt" },
    ],
    ctaLabel: "Anfrage stellen",
  },

  hero: {
    badge: "Elektroarbeiten in Paderborn und Umgebung",
    headline: "Saubere Elektroarbeiten ohne Chaos auf der Baustelle.",
    subheadline: "Ein Ansprechpartner. Klare Planung. Saubere Umsetzung.",
    trustLine: "Planung und Ausführung in Zusammenarbeit mit Meisterbetrieb.",
    cta: {
      primary:   { label: "Projekt anfragen",      path: "/kontakt" },
      secondary: { label: "Kostenrechner öffnen",  path: "/rechner" },
    },
  },

  services: {
    eyebrow: "Leistungen",
    title: "Leistungen für Privatkunden",
    items: [
      { key: "installation", icon: "zap",        title: "Elektroinstallation",       text: "Neuinstallation und Modernisierung für Wohnung und Haus." },
      { key: "distribution", icon: "wrench",     title: "Unterverteilungen",          text: "Erweiterung und Erneuerung bestehender Sicherungstechnik." },
      { key: "lighting",     icon: "sun",        title: "Beleuchtung",                text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung." },
      { key: "network",      icon: "network",    title: "Netzwerk & Datenleitungen",  text: "Strukturierte Verkabelung für Homeoffice und Haustechnik." },
      { key: "estimator",    icon: "calculator", title: "Digitale Ersteinschätzung",  text: "Realistische Preisspanne statt ungenauem Festpreis." },
      { key: "quality",      icon: "check",      title: "Saubere Ausführung",         text: "Klare Abstimmung und nachvollziehbare Umsetzung." },
    ],
  },

  begleitung: {
    eyebrow: "Baubegleitung",
    title: "Baubegleitung mit lokalen Partnern",
    text: "Für umfangreichere Sanierungen: technische Begleitung und Koordination mit lokalen Partnerbetrieben.",
    points: [
      "Koordination mit lokalen Sanierungspartnern",
      "Ein fester Ansprechpartner als Bauleiter",
      "Für einfache bis hochwertige Sanierungsstandards",
      "Abgestimmte Umsetzung aller Gewerke",
    ],
    cards: [
      { title: "Zweckmäßige Sanierung",    text: "Kostenfokus mit sauberer, funktionaler Umsetzung." },
      { title: "Gehobene Modernisierung",  text: "Bessere Materialien und koordinierte Umsetzung." },
      { title: "Hochwertige Sanierung",    text: "Hoher Qualitätsanspruch mit feiner Materialauswahl." },
    ],
  },

  footer: {
    tagline: "Elektroarbeiten & Baubegleitung im Raum Paderborn.",
    copyright: `© ${new Date().getFullYear()} LAHA Baudienstleistungen · Paderborn`,
    columns: {
      pages:   { heading: "Seiten" },
      contact: { heading: "Kontakt" },
      legal:   { heading: "Rechtliches" },
    },
  },

  legal: {
    impressum: {
      path:  "/impressum",
      label: "Impressum",
      title: "Impressum",
      content: [
        {
          heading: "Angaben gemäß § 5 TMG",
          text: "LAHA Baudienstleistungen\nMustermann Straße 1\n33100 Paderborn",
        },
        {
          heading: "Kontakt",
          text: "Telefon: 0176 / 820 67 106\nE-Mail: kontakt@laha-bau.de",
        },
        {
          heading: "Hinweis",
          text: "Diese Seite befindet sich noch im Aufbau. Bitte nehmen Sie bei rechtlichen Fragen direkt Kontakt auf.",
        },
      ],
    },
    datenschutz: {
      path:  "/datenschutz",
      label: "Datenschutz",
      title: "Datenschutzerklärung",
      content: [
        {
          heading: "Allgemeine Hinweise",
          text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.",
        },
        {
          heading: "Datenerfassung auf dieser Website",
          text: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Kontaktdaten finden Sie im Impressum.",
        },
        {
          heading: "Hinweis",
          text: "Diese Datenschutzerklärung befindet sich noch im Aufbau. Bitte nehmen Sie bei Fragen direkt Kontakt auf.",
        },
      ],
    },
  },

  requestPage: {
    eyebrow: "Anfrage",
    title: "Projekt anfragen",
    text: "Wähle den passenden Kontaktweg: schnell per WhatsApp oder strukturiert per Formular.",
    quickTitle: "Direkte Kontaktwege",
    quickText: "Für schnelle Abstimmung eignet sich WhatsApp am besten.",
    listTitle: "So läuft die Anfrage ab",
    listItems: [
      "Kurze Beschreibung des Projekts",
      "Optional Grundriss oder Fotos mitsenden",
      "Erste Rückmeldung zur Einordnung",
      "Termin oder Besichtigung falls sinnvoll",
    ],
  },
};

export default siteConfig;
