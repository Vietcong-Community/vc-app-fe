import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  LeagueType,
  MatchResult,
  MatchStatus,
  Nation,
  PlayersCount,
  SeasonStatus,
  StatisticsSortType,
  TeamRole,
} from '../constants/enums';

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
      return <FormattedMessage {...messages.matchStatusWaitingForScoreConfirmation} />;
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
    case LeagueType.TWOVSTWO:
      return <FormattedMessage {...messages.twovstwo} />;
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

export const mapMatchResultToTranslation = (result?: MatchResult): ReactNode | undefined => {
  switch (result) {
    case MatchResult.WIN:
      return <FormattedMessage {...messages.matchResultWin} />;
    case MatchResult.DRAW:
      return <FormattedMessage {...messages.matchResultDraw} />;
    case MatchResult.DEFEAT:
      return <FormattedMessage {...messages.matchResultDefeat} />;
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

export const NATION_SELECT_OPTIONS = [
  { id: Nation.US, value: Nation.US, label: <FormattedMessage {...messages.usNation} /> },
  { id: Nation.VC, value: Nation.VC, label: <FormattedMessage {...messages.vcNation} /> },
];

export const TEAM_ROLE_SELECT_OPTIONS = [
  { id: TeamRole.OWNER, value: TeamRole.OWNER, label: <FormattedMessage {...messages.teamRoleOwner} /> },
  {
    id: TeamRole.MATCH_ORGANIZER,
    value: TeamRole.MATCH_ORGANIZER,
    label: <FormattedMessage {...messages.teamRoleMatchManager} />,
  },
  { id: TeamRole.MEMBER, value: TeamRole.MEMBER, label: <FormattedMessage {...messages.teamRoleMember} /> },
];

export const MATCH_STATUS_SELECT_OPTIONS = [
  {
    id: MatchStatus.NEW,
    value: MatchStatus.NEW,
    label: <FormattedMessage {...messages.matchStatusNew} />,
    disabled: true,
  },
  {
    id: MatchStatus.ACCEPTED,
    value: MatchStatus.ACCEPTED,
    label: <FormattedMessage {...messages.matchStatusAccepted} />,
  },
  {
    id: MatchStatus.WAITING_FOR_CONFIRMATION,
    value: MatchStatus.WAITING_FOR_CONFIRMATION,
    label: <FormattedMessage {...messages.matchStatusWaitingForConfirmation} />,
  },
  {
    id: MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    value: MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    label: <FormattedMessage {...messages.matchStatusWaitingForScoreConfirmation} />,
  },
  {
    id: MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
    value: MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
    label: <FormattedMessage {...messages.matchStatusConfirmedBySystem} />,
  },
  {
    id: MatchStatus.FINISHED,
    value: MatchStatus.FINISHED,
    label: <FormattedMessage {...messages.matchStatusFinished} />,
    disabled: true,
  },
];

export const mapStatisticsSortTypeToTranslation = (statisticsSortType?: StatisticsSortType): ReactNode | undefined => {
  switch (statisticsSortType) {
    case StatisticsSortType.FLAGS:
      return <FormattedMessage {...messages.statisticsSortTypeFlags} />;
    case StatisticsSortType.KILLS:
      return <FormattedMessage {...messages.statisticsSortTypeKills} />;
    case StatisticsSortType.DEATHS:
      return <FormattedMessage {...messages.statisticsSortTypeDeaths} />;
    case StatisticsSortType.KD:
      return <FormattedMessage {...messages.statisticsSortTypeKD} />;
    case StatisticsSortType.USAGE:
      return <FormattedMessage {...messages.statisticsSortTypeUsage} />;
    case StatisticsSortType.AVG_USAGE:
      return <FormattedMessage {...messages.statisticsSortTypeAvgUsage} />;
    default:
      return undefined;
  }
};
