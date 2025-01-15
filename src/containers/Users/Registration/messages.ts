import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.Users.Registration.title',
    defaultMessage: 'Registrace',
  },
  nicknameLabel: {
    id: 'app.containers.Users.Registration.nicknameLabel',
    defaultMessage: 'Nick ve hře',
  },
  emailLabel: {
    id: 'app.containers.Users.Registration.emailLabel',
    defaultMessage: 'Email',
  },
  passwordLabel: {
    id: 'app.containers.Users.Registration.passwordLabel',
    defaultMessage: 'Heslo',
  },
  confirmPasswordLabel: {
    id: 'app.containers.Users.Registration.confirmPasswordLabel',
    defaultMessage: 'Heslo znovu',
  },
  registerButtonLabel: {
    id: 'app.containers.Users.Registration.loginButtonLabel',
    defaultMessage: 'Registrovat',
  },
  registerFailed: {
    id: 'app.containers.Users.Registration.registerFailed',
    defaultMessage: 'Nastala chyba při registraci',
  },
  agreementCBLabel: {
    id: 'app.containers.Users.Registration.agreementCBLabel',
    defaultMessage: 'Souhlasím s <a>podmínkami používání</a>',
  },
  registrationSuccessTitle: {
    id: 'app.containers.Users.Registration.registrationSuccessTitle',
    defaultMessage: 'Registrace byla úspěšná',
  },
  registrationSuccessDisclaimer: {
    id: 'app.containers.Users.Registration.registrationSuccessDisclaimer',
    defaultMessage:
      'Jménem tvůrců webu hhackera, Trappera, Bascciho, M.Polcara' +
      ' a celé Vietcong komunity Vám děkujeme za registraci.',
  },
  activationInstructions: {
    id: 'app.containers.Users.Registration.activationInstructions',
    defaultMessage: 'Pro aktivaci vašeho účtu klikněte na odkaz, který vám byl zaslán na email: <b>{email}</b>',
  },
});
