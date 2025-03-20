import { FormattedMessage } from 'react-intl';

import { IFormFields } from '../../../../@types/forms';
import { isRequired } from '../../../../utils/validations/validations';

import { messages } from './messages';

export enum GlobalSelectType {
  PLAYERS = 'PLAYERS',
  TEAMS = 'TEAMS',
}

export const GLOBAL_SELECT_OPTIONS = [
  { label: <FormattedMessage {...messages.players} />, value: GlobalSelectType.PLAYERS },
  { label: <FormattedMessage {...messages.teams} />, value: GlobalSelectType.TEAMS },
];

export interface IFormData {
  type: GlobalSelectType;
  name: string;
}

export const fields: IFormFields<IFormData> = {
  type: {
    name: 'type',
    required: true,
    rules: [isRequired],
  },
  name: {
    name: 'name',
  },
};
