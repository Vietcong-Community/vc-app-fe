import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  map: {
    id: 'app.componenst.Match.Team.map',
    defaultMessage: 'Mapa: ',
  },
  lineup: {
    id: 'app.componenst.Match.Team.lineup',
    defaultMessage: 'Sestava',
  },
  open: {
    id: 'app.componenst.Match.Team.open',
    defaultMessage: 'Otevřít',
  },
  close: {
    id: 'app.componenst.Match.Team.close',
    defaultMessage: 'Zavřít',
  },
  goToTeamDetail: {
    id: 'app.componenst.Match.Team.goToTeamDetail',
    defaultMessage: 'Detail týmu',
  },
  lineupEmpty: {
    id: 'app.componenst.Match.Team.lineupEmpty',
    defaultMessage:
      'Ze snímků průzkumnického týmu jsme nedokázali identifikovat žádné hráče. Zápas buď nebyl odehrán ' +
      'nebo měli hráči perfektní maskování.',
  },
  eloTitle: {
    id: 'app.componenst.Match.Team.eloTitle',
    defaultMessage: 'Body: ',
  },
  statisticsSynced: {
    id: 'app.componenst.Match.Team.statisticsSynced',
    defaultMessage: 'Statistiky byly započítány do celkového součtu.',
  },
  statisticsNotSynced: {
    id: 'app.componenst.Match.Team.statisticsNotSynced',
    defaultMessage: 'Statistiky ještě nebyly připsány.',
  },
});
