import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerFromMatchModal.title',
    defaultMessage: 'Smazání hráče ze zápasu',
  },
  description: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerFromMatchModal.description',
    defaultMessage: 'Opravdu chcete smazat hráče s id: <b>{value}</b>?',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerFromMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerFromMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerFromMatchModal.deleteSuccess',
    defaultMessage: 'Smazání hráče bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerFromMatchModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
