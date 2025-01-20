import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.CreateMatch.title',
    defaultMessage: 'Potvrzení výzvy k zápasu',
  },
  acceptSuccess: {
    id: 'app.containers.League.CreateMatch.createSuccess',
    defaultMessage: 'Zápas byl úspěšně přijat, ať vyhraje ten ukempenější.',
  },
  rejectSuccess: {
    id: 'app.containers.League.CreateMatch.rejectSuccess',
    defaultMessage: 'Zápas byl úspěšně odmítnut, jste unavený?.',
  },
  failedNotification: {
    id: 'app.containers.League.CreateMatch.failedNotification',
    defaultMessage: 'Něco se pokazilo, zkuste to prosím později',
  },
  mapLabel: {
    id: 'app.containers.League.CreateMatch.mapLabel',
    defaultMessage: 'Mapa',
  },
  submitButton: {
    id: 'app.containers.League.CreateMatch.submitButton',
    defaultMessage: 'Potvrdit',
  },
  cancelButton: {
    id: 'app.containers.League.CreateMatch.cancelButton',
    defaultMessage: 'Odmítnout',
  },
});
