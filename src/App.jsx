import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/ui';
import StartPage from './pages/StartPage';
import RechnerPage from './pages/RechnerPage';
import BaubegleitungPage from './pages/BaubegleitungPage';
import KontaktPage from './pages/KontaktPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import './styles/design-tokens.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/components.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/"              element={<StartPage />} />
          <Route path="/rechner"       element={<RechnerPage />} />
          <Route path="/baubegleitung" element={<BaubegleitungPage />} />
          <Route path="/kontakt"       element={<KontaktPage />} />
          <Route path="/impressum"     element={<ImpressumPage />} />
          <Route path="/datenschutz"   element={<DatenschutzPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
