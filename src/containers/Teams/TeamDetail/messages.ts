import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Teams.TeamDetail.title',
    defaultMessage: 'Detail týmu',
  },
  membersTitle: {
    id: 'app.containers.Teams.TeamDetail.membersTitle',
    defaultMessage: 'Členové',
  },
  owner: {
    id: 'app.containers.Teams.TeamDetail.owner',
    defaultMessage: 'Kapitán',
  },
  matchOrganizer: {
    id: 'app.containers.Teams.TeamDetail.matchOrganizer',
    defaultMessage: 'Manažer zápasů',
  },
  member: {
    id: 'app.containers.Teams.TeamDetail.member',
    defaultMessage: 'Člen',
  },
  joinBtn: {
    id: 'app.containers.Teams.TeamDetail.joinBtn',
    defaultMessage: 'Vstoupit',
  },
  joinSuccess: {
    id: 'app.containers.Teams.TeamDetail.joinSuccess',
    defaultMessage: 'Přihlášení do týmu proběhlo úspěšně',
  },
  joinSuccessDescription: {
    id: 'app.containers.Teams.TeamDetail.joinSuccessDescription',
    defaultMessage: 'Nyní musíš počkat až se kapitán týmu rozhodne, zda Tě chce.',
  },
  joinFailed: {
    id: 'app.containers.Teams.TeamDetail.joinFailed',
    defaultMessage: 'Přihlášení se nezdařilo, kontaktujte prosím adminy.',
  },
  leaveTeamButton: {
    id: 'app.containers.Teams.TeamDetail.leaveTeamButton',
    defaultMessage: 'Opustit',
  },
  leaveTeamSuccess: {
    id: 'app.containers.Teams.TeamDetail.leaveTeamSuccess',
    defaultMessage: 'Opuštění týmu proběhlo úspěšně',
  },
  leaveTeamFailed: {
    id: 'app.containers.Teams.TeamDetail.leaveTeamFailed',
    defaultMessage: 'Opuštění se nezdařilo, kontaktujte prosím adminy.',
  },
  approveSuccess: {
    id: 'app.containers.Teams.TeamDetail.approveSuccess',
    defaultMessage: 'Voják byl přijat do týmu!',
  },
  approveFailed: {
    id: 'app.containers.Teams.TeamDetail.approveFailed',
    defaultMessage: 'Přijetí se nezdařilo, kontaktujte adminy.',
  },
  rejectSuccess: {
    id: 'app.containers.Teams.TeamDetail.rejectSuccess',
    defaultMessage: 'Voják byl odmítnut! Až se to dozví, bude nazlobený.',
  },
  rejectFailed: {
    id: 'app.containers.Teams.TeamDetail.rejectFailed',
    defaultMessage: 'Odmítnuí se nezdařilo, kontaktujte adminy.',
  },
});
