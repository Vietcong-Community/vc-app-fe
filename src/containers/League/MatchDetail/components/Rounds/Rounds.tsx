import React from 'react';

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

  return (
    <Card>
      <S.Container>
        {rounds?.map((item) => {
          const getWinnerMessage = () => {
            if (item.scoreChallenger > item.scoreOpponent) {
              return challengerTag;
            } else if (item.scoreChallenger < item.scoreOpponent) {
              return opponentTag;
            }

            return <FormattedMessage {...messages.draw} />;
          };

          const isDraw = item.scoreChallenger === item.scoreOpponent;

          return (
            <S.RoundContainer>
              <S.WinnerTag $isDraw={isDraw}>{getWinnerMessage()}</S.WinnerTag>
              <S.MapTitle>{item.map.name}</S.MapTitle>
              <Gap defaultHeight={12} />
              <span>
                <FormattedMessage {...messages.result} />
                {item.scoreChallenger} - {item.scoreOpponent}
              </span>
            </S.RoundContainer>
          );
        })}
      </S.Container>
    </Card>
  );
};
