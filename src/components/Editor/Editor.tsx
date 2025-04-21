import React from 'react';

import 'quill-color-picker-enhance/dist/index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ReactQuillRenderer } from '../ReactQuillRenderer/ReactQuillRenderer';

import * as S from './Editor.style';

interface IProps {
  setValue: (value: string) => void;
  value: string;
}

export const Editor: React.FC<IProps> = (props: IProps) => {
  const { setValue, value } = props;
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ['link'],
      [{ color: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <S.EditorContainer>
        <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />
      </S.EditorContainer>
      <ReactQuillRenderer data={value ?? ''} />
    </>
  );
};
