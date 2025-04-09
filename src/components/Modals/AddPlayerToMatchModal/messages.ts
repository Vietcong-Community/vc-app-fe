import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.AddPlayerToMatch.title',
    defaultMessage: 'Přidat hráče k zápasu',
  },
  submit: {
    id: 'app.components.Modals.AddPlayerToMatch.submit',
    defaultMessage: 'Přidat',
  },
  cancel: {
    id: 'app.components.Modals.AddPlayerToMatch.cancel',
    defaultMessage: 'Zrušit',
  },
  challengerUserId: {
    id: 'app.components.Modals.AddPlayerToMatch.challengerUserId',
    defaultMessage: 'Hráči vyzyvatele',
  },
  opponentUserId: {
    id: 'app.components.Modals.AddPlayerToMatch.opponentUserId',
    defaultMessage: 'Hráči oponenta',
  },
  allPlayers: {
    id: 'app.components.Modals.AddPlayerToMatch.allPlayers',
    defaultMessage: 'Všichni hráči',
  },
  findPlayers: {
    id: 'app.components.Modals.AddPlayerToMatch.findPlayers',
    defaultMessage: 'Začni psát nick hráče..',
  },
  createSuccess: {
    id: 'app.components.Modals.AddPlayerToMatch.createSuccess',
    defaultMessage: 'Hráči byli přidáni do zápasu!',
  },
  createFailed: {
    id: 'app.components.Modals.AddPlayerToMatch.createFailed',
    defaultMessage: 'Přidání hráčů se nezdařilo',
  },
});
