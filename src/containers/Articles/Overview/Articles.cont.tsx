import React, { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Flex, Pagination, Radio, RadioChangeEvent, Spin } from 'antd';
import dayjs from 'dayjs';
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
import { FilterArticlesModal } from './components/FilterArticlesModal/FilterArticlesModal';
import { messages } from './messages';

import * as S from './Articles.style';

export const ArticlesOverview: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedCategory, setCategory] = useState<undefined | string>(undefined);
  const [showPublished, setShowPublished] = useState<boolean>(true);

  const onCategoryChange = (e: RadioChangeEvent) => {
    setSelectedPage(1);
    setCategory(e.target.value);
  };

  const articleCategories = useArticleCategories();
  const articles = useArticlesList({ categoryId: selectedCategory, published: showPublished, page: selectedPage });
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

  const articlesData = articles.data?.articles
    ?.filter((item) => {
      if (userCanManageArticles) {
        return true;
      }

      return item.isPublished;
    })
    ?.sort((a, b) => (dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1));

  return (
    <>
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
        <S.MobileCategories>
          <S.FilterButton onClick={() => setIsFilterModalOpen(true)}>
            <FontAwesomeIcon icon={faFilter} />
            <FormattedMessage {...messages.filter} />
          </S.FilterButton>
          <Gap defaultHeight={16} />
        </S.MobileCategories>
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
              {userCanManageArticles && (
                <>
                  <Gap defaultHeight={4} />
                  <Checkbox defaultChecked={showPublished} onChange={() => setShowPublished((value) => !value)}>
                    <FormattedMessage {...messages.published} />
                  </Checkbox>
                </>
              )}
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
                  {articlesData?.map((item) => (
                    <ArticlePreview article={item} userCanManageArticles={userCanManageArticles} />
                  ))}
                </S.ArticlesContainer>
                <Gap defaultHeight={32} />
                <Pagination
                  align={'end'}
                  responsive
                  current={selectedPage}
                  defaultPageSize={10}
                  hideOnSinglePage
                  total={articles.data?.total ?? 0}
                  onChange={(value) => setSelectedPage(value)}
                  showQuickJumper
                  showSizeChanger={false}
                  style={{ width: '100%' }}
                />
              </EaseInOutContainer>
            </div>
          </S.Content>
        </EaseInOutContainer>
        <Gap defaultHeight={32} />
      </ContentLayout>
      <FilterArticlesModal
        articleCategories={articleCategories.data?.items ?? []}
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        setCategory={onCategoryChange}
        setPublished={setShowPublished}
        showPublished={showPublished}
        userCanManageArticles={userCanManageArticles}
      />
    </>
  );
};
