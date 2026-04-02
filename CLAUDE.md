# CLAUDE.md — Arbeitsanleitung für KI-Assistenten

Dies ist die einzige Dokumentationsdatei des Projekts.
Lies sie vollständig bevor du irgendetwas änderst.

---

## 1. Was ist das für ein Projekt?

Firmenwebsite für **LAHA Baudienstleistungen** — Elektroarbeiten und Baubegleitung in Paderborn.
Gebaut mit React 18, React Router v6, Vite. Kein CSS-Framework. Deployed auf Vercel.

---

## 2. Seitenstruktur

Die Website hat 6 URLs. Jede hat genau eine Page-Datei:

| URL | Page-Datei | Inhalt |
|---|---|---|
| `/` | `src/pages/StartPage.jsx` | Hero + Leistungsübersicht + Testimonials |
| `/rechner` | `src/pages/RechnerPage.jsx` | Kostenrechner (Wizard, 6 Schritte) |
| `/baubegleitung` | `src/pages/BaubegleitungPage.jsx` | Baubegleitung-Section |
| `/kontakt` | `src/pages/KontaktPage.jsx` | Kontaktformular + Kontaktwege |
| `/impressum` | `src/pages/ImpressumPage.jsx` | Impressum (Inhalt aus siteConfig.legal.impressum) |
| `/datenschutz` | `src/pages/DatenschutzPage.jsx` | Datenschutz (Inhalt aus siteConfig.legal.datenschutz) |

Header und Footer erscheinen auf allen Seiten — definiert in `src/App.jsx`.

---

## 3. Vollständige Dateistruktur mit Zweck

```
/
├── CLAUDE.md                        ← diese Datei
├── api/
│   └── contact.js                   ← Vercel Serverless Function: E-Mail-Versand via Resend
├── src/
│   ├── App.jsx                      ← Router-Setup, Header+Footer-Wrapper, alle 6 Routen
│   ├── main.jsx                     ← React-Einstiegspunkt (nicht anfassen)
│   │
│   ├── pages/                       ← eine Datei = eine URL-Seite
│   │   ├── StartPage.jsx
│   │   ├── RechnerPage.jsx
│   │   ├── BaubegleitungPage.jsx
│   │   ├── KontaktPage.jsx
│   │   ├── ImpressumPage.jsx        ← NEU: liest Inhalt aus siteConfig.legal.impressum
│   │   └── DatenschutzPage.jsx      ← NEU: liest Inhalt aus siteConfig.legal.datenschutz
│   │
│   ├── components/
│   │   ├── ui/                      ← globale UI-Elemente
│   │   │   ├── Header.jsx           ← Navigation mit NavLink
│   │   │   ├── Footer.jsx           ← Footer, liest vollständig aus siteConfig
│   │   │   └── Logo.jsx             ← Logo-Komponente
│   │   │
│   │   ├── sections/                ← Inhaltsbereiche (je Section = eine Datei)
│   │   │   ├── HeroSection.jsx      ← Startseite: Headline, CTA, EstimatorCard
│   │   │   ├── ServicesSection.jsx  ← Startseite: Leistungskarten
│   │   │   ├── TrustSection.jsx     ← Startseite: Testimonials
│   │   │   ├── BegleitungSection.jsx← /baubegleitung: Hauptinhalt
│   │   │   └── RequestSection.jsx   ← /kontakt: Kontaktwege + Formular-Platzhalter
│   │   │
│   │   └── calculator/              ← Rechner-Komponenten
│   │       ├── ModernCalculatorPanel.jsx ← Haupt-Wizard (6 Schritte)
│   │       ├── EstimatorCard.jsx    ← Vorschau-Karte auf der Startseite
│   │       ├── calculatorLogic.js   ← Preisberechnung (NICHT anfassen)
│   │       ├── modern-calculator.css← Rechner-spezifische Styles (calc-* Klassen)
│   │       └── index.js             ← Exports
│   │
│   ├── calculator/                  ← Rechner-Logik (NICHT anfassen)
│   │   ├── flow.js                  ← Schritt-Reihenfolge je Objekttyp
│   │   └── validation.js            ← Eingabe-Validierung pro Schritt
│   │
│   ├── config/
│   │   ├── siteConfig.js            ← ALLE Texte und Inhalte der Website
│   │   ├── calculatorAdmin.js       ← Rechner: Preise, Pakete, Felder
│   │   └── calculatorConfig.js      ← Rechner: verbindet Admin mit Komponenten (nicht anfassen)
│   │
│   └── styles/
│       ├── design-tokens.css        ← ALLE CSS-Variablen (Farben, Abstände, Radien)
│       ├── global.css               ← Reset, Body, Container
│       ├── layout.css               ← Header, Navigation, Footer (Struktur)
│       ├── sections.css             ← NEU: Hero, Services, Trust, Begleitung, Request
│       ├── components.css           ← NEU: Buttons, Badges, Cards, Estimator, Scroll-Indicator
│       └── calculator.css           ← generische Rechner-Hilfsklassen
```

