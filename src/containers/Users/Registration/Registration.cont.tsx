import React from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateUser } from '../../../api/hooks/auth/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './Registration.fields';
import { RegistrationForm } from './Registration.form';
import { messages } from './messages';

export const RegistrationCont: React.FC = () => {
  const { navigate } = useRouter();
  const { showNotification } = useNotifications();
  const { formatMessage } = useIntl();

  const createUser = useCreateUser();

  const onSubmit = async (values: IFormData) => {
    try {
      await createUser.mutateAsync({ nickname: values.nickname, password: values.password, email: values.email });
    } catch (e) {
      showNotification(messages.registerFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-registration',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={48} height={{ md: 32 }} />
      {!createUser.isSuccess && (
        <RegistrationForm
          goToLogin={() => navigate(Routes.LOGIN)}
          isSubmitting={createUser.isPending}
          onSubmit={onSubmit}
        />
      )}
      {createUser.isSuccess && (
        <>
          <H1>
            <FormattedMessage {...messages.registrationSuccessTitle} />
          </H1>
          <p>
            <FormattedMessage {...messages.registrationSuccessDisclaimer} />
          </p>
        </>
      )}
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
