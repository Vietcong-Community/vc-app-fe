import { UploadFile } from 'antd';
import axios from 'axios';

const fileToBinary = async (file: UploadFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const binaryData = reader.result;
      resolve(binaryData);
    };
    reader.onerror = () => {
      reject(new Error('Unable to read the file as binary data'));
    };
    reader.readAsArrayBuffer(file as unknown as Blob);
  });
};

export const uploadFileWithPresignedUrl = async (file: UploadFile, uploadUrl: string) => {
  const binaries = await fileToBinary(file);

  await axios.put(uploadUrl, binaries, {
    headers: { 'x-amz-acl': 'public-read', 'Content-Type': 'image/png' },
  });
};
