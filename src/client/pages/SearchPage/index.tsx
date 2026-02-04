import React, { useState } from 'react';
import { CLASSNAMES } from '../../configs';
import { SearchResult, SearchResultItem } from './components';

export function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);

  // Mock search function - replace with actual implementation
  const handleSearch = () => {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    // Mock results - replace with actual file search logic
    const mockResults: SearchResultItem[] = [
      {
        fileName: 'app.controller.ts',
        filePath: 'src/app/controllers/app.controller.ts',
        lineNumber: 5,
        lineContent: `  public createWindow(preload: string, webUrl: string) {`,
      },
      {
        fileName: 'App.tsx',
        filePath: 'src/client/App.tsx',
        lineNumber: 22,
        lineContent: `export function App() {`,
      },
      {
        fileName: 'index.tsx',
        filePath: 'src/client/pages/WelcomePage/index.tsx',
        lineNumber: 6,
        lineContent: `export function WelcomePage() {`,
      },
    ].filter((item) => item.lineContent.toLowerCase().includes(searchText.toLowerCase()));

    setResults(mockResults);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (item: SearchResultItem) => {
    console.log('Open file:', item.filePath, 'at line', item.lineNumber);
    // TODO: Implement file opening logic
  };

  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.HEADER_PANEL}>
        <small>Search</small>
      </div>
      <div className={CLASSNAMES.BODY_PANEL} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="p-2 border-bottom">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search in files..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div className="flex-grow-1 overflow-auto">
          {results.length === 0 && searchText && (
            <div className="text-center text-muted p-2">
              <i className="bi bi-inbox" style={{ fontSize: '48px' }}></i>
              <p className="mt-2">No results found</p>
            </div>
          )}
          {results.length === 0 && !searchText && (
            <div className="text-center text-muted p-2">
              <i className="bi bi-search" style={{ fontSize: '48px' }}></i>
              <p className="mt-2">Enter text to search in files</p>
            </div>
          )}
          {results.map((result, index) => (
            <SearchResult key={index} item={result} onClick={handleResultClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
