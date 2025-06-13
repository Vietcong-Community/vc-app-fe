import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  map: {
    id: 'app.components.Match.Team.map',
    defaultMessage: 'Mapa: ',
  },
  lineup: {
    id: 'app.components.Match.Team.lineup',
    defaultMessage: 'Sestava',
  },
  open: {
    id: 'app.components.Match.Team.open',
    defaultMessage: 'Otevřít',
  },
  close: {
    id: 'app.components.Match.Team.close',
    defaultMessage: 'Zavřít',
  },
  goToTeamDetail: {
    id: 'app.components.Match.Team.goToTeamDetail',
    defaultMessage: 'Detail týmu',
  },
  lineupEmpty: {
    id: 'app.components.Match.Team.lineupEmpty',
    defaultMessage:
      'Ze snímků průzkumnického týmu jsme nedokázali identifikovat žádné hráče. Zápas buď nebyl odehrán ' +
      'nebo měli hráči perfektní maskování.',
  },
  eloTitle: {
    id: 'app.components.Match.Team.eloTitle',
    defaultMessage: 'Body: ',
  },
  statisticsSynced: {
    id: 'app.components.Match.Team.statisticsSynced',
    defaultMessage: 'Statistiky byly započítány do celkového součtu.',
  },
  statisticsNotSynced: {
    id: 'app.components.Match.Team.statisticsNotSynced',
    defaultMessage: 'Statistiky ještě nebyly připsány.',
  },
  rank: {
    id: 'app.components.Match.Team.rank',
    defaultMessage: 'Umístění při rozřazení: <b>{value}</b>',
  },
});
