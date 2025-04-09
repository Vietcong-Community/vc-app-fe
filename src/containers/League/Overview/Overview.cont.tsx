import React from 'react';

import { Flex, Spin, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { EaseInOutContainer } from 'src/components/Animations/EaseInOutContainer/EaseInOutContainer';

import { useLeagueList } from '../../../api/hooks/league/api';
import { Collapse } from '../../../components/Collapse/Collapse';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { LeagueType } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { ActiveSeasonBox } from './components/ActiveSeasonBox/ActiveSeasonBox';
import { LeaguePreview } from './components/LeaguePreview/LeaguePreview';
import { messages } from './messages';

import * as S from './Overview.style';

export const OverviewCont: React.FC = () => {
  const { pathname } = useRouter();
  const leagues = useLeagueList();
  const { formatMessage } = useIntl();

  const leaguesWithoutTournaments =
    leagues.data?.items?.filter((item) => item.type === LeagueType.TEAMPLAY || item.type === LeagueType.TWOVSTWO) ?? [];

  return (
    <ContentLayout
      breadcrumbItems={
        pathname === Routes.LEAGUE ? [{ key: 'bc-league', title: <FormattedMessage {...messages.title} /> }] : []
      }
    >
      <Helmet title={formatMessage(messages.title)} />
      <Flex justify="flex-start" align="center" vertical>
        <Typography.Title>
          <FormattedMessage {...messages.title} />
        </Typography.Title>
        <Typography.Text style={{ maxWidth: 800 }}>
          <FormattedMessage {...messages.description} />
        </Typography.Text>

        {leagues.isLoading && (
          <>
            <Gap defaultHeight={36} />
            <Spin size="large" />
          </>
        )}
        <EaseInOutContainer isOpen={!leagues.isLoading}>
          <>
            <Gap defaultHeight={16} />
            <Typography.Title level={2}>
              <FormattedMessage {...messages.activeSeasons} />
            </Typography.Title>
            <S.ActiveSeasons>
              {leaguesWithoutTournaments.map((league) => (
                <ActiveSeasonBox key={`${league.id}-active-season`} leagueDetail={league} />
              ))}
            </S.ActiveSeasons>
            <Gap defaultHeight={36} />
            <Typography.Title level={2}>
              <FormattedMessage {...messages.leaguesTitle} />
            </Typography.Title>
            <Collapse
              destroyInactivePanel
              items={
                leaguesWithoutTournaments.map((league, index) => {
                  return {
                    key: `collapse-league-${index + 1}`,
                    label: <div style={{ fontWeight: 600, textAlign: 'start' }}>{league.name}</div>,
                    children: <LeaguePreview key={`collapse-league-${index + 1}`} leagueDetail={league} />,
                  };
                }) ?? []
              }
            />
          </>
        </EaseInOutContainer>
        <Gap defaultHeight={36} />
      </Flex>
    </ContentLayout>
  );
};
