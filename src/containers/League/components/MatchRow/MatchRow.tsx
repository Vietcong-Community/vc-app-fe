import React from 'react';

import { IMatchListItem } from '../../../../api/hooks/league/interfaces';
import { MatchStatus } from '../../../../constants/enums';
import { useRouter } from '../../../../hooks/RouterHook';
import { Routes } from '../../../../routes/enums';
import { formatDateForUser } from '../../../../utils/dateUtils';

import * as S from './MatchRow.style';

interface IProps {
  leagueId: string;
  seasonId: string;
  match: IMatchListItem;
}

export const MatchRow: React.FC<IProps> = (props: IProps) => {
  const { leagueId, match, seasonId } = props;
  const { navigate } = useRouter();

  const scoreExists =
    match.status === MatchStatus.FINISHED || match.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION;

  const onMatchClick = () => {
    navigate(
      Routes.MATCH_DETAIL.replace(':leagueId', leagueId).replace(':seasonId', seasonId).replace(':matchId', match.id),
    );
  };

  return (
    <S.Container onClick={onMatchClick}>
      {formatDateForUser(match.startDate) ?? ''}
      <div>
        {match.challenger?.team.name} vs. {match.opponent?.team.name}
      </div>
      <S.Score>{scoreExists ? `${match.challengerScore} - ${match.opponentScore}` : '? - ?'}</S.Score>
    </S.Container>
  );
};
