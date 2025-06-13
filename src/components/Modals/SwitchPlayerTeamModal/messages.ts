import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.SwitchPlayerTeamModal.title',
    defaultMessage: 'Vyměnit hráče v týmu',
  },
  player: {
    id: 'app.components.Modals.SwitchPlayerTeamModal.player',
    defaultMessage: 'Hráč',
  },
  updateSuccess: {
    id: 'app.components.Modals.SwitchPlayerTeamModal.updateSuccess',
    defaultMessage: 'Hráč byl vyměněn!',
  },
  updateFailed: {
    id: 'app.components.Modals.SwitchPlayerTeamModal.updateFailed',
    defaultMessage: 'Výměna se nezdařila',
  },
});
