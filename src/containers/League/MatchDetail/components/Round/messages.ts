import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  screenshot: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshot',
    defaultMessage: 'Screenshot',
  },
  statistics: {
    id: 'app.containers.League.MatchDetail.components.Round.statistics',
    defaultMessage: 'Statistiky',
  },
  screenshotUploadSuccess: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshotUploadSuccess',
    defaultMessage: 'Screenshot úspěšně nahrán',
  },
  screenshotUploadFailed: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshotUploadFailed',
    defaultMessage: 'Screenshot se nepodařilo nahrát, Trapper je taková lopata, že neumí udělat uložení obrázku.',
  },
  delete: {
    id: 'app.containers.League.MatchDetail.components.Round.delete',
    defaultMessage: 'Smazat',
  },
  screenshotDeleteFailed: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshotDeleteFailed',
    defaultMessage: 'Screenshot se nesmazal, asi nechce být zapomenut.',
  },
  createdBy: {
    id: 'app.containers.League.MatchDetail.components.Round.createdBy',
    defaultMessage: 'Vytvořil: {nickname}, {date}',
  },
  roundUpdate: {
    id: 'app.containers.League.MatchDetail.components.Round.roundUpdate',
    defaultMessage: 'Upravit kolo',
  },
  roundDelete: {
    id: 'app.containers.League.MatchDetail.components.Round.roundDelete',
    defaultMessage: 'Smazat kolo',
  },
});
