import React from 'react';

import { IMatch } from '../../../../api/hooks/league/interfaces';
import { MatchStatus } from '../../../../constants/enums';
import { useRouter } from '../../../../hooks/RouterHook';
import { Routes } from '../../../../routes/enums';
import { formatDateForUser } from '../../../../utils/dateUtils';

import * as S from './MatchRow.style';

interface IProps {
  leagueId: string;
  seasonId: string;
  match: IMatch;
}

export const MatchRow: React.FC<IProps> = (props: IProps) => {
  const { leagueId, match, seasonId } = props;
  const { navigate } = useRouter();

  const scoreExists = match.status !== MatchStatus.NEW && match.status !== MatchStatus.READY;

  const onMatchClick = () => {
    navigate(
      Routes.MATCH_DETAIL.replace(':leagueId', leagueId).replace(':seasonId', seasonId).replace(':matchId', match.id),
    );
  };

  return (
    <S.Container onClick={onMatchClick}>
      {formatDateForUser(match.date) ?? ''}
      <div>
        {match.challengerTeam?.name} vs. {match.opponentTeam?.name}
      </div>
      <S.Score>{scoreExists ? `${match.firstTeamScore} - ${match.secondTeamScore}` : '? - ?'}</S.Score>
    </S.Container>
  );
};
