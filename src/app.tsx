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
      <Helmet titleTemplate="" defaultTitle="Vietcong HUB">
        <meta name="description" content="Portál pro hraní a informace o počítačové hře Vietcong | Vietcong HUB" />
        <meta name="keywords" content="vietcong veitconghub fps games multiplayer strilecka ceske hry pterodon ctf" />
        <meta name="og:title" content="Vietcong HUB" />
        <meta name="og:description" content="Portál pro hraní a informace o počítačové hře Vietcong | Vietcong HUB" />
      </Helmet>
      <S.AppContainer>
        <RouterProvider router={router} />
      </S.AppContainer>
    </ErrorBoundary>
  );
};
