import React from 'react';

import { Collapse, Flex, Tabs, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasons } from '../../../api/hooks/league/seasons/api';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';

import { SeasonPreview } from './components/SeasonPreview/SeasonPreview';
import { messages } from './messages';

export const OverviewCont: React.FC = () => {
  const seasons = useSeasons();

  return (
    <ContentLayout>
      <Flex justify="flex-start" align="flex-start" style={{ padding: '0 1rem' }} vertical>
        <Typography.Title>
          <FormattedMessage {...messages.title} />
        </Typography.Title>
        <Tabs
          defaultActiveKey="1"
          size="middle"
          items={[
            {
              key: '1',
              label: (
                <Typography.Text>
                  <FormattedMessage {...messages.descriptionTab} />
                </Typography.Text>
              ),
              children: (
                <Typography.Text>
                  <FormattedMessage {...messages.descriptionContent} values={{ br: <br /> }} />
                </Typography.Text>
              ),
            },
            {
              key: '2',
              label: (
                <Typography.Text>
                  <FormattedMessage {...messages.rulesTab} />
                </Typography.Text>
              ),
              children: (
                <Typography.Text>
                  <FormattedMessage {...messages.rulesContent} />
                </Typography.Text>
              ),
            },
          ]}
          style={{ textAlign: 'start', width: '100%' }}
        />
        <Typography.Title level={2}>
          <FormattedMessage {...messages.seasonsTitle} />
        </Typography.Title>
        <Collapse
          defaultActiveKey="1"
          destroyInactivePanel
          items={seasons.data?.map((item, index) => {
            // TODO FIX CALL WHEN COLLAPSE IS OPEN
            return {
              key: index + 1,
              label: <div style={{ textAlign: 'start' }}>{item.name}</div>,
              children: <SeasonPreview isOpen={true} seasonId={item.id} status={item.status} />,
            };
          })}
          onChange={(key) => console.log(key)}
          style={{ width: '100%' }}
        />
      </Flex>
    </ContentLayout>
  );
};
