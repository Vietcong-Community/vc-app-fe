import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRevertMapElimination } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
}

export const ResetMapPickModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const revertMapElimination = useRevertMapElimination(matchId);

  const onRevertMapElimination = async () => {
    try {
      await revertMapElimination.mutateAsync();
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      await queryClient.refetchQueries({ queryKey: ['eliminatedMaps', matchId] });
      showNotification(messages.revertSuccess);
      onClose();
    } catch {
      showNotification(messages.revertFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm) }}
      onCancel={onClose}
      onOk={onRevertMapElimination}
      confirmLoading={revertMapElimination.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} />
    </Modal>
  );
};
