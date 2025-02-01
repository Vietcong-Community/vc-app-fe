import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.components.ExpectedEloPointsModal.title',
    defaultMessage: 'Očekávané body',
  },
  result: {
    id: 'app.containers.League.components.ExpectedEloPointsModal.result',
    defaultMessage: 'Výsledek',
  },
  newEloPoints: {
    id: 'app.containers.League.components.ExpectedEloPointsModal.newEloPoints',
    defaultMessage: 'Výsledné body',
  },
  actualEloPoints: {
    id: 'app.containers.League.components.ExpectedEloPointsModal.actualEloPoints',
    defaultMessage: '<tag>{team}</tag>: {points}',
  },
});
