import { RouteObject } from 'react-router-dom';
import { ProfileCont } from 'src/containers/Users/Profile/Profile.cont';

import { PageLayout } from '../components/PageLayout/PageLayout';
import { AboutUsCont } from '../containers/AboutUs/AboutUs.cont';
import { CreateMapCont } from '../containers/Admin/CreateMap/CreateMap.cont';
import { CreateMatchCont as AdminCreateMatchCont } from '../containers/Admin/CreateMatch/CreateMatch.cont';
import { ArticleDetailCont } from '../containers/Articles/ArticleDetail/ArticleDetail.cont';
import { CreateArticleCont } from '../containers/Articles/CreateArticle/CreateArticle.cont';
import { ArticlesOverview } from '../containers/Articles/Overview/Articles.cont';
import { UpdateArticleCont } from '../containers/Articles/UpdateArticle/UpdateArticle.cont';
import { ConfirmChampionshipMatchResultCont } from '../containers/Championship/ConfirmMatchResult/ConfirmMatchResult.cont';
import { ChampionshipDetailCont } from '../containers/Championship/Detail/Detail.cont';
import { MapPickCont } from '../containers/Championship/MapPick/MapPick.cont';
import { ChampionshipMatchDetailCont } from '../containers/Championship/MatchDetail/MatchDetail.cont';
import { ChampionshipOverview } from '../containers/Championship/Overview/Overview.cont';
import { SetChampionshipMatchScoreCont } from '../containers/Championship/SetMatchResult/SetMatchResult.cont';
import { DonateCont } from '../containers/Donate/Donate.cont';
import { HallOfFameCont } from '../containers/HallOfFame/HallOfFame.cont';
import { HomeCont } from '../containers/Home/Home.cont';
import { HowToPlayCont } from '../containers/HowToPlay/HowToPlay.cont';
import { AcceptMatchChallengeCont } from '../containers/League/AcceptMatchChallenge/AcceptMatchChallenge.cont';
import { ConfirmMatchResultCont } from '../containers/League/ConfirmMatchResult/ConfirmMatchResult.cont';
import { CreateMatchCont } from '../containers/League/CreateMatch/CreateMatch.cont';
import { MatchDetail } from '../containers/League/MatchDetail/MatchDetail.cont';
import { OverviewCont } from '../containers/League/Overview/Overview.cont';
import { SeasonDetailCont } from '../containers/League/SeasonDetail/SeasonDetail.cont';
import { SetMatchScoreCont } from '../containers/League/SetMatchResult/SetMatchResult.cont';
import { NotFoundPage } from '../containers/NotFoundPage/NotFoundPage';
import { PrivatePasswordChangeCont } from '../containers/PrivateChangePassword/PrivateChangePassword';
import { StatisticsCont } from '../containers/Statistics/Statistics.cont';
import { TeamDetailCont } from '../containers/Teams/TeamDetail/TeamDetail';
import { ChangePasswordCont } from '../containers/Users/ChangePassword/ChangePassword.cont';
import { EditProfileCont } from '../containers/Users/EditProfile/EditProfile.cont';
import { ForgottenPasswordCont } from '../containers/Users/ForgottenPassword/ForgottenPassword.cont';
import { LoginCont } from '../containers/Users/Login/Login.cont';
import { MyTeams } from '../containers/Users/MyTeams/MyTeams';
import { RegistrationCont } from '../containers/Users/Registration/Registration.cont';

import { Routes } from './enums';

export const routesObject: RouteObject[] = [
  {
    element: <PageLayout />,
    children: [
      // USER ROUTES
      { element: <ProfileCont />, path: Routes.USER_PROFILE },
      { element: <EditProfileCont />, path: Routes.EDIT_PROFILE },
      { element: <PrivatePasswordChangeCont />, path: Routes.PRIVATE_CHANGE_PASSWORD },
      { element: <MyTeams />, path: Routes.MY_TEAMS },
      // TEAM ROUTES
      { element: <TeamDetailCont />, path: Routes.TEAM_DETAIL },
      // LEAGUE
      { element: <OverviewCont />, path: Routes.LEAGUE },
      { element: <SeasonDetailCont />, path: Routes.SEASON_DETAIL },
      // CHAMPIONSHIP
      { element: <ChampionshipOverview />, path: Routes.CHAMPIONSHIP },
      { element: <ChampionshipDetailCont />, path: Routes.CHAMPIONSHIP_DETAIL },
      { element: <ChampionshipMatchDetailCont />, path: Routes.CHAMPIONSHIP_MATCH_DETAIL },
      { element: <SetChampionshipMatchScoreCont />, path: Routes.SET_CHAMPIONSHIP_MATCH_DETAIL },
      { element: <ConfirmChampionshipMatchResultCont />, path: Routes.CONFIRM_CHAMPIONSHIP_MATCH_DETAIL },
      { element: <MapPickCont />, path: Routes.TOURNAMENT_MAP_PICK },
      // MATCHES
      { element: <MatchDetail />, path: Routes.MATCH_DETAIL },
      { element: <CreateMatchCont />, path: Routes.MATCH_CREATE },
      { element: <AcceptMatchChallengeCont />, path: Routes.MATCH_CHALLENGE },
      { element: <ConfirmMatchResultCont />, path: Routes.CONFIRM_MATCH_SCORE },
      { element: <SetMatchScoreCont />, path: Routes.SET_MATCH_SCORE },

      // ADMIN ROUTES
      { element: <AdminCreateMatchCont />, path: Routes.ADMIN_CREATE_MATCH },
      { element: <CreateMapCont />, path: Routes.ADMIN_CREATE_MAP },

      // ARTICLES
      { element: <ArticlesOverview />, path: Routes.ARTICLES },
      { element: <CreateArticleCont />, path: Routes.NEW_ARTICLE },
      { element: <UpdateArticleCont />, path: Routes.UPDATE_ARTICLE },
      { element: <ArticleDetailCont />, path: Routes.ARTICLE_DETAIL },

      // GENERAL ROUTES
      { element: <HomeCont />, path: Routes.HOME },
      { element: <LoginCont />, path: Routes.LOGIN },
      { element: <RegistrationCont />, path: Routes.REGISTRATION },
      { element: <ForgottenPasswordCont />, path: Routes.FORGOTTEN_PASSWORD },
      { element: <ChangePasswordCont />, path: Routes.PUBLIC_CHANGE_PASSWORD },
      { element: <StatisticsCont />, path: Routes.STATISTICS },
      { element: <AboutUsCont />, path: Routes.ABOUT_US },
      { element: <HallOfFameCont />, path: Routes.HALLOFFAME },
      { element: <HowToPlayCont />, path: Routes.HOW_TO_PLAY },
      { element: <DonateCont />, path: Routes.DONATE_PAGE },

      { element: <NotFoundPage />, path: Routes.NOT_FOUND },
      { element: <NotFoundPage />, path: '*' },
    ],
  },
];
