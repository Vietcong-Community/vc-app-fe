import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.SetMatchResult.title',
    defaultMessage: 'Zadání výsledku',
  },
  saveSuccess: {
    id: 'app.containers.League.SetMatchResult.saveSuccess',
    defaultMessage: 'Výsledek byl uložen a odeslán soupeři ke schválení.',
  },
  overallScore: {
    id: 'app.containers.League.SetMatchResult.overallScore',
    defaultMessage: 'Celkové skóre',
  },
  mapRound: {
    id: 'app.containers.League.SetMatchResult.mapRound',
    defaultMessage: '<b>{map}</b> - {round}. kolo',
  },
  nation: {
    id: 'app.containers.League.SetMatchResult.nation',
    defaultMessage: 'Strana: <b>{nation}</b>',
  },
  scoreChallenger: {
    id: 'app.containers.League.SetMatchResult.scoreChallenger',
    defaultMessage: 'Skóre vyzyvatel',
  },
  scoreOpponent: {
    id: 'app.containers.League.SetMatchResult.scoreOpponent',
    defaultMessage: 'Skóre opponent',
  },
  saveFailed: {
    id: 'app.containers.League.SetMatchResult.saveFailed',
    defaultMessage: 'Zadání výsledku zápasu selhalo.',
  },
  matchFetchError: {
    id: 'app.containers.League.SetMatchResult.matchFetchError',
    defaultMessage: 'Nepodařilo se najít detaily o zápase, kontaktujte prosím adminy.',
  },
  submitButton: {
    id: 'app.containers.League.SetMatchResult.submitButton',
    defaultMessage: 'Odeslat',
  },
  cancelButton: {
    id: 'app.containers.League.SetMatchResult.cancelButton',
    defaultMessage: 'Zrušit',
  },
  leaguesBreadcrumb: {
    id: 'app.containers.League.SetMatchResult.leaguesBreadcrumb',
    defaultMessage: 'Ligy a sezóny',
  },
  seasonDetailBreadcrumb: {
    id: 'app.containers.League.SetMatchResult.seasonDetailBreadcrumb',
    defaultMessage: 'Sezóna',
  },
  matchDetailBreadcrumb: {
    id: 'app.containers.League.SetMatchResult.matchDetailBreadcrumb',
    defaultMessage: 'Zápas',
  },
  correctScoreAlertTitle: {
    id: 'app.containers.League.SetMatchResult.correctScoreAlertTitle',
    defaultMessage: 'Zadávání skóre!',
  },
  correctScoreAlert: {
    id: 'app.containers.League.SetMatchResult.correctScoreAlert',
    defaultMessage: 'Skóre v kolech zadávejte dle skórovaných vlajek v kole, nezapisujte pouze zkráceně 1:0/0:1.',
  },
});
