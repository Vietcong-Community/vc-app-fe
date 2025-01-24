import React from 'react';

import { StarOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useLogin, useUserMe } from '../../../api/hooks/auth/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { setUserAuthenticationToken } from '../../../utils/storageUtils';

import { IFormData } from './Login.fields';
import { LoginForm } from './Login.form';
import { messages } from './messages';

import * as S from './Login.style';

export const LoginCont: React.FC = () => {
  const { navigate, query } = useRouter<{ redirect?: string }>();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const userMe = useUserMe(false, [401], false);

  const login = useLogin();

  const onSubmit = async (values: IFormData) => {
    try {
      const response = await login.mutateAsync(values);
      setUserAuthenticationToken(response.token);
      await userMe.refetch();
      if (query.redirect) {
        navigate(decodeURIComponent(query.redirect));
      } else {
        navigate(Routes.HOME);
      }
    } catch (e) {
      showNotification(messages.loginFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <>
      <ContentLayout
        breadcrumbItems={[
          {
            key: 'bc-login',
            title: <FormattedMessage {...messages.title} />,
          },
        ]}
      >
        <Helmet title={formatMessage(messages.title)} />
        <LoginForm
          goToRegistration={() => navigate(Routes.REGISTRATION)}
          goToResetPassword={() => navigate(Routes.FORGOTTEN_PASSWORD)}
          isSubmitting={login.isPending}
          onSubmit={onSubmit}
        />
        <Gap defaultHeight={0} height={{ md: 32 }} />
      </ContentLayout>
      <S.ClipPath>
        <S.LoginText>
          <S.SlideIn>
            <StarOutlined></StarOutlined>
            <FormattedMessage {...messages.slideTextA} />
          </S.SlideIn>
          <S.SlideIn>
            <StarOutlined></StarOutlined>
            <FormattedMessage {...messages.slideTextB} />
          </S.SlideIn>
        </S.LoginText>
      </S.ClipPath>
    </>
  );
};
