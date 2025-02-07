import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.DeleteMatchModal.title',
    defaultMessage: 'Smazání zápasu',
  },
  description: {
    id: 'app.containers.League.MatchDetail.components.DeleteMatchModal.description',
    defaultMessage: 'Opravdu chcete smazat zápas?',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.DeleteMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.League.MatchDetail.components.DeleteMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.containers.League.MatchDetail.components.DeleteMatchModal.deleteSuccess',
    defaultMessage: 'Smazání zápasu bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.League.MatchDetail.components.DeleteMatchModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
