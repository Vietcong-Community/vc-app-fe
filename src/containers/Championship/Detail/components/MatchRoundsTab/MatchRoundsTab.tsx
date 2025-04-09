import React from 'react';

import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchType } from '../../../../../constants/enums';
import { MatchCard } from '../MatchCard/MatchCard';

import { messages } from './messages';

import * as S from './MatchRoundsTab.style';

interface IProps {
  id: string;
  round: number;
}

export const MatchRoundsTabs: React.FC<IProps> = (props: IProps) => {
  const { id, round } = props;
  const matches = useSeasonMatchList(id, { page: 1, limit: 50, round, types: MatchType.GROUP }, 'always');

  return (
    <S.Container>
      <FormattedMessage {...messages.map} tagName="span" values={{ value: 'NVABase' }} />
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
