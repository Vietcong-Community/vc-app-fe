import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Championship.SetMatchResult.title',
    defaultMessage: 'Zadání výsledku',
  },
  saveSuccess: {
    id: 'app.containers.Championship.SetMatchResult.saveSuccess',
    defaultMessage: 'Výsledek byl uložen a odeslán soupeři ke schválení.',
  },
  overallScore: {
    id: 'app.containers.Championship.SetMatchResult.overallScore',
    defaultMessage: 'Celkové skóre',
  },
  mapRound: {
    id: 'app.containers.Championship.SetMatchResult.mapRound',
    defaultMessage: '<b>{map}</b> - {round}. kolo',
  },
  nation: {
    id: 'app.containers.Championship.SetMatchResult.nation',
    defaultMessage: 'Strana: <b>{nation}</b>',
  },
  scoreChallenger: {
    id: 'app.containers.Championship.SetMatchResult.scoreChallenger',
    defaultMessage: 'Skóre vyzyvatel',
  },
  scoreOpponent: {
    id: 'app.containers.Championship.SetMatchResult.scoreOpponent',
    defaultMessage: 'Skóre opponent',
  },
  saveFailed: {
    id: 'app.containers.Championship.SetMatchResult.saveFailed',
    defaultMessage: 'Zadání výsledku zápasu selhalo.',
  },
  matchFetchError: {
    id: 'app.containers.Championship.SetMatchResult.matchFetchError',
    defaultMessage: 'Nepodařilo se najít detaily o zápase, kontaktujte prosím adminy.',
  },
  submitButton: {
    id: 'app.containers.Championship.SetMatchResult.submitButton',
    defaultMessage: 'Odeslat',
  },
  cancelButton: {
    id: 'app.containers.Championship.SetMatchResult.cancelButton',
    defaultMessage: 'Zrušit',
  },
  championshipBreadcrumb: {
    id: 'app.containers.Championship.SetMatchResult.championshipBreadcrumb',
    defaultMessage: 'Mistrovství ČR',
  },
  seasonDetailBreadcrumb: {
    id: 'app.containers.Championship.SetMatchResult.seasonDetailBreadcrumb',
    defaultMessage: 'Turanj',
  },
  matchDetailBreadcrumb: {
    id: 'app.containers.Championship.SetMatchResult.matchDetailBreadcrumb',
    defaultMessage: 'Zápas',
  },
  correctScoreAlertTitle: {
    id: 'app.containers.Championship.SetMatchResult.correctScoreAlertTitle',
    defaultMessage: 'Zadávání skóre!',
  },
  correctScoreAlert: {
    id: 'app.containers.Championship.SetMatchResult.correctScoreAlert',
    defaultMessage: 'Skóre v kolech zadávejte dle skórovaných vlajek v kole, nezapisujte pouze zkráceně 1:0/0:1.',
  },
});
