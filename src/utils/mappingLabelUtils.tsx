import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import { LeagueType, MatchStatus, Nation, PlayersCount, SeasonStatus, TeamRole } from '../constants/enums';

import { messages } from './messages';

export const mapSeasonStatusToTranslation = (status?: SeasonStatus): ReactNode | undefined => {
  switch (status) {
    case SeasonStatus.NEW:
      return <FormattedMessage {...messages.seasonStatusNew} />;
    case SeasonStatus.ACTIVE:
      return <FormattedMessage {...messages.seasonStatusActive} />;
    case SeasonStatus.ARCHIVED:
      return <FormattedMessage {...messages.seasonStatusArchived} />;
    default:
      return undefined;
  }
};

export const mapMatchStatusToTranslation = (status?: MatchStatus): ReactNode | undefined => {
  switch (status) {
    case MatchStatus.NEW:
      return <FormattedMessage {...messages.matchStatusNew} />;
    case MatchStatus.WAITING_FOR_CONFIRMATION:
      return <FormattedMessage {...messages.matchStatusWaitingForConfirmation} />;
    case MatchStatus.ACCEPTED:
      return <FormattedMessage {...messages.matchStatusAccepted} />;
    case MatchStatus.CONFIRMED_SCORE_BY_SYSTEM:
      return <FormattedMessage {...messages.matchStatusConfirmedBySystem} />;
    case MatchStatus.WAITING_FOR_SCORE_CONFIRMATION:
      return <FormattedMessage {...messages.matchStatusWaitingForConfirmation} />;
    case MatchStatus.REJECTED_BY_ADMIN:
    case MatchStatus.REJECTED_BY_CHALLENGER:
    case MatchStatus.REJECTED_BY_OPPONENT:
      return <FormattedMessage {...messages.matchStatusRejected} />;
    case MatchStatus.COMPLAINT:
      return <FormattedMessage {...messages.matchStatusComplaint} />;
    case MatchStatus.FINISHED:
      return <FormattedMessage {...messages.matchStatusFinished} />;
    default:
      return undefined;
  }
};

export const mapLeagueTypeToTranslation = (type?: LeagueType): ReactNode | undefined => {
  switch (type) {
    case LeagueType.TEAMPLAY:
      return <FormattedMessage {...messages.teamplay} />;
    default:
      return undefined;
  }
};

export const mapNumberOfPlayersToTranslation = (playersCount?: PlayersCount): ReactNode | undefined => {
  switch (playersCount) {
    case PlayersCount.FOUR:
      return <FormattedMessage {...messages.fourVsFour} />;
    case PlayersCount.FIVE:
      return <FormattedMessage {...messages.fiveVsFive} />;
    case PlayersCount.SIX:
      return <FormattedMessage {...messages.sixVsSix} />;
    case PlayersCount.SEVEN:
      return <FormattedMessage {...messages.sevenVsSeven} />;
    case PlayersCount.EIGHT:
      return <FormattedMessage {...messages.eightVsEight} />;
    case PlayersCount.NINE:
      return <FormattedMessage {...messages.nineVsNine} />;
    case PlayersCount.TEN:
      return <FormattedMessage {...messages.tenVsTen} />;
    default:
      return undefined;
  }
};

export const mapNationToTranslation = (nation?: Nation): ReactNode | undefined => {
  switch (nation) {
    case Nation.VC:
      return <FormattedMessage {...messages.vcNation} />;
    case Nation.US:
      return <FormattedMessage {...messages.usNation} />;
    default:
      return undefined;
  }
};

export const mapTeamRoleToTranslation = (teamRole?: TeamRole): ReactNode | undefined => {
  switch (teamRole) {
    case TeamRole.OWNER:
      return <FormattedMessage {...messages.teamRoleOwner} />;
    case TeamRole.MATCH_ORGANIZER:
      return <FormattedMessage {...messages.teamRoleMatchManager} />;
    case TeamRole.OTROK:
      return <FormattedMessage {...messages.teamRoleSlave} />;
    case TeamRole.MEMBER:
      return <FormattedMessage {...messages.teamRoleMember} />;
    default:
      return undefined;
  }
};

export const TEAM_ROLE_SELECT_OPTIONS = [
  { id: TeamRole.OWNER, value: TeamRole.OWNER, label: <FormattedMessage {...messages.teamRoleOwner} /> },
  {
    id: TeamRole.MATCH_ORGANIZER,
    value: TeamRole.MATCH_ORGANIZER,
    label: <FormattedMessage {...messages.teamRoleMatchManager} />,
  },
  { id: TeamRole.MEMBER, value: TeamRole.MEMBER, label: <FormattedMessage {...messages.teamRoleMember} /> },
];
