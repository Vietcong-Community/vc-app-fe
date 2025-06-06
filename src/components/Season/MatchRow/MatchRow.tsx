import React from 'react';

import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { IMatchListItem } from '../../../api/hooks/league/interfaces';
import { MatchStatus, PlayersCount } from '../../../constants/enums';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints, theme } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation, mapNumberOfPlayersToTranslation } from '../../../utils/mappingLabelUtils';
import { DEFAULT_USER_DATE_FORMAT_WITH_TIME } from '../../Fields/DatePickerField/DatePickerField';

import { messages } from './messages';

import * as S from './MatchRow.style';

interface IProps {
  detailUrl?: string;
  isRanked?: boolean;
  match: IMatchListItem;
  showPlayers?: boolean;
  showTeams?: boolean;
  userIsAdmin?: boolean;
}

export const MatchRow: React.FC<IProps> = (props: IProps) => {
  const {
    detailUrl = Routes.MATCH_DETAIL,
    isRanked = false,
    match,
    showPlayers = false,
    showTeams = true,
    userIsAdmin = false,
  } = props;
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const scoreExists = [
    MatchStatus.FINISHED,
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(match.status as MatchStatus);

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
  const showElo = match.status === MatchStatus.FINISHED && showTeams;

  const getMatchPlayerCountOptions = () => {
    if (!showPlayers || !match.maximalPlayers) {
      return [];
    }

    if (match.maximalPlayers === 12) {
      return [PlayersCount.FOUR, PlayersCount.FIVE, PlayersCount.SIX];
    }

    if (match.maximalPlayers === 10) {
      return [PlayersCount.FOUR, PlayersCount.FIVE];
    }

    if (match.maximalPlayers === 8) {
      return [PlayersCount.FOUR];
    }

    return [];
  };

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
    <Link to={detailUrl.replace(':matchId', match.id)}>
      <S.Container>
        <S.LeftColumn>
          {formatDateForUser(match.startDate, DEFAULT_USER_DATE_FORMAT_WITH_TIME) ?? ''}
          {isRanked && match.status !== MatchStatus.NEW && (
            <>
              {isSmallerThanMd && (
                <div>
                  {match.challengerMatchPlayers?.map((player) => (
                    <S.ChallengerTag>{player.user.nickname}</S.ChallengerTag>
                  ))}
                </div>
              )}
              <S.Score>
                {scoreExists ? (
                  <div style={{ fontWeight: 400, fontSize: 16 }}>
                    {!isSmallerThanMd && <FormattedMessage {...messages.result} />}
                    <S.HighlightedText $isWinning={challengerWon} $isLosing={opponentWon}>
                      {match.challengerScore}
                    </S.HighlightedText>{' '}
                    -{' '}
                    <S.HighlightedText $isWinning={opponentWon} $isLosing={challengerWon}>
                      {match.opponentScore}
                    </S.HighlightedText>
                  </div>
                ) : (
                  '? - ?'
                )}
              </S.Score>
              {isSmallerThanMd && (
                <div>
                  {match.opponentMatchPlayers?.map((player) => <S.OpponentTag>{player.user.nickname}</S.OpponentTag>)}
                </div>
              )}
            </>
          )}
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
        <S.RightColumn $alignToEnd={isRanked}>
          {showTeams && (
            <S.Teams>
              <S.HighlightedText $isWinning={challengerWon} $isLosing={opponentWon}>
                {match.challenger?.team.tag}
              </S.HighlightedText>
              <span style={{ fontSize: 12, margin: '0 8px' }}>{' vs. '}</span>
              <S.HighlightedText $isWinning={opponentWon} $isLosing={challengerWon}>
                {match.opponent?.team.tag}
              </S.HighlightedText>
            </S.Teams>
          )}
          {isRanked && (
            <>
              {match.status === MatchStatus.NEW && (
                <>
                  {!userIsAdmin && match.status === MatchStatus.NEW && (
                    <FormattedMessage {...messages.playersHaveNotBeenRevealed} />
                  )}
                  {userIsAdmin && match.status === MatchStatus.NEW && (
                    <div>{match.hostMatchPlayers?.map((item) => <S.PlayerTag>{item.user.nickname}</S.PlayerTag>)}</div>
                  )}
                  <S.MatchCountTags>
                    {isRanked &&
                      match.status === MatchStatus.NEW &&
                      getMatchPlayerCountOptions().map((item) => (
                        <Tag style={{ marginLeft: 8, marginRight: 0 }}>{mapNumberOfPlayersToTranslation(item)}</Tag>
                      ))}
                  </S.MatchCountTags>
                </>
              )}
              {match.status !== MatchStatus.NEW && !isSmallerThanMd && (
                <>
                  <b>
                    <FormattedMessage {...messages.teams} />
                  </b>
                  <div>
                    {match.challengerMatchPlayers?.map((player) => (
                      <S.ChallengerTag>{player.user.nickname}</S.ChallengerTag>
                    ))}
                  </div>
                  <div>
                    {match.opponentMatchPlayers?.map((player) => <S.OpponentTag>{player.user.nickname}</S.OpponentTag>)}
                  </div>
                </>
              )}
            </>
          )}
          {!isRanked && (
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
          )}
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
    </Link>
  );
};
