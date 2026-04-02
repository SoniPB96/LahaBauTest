import React from 'react';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import Logo from './Logo';

function Footer() {
  const { footer, navigation, company, legal } = siteConfig;

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Marken-Spalte */}
        <div className="footer-brand">
          <Logo />
          <p>{footer.tagline}</p>
        </div>

        <div className="footer-links">

          {/* Seiten — automatisch aus navigation.items */}
          <div>
            <h4>{footer.columns.pages.heading}</h4>
            {navigation.items.map((item) => (
              <NavLink key={item.key} to={item.path}>{item.label}</NavLink>
            ))}
          </div>

          {/* Kontakt */}
          <div>
            <h4>{footer.columns.contact.heading}</h4>
            <a href={company.phoneLink}>{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          {/* Rechtliches — echte NavLinks statt toter Buttons */}
          <div>
            <h4>{footer.columns.legal.heading}</h4>
            <NavLink to={legal.impressum.path}>{legal.impressum.label}</NavLink>
            <NavLink to={legal.datenschutz.path}>{legal.datenschutz.label}</NavLink>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
