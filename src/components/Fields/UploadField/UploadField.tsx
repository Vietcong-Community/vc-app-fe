import React, { useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { GetProp, Image, Upload, UploadFile, UploadProps } from 'antd';

import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IProps {
  fileList?: UploadFile[];
  maxFiles?: number;
  setFileList: (fileList: UploadFile[]) => void;
}

export const UploadField: React.FC<IProps> = (props: IProps) => {
  const { fileList = [], maxFiles = 1, setFileList } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { showNotification } = useNotifications();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    onPreview: handlePreview,
    beforeUpload: (file) => {
      const isAllowedType = allowedMimeTypes.includes(file.type);

      if (!isAllowedType) {
        showNotification(messages.allowedPhotoMimeTypes, undefined, NotificationType.ERROR);
        return Upload.LIST_IGNORE;
      }
      setFileList([...fileList, file]);

      return false;
    },
    listType: 'picture-card',
    fileList,
  };

  return (
    <>
      <Upload {...uploadProps}>{fileList.length < maxFiles && <UploadOutlined />}</Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
