export enum Routes {
  // GENERAL ROUTES
  HOME = '/',
  LOGIN = '/prihlaseni',
  STATISTICS = '/statistiky',
  REGISTRATION = '/registrace',
  ABOUT_US = '/o-nas',
  HALLOFFAME = '/sin-slavy',
  FORGOTTEN_PASSWORD = '/obnoveni-hesla',
  PUBLIC_CHANGE_PASSWORD = '/zapomenute-heslo/:token',
  // USER ROUTES
  MCRVC = '/mcrvc',
  USER_PROFILE = '/uzivatel/:id',
  PRIVATE_CHANGE_PASSWORD = '/zmena-hesla',
  EDIT_PROFILE = '/uprava-uzivatele/:id',
  // TEAM ROUTES
  TEAM_DETAIL = '/tym/:id',
  // LEAGUE
  LEAGUE = '/liga',
  SEASON_DETAIL = '/detail-sezony/:leagueId/:seasonId',
  MATCH_CREATE = '/vytvoreni-zapasu/:id',
  MATCH_DETAIL = '/detail-zapasu/:id',
}
