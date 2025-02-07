import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.RemoveRoundModal.title',
    defaultMessage: 'Smazání kola',
  },
  description: {
    id: 'app.containers.League.MatchDetail.components.RemoveRoundModal.description',
    defaultMessage: 'Opravdu chcete smazat kolo s id: <b>{value}</b>?',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.RemoveRoundModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.League.MatchDetail.components.RemoveRoundModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.containers.League.MatchDetail.components.RemoveRoundModal.deleteSuccess',
    defaultMessage: 'Smazání kola bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.League.MatchDetail.components.RemoveRoundModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
