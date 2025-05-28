export enum RankedEndpoints {
  CREATE_MATCH = '/seasons/{seasonId}/face-it/create-match',
  MAP_PICK = '/matches/{matchId}/face-it/pick-map/{mapId}',
  MAP_VOTE_STATE = '/matches/{matchId}/face-it/map-results',
  LEAVE_MATCH = '/matches/{matchId}/face-it/leave-match',
  ADMIN_CLOSE_MATCH = '/matches/{matchId}/face-it/close-match',
  CAN_CREATE_NEW_MATCH = '/seasons/{seasonId}/face-it/can-create-new-match',
}
