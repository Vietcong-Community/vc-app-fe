import React, { useState } from 'react';

import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps, Spin, Tag } from 'antd';
import dayjs from 'dayjs';
import { compact } from 'lodash';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useArticleById, useUpdateArticle } from '../../../api/hooks/articles/api';
import { useUserMe } from '../../../api/hooks/auth/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Divider } from '../../../components/Divider/Divider';
import { DEFAULT_USER_DATE_FORMAT_WITH_TIME } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { ReactQuillRenderer } from '../../../components/ReactQuillRenderer/ReactQuillRenderer';
import { H2 } from '../../../components/Titles/H2/H2';
import { Role } from '../../../constants/enums';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { DeleteArticleModal } from '../components/DeleteArticleModal/DeleteArticleModal';

import { messages } from './messages';

import * as S from './ArticleDetail.style';

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
      await updateArticle.mutateAsync({ isPublished: true });
      showNotification(messages.publishSuccessful);
    } catch {
      showNotification(messages.publishFailed, undefined, NotificationType.ERROR);
    }
  };
  const hideArticle = async () => {
    try {
      await updateArticle.mutateAsync({ isPublished: false });
      showNotification(messages.hideArticleSuccess);
    } catch {
      showNotification(messages.hideArticleFailed, undefined, NotificationType.ERROR);
    }
  };

  const goToAuthorDetail = () => {
    if (articleDetail.data?.createdBy?.id) {
      navigate(Routes.USER_PROFILE.replace(':id', articleDetail.data.createdBy.id));
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
      disabled: articleDetail.data?.isPublished,
    },
    {
      label: <FormattedMessage {...messages.hideArticle} />,
      key: '2',
      onClick: hideArticle,
      disabled: !articleDetail.data?.isPublished,
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
      disabled: articleDetail.data?.isPublished,
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
          <S.Container>
            {userCanManageArticles && (
              <>
                <Flex align="center" justify="end">
                  <Dropdown menu={{ items: adminItems }} trigger={['click']}>
                    <S.AvatarIcon shape="square" size={32} icon={<SettingOutlined />} />
                  </Dropdown>
                </Flex>
                <Gap defaultHeight={8} />
              </>
            )}
            <Flex align="center" justify="start">
              <H2>{articleDetail.data?.title ?? ''}</H2>
            </Flex>
            <Gap defaultHeight={8} />
            <Divider />
            <Gap defaultHeight={16} />
            <Flex align="center" justify="flex-start" style={{ gap: 8 }}>
              {articleDetail.data?.category && <Tag>{articleDetail.data?.category?.name}</Tag>}
              {userCanManageArticles && !articleDetail.data?.isPublished && (
                <Tag color="red">
                  <FormattedMessage {...messages.notPublished} />
                </Tag>
              )}
              {articleDetail.data?.updatedAt && (
                <span style={{ fontSize: 12 }}>
                  <FormattedMessage
                    {...messages.lastUpdated}
                    values={{ value: dayjs(articleDetail.data?.updatedAt).format(DEFAULT_USER_DATE_FORMAT_WITH_TIME) }}
                  />
                </span>
              )}
            </Flex>
            <Gap defaultHeight={16} />
          </S.Container>
          <ReactQuillRenderer data={articleDetail.data?.content} />
          {articleDetail.data?.createdBy && (
            <S.Container>
              <Divider />
              <Gap defaultHeight={16} />
              <S.AuthorContainer>
                <div>
                  <Gap defaultHeight={24} />
                  <S.AvatarIcon
                    onClick={goToAuthorDetail}
                    size={64}
                    icon={
                      articleDetail.data?.createdBy?.image?.url ? (
                        <img alt="" src={articleDetail.data?.createdBy?.image?.url} />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                </div>
                <S.AuthorInfo>
                  <span style={{ fontSize: 12 }}>
                    <FormattedMessage {...messages.author} />
                  </span>
                  <Gap defaultHeight={4} />
                  <S.AuthorName onClick={goToAuthorDetail}>
                    {articleDetail.data?.createdBy?.nickname}{' '}
                    <span style={{ fontSize: 12 }}>
                      (
                      {compact([
                        articleDetail.data?.createdBy?.firstName,
                        articleDetail.data?.createdBy?.lastName,
                      ]).join(' ')}
                      )
                    </span>
                  </S.AuthorName>
                  <span style={{ fontSize: 14 }}>{articleDetail.data?.createdBy?.description}</span>
                </S.AuthorInfo>
              </S.AuthorContainer>
              <Gap defaultHeight={32} />
            </S.Container>
          )}
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
