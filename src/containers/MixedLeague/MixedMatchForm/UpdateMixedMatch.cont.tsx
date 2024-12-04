import React from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMaps } from '../../../api/hooks/enums/api';
import { useMatchById, useUpdateMatch } from '../../../api/hooks/mixedLeague/match/api';
import { useUsers } from '../../../api/hooks/users/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './MixedMatch.fields';
import { MixedMatchForm } from './MixedMatch.form';
import { messages } from './messages';
import { transformInitialValues, transformSubmitValues } from './utils';

export const UpdateMixedMatchCont: React.FC = () => {
  const { query, navigate } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const matchDetail = useMatchById(query.id);
  const updateMatch = useUpdateMatch(query.id);
  const users = useUsers();
  const maps = useMaps();

  const onCancel = () => navigate(Routes.SEASON_DETAIL.replace(':id', query.id));

  const onSubmit = async (values: IFormData) => {
    try {
      const submitValues = transformSubmitValues(values);
      const response = await updateMatch.mutateAsync(submitValues);
      showNotification(messages.updateSuccess);
      navigate(Routes.MIXED_MATCH_DETAIL.replace(':id', response.data.id));
    } catch (e) {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  const showLoading = !users.data || !maps.data || !matchDetail.isFetchedAfterMount;

  return (
    <>
      <Helmet title={formatMessage(messages.createTitle)} />
      {showLoading ? (
        <Spin size="large" style={{ margin: '2rem 0' }} />
      ) : (
        <MixedMatchForm
          initialValues={transformInitialValues(matchDetail.data)}
          isSubmitting={updateMatch.isPending}
          maps={maps.data ?? []}
          onCancel={onCancel}
          onSubmit={onSubmit}
          players={users.data ?? []}
          title={<FormattedMessage {...messages.createTitle} />}
        />
      )}
    </>
  );
};
