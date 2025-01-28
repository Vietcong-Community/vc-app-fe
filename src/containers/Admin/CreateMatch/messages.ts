import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Admin.CreateMatch.title',
    defaultMessage: 'Admin - Vytvoření zápasu',
  },
  createSuccess: {
    id: 'app.containers.Admin.CreateMatch.createSuccess',
    defaultMessage: 'Zápas byl úspěšně vytvořen.',
  },
  createFailed: {
    id: 'app.containers.Admin.CreateMatch.createFailed',
    defaultMessage: 'Vytvoření zápasu selhalo.',
  },
  challengerId: {
    id: 'app.containers.Admin.CreateMatch.challengerId',
    defaultMessage: 'Vyzyvatel',
  },
  opponentId: {
    id: 'app.containers.Admin.CreateMatch.opponentId',
    defaultMessage: 'Soupeř',
  },
  challengerMapLabel: {
    id: 'app.containers.Admin.CreateMatch.challengerMapLabel',
    defaultMessage: 'Mapa vyzyvatele',
  },
  opponentMapLabel: {
    id: 'app.containers.Admin.CreateMatch.opponentMapLabel',
    defaultMessage: 'Mapa oponent',
  },
  startDate: {
    id: 'app.containers.Admin.CreateMatch.startDate',
    defaultMessage: 'Datum a čas',
  },
  submitButton: {
    id: 'app.containers.Admin.CreateMatch.submitButton',
    defaultMessage: 'Vytvořit',
  },
  cancelButton: {
    id: 'app.containers.Admin.CreateMatch.cancelButton',
    defaultMessage: 'Zrušit',
  },
  leaguesBreadcrumb: {
    id: 'app.containers.Admin.CreateMatch.leaguesBreadcrumb',
    defaultMessage: 'Ligy a sezóny',
  },
  seasonDetailBreadcrumb: {
    id: 'app.containers.Admin.CreateMatch.seasonDetailBreadcrumb',
    defaultMessage: 'Sezóna',
  },
  newMatchBreadcrumb: {
    id: 'app.containers.Admin.CreateMatch.newMatchBreadcrumb',
    defaultMessage: 'Nový zápas',
  },
  insufficientRights: {
    id: 'app.containers.Admin.CreateMatch.insufficientRights',
    defaultMessage: 'Nemáte dostatečné oprávnění.',
  },
});
