import React from 'react';

import { FacebookFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { EXTERNAL_LINKS } from '../../constants/externalLinks';

import { messages } from './messages';

import * as S from './Mcrvc.style';

const SPRING_FB_LINK = 'https://www.facebook.com/events/645052631336457/';

export const McrvcCont: React.FC = () => {
  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-mcrvc', title: <FormattedMessage {...messages.title} /> }]}>
      <S.Container>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <S.Content>
          <FormattedMessage {...messages.description} />
          <Gap defaultHeight={32} />
          <S.Dates onClick={() => window.open(SPRING_FB_LINK, '_blank')} style={{ cursor: 'pointer' }}>
            <S.DateBox>
              <b>
                <FormattedMessage {...messages.spring} />
              </b>
              <span>25.&ndash;27. 4. 2025</span>
            </S.DateBox>
            <S.DateBox>
              <b>
                <FormattedMessage {...messages.autumn} />
              </b>
              <span>26.&ndash;28. 9. 2025</span>
            </S.DateBox>
          </S.Dates>
          <Gap defaultHeight={32} />

          <S.FacebookLink>
            <FormattedMessage {...messages.moreInfo} />
            <a href={EXTERNAL_LINKS.MCRVC_FACEBOOK} target={'_blank'}>
              <FacebookFilled />
            </a>
          </S.FacebookLink>
        </S.Content>
      </S.Container>
      <Gap defaultHeight={32} />
    </ContentLayout>
  );
};
