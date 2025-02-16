import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.SortRoundsModal.title',
    defaultMessage: 'Seřadit kola',
  },
  submit: {
    id: 'app.containers.League.MatchDetail.components.SortRoundsModal.submit',
    defaultMessage: 'Uložit',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.SortRoundsModal.cancel',
    defaultMessage: 'Zrušit',
  },
  sortSuccess: {
    id: 'app.containers.League.MatchDetail.components.SortRoundsModal.sortSuccess',
    defaultMessage: 'Povedlo se, kola seřazena.',
  },
  sortFailed: {
    id: 'app.containers.League.MatchDetail.components.SortRoundsModal.sortFailed',
    defaultMessage: 'Už neumíme ani přeházet pořadí čtyř kol.',
  },
});
