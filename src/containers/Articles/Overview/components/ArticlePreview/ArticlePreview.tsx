import React from 'react';

import { Tag } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IArticle } from '../../../../../api/hooks/articles/interfaces';
import helicopter from '../../../../../assets/heli-footer-dark-design.webp';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';
import { formatDateForUser } from '../../../../../utils/dateUtils';

import { messages } from './messages';

import * as S from './ArticlePreview.style';

interface IProps {
  article: IArticle;
  userCanManageArticles: boolean;
}

export const ArticlePreview: React.FC<IProps> = (props: IProps) => {
  const { article, userCanManageArticles } = props;
  const { navigate } = useRouter();

  const goToDetail = () => navigate(Routes.ARTICLE_DETAIL.replace(':articleId', article.id));

  return (
    <Card
      onClick={goToDetail}
      style={{ cursor: 'pointer' }}
      hoverScale
      bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <div>
        <S.Image src={article.image?.url ?? helicopter} alt="" />
        <S.Title>{article.title}</S.Title>
        <Gap defaultHeight={16} />
        <S.Perex>{article.perex}</S.Perex>
        <Gap defaultHeight={16} />
      </div>
      <S.MetaInfoRow>
        {formatDateForUser(article.createdAt)}
        <div>
          {userCanManageArticles && !article.isPublished && (
            <Tag color="red">
              <FormattedMessage {...messages.notPublished} />
            </Tag>
          )}
          <Tag>{article.category.name}</Tag>
        </div>
      </S.MetaInfoRow>
    </Card>
  );
};
