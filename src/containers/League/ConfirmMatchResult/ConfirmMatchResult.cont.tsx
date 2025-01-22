import React from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { useConfirmMatchScore, useMatchDetail } from '../../../api/hooks/league/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { ConfirmMatchResultForm } from './ConfirmMatchResult.form';
import { messages } from './messages';

export const ConfirmMatchResultCont: React.FC = () => {
  const { navigate, query } = useRouter<{ leagueId: string; seasonId: string; matchId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const matchDetail = useMatchDetail(query.leagueId, query.seasonId, query.matchId);
  const confirmMatchResult = useConfirmMatchScore(query.leagueId, query.seasonId, query.matchId);

  const onSubmit = async () => {
    try {
      await confirmMatchResult.mutateAsync();
      showNotification(messages.confirmSuccess);
      navigate(
        Routes.MATCH_DETAIL.replace(':leagueId', query.leagueId)
          .replace(':seasonId', query.seasonId)
          .replace(':matchId', query.matchId),
      );
    } catch (e) {
      showNotification(messages.confirmFailed, undefined, NotificationType.ERROR);
    }
  };

  const initialValues = {
    rounds:
      matchDetail.data?.rounds.map((item) => ({
        mapId: item.map?.id,
        scoreChallenger: item.scoreChallenger,
        scoreOpponent: item.scoreOpponent,
      })) ?? [],
  };

  const showLoading = matchDetail.isLoading;

  return (
    <ContentLayout>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      {!showLoading && (
        <ConfirmMatchResultForm
          challengerMap={matchDetail.data?.challengerMap}
          challengerTeam={matchDetail.data?.challenger?.team}
          initialValues={initialValues}
          isSubmitting={confirmMatchResult.isPending}
          onCancel={() =>
            navigate(
              Routes.MATCH_DETAIL.replace(':leagueId', query.leagueId)
                .replace(':seasonId', query.seasonId)
                .replace(':matchId', query.matchId),
            )
          }
          onSubmit={onSubmit}
          opponentMap={matchDetail.data?.opponentMap}
          opponentTeam={matchDetail.data?.opponent?.team}
        />
      )}
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
