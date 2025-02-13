import React from 'react';

import { FormattedMessage } from 'react-intl';

import { IArticle } from '../../../../../api/hooks/articles/interfaces';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { LinkButton } from '../../../../../components/LinkButton/LinkButton';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

import * as S from './ArticlePreview.style';

interface IProps {
  article: IArticle;
}

export const ArticlePreview: React.FC<IProps> = (props: IProps) => {
  const { article } = props;
  const { navigate } = useRouter();

  const goToDetail = () => navigate(Routes.ARTICLE_DETAIL.replace(':articleId', article.id));

  return (
    <Card>
      <S.Image src={article.image.url} alt="" />
      <S.Title>{article.title}</S.Title>
      <Gap defaultHeight={16} />
      <LinkButton onClick={goToDetail}>
        <FormattedMessage {...messages.detail} />
      </LinkButton>
    </Card>
  );
};
