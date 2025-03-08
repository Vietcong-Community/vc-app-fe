import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerModal.title',
    defaultMessage: 'Smazání zápasu',
  },
  description: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerModal.description',
    defaultMessage: 'Opravdu chcete smazat zápas?',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerModal.deleteSuccess',
    defaultMessage: 'Smazání zápasu bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.League.MatchDetail.components.RemovePlayerModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
