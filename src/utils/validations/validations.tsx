import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const isRequired = {
  required: true,
  message: <FormattedMessage {...messages.required} />,
};

const passwordRegEx = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const isPasswordValid = () => ({
  validator: (_unused: object, value: string) => {
    const result = passwordRegEx.test(value);
    if (result && value?.length >= 8) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
  message: <FormattedMessage {...messages.passwordValidation} />,
});

export const minLength = (length: number) => ({
  validator: (_unused: object, value: string) => {
    if (value?.length < length) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  },
  message: <FormattedMessage {...messages.maxLength} values={{ length }} />,
});

export const maxLength = (length: number) => ({
  validator: (_unused: object, value: string) => {
    if (value?.length > length) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  },
  message: <FormattedMessage {...messages.maxLength} values={{ length }} />,
});

export const isPasswordSame = ({ getFieldValue }: { getFieldValue: (value: string) => string }) => ({
  validator(_unused: object, value: string) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  message: <FormattedMessage {...messages.passwordConfirm} />,
});
