import React from 'react';

import { faComment } from '@fortawesome/free-solid-svg-icons/faComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spin, Tag } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { useArticlesList } from '../../../../api/hooks/articles/api';
import helicopter from '../../../../assets/heli-footer-dark-design.webp';
import { Card } from '../../../../components/Card/Card';
import { Gap } from '../../../../components/Gap/Gap';
import { H2 } from '../../../../components/Titles/H2/H2';
import { Routes } from '../../../../routes/enums';
import { formatDateForUser } from '../../../../utils/dateUtils';

import { messages } from './messages';

import * as S from './Articles.style';

export const Articles: React.FC = () => {
  const articles = useArticlesList({ published: true, page: 1, limit: 4 });

  const sortedArticles =
    articles.data?.articles?.sort((a, b) => {
      if (dayjs(a.createdAt).isBefore(b.createdAt)) {
        return 1;
      }

      return -1;
    }) ?? [];

  const newestArticle = sortedArticles?.[0];
  const otherArticles = sortedArticles?.slice(1, 4);

  return (
    <>
      <H2>
        <FormattedMessage {...messages.title} />
      </H2>
      <Gap defaultHeight={16} />
      {articles.isLoading && <Spin size="large" />}
      <S.Container>
        {newestArticle && (
          <S.NewestArticle>
            <Link to={Routes.ARTICLE_DETAIL.replace(':articleId', newestArticle.id)} style={{ textDecoration: 'none' }}>
              <Card
                style={{ cursor: 'pointer' }}
                hoverScale
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <S.Image src={newestArticle.image?.url ?? helicopter} alt="" />
                  <S.Title>{newestArticle.title}</S.Title>
                  <Gap defaultHeight={16} />
                  <S.Perex>{newestArticle.perex}</S.Perex>
                  <Gap defaultHeight={16} />
                  <S.MetaInfoRow>
                    <S.CommentCount>
                      {formatDateForUser(newestArticle.createdAt)} &nbsp;
                      <FontAwesomeIcon icon={faComment} style={{ fontSize: 16 }} /> {newestArticle.commentsCount ?? 0}
                    </S.CommentCount>
                    <div>
                      <Tag>{newestArticle.category.name}</Tag>
                    </div>
                  </S.MetaInfoRow>
                </div>
              </Card>
            </Link>
          </S.NewestArticle>
        )}
        {otherArticles && (
          <S.OtherArticles>
            {otherArticles?.map((item) => {
              return (
                <Card
                  style={{ cursor: 'pointer' }}
                  hoverScale
                  bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div style={{ textAlign: 'start' }}>
                    <S.OtherArticleImage src={item.image?.url ?? helicopter} alt="" />
                    <S.Title>{item.title}</S.Title>
                    <Gap defaultHeight={16} />
                    <S.Perex>{item.perex}</S.Perex>
                    <Gap defaultHeight={16} />
                  </div>
                  <S.MetaInfoRow>
                    <S.CommentCount>
                      {formatDateForUser(item.createdAt)} &nbsp;
                      <FontAwesomeIcon icon={faComment} style={{ fontSize: 16 }} /> {item.commentsCount ?? 0}
                    </S.CommentCount>
                    <div>
                      <Tag>{item.category.name}</Tag>
                    </div>
                  </S.MetaInfoRow>
                </Card>
              );
            })}
          </S.OtherArticles>
        )}
        {articles.data?.total && (
          <>
            <Link to={Routes.ARTICLES}>
              <FormattedMessage
                {...messages.goToAllArticles}
                values={{ value: articles.data?.total > 0 ? `(${articles.data?.total ?? 0})` : '' }}
              />
            </Link>
            <Gap defaultHeight={32} />
          </>
        )}
      </S.Container>
    </>
  );
};
