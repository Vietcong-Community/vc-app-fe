import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.title',
    defaultMessage: 'Editovat tým',
  },
  submit: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.submit',
    defaultMessage: 'Uložit',
  },
  cancel: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.cancel',
    defaultMessage: 'Zrušit',
  },
  name: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.name',
    defaultMessage: 'Název',
  },
  tag: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.tag',
    defaultMessage: 'Clantag',
  },
  description: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.description',
    defaultMessage: 'Popis',
  },
  updateSuccess: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.updateSuccess',
    defaultMessage: 'Tým byl úspěšně upraven!',
  },
  updateFailed: {
    id: 'app.containers.Teams.TeamDetail.components.EditTeamModal.updateFailed',
    defaultMessage: 'Úprava týmu se nezdařila',
  },
});
