import React, { useEffect } from 'react';

import { FormattedMessage } from 'react-intl';

import { H1 } from '../../components/Titles/H1/H1';
import { useRouter } from '../../hooks/RouterHook';
import { Routes } from '../../routes/enums';

import { messages } from './messages';

import * as S from './NotFoundPage.style';

export const NotFoundPage: React.FC = () => {
  const { pathname, navigate } = useRouter();

  useEffect(() => {
    if (window.location.pathname !== Routes.NOT_FOUND) {
      console.warn(`Stranka nenalezena - ${pathname}`);
      navigate(Routes.NOT_FOUND);
    }
  }, []);

  return (
    <S.Container>
      <H1>
        <FormattedMessage {...messages.title} />
      </H1>
      STRANKA NEEXISTUJE
      <br />
      // TODO NEJAKY OBRAZEK ASI JE NA HRADBACH
    </S.Container>
  );
};
