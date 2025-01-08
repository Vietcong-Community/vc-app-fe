import React from 'react';

import {
  TwitchFilled,
  FacebookFilled,
  InstagramFilled,
  TikTokFilled,
  YoutubeFilled,
  DiscordFilled,
} from '@ant-design/icons';
import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

import { EXTERNAL_LINKS } from '../../constants/externalLinks';
import { useRouter } from '../../hooks/RouterHook';
import { Routes } from '../../routes/enums';
import { theme } from '../../theme/theme';
import { Gap } from '../Gap/Gap';

import { messages } from './messages';

import * as S from './Footer.style';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  return (
    <S.Background>
      <S.FooterContainer>
        <h4 style={{ marginTop: '1rem', marginBottom: 0 }}>
          <FormattedMessage {...messages.about} />
        </h4>
        <FormattedMessage {...messages.aboutContent} />
        <Gap defaultHeight={24} height={{ md: 16 }} />
        <S.ColumnsContainer>
          <S.Column>
            <h4 style={{ marginTop: '1rem', marginBottom: 0 }}>
              <FormattedMessage {...messages.quickLinks} />
            </h4>
            <S.Link onClick={() => navigate(Routes.LEAGUES_OVERVIEW)}>
              <FormattedMessage {...messages.leaguesOverview} />
            </S.Link>
            <S.Link onClick={() => navigate(Routes.STATISTICS)}>
              <FormattedMessage {...messages.statistics} />
            </S.Link>
            <S.Link onClick={() => navigate(Routes.MCRVC)}>
              <FormattedMessage {...messages.mcrvcKarez} />
            </S.Link>
          </S.Column>
          <S.Column>
            <h4 style={{ marginTop: '1rem', marginBottom: 0 }}>
              <FormattedMessage {...messages.sponsors} />
            </h4>
            <S.Link>
              <a href={EXTERNAL_LINKS.XS_STORE} target={'_blank'}>
                <FormattedMessage {...messages.xsStore} />
              </a>
            </S.Link>
          </S.Column>
          <S.Column>
            <h4 style={{ marginTop: '1rem', marginBottom: 0 }}>
              <FormattedMessage {...messages.contact} />
            </h4>
            <S.Link>
              <a href="mailto:support@vietconghub.eu">
                <FormattedMessage {...messages.contactEmail} />
              </a>
            </S.Link>
          </S.Column>
        </S.ColumnsContainer>
        <Gap defaultHeight={32} height={{ md: 16 }} />
        <Divider style={{ backgroundColor: theme.colors.white, margin: 0 }} />
        <Gap defaultHeight={16} />
        <S.CopyrightAndSocialsLevel>
          <FormattedMessage {...messages.copyright} />
          <S.Socials>
            <a href={EXTERNAL_LINKS.FACEBOOK} target={'_blank'}>
              <S.IconWrapper>
                <FacebookFilled />
              </S.IconWrapper>
            </a>
            <a href={EXTERNAL_LINKS.TWITCH} target={'_blank'}>
              <S.IconWrapper>
                <TwitchFilled />
              </S.IconWrapper>
            </a>
            <a href={EXTERNAL_LINKS.DISCORD} target={'_blank'}>
              <S.IconWrapper>
                <DiscordFilled />
              </S.IconWrapper>
            </a>
            <a href={EXTERNAL_LINKS.INSTAGRAM} target={'_blank'}>
              <S.IconWrapper>
                <InstagramFilled />
              </S.IconWrapper>
            </a>
            <a href={EXTERNAL_LINKS.YOUTUBE} target={'_blank'}>
              <S.IconWrapper>
                <YoutubeFilled />
              </S.IconWrapper>
            </a>
            <a href={EXTERNAL_LINKS.TIK_TOK} target={'_blank'}>
              <S.IconWrapper>
                <TikTokFilled />
              </S.IconWrapper>
            </a>
          </S.Socials>
        </S.CopyrightAndSocialsLevel>
      </S.FooterContainer>
    </S.Background>
  );
};
