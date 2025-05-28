import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.LockRankedMatchModal.title',
    defaultMessage: 'Uzamčení zápasu',
  },
  description: {
    id: 'app.components.Modals.LockRankedMatchModal.description',
    defaultMessage: 'Opravdu chcete uzamknout zápas? Hráči budou rozřazeni do týmu a určí se mapy pro zápas.',
  },
  cancel: {
    id: 'app.components.Modals.LockRankedMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.LockRankedMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  confirmSuccess: {
    id: 'app.components.Modals.LockRankedMatchModal.confirmSuccess',
    defaultMessage: 'Uzamčení zápasu bylo úspěšné',
  },
  confirmFailed: {
    id: 'app.components.Modals.LockRankedMatchModal.confirmFailed',
    defaultMessage: 'Uzamčení zápasu se nezdařilo',
  },
});
