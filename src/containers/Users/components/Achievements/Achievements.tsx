import React from 'react';

import { faFaceFrown } from '@fortawesome/free-solid-svg-icons/faFaceFrown';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import isNil from 'lodash/isNil';
import { FormattedMessage } from 'react-intl';

import { IAchievement } from '../../../../api/hooks/achievements/interfaces';
import { Gap } from '../../../../components/Gap/Gap';

import { messages } from './messages';
import makerImg from './web-maker.png';

import * as S from './Achievements.style';

interface IProps {
  achievements: IAchievement[];
  nickname: string;
}

export const Achievements: React.FC<IProps> = (props: IProps) => {
  const { achievements, nickname } = props;

  const noAchievements = achievements?.length === 0;

  if (noAchievements) {
    return (
      <S.Container style={{ flexDirection: 'column' }}>
        <Gap defaultHeight={16} />
        <S.IconContainer>
          <FontAwesomeIcon icon={faFaceFrown} style={{ fontSize: 48 }} />
        </S.IconContainer>
        <Gap defaultHeight={16} />
        <FormattedMessage tagName="span" {...messages.noAchievements} values={{ nickname }} />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.OverflowContainer>
        {achievements.map((item) => {
          const noIcon = isEmpty(item.type.icon) || isNil(item.type.icon);

          const webMaker = item.type.name === 'Tvůrce VietcongHUBu';

          console.log(webMaker);
          return (
            <S.AchievementItem>
              <S.AchievementIconAvatar
                size={64}
                shape="square"
                icon={
                  noIcon && !webMaker ? (
                    <FontAwesomeIcon icon={faTrophy} style={{ fontSize: 32 }} />
                  ) : (
                    <>{webMaker ? <img src={makerImg} alt="" /> : <img src={item.type.icon} alt="" />}</>
                  )
                }
                style={{ background: 'white' }}
              />
              <Gap defaultHeight={16} />
              <b>{item.record.name ?? ''}</b>
              {item.type.name}
            </S.AchievementItem>
          );
        })}
      </S.OverflowContainer>
    </S.Container>
  );
};
