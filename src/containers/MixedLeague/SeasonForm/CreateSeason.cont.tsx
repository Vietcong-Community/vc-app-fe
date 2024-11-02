import React from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateSeason } from '../../../api/hooks/seasons/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './Season.fields';
import { SeasonForm } from './Season.form';
import { messages } from './messages';
import { transformSubmitValues } from './utils';

export const CreateSeasonCont: React.FC = () => {
  const { navigate } = useRouter();
  const createSeason = useCreateSeason();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const onCancel = () => navigate(Routes.MIX_LEAGUE_OVERVIEW);

  const onSubmit = async (values: IFormData) => {
    try {
      const submitValues = transformSubmitValues(values);
      const response = await createSeason.mutateAsync(submitValues);
      showNotification(messages.createSuccess);
      navigate(Routes.SEASON_DETAIL.replace(':id', response.data.id));
    } catch (e) {
      // TODO Handle error
      console.log(e);
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <>
      <Helmet title={formatMessage(messages.createTitle)} />
      <SeasonForm
        isSubmitting={createSeason.isPending}
        onCancel={onCancel}
        onSubmit={onSubmit}
        title={<FormattedMessage {...messages.createTitle} />}
      />
    </>
  );
};
