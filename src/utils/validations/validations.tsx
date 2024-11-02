import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const isRequired = {
  required: true,
  message: <FormattedMessage {...messages.required} />,
};
