import React from 'react';

import { TrophyOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { EXTERNAL_LINKS } from '../../constants/externalLinks';

import { messages } from './messages';

import * as S from './Statistics.style';

export const StatisticsCont: React.FC = () => {
  return (
    <>
      <ContentLayout breadcrumbItems={[{ key: 'bc-mcrvc', title: <FormattedMessage {...messages.title} /> }]}>
        <S.Container>
          <H1>
            <FormattedMessage {...messages.title} />
          </H1>
          <S.Content>
            <FormattedMessage {...messages.tba} />
            <Gap defaultHeight={5} />
            <S.StatsLink>
              <FormattedMessage {...messages.tbaA} />
              <a href={EXTERNAL_LINKS.STATS_BY_ILE} target="_blank">
                <TrophyOutlined />
              </a>
            </S.StatsLink>
            <Gap defaultHeight={96} />
          </S.Content>
        </S.Container>
      </ContentLayout>
    </>
  );
};
