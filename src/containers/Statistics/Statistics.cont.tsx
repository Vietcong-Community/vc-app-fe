import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Gap } from '../../components/Gap/Gap';

import { messages } from './messages';

export const StatisticsCont: React.FC = () => {
  return (
    <>
      <h1>
        <FormattedMessage {...messages.title} />
      </h1>
      <Gap defaultHeight={32} />
      <FormattedMessage {...messages.tba} />
      <Gap defaultHeight={96} />
    </>
  );
};
