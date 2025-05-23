import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.LeaveRankedMatchModal.title',
    defaultMessage: 'Opuštění zápasu',
  },
  description: {
    id: 'app.components.Modals.LeaveRankedMatchModal.description',
    defaultMessage: 'Hráč <b>{value}</b> opustí zápas, chcete pokračovat?',
  },
  cancel: {
    id: 'app.components.Modals.LeaveRankedMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.LeaveRankedMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.components.Modals.LeaveRankedMatchModal.deleteSuccess',
    defaultMessage: 'Hráč opustil zápas',
  },
  deleteFailed: {
    id: 'app.components.Modals.LeaveRankedMatchModal.deleteFailed',
    defaultMessage: 'Něco se nepovedlo, kontaktujte pana hhackera.',
  },
});
