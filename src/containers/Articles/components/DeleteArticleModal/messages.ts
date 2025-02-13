import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Articles.components.DeleteArticleModal.title',
    defaultMessage: 'Smazání článku',
  },
  description: {
    id: 'app.containers.Articles.components.DeleteArticleModal.description',
    defaultMessage: 'Opravdu chcete smazat článek: <b>{value}</b>?',
  },
  cancel: {
    id: 'app.containers.Articles.components.DeleteArticleModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.containers.Articles.components.DeleteArticleModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  deleteSuccess: {
    id: 'app.containers.Articles.components.DeleteArticleModal.deleteSuccess',
    defaultMessage: 'Smazání článku bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.Articles.components.DeleteArticleModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
