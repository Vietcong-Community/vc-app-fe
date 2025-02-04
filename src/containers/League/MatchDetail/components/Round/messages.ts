import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  draw: {
    id: 'app.containers.League.MatchDetail.components.Round.draw',
    defaultMessage: 'REMÍZA',
  },
  screenshot: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshot',
    defaultMessage: 'Screenshot',
  },
  screenshotUploadSuccess: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshotUploadSuccess',
    defaultMessage: 'Screenshot úspěšně nahrán',
  },
  screenshotUploadFailed: {
    id: 'app.containers.League.MatchDetail.components.Round.screenshotUploadFailed',
    defaultMessage: 'Screenshot se nepodařilo nahrát, Trapper je taková lopata, že neumí udělat uložení obrázku.',
  },
});
