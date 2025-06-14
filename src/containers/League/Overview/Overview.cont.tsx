import React from 'react';

import { Flex, Spin, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { EaseInOutContainer } from 'src/components/Animations/EaseInOutContainer/EaseInOutContainer';

import { useLeaguesWithSeasonsList } from '../../../api/hooks/league/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { SeasonType } from '../../../constants/enums';

import { SeasonBox } from './components/SeasonBox/SeasonBox';
import { messages } from './messages';
import { getSeasons } from './utils';

import * as S from './Overview.style';

export const OverviewCont: React.FC = () => {
  const leaguesWithSeasons = useLeaguesWithSeasonsList([SeasonType.SEASON, SeasonType.FACEIT]);
  const { formatMessage } = useIntl();

  const seasons = getSeasons(leaguesWithSeasons.data);

  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-league', title: <FormattedMessage {...messages.title} /> }]}>
      <Helmet title={formatMessage(messages.title)} />
      <Flex justify="flex-start" align="center" vertical>
        <Typography.Title>
          <FormattedMessage {...messages.title} />
        </Typography.Title>
        <Typography.Text style={{ maxWidth: 800 }}>
          <FormattedMessage {...messages.description} />
        </Typography.Text>
        {leaguesWithSeasons.isLoading && (
          <>
            <Gap defaultHeight={36} />
            <Spin size="large" />
          </>
        )}
        <EaseInOutContainer isOpen={!leaguesWithSeasons.isLoading}>
          <>
            {seasons.active?.length > 0 && (
              <>
                <Gap defaultHeight={36} />
                <Typography.Title level={2}>
                  <FormattedMessage {...messages.activeSeasons} />
                </Typography.Title>
                <S.SeasonsContainer>
                  {seasons.active.map((item) => (
                    <SeasonBox league={item.league} season={item.season} />
                  ))}
                </S.SeasonsContainer>
              </>
            )}
            {seasons.archived.length > 0 && (
              <>
                <Gap defaultHeight={36} />
                <Typography.Title level={2}>
                  <FormattedMessage {...messages.archivedSeasons} />
                </Typography.Title>
                <S.SeasonsContainer>
                  {seasons.archived.map((item) => (
                    <SeasonBox league={item.league} season={item.season} />
                  ))}
                </S.SeasonsContainer>
              </>
            )}
          </>
        </EaseInOutContainer>
        <Gap defaultHeight={36} />
      </Flex>
    </ContentLayout>
  );
};
