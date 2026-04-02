import React from 'react';
import ModernCalculatorPanel from '../components/calculator/ModernCalculatorPanel';
import { useNavigate } from 'react-router-dom';

function RechnerPage() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="section">
        <div className="container">
          <ModernCalculatorPanel
            onOpenRequestPage={() => navigate('/kontakt')}
            onClose={() => navigate('/')}
          />
        </div>
      </section>
    </main>
  );
}

export default RechnerPage;
