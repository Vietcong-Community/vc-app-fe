import React from 'react';

import { Flex, Spin } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticleById } from '../../../api/hooks/articles/api';
import { useUserMe } from '../../../api/hooks/auth/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { messages } from './messages';

export const ArticleDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ articleId: string }>();
  const { formatMessage } = useIntl();

  const userMe = useUserMe('always', [401]);
  const articleDetail = useArticleById(query.articleId);

  const userCanManageArticles = some(
    userMe.data?.roles ?? [],
    (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR,
  );

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
      {articleDetail.isLoading && (
        <>
          <Gap defaultHeight={32} />
          <Spin size="large" />
        </>
      )}
      <EaseInOutContainer isOpen={!articleDetail.isLoading}>
        <Flex align="center" justify="space-between">
          <H1>{articleDetail.data?.title ?? ''}</H1>
          {userCanManageArticles && <>Cudliky pico</>}
        </Flex>
      </EaseInOutContainer>
    </ContentLayout>
  );
};
