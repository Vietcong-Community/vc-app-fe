import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.JoinRankedMatchModal.title',
    defaultMessage: 'Připojit se k zápasu',
  },
  description: {
    id: 'app.components.Modals.JoinRankedMatchModal.description',
    defaultMessage: 'Přidáváš se do zápasu pro kompetetivní mód. Vyber si dvě preferované mapy.',
  },
  firstPreferredMap: {
    id: 'app.components.Modals.JoinRankedMatchModal.firstPreferredMap',
    defaultMessage: 'První mapa',
  },
  secondPreferredMap: {
    id: 'app.components.Modals.JoinRankedMatchModal.secondPreferredMap',
    defaultMessage: 'Druhá mapa',
  },
  joinSuccess: {
    id: 'app.components.Modals.JoinRankedMatchModal.joinSuccess',
    defaultMessage: 'Připojil ses k zápasu!',
  },
  joinSuccessDescription: {
    id: 'app.components.Modals.JoinRankedMatchModal.joinSuccessDescription',
    defaultMessage: 'Připojil ses k zápasu, hlídej si discord a buď na zápas připravený včas!',
  },
  joinFailed: {
    id: 'app.components.Modals.JoinRankedMatchModal.joinFailed',
    defaultMessage: 'Připojení se nezdařilo',
  },
});
