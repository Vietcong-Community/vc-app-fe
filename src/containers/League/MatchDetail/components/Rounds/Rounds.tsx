import React from 'react';

import { chunk } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { IMatchPlayer, IMatchRound } from '../../../../../api/hooks/league/interfaces';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchStatus } from '../../../../../constants/enums';
import { Round } from '../Round/Round';

import { messages } from './messages';

import * as S from './Rounds.style';

interface IProps {
  allowUpload: boolean;
  hostMatchPlayers: IMatchPlayer[];
  challengerMatchPlayers: IMatchPlayer[];
  challengerTag?: string;
  matchId: string;
  opponentTag?: string;
  opponentMatchPlayers: IMatchPlayer[];
  rounds?: IMatchRound[];
  matchMaps: IMap[];
  matchStatus?: MatchStatus;
  seasonId?: string;
  showStatistics?: boolean;
  userIsAdmin?: boolean;
}

export const Rounds: React.FC<IProps> = (props: IProps) => {
  const {
    allowUpload,
    hostMatchPlayers,
    challengerMatchPlayers,
    challengerTag,
    matchId,
    matchMaps,
    matchStatus,
    opponentMatchPlayers,
    opponentTag,
    rounds,
    seasonId,
    showStatistics = true,
    userIsAdmin = false,
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
                  hostMatchPlayers={hostMatchPlayers}
                  challengerMatchPlayers={challengerMatchPlayers}
                  challengerTag={challengerTag}
                  key={round.id}
                  opponentMatchPlayers={opponentMatchPlayers}
                  opponentTag={opponentTag}
                  matchId={matchId}
                  matchMaps={matchMaps}
                  matchStatus={matchStatus}
                  round={round}
                  seasonId={seasonId}
                  showStatistics={showStatistics}
                  userIsAdmin={userIsAdmin}
                />
              ))}
            </S.MapContainer>
          );
        })}
      </S.Container>
    </Card>
  );
};
