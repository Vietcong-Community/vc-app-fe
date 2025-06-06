import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  live: {
    id: 'app.components.Season.MatchRow.live',
    defaultMessage: 'Živě',
  },
  players: {
    id: 'app.components.Season.MatchRow.players',
    defaultMessage: 'Počet hráčů: {value}/{maximalPlayers}',
  },
  userLoggedIn: {
    id: 'app.components.Season.MatchRow.userLoggedIn',
    defaultMessage: 'JSI PŘIHLÁŠEN',
  },
  teams: {
    id: 'app.components.Season.MatchRow.teams',
    defaultMessage: 'Týmy',
  },
  result: {
    id: 'app.components.Season.MatchRow.result',
    defaultMessage: 'Výsledek: ',
  },
});
