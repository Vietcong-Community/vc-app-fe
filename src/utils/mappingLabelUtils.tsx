import { ReactNode } from 'react';

import { FormattedMessage } from 'react-intl';

import { MixedMatchStatus, SeasonStatus } from '../api/hooks/mixedLeague/interfaces';
import { Nation, PlayersCount } from '../constants/enums';

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

export const mapMatchStatusToTranslation = (status?: MixedMatchStatus): ReactNode | undefined => {
  switch (status) {
    case MixedMatchStatus.NEW:
      return <FormattedMessage {...messages.matchStatusNew} />;
    case MixedMatchStatus.READY:
      return <FormattedMessage {...messages.matchStatusReady} />;
    case MixedMatchStatus.WAITING_FOR_CONFIRMATION:
      return <FormattedMessage {...messages.matchStatusWaitingForConfirmation} />;
    case MixedMatchStatus.COMPLAINT:
      return <FormattedMessage {...messages.matchStatusComplaint} />;
    case MixedMatchStatus.FINISHED:
      return <FormattedMessage {...messages.matchStatusFinished} />;
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
