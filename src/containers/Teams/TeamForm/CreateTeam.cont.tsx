import React from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateTeam } from '../../../api/hooks/teams/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './Team.fields';
import { TeamForm } from './Team.form';
import { messages } from './messages';

export const CreateTeamCont: React.FC = () => {
  const { navigate } = useRouter();
  const createTeam = useCreateTeam();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const onCancel = () => navigate(Routes.HOME);

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await createTeam.mutateAsync(values);
      showNotification(messages.createSuccess);
      navigate(Routes.TEAM_DETAIL.replace(':id', response.data.id?.toString()));
    } catch (e) {
      // TODO Handle error
      console.log(e);
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <>
      <Helmet title={formatMessage(messages.createTitle)} />
      <TeamForm
        isSubmitting={createTeam.isPending}
        onCancel={onCancel}
        onSubmit={onSubmit}
        title={<FormattedMessage {...messages.createTitle} />}
      />
    </>
  );
};
