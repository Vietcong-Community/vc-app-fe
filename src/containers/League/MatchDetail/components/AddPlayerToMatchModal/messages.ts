import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.title',
    defaultMessage: 'Přidat hráče k zápasu',
  },
  submit: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.submit',
    defaultMessage: 'Přidat',
  },
  cancel: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.cancel',
    defaultMessage: 'Zrušit',
  },
  challengerUserId: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.challengerUserId',
    defaultMessage: 'Hráči vyzyvatele',
  },
  opponentUserId: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.opponentUserId',
    defaultMessage: 'Hráči oponenta',
  },
  allPlayers: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.allPlayers',
    defaultMessage: 'Všichni hráči',
  },
  findPlayers: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.findPlayers',
    defaultMessage: 'Začni psát nick hráče..',
  },
  createSuccess: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.createSuccess',
    defaultMessage: 'Hráči byli přidáni do zápasu!',
  },
  createFailed: {
    id: 'app.containers.League.MatchDetail.components.AddPlayerToMatch.createFailed',
    defaultMessage: 'Přidání hráčů se nezdařilo',
  },
});
