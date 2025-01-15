import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Users.ForgottenPassword.title',
    defaultMessage: 'Zapomenuté heslo',
  },
  description: {
    id: 'app.containers.Users.ForgottenPassword.description',
    defaultMessage: 'Pro obnovení hesla zadejte svojí e-mailovou adresu, na kterou vám zašleme odkaz.',
  },
  emailLabel: {
    id: 'app.containers.Users.ForgottenPassword.emailLabel',
    defaultMessage: 'Email',
  },
  submitButton: {
    id: 'app.containers.Users.ForgottenPassword.submitButton',
    defaultMessage: 'Odeslat',
  },
  backToLogin: {
    id: 'app.containers.Users.ForgottenPassword.backToLogin',
    defaultMessage: 'Zpět na přihlášení',
  },
  passwordResetRequestFailed: {
    id: 'app.containers.Users.ForgottenPassword.passwordResetRequestFailed',
    defaultMessage: 'Něco se pokazilo. Zkuste to prosím později, nebo kontaktujte adminy.',
  },
  successTitle: {
    id: 'app.containers.Users.ForgottenPassword.successTitle',
    defaultMessage: 'Žádost byla odeslána!',
  },
  successDescription: {
    id: 'app.containers.Users.ForgottenPassword.successDescription',
    defaultMessage: 'Pro obnovení hesla k účtu klikněte na odkaz, který vám byl zaslán na email: <b>{email}</b>',
  },
});
