import React, { useEffect } from 'react';

import { CompassOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../components/Button/Button';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { useRouter } from '../../hooks/RouterHook';
import { Routes } from '../../routes/enums';

import { messages } from './messages';

import * as S from './NotFoundPage.style';

export const NotFoundPage: React.FC = () => {
  const { pathname, navigate } = useRouter();

  useEffect(() => {
    if (window.location.pathname !== Routes.NOT_FOUND) {
      console.warn(`Stranka nenalezena - ${pathname}`);
      navigate(Routes.NOT_FOUND);
    }
  }, []);

  return (
    <ContentLayout>
      <S.Container>
        <Gap defaultHeight={16} />
        <S.IconContainer>
          <CompassOutlined />
        </S.IconContainer>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <Gap defaultHeight={16} />
        <FormattedMessage {...messages.description} />
        <Gap defaultHeight={32} />
        <Button onClick={() => navigate(Routes.HOME, { replace: true })}>
          <FormattedMessage {...messages.backToHomePage} />
        </Button>
        <Gap defaultHeight={32} />
      </S.Container>
    </ContentLayout>
  );
};
