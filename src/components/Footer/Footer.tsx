import React, { useContext } from 'react';

import { DiscordFilled, FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

import footerDarkBg from '../../assets/heli-footer-dark-design.webp';
import footerLightBg from '../../assets/heli-footer-light-design.webp';
import { EXTERNAL_LINKS } from '../../constants/externalLinks';
import { useRouter } from '../../hooks/RouterHook';
import { ThemeContext } from '../../providers/ThemeProvider/ThemeContext';
import { ThemeType } from '../../providers/ThemeProvider/constants';
import { Routes } from '../../routes/enums';
import { theme } from '../../theme/theme';
import { Gap } from '../Gap/Gap';

import { messages } from './messages';

import * as S from './Footer.style';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { selectedTheme } = useContext(ThemeContext);

  return (
    <S.Background $image={selectedTheme === ThemeType.LIGHT ? footerLightBg : footerDarkBg}>
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
            <S.Link onClick={() => navigate(Routes.LEAGUE)}>
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
            {/*
            <S.Link>
              <a href={EXTERNAL_LINKS.XS_STORE} target={'_blank'}>
                <FormattedMessage {...messages.xsStore} />
              </a>
            </S.Link>
            <S.Link>
              <a href={EXTERNAL_LINKS.ELECTRA_DRIVE} target={'_blank'}>
                <FormattedMessage {...messages.electraDrive} />
              </a>
            </S.Link>
            */}
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
          <S.Hosting>
            <FormattedMessage
              {...messages.hosting}
              values={{
                xscz: (chunks) => (
                  <S.Link>
                    <a href={EXTERNAL_LINKS.XS_STORE} target="_blank" rel="noopener noreferrer">
                      {chunks}
                    </a>
                  </S.Link>
                ),
                electra: (chunks) => (
                  <S.Link>
                    <a href={EXTERNAL_LINKS.ELECTRA_DRIVE} target="_blank" rel="noopener noreferrer">
                      {chunks}
                    </a>
                  </S.Link>
                ),
              }}
            />
          </S.Hosting>
          <S.CopyRight>
            <FormattedMessage {...messages.copyright} />
          </S.CopyRight>
          <S.Socials>
            <a href={EXTERNAL_LINKS.FACEBOOK} target={'_blank'}>
              <S.IconWrapper>
                <FacebookFilled />
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
          </S.Socials>
        </S.CopyrightAndSocialsLevel>
      </S.FooterContainer>
    </S.Background>
  );
};
