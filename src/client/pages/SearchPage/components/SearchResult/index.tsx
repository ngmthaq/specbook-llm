import React from 'react';

export interface SearchResultItem {
  fileName: string;
  filePath: string;
  lineNumber: number;
  lineContent: string;
}

export interface SearchResultProps {
  item: SearchResultItem;
  onClick?: (item: SearchResultItem) => void;
}

export function SearchResult({ item, onClick }: SearchResultProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <div
      className="border-bottom p-2 cursor-pointer hover-bg-light"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
    >
      <div className="d-flex align-items-center mb-1">
        <i className="bi bi-file-earmark-text me-2 text-primary"></i>
        <strong className="me-2">{item.fileName}</strong>
        <small className="text-muted">Line {item.lineNumber}</small>
      </div>
      <div className="ms-4">
        <code className="text-secondary small">{item.lineContent}</code>
      </div>
      <div className="ms-4">
        <small className="text-muted">{item.filePath}</small>
      </div>
    </div>
  );
}
