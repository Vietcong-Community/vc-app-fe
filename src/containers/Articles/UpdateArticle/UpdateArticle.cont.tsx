import React, { useEffect, useState } from 'react';

import { Flex, Spin } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticleById, useArticleCategories, useUpdateArticle } from '../../../api/hooks/articles/api';
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
import { IFormData } from '../components/ArticleForm/ArticleForm.fields';
import { ArticleForm } from '../components/ArticleForm/ArticleForm.form';

import { messages } from './messages';

export const UpdateArticleCont: React.FC = () => {
  const { navigate, query } = useRouter<{ articleId: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const userMe = useUserMe('always');
  const articleCategories = useArticleCategories();
  const articleDetail = useArticleById(query.articleId);
  const updateArticle = useUpdateArticle(query.articleId);

  const [articleContent, setArticleContent] = useState<string>(articleDetail.data?.content ?? '');

  useEffect(() => {
    if (
      (userMe.data &&
        !some(userMe.data?.roles ?? [], (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR)) ||
      userMe.isError
    ) {
      showNotification(messages.insufficientPrivileges, undefined, NotificationType.ERROR);
      navigate(Routes.ARTICLES);
    }
  }, [userMe.data?.roles]);

  useEffect(() => {
    if (!articleDetail.isLoading) {
      setArticleContent(articleDetail.data?.content ?? '');
    }
  }, [articleDetail.isLoading]);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateArticle.mutateAsync({
        title: values.title,
        perex: values.perex,
        categoryId: values.categoryId,
        content: articleContent,
        published: articleDetail.data?.published ?? false,
      });
      showNotification(messages.updateSuccess);
      navigate(Routes.ARTICLE_DETAIL.replace(':articleId', query.articleId));
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

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
      {articleDetail.isLoading && (
        <>
          <Gap defaultHeight={32} />
          <Spin size="large" />
        </>
      )}
      {(!articleDetail.isLoading || !articleDetail.data) && (
        <>
          <ArticleForm
            categories={articleCategories.data?.items ?? []}
            initialValues={{
              categoryId: articleDetail.data?.category.id,
              perex: articleDetail.data?.perex,
              title: articleDetail.data?.title,
            }}
            isSubmitting={updateArticle.isPending}
            onSubmit={onSubmit}
          />
          <Gap defaultHeight={32} height={{ md: 16 }} />
          <Editor setValue={setArticleContent} value={articleContent} />
        </>
      )}
    </ContentLayout>
  );
};