---

## 4. Die goldene Regel: Welche Datei für welche Anfrage?

### "Ändere einen Text / eine Überschrift / einen Link"
→ **`src/config/siteConfig.js`** — einzige Datei für alle Inhalte

### "Ändere die Farbe / den Hintergrund / den Akzent"
→ **`src/styles/design-tokens.css`** — einzige Datei für alle CSS-Variablen

### "Ändere das Layout / die Abstände von Header, Navigation oder Footer"
→ **`src/styles/layout.css`** — nur strukturelle Klassen

### "Ändere das Aussehen einer Section (Hero, Services, Trust, Begleitung, Request)"
→ **`src/styles/sections.css`** — alle Section-spezifischen Klassen

### "Ändere einen Button / eine Card / ein Badge"
→ **`src/styles/components.css`** — alle wiederverwendbaren UI-Elemente

### "Ändere die Optik des Rechners"
→ **`src/components/calculator/modern-calculator.css`** — alle `calc-*` Klassen

### "Ändere einen Preis / ein Paket / ein Rechner-Feld"
→ **`src/config/calculatorAdmin.js`** — alle Rechner-Konfiguration

### "Füge eine neue Section hinzu"
→ Neue Datei in `src/components/sections/`, einbinden in der passenden Page unter `src/pages/`

### "Ändere die Navigation"
→ `src/config/siteConfig.js` → Objekt `navigation.items`

### "Ändere Impressum oder Datenschutz"
→ `src/config/siteConfig.js` → Objekte `legal.impressum.content` / `legal.datenschutz.content`

---

## 5. siteConfig.js — was steht wo

```
siteConfig.company        → Firmenname, E-Mail, Telefon, WhatsApp-Link, Region
siteConfig.navigation     → Navigationslinks (label, path) + CTA-Button-Text
siteConfig.hero           → Badge, Headline, Subheadline, Vertrauenszeile, CTA-Buttons
siteConfig.hero.cta       → primary/secondary Button: label + path
siteConfig.services       → Abschnitt-Titel + Array der Leistungskarten (title, text, icon)
siteConfig.begleitung     → Titel, Text, Aufzählungspunkte, 3 Karten
siteConfig.requestPage    → Titel, Text, Kontaktbereich-Texte, Prozess-Aufzählung
siteConfig.footer         → Tagline, Copyright-Text, Spaltenüberschriften
siteConfig.legal          → impressum + datenschutz: je path, label, title, content[]
```

Erlaubte Icon-Werte für `services.items[].icon`:
`"zap"`, `"wrench"`, `"sun"`, `"network"`, `"calculator"`, `"check"`
(kommen aus der Lucide-Icons-Bibliothek)

---

## 6. design-tokens.css — was steht wo

```css
--bg-primary          /* Seiten-Hintergrund (sehr dunkel) */
--bg-secondary        /* Abwechselnder Abschnitts-Hintergrund */
--bg-tertiary         /* Inputs, Chips, inaktive Buttons */
--bg-card             /* Karten-Hintergrund */
--bg-card-hover       /* Karten-Hintergrund beim Hover */

--border-primary      /* Standard-Rahmen */
--border-secondary    /* Subtiler Rahmen */

--text-primary        /* Haupttext (weiß) */
--text-secondary      /* Zweiter Text (grau) */
--text-tertiary       /* Deaktiviert / Hints */
--text-soft           /* Fließtext in Sektionen */

--accent-primary      /* Akzentfarbe (Buttons, Highlights) */
--accent-secondary    /* Akzentfarbe hover */

--radius-sm / --radius-md / --radius-lg   /* Eckenradien */
--spacing-xs bis --spacing-3xl            /* Abstände */
```

