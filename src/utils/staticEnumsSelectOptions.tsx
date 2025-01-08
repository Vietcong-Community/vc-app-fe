import { FormattedMessage } from 'react-intl';

import { PlayersCount } from '../constants/enums';

import { messages } from './messages';

export const PLAYERS_COUNT_OPTIONS = [
  { value: PlayersCount.FOUR, label: <FormattedMessage {...messages.fourVsFour} /> },
  { value: PlayersCount.FIVE, label: <FormattedMessage {...messages.fiveVsFive} /> },
  { value: PlayersCount.SIX, label: <FormattedMessage {...messages.sixVsSix} /> },
  { value: PlayersCount.SEVEN, label: <FormattedMessage {...messages.sevenVsSeven} /> },
  { value: PlayersCount.EIGHT, label: <FormattedMessage {...messages.eightVsEight} /> },
  { value: PlayersCount.NINE, label: <FormattedMessage {...messages.nineVsNine} /> },
  { value: PlayersCount.TEN, label: <FormattedMessage {...messages.tenVsTen} /> },
];
