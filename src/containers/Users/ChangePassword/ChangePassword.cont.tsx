import React, { ReactNode } from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useChangePasswordWithToken } from '../../../api/hooks/auth/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './ChangePassword.fields';
import { ChangePasswordForm } from './ChangePassword.form';
import { messages } from './messages';

import * as S from './ChangePassword.style';

export const ChangePasswordCont: React.FC = () => {
  const { navigate, query } = useRouter<{ token: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const changePassword = useChangePasswordWithToken();
  console.log(query.token);

  const onSubmit = async (values: IFormData) => {
    try {
      await changePassword.mutateAsync({ password: values.password, token: query.token });
    } catch (e) {
      showNotification(messages.passwordResetRequestFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <>
      <Helmet title={formatMessage(messages.title)} />
      <ContentLayout>
        <Gap defaultHeight={48} height={{ md: 32 }} />
        {!changePassword.isSuccess && (
          <ChangePasswordForm isSubmitting={changePassword.isPending} onSubmit={onSubmit} />
        )}
        {changePassword.isSuccess && (
          <>
            <H1>
              <FormattedMessage {...messages.successTitle} />
            </H1>
            <span>
              <FormattedMessage
                {...messages.successDescription}
                values={{
                  link: (msg: ReactNode) => <S.LinkButton onClick={() => navigate(Routes.LOGIN)}>{msg}</S.LinkButton>,
                }}
              />
            </span>
          </>
        )}
        <Gap defaultHeight={48} />
      </ContentLayout>
    </>
  );
};
