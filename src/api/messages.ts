import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  tooManyRequests: {
    id: 'app.api.tooManyRequests',
    defaultMessage: 'Vyčerpali jste limit požadavků, zkuste to prosím později.',
  },
  unexpectedError: {
    id: 'app.api.unexpectedError',
    defaultMessage: 'Došlo k neočekávané chybě, zkuste to prosím později.',
  },
  serverNotAvailable: {
    id: 'app.api.serverNotAvailable',
    defaultMessage: 'Server není dostupný, zkuste to prosím později.',
  },
});
