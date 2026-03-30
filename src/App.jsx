import React from 'react';
import { MessageCircle, CheckCircle2, UserCheck, ShieldCheck, Clock3 } from 'lucide-react';
import './styles.css';

const PHONE_DISPLAY = "0176 / 820 67 106";
const PHONE_LINK = "tel:+4917682067106";
const EMAIL = "kontakt@laha-bau.de";
const WHATSAPP_LINK = "https://wa.me/4917682067106";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <div className="brand-name">LAHA</div>
            <div className="brand-sub">BAUDIENSTLEISTUNGEN</div>
          </div>
          <nav className="nav">
            <span>Start</span>
            <span>Kostenschätzer</span>
            <span>Kontakt</span>
          </nav>
          <button className="btn">Anfrage stellen</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">

              <div className="badge-row">
                <span className="badge">Elektroarbeiten in Paderborn und Umgebung</span>
                <span className="badge muted">Unverbindliche Ersteinschätzung</span>
              </div>

              <h1>Saubere Elektroarbeiten. Klare Kommunikation. Verlässliche Ausführung.</h1>

              <p>
                Ich unterstütze Privatkunden bei Sanierung, Modernisierung und Erweiterung elektrischer Anlagen.
                Der Fokus liegt auf sauberer Ausführung, klarer Abstimmung und einer realistischen unverbindlichen Ersteinschätzung.
              </p>

              <div className="button-row">
                <button className="btn">Kostenschätzung starten</button>
                <button className="btn btn-outline">Unverbindlich anfragen</button>
              </div>

              <div className="cta-row">
                <a href={PHONE_LINK} className="btn">Jetzt anrufen</a>
                <a href={WHATSAPP_LINK} className="btn btn-outline" target="_blank">
                  <MessageCircle size={16}/> WhatsApp
                </a>
              </div>

              <div className="mini-grid">
                {[
                  { icon: <CheckCircle2 size={16} />, text: "Saubere Ausführung" },
                  { icon: <UserCheck size={16} />, text: "Klare Abstimmung" },
                  { icon: <ShieldCheck size={16} />, text: "Realistische Ersteinschätzung" },
                  { icon: <Clock3 size={16} />, text: "Paderborn und Umland" },
                ].map((item) => (
                  <div key={item.text} className="mini-card">
                    <div className="mini-icon">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>

            </div>

            <div className="hero-side">
              <div className="card">
                <div className="card-pad">
                  <div className="eyebrow">Digitale Ersteinschätzung</div>
                  <h3>Elektro-Kostenschätzer</h3>
                  <div className="price">6.900 € – 9.800 €</div>
                  <p>Unverbindliche Preisspanne auf Basis von Fläche, Ausstattung und Zusatzoptionen.</p>
                  <button className="btn full">Rechner öffnen</button>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
