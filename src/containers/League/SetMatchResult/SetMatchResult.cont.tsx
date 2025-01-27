import React, { useEffect } from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMatchDetail, useSetMatchScore } from '../../../api/hooks/league/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './SetMatchResult.fields';
import { SetMatchResultForm } from './SetMatchResult.form';
import { messages } from './messages';

export const SetMatchScoreCont: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const matchDetail = useMatchDetail(query.matchId);
  const setMatchResult = useSetMatchScore(query.matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      await setMatchResult.mutateAsync(values);
      showNotification(messages.saveSuccess);
      navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId));
    } catch (e) {
      showNotification(messages.saveFailed, undefined, NotificationType.ERROR);
    }
  };

  useEffect(() => {
    if (matchDetail.isError) {
      showNotification(messages.matchFetchError, undefined, NotificationType.ERROR);
      navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId));
    }
  }, [matchDetail.isError]);

  const initialValues = {
    rounds: [
      { mapId: matchDetail.data?.challengerMap.id, scoreChallenger: 0, scoreOpponent: 0 },
      { mapId: matchDetail.data?.challengerMap.id, scoreChallenger: 0, scoreOpponent: 0 },
      { mapId: matchDetail.data?.opponentMap?.id, scoreChallenger: 0, scoreOpponent: 0 },
      { mapId: matchDetail.data?.opponentMap?.id, scoreChallenger: 0, scoreOpponent: 0 },
    ],
  };

  const showLoading = matchDetail.isLoading && !!matchDetail.data;

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-league',
          onClick: () => navigate(Routes.LEAGUE),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.leaguesBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-season',
          onClick: () => navigate(Routes.SEASON_DETAIL.replace(':seasonId', matchDetail.data?.season.id ?? '')),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.seasonDetailBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-match',
          onClick: () => navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId)),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.matchDetailBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-result',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <SetMatchResultForm
          challengerTeam={matchDetail.data?.challenger?.team}
          challengerMap={matchDetail.data?.challengerMap}
          initialValues={initialValues as IFormData}
          isSubmitting={setMatchResult.isPending}
          opponentMap={matchDetail.data?.opponentMap}
          opponentTeam={matchDetail.data?.opponent?.team}
          onCancel={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', matchDetail.data?.season.id ?? ''))}
          onSubmit={onSubmit}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
