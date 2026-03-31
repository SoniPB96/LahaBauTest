export const siteConfig = {
  company: {
    name: "LAHA",
    subtitle: "BAUDIENSTLEISTUNGEN",
    legalName: "LAHA Baudienstleistungen",
    ownerName: "Vorname Nachname",
    street: "Musterstraße 1",
    cityLine: "33100 Paderborn",
    email: "kontakt@laha-bau.de",
    phoneDisplay: "0176 / 820 67 106",
    phoneLink: "tel:+4917682067106",
    whatsappLink: "https://wa.me/4917682067106",
    region: "Paderborn und Umland",
    serviceAreas: ["Paderborn", "Salzkotten", "Delbrück", "Bad Lippspringe", "Borchen"],
    responseTime: "in der Regel innerhalb von 24 Stunden",
  },

  seo: {
    siteUrl: "https://www.laha-bau.de",
    pageTitle: "Laha Baudienstleistungen | Elektroarbeiten in Paderborn",
    pageDescription:
      "Elektroarbeiten für Sanierung, Modernisierung und Erweiterung in Paderborn und Umgebung. Mit digitaler Ersteinschätzung, klarer Abstimmung und sauberer Umsetzung für Privatkunden.",
    ogTitle: "Laha Baudienstleistungen",
    ogDescription:
      "Elektroarbeiten in Paderborn für Sanierung, Modernisierung und Erweiterung mit digitaler Ersteinschätzung.",
  },

  navigation: {
    items: [
      { key: "start", label: "Start" },
      { key: "rechner", label: "Erste Kosteneinschätzung Elektrik" },
      { key: "begleitung", label: "Baubegleitung" },
    ],
    ctaLabel: "Projekt anfragen",
  },

  hero: {
    badgePrimary: "Elektroarbeiten in Paderborn und Umgebung",
    badgeSecondary: "Unverbindliche Ersteinschätzung",
    headline: "Elektroarbeiten für Sanierung, Modernisierung und Erweiterung – klar geplant und sauber umgesetzt.",
    subheadline: "Für Privatkunden im Raum Paderborn, die Verlässlichkeit statt Baustellenchaos wollen.",
    text:
      "Von der Wohnungsmodernisierung bis zur Erweiterung im Bestand: Du bekommst eine realistische Ersteinschätzung, klare Abstimmung und eine saubere Umsetzung ohne unnötiges Durcheinander.",
    trustLine:
      "Planung und Ausführung in Zusammenarbeit mit Meisterbetrieb – nachvollziehbar abgestimmt für Privatkunden, Eigentümer und Sanierungsprojekte im Raum Paderborn.",
    estimatorCardInfo:
      "Realistische Preisspanne auf Basis von Projektart, Größe, Ausstattung und Zusatzoptionen – als erste Orientierung vor der weiteren Abstimmung.",
    quickFacts: [
      "Fester Ansprechpartner statt wechselnder Zuständigkeiten",
      "Frühe technische und preisliche Einordnung",
      "Geeignet für Modernisierung, Erweiterung und Sanierung im Bestand",
    ],
  },

  trustStrip: {
    title: "Worauf Privatkunden bei der Anfrage typischerweise achten",
    items: [
      "klare Rückmeldung statt Funkstille",
      "realistische Ersteinschätzung statt Fantasiepreis",
      "saubere Abstimmung mit Meisterbetrieb",
      "verständliche Kommunikation ohne unnötige Fachsprache",
    ],
  },

  services: {
    eyebrow: "Leistungen",
    title: "Leistungsbereiche für Privatkunden, Eigentümer und Sanierungen im Bestand",
    text:
      "Nicht alles für jeden, sondern klar eingegrenzte Leistungen für Modernisierung, Erweiterung und strukturierte Sanierungen – verständlich erklärt und auf typische Privatkundenprojekte ausgerichtet.",
    items: [
      { key: "installation", icon: "zap", title: "Elektroinstallation", text: "Neuinstallation, Modernisierung und Erweiterung für Wohnung, Haus und kleinere Einheiten – sauber geplant statt improvisiert." },
      { key: "distribution", icon: "wrench", title: "Unterverteilungen & Schutztechnik", text: "Wenn Verteilungen modernisiert, erweitert oder technisch sinnvoll neu aufgebaut werden müssen." },
      { key: "lighting", icon: "sun", title: "Beleuchtung", text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung, sinnvoller Schaltlogik und stimmiger Platzierung." },
      { key: "network", icon: "network", title: "Netzwerk & Datenleitungen", text: "Strukturierte Verkabelung für Homeoffice, Medienpunkte und moderne Haustechnik ohne spätere Provisorien." },
      { key: "estimator", icon: "calculator", title: "Digitale Ersteinschätzung", text: "Mehrstufige Kosteneinschätzung mit realistischer Preisspanne statt blindem Festpreisversprechen oder vagen Aussagen." },
      { key: "quality", icon: "check", title: "Saubere Ausführung", text: "Klare Abstimmung, nachvollziehbare Umsetzung und eine Kommunikation, bei der man weiß, woran man ist." },
    ],
  },

  useCases: {
    eyebrow: "Typische Anlässe",
    title: "Wobei die Website Privatkunden schnell einordnen soll",
    text: "Nicht jeder Kunde sucht nach Fachbegriffen. Deshalb werden typische Situationen bewusst greifbar beschrieben.",
    items: [
      {
        title: "Sanierung oder Altbau modernisieren",
        text: "Wenn Stromkreise, Steckdosen, Licht oder Verteilungen im Bestand neu aufgebaut oder sinnvoll angepasst werden sollen.",
      },
      {
        title: "Erweiterung im Haus oder in der Wohnung",
        text: "Wenn zusätzliche Räume, neue Nutzung oder mehr Ausstattung sauber in die bestehende Elektrik integriert werden müssen.",
      },
      {
        title: "Projekt mit mehreren Beteiligten koordinieren",
        text: "Wenn Abstimmung, Struktur und technische Klarheit wichtiger sind als nur schnell irgendeine Lösung zu bauen.",
      },
    ],
  },

  process: {
    eyebrow: "Ablauf",
    title: "So läuft eine Anfrage in der Praxis ab",
    text: "Gerade Privatkunden brauchen keine komplizierte Fachsprache, sondern einen klaren Ablauf. Genau darauf ist die Seite ausgelegt.",
    items: [
      { step: "01", title: "Vorhaben kurz schildern", text: "Per WhatsApp, Telefon oder Formular mit kurzer Beschreibung, Fotos, Grundriss oder vorhandenen Unterlagen." },
      { step: "02", title: "Technisch und preislich einordnen", text: "Erste Rückmeldung dazu, was sinnvoll ist, was ungefähr zu erwarten ist und welcher nächste Schritt wirklich nötig ist." },
      { step: "03", title: "Abstimmen und sauber umsetzen", text: "Wenn das Projekt passt, folgt Besichtigung, weitere Abstimmung oder direkte Umsetzung – strukturiert und ohne unnötige Umwege." },
    ],
  },

  begleitung: {
    eyebrow: "Baubegleitung",
    title: "Baubegleitung für Sanierungen mit klarer Abstimmung",
    text:
      "Bei umfangreicheren Projekten übernehme ich die technische Begleitung und koordiniere die Ausführung gemeinsam mit lokalen Partnerbetrieben. Das Ziel ist kein unnötig komplizierter Ablauf, sondern eine saubere Umsetzung mit klarem Ansprechpartner.",
    subline:
      "Sinnvoll für Eigentümer, die bei einer Sanierung nicht mehrere Gewerke einzeln koordinieren möchten.",
    intro:
      "Je nach Projekt kann die Begleitung von einer zweckmäßigen Sanierung bis zu einer hochwertigen Ausführung organisiert werden – immer passend zum Umfang, zum Budget und zum gewünschten Ergebnis.",
    points: [
      "Ein fester Ansprechpartner für Abstimmung, Ablauf und nächste Schritte",
      "Koordination mit lokalen Partnerbetrieben bei größeren Sanierungen",
      "Technisch saubere Planung statt improvisierter Einzelentscheidungen",
      "Geeignet für einfache, gehobene und hochwertige Ausführungsstandards",
    ],
    cards: [
      {
        title: "Zweckmäßige Sanierung",
        text: "Für Projekte mit klarem Kostenfokus und sauberer, funktionaler Umsetzung ohne unnötige Extras.",
      },
      {
        title: "Gehobene Modernisierung",
        text: "Für Eigentümer, die Wert auf bessere Materialien, saubere Details und eine koordinierte Ausführung legen.",
      },
      {
        title: "Hochwertige Sanierung",
        text: "Für anspruchsvollere Projekte mit höherem Qualitätsanspruch, feinerer Materialwahl und enger Abstimmung aller Beteiligten.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Vertrauen",
    title: "Vertrauen entsteht durch klare Kommunikation und saubere Abläufe",
    text: "Nicht laut, sondern nachvollziehbar: klare Rückmeldungen, realistische Einschätzungen und eine Ausführung, bei der Privatkunden nicht ständig hinterherlaufen müssen.",
    items: [
      { initials: "FK", name: "Familie K.", location: "Paderborn · Wohnungsmodernisierung", quote: "Die Abstimmung war klar, der Ablauf ruhig und die Arbeiten sauber umgesetzt. Genau das hat uns bei der Sanierung gefehlt." },
      { initials: "MH", name: "M. Hoffmann", location: "Salzkotten · Erweiterung im Bestand", quote: "Es wurde verständlich erklärt, was technisch sinnvoll ist und wo man nicht unnötig Geld verbrennen muss. Das wirkte deutlich professioneller als bei anderen Anfragen." },
    ],
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Was Privatkunden vor der Anfrage oft wissen möchten",
    text: "Kurze Antworten auf die Punkte, die in der Praxis am häufigsten Unsicherheit auslösen.",
    items: [
      {
        question: "Ist der Rechner schon ein verbindliches Angebot?",
        answer:
          "Nein. Der Rechner liefert eine realistische erste Preisspanne. Ein verbindliches Angebot setzt immer die technische Prüfung des konkreten Projekts voraus.",
      },
      {
        question: "Kann ich auch einfach Fotos oder einen Grundriss schicken?",
        answer:
          "Ja. Für die erste Einordnung reichen oft schon Fotos, ein Grundriss und eine kurze Beschreibung des Vorhabens.",
      },
      {
        question: "Ist die Website nur für große Sanierungen gedacht?",
        answer:
          "Nein. Sie richtet sich an Privatkunden mit Modernisierung, Erweiterung, Umbau und strukturierter Sanierung im Bestand.",
      },
    ],
  },

  requestPage: {
    eyebrow: "Anfrage",
    title: "Projekt anfragen oder Ersteinschätzung starten",
    text:
      "Hier laufen die wichtigsten Kontaktwege zusammen: schnelle Abstimmung per WhatsApp oder Telefon und bei Bedarf eine strukturierte Anfrage mit Fotos, Grundriss oder weiteren Unterlagen.",
    quickTitle: "Direkte Kontaktwege",
    quickText:
      "Für eine erste Einordnung ist WhatsApp meist am schnellsten. Wenn mehrere Punkte gesammelt werden sollen, öffnet sich das Formular erst bei Bedarf als eigener Schritt.",
    listTitle: "Was für eine sinnvolle erste Rückmeldung hilft",
    listItems: [
      "Kurze Beschreibung des Vorhabens, Problems oder Modernisierungswunsches",
      "Optional Fotos, Grundriss, Sicherungskasten oder vorhandene Unterlagen mitsenden",
      "Erste Rückmeldung dazu, was technisch sinnvoll ist und welcher nächste Schritt passt",
      "Falls passend: weitere Abstimmung, Besichtigung oder Termin zur Umsetzung",
    ],
    formNote:
      "Das Formular funktioniert auch ohne externen Formularservice: Wenn kein Versand-Endpunkt hinterlegt ist, wird automatisch eine vorbereitete E-Mail geöffnet.",
  },
};
