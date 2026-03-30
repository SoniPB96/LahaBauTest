export const siteConfig = {
  company: {
    name: "LAHA",
    subtitle: "BAUDIENSTLEISTUNGEN",
    email: "kontakt@laha-bau.de",
    phoneDisplay: "0176 / 820 67 106",
    phoneLink: "tel:+4917682067106",
    whatsappLink: "https://wa.me/4917682067106",
    region: "Paderborn und Umland",
    primaryArea: "Elektroarbeiten in Paderborn und Umgebung",
  },

  hero: {
    badgePrimary: "Elektroarbeiten in Paderborn und Umgebung",
    badgeSecondary: "Unverbindliche Ersteinschätzung",
    headline: "Saubere Elektroarbeiten. Klare Kommunikation. Verlässliche Ausführung.",
    text:
      "Ich unterstütze Privatkunden bei Sanierung, Modernisierung und Erweiterung elektrischer Anlagen. Der Fokus liegt auf sauberer Ausführung, klarer Abstimmung und einer realistischen unverbindlichen Ersteinschätzung.",
    trustLine:
      "Elektroarbeiten im Raum Paderborn und Umgebung. Planung und Ausführung in Zusammenarbeit mit Meisterbetrieb.",
    trustItems: [
      "Saubere Ausführung",
      "Klare Abstimmung",
      "Realistische Ersteinschätzung",
      "Paderborn und Umland",
    ],
    estimatorCardInfo: "Unverbindliche Preisspanne auf Basis von Fläche, Ausstattung und Zusatzoptionen.",
  },

  navigation: {
    items: [
      { key: "start", label: "Start" },
      { key: "rechner", label: "Kostenschätzer" },
      { key: "kontakt", label: "Kontakt" },
    ],
    ctaLabel: "Anfrage stellen",
  },

  services: {
    eyebrow: "Leistungen",
    title: "Leistungsbereiche mit klarem Fokus auf Privatkunden",
    text:
      "Von der einzelnen Erweiterung bis zur strukturierten Sanierung ganzer Wohneinheiten: Die Leistungen sind bewusst klar, sachlich und handwerklich formuliert.",
    items: [
      {
        key: "installation",
        icon: "zap",
        title: "Elektroinstallation",
        text: "Neuinstallation, Modernisierung und strukturierte Elektroarbeiten für Wohnung, Haus und kleinere Einheiten.",
      },
      {
        key: "distribution",
        icon: "wrench",
        title: "Unterverteilungen & Schutztechnik",
        text: "Erweiterung, Erneuerung und sinnvolle Anpassung bestehender Unterverteilungen und Sicherungstechnik.",
      },
      {
        key: "lighting",
        icon: "sun",
        title: "Beleuchtung",
        text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung und passender Schaltlogik.",
      },
      {
        key: "network",
        icon: "network",
        title: "Netzwerk & Datenleitungen",
        text: "Strukturierte Verkabelung für Homeoffice, Medienpunkte und moderne Haustechnik.",
      },
      {
        key: "estimator",
        icon: "calculator",
        title: "Digitale Ersteinschätzung",
        text: "Mehrstufige Ersteinschätzung mit Preisspanne statt ungenauem Festpreisversprechen.",
      },
      {
        key: "quality",
        icon: "check",
        title: "Saubere Ausführung",
        text: "Fokus auf klare Abstimmung, nachvollziehbare Umsetzung und ruhige Kommunikation im Projekt.",
      },
    ],
  },

  contactSection: {
    eyebrow: "Kontakt",
    title: "Unverbindlich anfragen",
    text:
      "Die Kontaktseite ist bewusst einfach gehalten. Für den Frontend-Stand reichen direkte Kontaktwege und ein sauberer erster Eindruck.",
    formNote:
      "Frontend-Stand: Das Kontaktformular ist aktuell visuell vorbereitet, aber noch nicht an einen Versand angebunden.",
  },

  estimator: {
    titleEyebrow: "Kostenschätzer",
    title: "Unverbindliche Kostenschätzung für Elektroarbeiten",
    text:
      "Der Rechner dient ausschließlich als erste Orientierung. Er ersetzt kein Aufmaß, keine technische Prüfung und kein verbindliches Angebot.",
    disclaimer:
      "Dies ist nur eine unverbindliche erste Kostenschätzung und ersetzt kein verbindliches Angebot vor Ort.",
    sidebarTitle: "Kurzübersicht",
    resultFactorsTitle: "Wovon der Endpreis abhängt",
    resultFactors: [
      "Bestand und Zustand der Anlage",
      "Leitungswege und bauliche Gegebenheiten",
      "Verteilertechnik und Schutzmaßnahmen",
      "Materiallinie und Ausstattungsniveau",
      "Zusätzliche Arbeiten vor Ort",
    ],
    requestNote:
      "Frontend-Stand: Das Formular ist bewusst nur visuell vorbereitet und noch nicht an einen echten Versand angebunden.",

    wizardLabels: ["Objekt", "Projekt", "Ausstattung", "Optionen", "Material", "Ergebnis", "Anfrage"],

    objectChoices: [
      { value: "wohnung", label: "Wohnung", icon: "home" },
      { value: "einfamilienhaus", label: "Einfamilienhaus", icon: "home" },
      { value: "mehrfamilienhaus", label: "Einheit im Mehrfamilienhaus", icon: "building" },
      { value: "gewerbe", label: "Kleingewerbe", icon: "building" },
    ],

    projectChoices: [
      { value: "neuinstallation", label: "Komplette Neuinstallation" },
      { value: "sanierung", label: "Sanierung / Teilerneuerung" },
      { value: "erweiterung", label: "Erweiterung / einzelne Räume" },
      { value: "unterverteilung", label: "Neue Unterverteilung" },
      { value: "zaehlerschrank", label: "Zählerschrank / Verteilerarbeiten" },
    ],

    componentFields: [
      { key: "steckdosen", label: "Steckdosen" },
      { key: "schalter", label: "Lichtschalter" },
      { key: "netzwerkdosen", label: "Netzwerkdosen" },
      { key: "lampenauslaesse", label: "Lampenauslässe" },
      { key: "rollladenschalter", label: "Rollladenschalter" },
      { key: "taster", label: "Taster / Wechsel / Kreuz" },
    ],

    optionChoices: [
      { key: "fi", label: "FI / RCD-Erweiterung" },
      { key: "uv", label: "Neue Unterverteilung" },
      { key: "sicherungskasten", label: "Sicherungskasten ersetzen" },
      { key: "lan", label: "LAN / Netzwerk mit verlegen" },
      { key: "aussenbereich", label: "Außenbereich" },
      { key: "kueche", label: "Küche aufwerten" },
      { key: "bad", label: "Bad modernisieren" },
      { key: "waermepumpe", label: "Vorbereitung Wärmepumpe" },
      { key: "wallbox", label: "Vorbereitung Wallbox" },
    ],

    brandChoices: [
      { value: "standard", label: "standard" },
      { value: "gira", label: "gira" },
      { value: "merten", label: "merten" },
      { value: "schneider", label: "Schneider Electric" },
      { value: "jung", label: "jung" },
    ],

    qualityChoices: [
      { value: "einfach", label: "Einfach" },
      { value: "standard", label: "Standard" },
      { value: "hochwertig", label: "Hochwertig" },
    ],

    defaults: {
      objectType: "wohnung",
      sqm: "85",
      projectType: "sanierung",
      steckdosen: 12,
      schalter: 8,
      netzwerkdosen: 2,
      lampenauslaesse: 6,
      rollladenschalter: 0,
      taster: 0,
      brand: "standard",
      quality: "standard",
      options: {
        fi: false,
        uv: false,
        sicherungskasten: false,
        lan: false,
        aussenbereich: false,
        kueche: false,
        bad: false,
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

    priceConfig: {
      projectBase: {
        neuinstallation: 2400,
        sanierung: 1600,
        erweiterung: 750,
        unterverteilung: 1350,
        zaehlerschrank: 2800,
      },
      sqm: {
        neuinstallation: 72,
        sanierung: 46,
        erweiterung: 20,
        unterverteilung: 0,
        zaehlerschrank: 0,
      },
      components: {
        steckdosen: 98,
        schalter: 82,
        netzwerkdosen: 149,
        lampenauslaesse: 92,
        rollladenschalter: 136,
        taster: 86,
      },
      options: {
        fi: 450,
        uv: 1450,
        sicherungskasten: 2550,
        lan: 820,
        aussenbereich: 990,
        kueche: 1350,
        bad: 1050,
        waermepumpe: 920,
        wallbox: 1180,
      },
      brandFactor: {
        standard: 1,
        gira: 1.12,
        merten: 1.08,
        schneider: 1.1,
        jung: 1.13,
      },
      qualityFactor: {
        einfach: 0.93,
        standard: 1,
        hochwertig: 1.18,
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
  },
};
