import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  createTitle: {
    id: 'app.containers.MixedLeague.SeasonForm.createTitle',
    defaultMessage: 'Vytvoření nové sezóny',
  },
  updateTitle: {
    id: 'app.containers.MixedLeague.SeasonForm.updateTitle',
    defaultMessage: 'Úprava sezóny',
  },
  nameLabel: {
    id: 'app.containers.MixedLeague.SeasonForm.nameLabel',
    defaultMessage: 'Název',
  },
  startDateLabel: {
    id: 'app.containers.MixedLeague.SeasonForm.startDateLabel',
    defaultMessage: 'Datum zahájení',
  },
  endDateLabel: {
    id: 'app.containers.MixedLeague.SeasonForm.endDateLabel',
    defaultMessage: 'Datum ukončení',
  },
  saveButtonLabel: {
    id: 'app.containers.MixedLeague.SeasonForm.saveButtonLabel',
    defaultMessage: 'Uložit',
  },
  cancelButtonLabel: {
    id: 'app.containers.MixedLeague.SeasonForm.cancelButtonLabel',
    defaultMessage: 'Zrušit',
  },
  createSuccess: {
    id: 'app.containers.MixedLeague.SeasonForm.createSuccess',
    defaultMessage: 'Sezóna úspěšně vytvořena',
  },
  updateSuccess: {
    id: 'app.containers.MixedLeague.SeasonForm.updateSuccess',
    defaultMessage: 'Sezóna úspěšně upravena',
  },
  createFailed: {
    id: 'app.containers.MixedLeague.SeasonForm.createFailed',
    defaultMessage: 'Sezónu se nepodařilo vytvořit',
  },
  updateFailed: {
    id: 'app.containers.MixedLeague.SeasonForm.updateFailed',
    defaultMessage: 'Sezónu se nepodařilo upravit',
  },
  seasonIsNotInTheStatusNew: {
    id: 'app.containers.MixedLeague.SeasonForm.seasonIsNotInTheStatusNew',
    defaultMessage: 'Sezóna musí být ve stavu Nová.',
  },
});
