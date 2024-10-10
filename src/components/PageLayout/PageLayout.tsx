import React from 'react';

import { Outlet } from 'react-router-dom';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import * as S from './PageLayout.style';

export const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <S.PageContainer>
        <Outlet />
      </S.PageContainer>
      <Footer />
    </>
  );
};
