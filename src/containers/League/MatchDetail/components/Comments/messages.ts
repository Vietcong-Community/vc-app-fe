import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.Comments.title',
    defaultMessage: 'Komentáře k zápasu',
  },
  noCommentYet: {
    id: 'app.containers.League.MatchDetail.components.Comments.noCommentYet',
    defaultMessage: 'Žádný hater zatím nesebral odvahu.. budeš první?',
  },
  saveCommentError: {
    id: 'app.containers.League.MatchDetail.components.Comments.saveCommentError',
    defaultMessage: 'Uložení komentáře se nezdařilo.',
  },
});
