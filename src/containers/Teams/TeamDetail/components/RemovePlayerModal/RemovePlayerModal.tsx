import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRemoveUserFromTeam } from '../../../../../api/hooks/teams/api';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  teamId: string;
  userId: string;
}

export const RemovePlayerModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, nickname, teamId, userId } = props;
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const { showNotification } = useNotifications();
  const removePlayer = useRemoveUserFromTeam();

  const onDeleteMatch = async () => {
    try {
      await removePlayer.mutateAsync({ teamId, userId });
      await queryClient.refetchQueries({ queryKey: ['teamPlayers', teamId] });
      showNotification(messages.leaveTeamSuccess, NotificationType.INFO);
      onClose();
    } catch {
      showNotification(messages.leaveTeamFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      onOk={onDeleteMatch}
      confirmLoading={removePlayer.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ nickname }} />
    </Modal>
  );
};
