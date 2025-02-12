import React, { useState } from 'react';

import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IProps {
  initialData?: string;
}

export const Editor: React.FC<IProps> = (props: IProps) => {
  const { initialData } = props;
  const [value, setValue] = useState(initialData);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ['link', 'image'],
    ],
  };
  console.log(value);

  return (
    <>
      <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />

      {Parser(value ?? '')}
    </>
  );
};
