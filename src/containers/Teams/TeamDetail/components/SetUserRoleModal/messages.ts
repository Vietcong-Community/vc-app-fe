import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.title',
    defaultMessage: 'Editovat roli hráče',
  },
  submit: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.submit',
    defaultMessage: 'Uložit',
  },
  cancel: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.cancel',
    defaultMessage: 'Zrušit',
  },
  player: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.player',
    defaultMessage: 'Hráč: <b>{player}</b>',
  },
  role: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.role',
    defaultMessage: 'Role',
  },
  updateSuccess: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.updateSuccess',
    defaultMessage: 'Role byla nastavena!',
  },
  updateFailed: {
    id: 'app.containers.Teams.TeamDetail.components.SetUserRoleModal.updateFailed',
    defaultMessage: 'Úprava role se nezdařila',
  },
});
