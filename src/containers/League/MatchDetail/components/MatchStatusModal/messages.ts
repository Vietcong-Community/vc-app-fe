import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.MatchStatusModal.title',
    defaultMessage: 'Editovat stav zápasu',
  },
  submit: {
    id: 'app.containers.League.MatchDetail.components.MatchStatusModal.submit',
    defaultMessage: 'Uložit',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.MatchStatusModal.cancel',
    defaultMessage: 'Zrušit',
  },
  status: {
    id: 'app.containers.League.MatchDetail.components.MatchStatusModal.status',
    defaultMessage: 'Status',
  },
  updateSuccess: {
    id: 'app.containers.League.MatchDetail.components.MatchStatusModal.updateSuccess',
    defaultMessage: 'Status byl upraven!',
  },
  updateFailed: {
    id: 'app.containers.League.MatchDetail.components.MatchStatusModal.updateFailed',
    defaultMessage: 'Úprava se nezdařila',
  },
});
