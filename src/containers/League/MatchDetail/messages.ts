import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.title',
    defaultMessage: 'Detail zápasu',
  },
  date: {
    id: 'app.containers.League.MatchDetail.date',
    defaultMessage: 'Datum zápasu',
  },
  status: {
    id: 'app.containers.League.MatchDetail.status',
    defaultMessage: 'Stav',
  },
  lineup: {
    id: 'app.containers.League.MatchDetail.lineup',
    defaultMessage: 'Sestava',
  },
  lineupTBA: {
    id: 'app.containers.League.MatchDetail.lineupTBA',
    defaultMessage:
      'To koukáš, že tu nic neni, co? Neboj, pracujeme na tom, abychom v dalších ' +
      'updatech evidovali hráče, kteří hráli zápas.',
  },
});
