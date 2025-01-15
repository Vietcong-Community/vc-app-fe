import { RouteObject } from 'react-router-dom';
import { ProfileCont } from 'src/containers/Profile/Profile.cont';

import { PageLayout } from '../components/PageLayout/PageLayout';
import { AboutUsCont } from '../containers/AboutUs/AboutUs.cont';
import { EditProfileCont } from '../containers/EditProfile/EditProfile.cont';
import { HallOfFameCont } from '../containers/HallOfFame/HallOfFame.cont';
import { HomeCont } from '../containers/Home/Home.cont';
import { MatchDetail } from '../containers/League/MatchDetail/MatchDetail.cont';
import { OverviewCont } from '../containers/League/Overview/Overview.cont';
import { SeasonDetailCont } from '../containers/League/SeasonDetail/SeasonDetail.cont';
import { LoginCont } from '../containers/Login/Login.cont';
import { McrvcCont } from '../containers/Mcrvc/Mcrvc.cont';
import { PrivatePasswordChangeCont } from '../containers/PrivateChangePassword/PrivateChangePassword';
import { StatisticsCont } from '../containers/Statistics/Statistics.cont';
import { TeamDetailCont } from '../containers/Teams/TeamDetail/TeamDetail';
import { CreateTeamCont } from '../containers/Teams/TeamForm/CreateTeam.cont';
import { UpdateTeamCont } from '../containers/Teams/TeamForm/UpdateTeam.cont';
import { RegistrationCont } from '../containers/Users/Registration/Registration.cont';

import { Routes } from './enums';

export const routesObject: RouteObject[] = [
  {
    element: <PageLayout />,
    children: [
      { element: <HomeCont />, path: Routes.HOME },
      { element: <LoginCont />, path: Routes.LOGIN },
      { element: <RegistrationCont />, path: Routes.REGISTRATION },
      // GENERAL ROUTES
      { element: <StatisticsCont />, path: Routes.STATISTICS },
      { element: <AboutUsCont />, path: Routes.ABOUT_US },
      // USER ROUTES
      { element: <ProfileCont />, path: Routes.USER },
      { element: <EditProfileCont />, path: Routes.EDIT_PROFILE },
      { element: <PrivatePasswordChangeCont />, path: Routes.PRIVATE_CHANGE_PASSWORD },
      // TEAM ROUTES
      { element: <CreateTeamCont />, path: Routes.TEAM_CREATE },
      { element: <UpdateTeamCont />, path: Routes.TEAM_UPDATE },
      { element: <TeamDetailCont />, path: Routes.TEAM_DETAIL },

      // MIX LEAGUE
      { element: <OverviewCont />, path: Routes.LEAGUE },
      { element: <SeasonDetailCont />, path: Routes.SEASON_DETAIL },
      // MIX MATCHES
      { element: <MatchDetail />, path: Routes.MATCH_DETAIL },
      { element: <McrvcCont />, path: Routes.MCRVC },
      { element: <HallOfFameCont />, path: Routes.HALLOFFAME },
      // TODO NOT FOUND PAGE
    ],
  },
];
