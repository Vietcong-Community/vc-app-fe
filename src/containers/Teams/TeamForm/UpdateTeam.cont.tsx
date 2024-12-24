import React, { useMemo } from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useTeamDetail, useUpdateTeam } from '../../../api/hooks/teams/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './Team.fields';
import { TeamForm } from './Team.form';
import { messages } from './messages';

export const UpdateTeamCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const team = useTeamDetail(query.id);
  const updateTeam = useUpdateTeam();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const onCancel = () => navigate(Routes.TEAM_DETAIL.replace(':id', query.id));

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await updateTeam.mutateAsync({ data: values, id: query.id });
      showNotification(messages.updateSuccess);
      navigate(Routes.TEAM_DETAIL.replace(':id', response.data.id?.toString()));
    } catch (e) {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  const initialValues = useMemo(() => {
    return {
      name: team.data?.name,
      tag: team.data?.tag,
      description: team.data?.description,
    };
  }, [team.isFetchedAfterMount]);

  const showLoading = team.isLoading || !team.isFetchedAfterMount;

  return (
    <>
      <Helmet title={formatMessage(messages.updateTitle)} />
      {showLoading && <Spin size="large" style={{ margin: 'auto' }} />}
      {!showLoading && (
        <TeamForm
          initialValues={initialValues}
          isSubmitting={updateTeam.isPending}
          onCancel={onCancel}
          onSubmit={onSubmit}
          title={<FormattedMessage {...messages.updateTitle} />}
        />
      )}
    </>
  );
};
