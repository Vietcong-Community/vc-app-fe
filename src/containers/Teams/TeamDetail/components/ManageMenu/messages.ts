import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  menuLabel: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.menuLabel',
    defaultMessage: 'Správa',
  },
  update: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.update',
    defaultMessage: 'Upravit',
  },
  archive: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.archive',
    defaultMessage: 'Archivovat',
  },
  archiveSuccess: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.archiveSuccess',
    defaultMessage: 'Tým byl úspěšně archivován',
  },
  archiveFailed: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.archiveFailed',
    defaultMessage: 'Tým se nepovedlo archivovat',
  },
  archiveFailedDescription: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.archiveFailedDescription',
    defaultMessage:
      'Je možné, že tým má stále probíhající zápasy nebo je součástí probíhající sezóny.' +
      ' Nejprve musí být všechny ukončeny.',
  },
  delete: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.delete',
    defaultMessage: 'Smazat',
  },
  deleteSuccess: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.deleteSuccess',
    defaultMessage: 'Smazání bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.Teams.TeamDetail.components.ManageMenu.deleteFailed',
    defaultMessage: 'Tým se nepovedlo smazat',
  },
});
