import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.title',
    defaultMessage: 'Vytvořit nový tým',
  },
  submit: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.submit',
    defaultMessage: 'Vytvořit',
  },
  cancel: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.cancel',
    defaultMessage: 'Zrušit',
  },
  name: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.name',
    defaultMessage: 'Název',
  },
  tag: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.tag',
    defaultMessage: 'Clantag',
  },
  createSuccess: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.createSuccess',
    defaultMessage: 'Tým byl vytvořen!',
  },
  createFailed: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.createFailed',
    defaultMessage: 'Vytvoření týmu se nezdařilo',
  },
  createFailedDescription: {
    id: 'app.containers.MyTeams.component.CreateTeamModal.createFailedDescription',
    defaultMessage: 'Došlo k nějaké chybě. Pravděpodobně za ní může pan Basccino.',
  },
});
