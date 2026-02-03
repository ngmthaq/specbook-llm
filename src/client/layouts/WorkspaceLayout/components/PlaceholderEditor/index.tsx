import React from 'react';

export function PlaceholderEditor() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="text-center p-5">
        <div className="mb-4">
          <i className="bi bi-file-text" style={{ fontSize: '80px', opacity: 0.5 }}></i>
        </div>
        <h4 className="mb-2 fw-semibold">Select a File to Start</h4>
        <p className="m-0 text-muted">Click on a file from the sidebar to open and edit it</p>
      </div>
    </div>
  );
}
