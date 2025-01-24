import React, { ReactNode, useState } from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useForgottenPasswordRequest } from '../../../api/hooks/auth/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './ForgottenPassword.fields';
import { ForgottenPasswordForm } from './ForgottenPassword.form';
import { messages } from './messages';

import * as S from '../Registration/Registration.style';

export const ForgottenPasswordCont: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const [userMail, setUserMail] = useState<string | undefined>(undefined);

  const forgottenPassword = useForgottenPasswordRequest();

  const onSubmit = async (values: IFormData) => {
    try {
      setUserMail(values.email);
      await forgottenPassword.mutateAsync(values);
    } catch (e) {
      showNotification(messages.passwordResetRequestFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <>
      <Helmet title={formatMessage(messages.title)} />
      <ContentLayout
        breadcrumbItems={[
          {
            key: 'bc-password',
            title: <FormattedMessage {...messages.title} />,
          },
        ]}
      >
        <Gap defaultHeight={48} height={{ md: 32 }} />
        {!forgottenPassword.isSuccess && (
          <ForgottenPasswordForm
            goBackToLogin={() => navigate(Routes.LOGIN)}
            isSubmitting={forgottenPassword.isPending}
            onSubmit={onSubmit}
          />
        )}
        {forgottenPassword.isSuccess && (
          <>
            <H1>
              <FormattedMessage {...messages.successTitle} />
            </H1>
            <p>
              <FormattedMessage
                {...messages.successDescription}
                values={{ email: userMail, b: (msg: ReactNode) => <S.Email>{msg}</S.Email> }}
              />
            </p>
          </>
        )}
        <Gap defaultHeight={48} />
      </ContentLayout>
    </>
  );
};
