import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useRouter } from '../../hooks/RouterHook';
import { Events, gaPushEvent } from '../../utils/googleAnalyticsUtils';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import * as S from './PageLayout.style';

export const PageLayout: React.FC = () => {
  const { location } = useRouter();

  useEffect(() => {
    gaPushEvent(Events.SCREEN_VIEW, { path: `${location.pathname}${location.search}` });
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ErrorBoundary>
      <Header />
      <S.PageContainer>
        <S.ContentContainer>
          <Outlet />
        </S.ContentContainer>
      </S.PageContainer>
      <Footer />
    </ErrorBoundary>
  );
};
