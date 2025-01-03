import React from 'react';

import {
  TwitchFilled,
  FacebookFilled,
  InstagramFilled,
  TikTokFilled,
  YoutubeFilled,
  MailFilled,
  PhoneFilled,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

import * as S from './Footer.style';

export const Footer: React.FC = () => {
  return (
    <>
      <S.Background>
        <S.FooterContainer>
          <S.FooterSection>
            <h3>
              <FormattedMessage {...messages.about} />
            </h3>
            <FormattedMessage {...messages.aboutContent} />
          </S.FooterSection>
          <S.FooterSection>
            <h3>
              <FormattedMessage {...messages.contact} />
            </h3>
            <FormattedMessage {...messages.author1} />
            <br />
            <FormattedMessage {...messages.author2} />
            <S.ContactIconWrapper>
              <MailFilled />
            </S.ContactIconWrapper>
            <FormattedMessage {...messages.contactEmail} />
            <S.ContactIconWrapper>
              <PhoneFilled />
            </S.ContactIconWrapper>
            <FormattedMessage {...messages.contactMobil} />
          </S.FooterSection>
          <S.FooterSection>
            <h3>
              <FormattedMessage {...messages.followUs} />
            </h3>
            <S.IconContainer>
              <a href="https://facebook.com">
                <S.IconWrapper>
                  <FacebookFilled />
                </S.IconWrapper>
              </a>
              <a href="https://twitch.com">
                <S.IconWrapper>
                  <TwitchFilled />
                </S.IconWrapper>
              </a>
              <a href="https://instagram.com">
                <S.IconWrapper>
                  <InstagramFilled />
                </S.IconWrapper>
              </a>
              <a href="https://youtube.com">
                <S.IconWrapper>
                  <YoutubeFilled />
                </S.IconWrapper>
              </a>
              <a href="https://tiktok.com">
                <S.IconWrapper>
                  <TikTokFilled />
                </S.IconWrapper>
              </a>
            </S.IconContainer>
          </S.FooterSection>
        </S.FooterContainer>
        <S.FooterContainer>
          <S.FooterSection>
            <h3>
              <FormattedMessage {...messages.sponsors} />
            </h3>
            <p>
              Bascciho vlasy &nbsp;&nbsp;| &nbsp;&nbsp; Trapperovo čas &nbsp;&nbsp;| &nbsp;&nbsp; Lintyho tým spectatorů
            </p>
            <hr />
            <FormattedMessage {...messages.title} />
          </S.FooterSection>
        </S.FooterContainer>
      </S.Background>
    </>
  );
};
