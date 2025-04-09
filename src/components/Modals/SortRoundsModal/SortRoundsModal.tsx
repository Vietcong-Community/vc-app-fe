import React, { useEffect, useState } from 'react';

import { closestCenter, DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSortRounds } from '../../../api/hooks/league/api';
import { IMatchRound } from '../../../api/hooks/league/interfaces';
import { useNotifications } from '../../../hooks/NotificationsHook';

import { SortableRound } from './SortableRound';
import { messages } from './messages';

interface IProps {
  challengerTag?: string;
  isOpen: boolean;
  matchId: string;
  onClose: () => void;
  opponentTag?: string;
  rounds: IMatchRound[];
}

export const SortRoundsModal: React.FC<IProps> = (props: IProps) => {
  const { challengerTag, isOpen, matchId, onClose, opponentTag, rounds } = props;
  const [items, setItems] = useState(rounds);
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();

  const sortRounds = useSortRounds(matchId);

  useEffect(() => {
    if (isOpen) {
      setItems(rounds);
    }
  }, [isOpen]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active?.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const onSubmit = async () => {
    const matchRoundsIds = items.map((item) => item.id);
    try {
      await sortRounds.mutateAsync({ matchRoundsIds });
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.sortSuccess);
      onClose();
    } catch {
      showNotification(messages.sortFailed);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ title: formatMessage(messages.submit) }}
      onCancel={onClose}
      onOk={onSubmit}
      confirmLoading={sortRounds.isPending}
      open={isOpen}
    >
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {items.map((item) => (
              <SortableRound
                challengerTag={challengerTag}
                challengerScore={item.scoreChallenger}
                id={item.id}
                key={item.id}
                mapName={item.map.name}
                opponentTag={opponentTag}
                opponentScore={item.scoreOpponent}
                roundNumber={item.round}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Modal>
  );
};
