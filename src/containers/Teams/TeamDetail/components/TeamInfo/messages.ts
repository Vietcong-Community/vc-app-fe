import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  teamName: {
    id: 'app.containers.Teams.TeamInfo.teamName',
    defaultMessage: 'Název týmu:',
  },
  clanTag: {
    id: 'app.containers.Teams.TeamInfo.clanTag',
    defaultMessage: 'Clantag',
  },
  memberFrom: {
    id: 'app.containers.Teams.TeamInfo.memberFrom',
    defaultMessage: 'Členem od:',
  },
  fakeDescription: {
    id: 'app.containers.Teams.TeamInfo.fakeDescription',
    defaultMessage: 'Tenhle tým není vůbec kreativní, aby si vytvořili popis toho, jací jsou. Hanba.',
  },
  uploadAvatar: {
    id: 'app.containers.Teams.TeamInfo.uploadAvatar',
    defaultMessage: 'Nahrát',
  },
  avatarUploadSuccess: {
    id: 'app.containers.Teams.TeamInfo.avatarUploadSuccess',
    defaultMessage: 'Logo bylo úspěšně aktualizováno.',
  },
  avatarUploadFailed: {
    id: 'app.containers.Teams.TeamInfo.avatarUploadFailed',
    defaultMessage: 'Logo se nepodařilo nahrát, zkuste to prosím později nebo kontaktujte adminský tým.',
  },
});
