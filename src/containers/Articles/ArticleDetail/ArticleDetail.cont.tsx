import React, { useState } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Spin } from 'antd';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticleById, useUpdateArticle } from '../../../api/hooks/articles/api';
import { useUserMe } from '../../../api/hooks/auth/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Divider } from '../../../components/Divider/Divider';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { ReactQuillRenderer } from '../../../components/ReactQuillRenderer/ReactQuillRenderer';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { DeleteArticleModal } from '../components/DeleteArticleModal/DeleteArticleModal';

import { messages } from './messages';

import * as S from '../../Teams/TeamDetail/TeamDetail.style';

export const ArticleDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ articleId: string }>();
  const { formatMessage } = useIntl();
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState<boolean>(false);
  const { showNotification } = useNotifications();

  const userMe = useUserMe('always', [401]);
  const articleDetail = useArticleById(query.articleId);
  const updateArticle = useUpdateArticle(query.articleId);

  const publishArticle = async () => {
    try {
      await updateArticle.mutateAsync({ published: true });
      showNotification(messages.publishSuccessful);
    } catch {
      showNotification(messages.publishFailed, undefined, NotificationType.ERROR);
    }
  };
  const hideArticle = async () => {
    try {
      await updateArticle.mutateAsync({ published: false });
      showNotification(messages.hideArticleSuccess);
    } catch {
      showNotification(messages.hideArticleFailed, undefined, NotificationType.ERROR);
    }
  };

  const userCanManageArticles = some(
    userMe.data?.roles ?? [],
    (item) => item === Role.ADMIN || item === Role.CONTENT_CREATOR,
  );

  const adminItems: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.publishedArticle} />,
      key: '1',
      onClick: publishArticle,
      disabled: articleDetail.data?.published,
    },
    {
      label: <FormattedMessage {...messages.hideArticle} />,
      key: '3',
      onClick: hideArticle,
      disabled: !articleDetail.data?.published,
    },
    {
      label: <FormattedMessage {...messages.updateArticle} />,
      key: '3',
      onClick: () => navigate(Routes.UPDATE_ARTICLE.replace(':articleId', query.articleId)),
    },
    {
      label: <FormattedMessage {...messages.deleteArticle} />,
      key: '4',
      onClick: () => setRemoveModalIsOpen(true),
      disabled: !articleDetail.data?.published,
    },
  ];

  return (
    <>
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
            {userCanManageArticles && (
              <Dropdown menu={{ items: adminItems }} trigger={['click']}>
                <S.AvatarIcon shape="square" size={32} icon={<SettingOutlined />} />
              </Dropdown>
            )}
          </Flex>
          <Gap defaultHeight={8} />
          <Divider />
          <Gap defaultHeight={16} />
          <ReactQuillRenderer data={articleDetail.data?.content} />
        </EaseInOutContainer>
      </ContentLayout>
      <DeleteArticleModal
        articleId={query.articleId}
        isOpen={removeModalIsOpen}
        onClose={() => setRemoveModalIsOpen(false)}
        title={articleDetail.data?.title ?? ''}
      />
    </>
  );
};
