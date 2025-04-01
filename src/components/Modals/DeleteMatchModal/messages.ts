import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.RemoveMatchModal.title',
    defaultMessage: 'Smazání zápasu',
  },
  description: {
    id: 'app.components.Modals.RemoveMatchModal.description',
    defaultMessage: 'Opravdu chcete smazat zápas?',
  },
  cancel: {
    id: 'app.components.Modals.RemoveMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.RemoveMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.components.Modals.RemoveMatchModal.deleteSuccess',
    defaultMessage: 'Smazání zápasu bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.components.Modals.RemoveMatchModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
