import React from 'react';

import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRegisterUsers } from '../../api/hooks/registration/api';
import { useNotifications } from '../../hooks/NotificationsHook';
import { useRouter } from '../../hooks/RouterHook';
import { NotificationType } from '../../providers/NotificationsProvider/enums';
import { Routes } from '../../routes/enums';

import { IFormData } from './Registration.fields';
import { RegistrationForm } from './Registration.form';
import { messages } from './messages';

export const RegistrationCont: React.FC = () => {
  const { navigate } = useRouter();
  const { showNotification } = useNotifications();
  const registerUser = useRegisterUsers();
  const { formatMessage } = useIntl();
  const onSubmit = async (values: IFormData) => {
    try {
      await registerUser.mutateAsync(values);
      navigate(Routes.REGISTRATION_SUCCESS);
    } catch (e) {
      // TODO Handle error
      console.error(e);
      showNotification(messages.registerFailed, undefined, NotificationType.ERROR);
    }
  };
  return (
    <>
      <Helmet title={formatMessage(messages.createTitle)} />
      <RegistrationForm
        isSubmitting={registerUser.isPending}
        onSubmit={onSubmit}
        title={<FormattedMessage {...messages.createTitle} />}
      />
    </>
  );
};
