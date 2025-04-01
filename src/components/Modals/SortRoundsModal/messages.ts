import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.SortRoundsModal.title',
    defaultMessage: 'Seřadit kola',
  },
  submit: {
    id: 'app.components.Modals.SortRoundsModal.submit',
    defaultMessage: 'Uložit',
  },
  cancel: {
    id: 'app.components.Modals.SortRoundsModal.cancel',
    defaultMessage: 'Zrušit',
  },
  sortSuccess: {
    id: 'app.components.Modals.SortRoundsModal.sortSuccess',
    defaultMessage: 'Povedlo se, kola seřazena.',
  },
  sortFailed: {
    id: 'app.components.Modals.SortRoundsModal.sortFailed',
    defaultMessage: 'Už neumíme ani přeházet pořadí čtyř kol.',
  },
});
