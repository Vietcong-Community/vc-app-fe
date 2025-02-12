import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticlesList } from '../../../api/hooks/articles/api';
import { useUserMe } from '../../../api/hooks/auth/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Button } from '../../../components/Button/Button';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';

import { ArticlePreview } from './components/ArticlePreview/ArticlePreview';
import { messages } from './messages';

import * as S from './Articles.style';

export const ArticlesOverview: React.FC = () => {
  const articles = useArticlesList();
  const userMe = useUserMe('always', [401]);
  const { formatMessage } = useIntl();
  const { navigate } = useRouter();

  const userCanManageArticles = some(
    userMe.data?.roles ?? [],
    (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR,
  );

  const onCreateNewArticle = () => navigate(Routes.NEW_ARTICLE);

  const articlesData = articles.data?.articles?.filter((item) => {
    if (userCanManageArticles) {
      return true;
    }

    return item.published;
  });

  const showLoading = articles.isLoading;

  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-articles', title: <FormattedMessage {...messages.title} /> }]}>
      <Helmet title={formatMessage(messages.title)} />
      {userCanManageArticles && (
        <Flex align="center" justify="flex-end">
          <Button onClick={onCreateNewArticle} style={{ padding: '0.25rem 1rem' }}>
            <PlusOutlined />
            <FormattedMessage {...messages.newArticle} />
          </Button>
        </Flex>
      )}
      <Flex align="center" justify="center">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
      </Flex>
      {showLoading && (
        <>
          <Gap defaultHeight={32} height={{ md: 16 }} />
          <Spin size="large" />
        </>
      )}
      <Gap defaultHeight={16} />
      <EaseInOutContainer isOpen={!showLoading}>
        <S.ArticlesContainer>{articlesData?.map((item) => <ArticlePreview article={item} />)}</S.ArticlesContainer>
      </EaseInOutContainer>
      <Gap defaultHeight={32} height={{ md: 16 }} />
    </ContentLayout>
  );
};
