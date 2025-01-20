import React from 'react';

import { Helmet } from 'react-helmet';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { routesObject } from './routes/routes';

import * as S from './app.style';

const router = createBrowserRouter(routesObject);

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Helmet titleTemplate="" defaultTitle="Vietcong">
        <meta name="description" content="Portál pro hraní a informace o počítačové hře Vietcong" />
      </Helmet>
      <S.AppContainer>
        <RouterProvider router={router} />
      </S.AppContainer>
    </ErrorBoundary>
  );
};
