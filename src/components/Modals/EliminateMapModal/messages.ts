import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.EliminateMapModal.title',
    defaultMessage: 'Potvrzení vyškrtnutí mapy',
  },
  description: {
    id: 'app.components.Modals.EliminateMapModal.description',
    defaultMessage: 'Opravdu chceš mapu {name} vyškrtnout?',
  },
  eliminateSuccess: {
    id: 'app.components.Modals.EliminateMapModal.eliminateSuccess',
    defaultMessage: 'Mapa vyškrtnuta, nyní uvidíme, čeho se bojí soupeř.',
  },
  eliminateError: {
    id: 'app.components.Modals.EliminateMapModal.eliminateError',
    defaultMessage: 'Něco se posralo. Evidentně neumíme naprogramovat ani škrtání map.',
  },
  eliminateErrorDescription: {
    id: 'app.components.Modals.EliminateMapModal.eliminateErrorDescription',
    defaultMessage: 'Zkus obnovit stránku, zda máš opravdu možnost právě škrtat, případně kontaktuj adminy.',
  },
});
