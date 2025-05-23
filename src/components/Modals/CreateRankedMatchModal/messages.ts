import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.CreateRankedMatchModal.title',
    defaultMessage: 'Vytvořit kompetetivní zápas',
  },
  submit: {
    id: 'app.components.Modals.CreateRankedMatchModal.submit',
    defaultMessage: 'Vytvořit',
  },
  cancel: {
    id: 'app.components.Modals.CreateRankedMatchModal.cancel',
    defaultMessage: 'Zrušit',
  },
  description: {
    id: 'app.components.Modals.CreateRankedMatchModal.description',
    defaultMessage: 'Vytváříš nový zápas pro kompetetivní mód. Vyber si dvě preferované mapy, datum a čas zápasu.',
  },
  firstPreferredMap: {
    id: 'app.components.Modals.CreateRankedMatchModal.firstPreferredMap',
    defaultMessage: 'První mapa',
  },
  secondPreferredMap: {
    id: 'app.components.Modals.CreateRankedMatchModal.secondPreferredMap',
    defaultMessage: 'Druhá mapa',
  },
  startDate: {
    id: 'app.components.Modals.CreateRankedMatchModal.startDate',
    defaultMessage: 'Datum a čas zápasu',
  },
  createSuccess: {
    id: 'app.components.Modals.CreateRankedMatchModal.createSuccess',
    defaultMessage: 'Zápas byl vytvořen!',
  },
  createSuccessDescription: {
    id: 'app.components.Modals.CreateRankedMatchModal.createSuccessDescription',
    defaultMessage:
      'Stal jsi se správcem zápasu, můžeš odebírat přihlášené hráče. Využívej toho pouze v případě nedostavení ' +
      'hráče k zápasu, ne protože se Ti někdo nelíbí. Všechno vidíme.',
  },
  createFailed: {
    id: 'app.components.Modals.CreateRankedMatchModal.createFailed',
    defaultMessage: 'Vytvoření se nezdařilo',
  },
});
