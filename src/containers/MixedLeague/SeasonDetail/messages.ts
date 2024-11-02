import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  update: {
    id: 'app.containers.MixedLeague.SeasonDetail.update',
    defaultMessage: 'Upravit',
  },
  activate: {
    id: 'app.containers.MixedLeague.SeasonDetail.activate',
    defaultMessage: 'Zahájit',
  },
  activateSuccess: {
    id: 'app.containers.MixedLeague.SeasonDetail.activateSuccess',
    defaultMessage: 'Sezóna byla zahájena',
  },
  activateFailed: {
    id: 'app.containers.MixedLeague.SeasonDetail.activateFailed',
    defaultMessage: 'Sezónu se nepovedlo zahájit',
  },
  seasonIsNotInTheStatusActive: {
    id: 'app.containers.MixedLeague.SeasonDetail.seasonIsNotInTheStatusActive',
    defaultMessage: 'Sezóna musí být ve stavu Aktivní.',
  },
  seasonIsNotInTheStatusNew: {
    id: 'app.containers.MixedLeague.SeasonDetail.seasonIsNotInTheStatusNew',
    defaultMessage: 'Sezóna musí být ve stavu Nová.',
  },
  archive: {
    id: 'app.containers.MixedLeague.SeasonDetail.archive',
    defaultMessage: 'Ukončit',
  },
  archiveSuccess: {
    id: 'app.containers.MixedLeague.SeasonDetail.archiveSuccess',
    defaultMessage: 'Sezóna byla úspěšně ukončena',
  },
  archiveFailed: {
    id: 'app.containers.MixedLeague.SeasonDetail.archiveFailed',
    defaultMessage: 'Sezónu se nepovedlo ukončit',
  },
  archiveFailedDescription: {
    id: 'app.containers.MixedLeague.SeasonDetail.archiveFailedDescription',
    defaultMessage: 'Je možné, že v sezóně stále existují probíhající zápasy. Nejprve musí být všechny ukončeny.',
  },
  delete: {
    id: 'app.containers.MixedLeague.SeasonDetail.delete',
    defaultMessage: 'Smazat',
  },
  deleteSuccess: {
    id: 'app.containers.MixedLeague.SeasonDetail.deleteSuccess',
    defaultMessage: 'Smazání bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.MixedLeague.SeasonDetail.deleteFailed',
    defaultMessage: 'Sezónu se nepovedlo smazat',
  },
});
