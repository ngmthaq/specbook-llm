import React from 'react';

export function ChatForm() {
  return (
    <div className="bg-body border-top border-end p-2" style={{ flexShrink: 0 }}>
      <div className="d-flex gap-2 align-items-center mb-2">
        <select className="form-select form-select-sm" title="Select Agent">
          <option value="default">Default Agent</option>
          <option value="coding">Coding Assistant</option>
          <option value="documentation">Documentation Writer</option>
          <option value="review">Code Reviewer</option>
        </select>
        <button className="btn btn-sm btn-outline-secondary" title="Attach files from tree">
          <i className="bi bi-paperclip" style={{ fontSize: '0.875rem' }}></i>
        </button>
        <button className="btn btn-sm btn-primary" title="Send message">
          <i className="bi bi-send-fill" style={{ fontSize: '0.875rem' }}></i>
        </button>
      </div>
      <div className="mb-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div
          className="badge bg-secondary d-inline-flex align-items-center"
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
        >
          <i className="bi bi-file-earmark me-1" style={{ fontSize: '0.7rem' }}></i>
          <span>requirements.txt</span>
          <button
            className="btn-close btn-close-white ms-3"
            style={{ fontSize: '0.4rem', padding: 0 }}
          ></button>
        </div>
        <div
          className="badge bg-secondary d-inline-flex align-items-center"
          style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
        >
          <i className="bi bi-file-earmark me-1" style={{ fontSize: '0.7rem' }}></i>
          <span>schema.sql</span>
          <button
            className="btn-close btn-close-white ms-3"
            style={{ fontSize: '0.4rem', padding: 0 }}
          ></button>
        </div>
      </div>
      <textarea className="form-control" rows={3} placeholder="Type your message here..." />
    </div>
  );
}
