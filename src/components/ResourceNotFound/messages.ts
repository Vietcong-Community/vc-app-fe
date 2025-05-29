import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.ResourceNotFound.title',
    defaultMessage: '{value} se nepodařilo najít',
  },
  notSpecified: {
    id: 'app.components.ResourceNotFound.notSpecified',
    defaultMessage: 'Obsah',
  },
  description: {
    id: 'app.components.ResourceNotFound.description',
    defaultMessage:
      'Buď si špatně klikl nebo tu máme nějakou chybičku. <b>Tady nic nenajdeš.</b> Pokud jsi si ' +
      'jistý, že by tu něco mělo být, zkopíruj URL a pošli ji hhackerovi nebo Trapperovi.',
  },
  goToHomePage: {
    id: 'app.components.ResourceNotFound.goToHomePage',
    defaultMessage: 'Domovská stránka',
  },
  goBack: {
    id: 'app.components.ResourceNotFound.goBack',
    defaultMessage: 'Zpět',
  },
});
