import React from 'react';

import { Collapse, Flex, Tabs, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasons } from '../../../api/hooks/seasons/api';
import { Button } from '../../../components/Button/Button';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { SeasonPreview } from './components/SeasonPreview/SeasonPreview';
import { messages } from './messages';

export const OverviewCont: React.FC = () => {
  const { navigate } = useRouter();

  const seasons = useSeasons();

  return (
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
                <FormattedMessage {...messages.descriptionContent} />
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
          {
            key: '3',
            label: (
              <Typography.Text>
                <FormattedMessage {...messages.ranksTab} />
              </Typography.Text>
            ),
            children: (
              <Typography.Text>
                <FormattedMessage {...messages.ranksContent} />
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
        items={seasons.data?.map((item, index) => {
          return {
            key: index + 1,
            label: <div style={{ textAlign: 'start' }}>{item.name}</div>,
            children: <SeasonPreview seasonId={item.id} />,
          };
        })}
        style={{ width: '100%' }}
      />
      <br />
      <Button onClick={() => navigate(Routes.SEASON_CREATE)}>
        <FormattedMessage {...messages.createNewSeason} />
      </Button>
    </Flex>
  );
};
