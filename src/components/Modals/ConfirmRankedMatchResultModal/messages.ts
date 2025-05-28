import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.ConfirmRankedMatchResultModal.title',
    defaultMessage: 'Potvrzení výsledku',
  },
  description: {
    id: 'app.components.Modals.ConfirmRankedMatchResultModal.description',
    defaultMessage: 'Opravdu chcete potvrdit výsledek zápasu? Tento krok je nevratný.',
  },
  cancel: {
    id: 'app.components.Modals.ConfirmRankedMatchResultModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.ConfirmRankedMatchResultModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  confirmSuccess: {
    id: 'app.components.Modals.ConfirmRankedMatchResultModal.confirmSuccess',
    defaultMessage: 'Potvrzení zápasu bylo úspěšné',
  },
  confirmFailed: {
    id: 'app.components.Modals.ConfirmRankedMatchResultModal.confirmFailed',
    defaultMessage: 'Potvrzení zápasu se nezdařilo',
  },
});
