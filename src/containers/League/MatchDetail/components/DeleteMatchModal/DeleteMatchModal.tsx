import React from 'react';

import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDeleteMatch } from '../../../../../api/hooks/admin/api';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  seasonId?: string;
}

export const DeleteMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId, seasonId } = props;
  const { formatMessage } = useIntl();
  const { navigate } = useRouter();

  const { showNotification } = useNotifications();
  const deleteMatch = useDeleteMatch();

  const onDeleteMatch = async () => {
    try {
      await deleteMatch.mutateAsync(matchId);
      showNotification(messages.deleteSuccess);
      navigate(Routes.SEASON_DETAIL.replace(':seasonId', seasonId ?? ''));
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
      onOk={onDeleteMatch}
      confirmLoading={deleteMatch.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} />
    </Modal>
  );
};
