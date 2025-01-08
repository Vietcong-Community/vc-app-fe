import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  required: {
    id: 'app.utils.validations.required',
    defaultMessage: 'Vyplňte povinné pole',
  },
  maxLength: {
    id: 'app.utils.validations.maxLength',
    defaultMessage: 'Maximální počet znaků je {length}',
  },
});
