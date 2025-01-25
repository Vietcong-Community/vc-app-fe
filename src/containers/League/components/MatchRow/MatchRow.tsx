import React from 'react';

import { IMatchListItem } from '../../../../api/hooks/league/interfaces';
import { MatchStatus } from '../../../../constants/enums';
import { useRouter } from '../../../../hooks/RouterHook';
import { Routes } from '../../../../routes/enums';
import { formatDateForUser } from '../../../../utils/dateUtils';

import * as S from './MatchRow.style';

interface IProps {
  match: IMatchListItem;
}

export const MatchRow: React.FC<IProps> = (props: IProps) => {
  const { match } = props;
  const { navigate } = useRouter();

  const scoreExists =
    match.status === MatchStatus.FINISHED || match.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION;

  const onMatchClick = () => {
    navigate(Routes.MATCH_DETAIL.replace(':matchId', match.id));
  };

  const challengerWon =
    scoreExists &&
    match.challengerScore !== undefined &&
    match.opponentScore !== undefined &&
    match.challengerScore > match.opponentScore;
  const opponentWon =
    scoreExists &&
    match.challengerScore !== undefined &&
    match.opponentScore !== undefined &&
    match.challengerScore < match.opponentScore;

  return (
    <S.Container onClick={onMatchClick}>
      {formatDateForUser(match.startDate) ?? ''}
      <div>
        <S.HighlightedText $isWinning={challengerWon} $isLosing={opponentWon}>
          {match.challenger?.team.tag}
        </S.HighlightedText>
        <span style={{ fontSize: 12, margin: '0 8px' }}>{' vs. '}</span>
        <S.HighlightedText $isWinning={opponentWon} $isLosing={challengerWon}>
          {match.opponent?.team.tag}
        </S.HighlightedText>
      </div>
      <S.Score>
        {scoreExists ? (
          <>
            <S.HighlightedText $isWinning={challengerWon} $isLosing={opponentWon}>
              {match.challengerScore}
            </S.HighlightedText>{' '}
            -{' '}
            <S.HighlightedText $isWinning={opponentWon} $isLosing={challengerWon}>
              {match.opponentScore}
            </S.HighlightedText>
          </>
        ) : (
          '? - ?'
        )}
      </S.Score>
    </S.Container>
  );
};
