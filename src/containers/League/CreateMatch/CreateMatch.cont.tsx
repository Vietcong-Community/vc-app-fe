import React, { useEffect } from 'react';

import { Spin } from 'antd';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { EaseInOutContainer } from 'src/components/Animations/EaseInOutContainer/EaseInOutContainer';

import { useCreateMatchChallenge, useMapsInSeason, useSeasonTeams } from '../../../api/hooks/league/api';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { DEFAULT_SYSTEM_DATE_TIME_FORMAT } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { canUserManageMatch } from '../utils';

import { IFormData } from './CreateMatch.fields';
import { CreateMatchForm } from './CreateMatch.form';
import { messages } from './messages';

export const CreateMatchCont: React.FC = () => {
  const { navigate, query } = useRouter<{ seasonId: string; opponentId?: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const maps = useMapsInSeason(query.seasonId);
  const seasonTeams = useSeasonTeams(query.seasonId, undefined, 'always');
  const createMatch = useCreateMatchChallenge(query.seasonId);

  const myTeams = useMeTeams('always');

  const isPossibleToCreateMatch = canUserManageMatch(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);

  useEffect(() => {
    if (seasonTeams.isFetchedAfterMount && myTeams.isFetchedAfterMount && !isPossibleToCreateMatch) {
      navigate(Routes.SEASON_DETAIL.replace(':seasonId', query.seasonId));
    }
  }, [seasonTeams.isFetchedAfterMount, myTeams.isFetchedAfterMount, isPossibleToCreateMatch]);

  const onSubmit = async (values: IFormData) => {
    const endDate = dayjs(values.startDate).add(1, 'hour').add(15, 'minute').format(DEFAULT_SYSTEM_DATE_TIME_FORMAT);
    try {
      const response = await createMatch.mutateAsync({ ...values, endDate });
      showNotification(messages.createSuccess);
      navigate(Routes.MATCH_DETAIL.replace(':matchId', response.id));
    } catch (e) {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  const showLoading = maps.isLoading || myTeams.isLoading || seasonTeams.isLoading;

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
          onClick: () => navigate(Routes.SEASON_DETAIL.replace(':seasonId', query.seasonId)),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.seasonDetailBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-match',
          title: <FormattedMessage {...messages.newMatchBreadcrumb} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <CreateMatchForm
          // initialValues={{ opponentId: query?.opponentId }}
          isSubmitting={createMatch.isPending}
          onCancel={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', query.seasonId))}
          maps={maps.data?.items ?? []}
          onSubmit={onSubmit}
          teams={seasonTeams.data?.items?.filter((item) => !item.userIsMemberOfTeam) ?? []}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
