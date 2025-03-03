import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  activePlayersTitle: {
    id: 'app.containers.Teams.TeamDetail.components.Players.activePlayersTitle',
    defaultMessage: 'Aktivní členové',
  },
  awaitingPlayersTitle: {
    id: 'app.containers.Teams.TeamDetail.components.Players.awaitingPlayersTitle',
    defaultMessage: 'Čekající na schválení',
  },
  removedPlayersTitle: {
    id: 'app.containers.Teams.TeamDetail.components.Players.removedPlayersTitle',
    defaultMessage: 'Bývalí členové týmu',
  },
  changeRole: {
    id: 'app.containers.Teams.TeamDetail.components.Players.changeRole',
    defaultMessage: 'Změnit roli hráče',
  },
  approveJoinRequest: {
    id: 'app.containers.Teams.TeamDetail.components.Players.approveJoinRequest',
    defaultMessage: 'Schválit hráče',
  },
  rejectJoinRequest: {
    id: 'app.containers.Teams.TeamDetail.components.Players.rejectJoinRequest',
    defaultMessage: 'Zamítnout hráče',
  },
  deletePlayer: {
    id: 'app.containers.Teams.TeamDetail.components.Players.deletePlayer',
    defaultMessage: 'Smazat hráče',
  },
  leaveTeamSuccess: {
    id: 'app.containers.Teams.TeamDetail.components.Players.leaveTeamSuccess',
    defaultMessage: 'Opuštění týmu proběhlo úspěšně',
  },
  leaveTeamFailed: {
    id: 'app.containers.Teams.TeamDetail.components.Players.leaveTeamFailed',
    defaultMessage: 'Opuštění se nezdařilo, kontaktujte prosím adminy.',
  },
});
