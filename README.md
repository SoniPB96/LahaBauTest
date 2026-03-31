# LAHA Baudienstleistungen - Optimierte Struktur

## Projektstruktur

```
optimized-structure/
├── public/                          # Statische Dateien
├── src/
│   ├── components/
│   │   ├── sections/               # Haupt-Sections der Website
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── TrustSection.jsx
│   │   │   ├── BegleitungSection.jsx
│   │   │   └── RequestSection.jsx
│   │   ├── ui/                     # Wiederverwendbare UI-Komponenten
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Logo.jsx
│   │   └── calculator/             # Rechner-Komponenten
│   │       └── EstimatorCard.jsx
│   ├── config/                     # Konfigurationsdateien
│   │   └── siteConfig.js          # Zentrale Content-Konfiguration
│   ├── utils/                      # Hilfsfunktionen (reserviert)
│   ├── assets/                     # Bilder, Fonts (reserviert)
│   ├── App.jsx                     # Haupt-App-Komponente
│   ├── main.jsx                    # Entry Point
│   └── styles.css                  # Globale Styles
├── index.html
├── package.json
└── vite.config.js
```

## Optimierungen

### 1. Komponenten-Struktur
- **Sections**: Eigenständige Bereiche der Website (Hero, Services, etc.)
- **UI**: Wiederverwendbare Komponenten (Header, Footer, Logo)
- **Calculator**: Rechner-spezifische Komponenten isoliert

### 2. Vorteile
- **Wartbarkeit**: Jede Section in eigener Datei
- **Skalierbarkeit**: Einfaches Hinzufügen neuer Sections
- **Übersichtlichkeit**: Klare Trennung nach Verantwortlichkeiten
- **Wiederverwendbarkeit**: Logo-Komponente in Header und Footer

### 3. Content-Management
- Alle Texte zentral in `config/siteConfig.js`
- Einfache Anpassung ohne Code-Änderungen
- Strukturierte Content-Verwaltung

### 4. Code-Qualität
- Keine Duplikate (z.B. Logo-Code)
- Klare Import-Struktur
- Konsistente Benennung
- Kleine, fokussierte Komponenten

## Installation

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
```

## Nächste Schritte

1. **Calculator erweitern**: Vollständige Rechner-Logik implementieren
2. **Form-Integration**: Kontaktformular funktional machen
3. **Utils hinzufügen**: Hilfsfunktionen bei Bedarf
4. **Assets organisieren**: Bilder und Fonts strukturieren
5. **Tests**: Component-Tests hinzufügen
