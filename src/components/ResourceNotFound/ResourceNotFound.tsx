import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from '../../hooks/RouterHook';
import { Routes } from '../../routes/enums';
import { Button } from '../Button/Button';
import { Gap } from '../Gap/Gap';
import { LinkButton } from '../LinkButton/LinkButton';
import { H2 } from '../Titles/H2/H2';

import { messages } from './messages';

import * as S from './ResourceNotFound.style';

interface IProps {
  name?: string;
}

export const ResourceNotFound: React.FC<IProps> = (props: IProps) => {
  const { name } = props;
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();

  const goBack = () => navigate(-1);
  const goToHomePage = () => navigate(Routes.HOME);

  return (
    <S.Container>
      <Gap defaultHeight={16} />
      <H2>
        <FormattedMessage {...messages.title} values={{ value: name ?? formatMessage(messages.notSpecified) }} />
      </H2>
      <Gap defaultHeight={16} />
      <div style={{ maxWidth: 600 }}>
        <FormattedMessage tagName="span" {...messages.description} />
      </div>
      <Gap defaultHeight={32} />
      <Button onClick={goToHomePage}>
        <FormattedMessage {...messages.goToHomePage} />
      </Button>
      <Gap defaultHeight={16} />
      <LinkButton onClick={goBack}>
        <FormattedMessage {...messages.goBack} />
      </LinkButton>
      <Gap defaultHeight={32} />
    </S.Container>
  );
};
