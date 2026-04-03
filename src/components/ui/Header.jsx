import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import Logo from './Logo';

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <Logo />
        </NavLink>

        {/* Desktop nav */}
        <nav className="nav desktop-nav">
          {siteConfig.navigation.items.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="desktop-cta">
          <button
            className="cta-button"
            onClick={() => navigate('/kontakt')}
          >
            {siteConfig.navigation.ctaLabel}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="header-container">
            <div className="mobile-menu-inner">
              {siteConfig.navigation.items.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.path)}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="mobile-cta"
                onClick={() => handleNav('/kontakt')}
              >
                {siteConfig.navigation.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
