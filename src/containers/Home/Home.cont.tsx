import React from 'react';

import { Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useMaps } from '../../api/hooks/enums/api';

import { messages } from './messages';

export const HomeCont: React.FC = () => {
  const { data } = useMaps();
  console.log(data);
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
    </>
  );
};
