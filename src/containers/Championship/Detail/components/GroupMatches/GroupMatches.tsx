import React from 'react';

import { Flex, Tabs } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Gap } from '../../../../../components/Gap/Gap';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { MatchRoundsTabs } from '../MatchRoundsTab/MatchRoundsTab';

import { messages } from './messages';

interface IProps {
  championshipId: string;
  roundsCount: number;
}

export const GroupMatches: React.FC<IProps> = (props: IProps) => {
  const { championshipId, roundsCount } = props;

  const items = Array.from({ length: roundsCount }).map((_, i) => {
    const roundId = i + 1;
    return {
      label: <FormattedMessage {...messages.roundName} values={{ value: roundId }} />,
      key: roundId.toString(),
      children: <MatchRoundsTabs id={championshipId} round={roundId} />,
    };
  });

  return (
    <Flex vertical align="flex-start">
      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
        <H2>
          <FormattedMessage {...messages.subtitle} />{' '}
        </H2>
      </Flex>
      <Gap defaultHeight={16} />
      <Tabs type="card" defaultActiveKey="1" items={items} style={{ width: '100%' }} />
    </Flex>
  );
};
