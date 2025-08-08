import React from 'react';

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import bambiPic from '../../assets/AboutUsPage/bambi3.webp';
import bascciPic from '../../assets/AboutUsPage/bascci.webp';
import communityPic from '../../assets/AboutUsPage/community_mcrvc1.png';
import hhackerPic from '../../assets/AboutUsPage/hhacker.webp';
import trapperPic from '../../assets/AboutUsPage/trapper4.webp';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { H2 } from '../../components/Titles/H2/H2';
import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../theme/theme';

import { messages } from './messages';

import * as S from './AboutUs.style';

export const AboutUsCont: React.FC = () => {
  const { width } = useWindowDimensions();
  const { formatMessage } = useIntl();
  const isSmallerThanMd = width < BreakPoints.md;
  const mobileOffset = width / 2;
  console.log(mobileOffset);

  return (
    <>
      <Helmet title={formatMessage(messages.title)} />
      <ContentLayout breadcrumbItems={[{ key: 'bc-aboutUs', title: <FormattedMessage {...messages.title} /> }]}>
        <S.Container>
          <H1>
            <FormattedMessage {...messages.title} />
          </H1>
          <S.Section>
            <S.SectionText>
              <H2>
                <FormattedMessage {...messages.aboutUsTitle} />
              </H2>
              <p>
                <FormattedMessage {...messages.aboutUs} />
              </p>
            </S.SectionText>
            <S.SectionImage src={communityPic} alt="Komunita" width="50%" style={{ maxWidth: '32%' }} />
          </S.Section>
          <Gap defaultHeight={28} />
          <S.Section>
            <S.SectionText>
              <H2>
                <FormattedMessage {...messages.whoIsHidingTitle} />
              </H2>
              <p>
                <FormattedMessage {...messages.whoIsHiding} />
              </p>
            </S.SectionText>
          </S.Section>
          <Gap defaultHeight={18} height={{ md: 0 }} />
          <motion.div
            initial={{ x: isSmallerThanMd ? mobileOffset : 400, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: isSmallerThanMd, amount: 0.3 }}
          >
            <S.Section>
              <S.SectionImage src={trapperPic} alt={'Trapper'} />
              <S.SectionText>
                <H2>
                  <FormattedMessage {...messages.trapperTitle} />
                </H2>
                <p>
                  <FormattedMessage {...messages.trapper} />
                </p>
              </S.SectionText>
            </S.Section>
          </motion.div>
          <motion.div
            initial={{ x: isSmallerThanMd ? -mobileOffset : -400, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: isSmallerThanMd, amount: 0.3 }}
          >
            <S.Section $revertOnMobile>
              <S.SectionText>
                <H2>
                  <FormattedMessage {...messages.hhackerTitle} />
                </H2>
                <p>
                  <FormattedMessage {...messages.hhacker} />
                </p>
              </S.SectionText>
              <S.SectionImage src={hhackerPic} alt={'hhacker'} />
            </S.Section>
          </motion.div>
          <motion.div
            initial={{ x: isSmallerThanMd ? mobileOffset : 400, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: isSmallerThanMd, amount: 0.3 }}
          >
            <S.Section>
              <S.SectionImage src={bascciPic} alt={'Bascci'} />
              <S.SectionText>
                <H2>
                  <FormattedMessage {...messages.bascciTitle} />
                </H2>
                <p>
                  <FormattedMessage {...messages.bascci} />
                </p>
              </S.SectionText>
            </S.Section>
          </motion.div>
          <motion.div
            initial={{ x: isSmallerThanMd ? -mobileOffset : -400, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: isSmallerThanMd, amount: 0.3 }}
          >
            <S.Section $revertOnMobile>
              <S.SectionText>
                <H2>
                  <FormattedMessage {...messages.bambiTitle} />
                </H2>
                <p>
                  <FormattedMessage {...messages.bambi} />
                </p>
              </S.SectionText>
              <S.SectionImage src={bambiPic} alt={'Bambi'} />
            </S.Section>
          </motion.div>
        </S.Container>
        <Gap defaultHeight={48} />
      </ContentLayout>
    </>
  );
};
