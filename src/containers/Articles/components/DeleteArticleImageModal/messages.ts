import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Articles.components.DeleteArticleImageModal.title',
    defaultMessage: 'Smazání obrázku',
  },
  description: {
    id: 'app.containers.Articles.components.DeleteArticleImageModal.description',
    defaultMessage: 'Opravdu chcete smazat obrázek s id: <b>{value}</b>?',
  },
  deleteSuccess: {
    id: 'app.containers.Articles.components.DeleteArticleImageModal.deleteSuccess',
    defaultMessage: 'Smazání obrázku bylo úspěšné',
  },
  deleteFailed: {
    id: 'app.containers.Articles.components.DeleteArticleImageModal.deleteFailed',
    defaultMessage: 'Smazání se nezdařilo',
  },
});
