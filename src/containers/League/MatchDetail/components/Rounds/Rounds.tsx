import React from 'react';

import { chunk } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IMatchRound } from '../../../../../api/hooks/league/interfaces';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';

import { messages } from './messages';

import * as S from './Rounds.style';

interface IProps {
  challengerTag?: string;
  opponentTag?: string;
  rounds?: IMatchRound[];
}

export const Rounds: React.FC<IProps> = (props: IProps) => {
  const { challengerTag, opponentTag, rounds } = props;

  const splitRoundsByMap = chunk(rounds, 2);

  return (
    <Card>
      <S.SectionTitle>
        <FormattedMessage {...messages.title} />
      </S.SectionTitle>
      <Gap defaultHeight={8} />
      <S.Container>
        {splitRoundsByMap?.map((item) => {
          return (
            <S.MapContainer>
              {item.map((round) => {
                const getWinnerMessage = () => {
                  if (round.scoreChallenger > round.scoreOpponent) {
                    return challengerTag;
                  } else if (round.scoreChallenger < round.scoreOpponent) {
                    return opponentTag;
                  }

                  return <FormattedMessage {...messages.draw} />;
                };

                const isDraw = round.scoreChallenger === round.scoreOpponent;

                return (
                  <S.RoundContainer>
                    <S.WinnerTag $isDraw={isDraw}>{getWinnerMessage()}</S.WinnerTag>
                    <S.MapTitle>{round.map.name}</S.MapTitle>
                    <Gap defaultHeight={12} />
                    <S.ResultContainer>
                      <S.TeamTag>{challengerTag}</S.TeamTag>
                      {round.scoreChallenger} - {round.scoreOpponent}
                      <S.TeamTag>{opponentTag}</S.TeamTag>
                    </S.ResultContainer>
                  </S.RoundContainer>
                );
              })}
            </S.MapContainer>
          );
        })}
      </S.Container>
    </Card>
  );
};
