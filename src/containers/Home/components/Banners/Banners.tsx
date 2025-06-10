import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import discordLogo from '../../../../assets/HomePage/discord.svg';
import { Button } from '../../../../components/Button/Button';
import { MainButtonVariant } from '../../../../components/Button/enums';
import { Gap } from '../../../../components/Gap/Gap';
import { H2 } from '../../../../components/Titles/H2/H2';
import { EXTERNAL_LINKS } from '../../../../constants/externalLinks';
import { Routes } from '../../../../routes/enums';

import { messages } from './messages';

import * as S from './Banners.style';

export const Banners: React.FC = () => {
  return (
    <>
      <S.OtherBanners>
        <S.LeagueBanner>
          <H2>
            <FormattedMessage {...messages.leaguesTitle} />
          </H2>
          <FormattedMessage {...messages.leagues} />
          <ul style={{ marginTop: 12 }}>
            <li>
              <FormattedMessage {...messages.leaguesPlayers} />
            </li>
            <li>
              <FormattedMessage {...messages.leaguesCommunity} />
            </li>
            <li>
              <FormattedMessage {...messages.leaguesTraining} />
            </li>
            <li>
              <FormattedMessage {...messages.leaguesEmotions} />
            </li>
          </ul>
          <Link to={Routes.LEAGUE}>
            <Button variant={MainButtonVariant.OUTLINED} style={{ fontSize: 16, fontWeight: 600 }}>
              <FormattedMessage {...messages.leaguesLink} />
            </Button>
          </Link>
        </S.LeagueBanner>
        <S.RankedBanner>
          <H2>
            <FormattedMessage {...messages.rankedTitle} />
          </H2>
          <FormattedMessage {...messages.rankedDescription} />
          <ul style={{ marginTop: 12 }}>
            <li>
              <FormattedMessage {...messages.rankedPlayers} />
            </li>
            <li>
              <FormattedMessage {...messages.rankedPower} />
            </li>
            <li>
              <FormattedMessage {...messages.rankedTime} />
            </li>
            <li>
              <FormattedMessage {...messages.rankedStatistics} />
            </li>
            <li>
              <FormattedMessage {...messages.rankedResults} />
            </li>
          </ul>
          <Link to={'/kompetetivni-mod/644481d4-9f10-43d1-a4fc-d49c688b7a93'}>
            <Button variant={MainButtonVariant.OUTLINED} style={{ fontSize: 16, fontWeight: 600 }}>
              <FormattedMessage {...messages.rankedLink} />
            </Button>
          </Link>
        </S.RankedBanner>
      </S.OtherBanners>
      <Gap defaultHeight={32} />
      <S.OtherBanners>
        <S.ChampionshipBanner>
          <H2>
            <FormattedMessage {...messages.championshipTitle} />
          </H2>
          <b>
            <FormattedMessage {...messages.championshipSubTitle} />
          </b>
          <ul style={{ marginTop: 0 }}>
            <li>
              <FormattedMessage {...messages.championshipSpring} />
            </li>
            <li>
              <FormattedMessage {...messages.championshipAutumn} />
            </li>
          </ul>
          <FormattedMessage {...messages.otherLANSubTitle} />
          <Gap defaultHeight={16} />
          <Link to={Routes.CHAMPIONSHIP}>
            <Button variant={MainButtonVariant.OUTLINED} style={{ fontSize: 16, fontWeight: 600 }}>
              <FormattedMessage {...messages.championshipLink} />
            </Button>
          </Link>
        </S.ChampionshipBanner>
        <S.JoinBanner>
          <H2>
            <FormattedMessage {...messages.joinHubTitle} />
          </H2>
          <div style={{ fontWeight: 500 }}>
            <FormattedMessage {...messages.joinHub} values={{ br: <br /> }} />
          </div>
          <ul>
            <li>
              <FormattedMessage {...messages.joinHubFastRegistration} />
            </li>
            <li>
              <FormattedMessage {...messages.joinHubStats} />
            </li>
            <li>
              <FormattedMessage {...messages.joinHubLeagues} />
            </li>
          </ul>
          <Link to={Routes.REGISTRATION}>
            <Button variant={MainButtonVariant.OUTLINED} style={{ fontSize: 16, fontWeight: 600 }}>
              <FormattedMessage {...messages.joinHubLink} />
            </Button>
          </Link>
        </S.JoinBanner>
      </S.OtherBanners>
      <Gap defaultHeight={96} height={{ md: 32 }} />
      <H2>
        <FormattedMessage {...messages.discordTitle} />
      </H2>
      <Gap defaultHeight={16} />
      <S.DiscordContainer>
        <div style={{ maxWidth: 1000 }}>
          <FormattedMessage {...messages.discordPromo} />
        </div>
        <Gap defaultHeight={16} />
        <FormattedMessage
          {...messages.howToPlayLink}
          tagName="span"
          values={{
            link: (msg) => (
              <Link to={Routes.HOW_TO_PLAY}>
                <b>{msg}</b>
              </Link>
            ),
          }}
        />
        <Gap defaultHeight={16} />
        <a href={EXTERNAL_LINKS.DISCORD} target={'_blank'}>
          <b>
            <FormattedMessage {...messages.discordLink} />
          </b>
        </a>
        <Gap defaultHeight={32} />
        <a href={EXTERNAL_LINKS.DISCORD} target={'_blank'}>
          <img src={discordLogo} alt="discord" style={{ maxWidth: 600, width: '100%' }} />
        </a>
      </S.DiscordContainer>
    </>
  );
};
