import React from 'react';
import { siteConfig } from '../config/siteConfig';

function LegalPage({ config }) {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-xl)' }}>
            {config.title}
          </h1>
          {config.content.map((block, i) => (
            <div key={i} style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h2 style={{
                color: 'var(--text-primary)',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: 'var(--spacing-xs)',
              }}>
                {block.heading}
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-line',
                lineHeight: 1.7,
              }}>
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ImpressumPage() {
  return <LegalPage config={siteConfig.legal.impressum} />;
}
