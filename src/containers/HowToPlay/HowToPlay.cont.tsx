import React from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import discordLogo from '../../assets/HomePage/discord.svg';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { H2 } from '../../components/Titles/H2/H2';
import { EXTERNAL_LINKS } from '../../constants/externalLinks';

import { messages } from './messages';

import * as S from './HowToPlay.style';

export const HowToPlayCont: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <ContentLayout>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={16} />
      <H1>
        <FormattedMessage {...messages.title} />
      </H1>
      <Gap defaultHeight={16} />
      <FormattedMessage
        tagName="span"
        {...messages.subtitle}
        values={{ b: (msg) => <S.BoldColoredText>{msg}</S.BoldColoredText> }}
      />
      <Gap defaultHeight={16} />
      <S.Content>
        <FormattedMessage {...messages.description} />
      </S.Content>
      <Gap defaultHeight={32} />
      <H2>
        <FormattedMessage {...messages.firstStepTitle} />
      </H2>
      <Gap defaultHeight={16} />
      <S.Content style={{ textAlign: 'start' }}>
        <FormattedMessage {...messages.firstStep} />
        <br />
        <FormattedMessage
          {...messages.unzip}
          values={{ i: (msg) => <span style={{ fontStyle: 'italic', fontWeight: 500 }}>{msg}</span> }}
        />
      </S.Content>
      <Gap defaultHeight={32} />
      <H2>
        <FormattedMessage {...messages.secondStepTitle} />
      </H2>
      <Gap defaultHeight={16} />
      <S.Content style={{ textAlign: 'start' }}>
        <FormattedMessage {...messages.secondStep} />
        <ol>
          <li>
            <FormattedMessage {...messages.listItem1} />
          </li>
          <li>
            <FormattedMessage {...messages.listItem2} />
          </li>
          <li>
            <FormattedMessage {...messages.listItem3} />
          </li>
          <li>
            <FormattedMessage {...messages.listItem4} />
          </li>
        </ol>
        <FormattedMessage {...messages.justPlay} />
      </S.Content>
      <Gap defaultHeight={32} />
      <H2>
        <FormattedMessage {...messages.thirdStepTitle} />
      </H2>
      <Gap defaultHeight={16} />
      <S.Content style={{ textAlign: 'start' }}>
        <FormattedMessage {...messages.thirdStep} />
        <ol>
          <li>
            <FormattedMessage {...messages.thirdStepItem1} />
          </li>
          <li>
            <FormattedMessage {...messages.thirdStepItem2} />
          </li>
          <li>
            <FormattedMessage {...messages.thirdStepItem3} />
          </li>
          <li>
            <FormattedMessage {...messages.thirdStepItem4} />
          </li>
        </ol>
      </S.Content>
      <Gap defaultHeight={32} />
      <H2>
        <FormattedMessage {...messages.forthStepTitle} />
      </H2>
      <Gap defaultHeight={16} />
      <S.Content style={{ textAlign: 'start' }}>
        <FormattedMessage
          {...messages.forthStep}
          values={{ i: (msg) => <span style={{ fontStyle: 'italic', fontWeight: 500 }}>{msg}</span> }}
        />
        <br />
        <FormattedMessage
          {...messages.hostsFile}
          values={{ i: (msg) => <span style={{ fontStyle: 'italic', fontWeight: 500 }}>{msg}</span> }}
        />
      </S.Content>
      <Gap defaultHeight={32} />
      <H2>
        <FormattedMessage {...messages.fifthStepTitle} />
      </H2>
      <Gap defaultHeight={16} />
      <S.Content>
        <FormattedMessage
          {...messages.fifthStep}
          values={{
            b: (msg) => (
              <a href={EXTERNAL_LINKS.DISCORD} target={'_blank'} style={{ fontWeight: 'bold' }}>
                {msg}
              </a>
            ),
          }}
        />
        <Gap defaultHeight={32} />
        <a href={EXTERNAL_LINKS.DISCORD} target={'_blank'}>
          <img src={discordLogo} alt="discord" style={{ maxWidth: 600, width: '100%' }} />
        </a>
        <Gap defaultHeight={32} />
      </S.Content>
    </ContentLayout>
  );
};