---

## 7. calculatorAdmin.js — was steht wo

```
calculatorAdmin.packageTypes[]     → Pakete: label, pricePerSqm, description
calculatorAdmin.objectTypes[]      → Objektarten: Wohnung, EFH, MFH
calculatorAdmin.mfhRanges          → Toleranzbereich für Mehrparteienhaus-Schätzungen
calculatorAdmin.technologyGroups   → Gruppierung der Felder in Schritt 3
calculatorAdmin.fields             → Alle Einzelfelder mit Preis, Typ, Bedingungen
calculatorAdmin.defaults           → Startwerte des Formulars
```

Feldtypen in `fields`:
- `type: "boolean"` → Checkbox, `price` = Aufpreis in €
- `type: "integer"` → Stepper, `pricePerUnit` = € pro Stück
- `type: "enum"` → Auswahl, jede `option` hat eigenen `price`
- `visibleWhen: (form) => ...` → Feld nur anzeigen wenn Bedingung erfüllt

---

## 8. Was du NICHT anfassen sollst

Diese Dateien enthalten Berechnungs- und Ablauflogik.
Nur ändern wenn ausdrücklich nach Logik-Änderungen gefragt wird:

| Datei | Grund |
|---|---|
| `src/components/calculator/calculatorLogic.js` | Preisberechnung |
| `src/calculator/flow.js` | Schritt-Reihenfolge je Objekttyp |
| `src/calculator/validation.js` | Formular-Validierung |
| `src/config/calculatorConfig.js` | Nur Durchreicher, nie direkt editieren |
| `src/main.jsx` | React-Einstiegspunkt |

---

## 9. API / E-Mail

- Endpoint: `POST /api/contact`
- Datei: `api/contact.js` (Vercel Serverless Function)
- Versand über [Resend](https://resend.com)
- Vercel Umgebungsvariablen erforderlich:
  - `RESEND_API_KEY` — von resend.com
  - `TO_EMAIL` — Empfänger (Standard: kontakt@laha-bau.de)
  - `FROM_EMAIL` — Absender (muss in Resend verifiziert sein)

---

## 10. Beispiele: Typische Anfragen und was zu tun ist

**"Ändere die Akzentfarbe von weiß auf blau"**
→ `src/styles/design-tokens.css`: `--accent-primary` und `--accent-secondary` ändern

**"Ändere die Headline auf der Startseite"**
→ `src/config/siteConfig.js`: `hero.headline` ändern

**"Ändere den Text der Hero-Buttons"**
→ `src/config/siteConfig.js`: `hero.cta.primary.label` / `hero.cta.secondary.label` ändern

**"Ändere wohin der primäre Hero-Button verlinkt"**
→ `src/config/siteConfig.js`: `hero.cta.primary.path` ändern

**"Füge eine neue Leistungskarte hinzu"**
→ `src/config/siteConfig.js`: neues Objekt in `services.items[]` hinzufügen

**"Erhöhe den Grundpreis für das Standard-Paket"**
→ `src/config/calculatorAdmin.js`: `packageTypes[].pricePerSqm` bei `value: "standard"` ändern

**"Füge ein neues Rechner-Feld hinzu (z.B. Alarmanlage)"**
→ `src/config/calculatorAdmin.js`: neues Feld in `fields` und in `technologyGroups` eintragen

**"Ändere die Kartenfarbe im Rechner"**
→ `src/components/calculator/modern-calculator.css`: Klasse `calc-brand-card` oder `calc-object-card`

**"Ändere den Footer-Text / Copyright"**
→ `src/config/siteConfig.js`: `footer.tagline` oder `footer.copyright` ändern

**"Ändere das Impressum / die Datenschutzerklärung"**
→ `src/config/siteConfig.js`: `legal.impressum.content[]` oder `legal.datenschutz.content[]` bearbeiten

**"Füge eine neue Seite hinzu"**
→ 1. Neue Datei in `src/pages/`, 2. Route in `src/App.jsx`, 3. NavLink in `src/config/siteConfig.js`

**"Ändere das Aussehen einer Section (z.B. Hero-Abstände)"**
→ `src/styles/sections.css`: passende Klasse suchen und anpassen

**"Ändere einen Button global"**
→ `src/styles/components.css`: Klasse `cta-primary`, `cta-secondary` oder `btn` anpassen
