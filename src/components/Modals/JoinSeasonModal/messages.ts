import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.JoinSeasonModal.title',
    defaultMessage: 'Zapojit se do sezóny',
  },
  team: {
    id: 'app.components.Modals.JoinSeasonModal.team',
    defaultMessage: 'Tým',
  },
  joinSuccess: {
    id: 'app.components.Modals.JoinSeasonModal.joinSuccess',
    defaultMessage: 'Právě jste se zapojoli do sezóny! Hodně štěstí.',
  },
  joinFailed: {
    id: 'app.components.Modals.JoinSeasonModal.joinFailed',
    defaultMessage: 'Zase jsme to posrali. Zkuste to později nebo napište panu hhackerovi.',
  },
});
