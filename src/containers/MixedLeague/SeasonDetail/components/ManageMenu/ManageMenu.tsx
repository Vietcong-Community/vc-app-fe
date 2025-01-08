import React from 'react';

import { Button, Dropdown, MenuProps } from 'antd';
import { AxiosResponse } from 'axios';
import { FormattedMessage } from 'react-intl';

import { BeErrors } from '../../../../../api/enums';
import { SeasonStatus } from '../../../../../api/hooks/mixedLeague/interfaces';
import {
  useActivateSeason,
  useArchiveSeason,
  useDeleteSeason,
  useSeasonDetail,
} from '../../../../../api/hooks/mixedLeague/seasons/api';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';
import { getSingleErrorFromResponse } from '../../../../../utils/apiUtils';

import { messages } from './messages';

export const ManageMenu: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();

  const season = useSeasonDetail(query.id);
  const deleteSeason = useDeleteSeason();
  const activateSeason = useActivateSeason();
  const archiveSeason = useArchiveSeason();

  const onActivateSeason = async () => {
    try {
      await activateSeason.mutateAsync({ id: query.id });
      await season.refetch();
      showNotification(messages.activateSuccess);
    } catch (e) {
      const error = getSingleErrorFromResponse(e as AxiosResponse);
      showNotification(
        messages.activateFailed,
        error === BeErrors.SEASON_STATUS_IS_NOT_NEW ? messages.seasonIsNotInTheStatusNew : undefined,
        NotificationType.ERROR,
      );
    }
  };

  const onArchiveSeason = async () => {
    try {
      await archiveSeason.mutateAsync({ id: query.id });
      await season.refetch();
      showNotification(messages.archiveSuccess);
    } catch (e) {
      const error = getSingleErrorFromResponse(e as AxiosResponse);
      showNotification(
        messages.archiveFailed,
        error === BeErrors.SEASON_STATUS_IS_NOT_ACTIVE
          ? messages.seasonIsNotInTheStatusActive
          : messages.archiveFailedDescription,
        NotificationType.ERROR,
      );
    }
  };

  const onDeleteSeason = async () => {
    try {
      await deleteSeason.mutateAsync({ id: query.id });
      showNotification(messages.deleteSuccess);
      navigate(Routes.LEAGUES_OVERVIEW);
    } catch (e) {
      const error = getSingleErrorFromResponse(e as AxiosResponse);
      showNotification(
        messages.deleteFailed,
        error === BeErrors.SEASON_STATUS_IS_NOT_NEW ? messages.seasonIsNotInTheStatusNew : undefined,
        NotificationType.ERROR,
      );
    }
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.update} />,
      key: '1',
      onClick: () => navigate(Routes.SEASON_UPDATE.replace(':id', query.id)),
      disabled: season.data?.status !== SeasonStatus.NEW,
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      key: '2',
      onClick: onDeleteSeason,
      disabled: season.data?.status !== SeasonStatus.NEW,
    },
    {
      label: <FormattedMessage {...messages.activate} />,
      key: '3',
      onClick: onActivateSeason,
      disabled: season.data?.status !== SeasonStatus.NEW,
    },
    {
      label: <FormattedMessage {...messages.archive} />,
      key: '4',
      onClick: onArchiveSeason,
      disabled: season.data?.status !== SeasonStatus.ACTIVE,
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
