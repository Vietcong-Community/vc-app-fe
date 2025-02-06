import React from 'react';

import { chunk } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IMatchPlayer, IMatchRound } from '../../../../../api/hooks/league/interfaces';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { Round } from '../Round/Round';

import { messages } from './messages';

import * as S from './Rounds.style';

interface IProps {
  allowUpload: boolean;
  challengerMatchPlayers: IMatchPlayer[];
  challengerTag?: string;
  matchId: string;
  opponentTag?: string;
  opponentMatchPlayers: IMatchPlayer[];
  rounds?: IMatchRound[];
  showStatistics?: boolean;
}

export const Rounds: React.FC<IProps> = (props: IProps) => {
  const {
    allowUpload,
    challengerMatchPlayers,
    challengerTag,
    matchId,
    opponentMatchPlayers,
    opponentTag,
    rounds,
    showStatistics = true,
  } = props;

  const splitRoundsByMap = chunk(rounds, 2);

  return (
    <Card>
      <S.SectionTitle>
        <FormattedMessage {...messages.title} />
      </S.SectionTitle>
      <Gap defaultHeight={8} />
      <S.Container>
        {splitRoundsByMap?.map((item, index) => {
          return (
            <S.MapContainer key={`chunk-${index}`}>
              {item.map((round) => (
                <Round
                  allowUpload={allowUpload}
                  challengerMatchPlayers={challengerMatchPlayers}
                  challengerTag={challengerTag}
                  key={round.id}
                  opponentMatchPlayers={opponentMatchPlayers}
                  opponentTag={opponentTag}
                  matchId={matchId}
                  round={round}
                  showStatistics={showStatistics}
                />
              ))}
            </S.MapContainer>
          );
        })}
      </S.Container>
    </Card>
  );
};
