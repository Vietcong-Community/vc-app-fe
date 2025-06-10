import React, { useEffect, useState } from 'react';

import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons/faCircleArrowLeft';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons/faFaceFrown';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import isNil from 'lodash/isNil';
import { FormattedMessage } from 'react-intl';

import { IAchievement } from '../../../../api/hooks/achievements/interfaces';
import { Gap } from '../../../../components/Gap/Gap';
import { useWindowDimensions } from '../../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../../theme/theme';
import { AchievementDetailModal } from '../AchievementDetailModal/AchievementDetailModal';

import { messages } from './messages';

import * as S from './Achievements.style';

const CONTAINER_ID = 'achievements-container';
const OVERFLOW_ID = 'achievements-scroll';

interface IProps {
  achievements: IAchievement[];
  nickname: string;
}

export const Achievements: React.FC<IProps> = (props: IProps) => {
  const { achievements, nickname } = props;
  const { width } = useWindowDimensions();

  const widthIsLargerThanXs = width > BreakPoints.xs;

  const [achievementDetail, setAchievementDetail] = useState<IAchievement | undefined>(undefined);
  const [showButtons, setShowButtons] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [reachedStart, setReachedStart] = useState(true);

  const onScroll = (event: UIEvent) => {
    const element = event.target as HTMLDivElement;

    const maxScrollWidth = element.scrollWidth - element.clientWidth;
    const currentScroll = element?.scrollLeft;

    if (currentScroll <= 0) {
      setReachedStart(true);
    } else {
      setReachedStart(false);
    }

    setReachedEnd(currentScroll >= maxScrollWidth);
  };

  const moveBack = () => {
    const overflow = document.getElementById(OVERFLOW_ID);
    if (overflow) {
      overflow.scrollBy({ left: -270, behavior: 'smooth' });
    }
  };

  const moveForward = () => {
    const overflow = document.getElementById(OVERFLOW_ID);
    if (overflow) {
      overflow.scrollBy({ left: 270, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if ((achievements?.length ?? 0) > 0) {
      const scrollWidth = document.getElementById(OVERFLOW_ID)?.scrollWidth ?? 0;
      const offersWidth = document.getElementById(CONTAINER_ID)?.clientWidth ?? 0;
      const show = scrollWidth > offersWidth;
      if (show !== showButtons) {
        setShowButtons(show);
      }
    }
  }, [achievements]);

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
    <>
      <S.Container id={CONTAINER_ID} style={{ paddingBottom: showButtons ? '4rem' : 0 }}>
        <S.OverflowContainer id={OVERFLOW_ID} onScroll={onScroll as never}>
          {achievements.map((item) => {
            const noIcon = isEmpty(item.type.icon) || isNil(item.type.icon);

            return (
              <S.AchievementItem onClick={() => setAchievementDetail(item)}>
                <S.AchievementIconAvatar
                  size={64}
                  shape="square"
                  icon={
                    noIcon ? (
                      <FontAwesomeIcon icon={faTrophy} style={{ fontSize: 32 }} />
                    ) : (
                      <img src={item.type.icon} alt="" />
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
        {widthIsLargerThanXs && showButtons && (
          <>
            <S.ArrowLeft onClick={moveBack} reachedStart={reachedStart}>
              <FontAwesomeIcon icon={faCircleArrowLeft} />
            </S.ArrowLeft>
            <S.ArrowRight onClick={moveForward} reachedEnd={reachedEnd}>
              <FontAwesomeIcon icon={faCircleArrowRight} />
            </S.ArrowRight>
          </>
        )}
      </S.Container>
      <AchievementDetailModal achievement={achievementDetail} setAchievement={setAchievementDetail} />
    </>
  );
};
