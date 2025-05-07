import React from 'react';

import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useArticlesList } from '../../../../api/hooks/articles/api';
import { Divider } from '../../../../components/Divider/Divider';
import { H2 } from '../../../../components/Titles/H2/H2';

import { messages } from './messages';

import * as S from './Articles.style';

export const Articles: React.FC = () => {
  const articles = useArticlesList({ published: true, page: 1, limit: 4 });

  return (
    <>
      <H2>
        <FormattedMessage {...messages.title} />
      </H2>
      <Divider />
      {articles.isLoading && <Spin size="large" />}
      <S.Container>
        <S.NewestArticle>{articles.data?.articles?.[0]?.title}</S.NewestArticle>
      </S.Container>
    </>
  );
};
