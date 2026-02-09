import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './assets/css/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { showVersionInfo } from './utils';

showVersionInfo().then(() => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  }
});
