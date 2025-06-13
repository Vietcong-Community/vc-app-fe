import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IUser } from '../../../api/hooks/interfaces';
import { useLeaveRankedMatch } from '../../../api/hooks/ranked/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { messages } from './messages';

interface IProps {
  isLastPlayer: boolean;
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  seasonId?: string;
  user?: IUser;
  userId: string;
}

export const LeaveRankedMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isLastPlayer, isOpen, onClose, matchId, seasonId, user, userId } = props;
  const { formatMessage } = useIntl();
  const { navigate } = useRouter();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const leaveMatch = useLeaveRankedMatch(matchId);

  const onDeleteRound = async () => {
    try {
      const payload = userId === user?.id ? {} : { userForLeave: user?.id };
      await leaveMatch.mutateAsync(payload);
      if (isLastPlayer && seasonId) {
        navigate(Routes.RANKED_SEASON_DETAIL.replace(':seasonId', seasonId));
      } else {
        await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
        await queryClient.refetchQueries({ queryKey: ['mapVoteState', matchId] });
      }
      showNotification(messages.deleteSuccess);
      onClose();
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
      confirmLoading={leaveMatch.isPending}
      open={isOpen}
    >
      <FormattedMessage {...messages.description} values={{ value: user?.nickname }} />
    </Modal>
  );
};
