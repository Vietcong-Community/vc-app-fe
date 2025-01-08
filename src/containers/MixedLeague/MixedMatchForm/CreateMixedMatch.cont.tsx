import React from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMaps } from '../../../api/hooks/enums/api';
import { useCreateMixedMatch } from '../../../api/hooks/mixedLeague/seasons/api';
import { useUsers } from '../../../api/hooks/users/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './MixedMatch.fields';
import { MixedMatchForm } from './MixedMatch.form';
import { messages } from './messages';
import { transformSubmitValues } from './utils';

export const CreateMixedMatchCont: React.FC = () => {
  const { query, navigate } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const createMatch = useCreateMixedMatch(query.id);
  const users = useUsers();
  const maps = useMaps();

  const onCancel = () => navigate(Routes.SEASON_DETAIL.replace(':id', query.id));

  const onSubmit = async (values: IFormData) => {
    console.log(values);
    try {
      const submitValues = transformSubmitValues(values);
      const response = await createMatch.mutateAsync(submitValues);
      showNotification(messages.createSuccess);
      navigate(Routes.MIXED_MATCH_DETAIL.replace(':id', response.data.id));
    } catch (e) {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  const showLoading = !users.data || !maps.data;

  return (
    <>
      <Helmet title={formatMessage(messages.createTitle)} />
      {showLoading ? (
        <Spin size="large" style={{ margin: '2rem 0' }} />
      ) : (
        <MixedMatchForm
          isSubmitting={createMatch.isPending}
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
