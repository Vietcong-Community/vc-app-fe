import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useRouter } from '../../hooks/RouterHook';
import { Footer } from '../../Footer/Footer';
import { Header } from '../../Header/Header';

import * as S from './PageLayout.style';

export const PageLayout: React.FC = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <S.PageContainer>
        <S.ContentContainer>
          <Outlet />
        </S.ContentContainer>
      </S.PageContainer>
      <Footer />
    </>
  );
};
