import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLockMatch } from '../../../api/hooks/ranked/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
}

export const LockRankedMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const lockMatch = useLockMatch(matchId);

  const onLockMatch = async () => {
    try {
      await lockMatch.mutateAsync();
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.confirmSuccess);
      onClose();
    } catch {
      showNotification(messages.confirmFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      onOk={onLockMatch}
      confirmLoading={lockMatch.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} />
    </Modal>
  );
};
