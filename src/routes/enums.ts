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
  NOT_FOUND = '/stranka-nenalezena',
  // USER ROUTES
  MCRVC = '/mcrvc',
  USER_PROFILE = '/uzivatel/:id',
  PRIVATE_CHANGE_PASSWORD = '/zmena-hesla',
  EDIT_PROFILE = '/uprava-uzivatele/:id',
  // TEAM ROUTES
  TEAM_DETAIL = '/tym/:id',
  // LEAGUE
  LEAGUE = '/liga',
  SEASON_DETAIL = '/detail-sezony/:seasonId',
  MATCH_CREATE = '/vytvoreni-zapasu/:seasonId',
  MATCH_CHALLENGE = '/vyzva-k-zapasu/:matchId',
  SET_MATCH_SCORE = '/zadani-vysledku-zapasu/:matchId',
  CONFIRM_MATCH_SCORE = '/potvrzeni-vysledku-zapasu/:matchId',
  MATCH_DETAIL = '/detail-zapasu/:matchId',
}
