import React from 'react';

import { Spin } from 'antd';
import { groupBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { useMatchDetail, useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchType } from '../../../../../constants/enums';
import { MatchCard } from '../MatchCard/MatchCard';

import { messages } from './messages';

import * as S from './MatchRoundsTab.style';

interface IProps {
  id: string;
  isSingleGroup: boolean;
  round: number;
}

export const MatchRoundsTabs: React.FC<IProps> = (props: IProps) => {
  const { id, isSingleGroup, round } = props;
  const matches = useSeasonMatchList(id, { page: 1, limit: 50, round, types: MatchType.GROUP }, 'always');

  const groupedMatches = isSingleGroup
    ? (matches.data?.matches ?? [])
    : groupBy(matches.data?.matches, 'challenger.group');

  console.log(groupedMatches);

  const firstMatch = useMatchDetail(matches.data?.matches?.[0]?.id);

  return (
    <S.Container>
      <FormattedMessage
        {...messages.map}
        tagName="span"
        values={{
          value: firstMatch.isLoading ? <Spin style={{ marginLeft: 8 }} /> : firstMatch.data?.challengerMap?.name,
        }}
      />
      <S.MatchContainer>
        {matches.isLoading && (
          <>
            <Gap defaultHeight={16} />
            <Spin size="large" />
          </>
        )}
        {matches.data?.matches?.map((item) => {
          return <MatchCard key={item.id} match={item} />;
        })}
      </S.MatchContainer>
    </S.Container>
  );
};
