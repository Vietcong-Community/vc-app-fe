import React from 'react';

import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import * as S from './RoundItem.style';

const ITEM_HEIGHT_PX = 40;

interface IProps {
  heightMultiplier: number;
  matchId?: string;
  position: 'bottom' | 'top';
  teamId?: string;
  teamName?: string;
  teamScore?: number;
  teamWon?: boolean;
}

export const RoundItem: React.FC<IProps> = (props) => {
  const { heightMultiplier, matchId, position, teamId, teamName, teamScore, teamWon = false } = props;
  const { navigate } = useRouter();

  const className = `teamName-${teamId}`;
  const height = heightMultiplier * ITEM_HEIGHT_PX;
  const isPositionTop = position === 'top';

  const highlightAllInstances = (highlight: boolean) => {
    const participants = window?.document?.querySelectorAll(`.${className}`);
    participants.forEach((instance) => {
      if (highlight) {
        instance.classList.add('highlighted');
      } else {
        instance.classList.remove('highlighted');
      }
    });
  };

  return (
    <S.Container $position={position} style={{ alignItems: isPositionTop ? 'flex-end' : 'flex-start', height }}>
      <S.Team
        className={className}
        onClick={() => {
          if (matchId) {
            navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', matchId));
          }
        }}
        onMouseEnter={() => highlightAllInstances(true)}
        onMouseLeave={() => highlightAllInstances(false)}
        style={{ fontWeight: teamWon ? 600 : 'initial' }}
      >
        {teamName}
      </S.Team>
      <S.Score style={{ borderRadius: isPositionTop ? '2px 2px 0 0' : '0 0 2px 2px' }}>{teamScore ?? '?'}</S.Score>
    </S.Container>
  );
};
