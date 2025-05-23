export enum RankedEndpoints {
  CREATE_MATCH = '/seasons/{seasonId}/face-it/create-match',
  MAP_PICK = '/matches/{matchId}/face-it/pick-map/{mapId}',
  MAP_VOTE_STATE = '/matches/{matchId}/face-it/map-results',
  LEAVE_MATCH = '/matches/{matchId}/face-it/leave-match',
}
