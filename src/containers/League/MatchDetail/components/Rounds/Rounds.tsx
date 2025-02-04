import React from 'react';

import { chunk } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IMatchRound } from '../../../../../api/hooks/league/interfaces';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { Round } from '../Round/Round';

import { messages } from './messages';

import * as S from './Rounds.style';

interface IProps {
  allowUpload: boolean;
  challengerTag?: string;
  matchId: string;
  opponentTag?: string;
  rounds?: IMatchRound[];
}

export const Rounds: React.FC<IProps> = (props: IProps) => {
  const { allowUpload, challengerTag, matchId, opponentTag, rounds } = props;

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
                  challengerTag={challengerTag}
                  key={round.id}
                  opponentTag={opponentTag}
                  matchId={matchId}
                  round={round}
                />
              ))}
            </S.MapContainer>
          );
        })}
      </S.Container>
    </Card>
  );
};
