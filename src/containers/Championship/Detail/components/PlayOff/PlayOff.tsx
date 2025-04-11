import React from 'react';

import { Flex, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { Gap } from '../../../../../components/Gap/Gap';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { MatchType } from '../../../../../constants/enums';

import { messages } from './messages';

interface IProps {
  seasonId: string;
}

export const PlayOff: React.FC<IProps> = (props: IProps) => {
  const { seasonId } = props;

  const matches = useSeasonMatchList(seasonId, {
    page: 1,
    limit: 50,
    types: [MatchType.PLAYOFF, MatchType.PLAYOFF_SMALL_FINAL, MatchType.PLAYOFF_FINAL].toString(),
  });

  return (
    <Flex vertical align="flex-start">
      <H2>
        <FormattedMessage {...messages.title} />
      </H2>
      {matches.isLoading && (
        <>
          <Gap defaultHeight={16} />
          <Spin size="large" />
        </>
      )}
      {matches.data?.total}
    </Flex>
  );
};
