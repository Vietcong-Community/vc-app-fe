import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRemovePlayerFromMatch } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  nickname?: string;
  playerId?: string;
}

export const RemovePlayerFromMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId, nickname, playerId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const removePlayerFromMatch = useRemovePlayerFromMatch();

  const onDeletePlayer = async () => {
    if (playerId) {
      try {
        await removePlayerFromMatch.mutateAsync(playerId);
        await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
        showNotification(messages.deleteSuccess);
        onClose();
      } catch {
        showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
      }
    } else {
      onClose();
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      onOk={onDeletePlayer}
      confirmLoading={removePlayerFromMatch.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ value: nickname }} />
    </Modal>
  );
};
