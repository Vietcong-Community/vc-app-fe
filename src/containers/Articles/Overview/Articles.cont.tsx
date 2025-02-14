import React, { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Flex, Radio, RadioChangeEvent, Spin } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticleCategories, useArticlesList } from '../../../api/hooks/articles/api';
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
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedCategory, setCategory] = useState<undefined | string>(undefined);

  const onCategoryChange = (e: RadioChangeEvent) => {
    setSelectedPage(1);
    setCategory(e.target.value);
  };

  const articleCategories = useArticleCategories();
  const articles = useArticlesList({ categoryId: selectedCategory, page: selectedPage });
  const userMe = useUserMe('always', [401]);

  const userCanManageArticles = some(
    userMe.data?.roles ?? [],
    (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR,
  );

  // REMOVE LATER
  useEffect(() => {
    if (
      (userMe.data &&
        !some(userMe.data?.roles ?? [], (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR)) ||
      userMe.isError
    ) {
      navigate(Routes.HOME);
    }
  }, [userMe.data?.roles, userMe.isError]);

  const onCreateNewArticle = () => navigate(Routes.NEW_ARTICLE);

  const articlesData = articles.data?.articles?.filter((item) => {
    if (userCanManageArticles) {
      return true;
    }

    return item.published;
  });

  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-articles', title: <FormattedMessage {...messages.title} /> }]}>
      <Helmet title={formatMessage(messages.title)} />
      <Flex align="center" justify="space-between">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        {userCanManageArticles && (
          <Button onClick={onCreateNewArticle} style={{ padding: '0.25rem 1rem' }}>
            <PlusOutlined />
            <FormattedMessage {...messages.newArticle} />
          </Button>
        )}
      </Flex>
      <Gap defaultHeight={16} />
      <EaseInOutContainer isOpen={!articleCategories.isLoading}>
        <S.Content>
          <S.Categories>
            <Radio.Group
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
              onChange={onCategoryChange}
              defaultValue={undefined}
              options={[
                { value: undefined, label: <FormattedMessage {...messages.allCategories} /> },
                ...(articleCategories.data?.items.map((item) => ({ value: item.id, label: item.name })) ?? []),
              ]}
            ></Radio.Group>
          </S.Categories>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {articles.isLoading && (
              <>
                <Gap defaultHeight={32} height={{ md: 16 }} />
                <Spin size="large" style={{ margin: '0 auto', width: '100%' }} />
                <Gap defaultHeight={32} height={{ md: 16 }} />
              </>
            )}
            {articles.data?.total === 0 && !articles.isLoading && (
              <S.NoArticles>
                <Gap defaultHeight={32} height={{ md: 16 }} />
                <FormattedMessage {...messages.noArticles} />
              </S.NoArticles>
            )}
            <EaseInOutContainer isOpen={!articles.isLoading && !!articles.data}>
              <S.ArticlesContainer>
                {articlesData?.map((item) => <ArticlePreview article={item} />)}
              </S.ArticlesContainer>
            </EaseInOutContainer>
          </div>
        </S.Content>
      </EaseInOutContainer>
      <Gap defaultHeight={32} height={{ md: 16 }} />
    </ContentLayout>
  );
};
