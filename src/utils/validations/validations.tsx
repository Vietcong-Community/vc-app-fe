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

const EMAIL_REGEX =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\\.,;:\s@"%À-ÖØ-öø-ž]+(\.[^<>()[\]\\.,;:\s@"%À-ÖØ-öø-ž]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmailValid = () => ({
  validator: (_unused: object, value: string) => {
    if (value) {
      const cleanValue = `${value}`.replace(/ /g, '');
      if (cleanValue && !EMAIL_REGEX.test(cleanValue)) {
        return Promise.reject();
      }
    }
    return Promise.resolve();
  },
  message: <FormattedMessage {...messages.emailValidation} />,
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

export const minValue = (minValue: number) => ({
  validator: (_unused: object, value: number) => {
    if (isNaN(value) && value >= minValue) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  },
  message: <FormattedMessage {...messages.minValue} values={{ minValue }} />,
});

export const maxValue = (maxValue: number) => ({
  validator: (_unused: object, value: number) => {
    if (isNaN(value) && value <= maxValue) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  },
  message: <FormattedMessage {...messages.maxValue} values={{ maxValue }} />,
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
