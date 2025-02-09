import React from 'react';

import { IMatchListItem } from '../../../../api/hooks/league/interfaces';
import {
  DEFAULT_USER_DATE_FORMAT,
  DEFAULT_USER_DATE_FORMAT_WITH_TIME,
} from '../../../../components/Fields/DatePickerField/DatePickerField';
import { MatchStatus } from '../../../../constants/enums';
import { useRouter } from '../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../routes/enums';
import { BreakPoints } from '../../../../theme/theme';
import { formatDateForUser } from '../../../../utils/dateUtils';

import * as S from './MatchRow.style';

interface IProps {
  match: IMatchListItem;
}

export const MatchRow: React.FC<IProps> = (props: IProps) => {
  const { match } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const scoreExists = [
    MatchStatus.FINISHED,
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(match.status as MatchStatus);

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

  const challengerEloAmountGreaterThanZero = (match?.challengerEloRowAmount ?? 0) > 0;
  const challengerEloAmountLowerThanZero = (match?.challengerEloRowAmount ?? 0) < 0;
  const opponentEloAmountGreaterThanZero = (match?.opponentEloRowAmount ?? 0) > 0;
  const opponentEloAmountLowerThanZero = (match?.opponentEloRowAmount ?? 0) < 0;
  const showElo = match.status === MatchStatus.FINISHED;

  return (
    <S.Container onClick={onMatchClick}>
      <div style={{ flex: 1 }}>
        {formatDateForUser(
          match.startDate,
          isSmallerThanMd ? DEFAULT_USER_DATE_FORMAT : DEFAULT_USER_DATE_FORMAT_WITH_TIME,
        ) ?? ''}
      </div>
      <S.Teams>
        <S.HighlightedText $isWinning={challengerWon} $isLosing={opponentWon}>
          {match.challenger?.team.tag}
        </S.HighlightedText>
        <span style={{ fontSize: 12, margin: '0 8px' }}>{' vs. '}</span>
        <S.HighlightedText $isWinning={opponentWon} $isLosing={challengerWon}>
          {match.opponent?.team.tag}
        </S.HighlightedText>
      </S.Teams>
      <S.Score>
        {scoreExists ? (
          <>
            {showElo && (
              <>
                <S.EloPoints
                  $isWinning={challengerEloAmountGreaterThanZero}
                  $isLosing={challengerEloAmountLowerThanZero}
                  style={{ marginRight: 4 }}
                >
                  ({challengerEloAmountGreaterThanZero && '+'}
                  {match?.challengerEloRowAmount ?? 0})
                </S.EloPoints>
              </>
            )}
            <S.HighlightedText $isWinning={challengerWon} $isLosing={opponentWon}>
              {match.challengerScore}
            </S.HighlightedText>{' '}
            -{' '}
            <S.HighlightedText $isWinning={opponentWon} $isLosing={challengerWon}>
              {match.opponentScore}
            </S.HighlightedText>
            {showElo && (
              <>
                <S.EloPoints
                  $isWinning={opponentEloAmountGreaterThanZero}
                  $isLosing={opponentEloAmountLowerThanZero}
                  style={{ marginLeft: 4 }}
                >
                  {' '}
                  ({opponentEloAmountGreaterThanZero && '+'}
                  {match?.opponentEloRowAmount ?? 0})
                </S.EloPoints>
              </>
            )}
          </>
        ) : (
          '? - ?'
        )}
      </S.Score>
    </S.Container>
  );
};
