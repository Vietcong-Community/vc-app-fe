import React, { useMemo } from 'react';

import { Spin } from 'antd';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { BeErrors } from '../../../api/enums';
import { useSeasonDetail, useUpdateSeason } from '../../../api/hooks/seasons/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { getSingleErrorFromResponse } from '../../../utils/apiUtils';

import { IFormData } from './Season.fields';
import { SeasonForm } from './Season.form';
import { messages } from './messages';
import { transformSubmitValues } from './utils';

export const UpdateSeasonCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const season = useSeasonDetail(query.id);
  const updateSeason = useUpdateSeason();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const onCancel = () => navigate(Routes.SEASON_DETAIL.replace(':id', query.id));

  const onSubmit = async (values: IFormData) => {
    try {
      const submitValues = transformSubmitValues(values);
      const response = await updateSeason.mutateAsync({ data: submitValues, id: query.id });
      showNotification(messages.updateSuccess);
      navigate(Routes.SEASON_DETAIL.replace(':id', response.data.id));
    } catch (e) {
      const error = getSingleErrorFromResponse(e as AxiosResponse);
      showNotification(
        messages.updateFailed,
        error === BeErrors.SEASON_STATUS_IS_NOT_NEW ? messages.seasonIsNotInTheStatusNew : undefined,
        NotificationType.ERROR,
      );
    }
  };

  const initialValues = useMemo(() => {
    return {
      name: season.data?.name,
      startDate: dayjs(season.data?.startDate),
      endDate: dayjs(season.data?.endDate),
    };
  }, [season.isFetchedAfterMount]);

  const showLoading = season.isLoading || !season.isFetchedAfterMount;

  return (
    <>
      <Helmet title={formatMessage(messages.updateTitle)} />
      {showLoading && <Spin size="large" style={{ margin: 'auto' }} />}
      {!showLoading && (
        <SeasonForm
          initialValues={initialValues}
          isSubmitting={updateSeason.isPending}
          onCancel={onCancel}
          onSubmit={onSubmit}
          title={<FormattedMessage {...messages.updateTitle} />}
        />
      )}
    </>
  );
};
