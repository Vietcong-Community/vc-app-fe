import React from 'react';

import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Gap } from '../../components/Gap/Gap';

import { ActiveLeagues } from './components/ActiveLeagues/ActiveLeagues';
import { Articles } from './components/Articles/Articles';
import { messages } from './messages';

export const HomeCont: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Helmet title={formatMessage(messages.title)} />
      <Articles />
      <Gap defaultHeight={64} height={{ md: 32 }} />
      <ActiveLeagues />
      <Gap defaultHeight={32} />
    </>
  );
};
