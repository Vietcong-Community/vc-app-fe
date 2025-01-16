import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Users.ChangePassword.title',
    defaultMessage: 'Změna hesla',
  },
  description: {
    id: 'app.containers.Users.ChangePassword.description',
    defaultMessage: 'Vytvořte si nové heslo pro přihlášení do aplikace.',
  },
  passwordLabel: {
    id: 'app.containers.Users.Registration.passwordLabel',
    defaultMessage: 'Heslo',
  },
  confirmPasswordLabel: {
    id: 'app.containers.Users.Registration.confirmPasswordLabel',
    defaultMessage: 'Heslo znovu',
  },
  submitButton: {
    id: 'app.containers.Users.ChangePassword.submitButton',
    defaultMessage: 'Uložit',
  },
  passwordResetRequestFailed: {
    id: 'app.containers.Users.ChangePassword.passwordResetRequestFailed',
    defaultMessage: 'Něco se pokazilo. Zkuste to prosím později, nebo kontaktujte adminy.',
  },
  successTitle: {
    id: 'app.containers.Users.ChangePassword.successTitle',
    defaultMessage: 'Heslo bylo změněno!',
  },
  successDescription: {
    id: 'app.containers.Users.ChangePassword.successDescription',
    defaultMessage: 'Nyní se můžete přihlásit <link>zde</link>.',
  },
});
