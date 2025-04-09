import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.RemovePlayerFromMatchModal.title',
    defaultMessage: 'Smazání hráče ze zápasu',
  },
  description: {
    id: 'app.components.Modals.RemovePlayerFromMatchModal.description',
    defaultMessage: 'Opravdu chcete smazat hráče s id: <b>{value}</b>?',
  },
  cancel: {
    id: 'app.components.Modals.RemovePlayerFromMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.RemovePlayerFromMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.components.Modals.RemovePlayerFromMatchModal.deleteSuccess',
    defaultMessage: 'Smazání hráče bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.components.Modals.RemovePlayerFromMatchModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
