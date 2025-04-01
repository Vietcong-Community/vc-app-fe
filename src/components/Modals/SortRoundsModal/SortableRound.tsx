import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import * as S from './SortableRound.style';

interface IProps {
  challengerScore: number;
  challengerTag?: string;
  id: string;
  mapName: string;
  opponentScore: number;
  opponentTag?: string;
  roundNumber: number;
}

export const SortableRound: React.FC<IProps> = (props: IProps) => {
  const { challengerScore, challengerTag, id, mapName, opponentScore, opponentTag, roundNumber } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <S.RoundContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <b>
        {roundNumber}. {mapName}
      </b>
      <br />
      {challengerTag} vs. {opponentTag}
      <br />
      {challengerScore ?? 0} : {opponentScore ?? 0}
    </S.RoundContainer>
  );
};
