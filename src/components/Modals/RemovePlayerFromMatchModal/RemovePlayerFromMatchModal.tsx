import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  playerId: string;
}

export const RemovePlayerFromMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId, playerId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  // const removeRound = useRemoveRound(roundId);

  const onDeleteRound = async () => {
    try {
      // await removeRound.mutateAsync();
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.deleteSuccess);
    } catch {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      onOk={onDeleteRound}
      // confirmLoading={removeRound.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ value: playerId }} />
    </Modal>
  );
};
