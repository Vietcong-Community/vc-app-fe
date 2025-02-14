import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Articles.ArticleDetail.title',
    defaultMessage: 'Článek',
  },
  articles: {
    id: 'app.containers.Articles.ArticleDetail.articles',
    defaultMessage: 'Články',
  },
  updateArticle: {
    id: 'app.containers.Articles.ArticleDetail.updateArticle',
    defaultMessage: 'Upravit',
  },
  publishedArticle: {
    id: 'app.containers.Articles.ArticleDetail.publishedArticle',
    defaultMessage: 'Publikovat',
  },
  hideArticle: {
    id: 'app.containers.Articles.ArticleDetail.hideArticle',
    defaultMessage: 'Skrýt',
  },
  deleteArticle: {
    id: 'app.containers.Articles.ArticleDetail.deleteArticle',
    defaultMessage: 'Smazat',
  },
  publishSuccessful: {
    id: 'app.containers.Articles.ArticleDetail.publishSuccessful',
    defaultMessage: 'Publikování bylo úspěšné, ať to všichni vidí!',
  },
  publishFailed: {
    id: 'app.containers.Articles.ArticleDetail.publishFailed',
    defaultMessage: 'Publikování se nezdařilo, radši si zkontroluj překlepy.',
  },
  hideArticleSuccess: {
    id: 'app.containers.Articles.ArticleDetail.hideArticleSuccess',
    defaultMessage: 'Článek byl úspěšně skryt před zvědavci',
  },
  hideArticleFailed: {
    id: 'app.containers.Articles.ArticleDetail.hideArticleFailed',
    defaultMessage: 'Článek se nepodařilo skrýt! Hlavně nepanikař!',
  },
});
