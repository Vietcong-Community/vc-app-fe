import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useAllMaps, useCreateMap } from '../../../api/hooks/map/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { Table } from '../../../components/Table/Table';
import { H2 } from '../../../components/Titles/H2/H2';
import { Role } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './CreateMap.fields';
import { CreateMapForm } from './CreateMap.form';
import { messages } from './messages';
import { IMapTableRow, MAP_COLUMNS } from './types';

export const CreateMapCont: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const userMe = useUserMe('always');
  const allMaps = useAllMaps();
  const createMap = useCreateMap();

  useEffect(() => {
    if ((!userMe.isLoading && !userMe.data?.roles.includes(Role.ADMIN)) || userMe.isError) {
      showNotification(messages.insufficientRights);
      navigate(Routes.HOME);
    }
  }, [userMe.isLoading, userMe.data?.roles, userMe.isError]);

  const onSubmit = async (values: IFormData) => {
    try {
      await createMap.mutateAsync(values);
      showNotification(messages.createSuccess);
      navigate(Routes.HOME);
    } catch (e) {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  const tableData: IMapTableRow[] =
    allMaps.data?.items?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        official: item.official ? formatMessage(messages.yes) : formatMessage(messages.no),
      };
    }) ?? [];

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-match',
          title: <FormattedMessage {...messages.mapBreadcrumb} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      <CreateMapForm isSubmitting={createMap.isPending} onCancel={() => navigate(Routes.HOME)} onSubmit={onSubmit} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      <H2>
        <FormattedMessage {...messages.existingMaps} />
      </H2>
      <Gap defaultHeight={16} />
      <Table columns={MAP_COLUMNS} data={tableData} />
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
