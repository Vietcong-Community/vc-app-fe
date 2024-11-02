import React from 'react';

import { Space } from 'antd';
import { AxiosResponse } from 'axios';
import { FormattedMessage } from 'react-intl';

import { BeErrors } from '../../../api/enums';
import { useActivateSeason, useArchiveSeason, useDeleteSeason, useSeasonDetail } from '../../../api/hooks/seasons/api';
import { Button } from '../../../components/Button/Button';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { getSingleErrorFromResponse } from '../../../utils/apiUtils';

import { messages } from './messages';

export const SeasonDetailCont: React.FC = () => {
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
      navigate(Routes.MIX_LEAGUE_OVERVIEW);
    } catch (e) {
      const error = getSingleErrorFromResponse(e as AxiosResponse);
      showNotification(
        messages.deleteFailed,
        error === BeErrors.SEASON_STATUS_IS_NOT_NEW ? messages.seasonIsNotInTheStatusNew : undefined,
        NotificationType.ERROR,
      );
    }
  };

  return (
    <>
      {season.data?.name}, {season.data?.status}
      <br />
      <Space>
        <Button onClick={onArchiveSeason}>
          <FormattedMessage {...messages.archive} />
        </Button>
        <Button onClick={onActivateSeason}>
          <FormattedMessage {...messages.activate} />
        </Button>
        <Button onClick={onDeleteSeason}>
          <FormattedMessage {...messages.delete} />
        </Button>
        <Button onClick={() => navigate(Routes.SEASON_UPDATE.replace(':id', query.id))}>
          <FormattedMessage {...messages.update} />
        </Button>
      </Space>
    </>
  );
};
