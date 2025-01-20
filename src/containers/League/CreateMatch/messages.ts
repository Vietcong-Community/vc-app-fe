import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.CreateMatch.title',
    defaultMessage: 'Vytvoření zápasu',
  },
  createSuccess: {
    id: 'app.containers.League.CreateMatch.createSuccess',
    defaultMessage: 'Zápas byl úspěšně vytvořen a výzva odeslána soupeři ke schválení.',
  },
  createFailed: {
    id: 'app.containers.League.CreateMatch.createFailed',
    defaultMessage: 'Vytvoření zápasu selhalo.',
  },
  opponentId: {
    id: 'app.containers.League.CreateMatch.opponentId',
    defaultMessage: 'Soupeř',
  },
  mapLabel: {
    id: 'app.containers.League.CreateMatch.mapLabel',
    defaultMessage: 'Mapa',
  },
  startDate: {
    id: 'app.containers.League.CreateMatch.startDate',
    defaultMessage: 'Datum a čas',
  },
  submitButton: {
    id: 'app.containers.League.CreateMatch.submitButton',
    defaultMessage: 'Vytvořit',
  },
  cancelButton: {
    id: 'app.containers.League.CreateMatch.cancelButton',
    defaultMessage: 'Zrušit',
  },
});
