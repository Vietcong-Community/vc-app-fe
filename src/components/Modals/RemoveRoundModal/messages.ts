import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.RemoveRoundModal.title',
    defaultMessage: 'Smazání kola',
  },
  description: {
    id: 'app.components.Modals.RemoveRoundModal.description',
    defaultMessage: 'Opravdu chcete smazat kolo s id: <b>{value}</b>?',
  },
  cancel: {
    id: 'app.components.Modals.RemoveRoundModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.RemoveRoundModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.components.Modals.RemoveRoundModal.deleteSuccess',
    defaultMessage: 'Smazání kola bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.components.Modals.RemoveRoundModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
