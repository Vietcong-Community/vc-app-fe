import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.MatchStatusModal.title',
    defaultMessage: 'Editovat stav zápasu',
  },
  submit: {
    id: 'app.components.Modals.MatchStatusModal.submit',
    defaultMessage: 'Uložit',
  },
  cancel: {
    id: 'app.components.Modals.MatchStatusModal.cancel',
    defaultMessage: 'Zrušit',
  },
  status: {
    id: 'app.components.Modals.MatchStatusModal.status',
    defaultMessage: 'Status',
  },
  updateSuccess: {
    id: 'app.components.Modals.MatchStatusModal.updateSuccess',
    defaultMessage: 'Status byl upraven!',
  },
  updateFailed: {
    id: 'app.components.Modals.MatchStatusModal.updateFailed',
    defaultMessage: 'Úprava se nezdařila',
  },
});
