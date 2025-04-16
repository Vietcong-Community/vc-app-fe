import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Championship.ConfirmMatchResult.title',
    defaultMessage: 'Potvrzení výsledku',
  },
  confirmSuccess: {
    id: 'app.containers.Championship.ConfirmMatchResult.confirmSuccess',
    defaultMessage: 'Zápas byl schválen.',
  },
  confirmFailed: {
    id: 'app.containers.Championship.ConfirmMatchResult.confirmFailed',
    defaultMessage: 'Potvrzení zápasu selhalo',
  },
  confirmFailedDescription: {
    id: 'app.containers.Championship.ConfirmMatchResult.confirmFailedDescription',
    defaultMessage:
      'Tož to je fest v řiti! Hhacker to tak zvoral, že aj Brňáci majó žbluňga v pajšlu. ' +
      'Zkus to eště raz, než nám z toho šlahne!',
  },
  submitButton: {
    id: 'app.containers.Championship.ConfirmMatchResult.submitButton',
    defaultMessage: 'Potvrdit',
  },
  cancelButton: {
    id: 'app.containers.Championship.ConfirmMatchResult.cancelButton',
    defaultMessage: 'Zrušit',
  },
  overallScore: {
    id: 'app.containers.Championship.ConfirmMatchResult.overallScore',
    defaultMessage: 'Celkové skóre',
  },
  mapRound: {
    id: 'app.containers.Championship.ConfirmMatchResult.mapRound',
    defaultMessage: '<b>{map}</b> - {round}. kolo',
  },
  scoreChallenger: {
    id: 'app.containers.Championship.ConfirmMatchResult.scoreChallenger',
    defaultMessage: 'Skóre vyzyvatel',
  },
  scoreOpponent: {
    id: 'app.containers.Championship.ConfirmMatchResult.scoreOpponent',
    defaultMessage: 'Skóre opponent',
  },
  championshipBreadcrumb: {
    id: 'app.containers.Championship.ConfirmMatchResult.championshipBreadcrumb',
    defaultMessage: 'Mistrovství ČR',
  },
  seasonDetailBreadcrumb: {
    id: 'app.containers.Championship.ConfirmMatchResult.seasonDetailBreadcrumb',
    defaultMessage: 'Sezóna',
  },
  matchDetailBreadcrumb: {
    id: 'app.containers.Championship.ConfirmMatchResult.matchDetailBreadcrumb',
    defaultMessage: 'Zápas',
  },
});
