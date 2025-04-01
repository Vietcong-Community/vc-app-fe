import React from 'react';

import { BackwardFilled, ForwardFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import loginPic from '../../assets/loginPic.png';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../components/Titles/H1/H1';
import { Routes } from '../../routes/enums';

import { messages } from './messages';

import * as S from './AboutUs.style';

export const AboutUsCont: React.FC = () => {
  return (
    <>
      <ContentLayout breadcrumbItems={[{ key: 'bc-mcrvc', title: <FormattedMessage {...messages.title} /> }]}>
        <S.Container>
          <H1>
            <FormattedMessage {...messages.title} />
          </H1>
          <S.Content>
            <p>
              <FormattedMessage
                {...messages.description}
                values={{
                  liga: (chunks) => (
                    <S.Link>
                      <ForwardFilled />
                      <a href={Routes.LEAGUE} rel="noopener noreferrer">
                        {chunks}
                      </a>
                      <BackwardFilled />
                    </S.Link>
                  ),
                  mcrvc: (chunks) => (
                    <S.Link>
                      <ForwardFilled />
                      <a href={Routes.CHAMPIONSHIP} rel="noopener noreferrer">
                        {chunks}
                      </a>
                      <BackwardFilled />
                    </S.Link>
                  ),
                }}
              />
            </p>
            <p style={{ fontSize: 'small' }}>(Už mi došly prachy na Trappera a hhacker odmítá dělat FE..)</p>
            <Gap defaultHeight={5} />
            <S.Image src={loginPic} alt="" />
          </S.Content>
        </S.Container>
        <Gap defaultHeight={32} />
      </ContentLayout>
    </>
  );
};
