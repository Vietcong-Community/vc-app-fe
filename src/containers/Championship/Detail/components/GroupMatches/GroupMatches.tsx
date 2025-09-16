import React from 'react';

import { Tabs } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Collapse } from '../../../../../components/Collapse/Collapse';
import { Gap } from '../../../../../components/Gap/Gap';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../../../theme/theme';
import { MatchRoundsTabs } from '../MatchRoundsTab/MatchRoundsTab';

import { messages } from './messages';

interface IProps {
  championshipId: string;
  isSingleGroup: boolean;
  roundsCount: number;
}

export const GroupMatches: React.FC<IProps> = (props: IProps) => {
  const { championshipId, isSingleGroup, roundsCount } = props;
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const items = Array.from({ length: roundsCount }).map((_, i) => {
    const roundId = i + 1;
    return {
      label: <FormattedMessage {...messages.roundName} values={{ value: roundId }} />,
      key: roundId.toString(),
      children: <MatchRoundsTabs id={championshipId} isSingleGroup={isSingleGroup} round={roundId} />,
    };
  });

  return (
    <Collapse
      defaultOpen={!isSmallerThanMd}
      withDivider={false}
      title={
        <H2>
          <FormattedMessage {...messages.subtitle} />{' '}
        </H2>
      }
    >
      <Gap defaultHeight={16} />
      <Tabs type="card" defaultActiveKey="1" items={items} style={{ width: '100%' }} />
    </Collapse>
  );
};
