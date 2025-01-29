import React, { useEffect } from 'react';

import { Spin } from 'antd';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAdminCreateMatch } from '../../../api/hooks/admin/api';
import { useUserMe } from '../../../api/hooks/auth/api';
import { useMapsInSeason, useSeasonTeams } from '../../../api/hooks/league/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { DEFAULT_SYSTEM_DATE_TIME_FORMAT } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { Role } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './CreateMatch.fields';
import { CreateMatchForm } from './CreateMatch.form';
import { messages } from './messages';

export const CreateMatchCont: React.FC = () => {
  const { navigate, query } = useRouter<{ seasonId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const userMe = useUserMe('always');
  const maps = useMapsInSeason(query.seasonId);
  const seasonTeams = useSeasonTeams(query.seasonId, undefined, 'always');
  const createMatch = useAdminCreateMatch(query.seasonId);

  useEffect(() => {
    if (!userMe.isLoading && !userMe.data?.roles.includes(Role.ADMIN)) {
      showNotification(messages.insufficientRights);
    }
  }, [userMe.isLoading, userMe.data?.roles]);

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

  const showLoading = maps.isLoading || seasonTeams.isLoading;

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
          isSubmitting={createMatch.isPending}
          onCancel={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', query.seasonId))}
          maps={maps.data?.items ?? []}
          onSubmit={onSubmit}
          teams={seasonTeams.data?.items ?? []}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
