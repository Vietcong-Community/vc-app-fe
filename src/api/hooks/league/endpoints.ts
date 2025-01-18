export enum LeagueEndpoints {
  LEAGUES = '/leagues',
  LEAGUE_BY_ID = '/leagues/{id}',
  LEAGUE_SEASONS = '/leagues/{id}/seasons',
  SEASON_DETAIL = '/leagues/{leagueId}/seasons/{seasonId}',
  MAPS_IN_SEASON = '/leagues/{leagueId}/seasons/{seasonId}/maps',
  LADDER_LIST = '/leagues/{leagueId}/seasons/{seasonId}/ladder',
}
