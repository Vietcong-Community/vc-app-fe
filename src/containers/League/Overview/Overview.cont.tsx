import React from 'react';

import { Flex, Spin, Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { EaseInOutContainer } from 'src/components/Animations/EaseInOutContainer/EaseInOutContainer';

import { useLeaguesWithSeasonsList } from '../../../api/hooks/league/api';
import { Collapse } from '../../../components/Collapse/Collapse';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { SeasonType } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { LeaguePreview } from './components/LeaguePreview/LeaguePreview';
import { messages } from './messages';

export const OverviewCont: React.FC = () => {
  const { pathname } = useRouter();
  const leaguesWithSeasons = useLeaguesWithSeasonsList(SeasonType.SEASON);
  const { formatMessage } = useIntl();

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
        {leaguesWithSeasons.isLoading && (
          <>
            <Gap defaultHeight={36} />
            <Spin size="large" />
          </>
        )}
        <EaseInOutContainer isOpen={!leaguesWithSeasons.isLoading}>
          <>
            <Gap defaultHeight={36} />
            <Typography.Title level={2}>
              <FormattedMessage {...messages.leaguesTitle} />
            </Typography.Title>
            <Collapse
              destroyInactivePanel
              defaultActiveKey={'collapse-league-1'}
              items={
                leaguesWithSeasons.data?.map((league, index) => {
                  return {
                    key: `collapse-league-${index + 1}`,
                    label: <div style={{ fontWeight: 600, textAlign: 'start' }}>{league.league.name}</div>,
                    children: (
                      <LeaguePreview
                        key={`collapse-league-${index + 1}`}
                        leagueDetail={league.league}
                        seasons={league.seasons}
                      />
                    ),
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
