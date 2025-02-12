import React, { useEffect } from 'react';

import { Flex } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Editor } from '../../../components/Editor/Editor';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { messages } from './messages';

export const CreateArticleCont: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const userMe = useUserMe('always');

  useEffect(() => {
    if (
      userMe.data &&
      !some(userMe.data?.roles ?? [], (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR)
    ) {
      showNotification(messages.insufficientPrivileges, undefined, NotificationType.ERROR);
      navigate(Routes.ARTICLES);
    }
  }, [userMe.data?.roles]);

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-articles',
          onClick: () => navigate(Routes.ARTICLES),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.articles} />
            </BreadcrumbItem>
          ),
        },
        { key: 'bc-articles', title: <FormattedMessage {...messages.title} /> },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Flex align="center" justify="center">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
      </Flex>
      <Gap defaultHeight={32} />
      <Editor />
    </ContentLayout>
  );
};
