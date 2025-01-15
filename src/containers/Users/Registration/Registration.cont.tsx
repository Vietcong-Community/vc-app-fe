import React, { ReactNode, useState } from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateUser } from '../../../api/hooks/auth/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { IFormData } from './Registration.fields';
import { RegistrationForm } from './Registration.form';
import { messages } from './messages';

import * as S from './Registration.style';

export const RegistrationCont: React.FC = () => {
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();
  const [userMail, setUserMail] = useState<string | undefined>('test.rixo.test.vojta+caasffa312f@seznam.cz');

  const createUser = useCreateUser();

  const onSubmit = async (values: IFormData) => {
    try {
      setUserMail(values.email);
      await createUser.mutateAsync({ nickname: values.nickname, password: values.password, email: values.email });
    } catch (e) {
      showNotification(messages.registerFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <ContentLayout>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={48} height={{ md: 32 }} />
      {!createUser.isSuccess && <RegistrationForm isSubmitting={createUser.isPending} onSubmit={onSubmit} />}
      {createUser.isSuccess && (
        <>
          <H1>
            <FormattedMessage {...messages.registrationSuccessTitle} />
          </H1>
          <p>
            <FormattedMessage {...messages.registrationSuccessDisclaimer} />
          </p>
          <p>
            <FormattedMessage
              {...messages.activationInstructions}
              values={{ email: userMail, b: (msg: ReactNode) => <S.Email>{msg}</S.Email> }}
            />
          </p>
        </>
      )}
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
