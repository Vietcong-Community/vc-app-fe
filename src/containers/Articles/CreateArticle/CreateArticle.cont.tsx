import React, { useEffect, useState } from 'react';

import { Flex } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticleCategories, useCreateArticle } from '../../../api/hooks/articles/api';
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

export const CreateArticleCont: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const [articleContent, setArticleContent] = useState<string>('');

  const userMe = useUserMe('always');
  const articleCategories = useArticleCategories();
  const createArticle = useCreateArticle();

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

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await createArticle.mutateAsync({
        title: values.title,
        perex: values.perex,
        categoryId: values.categoryId,
        content: articleContent,
      });
      showNotification(messages.createSuccess);
      navigate(Routes.ARTICLE_DETAIL.replace(':articleId', response.id));
    } catch {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
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
      <ArticleForm
        categories={articleCategories.data?.items ?? []}
        isSubmitting={createArticle.isPending}
        onSubmit={onSubmit}
      />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      <Editor setValue={setArticleContent} value={articleContent} />
    </ContentLayout>
  );
};
