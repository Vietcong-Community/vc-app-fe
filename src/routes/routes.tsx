import { RouteObject } from 'react-router-dom';
import { ProfileCont } from 'src/containers/Profile/Profile.cont';

import { PageLayout } from '../components/PageLayout/PageLayout';
import { ContactCont } from '../containers/Contact/Contact.cont';
import { HallOfFameCont } from '../containers/HallOfFame/HallOfFame.cont';
import { HomeCont } from '../containers/Home/Home.cont';
import { LoginCont } from '../containers/Login/Login.cont';
import { LogoutCont } from '../containers/Logout/Logout.cont';
import { McrvcCont } from '../containers/Mcrvc/Mcrvc.cont';
import { MixedMatchDetail } from '../containers/MixedLeague/MixedMatchDetail/MixedMatchDetail.cont';
import { CreateMixedMatchCont } from '../containers/MixedLeague/MixedMatchForm/CreateMixedMatch.cont';
import { UpdateMixedMatchCont } from '../containers/MixedLeague/MixedMatchForm/UpdateMixedMatch.cont';
import { MixedMatchResult } from '../containers/MixedLeague/MixedMatchResult/MixedMatchResult';
import { OverviewCont } from '../containers/MixedLeague/Overview/Overview.cont';
import { SeasonDetailCont } from '../containers/MixedLeague/SeasonDetail/SeasonDetail.cont';
import { CreateSeasonCont } from '../containers/MixedLeague/SeasonForm/CreateSeason.cont';
import { UpdateSeasonCont } from '../containers/MixedLeague/SeasonForm/UpdateSeason.cont';
import { RegistrationCont } from '../containers/Registration/Registration.cont';
import { RegistrationSuccessCont } from '../containers/RegistrationSuccess/RegistrationSuccess.cont';

import { Routes } from './enums';

export const routesObject: RouteObject[] = [
  {
    element: <PageLayout />,
    children: [
      { element: <HomeCont />, path: Routes.HOME },
      { element: <LoginCont />, path: Routes.LOGIN },
      { element: <RegistrationCont />, path: Routes.REGISTRATION },
      { element: <ProfileCont />, path: Routes.USER },
      // MIX LEAGUE
      { element: <OverviewCont />, path: Routes.MIX_LEAGUE_OVERVIEW },
      { element: <SeasonDetailCont />, path: Routes.SEASON_DETAIL },
      { element: <CreateSeasonCont />, path: Routes.SEASON_CREATE },
      { element: <UpdateSeasonCont />, path: Routes.SEASON_UPDATE },
      // MIX MATCHES
      { element: <CreateMixedMatchCont />, path: Routes.MIXED_MATCH_CREATE },
      { element: <UpdateMixedMatchCont />, path: Routes.MIXED_MATCH_UPDATE },
      { element: <MixedMatchDetail />, path: Routes.MIXED_MATCH_DETAIL },
      { element: <MixedMatchResult />, path: Routes.MIXED_MATCH_RESULT },
      { element: <McrvcCont />, path: Routes.MCRVC },
      { element: <HallOfFameCont />, path: Routes.HALLOFFAME },
      { element: <ContactCont />, path: Routes.CONTACT },
      { element: <LogoutCont />, path: Routes.LOGOUT },
      { element: <RegistrationSuccessCont />, path: Routes.REGISTRATION_SUCCESS },
      // TODO NOT FOUND PAGE
    ],
  },
];
