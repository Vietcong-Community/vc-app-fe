import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.League.SeasonDetail.components.JoinSeasonModal.title',
    defaultMessage: 'Zapojit se do sezóny',
  },
  team: {
    id: 'app.containers.League.SeasonDetail.components.JoinSeasonModal.team',
    defaultMessage: 'Tým',
  },
  joinSuccess: {
    id: 'app.containers.League.SeasonDetail.components.JoinSeasonModal.joinSuccess',
    defaultMessage: 'Právě jste se zapojoli do sezóny! Hodně štěstí.',
  },
  joinFailed: {
    id: 'app.containers.League.SeasonDetail.components.JoinSeasonModal.joinFailed',
    defaultMessage: 'Zase jsme to posrali. Zkuste to později nebo napište panu hhackerovi.',
  },
});
