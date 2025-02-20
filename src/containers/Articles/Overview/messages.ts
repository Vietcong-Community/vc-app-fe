import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Articles.title',
    defaultMessage: 'Články',
  },
  filter: {
    id: 'app.containers.Articles.filter',
    defaultMessage: 'Filtrovat',
  },
  allCategories: {
    id: 'app.containers.Articles.allCategories',
    defaultMessage: 'Vše',
  },
  newArticle: {
    id: 'app.containers.Articles.newArticle',
    defaultMessage: 'Nový článek',
  },
  published: {
    id: 'app.containers.Articles.published',
    defaultMessage: 'Publikované',
  },
  noArticles: {
    id: 'app.containers.Articles.noArticles',
    defaultMessage:
      'Nic tu není šohaji.. buď Bambi není schopná vytvořit kvalitní článek (asi peče chleba..) ' +
      'nebo jsi filtroval tak divoce, až se z toho všechny články ztratily.',
  },
});
