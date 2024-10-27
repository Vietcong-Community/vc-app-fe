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
    </>
  );
};
