import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.ErrorBoundary.title',
    defaultMessage: 'I Trapper občas chybuje',
  },
  description: {
    id: 'app.containers.ErrorBoundary.description',
    defaultMessage:
      'Něco se prostě pokazilo a určitě za to nemůžete vy. Lagy, ztráty, soupeř buguje a vy máte 30 do respu.',
  },
  backToHomePage: {
    id: 'app.containers.ErrorBoundary.backToHomePage',
    defaultMessage: 'Zpět na hlavní stránku',
  },
});
