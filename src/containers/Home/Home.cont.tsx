import React from 'react';

import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Articles } from '../../components/Articles/Articles';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';

import { ActiveLeagues } from './components/ActiveLeagues/ActiveLeagues';
import { Banners } from './components/Banners/Banners';
import { messages } from './messages';

export const HomeCont: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <ContentLayout>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={64} height={{ md: 32 }} />
      <Banners />
      <Gap defaultHeight={64} height={{ md: 32 }} />
      <ActiveLeagues />
      <Gap defaultHeight={64} height={{ md: 32 }} />
      <Articles />
      <Gap defaultHeight={32} />
    </ContentLayout>
  );
};
