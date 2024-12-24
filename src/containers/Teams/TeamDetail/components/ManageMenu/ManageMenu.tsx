import React from 'react';

import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useArchiveTeam, useDeleteTeam, useTeamDetail } from '../../../../../api/hooks/teams/api';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

export const ManageMenu: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();

  const team = useTeamDetail(query.id);
  const deleteTeam = useDeleteTeam();
  const archiveTeam = useArchiveTeam();

  const onArchiveTeam = async () => {
    try {
      await archiveTeam.mutateAsync({ id: query.id });
      await team.refetch();
      showNotification(messages.archiveSuccess);
    } catch (e) {
      showNotification(messages.archiveFailed, messages.archiveFailedDescription, NotificationType.ERROR);
    }
  };

  const onDeleteTeam = async () => {
    try {
      await deleteTeam.mutateAsync({ id: query.id });
      showNotification(messages.deleteSuccess);
      navigate(Routes.HOME);
    } catch (e) {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.update} />,
      key: '1',
      onClick: () => navigate(Routes.TEAM_UPDATE.replace(':id', query.id)),
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      key: '2',
      onClick: onDeleteTeam,
      disabled: team.data?.archived,
    },
    {
      label: <FormattedMessage {...messages.archive} />,
      key: '4',
      onClick: onArchiveTeam,
      disabled: team.data?.archived,
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
