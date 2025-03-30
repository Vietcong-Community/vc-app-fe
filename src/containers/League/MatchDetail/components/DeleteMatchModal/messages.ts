import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.RemoveMatchModal.title',
    defaultMessage: 'Smazání zápasu',
  },
  description: {
    id: 'app.containers.League.MatchDetail.components.RemoveMatchModal.description',
    defaultMessage: 'Opravdu chcete smazat zápas?',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.RemoveMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.League.MatchDetail.components.RemoveMatchModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.containers.League.MatchDetail.components.RemoveMatchModal.deleteSuccess',
    defaultMessage: 'Smazání zápasu bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.League.MatchDetail.components.RemoveMatchModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
