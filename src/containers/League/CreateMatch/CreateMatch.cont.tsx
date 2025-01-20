import React from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { useCreateMatchChallenge, useMapsInSeason, useSeasonTeams } from '../../../api/hooks/league/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './CreateMatch.fields';
import { CreateMatchForm } from './CreateMatch.form';
import { messages } from './messages';

export const CreateMatchCont: React.FC = () => {
  const { navigate, query } = useRouter<{ leagueId: string; seasonId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const maps = useMapsInSeason(query.leagueId, query.seasonId);
  const ladder = useSeasonTeams(query.leagueId, query.seasonId);
  const createMatch = useCreateMatchChallenge(query.leagueId, query.seasonId);

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await createMatch.mutateAsync({ ...values, endDate: values.startDate });
      showNotification(messages.createSuccess);
      navigate(
        Routes.MATCH_DETAIL.replace(':leagueId', query.leagueId)
          .replace(':seasonId', query.seasonId)
          .replace(':matchId', response.id),
      );
    } catch (e) {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  const showLoading = maps.isLoading;

  return (
    <ContentLayout>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      {!showLoading && (
        <CreateMatchForm
          isSubmitting={createMatch.isPending}
          onCancel={() =>
            navigate(Routes.SEASON_DETAIL.replace(':leagueId', query.leagueId).replace(':seasonId', query.seasonId))
          }
          maps={maps.data?.items ?? []}
          onSubmit={onSubmit}
          teams={ladder.data?.items?.filter((item) => !item.userIsMemberOfTeam) ?? []}
        />
      )}
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
