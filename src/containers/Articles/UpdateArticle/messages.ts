import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Articles.UpdateArticle.title',
    defaultMessage: 'Úprava článku',
  },
  articles: {
    id: 'app.containers.Articles.UpdateArticle.articles',
    defaultMessage: 'Články',
  },
  insufficientPrivileges: {
    id: 'app.containers.Articles.UpdateArticle.insufficientPrivileges',
    defaultMessage: 'Pro zobrazení stránky nemáte dostatečná oprávnění.',
  },
  updateSuccess: {
    id: 'app.containers.Articles.UpdateArticle.updateSuccess',
    defaultMessage: 'Článek byl upraven',
  },
  updateFailed: {
    id: 'app.containers.Articles.UpdateArticle.updateFailed',
    defaultMessage: 'Při úpravě článku došlo k chybě',
  },
});
