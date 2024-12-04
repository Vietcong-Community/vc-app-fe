import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { MixedMatchStatus } from '../../../../../api/hooks/mixedLeague/interfaces';
import { useConfirmMatch, useDeleteMatch } from '../../../../../api/hooks/mixedLeague/match/api';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  isPossibleToConfirmMatch: boolean;
  status?: MixedMatchStatus;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const { isPossibleToConfirmMatch, status } = props;
  const { navigate, query } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();

  const confirmMatch = useConfirmMatch();
  const deleteMatch = useDeleteMatch();

  const onDeleteMatch = async () => {
    try {
      await deleteMatch.mutateAsync({ id: query.id });
      showNotification(messages.deleteSuccess);
      navigate(Routes.MIX_LEAGUE_OVERVIEW);
    } catch (e) {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  const onConfirmMatch = async () => {
    try {
      await confirmMatch.mutateAsync({ id: query.id });
      await queryClient.invalidateQueries({ queryKey: ['matchesById', query.id] });
      showNotification(messages.confirmMatchSuccess);
    } catch (e) {
      showNotification(messages.confirmMatchFailed, undefined, NotificationType.ERROR);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.update} />,
      key: '0',
      onClick: () => navigate(Routes.MIXED_MATCH_UPDATE.replace(':id', query.id)),
      disabled: status !== MixedMatchStatus.NEW,
    },
    {
      label: <FormattedMessage {...messages.confirmTheMatch} />,
      key: '1',
      onClick: onConfirmMatch,
      disabled: status !== MixedMatchStatus.NEW || !isPossibleToConfirmMatch,
    },
    {
      label: <FormattedMessage {...messages.enterTheResult} />,
      key: '2',
      onClick: () => navigate(Routes.MIXED_MATCH_RESULT.replace(':id', query.id)),
      disabled: status !== MixedMatchStatus.READY,
    },
    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '3',
      onClick: () => {},
      disabled: status !== MixedMatchStatus.WAITING_FOR_CONFIRMATION,
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      key: '4',
      onClick: onDeleteMatch,
      disabled: status !== MixedMatchStatus.NEW && status !== MixedMatchStatus.READY,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        <FormattedMessage {...messages.menuLabel} />
      </Button>
    </Dropdown>
  );
};
