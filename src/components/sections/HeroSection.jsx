import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

function HeroSection() {
  const navigate = useNavigate();

  const subline = siteConfig.hero.subheadline.startsWith('—')
    ? siteConfig.hero.subheadline
    : `— ${siteConfig.hero.subheadline}`;

  const sublineClean = siteConfig.hero.subheadline.replace(/^—\s*/, '');

  return (
    <section id="start" className="hero-v2">

      {/* ── Elektroplan SVG Hintergrund ── */}
      <svg
        className="hero-plan-svg"
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="1600" height="900" fill="#080C12"/>
        <defs>
          <pattern id="sg" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(60,100,160,0.12)" strokeWidth="0.4"/>
          </pattern>
          <pattern id="lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#sg)"/>
            <path d="M200 0L0 0 0 200" fill="none" stroke="rgba(60,100,160,0.22)" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#lg)"/>

        {/* Planrahmen */}
        <rect x="500" y="40" width="1060" height="840" fill="none" stroke="rgba(60,110,180,0.2)" strokeWidth="1"/>

        {/* Schriftfeld */}
        <rect x="1280" y="760" width="280" height="120" fill="rgba(30,50,90,0.08)" stroke="rgba(60,110,180,0.2)" strokeWidth="0.8"/>
        <line x1="1280" y1="790" x2="1560" y2="790" stroke="rgba(60,110,180,0.15)" strokeWidth="0.5"/>
        <line x1="1280" y1="820" x2="1560" y2="820" stroke="rgba(60,110,180,0.15)" strokeWidth="0.5"/>
        <line x1="1280" y1="850" x2="1560" y2="850" stroke="rgba(60,110,180,0.15)" strokeWidth="0.5"/>
        <line x1="1400" y1="760" x2="1400" y2="880" stroke="rgba(60,110,180,0.15)" strokeWidth="0.5"/>
        <text x="1290" y="808" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.3)" letterSpacing="1">LAHA BAUDIENSTLEISTUNGEN</text>
        <text x="1290" y="838" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.25)" letterSpacing="1">ELEKTROINSTALLATION EG</text>
        <text x="1290" y="868" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.2)" letterSpacing="1">PADERBORN · REV.A · 2024</text>
        <text x="1410" y="808" fontFamily="monospace" fontSize="8" fill="rgba(80,130,200,0.35)" letterSpacing="1">1:50</text>

        {/* Außenwände */}
        <rect x="560" y="100" width="960" height="640" fill="none" stroke="rgba(80,130,200,0.35)" strokeWidth="6"/>
        {/* Innenwände */}
        <line x1="760" y1="100" x2="760" y2="500" stroke="rgba(80,130,200,0.28)" strokeWidth="5"/>
        <line x1="760" y1="540" x2="760" y2="740" stroke="rgba(80,130,200,0.28)" strokeWidth="5"/>
        <line x1="560" y1="360" x2="920" y2="360" stroke="rgba(80,130,200,0.25)" strokeWidth="4"/>
        <line x1="960" y1="360" x2="1080" y2="360" stroke="rgba(80,130,200,0.25)" strokeWidth="4"/>
        <line x1="1080" y1="100" x2="1080" y2="360" stroke="rgba(80,130,200,0.25)" strokeWidth="4"/>
        <line x1="1080" y1="400" x2="1080" y2="740" stroke="rgba(80,130,200,0.25)" strokeWidth="4"/>
        <line x1="760" y1="560" x2="1080" y2="560" stroke="rgba(80,130,200,0.2)" strokeWidth="3.5"/>
        <line x1="1120" y1="560" x2="1520" y2="560" stroke="rgba(80,130,200,0.2)" strokeWidth="3.5"/>
        <line x1="1320" y1="100" x2="1320" y2="560" stroke="rgba(80,130,200,0.22)" strokeWidth="4"/>
        <line x1="1320" y1="600" x2="1320" y2="740" stroke="rgba(80,130,200,0.22)" strokeWidth="4"/>

        {/* Türen */}
        <path d="M760 500 Q800 500 800 540" fill="none" stroke="rgba(80,130,200,0.3)" strokeWidth="1.5"/>
        <path d="M920 360 Q920 400 960 400" fill="none" stroke="rgba(80,130,200,0.3)" strokeWidth="1.5"/>
        <path d="M1080 360 Q1080 400 1040 400" fill="none" stroke="rgba(80,130,200,0.3)" strokeWidth="1.5"/>
        <path d="M1080 560 Q1080 600 1120 600" fill="none" stroke="rgba(80,130,200,0.3)" strokeWidth="1.5"/>
        <path d="M1320 560 Q1360 560 1360 600" fill="none" stroke="rgba(80,130,200,0.3)" strokeWidth="1.5"/>

        {/* Raumbezeichnungen */}
        <text x="640" y="240" fontFamily="monospace" fontSize="10" fill="rgba(80,130,200,0.22)" letterSpacing="2" textAnchor="middle">WOHNZIMMER</text>
        <text x="640" y="255" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.15)" textAnchor="middle">A = 28.4 m²</text>
        <text x="640" y="580" fontFamily="monospace" fontSize="10" fill="rgba(80,130,200,0.22)" letterSpacing="2" textAnchor="middle">KÜCHE</text>
        <text x="640" y="595" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.15)" textAnchor="middle">A = 14.2 m²</text>
        <text x="920" y="220" fontFamily="monospace" fontSize="10" fill="rgba(80,130,200,0.22)" letterSpacing="2" textAnchor="middle">SCHLAFZIMMER</text>
        <text x="920" y="480" fontFamily="monospace" fontSize="9" fill="rgba(80,130,200,0.2)" letterSpacing="1" textAnchor="middle">FLUR</text>
        <text x="1200" y="220" fontFamily="monospace" fontSize="10" fill="rgba(80,130,200,0.22)" letterSpacing="2" textAnchor="middle">BAD</text>
        <text x="1420" y="300" fontFamily="monospace" fontSize="10" fill="rgba(80,130,200,0.22)" letterSpacing="2" textAnchor="middle">ZIMMER</text>
        <text x="1420" y="650" fontFamily="monospace" fontSize="9" fill="rgba(80,130,200,0.2)" letterSpacing="1" textAnchor="middle">ZIMMER 2</text>

        {/* Steckdosen */}
        <g stroke="rgba(100,160,255,0.45)" strokeWidth="1.2" fill="none">
          <circle cx="580" cy="320" r="6"/><line x1="580" y1="314" x2="580" y2="326"/>
          <circle cx="620" cy="320" r="6"/><line x1="620" y1="314" x2="620" y2="326"/>
          <circle cx="700" cy="120" r="6"/><line x1="700" y1="114" x2="700" y2="126"/>
          <circle cx="580" cy="120" r="6"/><line x1="580" y1="114" x2="580" y2="126"/>
          <circle cx="580" cy="440" r="6"/><line x1="580" y1="434" x2="580" y2="446"/>
          <circle cx="620" cy="440" r="6"/><line x1="620" y1="434" x2="620" y2="446"/>
          <circle cx="660" cy="440" r="6"/><line x1="660" y1="434" x2="660" y2="446"/>
          <circle cx="840" cy="150" r="6"/><line x1="840" y1="144" x2="840" y2="156"/>
          <circle cx="900" cy="150" r="6"/><line x1="900" y1="144" x2="900" y2="156"/>
          <circle cx="1020" cy="150" r="6"/><line x1="1020" y1="144" x2="1020" y2="156"/>
          <circle cx="1360" cy="150" r="6"/><line x1="1360" y1="144" x2="1360" y2="156"/>
          <circle cx="1460" cy="150" r="6"/><line x1="1460" y1="144" x2="1460" y2="156"/>
          <circle cx="1490" cy="300" r="6"/><line x1="1490" y1="294" x2="1490" y2="306"/>
          <circle cx="1140" cy="150" r="6"/><line x1="1140" y1="144" x2="1140" y2="156"/>
          <circle cx="1260" cy="200" r="6"/><line x1="1260" y1="194" x2="1260" y2="206"/>
        </g>

        {/* Lichtauslässe */}
        <g stroke="rgba(100,160,255,0.5)" strokeWidth="1.2" fill="none">
          <circle cx="640" cy="220" r="8"/><line x1="632" y1="220" x2="648" y2="220"/><line x1="640" y1="212" x2="640" y2="228"/>
          <circle cx="640" cy="580" r="8"/><line x1="632" y1="580" x2="648" y2="580"/><line x1="640" y1="572" x2="640" y2="588"/>
          <circle cx="920" cy="220" r="8"/><line x1="912" y1="220" x2="928" y2="220"/><line x1="920" y1="212" x2="920" y2="228"/>
          <circle cx="1200" cy="200" r="8"/><line x1="1192" y1="200" x2="1208" y2="200"/><line x1="1200" y1="192" x2="1200" y2="208"/>
          <circle cx="1420" cy="300" r="8"/><line x1="1412" y1="300" x2="1428" y2="300"/><line x1="1420" y1="292" x2="1420" y2="308"/>
          <circle cx="1200" cy="640" r="8"/><line x1="1192" y1="640" x2="1208" y2="640"/><line x1="1200" y1="632" x2="1200" y2="648"/>
          <circle cx="1420" cy="640" r="8"/><line x1="1412" y1="640" x2="1428" y2="640"/><line x1="1420" y1="632" x2="1420" y2="648"/>
        </g>

        {/* Lichtschalter */}
        <g stroke="rgba(100,160,255,0.4)" strokeWidth="1.2" fill="none">
          <rect x="730" y="355" width="12" height="8" rx="1"/>
          <rect x="800" y="355" width="12" height="8" rx="1"/>
          <rect x="1070" y="355" width="12" height="8" rx="1"/>
          <rect x="1070" y="555" width="12" height="8" rx="1"/>
          <rect x="1310" y="555" width="12" height="8" rx="1"/>
        </g>

        {/* Leitungsführung */}
        <g stroke="rgba(80,140,220,0.2)" strokeWidth="1" strokeDasharray="6,4" fill="none">
          <polyline points="920,420 920,380 1080,380 1080,300 1200,300"/>
          <polyline points="920,420 860,420 860,220 920,220"/>
          <polyline points="920,420 920,500 760,500 760,400 640,400 640,220"/>
          <polyline points="1200,300 1200,200"/>
          <polyline points="1200,300 1320,300 1320,400 1420,400 1420,300"/>
          <polyline points="1200,300 1200,640"/>
          <polyline points="640,220 580,220 580,320"/>
          <polyline points="640,580 580,580 580,440"/>
        </g>

        {/* Hauptverteiler */}
        <rect x="900" y="400" width="40" height="50" rx="2" fill="rgba(30,60,120,0.15)" stroke="rgba(100,160,255,0.5)" strokeWidth="1.5"/>
        <line x1="900" y1="415" x2="940" y2="415" stroke="rgba(100,160,255,0.3)" strokeWidth="0.8"/>
        <line x1="900" y1="425" x2="940" y2="425" stroke="rgba(100,160,255,0.3)" strokeWidth="0.8"/>
        <line x1="900" y1="435" x2="940" y2="435" stroke="rgba(100,160,255,0.3)" strokeWidth="0.8"/>
        <line x1="900" y1="445" x2="940" y2="445" stroke="rgba(100,160,255,0.3)" strokeWidth="0.8"/>
        <text x="920" y="462" fontFamily="monospace" fontSize="6" fill="rgba(100,160,255,0.4)" textAnchor="middle">HV</text>

        {/* Maßlinien */}
        <g stroke="rgba(80,130,200,0.18)" strokeWidth="0.6" fill="none">
          <line x1="560" y1="80" x2="760" y2="80"/>
          <line x1="560" y1="75" x2="560" y2="85"/>
          <line x1="760" y1="75" x2="760" y2="85"/>
          <text x="660" y="76" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.25)" textAnchor="middle">5.00 m</text>
          <line x1="760" y1="80" x2="1080" y2="80"/>
          <line x1="1080" y1="75" x2="1080" y2="85"/>
          <text x="920" y="76" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.25)" textAnchor="middle">8.00 m</text>
          <line x1="1080" y1="80" x2="1320" y2="80"/>
          <line x1="1320" y1="75" x2="1320" y2="85"/>
          <text x="1200" y="76" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.25)" textAnchor="middle">6.00 m</text>
          <line x1="1320" y1="80" x2="1520" y2="80"/>
          <line x1="1520" y1="75" x2="1520" y2="85"/>
          <text x="1420" y="76" fontFamily="monospace" fontSize="7" fill="rgba(80,130,200,0.25)" textAnchor="middle">5.00 m</text>
        </g>
      </svg>

      {/* ── Vignette — stark links für Lesbarkeit ── */}
      <div className="hero-vignette" />
      <div className="hero-vignette-top" />

      {/* ── LAHA Outline ── */}
      <div className="hero-bg-word" aria-hidden="true">LAHA</div>

      {/* ── Hero Content ── */}
      <div className="hero-v2-inner">

        {/* Tag oben */}
        <p className="hero-v2-tag">{siteConfig.hero.badge}</p>

        {/* Headline — oben links */}
        <div className="hero-v2-headline">
          <h1 className="hero-headline">
            Handwerk,<br />das hält.
          </h1>
          <span className="hero-headline-italic">{subline}</span>
        </div>

        {/* Spacer */}
        <div className="hero-v2-spacer" />

        {/* Info-Zeile unten — kein CTA, nur Kontext */}
        <div className="hero-v2-footer">
          <div className="hero-v2-footer-cell">
            <p className="hero-v2-body">{sublineClean}</p>
          </div>
          <div className="hero-v2-footer-cell">
            <p className="hero-v2-trust">
              Ein Ansprechpartner.<br />
              Kein Pfuschen.<br />
              Keine versteckten Kosten.
            </p>
            <p className="hero-v2-trust-sub">{siteConfig.hero.trustLine}</p>
          </div>
          <div className="hero-v2-footer-cell">
            <button
              className="hero-v2-rechner-btn"
              onClick={() => navigate(siteConfig.hero.cta.secondary.path)}
            >
              {siteConfig.hero.cta.secondary.label}
            </button>
          </div>
        </div>
      </div>

      <button
        className="scroll-indicator"
        onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={18} />
      </button>
    </section>
  );
}

export default HeroSection;
