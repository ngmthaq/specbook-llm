import MarkdownPreview from '@uiw/react-markdown-preview';
import classNames from 'classnames';
import React from 'react';

export interface ChatMessageProps {
  content: string;
  position: 'left' | 'right';
  files?: File[];
}

export function ChatMessage(props: ChatMessageProps) {
  const getPreviewElement = () => {
    return (
      <MarkdownPreview
        source={props.content}
        style={{ background: 'inherit', color: 'inherit' }}
        rehypeRewrite={(node, index, parent) => {
          if (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node as any).tagName === 'a' &&
            parent &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            /^h(1|2|3|4|5|6)/.test((parent as any).tagName)
          ) {
            parent.children = parent.children.slice(1);
          }
        }}
      />
    );
  };

  const getFileElements = () => {
    if (!props.files || props.files.length === 0) return;
    return (
      <div className="mt-3">
        {props.files.map((file, index) => (
          <div key={index} className="border rounded px-1 mb-1 bg-light text-dark">
            <small>
              <i className="bi bi-file-earmark-text-fill me-2"></i>
              {file.name}
            </small>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={classNames([
        'd-flex m-2',
        {
          'justify-content-end': props.position === 'right',
          'justify-content-start': props.position === 'left',
        },
      ])}
    >
      <div
        className={classNames([
          'border rounded p-2 ',
          {
            'bg-white text-dark': props.position === 'left',
            'bg-primary text-white': props.position === 'right',
          },
        ])}
        style={{ maxWidth: '90%' }}
      >
        {getPreviewElement()}
        {getFileElements()}
      </div>
      {props.position === 'left' && (
        <button className="btn btn-sm btn-link text-secondary" title="Copy AI assistant message">
          <i className="bi bi-files"></i>
        </button>
      )}
    </div>
  );
}
