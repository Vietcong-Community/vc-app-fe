import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import { LeagueType, MatchStatus, Nation, PlayersCount, SeasonStatus } from '../constants/enums';

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
    case MatchStatus.READY:
      return <FormattedMessage {...messages.matchStatusReady} />;
    case MatchStatus.WAITING_FOR_CONFIRMATION:
      return <FormattedMessage {...messages.matchStatusWaitingForConfirmation} />;
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
