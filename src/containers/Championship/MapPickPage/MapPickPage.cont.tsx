import React from 'react';

import { FormattedMessage } from 'react-intl';

import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { messages } from './messages';

export const MapPickPage: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();

  return (
    <ContentLayout
      breadcrumbItems={[
        // {
        //   key: 'bc-league',
        //   onClick: () => navigate(Routes.CHAMPIONSHIP),
        //   title: (
        //     <BreadcrumbItem>
        //       <FormattedMessage {...messages.overviewBreadcrumb} />
        //     </BreadcrumbItem>
        //   ),
        // },
        // {
        //   key: 'bc-match',
        //   onClick: () => navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':id', matchDetail.data?.season.id ?? '')),
        //   title: (
        //     <BreadcrumbItem>
        //       {matchDetail.data?.season?.name ?? <FormattedMessage {...messages.championshipDetailBreadcrumb} />}
        //     </BreadcrumbItem>
        //   ),
        // },
        {
          key: 'bc-season',
          onClick: () => navigate(Routes.CHAMPIONSHIP_DETAIL.replace(':id', query.matchId)),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.matchBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-pick',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    ></ContentLayout>
  );
};
