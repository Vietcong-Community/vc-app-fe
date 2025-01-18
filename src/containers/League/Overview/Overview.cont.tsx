import React from 'react';

import { Flex, Spin, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useLeagueList } from '../../../api/hooks/league/api';
import { Collapse } from '../../../components/Collapse/Collapse';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';

import { LeaguePreview } from './components/LeaguePreview/LeaguePreview';
import { messages } from './messages';

export const OverviewCont: React.FC = () => {
  const leagues = useLeagueList();

  return (
    <ContentLayout>
      <Flex justify="flex-start" align="center" vertical>
        <Typography.Title>
          <FormattedMessage {...messages.title} />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage {...messages.description} />
        </Typography.Text>
        {leagues.isLoading && (
          <>
            <Gap defaultHeight={36} />
            <Spin size="large" />
          </>
        )}
        {!leagues.isLoading && (
          <>
            <Typography.Title level={2}>
              <FormattedMessage {...messages.leaguesTitle} />
            </Typography.Title>
            <Collapse
              defaultActiveKey="collapse-league-1"
              destroyInactivePanel
              items={
                leagues.data?.items.map((league, index) => {
                  return {
                    key: `collapse-league-${index + 1}`,
                    label: <div style={{ fontWeight: 600, textAlign: 'start' }}>{league.name}</div>,
                    children: <LeaguePreview leagueDetail={league} />,
                  };
                }) ?? []
              }
            />
          </>
        )}
        <Gap defaultHeight={36} />
      </Flex>
    </ContentLayout>
  );
};
