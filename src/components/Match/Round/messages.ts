import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  screenshot: {
    id: 'app.components.Match.Round.screenshot',
    defaultMessage: 'Screenshot',
  },
  statistics: {
    id: 'app.components.Match.Round.statistics',
    defaultMessage: 'Statistiky',
  },
  screenshotUploadSuccess: {
    id: 'app.components.Match.Round.screenshotUploadSuccess',
    defaultMessage: 'Screenshot úspěšně nahrán',
  },
  screenshotUploadFailed: {
    id: 'app.components.Match.Round.screenshotUploadFailed',
    defaultMessage: 'Screenshot se nepodařilo nahrát, Trapper je taková lopata, že neumí udělat uložení obrázku.',
  },
  delete: {
    id: 'app.components.Match.Round.delete',
    defaultMessage: 'Smazat',
  },
  screenshotDeleteFailed: {
    id: 'app.components.Match.Round.screenshotDeleteFailed',
    defaultMessage: 'Screenshot se nesmazal, asi nechce být zapomenut.',
  },
  createdBy: {
    id: 'app.components.Match.Round.createdBy',
    defaultMessage: 'Vytvořil: {nickname}, {date}',
  },
  roundUpdate: {
    id: 'app.components.Match.Round.roundUpdate',
    defaultMessage: 'Upravit kolo',
  },
  roundDelete: {
    id: 'app.components.Match.Round.roundDelete',
    defaultMessage: 'Smazat kolo',
  },
  addStats: {
    id: 'app.components.Match.Round.addStats',
    defaultMessage: 'Přidat statistiky hráče',
  },
  removeStats: {
    id: 'app.components.Match.Round.removeStats',
    defaultMessage: 'Odstranit statistiky hráče',
  },
  statisticsByFile: {
    id: 'app.components.Match.Round.statisticsByFile',
    defaultMessage: 'MP result',
  },
});
