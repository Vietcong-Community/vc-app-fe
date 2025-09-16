import React from 'react';

import { FormattedMessage } from 'react-intl';

import { IMatchListItem } from '../../../api/hooks/league/interfaces';
import { MatchType } from '../../../constants/enums';
import { RoundItem } from '../RoundItem/RoundItem';

import { messages } from './messages';

import * as S from './RoundColumn.style';

interface IProps {
  matches: IMatchListItem[];
  roundCount: number;
  roundNumber: number;
}

export const RoundColumn: React.FC<IProps> = (props: IProps) => {
  const { matches, roundCount, roundNumber } = props;

  const heightMultiplier = Math.pow(2, roundNumber - 1);

  const isFinalRound = roundCount === roundNumber;
  const isPreRound = roundNumber === 1;

  const getColumnTitle = () => {
    switch (roundNumber) {
      case 1:
        return <FormattedMessage {...messages.preRound} />;
      case 2:
        return <FormattedMessage {...messages.quarterFinal} />;
      case 3:
        return <FormattedMessage {...messages.semifinal} />;
      case 4:
        return <FormattedMessage {...messages.playOffFinal} />;
      default:
        return null;
    }
  };

  if (isFinalRound) {
    const final = matches.find((item) => item.type === MatchType.PLAYOFF_FINAL);
    const smallFinal = matches.find((item) => item.type === MatchType.PLAYOFF_SMALL_FINAL);
    const challengerFinalWon = (final?.challengerScore ?? 0) > (final?.opponentScore ?? 0);
    const opponentFinalWon = (final?.opponentScore ?? 0) > (final?.challengerScore ?? 0);
    const challengerSmallFinalWon = (smallFinal?.challengerScore ?? 0) > (smallFinal?.opponentScore ?? 0);
    const opponentSmallFinalWon = (smallFinal?.opponentScore ?? 0) > (smallFinal?.challengerScore ?? 0);

    return (
      <S.Container>
        <S.RoundTitle>{getColumnTitle()}</S.RoundTitle>
        <RoundItem
          heightMultiplier={heightMultiplier}
          matchId={final?.id}
          position="top"
          teamId={final?.challenger.team.id}
          teamName={final?.challenger.team.name}
          teamScore={final?.challengerScore}
          teamWon={challengerFinalWon}
        />
        <RoundItem
          heightMultiplier={heightMultiplier}
          matchId={final?.id}
          position="bottom"
          teamId={final?.opponent?.team.id}
          teamName={final?.opponent?.team.name}
          teamScore={final?.opponentScore}
          teamWon={opponentFinalWon}
        />
        {smallFinal && (
          <>
            <S.RoundTitle>
              <FormattedMessage {...messages.playOffSmallFinal} />
            </S.RoundTitle>
            <RoundItem
              heightMultiplier={1}
              matchId={smallFinal?.id}
              position="top"
              teamId={smallFinal?.challenger.team.id}
              teamName={smallFinal?.challenger.team.name}
              teamScore={smallFinal?.challengerScore}
              teamWon={challengerSmallFinalWon}
            />
            <RoundItem
              heightMultiplier={1}
              matchId={smallFinal?.id}
              position="bottom"
              teamId={smallFinal?.opponent?.team.id}
              teamName={smallFinal?.opponent?.team.name}
              teamScore={smallFinal?.opponentScore}
              teamWon={opponentSmallFinalWon}
            />
          </>
        )}
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.RoundTitle>{getColumnTitle()}</S.RoundTitle>
      {matches.map((match, index) => {
        const challengerWon = (match.challengerScore ?? 0) > (match?.opponentScore ?? 0);
        const opponentWon = (match.opponentScore ?? 0) > (match?.challengerScore ?? 0);

        return (
          <>
            {isPreRound && (index === 0 || index === 2) && <div style={{ height: 80 }} />}
            <RoundItem
              heightMultiplier={heightMultiplier}
              matchId={match?.id}
              position="top"
              teamId={match.challenger.team.id}
              teamName={match.challenger.team.name}
              teamScore={match.challengerScore}
              teamWon={challengerWon}
            />
            <RoundItem
              heightMultiplier={heightMultiplier}
              matchId={match?.id}
              position="bottom"
              teamId={match.opponent?.team.id}
              teamName={match.opponent?.team.name}
              teamScore={match.opponentScore}
              teamWon={opponentWon}
            />
            {isPreRound && (index === 1 || index === 3) && <div style={{ height: 80 }} />}
          </>
        );
      })}
    </S.Container>
  );
};
