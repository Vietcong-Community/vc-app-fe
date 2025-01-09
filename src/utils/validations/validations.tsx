import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const isRequired = {
  required: true,
  message: <FormattedMessage {...messages.required} />,
};

export const maxLength = (length: number) => ({
  validator: (_unused: object, value: string) => {
    if (value?.length > length) {
      return Promise.reject('Some message here');
    } else {
      return Promise.resolve();
    }
  },
  message: <FormattedMessage {...messages.maxLength} values={{ length }} />,
});
