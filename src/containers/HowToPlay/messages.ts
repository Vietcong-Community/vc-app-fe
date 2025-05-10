import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'app.containers.HowToPlay.title',
    defaultMessage: 'Jak zprovoznit Vietcong',
  },
  subtitle: {
    id: 'app.containers.HowToPlay.subtitle',
    defaultMessage: '<b>Kompletní návod</b>: Vietcong Gold Edition (VC Starter 1.7 beta) + funkční multiplayer',
  },
  description: {
    id: 'app.containers.HowToPlay.description',
    defaultMessage:
      'Pokud si chceš zahrát Vietcong s plně funkčním multiplayerem, včetně možnosti vidět servery  doporučujeme ' +
      'stáhnout předpřipravený balíček Vietcong – Gold Edition s nástrojem VC Starter 1.7 beta, který vše ' +
      'výrazně zjednodušuje. Celý návod je zahrnuto do 5 kroků.',
  },
  firstStepTitle: {
    id: 'app.containers.HowToPlay.firstStepTitle',
    defaultMessage: '1. Stažení hry',
  },
  firstStep: {
    id: 'app.containers.HowToPlay.firstStep',
    defaultMessage: 'Stáhni si kompletní složku hry (už připravená, není třeba instalace): <link>ZDE</link>',
  },
  unzip: {
    id: 'app.containers.HowToPlay.unzip',
    defaultMessage: 'Po stažení soubor rozbal například do složky <i>C:\\Games\\Vietcong.</i>',
  },
  secondStepTitle: {
    id: 'app.containers.HowToPlay.secondStepTitle',
    defaultMessage: '2. Co obsahuje Gold Edition?',
  },
  secondStep: {
    id: 'app.containers.HowToPlay.secondStep',
    defaultMessage: 'Tato verze obsahuje:',
  },
  listItem1: {
    id: 'app.containers.HowToPlay.listItem1',
    defaultMessage: 'Vietcong + Fist Alpha (plná verze)',
  },
  listItem2: {
    id: 'app.containers.HowToPlay.listItem2',
    defaultMessage: 'Patch 1.60 CZ/EN',
  },
  listItem3: {
    id: 'app.containers.HowToPlay.listItem3',
    defaultMessage: 'VCStarter 1.7 beta (okno, rozlišení, alt+tab, widescreen, FPS unlock atd.)',
  },
  listItem4: {
    id: 'app.containers.HowToPlay.listItem4',
    defaultMessage: 'Oprava pro multiplayer (master server fix)',
  },
  justPlay: {
    id: 'app.containers.HowToPlay.justPlay',
    defaultMessage: 'Stačí jen spustit a hrát.',
  },
  thirdStepTitle: {
    id: 'app.containers.HowToPlay.thirdStepTitle',
    defaultMessage: '3. Spuštění hry',
  },
  thirdStep: {
    id: 'app.containers.HowToPlay.thirdStep',
    defaultMessage: 'Hru spouštěj přes soubor <b>VCStarter.exe</b>. Tím aktivuješ moderní launcher, kde můžeš:',
  },
  thirdStepItem1: {
    id: 'app.containers.HowToPlay.thirdStepItem1',
    defaultMessage: 'Nastavit rozlišení',
  },
  thirdStepItem2: {
    id: 'app.containers.HowToPlay.thirdStepItem2',
    defaultMessage: 'Spustit hru v okně / fullscreen',
  },
  thirdStepItem3: {
    id: 'app.containers.HowToPlay.thirdStepItem3',
    defaultMessage: 'Zapnout podporu moderních ovladačů',
  },
  thirdStepItem4: {
    id: 'app.containers.HowToPlay.thirdStepItem4',
    defaultMessage: 'Spravovat více profilů',
  },
  forthStepTitle: {
    id: 'app.containers.HowToPlay.forthStepTitle',
    defaultMessage: '4. Multiplayer – jak vidět servery',
  },
  forthStep: {
    id: 'app.containers.HowToPlay.forthStep',
    defaultMessage:
      'V hlavním menu hry zvol <i>„Multiplayer“</i> → <i>„Internet“</i>. Servery by se měly bez problému zobrazit.' +
      'Správně nainstalovaný master server fix (už je součástí složky)',
  },
  hostsFile: {
    id: 'app.containers.HowToPlay.hostsFile',
    defaultMessage:
      'Pokud přesto servery nevidíš, tak běž do <i>C:\\Windows\\System32\\drivers\\etc\\hosts</i> -> ' +
      'hosts otevři jako správce a do posledního řádku vlož <b>46.28.109.117 master.gamespy.com</b> ->' +
      ' potom notepad ulož a zapni hru. Servery by měly naskočit.',
  },
  fifthStepTitle: {
    id: 'app.containers.HowToPlay.fifthStepTitle',
    defaultMessage: '5. Doporučení navíc',
  },
  fifthStep: {
    id: 'app.containers.HowToPlay.fifthStep',
    defaultMessage:
      'Kdyby sis nevěděl rady, zajdi na <b>discord</b>, kde ti komunita poradí s jakýmkoliv problémem' +
      ', abys s námi mohl hrát.',
  },
});
