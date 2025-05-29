import React, { useEffect } from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMatchDetail, useSetMatchScore } from '../../../api/hooks/league/api';
import { Alert } from '../../../components/Alert/Alert';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { ResourceNotFound } from '../../../components/ResourceNotFound/ResourceNotFound';
import { Nation } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';

import { IFormData } from './SetMatchResult.fields';
import { SetMatchResultForm } from './SetMatchResult.form';
import { messages } from './messages';

export const SetChampionshipMatchScoreCont: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const matchDetail = useMatchDetail(query.matchId);
  const setMatchResult = useSetMatchScore(query.matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      await setMatchResult.mutateAsync(values);
      showNotification(messages.saveSuccess);
      navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId));
    } catch (e) {
      showNotification(messages.saveFailed, undefined, NotificationType.ERROR);
    }
  };

  useEffect(() => {
    if (matchDetail.isError) {
      showNotification(messages.matchFetchError, undefined, NotificationType.ERROR);
      navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId));
    }
  }, [matchDetail.isError]);

  const initialValues = {
    rounds: [
      { mapId: matchDetail.data?.challengerMap.id, scoreChallenger: 0, scoreOpponent: 0, challengerNation: Nation.US },
      { mapId: matchDetail.data?.challengerMap.id, scoreChallenger: 0, scoreOpponent: 0, challengerNation: Nation.VC },
    ],
  };

  const showLoading = matchDetail.isLoading && !!matchDetail.data;

  if (matchDetail.isError) {
    return (
      <ContentLayout>
        <ResourceNotFound name={formatMessage(messages.matchDetailBreadcrumb)} />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-championship',
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
          key: 'bc-result',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <div style={{ margin: 'auto', maxWidth: BreakPoints.md }}>
          <Alert
            style={{ textAlign: 'start' }}
            title={formatMessage(messages.correctScoreAlertTitle)}
            description={formatMessage(messages.correctScoreAlert)}
            type="info"
            showIcon
          />
        </div>
        <Gap defaultHeight={16} />
        <SetMatchResultForm
          challengerTeam={matchDetail.data?.challenger?.team}
          challengerMap={matchDetail.data?.challengerMap}
          initialValues={initialValues as IFormData}
          isSubmitting={setMatchResult.isPending}
          opponentTeam={matchDetail.data?.opponent?.team}
          onCancel={() => navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId))}
          onSubmit={onSubmit}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
