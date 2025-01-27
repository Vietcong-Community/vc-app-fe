import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Spin, UploadFile } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAvatarUploadUrl, useUpdateMe, useUserMe } from '../../../api/hooks/auth/api';
import { useConfirmImageUploadUrl } from '../../../api/hooks/files/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { useRouter } from '../../../hooks/RouterHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../routes/enums';
import { uploadFileWithPresignedUrl } from '../../../utils/fileUtils';

import { IFormData } from './EditProfile.fields';
import { EditProfileForm } from './EditProfile.form';
import { messages } from './messages';

export const EditProfileCont: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const userMe = useUserMe('always', undefined);
  const updateMe = useUpdateMe();
  const avatarUrl = useAvatarUploadUrl();
  const confirmUpload = useConfirmImageUploadUrl();

  useEffect(() => {
    if (userMe.isError) {
      navigate(Routes.LOGIN);
    }
  }, [userMe.isError]);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateMe.mutateAsync(values);
      queryClient.removeQueries({ queryKey: ['userDetail', userMe.data?.id] });
      showNotification(messages.updateSuccess);

      try {
        if (fileList.length > 0) {
          const avatarName = fileList?.[0]?.name;
          if (avatarName) {
            const response = await avatarUrl.mutateAsync({ fileName: avatarName });

            await uploadFileWithPresignedUrl(fileList?.[0], response.uploadUrl);

            await confirmUpload.mutateAsync({ fileId: response.fileId });
          }
          showNotification(messages.avatarUploadSuccess);
        }
      } catch {
        showNotification(messages.avatarUploadFailed);
      }
      navigate(Routes.USER_PROFILE.replace(':id', userMe.data?.id ?? ''));
    } catch {
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
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-profile',
          onClick: () => navigate(Routes.USER_PROFILE.replace(':id', userMe.data?.id ?? '')),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.profileBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-edit',
          title: <FormattedMessage {...messages.title} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <EditProfileForm
          fileList={fileList}
          initialValues={initialValues}
          isSubmitting={updateMe.isPending}
          onSubmit={onSubmit}
          setFileList={setFileList}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
