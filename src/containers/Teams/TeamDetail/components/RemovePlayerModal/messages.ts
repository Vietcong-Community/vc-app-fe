import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Teams.TeamDetail.components.RemovePlayerModal.title',
    defaultMessage: 'Odebrání z týmu',
  },
  description: {
    id: 'app.containers.Teams.TeamDetail.components.RemovePlayerModal.description',
    defaultMessage: 'Hráč {nickname} bude odebrán z týmu.',
  },
  cancel: {
    id: 'app.containers.Teams.TeamDetail.components.RemovePlayerModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.Teams.TeamDetail.components.RemovePlayerModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  leaveTeamSuccess: {
    id: 'app.containers.Teams.TeamDetail.components.RemovePlayerModal.leaveTeamSuccess',
    defaultMessage: 'Opuštění týmu proběhlo úspěšně',
  },
  leaveTeamFailed: {
    id: 'app.containers.Teams.TeamDetail.components.RemovePlayerModal.leaveTeamFailed',
    defaultMessage: 'Opuštění se nezdařilo, kontaktujte prosím adminy.',
  },
});
