import React from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { EaseInOutContainer } from 'src/components/Animations/EaseInOutContainer/EaseInOutContainer';

import {
  useAcceptMatchChallenge,
  useMapsInSeason,
  useMatchDetail,
  useRejectMatchChallenge,
} from '../../../api/hooks/league/api';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './AcceptMatchChallenge.fields';
import { AcceptMatchChallengeForm } from './AcceptMatchChallenge.form';
import { messages } from './messages';

export const AcceptMatchChallengeCont: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const matchDetail = useMatchDetail(query.matchId);
  const maps = useMapsInSeason(matchDetail.data?.season.id);
  const acceptMatchChallenge = useAcceptMatchChallenge(query.matchId);
  const rejectMatchChallenge = useRejectMatchChallenge(query.matchId);

  const onAcceptChallenge = async (values: IFormData) => {
    try {
      await acceptMatchChallenge.mutateAsync(values);
      showNotification(messages.acceptSuccess);
      navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId));
    } catch (e) {
      showNotification(messages.failedNotification, undefined, NotificationType.ERROR);
    }
  };

  const onRejectChallenge = async () => {
    try {
      await rejectMatchChallenge.mutateAsync();
      showNotification(messages.rejectSuccess, undefined, NotificationType.INFO);
      navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId));
    } catch (e) {
      showNotification(messages.failedNotification, undefined, NotificationType.ERROR);
    }
  };

  const showLoading = maps.isLoading || matchDetail.isLoading;

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
          onClick: () => navigate(Routes.SEASON_DETAIL.replace(':seasonId', matchDetail.data?.season?.id ?? '')),
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
          key: 'bc-accept',
          title: <FormattedMessage {...messages.challengeBreadcrumb} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <AcceptMatchChallengeForm
          challenger={matchDetail.data?.challenger}
          challengerMap={matchDetail.data?.challengerMap}
          goBack={() => navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId))}
          isSubmitting={acceptMatchChallenge.isPending || rejectMatchChallenge.isPending}
          onReject={onRejectChallenge}
          maps={maps.data?.items ?? []}
          onSubmit={onAcceptChallenge}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
