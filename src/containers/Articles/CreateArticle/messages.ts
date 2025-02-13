import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Articles.CreateArticle.title',
    defaultMessage: 'Nový článek',
  },
  articles: {
    id: 'app.containers.Articles.CreateArticle.articles',
    defaultMessage: 'Články',
  },
  insufficientPrivileges: {
    id: 'app.containers.Articles.CreateArticle.insufficientPrivileges',
    defaultMessage: 'Pro zobrazení stránky nemáte dostatečná oprávnění.',
  },
  createSuccess: {
    id: 'app.containers.Articles.CreateArticle.createSuccess',
    defaultMessage: 'Článek byl vytvořen',
  },
  createFailed: {
    id: 'app.containers.Articles.CreateArticle.createFailed',
    defaultMessage: 'Při vytváření článku došlo k chybě',
  },
});
