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
      { key: "start", label: "Start" },
      { key: "rechner", label: "Kostenschätzer" },
      { key: "begleitung", label: "Baubegleitung" },
    ],
    ctaLabel: "Anfrage stellen",
  },

  hero: {
    badgePrimary: "Elektroarbeiten in Paderborn und Umgebung",
    badgeSecondary: "Unverbindliche Ersteinschätzung",
    headline: "Saubere Elektroarbeiten mit klarer Kommunikation und verlässlicher Ausführung.",
    text:
      "Ich unterstütze Privatkunden bei Sanierung, Modernisierung und Erweiterung elektrischer Anlagen – mit sauberer Ausführung, klarer Abstimmung und realistischer Ersteinschätzung.",
    trustLine:
      "Elektroarbeiten im Raum Paderborn und Umgebung. Planung und Ausführung in Zusammenarbeit mit Meisterbetrieb.",
    estimatorCardInfo:
      "Unverbindliche Preisspanne auf Basis von Projektart, Ausstattung, Zusatzoptionen und Material.",
  },

  services: {
    eyebrow: "Leistungen",
    title: "Leistungsbereiche mit klarem Fokus auf Privatkunden",
    text:
      "Von der einzelnen Erweiterung bis zur strukturierten Sanierung ganzer Wohneinheiten: Die Leistungen sind bewusst klar, sachlich und handwerklich formuliert.",
    items: [
      { key: "installation", icon: "zap", title: "Elektroinstallation", text: "Neuinstallation, Modernisierung und strukturierte Elektroarbeiten für Wohnung, Haus und kleinere Einheiten." },
      { key: "distribution", icon: "wrench", title: "Unterverteilungen & Schutztechnik", text: "Erweiterung, Erneuerung und sinnvolle Anpassung bestehender Unterverteilungen und Sicherungstechnik." },
      { key: "lighting", icon: "sun", title: "Beleuchtung", text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung und passender Schaltlogik." },
      { key: "network", icon: "network", title: "Netzwerk & Datenleitungen", text: "Strukturierte Verkabelung für Homeoffice, Medienpunkte und moderne Haustechnik." },
      { key: "estimator", icon: "calculator", title: "Digitale Ersteinschätzung", text: "Mehrstufige Ersteinschätzung mit Preisspanne statt ungenauem Festpreisversprechen." },
      { key: "quality", icon: "check", title: "Saubere Ausführung", text: "Fokus auf klare Abstimmung, nachvollziehbare Umsetzung und ruhige Kommunikation im Projekt." },
    ],
  },

  begleitung: {
    eyebrow: "Baubegleitung",
    title: "Vollumfängliche Baubegleitung mit lokalen Partnern",
    text:
      "Für umfangreichere Sanierungsprojekte kann ich die technische Begleitung und Koordination gemeinsam mit lokalen Partnerbetrieben übernehmen. Die Ausführung erfolgt abgestimmt, strukturiert und mit klarem Ansprechpartner.",
    subline:
      "Ein Ansprechpartner, klare Koordination und ein sauberes Ergebnis – statt Chaos durch mehrere unkoordinierte Gewerke.",
    intro:
      "Je nach Projektumfang kann die Baubegleitung von einer einfachen, zweckmäßigen Sanierung bis hin zur hochwertigen oder luxuriösen Ausführung organisiert werden.",
    points: [
      "Koordination mit lokalen Partnern aus der Sanierung",
      "Ein fester Ansprechpartner mit mir als Bauleiter",
      "Geeignet für einfache, gehobene und hochwertige Sanierungsstandards",
      "Abgestimmte Umsetzung statt vieler unkoordinierter Einzelgewerke",
    ],
    cards: [
      {
        title: "Zweckmäßige Sanierung",
        text: "Für Projekte mit klarem Kostenfokus und sauberer, funktionaler Umsetzung ohne unnötige Extras.",
      },
      {
        title: "Gehobene Modernisierung",
        text: "Für Eigentümer, die Wert auf bessere Materialien, sauberere Details und eine koordinierte Umsetzung legen.",
      },
      {
        title: "Hochwertige / Luxus-Sanierung",
        text: "Für anspruchsvolle Projekte mit höherem Qualitätsanspruch, feiner Materialauswahl und enger Abstimmung aller Beteiligten.",
      },
    ],
  },

  requestPage: {
    eyebrow: "Anfrage",
    title: "Anfrage stellen",
    text:
      "Hier läuft alles zusammen: direkte Kontaktwege, strukturierte Erstangaben und die Möglichkeit, Unterlagen oder Grundrisse bereitzustellen.",
    quickTitle: "Direkte Kontaktwege",
    quickText:
      "Für schnelle Abstimmung eignet sich WhatsApp meist am besten. Für strukturierte Anfragen kannst du alternativ E-Mail oder das Formular nutzen.",
    listTitle: "So läuft die Anfrage ab",
    listItems: [
      "Kurze Beschreibung des Projekts oder des Vorhabens",
      "Optional Grundriss, Fotos oder Unterlagen mitsenden",
      "Erste Rückmeldung zur Einordnung und zum nächsten Schritt",
      "Falls sinnvoll: Termin, Besichtigung oder weitere Abstimmung",
    ],
    formNote:
      "Frontend-Stand: Das Formular ist aktuell visuell vorbereitet, aber noch nicht an einen Versand angebunden.",
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
      "Projektart und Umfang",
      "Bestand und Zustand der Anlage",
      "Anzahl der Räume ohne Küche und Badezimmer",
      "Ausstattung in den übrigen Räumen",
      "Zusatzoptionen wie Unterverteilung, Küche, Bad oder Außenbereich",
      "Schalterprogramm und gewünschtes Niveau",
    ],
    requestNote:
      "Frontend-Stand: Das Formular ist bewusst nur visuell vorbereitet und noch nicht an einen echten Versand angebunden.",
    wizardLabels: ["Objekt", "Projekt", "Ausstattung", "Optionen", "Material", "Ergebnis", "Anfrage"],

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

    roomInfoTitle: "Ausstattung ohne Küche und Badezimmer",
    roomInfoText:
      "Bitte gib hier zuerst an, wie viele Räume das Objekt ohne Küche und Badezimmer hat. Erst danach folgt die Ausstattung für diese übrigen Räume.",
    componentFields: [
      { key: "rooms", label: "Raumanzahl ohne Küche und Badezimmer" },
      { key: "steckdosen", label: "Steckdosen" },
      { key: "schalter", label: "Lichtschalter" },
      { key: "netzwerkdosen", label: "Netzwerkdosen" },
      { key: "lampenauslaesse", label: "Lampenauslässe" },
      { key: "rollladenschalter", label: "Rollladenschalter" },
    ],

    optionChoices: [
      { key: "uv", label: "Neue Unterverteilung" },
      { key: "zaehlerschrank", label: "Zählerschrank erneuern" },
      { key: "lan", label: "LAN / Netzwerk verlegen" },
      { key: "aussenbereich", label: "Außenbereich" },
      { key: "kueche", label: "Küche neu installieren" },
      { key: "bad", label: "Bad neu installieren" },
      { key: "waermepumpe", label: "Vorbereitung für Wärmepumpe" },
      { key: "wallbox", label: "Vorbereitung für Wallbox" },
    ],

    materialTitle: "Schalterprogramm / Materiallinie",
    materialInfo:
      "Hier wählst du das gewünschte Schalterprogramm. Die Auswahl beeinflusst vor allem das Materialniveau und den späteren Preisbereich.",
    brandChoices: [
      { value: "gira", label: "Gira" },
      { value: "merten", label: "Merten" },
      { value: "schneider", label: "Schneider Electric" },
      { value: "jung", label: "JUNG" },
      { value: "buschjaeger", label: "Busch-Jaeger" },
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
      brand: "gira",
      options: {
        uv: false,
        zaehlerschrank: false,
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
      },
      options: {
        uv: 1450,
        zaehlerschrank: 3200,
        lan: 820,
        aussenbereich: 990,
        kueche: 2600,
        bad: 2200,
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
  },
};
