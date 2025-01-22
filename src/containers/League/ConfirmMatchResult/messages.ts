import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.ConfirmMatchResult.title',
    defaultMessage: 'Potvrzení výsledku',
  },
  confirmSuccess: {
    id: 'app.containers.League.ConfirmMatchResult.confirmSuccess',
    defaultMessage: 'Zápas byl schválen.',
  },
  confirmFailed: {
    id: 'app.containers.League.ConfirmMatchResult.confirmFailed',
    defaultMessage: 'Potvrzení zápasu selhalo',
  },
  submitButton: {
    id: 'app.containers.League.ConfirmMatchResult.submitButton',
    defaultMessage: 'Potvrdit',
  },
  cancelButton: {
    id: 'app.containers.League.ConfirmMatchResult.cancelButton',
    defaultMessage: 'Zrušit',
  },
  overallScore: {
    id: 'app.containers.League.ConfirmMatchResult.overallScore',
    defaultMessage: 'Celkové skóre',
  },
  mapRound: {
    id: 'app.containers.League.ConfirmMatchResult.mapRound',
    defaultMessage: '<b>{map}</b> - {round}. kolo',
  },
  scoreChallenger: {
    id: 'app.containers.League.ConfirmMatchResult.scoreChallenger',
    defaultMessage: 'Skóre vyzyvatel',
  },
  scoreOpponent: {
    id: 'app.containers.League.ConfirmMatchResult.scoreOpponent',
    defaultMessage: 'Skóre opponent',
  },
});
