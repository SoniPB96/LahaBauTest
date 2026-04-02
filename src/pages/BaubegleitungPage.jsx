import React from 'react';
import BegleitungSection from '../components/sections/BegleitungSection';
import { useNavigate } from 'react-router-dom';

function BaubegleitungPage() {
  const navigate = useNavigate();

  return (
    <main>
      <BegleitungSection onContact={() => navigate('/kontakt')} />
    </main>
  );
}

export default BaubegleitungPage;
