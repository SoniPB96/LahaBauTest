export const calculatorAdmin = {
  // =====================================================================================
  // ZENTRALE PFLEGE-DATEI FÜR DEN KOSTENRECHNER
  // =====================================================================================
  // Zweck:
  // Diese Datei ist absichtlich die wichtigste Stelle für spätere Änderungen.
  // Wenn du Preise, Optionen, Materiallinien oder Standardwerte anpassen willst,
  // solltest du zuerst HIER schauen – nicht in der eigentlichen Rechner-Logik.
  //
  // Grundregel:
  // - Texte nur hier ändern
  // - Preise und Faktoren nur hier ändern
  // - Neue Optionen oder Ausstattungsfelder zuerst hier anlegen
  // - Die Rechner-Dateien selbst nur anfassen, wenn sich die FUNKTION ändert
  //
  // Wie der Preis grundsätzlich entsteht:
  // 1. Projektart bestimmt die Basis (z. B. Sanierung oder Neubau)
  // 2. Fläche erzeugt den m²-Anteil
  // 3. Ausstattungsfelder und Zusatzoptionen kommen dazu
  // 4. Objektart kann den Preis leicht anheben oder absenken
  // 5. Materiallinie (z. B. Gira oder Merten) beeinflusst das Materialniveau
  //
  // Wichtiger Praxis-Hinweis:
  // Der Rechner soll keine exakte Angebotssoftware sein.
  // Er soll Privatkunden eine glaubwürdige erste Orientierung geben.
  // Deshalb arbeiten wir bewusst mit einem Preisbereich und NICHT mit Scheingenauigkeit.
  // =====================================================================================

  adminNotes: {
    purpose:
      "Diese Datei ist für die laufende Pflege gedacht. Spätere Preis- oder Textänderungen sollten möglichst nur hier erfolgen.",
    safeToEdit:
      "Texte, Preise, Faktoren, Labels und Standardwerte dürfen geändert werden. Feld-Schlüssel wie 'key' oder 'value' nur ändern, wenn auch die Logik darauf angepasst wird.",
    pricingModel:
      "Gesamtpreis = Grundpreis der Projektart + Flächenpreis + Ausstattungswerte + Zusatzoptionen. Der Markenfaktor wirkt nur auf die materialrelevanten Teilblöcke; danach wirkt der Objektfaktor auf den Gesamtwert.",
    importantWarning:
      "Große Preissprünge nicht aus dem Bauch heraus eintragen. Besser an realen Angeboten, Einkaufspreisen oder Erfahrungswerten aus ähnlichen Projekten orientieren.",
  },

  texts: {
    titleEyebrow: "Erste Kosteneinschätzung Elektrik",
    title: "Unverbindliche Kosteneinschätzung für Elektroarbeiten",
    intro:
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
    optionsTitle: "Zusatzoptionen",
    optionsHint:
      "Wähle hier aus, welche Zusatzbereiche oder Vorbereitungen im Projekt berücksichtigt werden sollen.",
    roomInfoTitle: "Ausstattung ohne Küche und Badezimmer",
    roomInfoText:
      "Bitte gib hier zuerst an, wie viele Räume das Objekt ohne Küche und Badezimmer hat. Erst danach folgt die Ausstattung für diese übrigen Räume.",
    materialTitle: "Schalterprogramm / Materiallinie",
    materialInfo:
      "Hier wählst du das gewünschte Schalterprogramm. Die Auswahl beeinflusst vor allem das Materialniveau und den späteren Preisbereich.",
  },

  // Objektarten beeinflussen den Preis nur leicht.
  // Warum?
  // Weil die eigentliche Hauptkalkulation schon über Projektart, Fläche und Ausstattung läuft.
  // Die Objektart ist eher ein Feinregler für Zugänglichkeit, Komplexität und typische Ausführung.
  //
  // Wann ändern?
  // - Wenn du merkst, dass z. B. Gewerbeobjekte im Schnitt spürbar aufwendiger sind
  // - Wenn Wohnungen oder EFH systematisch zu hoch oder zu niedrig geschätzt werden
  //
  // Nicht zu stark ändern:
  // Hier lieber kleine Faktoren nutzen (z. B. 1.03 bis 1.12) statt extreme Sprünge.
  objectTypes: [
    {
      value: "wohnung",
      label: "Wohnung",
      icon: "home",
      factor: 1,
      note: "Referenzwert. Geeignet als neutrale Basis für typische Privatkunden-Projekte.",
    },
    {
      value: "einfamilienhaus",
      label: "Einfamilienhaus",
      icon: "home",
      factor: 1.05,
      note: "Leichter Aufschlag wegen typischer Mehrwege, Verteilung und etwas größerem Aufwand.",
    },
    {
      value: "mehrfamilienhaus",
      label: "Einheit im Mehrfamilienhaus",
      icon: "building",
      factor: 1.03,
      note: "Oft etwas komplexer als Wohnung, aber nicht automatisch so aufwendig wie ein ganzes Haus.",
    },
    {
      value: "gewerbe",
      label: "Gewerbe",
      icon: "building",
      factor: 1.12,
      note: "Höherer Faktor wegen typischer Sonderanforderungen, Robustheit und größerer Streuung im Aufwand.",
    },
  ],

  // Projektarten sind einer der wichtigsten Preishebel im gesamten Rechner.
  //
  // basePrice = Grundaufwand unabhängig von der Fläche
  // sqmPrice  = typischer Flächenpreis für dieses Projekt
  //
  // Warum braucht es beides?
  // - basePrice deckt Sockelaufwand, Organisation und typische Grundarbeiten ab
  // - sqmPrice skaliert das Projekt mit der Größe des Objekts
  //
  // Wie anpassen?
  // - Wenn ein kompletter Projekttyp generell zu billig oder zu teuer geschätzt wird
  // - Erst kleine Anpassungen testen, nicht direkt mehrere hundert Euro auf einmal ändern
  //
  // directInquiry = true bedeutet:
  // Für diesen Projekttyp wird bewusst KEIN automatischer Preis errechnet,
  // sondern der Nutzer wird direkt in eine konkrete Anfrage geführt.
  projectTypes: [
    {
      value: "neubau_neuinstallation",
      label: "Neubau / Neuinstallation",
      basePrice: 2600,
      sqmPrice: 75,
      baseMaterialShare: 0.18,
      sqmMaterialShare: 0.24,
      note: "Höherer Flächenpreis, weil hier meist die vollständige Neuinstallation mit größerem Umfang gemeint ist.",
    },
    {
      value: "sanierung_altbau",
      label: "Sanierung / Altbau",
      basePrice: 1600,
      sqmPrice: 46,
      baseMaterialShare: 0.16,
      sqmMaterialShare: 0.22,
      note: "Eigene Kalkulation, weil im Bestand oft andere Muster gelten als im reinen Neubau.",
    },
    {
      value: "erweiterung",
      label: "Erweiterung",
      directInquiry: true,
      note: "Keine automatische Schätzung, weil Umfang und Einbindung in den Bestand zu stark schwanken können.",
    },
    {
      value: "zaehlerschrank",
      label: "Zählerschrank erneuern",
      directInquiry: true,
      note: "Direktanfrage statt Automatismus, weil Normen, Bestand und Netzbetreiber-Vorgaben stark variieren können.",
    },
  ],

  // Zusatzoptionen sind pauschale Zusatzblöcke.
  // Diese Werte sollten typische Mehrkosten für den jeweiligen Bereich grob abbilden.
  //
  // Wann ändern?
  // - Wenn du aus Erfahrung merkst, dass ein Bereich regelmäßig zu hoch oder zu niedrig angesetzt ist
  // - Wenn sich Marktpreise, Materialpreise oder dein eigener Leistungsumfang verändern
  //
  // Praxisregel:
  // Lieber wenige, verständliche Optionen mit brauchbarer Pauschale,
  // als zu viele Mini-Optionen, die normale Kunden verwirren.
  extraOptions: [
    { key: "uv", label: "Neue Unterverteilung", price: 1450, materialShare: 0.62, note: "Pauschaler Zusatz für Material, Verdrahtung und typischen Mehraufwand." },
    { key: "zaehlerschrank", label: "Zählerschrank erneuern", price: 3200, materialShare: 0.68, note: "Nur verwenden, wenn dieser Punkt im Standard-Rechner zusätzlich berücksichtigt werden soll." },
    { key: "lan", label: "LAN / Netzwerk verlegen", price: 820, materialShare: 0.52, note: "Grundaufschlag für Netzwerkbereich. Zusätzliche Dosen kommen über das Ausstattungsfeld dazu." },
    { key: "aussenbereich", label: "Außenbereich", price: 990, materialShare: 0.48, note: "Zusatz für typische Leitungswege, Schutzanforderungen und Außenpunkte." },
    { key: "kueche", label: "Küche neu installieren", price: 2600, materialShare: 0.44, note: "Eigener Block, weil Küchen meist deutlich mehr Stromkreise und Anschlüsse brauchen." },
    { key: "bad", label: "Bad neu installieren", price: 2200, materialShare: 0.42, note: "Eigener Block wegen Feuchtraum-Anforderungen und typischer Zusatzpunkte." },
    { key: "fussbodenheizung", label: "Fußbodenheizung", price: 1250, materialShare: 0.5, note: "Aktiviert zusätzlich auch die Raumthermostate im Ausstattungsbereich." },
    { key: "waermepumpe", label: "Vorbereitung für Wärmepumpe", price: 920, materialShare: 0.47, note: "Pauschale Vorbereitung. Kein vollständiger Ersatz für eine Einzelfallprüfung vor Ort." },
    { key: "wallbox", label: "Vorbereitung für Wallbox", price: 1180, materialShare: 0.46, note: "Grundaufschlag für die typische Vorbereitung. Details können projektabhängig stark schwanken." },
  ],

  // Ausstattungsfelder werden pro Stück oder Menge berechnet.
  //
  // unitPrice = Richtwert pro Einheit innerhalb des Rechners.
  // Diese Werte sind keine Einkaufspreise, sondern interne Kalkulationswerte.
  //
  // requiresOption bedeutet:
  // Das Feld wird nur sichtbar und wirksam, wenn die zugehörige Option aktiv ist.
  // Beispiel: Raumthermostate nur, wenn Fußbodenheizung ausgewählt wurde.
  //
  // Wann ändern?
  // - Wenn du aus echten Projekten merkst, dass bestimmte Ausstattungswerte dauerhaft falsch liegen
  // - Wenn du deine interne Kalkulationslogik anpasst
  roomEquipment: [
    { key: "rooms", label: "Raumanzahl ohne Küche und Badezimmer", unitPrice: 220, materialShare: 0.12, min: 1, max: 100, note: "Kein echter Einzelartikel, sondern ein Strukturwert für typische Grundausstattung je Raum." },
    { key: "steckdosen", label: "Steckdosen", unitPrice: 98, materialShare: 0.52, min: 0, max: 250, note: "Interner Kalkulationswert pro zusätzlicher Steckdose im Orientierungspreis." },
    { key: "schalter", label: "Lichtschalter", unitPrice: 82, materialShare: 0.46, min: 0, max: 150, note: "Interner Kalkulationswert pro Lichtschalter." },
    { key: "netzwerkdosen", label: "Netzwerkdosen", unitPrice: 149, materialShare: 0.58, min: 0, max: 60, requiresOption: "lan", note: "Nur relevant, wenn LAN / Netzwerk verlegen aktiv ist." },
    { key: "lampenauslaesse", label: "Lampenauslässe", unitPrice: 92, materialShare: 0.41, min: 0, max: 150, note: "Typischer Richtwert pro Lichtauslass." },
    { key: "rollladenschalter", label: "Rollladenschalter", unitPrice: 136, materialShare: 0.49, min: 0, max: 60, note: "Eigener Wert wegen zusätzlichem Material- und Leitungsaufwand." },
    { key: "raumthermostate", label: "Raumthermostate für Fußbodenheizung", unitPrice: 210, materialShare: 0.57, min: 0, max: 60, requiresOption: "fussbodenheizung", note: "Nur relevant bei aktivierter Fußbodenheizung." },
  ],

  // Materiallinien / Markenfaktoren
  // -------------------------------------------------------------------------------------
  // Das ist einer der wichtigsten Bereiche für die Pflege.
  //
  // factor erklärt NICHT den kompletten Endpreis einer Marke im echten Leben,
  // sondern den internen Kalkulationsaufschlag im Rechner.
  //
  // Warum ist Gira teurer als Merten?
  // - weil Gira hier als hochwertigere / premiumorientierte Linie eingeordnet wird
  // - weil sichtbare Ausstattung für viele Kunden eine bewusste Qualitäts- und Designentscheidung ist
  // - weil der Rechner dieses höhere Materialniveau kontrolliert abbilden soll
  //
  // Wichtige Geschäftslogik:
  // Die Faktoren sollen nicht willkürlich sein.
  // Ideal ist folgende Denkweise:
  // 1. Hausmarke / Referenzlinie festlegen
  // 2. Typischen Materialkorb vergleichen
  // 3. Aus dem Unterschied einen moderaten Kalkulationsfaktor ableiten
  //
  // Beispiel für so einen Materialkorb:
  // - 20 Steckdosen
  // - 15 Schalter
  // - 4 Taster
  // - 2 Thermostate
  // - Kleinmaterial-Anteil
  //
  // Wenn Gira im Einkauf / Projektbild klar höher liegt als Merten,
  // darf der Faktor höher sein. Aber bitte kontrolliert und nachvollziehbar.
  //
  // Empfehlung:
  // - Hausmarke / Standardlinie = niedrigster sinnvoller Faktor
  // - Mittelklasse = kleiner Aufschlag
  // - Premium = spürbarer, aber nicht übertriebener Aufschlag
  materialLines: [
    {
      value: "gira",
      label: "Gira",
      badge: "Hausmarke",
      accentClass: "accent-gold",
      factor: 1.12,
      note: "Hier als hochwertige Standardlinie hinterlegt. Spürbarer, aber kontrollierter Aufschlag gegenüber günstigeren Linien.",
      changeWhen: "Nur ändern, wenn sich deine strategische Standardmarke oder das Preisniveau im Einkauf deutlich verändert.",
    },
    {
      value: "merten",
      label: "Merten",
      accentClass: "accent-silver",
      factor: 1.08,
      note: "Etwas günstiger bzw. moderater kalkuliert als Gira. Sinnvoll als guter Mittelweg.",
      changeWhen: "Anpassen, wenn Merten in deiner Praxis näher an Gira heranrückt oder deutlicher darunter liegt.",
    },
    {
      value: "schneider",
      label: "Schneider Electric",
      accentClass: "accent-blue",
      factor: 1.1,
      note: "Leicht gehobene Linie im Rechner. Zwischen Mittelklasse und Premium eingeordnet.",
      changeWhen: "Ändern, wenn dein realer Materialkorb andere Unterschiede zeigt.",
    },
    {
      value: "jung",
      label: "JUNG",
      accentClass: "accent-violet",
      factor: 1.13,
      note: "Im Rechner leicht oberhalb von Gira eingeordnet. Eher design- und anspruchsorientiert kalkuliert.",
      changeWhen: "Nur erhöhen, wenn diese Linie in deiner Praxis wirklich klar teurer verkauft wird.",
    },
    {
      value: "buschjaeger",
      label: "Busch-Jaeger",
      accentClass: "accent-green",
      factor: 1.09,
      note: "Moderater Aufschlag oberhalb günstiger Basislinien.",
      changeWhen: "Feinjustieren, wenn echte Angebotsvergleiche eine andere Einordnung zeigen.",
    },
  ],

  // Standardwerte bestimmen, womit der Rechner vorgefüllt startet.
  //
  // Diese Werte beeinflussen NICHT die eigentliche Preislogik,
  // sondern nur den ersten Eindruck und die vorausgefüllte Bedienung.
  //
  // Empfehlung:
  // Werte so wählen, dass ein normaler Privatkunde sofort etwas Brauchbares sieht,
  // ohne von extremen oder leeren Eingaben irritiert zu werden.
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

  // Preislogik-Grundwerte
  // -------------------------------------------------------------------------------------
  // range:
  // Wie breit der angezeigte Preisbereich um den Mittelwert ist.
  // Beispiel 0.14 = ca. +/- 14 %
  //
  // laborShare und materialShare:
  // Diese Werte beeinflussen aktuell vor allem die Darstellung / Aufteilung im Ergebnis.
  // Sie sind keine separate zweite Preisformel, sondern dienen der Einordnung.
  //
  // Wichtige Regel:
  // laborShare + materialShare müssen hier nicht exakt 1.00 ergeben,
  // wenn bewusst noch ein Rest für Sonstiges / Puffer mitgedacht wird.
  // Wenn du aber eine sehr klare Aufteilung willst, kannst du sie näher an 1.00 bringen.
  priceLogic: {
    range: 0.14,
    laborShare: 0.56,
    materialShare: 0.31,
    defaultBaseMaterialShare: 0.18,
    defaultSqmMaterialShare: 0.24,
    defaultComponentMaterialShare: 0.31,
    defaultOptionMaterialShare: 0.45,
    notes: {
      range: "Steuert die Breite des ausgegebenen Preisrahmens. Höher = vorsichtiger, niedriger = präziser wirkend.",
      laborShare: "Anteil für Arbeitsleistung in der Ergebnisdarstellung.",
      materialShare: "Anteil für Material in der Ergebnisdarstellung.",
      defaultBaseMaterialShare: "Materialanteil des projektbezogenen Grundaufwands. Eher niedrig, weil hier viel Organisation und Arbeitszeit steckt.",
      defaultSqmMaterialShare: "Standard-Materialanteil des flächenabhängigen Blocks. Dient als Fallback, wenn ein Projekttyp keinen eigenen Wert hat.",
      defaultComponentMaterialShare: "Fallback-Materialanteil für Ausstattungsfelder ohne eigenen Anteil.",
      defaultOptionMaterialShare: "Fallback-Materialanteil für Zusatzoptionen ohne eigenen Anteil.",
    },
  },
};
