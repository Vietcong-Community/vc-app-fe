import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  required: {
    id: 'app.utils.validations.required',
    defaultMessage: 'Vyplňte povinné pole',
  },
  minValue: {
    id: 'app.utils.validations.minValue',
    defaultMessage: 'Minimální hodnota je {value}',
  },
  maxValue: {
    id: 'app.utils.validations.maxValue',
    defaultMessage: 'Maximální hodnota je {value}',
  },
  minLength: {
    id: 'app.utils.validations.minLength',
    defaultMessage: 'Minimální počet znaků je {length}',
  },
  maxLength: {
    id: 'app.utils.validations.maxLength',
    defaultMessage: 'Maximální počet znaků je {length}',
  },
  passwordValidation: {
    id: 'app.utils.validations.passwordValidation',
    defaultMessage:
      'Heslo musí obsahovat alespoň jedno velké písmeno, malé písmeno, číslici a speciální znak v délce 8-20 znaků.',
  },
  passwordConfirm: {
    id: 'app.utils.validations.passwordConfirm',
    defaultMessage: 'Hesla se neshodují!',
  },
  emailValidation: {
    id: 'app.utils.validations.emailValidation',
    defaultMessage: 'Email není validní.',
  },
});
