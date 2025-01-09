export enum Routes {
  // GENERAL ROUTES
  HOME = '/',
  LOGIN = '/prihlaseni',
  STATISTICS = '/statistiky',
  REGISTRATION = '/registrace',
  REGISTRATION_SUCCESS = '/uspesna-registrace',
  ABOUT_US = '/o-nas',
  HALLOFFAME = '/sin-slavy',
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
  LEAGUES_OVERVIEW = '/liga',
  // DEPRECATED
  SEASON_DETAIL = '/detail-sezona/:id',
  SEASON_CREATE = '/vytvoreni-sezony',
  SEASON_UPDATE = '/uprava-sezony/:id',
  MIXED_MATCH_CREATE = '/vytvoreni-mix-zapasu/:id',
  MIXED_MATCH_DETAIL = '/detail-mix-zapasu/:id',
  MIXED_MATCH_UPDATE = '/uprava-mix-zapasu/:id',
  MIXED_MATCH_RESULT = '/zadat-vysledek-mix-zapasu/:id',
}
