export enum TeamEndpoints {
  TEAM_BY_ID = '/teams/{id}',
  TEAM_PLAYERS = '/teams/{id}/users',
  REQUEST_TO_JOIN_TEAM = '/teams/{teamId}/join',
  APPROVE_JOIN_REQUEST = '/teams/{teamId}/user/{userId}/approve',
  REJECT_JOIN_REQUEST = '/teams/{teamId}/user/{userId}/reject',
  ME_TEAMS = '/me/teams',
}
