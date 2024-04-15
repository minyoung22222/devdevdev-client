import React, { useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { PostPicksProps } from '@pages/types/postPicks';

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';

import { MAX_LENGTH } from '../constants/editorConstants';
import { postPickOrder } from '../types/postPickOrder';

export default function MarkdownEditor({
  control,
  order,
}: {
  control: Control<PostPicksProps, any>;
  order: postPickOrder;
}) {
  const editorRef = useRef<ToastEditor>(null);
  const [content, setContent] = useState('');

  const getMarkdownData = () => {
    const instance = editorRef.current?.getInstance();

    if (!instance) return '';
    const data = instance?.getMarkdown() ?? '';

    return data;
  };

  const handleChangeInput = () => {
    const instance = editorRef.current?.getInstance();
    const data = getMarkdownData();
    setContent(data);

    if (data && data.length > MAX_LENGTH) {
      const maxContents = data.substring(0, MAX_LENGTH);
      instance?.setMarkdown(maxContents);
    }
  };

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['code', 'codeblock'],
    ['hr', 'quote'],
    ['link'],
  ];

  return (
    <>
      <Controller
        name={`pickOptions.${order}PickOption.pickOptionContent`}
        control={control}
        render={({ field }) => (
          <ToastEditor
            ref={editorRef}
            previewStyle='tab'
            minHeight='30.2rem'
            autofocus={false}
            useCommandShortcut={false}
            theme='dark'
            placeholder='선택지에 대한 설명 혹은 의견을 작성해주세요.'
            language='ko-KR'
            onChange={() => {
              handleChangeInput();
              field.onChange(getMarkdownData());
            }}
            initialValue={''}
            toolbarItems={toolbarItems}
            hideModeSwitch={true}
          />
        )}
      />

      <p className='text-right text-gray5 mt-[1.6rem] p2 font-light'>
        {content.length}/{MAX_LENGTH}
      </p>
    </>
  );
}
