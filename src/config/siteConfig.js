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
    headline: "Handwerk, das hält — was es verspricht.",
    subheadline: "Beratung, als wäre es mein eigenes Objekt. Umsetzung, die ich selbst unterschreiben würde.",
    trustLine: "Ausführung in Zusammenarbeit mit zugelassenem Meisterbetrieb.",
    cta: {
      primary:   { label: "Projekt anfragen",     path: "/kontakt" },
      secondary: { label: "Kostenrechner öffnen", path: "/rechner" },
    },
  },

  services: {
    eyebrow: "Leistungen",
    title: "Leistungen für Privatkunden",
    items: [
      { key: "installation", icon: "zap",        title: "Elektroinstallation",       text: "Neuinstallation und Modernisierung für Wohnung und Haus." },
      { key: "distribution", icon: "wrench",     title: "Vollsanierung",             text: "Umfangreiche Sanierungen in Zusammenarbeit mit lokalen Partnerbetrieben." },
      { key: "lighting",     icon: "sun",        title: "Beleuchtungskonzept",       text: "Individuelle Innen- und Außenbeleuchtung nach Ihren Vorstellungen." },
      { key: "network",      icon: "network",    title: "Netzwerk & Datenleitungen", text: "Strukturierte Verkabelung für Homeoffice und Haustechnik." },
      { key: "estimator",    icon: "calculator", title: "Digitale Ersteinschätzung", text: "Realistische Preisspanne statt ungenauem Angebot." },
      { key: "quality",      icon: "check",      title: "Transparente Kosten",       text: "Nachvollziehbare Abrechnung, faire Preise — kein versteckter Nachschlag." },
    ],
  },

  begleitung: {
    eyebrow: "Baubegleitung",
    title: "Baubegleitung mit lokalen Partnern",
    text: "Ob selbst bewohnt oder zur Vermietung: Ich begleite Ihr Projekt so, als wäre es meins — mit einem Ansprechpartner für alle Gewerke.",
    points: [
      "Abstimmung mit lokalen Fachbetrieben",
      "Ein fester Ansprechpartner als Bauleiter",
      "Für einfache bis hochwertige Sanierungsstandards",
      "Geordnete Umsetzung aller Gewerke",
    ],
    cards: [
      { title: "Zweckmäßige Sanierung",   text: "Funktionale Umsetzung mit klarem Kostenfokus." },
      { title: "Gehobene Modernisierung", text: "Bessere Materialien, koordinierter Ablauf." },
      { title: "Hochwertige Sanierung",   text: "Anspruchsvolle Ausführung mit sorgfältiger Materialwahl." },
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
    text: "Kein Formular-Ping-Pong. Kurze Beschreibung, ehrliche Einschätzung — dann entscheiden wir gemeinsam, wie es weitergeht.",
    quickTitle: "Direkte Kontaktwege",
    quickText: "Locker starten, strukturiert umsetzen: Schreiben Sie einfach, wie es Ihnen passt.",
    listTitle: "So läuft eine Anfrage ab",
    listItems: [
      "Kurze Beschreibung des Projekts",
      "Optional: Grundriss oder Fotos mitsenden",
      "Ehrliche Einschätzung — kein Verkaufsgespräch",
      "Termin oder Besichtigung, wenn sinnvoll",
    ],
  },
};

export default siteConfig;
