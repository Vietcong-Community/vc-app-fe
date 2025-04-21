import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.components.Modals.ResetMapPickModal.title',
    defaultMessage: 'Resetování škrtání map',
  },
  description: {
    id: 'app.components.Modals.ResetMapPickModal.description',
    defaultMessage: 'Opravdu chcete resetovat škrtání map? Týmy budou muset mapy škrtat znova.',
  },
  cancel: {
    id: 'app.components.Modals.ResetMapPickModal.cancel',
    defaultMessage: 'Zrušit',
  },
  confirm: {
    id: 'app.components.Modals.ResetMapPickModal.confirm',
    defaultMessage: 'Potvrdit',
  },
  revertSuccess: {
    id: 'app.components.Modals.ResetMapPickModal.revertSuccess',
    defaultMessage: 'Resetování bylo úspěšné',
  },
  revertFailed: {
    id: 'app.components.Modals.ResetMapPickModal.revertFailed',
    defaultMessage: 'Resetování se nezdařilo',
  },
});
