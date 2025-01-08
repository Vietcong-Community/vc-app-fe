import React from 'react';

import { IMixedMatch, MixedMatchStatus } from '../../../../api/hooks/mixedLeague/interfaces';
import { useRouter } from '../../../../hooks/RouterHook';
import { Routes } from '../../../../routes/enums';
import { formatDateForUser } from '../../../../utils/dateUtils';

import * as S from './MatchRow.style';

interface IProps {
  match: IMixedMatch;
}

export const MatchRow: React.FC<IProps> = (props: IProps) => {
  const { match } = props;
  const { navigate } = useRouter();

  const scoreExists = match.status !== MixedMatchStatus.NEW && match.status !== MixedMatchStatus.READY;

  return (
    <S.Container onClick={() => navigate(Routes.MIXED_MATCH_DETAIL.replace(':id', match.id))}>
      {formatDateForUser(match.date) ?? ''}
      <div>
        {match.firstCaptain?.nickname} vs. {match.secondCaptain?.nickname}
      </div>
      <S.Score>{scoreExists ? `${match.firstTeamScore} - ${match.secondTeamScore}` : '? - ?'}</S.Score>
    </S.Container>
  );
};
