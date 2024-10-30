import React from 'react';

import { Button, Select, Space, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useMaps } from '../../api/hooks/enums/api';
import { useNotifications } from '../../hooks/NotificationsHook';
import { NotificationType } from '../../providers/NotificationsProvider/enums';

import { messages } from './messages';

export const HomeCont: React.FC = () => {
  const { data } = useMaps();
  const { showNotification } = useNotifications();

  return (
    <>
<<<<<<< HEAD
      HOME PAGE VJETKONGA
      <br />
      sem dat nejake super cool veci
      <Typography.Title level={2}>
        <FormattedMessage {...messages.title} />
      </Typography.Title>
      <Select
        options={data?.map((item) => ({ value: item.id, label: <span>{item.name}</span> })) ?? []}
        style={{ margin: '0 auto', width: '10rem' }}
      />
      <Space>
        <Button onClick={() => showNotification('Uspech bez dalsiho popisku')}>Success</Button>
        <Button
          onClick={() =>
            showNotification(
              'Informacni notifikace',
              'Pri volani v kodu je ctvrty argument cislo 7, ktere urcuje, za jak dlouho se zavru',
              NotificationType.INFO,
              7,
            )
          }
        >
          Info
        </Button>
        <Button
          onClick={() =>
            showNotification(
              'Vystrazna notifikace',
              'Ahoj, ja jsem ale pekna vystrazna notifikace',
              NotificationType.WARNING,
            )
          }
        >
          Warning
        </Button>
        <Button onClick={() => showNotification('Chybka', 'Chybova notifikace', NotificationType.ERROR)}>Error</Button>
      </Space>
=======
      <div className="home-container">
        <header className="hero-section">
          <h1 className="hero-title">Vítejte v MCRVC Lize</h1>
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
>>>>>>> 34965fd (bascciprvnishit)
    </>
  );
};
