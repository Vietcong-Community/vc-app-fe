import React from 'react';

import { Tag } from 'antd';

import { IArticle } from '../../../../../api/hooks/articles/interfaces';
import helicopter from '../../../../../assets/heli-footer-dark-design.webp';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';
import { formatDateForUser } from '../../../../../utils/dateUtils';

import * as S from './ArticlePreview.style';

interface IProps {
  article: IArticle;
}

export const ArticlePreview: React.FC<IProps> = (props: IProps) => {
  const { article } = props;
  const { navigate } = useRouter();

  const goToDetail = () => navigate(Routes.ARTICLE_DETAIL.replace(':articleId', article.id));

  return (
    <Card onClick={goToDetail} style={{ cursor: 'pointer' }} hoverScale>
      <S.Image src={article.image?.url ?? helicopter} alt="" />
      <S.Title>{article.title}</S.Title>
      <Gap defaultHeight={16} />
      <S.Perex>{article.perex}</S.Perex>
      <Gap defaultHeight={16} />
      <S.MetaInfoRow>
        {formatDateForUser(article.createdAt)}
        <Tag>{article.category.name}</Tag>
      </S.MetaInfoRow>
    </Card>
  );
};
