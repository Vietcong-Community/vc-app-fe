import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.Comments.title',
    defaultMessage: 'Komentáře k zápasu',
  },
  addButton: {
    id: 'app.containers.League.MatchDetail.components.Comments.addButton',
    defaultMessage: 'Přidat',
  },
  commentedAt: {
    id: 'app.containers.League.MatchDetail.components.Comments.commentedAt',
    defaultMessage: '{date}',
  },
  commentedBy: {
    id: 'app.containers.League.MatchDetail.components.Comments.commentedBy',
    defaultMessage: '{nickname}',
  },
});
