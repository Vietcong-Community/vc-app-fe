import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Match.Comments.title',
    defaultMessage: 'Komentáře k zápasu',
  },
  noCommentYet: {
    id: 'app.components.Match.Comments.noCommentYet',
    defaultMessage: 'Žádný hater zatím nesebral odvahu.. budeš první?',
  },
  saveCommentError: {
    id: 'app.components.Match.Comments.saveCommentError',
    defaultMessage: 'Uložení komentáře se nezdařilo.',
  },
});
