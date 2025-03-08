import React from 'react';

import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { IMeMatch } from '../../../../api/hooks/users/interfaces';
import { MatchStatus } from '../../../../constants/enums';
import { messages } from '../../../../containers/League/components/MatchRow/messages';
import { useRouter } from '../../../../hooks/RouterHook';
import { Routes } from '../../../../routes/enums';
import { theme } from '../../../../theme/theme';
import { formatDateForUser } from '../../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../../utils/mappingLabelUtils';
import { DEFAULT_USER_DATE_FORMAT_WITH_TIME } from '../../../Fields/DatePickerField/DatePickerField';

import * as S from './Match.style';

interface IProps {
  match: IMeMatch;
  onClose: () => void;
}

export const Match: React.FC<IProps> = (props: IProps) => {
  const { match, onClose } = props;

  const { navigate } = useRouter();

  const scoreExists = [
    MatchStatus.FINISHED,
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(match.status as MatchStatus);

  const onMatchClick = () => {
    onClose();
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

  const nowTime = dayjs();
  const startTime = dayjs(match.startDate);
  const endTime = dayjs(match.endDate);
  const showLiveTag =
    !!match.startDate &&
    !!match.endDate &&
    nowTime.isAfter(startTime) &&
    nowTime.isBefore(endTime) &&
    match.status !== MatchStatus.FINISHED &&
    match.status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION;

  return (
    <S.Container onClick={onMatchClick}>
      <S.LeftColumn>
        {formatDateForUser(match.startDate, DEFAULT_USER_DATE_FORMAT_WITH_TIME) ?? ''}
        <S.MatchTags>
          {showLiveTag && (
            <S.LiveTag color={theme.colors.red}>
              <FormattedMessage {...messages.live} />
            </S.LiveTag>
          )}
          <S.MatchStatusTag>{mapMatchStatusToTranslation(match.status)}</S.MatchStatusTag>
          <FontAwesomeIcon icon={faComment} style={{ fontSize: 16 }} /> {match.commentsCount ?? 0}
        </S.MatchTags>
      </S.LeftColumn>
      <S.RightColumn>
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
      </S.RightColumn>
      {showLiveTag && (
        <S.LiveTagMobile>
          <S.LiveTag color={theme.colors.red}>
            <FormattedMessage {...messages.live} />
          </S.LiveTag>
        </S.LiveTagMobile>
      )}
      <S.Comments>
        <FontAwesomeIcon icon={faComment} style={{ fontSize: 16 }} /> {match.commentsCount ?? 0}
      </S.Comments>
    </S.Container>
  );
};
