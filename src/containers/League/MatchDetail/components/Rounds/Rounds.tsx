import React, { useState } from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { chunk } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { IMatchPlayer, IMatchRound } from '../../../../../api/hooks/league/interfaces';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchStatus } from '../../../../../constants/enums';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../../../theme/theme';
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
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState<boolean>(width >= BreakPoints.md);

  const splitRoundsByMap = chunk(rounds, 2);

  return (
    <Card>
      <S.SectionTitle>
        <FormattedMessage {...messages.title} />
        <div
          onClick={() => setIsOpen((val) => !val)}
          style={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            fontSize: 14,
            gap: 8,
            justifyContent: 'center',
          }}
        >
          {isOpen ? (
            <>
              <FormattedMessage {...messages.close} />
              <S.Icon>
                <UpOutlined />
              </S.Icon>
            </>
          ) : (
            <>
              <FormattedMessage {...messages.open} />
              <S.Icon>
                <DownOutlined />
              </S.Icon>
            </>
          )}
        </div>
      </S.SectionTitle>
      <AnimatedHeightContainer isOpen={isOpen}>
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
      </AnimatedHeightContainer>
    </Card>
  );
};
