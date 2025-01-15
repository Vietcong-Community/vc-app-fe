export enum Routes {
  // GENERAL ROUTES
  HOME = '/',
  LOGIN = '/prihlaseni',
  STATISTICS = '/statistiky',
  REGISTRATION = '/registrace',
  ABOUT_US = '/o-nas',
  HALLOFFAME = '/sin-slavy',
  FORGOTTEN_PASSWORD = '/zapomenute-heslo',
  PUBLIC_CHANGE_PASSWORD = '/zmena-hesla/:token',
  // USER ROUTES
  MCRVC = '/mcrvc',
  USER = '/uzivatel',
  PRIVATE_CHANGE_PASSWORD = '/zmena-hesla',
  EDIT_PROFILE = '/uprava-uzivatele/:id',
  // TEAM ROUTES
  TEAM_CREATE = '/vytvoreni-tymu',
  TEAM_UPDATE = '/uprava-tymu/:id',
  TEAM_DETAIL = '/tym/:id',
  // LEAGUE
  LEAGUE = '/liga',
  SEASON_DETAIL = '/detail-sezony/:id',
  MATCH_CREATE = '/vytvoreni-zapasu/:id',
  MATCH_DETAIL = '/detail-zapasu/:id',
}
