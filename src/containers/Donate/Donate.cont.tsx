import React from 'react';

import { Image } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import qrCode from '../../assets/Donate/qr-code.jpg';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { H2 } from '../../components/Titles/H2/H2';
import { EXTERNAL_LINKS } from '../../constants/externalLinks';
import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../theme/theme';

import { messages } from './messages';

import * as S from './Donate.style';

export const DonateCont: React.FC = () => {
  const { formatMessage } = useIntl();
  const { width } = useWindowDimensions();
  const isSmallerThanMD = width < BreakPoints.md;
  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-how-to-play', title: <FormattedMessage {...messages.title} /> }]}>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={16} />
      <H1>
        <FormattedMessage {...messages.title} />
      </H1>
      <Gap defaultHeight={16} />
      <S.Content>
        <FormattedMessage {...messages.description} values={{ br: <Gap defaultHeight={24} /> }} />
        <Gap defaultHeight={32} />
        <Image src={qrCode} style={{ width: 200 }} />
        <Gap defaultHeight={48} />
        <H2>
          <FormattedMessage {...messages.subtitle} />
        </H2>
        <Gap defaultHeight={16} />
        <FormattedMessage {...messages.reasonsDescription} values={{ br: isSmallerThanMD ? ' ' : <br /> }} />
        <ul style={{ textAlign: 'start' }}>
          <li>
            <FormattedMessage {...messages.firstReason} />
          </li>
          <li>
            <FormattedMessage {...messages.secondReason} />
          </li>
          <li>
            <FormattedMessage {...messages.thirdReason} />
          </li>
          <li>
            <FormattedMessage {...messages.fourthReason} />
          </li>
        </ul>
        <Gap defaultHeight={32} />
        <a href={EXTERNAL_LINKS.TRANSPARENT_ACCOUNT} target="_blank">
          <S.AccountLink>
            <FormattedMessage {...messages.accountLink} />
          </S.AccountLink>
        </a>
        <br />
        <S.AccountLink>2803189459 / 2010</S.AccountLink>
        <br />

        <Gap defaultHeight={32} />
        <FormattedMessage {...messages.anonymousDonation} values={{ br: isSmallerThanMD ? ' ' : <br /> }} />
        <Gap defaultHeight={32} />
        <b>
          <FormattedMessage {...messages.donationAcknowledgment} />
        </b>
        <Gap defaultHeight={16} />
        <S.Acknowledgment>
          <FormattedMessage {...messages.acknowledgment} />
        </S.Acknowledgment>
        <Gap defaultHeight={16} />
        <Image src={qrCode} style={{ width: 200 }} />
      </S.Content>
      <Gap defaultHeight={64} height={{ md: 32 }} />
    </ContentLayout>
  );
};
