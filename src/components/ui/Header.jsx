import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import Logo from './Logo';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </NavLink>

        <nav className="nav">
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

        <button
          className="cta-button"
          onClick={() => navigate('/kontakt')}
        >
          {siteConfig.navigation.ctaLabel}
        </button>
      </div>
    </header>
  );
}

export default Header;
