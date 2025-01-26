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
  approveJoinRequest: {
    id: 'app.containers.Teams.TeamDetail.components.Players.approveJoinRequest',
    defaultMessage: 'Schválit',
  },
  rejectJoinRequest: {
    id: 'app.containers.Teams.TeamDetail.components.Players.rejectJoinRequest',
    defaultMessage: 'Zamítnout',
  },
});
