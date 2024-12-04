import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  menuLabel: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.menuLabel',
    defaultMessage: 'Správa',
  },
  update: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.update',
    defaultMessage: 'Upravit',
  },
  activate: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.activate',
    defaultMessage: 'Zahájit',
  },
  activateSuccess: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.activateSuccess',
    defaultMessage: 'Sezóna byla zahájena',
  },
  activateFailed: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.activateFailed',
    defaultMessage: 'Sezónu se nepovedlo zahájit',
  },
  seasonIsNotInTheStatusActive: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.seasonIsNotInTheStatusActive',
    defaultMessage: 'Sezóna musí být ve stavu Aktivní.',
  },
  seasonIsNotInTheStatusNew: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.seasonIsNotInTheStatusNew',
    defaultMessage: 'Sezóna musí být ve stavu Nová.',
  },
  archive: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.archive',
    defaultMessage: 'Ukončit',
  },
  archiveSuccess: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.archiveSuccess',
    defaultMessage: 'Sezóna byla úspěšně ukončena',
  },
  archiveFailed: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.archiveFailed',
    defaultMessage: 'Sezónu se nepovedlo ukončit',
  },
  archiveFailedDescription: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.archiveFailedDescription',
    defaultMessage: 'Je možné, že v sezóně stále existují probíhající zápasy. Nejprve musí být všechny ukončeny.',
  },
  delete: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.delete',
    defaultMessage: 'Smazat',
  },
  deleteSuccess: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.deleteSuccess',
    defaultMessage: 'Smazání bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.MixedLeague.SeasonDetail.components.ManageMenu.deleteFailed',
    defaultMessage: 'Sezónu se nepovedlo smazat',
  },
});
