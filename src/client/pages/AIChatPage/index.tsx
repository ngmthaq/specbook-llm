import classNames from 'classnames';
import React from 'react';
import { CLASSNAMES } from '../../configs';
import { ChatMessage, ChatForm } from './components';

export function AIChatPage() {
  const messages = [
    { content: 'Hello, how can I assist you today?', position: 'left' },
    {
      content: 'Can you help me with my project?',
      position: 'right',
      files: [new File([''], 'requirements.txt', { type: 'text/plain' })],
    },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
    { content: 'Sure! What do you need help with?', position: 'left' },
    { content: 'I need some ideas for use case diagrams.', position: 'right' },
  ];

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <div
        className={classNames([
          CLASSNAMES.HEADER_PANEL,
          'd-flex justify-content-between align-items-center',
        ])}
      >
        <small>AI Assistant</small>
        <button className="btn btn-lg border-0 p-0" title="New Conversation">
          <i className="bi bi-plus"></i>
        </button>
      </div>
      <div className={classNames([CLASSNAMES.BODY_PANEL, 'flex-grow-1'])}>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            content={msg.content}
            position={msg.position as 'left' | 'right'}
            files={msg.files}
          />
        ))}
      </div>
      <ChatForm />
    </div>
  );
}
