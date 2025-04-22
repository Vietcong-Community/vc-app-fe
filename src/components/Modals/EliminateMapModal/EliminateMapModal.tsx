import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useEliminateMap } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

export interface IEliminateMapModalConfig {
  id: string;
  isOpen: boolean;
  name: string;
}

interface IProps {
  config: IEliminateMapModalConfig;
  onClose: () => void;
  matchId: string;
}

export const EliminateMapModal: React.FC<IProps> = (props: IProps) => {
  const { config, onClose, matchId } = props;
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();

  const eliminateMap = useEliminateMap(matchId);

  const handleMapElimination = async () => {
    try {
      await eliminateMap.mutateAsync({ mapId: config.id });
      await queryClient.refetchQueries({ queryKey: ['eliminatedMaps', matchId] });
      showNotification(messages.eliminateSuccess);
      onClose();
    } catch {
      showNotification(messages.eliminateError, messages.eliminateErrorDescription, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      onCancel={onClose}
      onOk={handleMapElimination}
      confirmLoading={eliminateMap.isPending}
      open={config.isOpen}
    >
      <FormattedMessage {...messages.description} values={{ name: config.name }} />
    </Modal>
  );
};
