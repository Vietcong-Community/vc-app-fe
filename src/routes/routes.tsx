import { RouteObject } from 'react-router-dom';

import { PageLayout } from '../components/PageLayout/PageLayout';
import { HomeCont } from '../containers/Home/Home.cont';
import { LoginCont } from '../containers/Login/Login.cont';
import { RegistrationCont } from '../containers/Registration/Registration.cont';

import { Routes } from './enums';

export const routesObject: RouteObject[] = [
  {
    element: <PageLayout />,
    children: [
      { element: <HomeCont />, path: Routes.HOME },
      { element: <LoginCont />, path: Routes.LOGIN },
      { element: <RegistrationCont />, path: Routes.REGISTRATION },
      // TODO NOT FOUND PAGE
    ],
  },
];
