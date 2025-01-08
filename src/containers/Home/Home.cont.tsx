import React from 'react';

import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const HomeCont: React.FC = () => {
  return (
    <>
      <div className="home-container">
        <header className="hero-section">
          <h1 className="hero-title">
            <FormattedMessage {...messages.title} />
          </h1>
          <p className="hero-subtitle">Připojte se k ultimátní soutěži v mixovaných zápasech!</p>
          <button className="cta-button">Připoj se!</button>
        </header>

        <section className="features-section">
          <div className="feature">
            <h2>Sledujte svůj postup</h2>
            <p>Monitorujte své výkony a stoupejte v žebříčku ligy.</p>
          </div>
          <div className="feature">
            <h2>Soutěžte s ostatními</h2>
            <p>Vyzývejte hráče a zlepšujte své dovednosti v reálných zápasech.</p>
          </div>
          <div className="feature">
            <h2>Zůstaňte v obraze</h2>
            <p>Získejte nejnovější informace o nadcházejících turnajích a událostech.</p>
          </div>
        </section>
      </div>
      <input type="checkbox" defaultChecked={false} />
    </>
  );
};
