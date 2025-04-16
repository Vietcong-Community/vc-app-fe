import React from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { EaseInOutContainer } from 'src/components/Animations/EaseInOutContainer/EaseInOutContainer';

import { useConfirmMatchScore, useMatchDetail } from '../../../api/hooks/league/api';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { ConfirmMatchResultForm } from './ConfirmMatchResult.form';
import { messages } from './messages';

export const ConfirmChampionshipMatchResultCont: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const matchDetail = useMatchDetail(query.matchId);
  const confirmMatchResult = useConfirmMatchScore(query.matchId);

  const onSubmit = async () => {
    try {
      await confirmMatchResult.mutateAsync();
      showNotification(messages.confirmSuccess);
      navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId));
    } catch (e) {
      showNotification(messages.confirmFailed, messages.confirmFailedDescription, NotificationType.ERROR);
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
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-league',
          onClick: () => navigate(Routes.CHAMPIONSHIP),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.championshipBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-season',
          onClick: () => navigate(Routes.CHAMPIONSHIP_DETAIL.replace(':id', matchDetail.data?.season.id ?? '')),

          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.seasonDetailBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-match',
          onClick: () => navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId)),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.matchDetailBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-confirm',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <ConfirmMatchResultForm
          challengerMap={matchDetail.data?.challengerMap}
          challengerTeam={matchDetail.data?.challenger?.team}
          initialValues={initialValues}
          isSubmitting={confirmMatchResult.isPending}
          onCancel={() => navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId))}
          onSubmit={onSubmit}
          opponentTeam={matchDetail.data?.opponent?.team}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
