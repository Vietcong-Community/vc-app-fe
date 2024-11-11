import { RouteObject } from 'react-router-dom';
import { ProfileCont } from 'src/containers/Profile/Profile.cont';

import { PageLayout } from '../components/PageLayout/PageLayout';
import { HomeCont } from '../containers/Home/Home.cont';
import { LoginCont } from '../containers/Login/Login.cont';
import { OverviewCont } from '../containers/MixedLeague/Overview/Overview.cont';
import { SeasonDetailCont } from '../containers/MixedLeague/SeasonDetail/SeasonDetail.cont';
import { CreateSeasonCont } from '../containers/MixedLeague/SeasonForm/CreateSeason.cont';
import { UpdateSeasonCont } from '../containers/MixedLeague/SeasonForm/UpdateSeason.form';
import { RegistrationCont } from '../containers/Registration/Registration.cont';

import { Routes } from './enums';

export const routesObject: RouteObject[] = [
  {
    element: <PageLayout />,
    children: [
      { element: <HomeCont />, path: Routes.HOME },
      { element: <LoginCont />, path: Routes.LOGIN },
      { element: <RegistrationCont />, path: Routes.REGISTRATION },
      { element: <ProfileCont />, path: Routes.USER },
      { element: <OverviewCont />, path: Routes.MIX_LEAGUE_OVERVIEW },
      { element: <SeasonDetailCont />, path: Routes.SEASON_DETAIL },
      { element: <CreateSeasonCont />, path: Routes.SEASON_CREATE },
      { element: <UpdateSeasonCont />, path: Routes.SEASON_UPDATE },
      // TODO NOT FOUND PAGE
    ],
  },
];
