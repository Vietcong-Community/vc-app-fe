import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.AcceptMatchChallenge.title',
    defaultMessage: 'Potvrzení výzvy k zápasu',
  },
  acceptSuccess: {
    id: 'app.containers.League.AcceptMatchChallenge.createSuccess',
    defaultMessage: 'Zápas byl úspěšně přijat, ať vyhraje ten ukempenější.',
  },
  rejectSuccess: {
    id: 'app.containers.League.AcceptMatchChallenge.rejectSuccess',
    defaultMessage: 'Zápas byl úspěšně odmítnut, jste unavený?.',
  },
  failedNotification: {
    id: 'app.containers.League.AcceptMatchChallenge.failedNotification',
    defaultMessage: 'Něco se pokazilo, zkuste to prosím později',
  },
  mapLabel: {
    id: 'app.containers.League.AcceptMatchChallenge.mapLabel',
    defaultMessage: 'Mapa',
  },
  submitButton: {
    id: 'app.containers.League.AcceptMatchChallenge.submitButton',
    defaultMessage: 'Potvrdit',
  },
  cancelButton: {
    id: 'app.containers.League.AcceptMatchChallenge.cancelButton',
    defaultMessage: 'Odmítnout',
  },
  leaguesBreadcrumb: {
    id: 'app.containers.League.AcceptMatchChallenge.leaguesBreadcrumb',
    defaultMessage: 'Ligy a sezóny',
  },
  seasonDetailBreadcrumb: {
    id: 'app.containers.League.AcceptMatchChallenge.seasonDetailBreadcrumb',
    defaultMessage: 'Sezóna',
  },
  matchDetailBreadcrumb: {
    id: 'app.containers.League.AcceptMatchChallenge.matchDetailBreadcrumb',
    defaultMessage: 'Zápas',
  },
  challengeBreadcrumb: {
    id: 'app.containers.League.AcceptMatchChallenge.challengeBreadcrumb',
    defaultMessage: 'Výzva',
  },
});
