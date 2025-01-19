import React, { useEffect } from 'react';

import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { useUpdateMe, useUserMe } from '../../../api/hooks/auth/api';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';

import { IFormData } from './EditProfile.fields';
import { EditProfileForm } from './EditProfile.form';
import { messages } from './messages';

export const EditProfileCont: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();

  const userMe = useUserMe('always', undefined);
  const updateMe = useUpdateMe();

  useEffect(() => {
    if (userMe.isError) {
      navigate(Routes.LOGIN);
    }
  }, [userMe.isError]);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateMe.mutateAsync(values);
      showNotification(messages.updateSuccess);
      navigate(Routes.USER_PROFILE.replace(':id', userMe.data?.id ?? ''));
    } catch (e) {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  const initialValues = {
    email: userMe.data?.email,
    nickname: userMe.data?.nickname,
    firstName: userMe.data?.firstName,
    lastName: userMe.data?.lastName,
    description: userMe.data?.description,
    facebookLink: userMe.data?.facebookLink,
    twitchLink: userMe.data?.twitchLink,
    steamLink: userMe.data?.steamLink,
  };
  const showLoading = !userMe.isFetchedAfterMount || userMe.isLoading;

  return (
    <ContentLayout>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      {!showLoading && (
        <EditProfileForm initialValues={initialValues} isSubmitting={updateMe.isPending} onSubmit={onSubmit} />
      )}
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
